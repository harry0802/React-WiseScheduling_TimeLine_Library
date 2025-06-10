from datetime import datetime, timedelta
import sys
import pytz
import os
from app import db
from sqlalchemy import and_, or_
from app.utils_log import message, err_resp, internal_err_resp
from app.models.machineStatus import MachineStatus
from app.models.machine import Machine
from app.models.productionSchedule import ProductionSchedule
from app.api.option.optionEnum import WorkOrderStatusEnum, MachineStatusEnum
from app.api.smartSchedule.service import SmartScheduleService
from .schemas import MachineStatusSchema
machineStatus_schema = MachineStatusSchema()
TZ = os.getenv("TIMEZONE","Asia/Taipei")


def complete_machineStatus(db_obj, payload):
    db_obj.machineId = int(payload["machineId"]) \
        if payload.get("machineId") is not None else db_obj.machineId
    db_obj.planStartDate = datetime.fromisoformat(payload["planStartDate"]) \
        if payload.get("planStartDate") is not None else db_obj.planStartDate
    db_obj.planEndDate = datetime.fromisoformat(payload["planEndDate"]) \
        if payload.get("planEndDate") is not None else db_obj.planEndDate
    db_obj.actualStartDate = datetime.fromisoformat(payload["actualStartDate"]) \
        if payload.get("actualStartDate") is not None else db_obj.actualStartDate
    db_obj.actualEndDate = datetime.fromisoformat(payload["actualEndDate"]) \
        if payload.get("actualEndDate") is not None else db_obj.actualEndDate
    db_obj.status = payload["status"] \
        if payload.get("status") is not None else db_obj.status
    db_obj.reason = payload["reason"] \
        if payload.get("reason") is not None else db_obj.reason
    db_obj.product = payload["product"] \
        if payload.get("product") is not None else db_obj.product
    return db_obj


def _update_machineStatus_to_finish(ongoing_machineSN_list):
    """將所有在ongoing_machineSN_list中的機台狀態更新實際結束時間。
    預防現場師傅忘記結束機台狀態，或是忘記更新實際結束時間
    Args:
        ongoing_machineSN_list (list): 機台編號列表，表示正在進行中的機台
    """
    try:
        # 1. 查詢所有在ongoing_machineSN_list中的機台狀態
        machineStatus_query = MachineStatus.query
        machineStatus_query = machineStatus_query.join(Machine, Machine.id == MachineStatus.machineId)
        machineStatus_query = machineStatus_query.filter(Machine.machineSN.in_(ongoing_machineSN_list))
        machineStatus_query = machineStatus_query.filter(MachineStatus.actualEndDate == None)
        machineStatus_db_list = machineStatus_query.all()

        # 2. 更新機台狀態為已完成
        for machineStatus_db in machineStatus_db_list:
            machineStatus_db.actualEndDate = datetime.now(pytz.timezone(TZ))
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        raise error


class MachineStatusService:
    @staticmethod
    def get_machineStatus(productionArea):
        try:
            # Current time
            current_time = datetime.now(pytz.timezone(TZ))
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)
            next_day = current_time + timedelta(days=1)

            # 1. 列出某區域的所有機台
            machine_query = Machine.query
            machine_query = machine_query.filter_by(productionArea=productionArea) if productionArea is not None else machine_query
            machine_db_list = machine_query.all()

            # 2. 機台生產中，列出productionSchedule中，某區域的所有狀態為On-going的生產排程
            productionSchedule_query = ProductionSchedule.query
            productionSchedule_query = productionSchedule_query.filter_by(status=WorkOrderStatusEnum.ON_GOING.value)
            productionSchedule_query = productionSchedule_query.filter_by(productionArea=productionArea) if productionArea is not None else productionSchedule_query
            productionSchedule_db_list = productionSchedule_query.all()
            # 從productionSchedule_db_list列出所有machineSN
            ongoing_machineSN_list = [productionSchedule_db.machineSN for productionSchedule_db in productionSchedule_db_list]

            # 3. 機台已開始某個狀態，從machineStatus找出當日，有actualStartDate，且無actualFinishDate的 (machineStatusId)，並排除productionSchedule中的machineSN
            machineStatus_query = MachineStatus.query
            machineStatus_query = machineStatus_query.join(Machine, Machine.id == MachineStatus.machineId)
            machineStatus_query = machineStatus_query.filter(Machine.productionArea == productionArea) if productionArea is not None else machineStatus_query
            # machineStatus_query = machineStatus_query.filter(MachineStatus.actualStartDate >= midnight) # 因為有時候師傅修復機台會跨日，所以不限定當日
            machineStatus_query = machineStatus_query.filter(MachineStatus.actualStartDate <= current_time)
            machineStatus_query = machineStatus_query.filter(MachineStatus.actualEndDate == None)
            machineStatus_query = machineStatus_query.filter(Machine.machineSN.notin_(ongoing_machineSN_list))
            machineStatus_query = machineStatus_query.group_by(MachineStatus.machineId)
            machineStatus_db_list = machineStatus_query.all()
            started_machineSN_list = [machineStatus_db.machine.machineSN for machineStatus_db in machineStatus_db_list]

            # 4. 機台待機中(生管有預排，但現場師傅還沒開始)，找出planStartDate <= Now() <= planEndDate，沒有actualStartDate，也沒有actualFinishDate的，並排除productionSchedule中的machineSN
            machineStatus_query = MachineStatus.query
            machineStatus_query = machineStatus_query.join(Machine, Machine.id == MachineStatus.machineId)
            machineStatus_query = machineStatus_query.filter(Machine.productionArea == productionArea) if productionArea is not None else machineStatus_query
            machineStatus_query = machineStatus_query.filter(MachineStatus.planStartDate >= midnight)
            machineStatus_query = machineStatus_query.filter(MachineStatus.planStartDate <= current_time)
            machineStatus_query = machineStatus_query.filter(MachineStatus.planEndDate >= current_time)
            machineStatus_query = machineStatus_query.filter(MachineStatus.actualStartDate == None)
            machineStatus_query = machineStatus_query.filter(MachineStatus.actualEndDate == None)
            machineStatus_query = machineStatus_query.filter(Machine.machineSN.notin_(ongoing_machineSN_list+started_machineSN_list))
            results = machineStatus_query.all()
            for item in results:
                # 覆蓋原有的 status 值
                item.status = MachineStatusEnum.IDLE.value
            machineStatus_db_list += results

            # 5. 將機台狀態資料整理成dict
            machineStatus_dict_list = []
            for productionSchedule_db in productionSchedule_db_list:
                machineStatus_dict = {
                    "id": None,
                    "machineId": None,
                    "productionArea": productionSchedule_db.productionArea,
                    "machineSN": productionSchedule_db.machineSN,
                    "planStartDate": None,
                    "planEndDate": None,
                    "actualStartDate": None,
                    "actualEndDate": None,
                    "status": MachineStatusEnum.RUN.value,
                    "reason": None,
                    "product": None,
                }
                machineStatus_dict_list.append(machineStatus_dict)
            for machineStatus_db in machineStatus_db_list:
                machineStatus_dict = {
                    "id": machineStatus_db.id,
                    "machineId": machineStatus_db.machineId,
                    "productionArea": machineStatus_db.machine.productionArea,
                    "machineSN": machineStatus_db.machine.machineSN,
                    "planStartDate": machineStatus_db.planStartDate,
                    "planEndDate": machineStatus_db.planEndDate,
                    "actualStartDate": machineStatus_db.actualStartDate,
                    "actualEndDate": machineStatus_db.actualEndDate,
                    "status": machineStatus_db.status,
                    "reason": machineStatus_db.reason,
                    "product": machineStatus_db.product,
                }
                machineStatus_dict_list.append(machineStatus_dict)
            
            # 6. 其他機台待機中(沒有生產，生管也沒有預排)，machine_db_list中，machineSN沒有在machineStatus_dict_list裡面的
            for machine_db in machine_db_list:
                if not any(machineStatus_dict["machineSN"] == machine_db.machineSN for machineStatus_dict in machineStatus_dict_list):
                    machineStatus_dict = {
                        "id": None,
                        "machineId": machine_db.id,
                        "productionArea": machine_db.productionArea,
                        "machineSN": machine_db.machineSN,
                        "planStartDate": None,
                        "planEndDate": None,
                        "actualStartDate": None,
                        "actualEndDate": None,
                        "status": MachineStatusEnum.IDLE.value,
                        "reason": None,
                        "product": None,
                    }
                    machineStatus_dict_list.append(machineStatus_dict)

            # 7. 如果有ongoing的機台狀態，則將有actualStartTime但沒有actualEndTime的排程，將其實際結束時間更新為現在時間
            if ongoing_machineSN_list:
                _update_machineStatus_to_finish(ongoing_machineSN_list)
            
            # 8. 將機台狀態資料轉換為序列化格式
            machineStatus_dump = machineStatus_schema.dump(machineStatus_dict_list, many=True)
            resp = message(True, "machineStatus data sent")
            resp["data"] = machineStatus_dump
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        

    # create MachineStatusStatus
    @staticmethod
    def create_machineStatus(payload):
        """新增機台狀態並觸發排程調整"""
        try:
            planStartDate = datetime.fromisoformat(payload["planStartDate"]) \
                if payload.get("planStartDate") is not None else None
            planEndDate = datetime.fromisoformat(payload["planEndDate"]) \
                if payload.get("planEndDate") is not None else None
            # 0. 確認新的機台狀態區間(planStartDate, planEndDate)不會與現有的機台狀態區間重疊
            machineStatus_query = MachineStatus.query
            machineStatus_query = machineStatus_query.filter(MachineStatus.machineId == payload["machineId"])
            machineStatus_query = machineStatus_query.filter(
                or_(
                    and_(
                        MachineStatus.planStartDate >= planStartDate,
                        MachineStatus.planEndDate <= planEndDate
                    ),
                    and_(
                        MachineStatus.actualStartDate >= planStartDate,
                        MachineStatus.actualEndDate <= planEndDate
                    )
                )
            )
            machineStatus_query = machineStatus_query.all() 
            if machineStatus_query:
                return err_resp("machineStatus already exists in this time range.", "machineStatus_400", 400)
            
            # 1. 創建新的機台狀態
            machineStatus_db = complete_machineStatus(MachineStatus(), payload)
            db.session.add(machineStatus_db)
            db.session.flush()  # 確保 id 可用

            # 2. 觸發排程調整，只傳遞必要的資訊
            resp, status = SmartScheduleService.update_machine_status_schedule(
                machineStatusId=machineStatus_db.id, is_create=True
            )
            if status != 200:
                db.session.rollback()
                return resp, status

            machineStatus_dump = machineStatus_schema.dump(machineStatus_db)
            resp = message(True, "machineStatus have been created and schedules updated.")
            resp["data"] = machineStatus_dump
            return resp, 201

        except Exception as error:
            db.session.rollback()
            raise error

    @staticmethod
    def update_machineStatus(payload):
        """更新機台狀態並觸發排程調整"""
        try:
            # 1. 查詢並更新機台狀態
            machineStatus_db = MachineStatus.query.filter_by(id=payload["id"]).first()
            if machineStatus_db is None:
                return err_resp("machineStatus not found.", "machineStatus_404", 404)
            old_start_date = machineStatus_db.planStartDate
            old_end_date = machineStatus_db.planEndDate
            old_machine_sn = machineStatus_db.machine.machineSN
            new_machine_sn = Machine.query.filter_by(id=payload["machineId"]).first().machineSN if payload.get("machineId") is not None else None
            machineStatus_db = complete_machineStatus(machineStatus_db, payload)
            db.session.flush()

            # 2. 觸發排程調整，只傳遞必要的資訊
            resp, status = SmartScheduleService.update_machine_status_schedule(
                machineStatusId=machineStatus_db.id, old_start_param=old_start_date, old_end_param=old_end_date, 
                new_machine_sn_param=new_machine_sn, old_machine_sn_param=old_machine_sn
            )
            if status != 200:
                db.session.rollback()
                return resp, status

            # 3. 資料庫更新
            db.session.commit()

            machineStatus_dump = machineStatus_schema.dump(machineStatus_db)
            resp = message(True, "machineStatus have been updated and schedules adjusted.")
            resp["data"] = machineStatus_dump
            return resp, 200

        except Exception as error:
            db.session.rollback()
            raise error

    @staticmethod
    def delete_machineStatus(id):
        """刪除機台狀態並觸發排程調整"""
        try:
            # 1. 查詢要刪除的機台狀態
            machineStatus_db = MachineStatus.query.filter_by(id=id).first()
            if machineStatus_db is None:
                return err_resp("machineStatus not found.", "machineStatus_404", 404)
            
            # 2. 如果此機台狀態有實際開始或結束時間，則無法刪除
            if machineStatus_db.actualStartDate is not None or machineStatus_db.actualEndDate is not None:
                return err_resp("machineStatus cannot be deleted because it has actual start or end date.", "machineStatus_400", 400)

            # 3. 觸發排程調整，只傳遞必要的資訊
            resp, status = SmartScheduleService.update_machine_status_schedule(machineStatusId=id, is_delete=True)
            if status != 200:
                db.session.rollback()
                return resp, status

            resp = message(True, "machineStatus have been deleted and schedules adjusted.")
            return resp, 200

        except Exception as error:
            db.session.rollback()
            raise error
