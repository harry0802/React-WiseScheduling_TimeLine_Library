import sys
from datetime import datetime
from enum import Enum
from flask import current_app
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.maintenance.machineMaintenance import MachineMaintenance
from app.models.maintenance.moldMaintenance import MoldMaintenance
from app.models.machine import Machine
from app.models.ltmoldmap import LtMoldMap
from .schemas import MaintenanceSchema


class MachineMaintenanceItemEnum(Enum):
    BOX_CLEAN = "boxClean"
    HOT_WIRE = "hotWire"
    WIRE_CHECK = "wireCheck"
    OIL_PIPE = "oilPipe"
    FULL_CLEAN = "fullClean"
    SAFETY_EQUIPMENT = "safetyEquipment"


class MoldMaintenanceItemEnum(Enum):
    MOLD_CLEAN = "moldClean"
    MOLD_OIL = "moldOil"
    CAVITY_CHECK = "cavityCheck"
    SCREW_CHECK = "screwCheck"
    PARTS_CHECK = "partsCheck"
    WIRE_CHECK = "wireCheck"


def convert_date_to_week(date_str):
    """Convert date to week

    Args:
        date_str (_type_): _description_

    Raises:
        error: _description_

    Returns:
        _type_: _description_
    """
    try:
        # Parse the input date string
        date = datetime.strptime(date_str, '%Y-%m-%d')
        # First day of the year
        first_day = datetime(date.year, 1, 1)
        # Calculate the week number
        # Weeks start on Sunday, first week is the week containing January 1st
        week_number = (date - first_day).days // 7 + 1
        return week_number
    except Exception as error:
        raise error


class MaintenanceService:
    @staticmethod
    def get_machineMaintenance(machineId, year, week):
        try:
            # Get the current product
            query = MachineMaintenance.query
            query = query.filter(MachineMaintenance.machineId == machineId) if machineId else query
            query = query.filter(MachineMaintenance.year == year) if year else query
            query = query.filter(MachineMaintenance.week == week) if week else query
            machine_db = query.all()

            if not (machine_db):
                machine_db = []
            
            machine_dump = MaintenanceSchema().dump(machine_db, many=True)

            resp = message(True, "machine data sent")
            resp["data"] = machine_dump
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    @staticmethod
    def create_machineMaintenances_weekly(createDate:str = None, createWeek:str = None):
        """Create multiple machineMaintenances weekly

        Args:
            createDate (str, optional): _description_. Defaults to None.
            createWeek (str, optional): _description_. Defaults to None.

        Raises:
            error: _description_
        """
        try:
            if createWeek is not None:
                currentWeek = int(createWeek)
                currentYear = datetime.now().year  # 加入年份處理
            else:
                current_datetime = (
                    datetime.strptime(createDate, '%Y-%m-%d')
                    if createDate
                    else datetime.now()
                )
                currentYear = current_datetime.year
                currentDate = current_datetime.date().isoformat()
                currentWeek = convert_date_to_week(currentDate)

            # check if the current year and the current week exist in the machineMaintenance table
            machineMaintenance = MachineMaintenance.query.filter(
                MachineMaintenance.year == currentYear,
                MachineMaintenance.week == currentWeek
            ).first()
            if machineMaintenance:
                return

            # get all machineIds from machine table
            machine_db_list = Machine.query.with_entities(Machine.id).distinct().all()
            maintenance_records = []
            for machine_db in machine_db_list:
                # get all item from MachineMaintenanceItemEnum
                for item in MachineMaintenanceItemEnum:
                    maintenance_records.append(
                        MachineMaintenance(
                            machineId=machine_db.id,
                            year=currentYear,
                            week=currentWeek,
                            maintenanceItem=item.value
                        )
                    )
            # 批次保存記錄
            if maintenance_records:
                db.session.bulk_save_objects(maintenance_records)
                db.session.commit()
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()  # 加入錯誤回滾
            raise error


    @staticmethod
    def update_machineMaintenance(payload):
        try:
            # payload format
            # {
            #     "machineId":1,
            #     "year":2024,
            #     "week":12,
            #     "boxClean": "ok",
            #     "hotWire": "ok",
            #     "wireCheck": "ok",
            #     "oilPipe": "ok",
            #     "fullClean": "ok",
            #     "safetyEquipment": "ok",
            #     "inspector": "檢查人員姓名",
            #     "inspectionDate": "2024-12-20 00:00:00+08:00",
            # }
            # convert the payload to rows of machineMaintenance data
            machine_db_list = MachineMaintenance.query.filter(
                MachineMaintenance.machineId == payload["machineId"],
                MachineMaintenance.year == payload["year"],
                MachineMaintenance.week == payload["week"],
            ).all()
            
            for item in MachineMaintenanceItemEnum:
                if item.value in payload:
                    # get the machineMaintenance data from machine_db_list by item.value
                    machine_db = next((x for x in machine_db_list if x.maintenanceItem == item.value), None)
                    if machine_db:
                        machine_db.inspector = payload["inspector"] if payload.get("inspector") is not None else machine_db.inspector
                        machine_db.inspectionDate = datetime.fromisoformat(payload["inspectionDate"]) if payload.get("inspectionDate") is not None else machine_db.inspectionDate
                        machine_db.inspectionResult = payload[item.value] if payload.get(item.value) is not None and payload.get("inspector") is not None and payload.get("inspectionDate") is not None else machine_db.inspectionResult
                        machine_db.reinspector = payload["reinspector"] if payload.get("reinspector") is not None else machine_db.reinspector
                        machine_db.reinspectionDate = datetime.fromisoformat(payload["reinspectionDate"]) if payload.get("reinspectionDate") is not None else machine_db.reinspectionDate
                        machine_db.reinspectionResult = payload[item.value] if payload.get(item.value) is not None and payload.get("reinspector") is not None and payload.get("reinspectionDate") is not None else machine_db.reinspectionResult
                        machine_db.approver = payload["approver"] if payload.get("approver") is not None else machine_db.approver
                        machine_db.approvalDate = datetime.fromisoformat(payload["approvalDate"]) if payload.get("approvalDate") is not None else machine_db.approvalDate
                        machine_db.approveResult = payload[item.value] if payload.get(item.value) is not None and payload.get("approver") is not None and payload.get("approvalDate") is not None else machine_db.approveResult
                        db.session.add(machine_db)
            db.session.commit()
            resp = message(True, "machineMaintenance data has been updated.")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    @staticmethod
    def get_moldMaintenance(moldSN, year, week):
        try:
            # Get the current product
            query = MoldMaintenance.query
            query = query.filter(MoldMaintenance.moldSN == moldSN) if moldSN else query
            query = query.filter(MoldMaintenance.year == year) if year else query
            query = query.filter(MoldMaintenance.week == week) if week else query
            mold_db = query.all()

            if not (mold_db):
                mold_db = []
            
            mold_dump = MaintenanceSchema().dump(mold_db, many=True)

            resp = message(True, "mold data sent")
            resp["data"] = mold_dump
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
    

    @staticmethod
    def get_moldSNs():
        """Get distinct moldSNs"""
        try:
            moldSNs = db.session.execute(
                db.select(LtMoldMap.moldno).distinct()
            ).scalars().all()
            
            resp = message(True, "Distinct moldSNs")
            resp["data"] = moldSNs
            return resp, 200
        except Exception as error:
            raise error
        

    @staticmethod
    def create_moldMaintenances_weekly(createDate:str = None, createWeek:str = None):
        """Create multiple moldMaintenances weekly

        Args:
            createDate (str, optional): _description_. Defaults to None.
            createWeek (str, optional): _description_. Defaults to None.

        Raises:
            error: _description_
        """
        try:
            if createWeek is not None:
                currentWeek = int(createWeek)
                currentYear = datetime.now().year  # 加入年份處理
            else:
                current_datetime = (
                    datetime.strptime(createDate, '%Y-%m-%d')
                    if createDate
                    else datetime.now()
                )
                currentYear = current_datetime.year
                currentDate = current_datetime.date().isoformat()
                currentWeek = convert_date_to_week(currentDate)

            # check if the current year and the current week exist in the moldMaintenance table
            moldMaintenance = MoldMaintenance.query.filter(
                MoldMaintenance.year == currentYear,
                MoldMaintenance.week == currentWeek
            ).first()
            if moldMaintenance:
                return

            # get all moldno from ltmoldmap table
            ltmoldmap_db_list = LtMoldMap.query.with_entities(LtMoldMap.moldno).distinct().all()
            maintenance_records = []
            for ltmoldmap_db in ltmoldmap_db_list:
                # get all item from MoldMaintenanceItemEnum
                for item in MoldMaintenanceItemEnum:
                    maintenance_records.append(
                        MoldMaintenance(
                            moldSN=ltmoldmap_db.moldno,
                            year=currentYear,
                            week=currentWeek,
                            maintenanceItem=item.value
                        )
                    )
            # 批次保存記錄
            if maintenance_records:
                db.session.bulk_save_objects(maintenance_records)
                db.session.commit()
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()  # 加入錯誤回滾
            raise error


    @staticmethod
    def update_moldMaintenance(payload):
        try:
            # payload format
            # {
            #     "moldSN":"",
            #     "year":2024,
            #     "week":12,
            #     "moldClean": "ok",
            #     "moldOil": "ok",
            #     "cavityCheck": "ok",
            #     "screwCheck": "ok",
            #     "partsCheck": "ok",
            #     "wireCheck": "ok",
            #     "inspector": "檢查人員姓名",
            #     "inspectionDate": "2024-12-20 00:00:00+08:00",
            # }
            # convert the payload to rows of moldMaintenance data
            mold_db_list = MoldMaintenance.query.filter(
                MoldMaintenance.moldSN == payload["moldSN"],
                MoldMaintenance.year == payload["year"],
                MoldMaintenance.week == payload["week"],
            ).all()
            
            for item in MoldMaintenanceItemEnum:
                if item.value in payload:
                    # get the moldMaintenance data from mold_db_list by item.value
                    mold_db = next((x for x in mold_db_list if x.maintenanceItem == item.value), None)
                    if mold_db:
                        mold_db.inspector = payload["inspector"] if payload.get("inspector") is not None else mold_db.inspector
                        mold_db.inspectionDate = datetime.fromisoformat(payload["inspectionDate"]) if payload.get("inspectionDate") is not None else mold_db.inspectionDate
                        mold_db.inspectionResult = payload[item.value] if payload.get(item.value) is not None and payload.get("inspector") is not None and payload.get("inspectionDate") is not None else mold_db.inspectionResult
                        mold_db.reinspector = payload["reinspector"] if payload.get("reinspector") is not None else mold_db.reinspector
                        mold_db.reinspectionDate = datetime.fromisoformat(payload["reinspectionDate"]) if payload.get("reinspectionDate") is not None else mold_db.reinspectionDate
                        mold_db.reinspectionResult = payload[item.value] if payload.get(item.value) is not None and payload.get("reinspector") is not None and payload.get("reinspectionDate") is not None else mold_db.reinspectionResult
                        mold_db.approver = payload["approver"] if payload.get("approver") is not None else mold_db.approver
                        mold_db.approvalDate = datetime.fromisoformat(payload["approvalDate"]) if payload.get("approvalDate") is not None else mold_db.approvalDate
                        mold_db.approveResult = payload[item.value] if payload.get(item.value) is not None and payload.get("approver") is not None and payload.get("approvalDate") is not None else mold_db.approveResult
                        db.session.add(mold_db)
            db.session.commit()
            resp = message(True, "moldMaintenance data has been updated.")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        