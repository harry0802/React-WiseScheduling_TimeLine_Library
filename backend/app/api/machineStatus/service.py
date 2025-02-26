from datetime import datetime
import sys
from app import db
from sqlalchemy import literal
from app.utils_log import message, err_resp, internal_err_resp
from app.models.machineStatus import MachineStatus
from app.models.machine import Machine
from app.models.productionSchedule import ProductionSchedule
from app.api.option.optionEnum import WorkOrderStatusEnum, MachineStatusEnum
from .schemas import MachineStatusSchema
machineStatus_schema = MachineStatusSchema()


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


class MachineStatusService:
    @staticmethod
    def get_machineStatus(productionArea):
        try:
            # 1. 列出某區域的所有機台
            machine_query = Machine.query
            machine_query = machine_query.filter_by(productionArea=productionArea) if productionArea is not None else machine_query
            machine_db_list = machine_query.all()

            # 2. 機台生產中，列出productionSchedule中，某區域的所有狀態為On-goin的生產排程
            productionSchedule_query = ProductionSchedule.query
            productionSchedule_query = productionSchedule_query.filter_by(status=WorkOrderStatusEnum.ON_GOING.value)
            productionSchedule_query = productionSchedule_query.filter_by(productionArea=productionArea) if productionArea is not None else productionSchedule_query
            productionSchedule_db_list = productionSchedule_query.all()

            # 3. 機台已開始某個狀態，從machineStatus找出當日，有actualStartDate，且無actualFinishDate的 (machineStatusId)
            machineStatus_query = MachineStatus.query
            machineStatus_query = machineStatus_query.join(Machine, Machine.id == MachineStatus.machineId)
            machineStatus_query = machineStatus_query.filter(Machine.productionArea == productionArea) if productionArea is not None else machineStatus_query
            machineStatus_query = machineStatus_query.filter(MachineStatus.actualStartDate <= datetime.now())
            machineStatus_query = machineStatus_query.filter(MachineStatus.actualEndDate == None)
            machineStatus_db_list = machineStatus_query.all()

            # 4. 機台待機中(生管有預排，但現場師傅還沒開始)，找出planStartDate <= Now() <= planEndDate，沒有actualStartDate，也沒有actualFinishDate的
            machineStatus_query = MachineStatus.query
            machineStatus_query = machineStatus_query.join(Machine, Machine.id == MachineStatus.machineId)
            machineStatus_query = machineStatus_query.filter(Machine.productionArea == productionArea) if productionArea is not None else machineStatus_query
            machineStatus_query = machineStatus_query.filter(MachineStatus.planStartDate <= datetime.now())
            machineStatus_query = machineStatus_query.filter(MachineStatus.planEndDate >= datetime.now())
            machineStatus_query = machineStatus_query.filter(MachineStatus.actualStartDate == None)
            machineStatus_query = machineStatus_query.filter(MachineStatus.actualEndDate == None)
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
        try:
            machineStatus_db = complete_machineStatus(MachineStatus(), payload)
            db.session.add(machineStatus_db)
            db.session.commit()

            machineStatus_dump = machineStatus_schema.dump(machineStatus_db)
            resp = message(True, "materialOptions have been created..")
            resp["data"] = machineStatus_dump

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    # update MachineStatusStatus
    @staticmethod
    def update_machineStatus(payload):
        try:
            machineStatus_db = MachineStatus.query.filter_by(id=payload["id"]).first()
            if machineStatus_db is None:
                return err_resp("machineStatus not found.", "machineStatus_404", 404)
            machineStatus_db = complete_machineStatus(machineStatus_db, payload)
            db.session.commit()

            machineStatus_dump = machineStatus_schema.dump(machineStatus_db)
            resp = message(True, "machineStatus have been updated.")
            resp["data"] = machineStatus_dump

            return resp, 200
        except Exception as error:
            raise error
    

    # delete MachineStatusStatus
    @staticmethod
    def delete_machineStatus(id):
        try:
            machineStatus_db = MachineStatus.query.filter_by(id=id).first()
            if machineStatus_db is None:
                return err_resp("machineStatus not found.", "machineStatus_404", 404)
            db.session.delete(machineStatus_db)
            db.session.commit()

            return message(True, "machineStatus have been deleted."), 200
        except Exception as error:
            raise error
