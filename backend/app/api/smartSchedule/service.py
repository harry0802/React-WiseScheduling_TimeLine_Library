from datetime import datetime, timedelta
import sys
import os
import pytz
from app import db
from sqlalchemy import literal
from typing import List, Union, Tuple
from app.utils_log import message, err_resp, internal_err_resp
from app.service.utils_iot import shift_by_holiday
from app.models.views.smartSchedulingView import SmartSchedulingView
from app.models.machineStatus import MachineStatus
from app.models.machine import Machine
from app.models.calendar import Calendar
from app.models.productionSchedule import ProductionSchedule
from app.api.option.optionEnum import WorkOrderStatusEnum
from .schemas import SmartScheduleSchema
smartSchedule_schema = SmartScheduleSchema()
TZ = os.getenv("TIMEZONE","Asia/Taipei")

def _get_holidays(start_date: datetime) -> List[datetime.date]:
    """獲取從指定日期開始的假期列表"""
    calendar_query = Calendar.query.filter(Calendar.date >= start_date).order_by(Calendar.date)
    return [calendar_db.date for calendar_db in calendar_query.all()]

def _adjust_for_holidays(date: datetime, holidays: List[datetime.date], is_postpone) -> datetime:
    """調整日期以避開假期"""
    while date.astimezone(pytz.timezone(TZ)).date() in holidays:
        shift = timedelta(days=1) if is_postpone else timedelta(days=-1)
        date += shift
    return date

def _calculate_holidays_between(start_date: datetime, end_date: datetime, holidays: List[datetime.date]) -> int:
    """計算兩個日期之間的假期數量"""
    count_holidays = 0
    for i in range((end_date - start_date).days + 1):
        current_date = start_date + timedelta(days=i)
        if current_date.date() in holidays:
            count_holidays += 1
    return count_holidays

def _fetch_related_schedules(machine_sn: str, start_time: datetime, end_time: datetime, 
                           except_productionScheduleId: int = None, 
                           expect_machineStatusId: int = None) -> List[Union[ProductionSchedule, MachineStatus]]:
    """獲取相關的製令單和機台狀態"""
    prod_query = (ProductionSchedule.query
                    .filter_by(machineSN=machine_sn)
                    .filter(ProductionSchedule.status == WorkOrderStatusEnum.NOT_YET.value)
                    .filter(ProductionSchedule.planOnMachineDate >= start_time))
    prod_query = prod_query.filter(ProductionSchedule.id != except_productionScheduleId) if except_productionScheduleId else prod_query
    prod_list = prod_query.all()

    machine_query = (MachineStatus.query
                    .join(Machine, Machine.id == MachineStatus.machineId)
                    .filter(Machine.machineSN == machine_sn)
                    .filter(MachineStatus.planStartDate >= end_time))
    machine_query = machine_query.filter(MachineStatus.id != expect_machineStatusId) if expect_machineStatusId else machine_query
    machine_list = machine_query.all()

    all_list = prod_list + machine_list
    all_list.sort(key=lambda x: x.planOnMachineDate if isinstance(x, ProductionSchedule) else x.planStartDate)
    return all_list

def _calculate_shift(is_postpone: bool, diff_seconds: float) -> timedelta:
    """計算時間偏移量"""
    return timedelta(seconds=diff_seconds if is_postpone else -diff_seconds)

def _update_schedule_times(item: Union[ProductionSchedule, MachineStatus], 
                          prev_end: datetime, 
                          shift: timedelta, 
                          holidays: List[datetime.date], 
                          is_postpone: bool) -> None:
    """更新單個排程的時間"""
    start_field = "planOnMachineDate" if isinstance(item, ProductionSchedule) else "planStartDate"
    end_field = "planFinishDate" if isinstance(item, ProductionSchedule) else "planEndDate"

    current_start = getattr(item, start_field)
    current_end = getattr(item, end_field)
    if is_postpone:
        if current_start < prev_end:
            shift_amount = prev_end - current_start
            new_start = current_start + shift_amount
            new_end = current_end + shift_amount
        elif current_start > prev_end:
            shift_amount = current_start - prev_end
            new_start = current_start - shift_amount
            new_end = current_end - shift_amount
        else:
            new_start, new_end = current_start, current_end
    else:
        new_start = current_start + shift
        new_end = current_end + shift
    
    new_start = _adjust_for_holidays(new_start, holidays, is_postpone)
    new_end = _adjust_for_holidays(new_end, holidays, is_postpone)
    
    setattr(item, start_field, new_start)
    setattr(item, end_field, new_end)

class SmartScheduleService:
    @staticmethod
    def get_smartSchedule(productionArea, startTime, endTime):
        try:
            # transform the ISO format datetime to datetime type
            startTime = datetime.fromisoformat(startTime) if startTime else datetime.now(pytz.timezone(TZ)) - timedelta(days=7)
            endTime = datetime.fromisoformat(endTime) if endTime else datetime.now(pytz.timezone(TZ)) + timedelta(days=7)
            
            query = SmartSchedulingView.query
            query = query.filter(SmartSchedulingView.productionArea == productionArea)
                # query = query.filter(
                #     (SmartSchedulingView.planOnMachineDate >= startTime) |
                #     (SmartSchedulingView.machineStatusPlanStartTime >= startTime)
                # )
                # query = query.filter(
                #     (SmartSchedulingView.planFinishDate <= endTime) |
                #     (SmartSchedulingView.machineStatusPlanEndTime <= endTime)
                # )
            query = query.order_by(SmartSchedulingView.machineSN, SmartSchedulingView.planOnMachineDate)
            smartSchedule_db_list = query.all()


            smartSchedule_dump = smartSchedule_schema.dump(smartSchedule_db_list, many=True)
            resp = message(True, "smartSchedule data sent")
            resp["data"] = smartSchedule_dump
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        

    @staticmethod
    def update_work_order_schedule(payload: dict) -> Tuple[dict, int]:
        """更新製令單排程（根據開始時間或機台變更）"""
        try:
            schedule_id = payload.get("productionScheduleId")
            new_start = datetime.fromisoformat(payload["newStartDate"]) if isinstance(payload["newStartDate"], str) else payload["newStartDate"]
            
            schedule = ProductionSchedule.query.filter_by(id=schedule_id).first()
            if not schedule:
                return err_resp("productionSchedule not found.", "productionSchedule_404", 404)

            if new_start < datetime.now(new_start.tzinfo) - timedelta(seconds=30):
                return err_resp("New start date is earlier than now.", "Invalid_input", 400)
            
            # 如果new_start在假日期間，則返回錯誤
            holidays = _get_holidays(new_start)
            if new_start.date() in holidays:
                return err_resp("New start date can't be in holiday.", "Invalid_input", 400)

            old_start, old_end = schedule.planOnMachineDate, schedule.planFinishDate
            old_machine_sn = schedule.machineSN
            new_machine_sn = payload.get("machineSN", old_machine_sn)
            new_end = shift_by_holiday(start_date=new_start, workdays=schedule.workDays + schedule.moldWorkDays)

            # Update the schedule's machine and times
            schedule.machineSN = new_machine_sn
            schedule.planOnMachineDate = new_start
            schedule.planFinishDate = new_end

            to_commit = [schedule]

            if old_machine_sn == new_machine_sn:
                # Same machine case: handle time shift only
                if new_start == old_start:
                    return err_resp("New start date same as original.", "Invalid_input", 400)
                
                is_postpone = new_start > old_start
                count_holidays = _calculate_holidays_between(old_start, new_start, holidays) if is_postpone else _calculate_holidays_between(new_start, old_start, holidays)
                diff = abs((new_start - old_start).total_seconds()) - (count_holidays * 24 * 60 * 60)
                shift = _calculate_shift(is_postpone, diff)
                
                all_schedules = _fetch_related_schedules(old_machine_sn, old_start, old_end, 
                                                      except_productionScheduleId=schedule_id)
                for i, item in enumerate(all_schedules):
                    prev_end = new_end if i == 0 else (getattr(all_schedules[i-1], 
                                                             "planFinishDate" if isinstance(all_schedules[i-1], ProductionSchedule) 
                                                             else "planEndDate"))
                    _update_schedule_times(item, prev_end, shift, holidays, is_postpone)
                    to_commit.append(item)
            else:
                # Different machine case
                # 1. Old machine: pull schedules forward to fill gap
                old_schedules = _fetch_related_schedules(old_machine_sn, old_start, old_end, 
                                                       except_productionScheduleId=schedule_id)
                if old_schedules:
                    is_postpone = False
                    count_holidays = _calculate_holidays_between(old_start, old_end, holidays)
                    diff = abs((old_end - old_start).total_seconds()) - (count_holidays * 24 * 60 * 60)
                    shift = _calculate_shift(is_postpone, diff)
                    for i, item in enumerate(old_schedules):
                        prev_end = (old_schedules[i-1].planFinishDate if i > 0 else 
                                  old_schedules[0].planOnMachineDate + shift)
                        _update_schedule_times(item, prev_end, shift, holidays, is_postpone)
                        to_commit.append(item)

                # 2. New machine: push schedules back to accommodate new schedule
                new_schedules = _fetch_related_schedules(new_machine_sn, new_start, new_end, 
                                                       except_productionScheduleId=schedule_id)
                if new_schedules:
                    is_postpone = True
                    count_holidays = _calculate_holidays_between(new_start, new_end, holidays)
                    diff = abs((new_end - new_start).total_seconds()) - (count_holidays * 24 * 60 * 60)
                    shift = _calculate_shift(is_postpone, diff)
                    for i, item in enumerate(new_schedules):
                        prev_end = new_end if i == 0 else (getattr(new_schedules[i-1], 
                                                                 "planFinishDate" if isinstance(new_schedules[i-1], ProductionSchedule) 
                                                                 else "planEndDate"))
                        _update_schedule_times(item, prev_end, shift, holidays, is_postpone=True)
                        to_commit.append(item)

            db.session.add_all(to_commit)
            db.session.commit()
            return message(True, "smartSchedule have been updated."), 200

        except Exception as error:
            db.session.rollback()
            raise error

    
    @staticmethod
    def update_work_order_schedule_by_endtime(productionScheduleId: int, newEndDate: str) -> Tuple[dict, int]:
        """更新製令單排程的實際結束時間、延遲完成日，並調整其他排程的預計開始/結束時間"""
        try:
            new_end = datetime.fromisoformat(newEndDate) if isinstance(newEndDate, str) else newEndDate
            schedule = ProductionSchedule.query.filter_by(id=productionScheduleId).first()
            if not schedule:
                return err_resp("productionSchedule not found.", "productionSchedule_404", 404)

            old_start, old_end = schedule.planOnMachineDate, schedule.planFinishDate
            machine_sn = schedule.machineSN
            holidays = _get_holidays(old_start)
            new_end = _adjust_for_holidays(new_end, holidays, is_postpone)

            # 計算時間差異
            is_postpone = new_end > old_end
            count_holidays = _calculate_holidays_between(old_end, new_end, holidays) if is_postpone else _calculate_holidays_between(new_end, old_end, holidays)
            diff = abs((new_end - old_end).total_seconds()) - (count_holidays * 24 * 60 * 60)  # 減去假日的時間

            all_schedules = _fetch_related_schedules(machine_sn, old_start, old_end, except_productionScheduleId=productionScheduleId)
            shift = _calculate_shift(is_postpone, diff)

            for i, item in enumerate(all_schedules):
                prev_end = new_end if i == 0 else (getattr(all_schedules[i-1], "planFinishDate" if isinstance(all_schedules[i-1], ProductionSchedule) else "planEndDate"))
                _update_schedule_times(item, prev_end, shift, holidays, is_postpone)

            db.session.add_all(all_schedules)
            db.session.commit()
            return message(True, "smartSchedule have been updated."), 200

        except Exception as error:
            db.session.rollback()
            raise error
        

    @staticmethod
    def update_machine_status_schedule(machineStatusId: int, is_create: bool = False, is_delete: bool = False, old_start_param: datetime = None, old_end_param: datetime = None) -> Tuple[dict, int]:
        """更新機台狀態後調整其他排程的時間"""
        try:
            schedule = MachineStatus.query.filter_by(id=machineStatusId).first()
            if not schedule:
                return err_resp("machineStatus not found.", "machineStatus_404", 404)
            
            # 查詢或創建機台狀態
            if is_create:
                new_start = schedule.actualStartDate if schedule.actualStartDate else schedule.planStartDate
                new_end = schedule.planEndDate
            else:
                new_start = schedule.actualStartDate if schedule.actualStartDate else schedule.planStartDate
                new_end = schedule.actualEndDate if schedule.actualEndDate else schedule.planEndDate
            old_start = old_start_param or schedule.planStartDate
            old_end = old_end_param or schedule.planEndDate
            machine_sn = schedule.machine.machineSN
            
            # 時間檢查
            if is_create is False and is_delete is False:
                if new_start == old_start and new_end == old_end:
                    return message(True, "New date same as original."), 200

            holidays = _get_holidays(new_start or old_start)
            # 計算時間差異
            if is_create:
                count_holidays = _calculate_holidays_between(new_start, new_end, holidays)
                diff = abs((new_end - new_start).total_seconds()) - (count_holidays * 24 * 60 * 60)  # 減去假日的時間
                is_postpone = True
            elif is_delete:
                count_holidays = _calculate_holidays_between(old_start, old_end, holidays)
                diff = abs((old_end - old_start).total_seconds()) - (count_holidays * 24 * 60 * 60)  # 減去假日的時間
                is_postpone = False
            else:
                is_postpone = new_end > old_end
                count_holidays = _calculate_holidays_between(old_end, new_end, holidays) if is_postpone else _calculate_holidays_between(new_end, old_end, holidays)
                diff = abs((new_end - old_end).total_seconds()) - (count_holidays * 24 * 60 * 60)  # 減去假日的時間

            # 調整假期
            if new_start:
                new_start = _adjust_for_holidays(new_start, holidays, is_postpone)
            if new_end:
                new_end = _adjust_for_holidays(new_end, holidays, is_postpone)

            # 獲取並調整後續排程
            all_schedules = _fetch_related_schedules(machine_sn, old_start or new_start, old_end or new_end, expect_machineStatusId=machineStatusId)
            shift = _calculate_shift(is_postpone, diff)

            for i, item in enumerate(all_schedules):
                prev_end = new_end if i == 0 else (getattr(all_schedules[i-1], "planFinishDate" if isinstance(all_schedules[i-1], ProductionSchedule) else "planEndDate"))
                _update_schedule_times(item, prev_end, shift, holidays, is_postpone)

            # 資料庫操作
            if is_delete:
                db.session.delete(schedule)
            else:
                db.session.add(schedule)
            db.session.add_all(all_schedules)
            db.session.commit()

            return message(True, "Schedules have been updated."), 200

        except Exception as error:
            db.session.rollback()
            raise error
        