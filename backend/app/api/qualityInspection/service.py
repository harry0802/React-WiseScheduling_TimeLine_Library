import sys
from flask import current_app
from sqlalchemy import func, desc, case
from sqlalchemy.orm import aliased
from datetime import datetime
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.processOption import ProcessOption
from app.models.product import Product
from app.models.process import Process
from app.models.productionSchedule import ProductionSchedule
from app.models.qualityInspection import QualityInspection
from app.api.option.service import optionService
from app.api.option.optionEnum import WorkOrderStatusEnum, InspectionTypeEnum
from .schemas import qualityInspectionSchema
qualityInspection_schema = qualityInspectionSchema()
validTypes = optionService.get_all_options("inspectionType") or [InspectionTypeEnum.FIRST.value, InspectionTypeEnum.IN_PROCESS.value]


def complete_qualityInspection(db_obj, payload):
    db_obj.productionScheduleId = payload["productionScheduleId"] \
        if payload.get("productionScheduleId") is not None else db_obj.productionScheduleId
    db_obj.inspectionQuantity = payload["inspectionQuantity"] \
        if payload.get("inspectionQuantity") is not None else db_obj.inspectionQuantity
    db_obj.goodQuantity = payload["goodQuantity"] \
        if payload.get("goodQuantity") is not None else db_obj.goodQuantity
    db_obj.inspector = payload["inspector"] \
        if payload.get("inspector") is not None else db_obj.inspector
    db_obj.inspectionDate = datetime.fromisoformat(payload["inspectionDate"]) \
        if payload.get("inspectionDate") is not None else db_obj.inspectionDate
    db_obj.inspectionType = payload["inspectionType"] \
        if payload.get("inspectionType") is not None else db_obj.inspectionType
    
    # check if inspectionType is valid
    if db_obj.inspectionType not in validTypes:
        raise ValueError("inspectionType is invalid", "inspectionType_404")
    return db_obj


class qualityInspectionService:
    @staticmethod
    def get_first_qualityInspections():
        try:
            # Get the current qualityInspection
            # if QualityInspection.goodQuantity == QualityInspection.inspectionQuantity, then result is "OK"
            # if QualityInspection.goodQuantity < QualityInspection.inspectionQuantity, then result is "NG"
            # if QualityInspection.goodQuantity and QualityInspection.inspectionQuantity are null, then result is "未檢驗"
            query = ProductionSchedule.query
            query = query.with_entities(QualityInspection.__table__, ProductionSchedule.workOrderSN,  ProductionSchedule.machineSN,
                                        ProcessOption.processName, Product.productName,
                                        db.func.IF(QualityInspection.goodQuantity == QualityInspection.inspectionQuantity, "OK",
                                        db.func.IF(QualityInspection.goodQuantity < QualityInspection.inspectionQuantity, "NG", "未檢驗")).label("result")
                                        )
            query = query.join(QualityInspection, QualityInspection.productionScheduleId == ProductionSchedule.id, isouter=True) # left outer join
            query = query.join(Product, ProductionSchedule.productId == Product.id)
            query = query.join(Process, ProductionSchedule.processId == Process.id)
            query = query.join(ProcessOption, Process.processOptionId == ProcessOption.id)
            query = query.filter(ProductionSchedule.status == WorkOrderStatusEnum.ON_GOING.value)
            query = query.filter(db.or_(QualityInspection.inspectionType == InspectionTypeEnum.FIRST.value, QualityInspection.inspectionType == None))
            qualityInspection_db = query.all()
            
            if not (qualityInspection_db):
                qualityInspection_db = []
            
            qualityInspection_dto = qualityInspection_schema.dump(qualityInspection_db, many=True)

            resp = message(True, "qualityInspection data sent")
            resp["data"] = qualityInspection_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        

    @staticmethod
    def get_in_process_qualityInspections():
        try:
            # SELECT *
            # FROM (
            #     SELECT *, 
            #     ROW_NUMBER() OVER (PARTITION BY productionScheduleId ORDER BY id DESC) AS rn,
            #     COUNT() OVER (PARTITION BY productionScheduleId) AS inspectionCount
            #     FROM plastic.qualityInspection
            #     WHERE inspectionType = "巡檢"
            # ) qualityInspection INNER JOIN `productionSchedule` ON `qualityInspection`.`productionScheduleId` = `productionSchedule`.id 
            # INNER JOIN product ON `productionSchedule`.`productId` = product.id 
            # INNER JOIN process ON `productionSchedule`.`processId` = process.id 
            # INNER JOIN `processOption` ON process.`processOptionId` = `processOption`.id
            # WHERE rn = 1
            # AND `productionSchedule`.`status` = 'On-going';

            # Subquery for row number
            subquery = db.session.query(
                QualityInspection,
                func.row_number().over(
                    partition_by=QualityInspection.productionScheduleId,
                    order_by=desc(QualityInspection.id)
                ).label('rn'),
                func.count().over(
                    partition_by=QualityInspection.productionScheduleId
                ).label('inspectionCount')
            ).filter(QualityInspection.inspectionType == InspectionTypeEnum.IN_PROCESS.value).subquery()
            
            # Main query to filter for the latest row in each group
            aliased_qi = aliased(QualityInspection, subquery)

            query = db.session.query(subquery.c.inspectionCount, aliased_qi.id, aliased_qi.productionScheduleId, aliased_qi.inspectionQuantity, 
                                     aliased_qi.goodQuantity, aliased_qi.inspector, aliased_qi.inspectionDate, aliased_qi.inspectionType, 
                                     ProductionSchedule.workOrderSN,  ProductionSchedule.machineSN,
                                     ProcessOption.processName, Product.productName,
                                     db.func.IF(aliased_qi.goodQuantity == aliased_qi.inspectionQuantity, "OK",
                                     db.func.IF(aliased_qi.goodQuantity < aliased_qi.inspectionQuantity, "NG", "未檢驗")).label("result")
                                    )
            query = query.join(ProductionSchedule, ProductionSchedule.id == aliased_qi.productionScheduleId)
            query = query.join(Product, ProductionSchedule.productId == Product.id)
            query = query.join(Process, ProductionSchedule.processId == Process.id)
            query = query.join(ProcessOption, Process.processOptionId == ProcessOption.id)
            query = query.filter(subquery.c.rn == 1)
            query = query.filter(ProductionSchedule.status == WorkOrderStatusEnum.ON_GOING.value)
            qualityInspection_db = query.all()
            
            if not (qualityInspection_db):
                qualityInspection_db = []
            
            qualityInspection_dto = qualityInspection_schema.dump(qualityInspection_db, many=True)

            resp = message(True, "qualityInspection data sent")
            resp["data"] = qualityInspection_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    # create multiple qualityInspections
    @staticmethod
    def create_qualityInspections(payload):
        try:
            qualityInspection_db_list = []
            for data in payload:
                qualityInspection_db_list.append(complete_qualityInspection(QualityInspection(), data))
            db.session.add_all(qualityInspection_db_list)
            db.session.flush()
            db.session.commit()

            qualityInspection_dto = qualityInspection_schema.dump(qualityInspection_db_list, many=True)
            resp = message(True, "qualityInspections have been created..")
            resp["data"] = qualityInspection_dto

            return resp, 200
        except ValueError as error:
            msg = error.args[0] if len(error.args) > 0 else ""
            err_reason = error.args[1] if len(error.args) > 1 else ""
            return err_resp(msg, err_reason, 404)
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    # update multiple qualityInspections
    @staticmethod
    def update_qualityInspections(payload):
        try:
            qualityInspection_db_list = []
            for data in payload:
                qualityInspection_db = QualityInspection.query.filter(
                    QualityInspection.id == data["id"]
                ).first()
                if qualityInspection_db is None:
                    return err_resp("qualityInspection not found", "qualityInspection_404", 404)
                else:
                    qualityInspection_db = complete_qualityInspection(qualityInspection_db, data)
                qualityInspection_db_list.append(qualityInspection_db)
            db.session.add_all(qualityInspection_db_list)
            db.session.flush()
            db.session.commit()

            qualityInspection_dto = qualityInspection_schema.dump(qualityInspection_db_list, many=True)
            resp = message(True, "qualityInspections have been updated..")
            resp["data"] = qualityInspection_dto
            return resp, 200
        except ValueError as error:
            msg = error.args[0] if len(error.args) > 0 else ""
            err_reason = error.args[1] if len(error.args) > 1 else ""
            return err_resp(msg, err_reason, 404)
        # exception without handling should raise to the caller
        except Exception as error:
            raise error