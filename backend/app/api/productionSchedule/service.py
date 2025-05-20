from datetime import datetime, date, timedelta
import math
import pytz
import os
import sys
from flask import current_app
from sqlalchemy import func
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.productionSchedule import ProductionSchedule
from app.models.ly0000AB import LY0000AB
from app.models.ltmoldmap import LtMoldMap
from app.models.product import Product
from app.models.process import Process
from app.models.processOption import ProcessOption
from app.models.processMold import ProcessMold
from app.api.option.optionEnum import WorkOrderStatusEnum
from app.api.productionSchedule.productionScheduleOngoingService import ProductionScheduleOngoingService
from app.service.utils_iot import shift_by_holiday
from .schemas import productionScheduleSchema
from app.api.smartSchedule.service import SmartScheduleService
from dotenv import load_dotenv
load_dotenv()

TZ = os.getenv("TIMEZONE","Asia/Taipei")
productionSchedule_schema = productionScheduleSchema()


def complete_productionSchedule(db_obj, payload):
    # 確認預計上機日是否有變更或者機台是否有變更，有的話，就更新相關的排程
    # 若需要更新相關的排程，必須在更新db_obj之前，否則在update_work_order_schedule時查到的ProductionSchedule會是更新後的資料(Session快取)
    if payload.get("planOnMachineDate") is not None and db_obj.planOnMachineDate != payload.get("planOnMachineDate") or \
       payload.get("machineSN") is not None and db_obj.machineSN != payload.get("machineSN"):
        SmartScheduleService.update_work_order_schedule({
            "productionScheduleId": db_obj.id,
            "newStartDate": payload.get("planOnMachineDate") or db_obj.planOnMachineDate,
            "machineSN": payload.get("machineSN") or db_obj.machineSN,
        })
    db_obj.productId = int(payload["productId"]) \
        if payload.get("productId") is not None else db_obj.productId
    db_obj.processId = int(payload["processId"]) \
        if payload.get("processId") is not None else db_obj.processId
    db_obj.productionArea = payload["productionArea"] \
        if payload.get("productionArea") is not None else db_obj.productionArea
    db_obj.machineSN = payload["machineSN"] \
        if payload.get("machineSN") is not None else db_obj.machineSN
    db_obj.serialNumber = payload["serialNumber"] \
        if payload.get("serialNumber") is not None else db_obj.serialNumber
    db_obj.workOrderSN = payload["workOrderSN"] \
        if payload.get("workOrderSN") is not None else db_obj.workOrderSN
    db_obj.workOrderQuantity = int(payload["workOrderQuantity"]) \
        if payload.get("workOrderQuantity") is not None else db_obj.workOrderQuantity
    db_obj.workOrderDate = datetime.fromisoformat(payload["workOrderDate"]) \
        if payload.get("workOrderDate") is not None else db_obj.workOrderDate
    db_obj.moldingSecond = int(payload["moldingSecond"]) \
        if payload.get("moldingSecond") is not None else db_obj.moldingSecond
    db_obj.planOnMachineDate = datetime.fromisoformat(payload["planOnMachineDate"]) \
        if payload.get("planOnMachineDate") is not None else db_obj.planOnMachineDate
    db_obj.actualOnMachineDate = datetime.fromisoformat(payload["actualOnMachineDate"]) \
        if payload.get("actualOnMachineDate") is not None else db_obj.actualOnMachineDate
    db_obj.moldWorkDays = int(payload["moldWorkDays"]) \
        if payload.get("moldWorkDays") is not None else db_obj.moldWorkDays
    db_obj.moldWorkDays = 0 if db_obj.moldWorkDays is None else db_obj.moldWorkDays
    db_obj.planFinishDate = datetime.fromisoformat(payload["planFinishDate"]) \
        if payload.get("planFinishDate") is not None else db_obj.planFinishDate
    db_obj.actualFinishDate = datetime.fromisoformat(payload["actualFinishDate"]) \
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
    prev_status = db_obj.status
    db_obj.status = payload["status"] \
        if payload.get("status") is not None else db_obj.status
    #datetime type transform
    db_obj.planOnMachineDate = date.fromisoformat(db_obj.planOnMachineDate) if type(db_obj.planOnMachineDate) == str else db_obj.planOnMachineDate
    #預估產能相關
    # Required: workOrderQuantity, moldingSecond, dailyWorkingHours, moldCavity, conversionRate
    if (
        type(db_obj.workOrderQuantity) != int or db_obj.workOrderQuantity <= 0
        or type(db_obj.planOnMachineDate) != datetime
        or type(db_obj.moldingSecond) != int or db_obj.moldingSecond <= 0
        or type(db_obj.dailyWorkingHours) != int or db_obj.dailyWorkingHours <= 0
        or type(db_obj.moldCavity) != int or db_obj.moldCavity <= 0
        or type(db_obj.moldWorkDays) != int or db_obj.moldWorkDays < 0
        or type(db_obj.conversionRate) != float or db_obj.conversionRate <= 0
        ):
        current_app.logger.debug(f"complete_productionSchedule:SKIP calculate capacity")
    else:
        current_app.logger.debug(f"complete_productionSchedule:calculate capacity")
        current_app.logger.debug(f"workOrderQuantity: {db_obj.workOrderQuantity}")
        current_app.logger.debug(f"planOnMachineDate: {db_obj.planOnMachineDate}")
        current_app.logger.debug(f"moldingSecond: {db_obj.moldingSecond}")
        current_app.logger.debug(f"dailyWorkingHours: {db_obj.dailyWorkingHours}")
        current_app.logger.debug(f"moldCavity: {db_obj.moldCavity}")
        current_app.logger.debug(f"moldWorkDays: {db_obj.moldWorkDays}")
        current_app.logger.debug(f"conversionRate: {db_obj.conversionRate}")
        #每小時產能(drop decimal)
        db_obj.hourlyCapacity = (60 * 60) * (1/db_obj.moldingSecond) * db_obj.moldCavity
        db_obj.hourlyCapacity = math.floor(db_obj.hourlyCapacity)
        current_app.logger.debug(f"hourlyCapacity: {db_obj.hourlyCapacity}")
        #每日產能(drop decimal)
        db_obj.dailyCapacity = db_obj.hourlyCapacity * db_obj.dailyWorkingHours * db_obj.conversionRate
        db_obj.dailyCapacity = math.floor(db_obj.dailyCapacity)
        current_app.logger.debug(f"dailyCapacity: {db_obj.dailyCapacity}")
        #工作天數(unconditional round up)
        db_obj.workDays = db_obj.workOrderQuantity / db_obj.dailyCapacity
        db_obj.workDays = math.ceil(db_obj.workDays)
        current_app.logger.debug(f"workDays: {db_obj.workDays}")
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
    status = payload.get("status", None)
    if db_obj.actualOnMachineDate is None:
        db_obj.status = WorkOrderStatusEnum.NOT_YET.value
    if db_obj.actualOnMachineDate is not None:
        db_obj.status = WorkOrderStatusEnum.ON_GOING.value
    if status in [WorkOrderStatusEnum.PAUSE.value, WorkOrderStatusEnum.CANCEL.value]:
        db_obj.status = status
    if db_obj.actualFinishDate is not None:
        db_obj.status = WorkOrderStatusEnum.DONE.value
    
    # 如果狀態有變化，就更新ProductionScheduleOngoing資料表
    if db_obj.status != prev_status:
        # 找出ProductionScheduleOngoing資料表中，對應的生產排程ID
        productionScheduleOngoing_db = ProductionScheduleOngoingService.get_productionScheduleOngoing_by_productionScheduleId(db_obj.id)
        
        # 變成On-going，ProductionScheduleOngoing資料表會自動新增一筆，並更新開始時間
        if db_obj.status == WorkOrderStatusEnum.ON_GOING.value:
            ProductionScheduleOngoingService.create_productionScheduleOngoing({
                "productionScheduleId": db_obj.id,
                "startTime": db_obj.actualOnMachineDate.isoformat()
            })
        # 變成Pause，ProductionScheduleOngoing資料表更新結束時間
        if db_obj.status == WorkOrderStatusEnum.PAUSE.value:
            # 如果有對應的ProductionScheduleOngoing資料，就更新結束時間
            if productionScheduleOngoing_db is not None:
                ProductionScheduleOngoingService.update_productionScheduleOngoing_endtime({
                    "id": productionScheduleOngoing_db.id,
                    "productionScheduleId": db_obj.id,
                    "endTime": datetime.now(pytz.timezone(TZ)).isoformat()
                })
        # 變成Done，ProductionScheduleOngoing資料表更新結束時間
        if db_obj.status == WorkOrderStatusEnum.DONE.value:
            # 如果有對應的ProductionScheduleOngoing資料，就更新結束時間
            if productionScheduleOngoing_db is not None:
                ProductionScheduleOngoingService.update_productionScheduleOngoing_endtime({
                    "id": productionScheduleOngoing_db.id,
                    "productionScheduleId": db_obj.id,
                    "endTime": db_obj.actualFinishDate.isoformat()
                })

    return db_obj

class productionScheduleService:
    @staticmethod
    def get_productionSchedules(page, size, sort, start_planOnMachineDate, end_planOnMachineDate, machineSN=None, status="all", workOrderSN=None, 
                              productName=None, expiry="無期限", machineSNs=[]):
        try:
            # transform the ISO format datetime to datetime type
            start_planOnMachineDate = datetime.fromisoformat(start_planOnMachineDate) \
                if start_planOnMachineDate else None
            end_planOnMachineDate = datetime.fromisoformat(end_planOnMachineDate) \
                if end_planOnMachineDate else None
            machineSNs = machineSNs.split(",") if machineSNs else None

            # Get the current productionSchedule
            # Subquery for moldNos
            mold_subquery = (
                db.session.query(Process.id.label('process_id'), 
                                func.group_concat(LtMoldMap.moldno).label('moldNos'))
                .join(ProcessMold, Process.id == ProcessMold.processId)
                .join(LtMoldMap, ProcessMold.ltmoldmapId == LtMoldMap.no)
                .group_by(Process.id)
                .subquery()
            )
            # main query
            query = ProductionSchedule.query
            query = query.with_entities(ProductionSchedule.id, ProductionSchedule.productId, ProductionSchedule.processId,
                                        ProductionSchedule.productionArea, ProductionSchedule.machineSN, ProductionSchedule.serialNumber,
                                        ProductionSchedule.workOrderSN, ProductionSchedule.workOrderQuantity, ProductionSchedule.workOrderDate, 
                                        ProductionSchedule.moldingSecond, ProductionSchedule.planOnMachineDate, ProductionSchedule.actualOnMachineDate, 
                                        ProductionSchedule.moldWorkDays, ProductionSchedule.workDays, ProductionSchedule.planFinishDate, 
                                        ProductionSchedule.actualFinishDate, ProductionSchedule.comment, ProductionSchedule.dailyWorkingHours, 
                                        ProductionSchedule.moldCavity, ProductionSchedule.week, ProductionSchedule.singleOrDoubleColor, 
                                        ProductionSchedule.conversionRate, ProductionSchedule.status, Product.productSN, Product.productName, 
                                        ProcessOption.processName,
                                        mold_subquery.c.moldNos.label('moldNos'))
            # Joins
            query = query.outerjoin(Product, ProductionSchedule.productId == Product.id) # left outer join
            query = query.outerjoin(Process, ProductionSchedule.processId == Process.id) # left outer join
            query = query.outerjoin(ProcessOption, Process.processOptionId == ProcessOption.id) # left outer join
            query = query.outerjoin(ProcessMold, Process.id == ProcessMold.processId) # left outer join
            query = query.outerjoin(mold_subquery, Process.id == mold_subquery.c.process_id)  # left outer join
            # Filters
            query = query.filter(ProductionSchedule.status != "取消生產")
            query = query.filter(ProductionSchedule.planOnMachineDate.between(start_planOnMachineDate, end_planOnMachineDate)) \
                    if start_planOnMachineDate and end_planOnMachineDate else query
            query = query.filter(ProductionSchedule.machineSN == machineSN) if machineSN else query
            query = query.filter(ProductionSchedule.status == status) if status != "all" else query
            query = query.filter(ProductionSchedule.workOrderSN.like(f"%{workOrderSN}%")) if workOrderSN else query
            query = query.filter(Product.productName.like(f"%{productName}%")) if productName else query
            if (expiry == "即將到期"):
                # 預計完成日前七天，該單尚未完成，為即將到期
                query = query.filter(ProductionSchedule.status != "Done", 
                                     ProductionSchedule.planFinishDate.between(datetime.now(), datetime.now() + timedelta(days=7)))
            elif (expiry == "已經過期"):
                # 過了預計完成日，該單尚未完成，就是已經過期
                query = query.filter(ProductionSchedule.status != "Done",
                                     ProductionSchedule.planFinishDate < datetime.now())
            query = query.filter(ProductionSchedule.machineSN.in_(machineSNs)) if machineSNs else query
            query = query.group_by(ProductionSchedule.id)
            if hasattr(ProductionSchedule, sort):
                query = query.order_by(getattr(ProductionSchedule, sort).desc())
            else:
                query = query.order_by(ProductionSchedule.id.desc())
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
                "sort": sort if hasattr(ProductionSchedule, sort) else "id",
                "total_pages": total_pages,
                "total_count": total_count,
            }
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        

    @staticmethod
    def get_productionSchedule(id):
        try:
            # Get the current productionSchedule
            query = ProductionSchedule.query
            query = query.with_entities(ProductionSchedule.id, ProductionSchedule.productId, ProductionSchedule.processId,
                                        ProductionSchedule.productionArea, ProductionSchedule.machineSN, ProductionSchedule.serialNumber,
                                        ProductionSchedule.workOrderSN, ProductionSchedule.workOrderQuantity, ProductionSchedule.workOrderDate, 
                                        ProductionSchedule.moldingSecond, ProductionSchedule.planOnMachineDate, ProductionSchedule.actualOnMachineDate, 
                                        ProductionSchedule.moldWorkDays, ProductionSchedule.workDays, ProductionSchedule.planFinishDate, 
                                        ProductionSchedule.actualFinishDate, ProductionSchedule.comment, ProductionSchedule.dailyWorkingHours, 
                                        ProductionSchedule.moldCavity, ProductionSchedule.week, ProductionSchedule.singleOrDoubleColor, 
                                        ProductionSchedule.conversionRate, ProductionSchedule.status, Product.productSN, Product.productName, 
                                        ProcessOption.processName,
                                        func.group_concat(LtMoldMap.moldno).label('moldNos'))
            query = query.join(Product, ProductionSchedule.productId == Product.id, isouter = True) # left outer join
            query = query.join(Process, ProductionSchedule.processId == Process.id, isouter = True) # left outer join
            query = query.join(ProcessOption, Process.processOptionId == ProcessOption.id, isouter = True) # left outer join
            query = query.join(ProcessMold, Process.id == ProcessMold.processId, isouter = True) # left outer join
            query = query.join(LtMoldMap, ProcessMold.ltmoldmapId == LtMoldMap.no, isouter = True) # left outer join
            query = query.filter(ProductionSchedule.status != "取消生產")
            query = query.filter(ProductionSchedule.id == id)
            productionSchedule_db = query.first()

            if productionSchedule_db is None:
                return err_resp("productionSchedule not found", "productionSchedule_404", 404)
            
            productionSchedule_dto = productionSchedule_schema.dump(productionSchedule_db)

            resp = message(True, "productionSchedule data sent")
            resp["data"] = productionSchedule_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        

    @staticmethod
    def get_machineSNs():
        try:
            query = ProductionSchedule.query
            query = query.with_entities(ProductionSchedule.machineSN, ProductionSchedule.productionArea)
            query = query.filter(ProductionSchedule.status != "取消生產")
            query = query.distinct(ProductionSchedule.machineSN)
            query = query.order_by(ProductionSchedule.machineSN)
            machineSN_db = query.all()
            productionSchedule_dto = productionSchedule_schema.dump(machineSN_db, many=True)

            resp = message(True, "machineSN data sent")
            resp["data"] = productionSchedule_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
    

    @staticmethod
    def get_productionSchedule_through_LY(id, workOrderSN):
        current_app.logger.info(f"get_productionSchedule_through_LY: {workOrderSN}")
        try:
            ly0000AB_db = LY0000AB.query.filter(
                    LY0000AB.MP_NO == workOrderSN
                ).first()
            if ly0000AB_db is None:
                return err_resp("查無此製令單編號", "0000AB_404", 404)
            else:
                productionSchedule_db = ProductionSchedule.query.filter(
                    ProductionSchedule.id == id
                ).first()

                # get Product ID by productSN from Product table
                product_db = Product.query.filter(
                    Product.productSN == ly0000AB_db.MP_SKNO
                ).first()
                if product_db is None:
                    return err_resp("無此產品編號", "product_404", 404)
                
                productionSchedule_db.productId = product_db.id
                productionSchedule_db.workOrderSN = ly0000AB_db.MP_NO
                productionSchedule_db.productName = ly0000AB_db.MP_SKNM
                productionSchedule_db.productSN = ly0000AB_db.MP_SKNO
                productionSchedule_db.workOrderQuantity = ly0000AB_db.MP_AQTY
                productionSchedule_db.workOrderDate = ly0000AB_db.MP_EDTE

            productionSchedule_dto = productionSchedule_schema.dump(productionSchedule_db)
            resp = message(True, "productionSchedule data sent")
            resp["data"] = productionSchedule_dto
            return resp, 200
        except Exception as error:
            raise error
            

    @staticmethod
    def check_start_eligibility(workOrderSN, processId):
        try:
            result = False
            query = ProductionSchedule.query
            query = query.with_entities(ProductionSchedule.machineSN, ProductionSchedule.productionArea)
            query = query.join(Process, Process.id == ProductionSchedule.processId)
            query = query.filter(ProductionSchedule.status == "尚未上機")
            query = query.filter(ProductionSchedule.workOrderSN == workOrderSN)
            query = query.filter(Process.id < processId)
            if len(query.all()) == 0:
                result = True

            resp = message(True, "machineSN data sent")
            resp["data"] = result
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    @staticmethod
    def create_productionSchedule(payload):
        try:
            productionSchedule_db = ProductionSchedule()
            # exception test
            # payload.pop("workOrderQuantity", None)
            # 10+"sfd"*10*"SAD"^234
            productionSchedule_db = complete_productionSchedule(productionSchedule_db, payload)
            db.session.add(productionSchedule_db)
            db.session.flush()
            db.session.commit()

            productionSchedule_dto = productionSchedule_schema.dump(productionSchedule_db)
            resp = message(True, "productionSchedule has been updated..")
            resp["data"] = productionSchedule_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    # create multiple productionSchedules
    @staticmethod
    def create_productionSchedules(payload):
        try:
            productionSchedule_db_list = []
            for data in payload:
                productionSchedule_db_list.append(complete_productionSchedule(ProductionSchedule(), data))
            db.session.add_all(productionSchedule_db_list)
            db.session.flush()
            db.session.commit()

            productionSchedule_dto = productionSchedule_schema.dump(productionSchedule_db_list, many=True)
            resp = message(True, "productionSchedules have been created..")
            resp["data"] = productionSchedule_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    @staticmethod
    def update_productionSchedule(id, payload):
        try:
            productionSchedule_db = ProductionSchedule.query.filter(
                    ProductionSchedule.id == id
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
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
    

    @staticmethod
    def update_productionSchedules(ids, payload):
        try:
            productionSchedule_db = ProductionSchedule.query.filter(
                ProductionSchedule.id.in_(ids)
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
            resp["meta"] = {
                "ids": selected_ids
            }
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    @staticmethod
    def delete_productionSchedule(id):
        try:
            productionSchedule_db = ProductionSchedule.query.filter(
                ProductionSchedule.id == id
            ).first()
            if productionSchedule_db is None:
                return err_resp("productionSchedule not found", "productionSchedule_404", 404)  

            db.session.delete(productionSchedule_db)
            db.session.commit()
            resp = message(True, "productionSchedule has been deleted..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    @staticmethod
    def delete_productionSchedules(ids):
        try:
            productionSchedule_db = ProductionSchedule.query.filter(
                ProductionSchedule.id.in_(ids)
            ).all()
            if productionSchedule_db is None or len(productionSchedule_db) == 0:
                return err_resp("productionSchedule not found", "productionSchedule_404", 404)
            selected_ids = [prodSchedule.id for prodSchedule in productionSchedule_db]

            for prodSchedule in productionSchedule_db:
                db.session.delete(prodSchedule)
            db.session.commit()
            resp = message(True, f"productionSchedule {selected_ids} has been deleted..")
            resp["meta"] = {
                "ids": selected_ids
            }
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error