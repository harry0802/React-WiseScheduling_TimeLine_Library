import sys
from flask import current_app
from sqlalchemy import or_
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.machine import Machine
from .schemas import MachineSchema
machine_schema = MachineSchema()


def complete_machine(db_obj, payload):
    db_obj.productionArea = payload["productionArea"] \
        if payload.get("productionArea") is not None else db_obj.productionArea
    db_obj.machineSN = payload["machineSN"] \
        if payload.get("machineSN") is not None else db_obj.machineSN
    db_obj.singleOrDoubleColor = payload["singleOrDoubleColor"] \
        if payload.get("singleOrDoubleColor") is not None else db_obj.singleOrDoubleColor
    db_obj.tonnage = payload["tonnage"] \
        if payload.get("tonnage") is not None else db_obj.tonnage
    db_obj.moldTrialCost = int(payload["moldTrialCost"]) \
        if payload.get("moldTrialCost") is not None else db_obj.moldTrialCost
    db_obj.electricityCostPerSec = float(payload["electricityCostPerSec"]) \
        if payload.get("electricityCostPerSec") is not None else db_obj.electricityCostPerSec
    return db_obj


class MachineService:
    @staticmethod
    def get_machines(id = None):
        try:
            # Get the current machine
            query = Machine.query
            query = query.filter(Machine.id == id) if id else query
            machine_db_list = query.all()

            machine_dto = machine_schema.dump(machine_db_list, many=True)
            resp = message(True, "machine data sent")
            resp["data"] = machine_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    @staticmethod
    def get_machine_list():
        try:
            # Get the machine list
            query = Machine.query
            query = query.with_entities(Machine.id, Machine.productionArea, Machine.machineSN)
            machine_db_list = query.all()

            machine_dto = machine_schema.dump(machine_db_list, many=True)
            resp = message(True, "machine data sent")
            resp["data"] = machine_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        