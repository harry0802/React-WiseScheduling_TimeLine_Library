from datetime import datetime, date, timedelta
import json
import math
from operator import and_

import requests
from flask import current_app

from app import db
from app.utils import message, err_resp, internal_err_resp
from app.models.productionSchedule import productionSchedule
from .schemas import productionScheduleSchema
from flask import url_for
import logging
from app.api.calendar.service import CalendarService
from sqlalchemy import extract
productionSchedule_schema = productionScheduleSchema()


def isHoliday(obj, start, end, api_version = "api.calendar_calendar_controller"):
    if api_version == "api.calendar_calendar_controller":
        if type(obj['date']) == str:
            event_date = date.fromisoformat(obj['date'])
        else:
            event_date = obj['date']
        # date = date.fromisoformat(obj['date'], '%Y-%m-%d')
        # date = obj['date']
        return event_date >= start and event_date <= end and obj['isHoliday'] == True
    else:
        return False

"""shift_by_holiday

Keyword arguments:
argument -- start_date, end_date, workdays
Return: return end_date

this function should able to shift the end_date by holidays
the workdays + holidays should be the same as the end_date - start_date
"""

def shift_by_holiday(start_date, end_date=date(1,1,1), workdays=1):
    # get the holiday list (twice of workdays)
    # to avoid the holiday list is not enough in final check
    # the calendar_api 
    deltaDays = max(workdays, (end_date - start_date).days)


    # calendar_api = url_for("api.calendar_calendar_controller",
    #                         _scheme="http",
    #                         year=start_date.year,
    #                         month=start_date.month,
    #                         day=start_date.day,
    #                         len=deltaDays*2)
    # holiday_list = requests.get(calendar_api).json()
    holiday_list, code = CalendarService.get_calendar(start_date, deltaDays*2)
    if holiday_list["status"] != True:
        return internal_err_resp()
    holiday_list = holiday_list["data"]

    #get the holiday list between start_date and end_date
    holiday_list_1st_count = sum( 1 for holiday in holiday_list if isHoliday(holiday, start_date, end_date, "api.calendar_calendar_controller"))
    #1st shift the end_date by workdays + holidays
    new_end_date = start_date + timedelta(days=workdays+holiday_list_1st_count)
    #final check if the workdays + holiday is the same as the end_date
    holiday_list_2nd_count = sum( 1 for holiday in holiday_list if isHoliday(holiday, start_date, new_end_date, "api.calendar_calendar_controller"))

    # check is any new holiday created in the 1st shift
    if workdays+holiday_list_1st_count < workdays + holiday_list_2nd_count:
        return shift_by_holiday(start_date, new_end_date, workdays)
    else:
        final_end_date = new_end_date
    deltaDays = (final_end_date - start_date).days
    
    print(f"shift_by_holiday: ")
    print(f"start: {start_date}, workdays: {workdays},")
    print(f"final_end: {final_end_date}, deltaDays: {deltaDays}, holiday_count: {holiday_list_2nd_count}")
    return final_end_date
    
def complete_productionSchedule(db_obj, payload):
    format = '%Y-%m-%d'
    db_obj.productionArea = payload["productionArea"] \
        if payload.get("productionArea") is not None else db_obj.productionArea
    db_obj.machineSN = payload["machineSN"] \
        if payload.get("machineSN") is not None else db_obj.machineSN
    db_obj.serialNumber = payload["serialNumber"] \
        if payload.get("serialNumber") is not None else db_obj.serialNumber
    db_obj.workOrderSN = payload["workOrderSN"] \
        if payload.get("workOrderSN") is not None else db_obj.workOrderSN
    db_obj.productSN = payload["productSN"] \
        if payload.get("productSN") is not None else db_obj.productSN
    db_obj.productName = payload["productName"] \
        if payload.get("productName") is not None else db_obj.productName
    db_obj.workOrderQuantity = int(payload["workOrderQuantity"]) \
        if payload.get("workOrderQuantity") is not None else db_obj.workOrderQuantity
    db_obj.workOrderDate = date.fromisoformat(payload["workOrderDate"]) \
        if payload.get("workOrderDate") is not None else db_obj.workOrderDate
    db_obj.moldingSecond = int(payload["moldingSecond"]) \
        if payload.get("moldingSecond") is not None else db_obj.moldingSecond
    db_obj.planOnMachineDate = date.fromisoformat(payload["planOnMachineDate"]) \
        if payload.get("planOnMachineDate") is not None else db_obj.planOnMachineDate
    db_obj.actualOnMachineDate = date.fromisoformat(payload["actualOnMachineDate"]) \
        if payload.get("actualOnMachineDate") is not None else db_obj.actualOnMachineDate
    db_obj.moldWorkDays = int(payload["moldWorkDays"]) \
        if payload.get("moldWorkDays") is not None else db_obj.moldWorkDays
    db_obj.planFinishDate = date.fromisoformat(payload["planFinishDate"]) \
        if payload.get("planFinishDate") is not None else db_obj.planFinishDate
    db_obj.actualFinishDate = date.fromisoformat(payload["actualFinishDate"]) \
        if payload.get("actualFinishDate") is not None else db_obj.actualFinishDate
    db_obj.comment = payload["comment"] \
        if payload.get("comment") is not None else db_obj.comment
    db_obj.dailyWorkingHours = int(payload["dailyWorkingHours"]) \
        if payload.get("dailyWorkingHours") is not None else db_obj.dailyWorkingHours
    db_obj.moldCavity = int(payload["moldCavity"]) \
        if payload.get("moldCavity") is not None else db_obj.moldCavity
    db_obj.singleOrDoubleColor = payload["singleOrDoubleColor"] \
        if payload.get("singleOrDoubleColor") is not None else db_obj.singleOrDoubleColor
    db_obj.conversionRate = float(payload["conversionRate"]) \
        if payload.get("conversionRate") is not None else db_obj.conversionRate
    db_obj.status = payload["status"] \
        if payload.get("status") is not None else db_obj.status
    #datetime type transform
    db_obj.planOnMachineDate = date.fromisoformat(db_obj.planOnMachineDate) if type(db_obj.planOnMachineDate) == str else db_obj.planOnMachineDate
    #預估產能相關
    # Required: workOrderQuantity, moldingSecond, dailyWorkingHours, moldCavity, conversionRate
    if (
        type(db_obj.workOrderQuantity) != int or db_obj.workOrderQuantity <= 0
        or type(db_obj.moldingSecond) != int or db_obj.moldingSecond <= 0
        or type(db_obj.dailyWorkingHours) != int or db_obj.dailyWorkingHours <= 0
        or type(db_obj.moldCavity) != int or db_obj.moldCavity <= 0
        or type(db_obj.moldWorkDays) != int or db_obj.moldWorkDays <= 0
        or type(db_obj.conversionRate) != float or db_obj.conversionRate <= 0
        ):
        logging.debug(f"complete_productionSchedule:SKIP calculate capacity")
    else:
        #每小時產能(drop decimal)
        logging.debug(f"complete_productionSchedule:SKIP calculate capacity")
        db_obj.hourlyCapacity = (60 * 60) * (1/db_obj.moldingSecond) * db_obj.moldCavity
        db_obj.hourlyCapacity = math.floor(db_obj.hourlyCapacity)
        logging.debug(f"hourlyCapacity: {db_obj.hourlyCapacity}")
        #每日產能(drop decimal)
        db_obj.dailyCapacity = db_obj.hourlyCapacity * db_obj.dailyWorkingHours * db_obj.conversionRate
        db_obj.dailyCapacity = math.floor(db_obj.dailyCapacity)
        logging.debug(f"dailyCapacity: {db_obj.dailyCapacity}")
        #工作天數(unconditional round up)
        db_obj.workDays = db_obj.workOrderQuantity / db_obj.dailyCapacity
        db_obj.workDays = math.ceil(db_obj.workDays)
        logging.debug(f"workDays: {db_obj.workDays}")
        #預計完成日(shift by holiday)
        db_obj.planFinishDate = shift_by_holiday(start_date=db_obj.planOnMachineDate, workdays=db_obj.workDays+db_obj.moldWorkDays)
        
    #周數
    if payload.get("week") is not None and False: #waiting for frontend has its own week calculation
        db_obj.week = payload["week"]
    else:
        #by 預計上機日
        db_obj.week = db_obj.planOnMachineDate.isocalendar()[1] if db_obj.planOnMachineDate is not None else db_obj.week
        #by 預計完成日
        # db_obj.week = db_obj.planFinishDate.isocalendar()[1] if db_obj.planFinishDate is not None else db_obj.week
    #排程狀態
    today = datetime.date(datetime.now())
    if payload.get("status") is not None: #manual status
        db_obj.status = payload["status"]
    elif db_obj.status is None:
        if db_obj.actualOnMachineDate is None:
            db_obj.status = "尚未上機"
        elif db_obj.status == "尚未上機" and db_obj.actualOnMachineDate is not None:
            db_obj.status = "On-going"
        elif db_obj.actualFinishDate is not None:
            db_obj.status = "Done"
    return db_obj

class productionScheduleService:
    @staticmethod
    def get_productionSchedules(page, size, sort, status_filter, week_filter=None, year_filter=None, month_filter=None):
        try:
            # Get the current productionSchedule
            # return f"productionScheduleService.get_productionSchedules({page}, {size}, {sort}, {status_filter}, {week_filter}, {year_filter}, {month_filter}})"
            query = productionSchedule.query
            query = query.filter(productionSchedule.status == status_filter) if status_filter != "all" else query
            query = query.filter(productionSchedule.week == week_filter) if week_filter else query
            query = query.filter(extract('year', productionSchedule.planFinishDate) == year_filter) if year_filter else query
            query = query.filter(extract('month', productionSchedule.planFinishDate) == month_filter) if month_filter else query

            if hasattr(productionSchedule, sort):
                query = query.order_by(getattr(productionSchedule, sort).desc())
            else:
                query = query.order_by(productionSchedule.id.desc())
            if size:
                pagination = query.paginate(page=page, per_page=size)
                productionSchedule_db = pagination.items
                total_pages = pagination.pages
                total_count = pagination.total
            else:
                productionSchedule_db = query.all()
                total_pages = 1
                total_count = len(productionSchedule_db)
            if not (productionSchedule_db):
                productionSchedule_db = []
            
            productionSchedule_dto = productionSchedule_schema.dump(productionSchedule_db, many=True)

            resp = message(True, "productionSchedule data sent")
            resp["data"] = productionSchedule_dto
            resp["meta"] = {
                "page": page,
                "size": size,
                "sort": sort if hasattr(productionSchedule, sort) else "id",
                "total_pages": total_pages,
                "total_count": total_count,
            }
            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()
        
    @staticmethod
    def get_productionSchedule(id):
        try:
            # Get the current productionSchedule
            productionSchedule_db = productionSchedule.query.filter(
                    productionSchedule.id == id
                ).first()

            if productionSchedule_db is None:
                return err_resp("productionSchedule not found", "productionSchedule_404", 404)
                productionSchedule_db = []
            
            productionSchedule_dto = productionSchedule_schema.dump(productionSchedule_db)

            resp = message(True, "productionSchedule data sent")
            resp["data"] = productionSchedule_dto
            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()


    @staticmethod
    def create_productionSchedule(payload):
        try:
            productionSchedule_db = productionSchedule()
            productionSchedule_db = complete_productionSchedule(productionSchedule_db, payload)
            db.session.add(productionSchedule_db)
            db.session.flush()
            db.session.commit()

            productionSchedule_dto = productionSchedule_schema.dump(productionSchedule_db)
            resp = message(True, "productionSchedule has been updated..")
            resp["data"] = productionSchedule_dto

            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def update_productionSchedule(id, payload):
        try:
            productionSchedule_db = productionSchedule.query.filter(
                    productionSchedule.id == id
                ).first()
            if productionSchedule_db is None:
                return err_resp("productionSchedule not found", "productionSchedule_404", 404)
            else:
                productionSchedule_db = complete_productionSchedule(productionSchedule_db, payload)

            db.session.add(productionSchedule_db)
            db.session.flush()
            db.session.commit()

            productionSchedule_dto = productionSchedule_schema.dump(productionSchedule_db)
            resp = message(True, "productionSchedule has been updated..")
            resp["data"] = productionSchedule_dto

            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()
    
    @staticmethod
    def update_productionSchedules(ids, payload):
        try:
            productionSchedule_db = productionSchedule.query.filter(
                productionSchedule.id.in_(ids)
            ).all()
            if productionSchedule_db is None or len(productionSchedule_db) == 0:
                return err_resp("productionSchedule not found", "productionSchedule_404", 404)
            else:
                for prodSchedule in productionSchedule_db:
                    prodSchedule = complete_productionSchedule(prodSchedule, payload)
            selected_ids = [prodSchedule.id for prodSchedule in productionSchedule_db]

            db.session.add_all(productionSchedule_db)
            db.session.flush()
            db.session.commit()

            productionSchedule_dto = productionSchedule_schema.dump(productionSchedule_db, many=True)
            resp = message(True, f"productionSchedule {selected_ids} has been updated..")
            resp["data"] = productionSchedule_dto

            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def delete_productionSchedule(id):
        try:
            productionSchedule_db = productionSchedule.query.filter(
                productionSchedule.id == id
            ).first()
            if productionSchedule_db is None:
                return err_resp("productionSchedule not found", "productionSchedule_404", 404)  

            db.session.delete(productionSchedule_db)
            db.session.commit()

            return message(True, "productionSchedule has been deleted.."), 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def delete_productionSchedules(ids):
        try:
            productionSchedule_db = productionSchedule.query.filter(
                productionSchedule.id.in_(ids)
            ).all()
            if productionSchedule_db is None or len(productionSchedule_db) == 0:
                return err_resp("productionSchedule not found", "productionSchedule_404", 404)
            selected_ids = [prodSchedule.id for prodSchedule in productionSchedule_db]

            for prodSchedule in productionSchedule_db:
                db.session.delete(prodSchedule)
            db.session.commit()

            return message(True, f"productionSchedule {selected_ids} has been deleted.."), 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()