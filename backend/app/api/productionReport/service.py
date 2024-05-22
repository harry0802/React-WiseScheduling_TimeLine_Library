from datetime import datetime, timedelta, timezone
import math
import sys
from flask import current_app
from app import db
from app.utils import message, err_resp, internal_err_resp
from app.models.productionReport import ProductionReport
from app.models.molds import molds
from app.models.injector import Injector
from app.models.injectorOee15m import InjectorOee15m
from .schemas import productionReportSchema, productionScheduleReportSchema
from sqlalchemy import or_
from app.models.productionSchedule import ProductionSchedule
productionReport_schema = productionReportSchema()
productionScheduleReport_schema = productionScheduleReportSchema()

def get_sum_of_run_from_injector_oee_15m(machineSN, endTime):
    # SELECT sum(run) FROM opcua.injector_oee_15m WHERE machine_name = '機台號碼' AND timestamp BETWEEN '母批/子批結束時間 - 24小時' AND '母批/子批結束時間'
    try:
        query = InjectorOee15m.query
        query = query.filter(
            InjectorOee15m.timestamp.between(endTime - timedelta(hours=24), endTime),
            InjectorOee15m.machine_name == machineSN.lower()
        )
        sum_of_run = query.with_entities(db.func.sum(InjectorOee15m.run)).scalar()
        return sum_of_run
    except Exception as error:
        raise error
    

def get_current_modulus_from_injector(machineSN, startTime, endTime):
    # SELECT current_modulus FROM opcua.injector WHERE last_updated BETWEEN '母批/子批結束時間 - 1分鐘' AND '母批/子批結束時間' AND name = '機台號碼' ORDER BY last_updated DESC LIMIT 1;
    # SELECT current_modulus FROM opcua.injector WHERE last_updated BETWEEN '母批/子批開始時間' AND '母批/子批開始時間 + 1分鐘' AND name = '機台號碼' ORDER BY last_updated ASC LIMIT 1;
    try:
        # convert startTime to user's local timezone according to the endTime
        startTime = startTime.astimezone(timezone(endTime.tzinfo.utcoffset(startTime)))

        query = Injector.query
        query = query.filter(
            Injector.last_updated.between(endTime - timedelta(minutes=1), endTime),
            Injector.name == machineSN.lower()
        )
        query = query.order_by(Injector.last_updated.desc())
        end_current_modulus = query.with_entities(Injector.current_modulus).first()
        end_current_modulus = int(end_current_modulus[0]) if end_current_modulus else 0

        query = Injector.query
        query = query.filter(
            Injector.last_updated.between(startTime, startTime + timedelta(minutes=1)),
            Injector.name == machineSN.lower()
        )
        query = query.order_by(Injector.last_updated.asc())
        start_current_modulus = query.with_entities(Injector.current_modulus).first()
        start_current_modulus = int(start_current_modulus[0]) if start_current_modulus else 0
        return start_current_modulus, end_current_modulus
    except Exception as error:
        raise error

    
def get_operating_mode_from_injector(machineSN, startTime):
    # SELECT operating_mode FROM opcua.injector WHERE last_updated >= '母批/子批開始時間 - 10秒' AND name = '機台號碼' ORDER BY last_updated ASC LIMIT 1;
    try:
        query = Injector.query
        query = query.filter(
            Injector.last_updated >= startTime - timedelta(seconds=10),
            Injector.name == machineSN.lower()
        )
        query = query.order_by(Injector.last_updated.asc())
        operating_mode = query.with_entities(Injector.operating_mode).first()
        operating_mode = operating_mode[0] if operating_mode else ""
        return operating_mode
    except Exception as error:
        return None


def find_childLots_by_workOrderSN(workOrderSN):
    # get the child lots by the workOrderSN and serialNumber != 0
    try:
        query = ProductionReport.query
        query = query.filter(
            ProductionReport.workOrderSN == workOrderSN,
            ProductionReport.serialNumber != 0
        )
        childLots = query.all()
        return childLots
    except Exception as error:
        raise error


def complete_productionReport(mode, db_obj, payload):
    db_obj.startTime = datetime.fromisoformat(payload["startTime"]) \
        if payload.get("startTime") is not None else db_obj.startTime
    db_obj.machineSN = payload["machineSN"] \
        if payload.get("machineSN") is not None else db_obj.machineSN
    db_obj.workOrderSN = payload["workOrderSN"] \
        if payload.get("workOrderSN") is not None else db_obj.workOrderSN
    db_obj.serialNumber = int(payload["serialNumber"]) \
        if payload.get("serialNumber") is not None else db_obj.serialNumber
    db_obj.lotName = payload["lotName"] \
        if payload.get("lotName") is not None else db_obj.lotName
    db_obj.workOrderQuantity = int(payload["workOrderQuantity"]) \
        if payload.get("workOrderQuantity") is not None else db_obj.workOrderQuantity
    db_obj.material = payload["material"] \
        if payload.get("material") is not None else db_obj.material
    db_obj.moldCavity = int(payload["moldCavity"]) \
        if payload.get("moldCavity") is not None else db_obj.moldCavity
    db_obj.leader = payload["leader"] \
        if payload.get("leader") is not None else db_obj.leader
    db_obj.operator1 = payload["operator1"] \
        if payload.get("operator1") is not None else db_obj.operator1
    db_obj.operator2 = payload["operator2"] \
        if payload.get("operator2") is not None else db_obj.operator2
    db_obj.productionQuantity = int(payload["productionQuantity"]) \
        if payload.get("productionQuantity") is not None else db_obj.productionQuantity
    db_obj.unfinishedQuantity = int(payload["unfinishedQuantity"]) \
        if payload.get("unfinishedQuantity") is not None else db_obj.unfinishedQuantity
    db_obj.colorDifference = int(payload["colorDifference"]) \
        if payload.get("colorDifference") is not None else db_obj.colorDifference
    db_obj.deformation = int(payload["deformation"]) \
        if payload.get("deformation") is not None else db_obj.deformation
    db_obj.shrinkage = int(payload["shrinkage"]) \
        if payload.get("shrinkage") is not None else db_obj.shrinkage
    db_obj.shortage = int(payload["shortage"]) \
        if payload.get("shortage") is not None else db_obj.shortage
    db_obj.hole = int(payload["hole"]) \
        if payload.get("hole") is not None else db_obj.hole
    db_obj.bubble = int(payload["bubble"]) \
        if payload.get("bubble") is not None else db_obj.bubble
    db_obj.impurity = int(payload["impurity"]) \
        if payload.get("impurity") is not None else db_obj.impurity
    db_obj.pressure = int(payload["pressure"]) \
        if payload.get("pressure") is not None else db_obj.pressure
    db_obj.overflow = int(payload["overflow"]) \
        if payload.get("overflow") is not None else db_obj.overflow
    db_obj.flowMark = int(payload["flowMark"]) \
        if payload.get("flowMark") is not None else db_obj.flowMark
    db_obj.oilStain = int(payload["oilStain"]) \
        if payload.get("oilStain") is not None else db_obj.oilStain
    db_obj.burr = int(payload["burr"]) \
        if payload.get("burr") is not None else db_obj.burr
    db_obj.blackSpot = int(payload["blackSpot"]) \
        if payload.get("blackSpot") is not None else db_obj.blackSpot
    db_obj.scratch = int(payload["scratch"]) \
        if payload.get("scratch") is not None else db_obj.scratch
    db_obj.encapsulation = int(payload["encapsulation"]) \
        if payload.get("encapsulation") is not None else db_obj.encapsulation
    db_obj.other = int(payload["other"]) \
        if payload.get("other") is not None else db_obj.other
    db_obj.defectiveQuantity = int(payload["defectiveQuantity"]) \
        if payload.get("defectiveQuantity") is not None else db_obj.defectiveQuantity
    db_obj.moldModulePerHour = int(payload["moldModulePerHour"]) \
        if payload.get("moldModulePerHour") is not None else db_obj.moldModulePerHour
    db_obj.moldingSecond = int(payload["moldingSecond"]) \
        if payload.get("moldingSecond") is not None else db_obj.moldingSecond
    db_obj.endTime = datetime.fromisoformat(payload["endTime"]) \
        if payload.get("endTime") is not None else db_obj.endTime
    db_obj.comment = payload["comment"] \
        if payload.get("comment") is not None else db_obj.comment
    db_obj.workingHours = float(payload["workingHours"]) \
        if payload.get("workingHours") is not None else db_obj.workingHours
    db_obj.planProductionQuantity = int(payload["planProductionQuantity"]) \
        if payload.get("planProductionQuantity") is not None else db_obj.planProductionQuantity
    db_obj.productionQuantityDifference = int(payload["productionQuantityDifference"]) \
        if payload.get("productionQuantityDifference") is not None else db_obj.productionQuantityDifference
    db_obj.productionDefectiveRate = float(payload["productionDefectiveRate"]) \
        if payload.get("productionDefectiveRate") is not None else db_obj.productionDefectiveRate
    db_obj.productionYield = float(payload["productionYield"]) \
        if payload.get("productionYield") is not None else db_obj.productionYield
    db_obj.machineMode = payload["machineMode"] \
        if payload.get("machineMode") is not None else db_obj.machineMode
    db_obj.machineProductionModule = int(payload["machineProductionModule"]) \
        if payload.get("machineProductionModule") is not None else db_obj.machineProductionModule
    db_obj.machineProductionQuantity = int(payload["machineProductionQuantity"]) \
        if payload.get("machineProductionQuantity") is not None else db_obj.machineProductionQuantity
    db_obj.machineDefectiveRate = float(payload["machineDefectiveRate"]) \
        if payload.get("machineDefectiveRate") is not None else db_obj.machineDefectiveRate
    db_obj.utilizationRate = float(payload["utilizationRate"]) \
        if payload.get("utilizationRate") is not None else db_obj.utilizationRate
    db_obj.productionEfficiency = float(payload["productionEfficiency"]) \
        if payload.get("productionEfficiency") is not None else db_obj.productionEfficiency
    db_obj.OEE = float(payload["OEE"]) \
        if payload.get("OEE") is not None else db_obj.OEE
    
    # 不良數(formula) = sum(色差, 變形, 縮水, 缺料, 破洞, 氣泡, 雜質, 壓克, 溢料, 流痕, 油污, 毛邊, 黑點, 刮傷, 包封, 其它)
    if (db_obj.colorDifference and db_obj.deformation and db_obj.shrinkage and db_obj.shortage and db_obj.hole 
        and db_obj.bubble and db_obj.impurity and db_obj.pressure and db_obj.overflow and db_obj.flowMark and db_obj.oilStain 
        and db_obj.burr and db_obj.blackSpot and db_obj.scratch and db_obj.encapsulation and db_obj.other):
        db_obj.defectiveQuantity = sum([
            db_obj.colorDifference, db_obj.deformation, db_obj.shrinkage, db_obj.shortage,
            db_obj.hole, db_obj.bubble, db_obj.impurity, db_obj.pressure, db_obj.overflow,
            db_obj.flowMark, db_obj.oilStain, db_obj.burr, db_obj.blackSpot, db_obj.scratch,
            db_obj.encapsulation, db_obj.other
        ])
    current_app.logger.debug(f"defectiveQuantity: {db_obj.defectiveQuantity}")
    
    # 模數/1H(formula) = floor((1/成型秒數) * 60 * 60 * 穴數)
    if (db_obj.moldingSecond and db_obj.moldCavity):
        db_obj.moldModulePerHour = math.floor((1/db_obj.moldingSecond) * 60 * 60 * db_obj.moldCavity)
        current_app.logger.debug(f"moldModulePerHour: {db_obj.moldModulePerHour}")

    # 工時(formula) = (結束時間 - 開始時間).hours
    if (db_obj.startTime and db_obj.endTime):
        db_obj.workingHours = (db_obj.endTime - db_obj.startTime).total_seconds() / 3600
        current_app.logger.debug(f"workingHours: {db_obj.workingHours}")

    # 預計生產數量(formula) = 模數/1H * 工時
    if (db_obj.moldModulePerHour and db_obj.workingHours):
        db_obj.planProductionQuantity = db_obj.moldModulePerHour * db_obj.workingHours
        current_app.logger.debug(f"planProductionQuantity: {db_obj.planProductionQuantity}")

    # 生產數差異值(formula) = (生產數量 + 不良數) - 預計生產數量
    if (db_obj.productionQuantity and db_obj.defectiveQuantity and db_obj.planProductionQuantity):
        db_obj.productionQuantityDifference = (db_obj.productionQuantity + db_obj.defectiveQuantity) - db_obj.planProductionQuantity
        current_app.logger.debug(f"productionQuantityDifference: {db_obj.productionQuantityDifference}")

    # 生產不良率(formula) = 不良數 / (生產數量 + 不良數) * 100%
    if (db_obj.productionQuantity and db_obj.defectiveQuantity):
        db_obj.productionDefectiveRate = round(db_obj.defectiveQuantity / (db_obj.productionQuantity + db_obj.defectiveQuantity) * 100, 2)
        current_app.logger.debug(f"productionDefectiveRate: {db_obj.productionDefectiveRate}")

    # 生產良率(formula) = 1 - 生產不良率
    if (db_obj.productionDefectiveRate):
        db_obj.productionYield = 1 - db_obj.productionDefectiveRate
        current_app.logger.debug(f"productionYield: {db_obj.productionYield}")

    # 機台生產數量(formula) = 機台生產模數 * 穴數
    if (db_obj.machineProductionModule and db_obj.moldCavity):
        db_obj.machineProductionQuantity = db_obj.machineProductionModule * db_obj.moldCavity
        current_app.logger.debug(f"machineProductionQuantity: {db_obj.machineProductionQuantity}")

    # 實際不良率(產能漏失率)(formula) = (機台生產數量 - 生產數量) / 機台生產數量
    if (db_obj.machineProductionQuantity and db_obj.productionQuantity):
        db_obj.machineDefectiveRate = (db_obj.machineProductionQuantity - db_obj.productionQuantity) / db_obj.machineProductionQuantity
        current_app.logger.debug(f"machineDefectiveRate: {db_obj.machineDefectiveRate}")

    # 稼動率(formula) = machine working time in 24hr in IoT record / 1440分鐘(24小時)
    if (db_obj.machineSN and db_obj.endTime
        and (db_obj.utilizationRate is None)):
        sum_of_run = get_sum_of_run_from_injector_oee_15m(db_obj.machineSN, db_obj.endTime)
        if sum_of_run is not None:
            db_obj.utilizationRate = round(sum_of_run / 1440, 2)
        current_app.logger.debug(f"utilizationRate: {db_obj.utilizationRate}")

    # 產能效率(formula) = (生產數量 + 不良數) / 預計生產數量        
    if (db_obj.productionQuantity and db_obj.defectiveQuantity and db_obj.planProductionQuantity):
        db_obj.productionEfficiency = (db_obj.productionQuantity + db_obj.defectiveQuantity) / db_obj.planProductionQuantity
        current_app.logger.debug(f"productionEfficiency: {db_obj.productionEfficiency}")

    # OEE(formula) = 稼動率 * 產能效率 * 生產良率
    if (db_obj.utilizationRate and db_obj.productionEfficiency and db_obj.productionYield):
        db_obj.OEE = db_obj.utilizationRate * db_obj.productionEfficiency * db_obj.productionYield
        current_app.logger.debug(f"OEE: {db_obj.OEE}")
        
    # 機台生產模數 = from IoT record get (2nd module - 1st module) by the 結束時間 and 開始時間
    if (db_obj.machineSN and db_obj.startTime and db_obj.endTime 
        and (db_obj.machineProductionModule is None)):
        startModulus, endModulus = get_current_modulus_from_injector(db_obj.machineSN, db_obj.startTime, db_obj.endTime)
        if (startModulus and endModulus):
            db_obj.machineProductionModule = endModulus - startModulus
            current_app.logger.debug(f"machineProductionModule: {db_obj.machineProductionModule}")
        
    # 機台模式 = from IoT record get the mode by the 開始時間
    if (db_obj.machineSN and db_obj.startTime
        and (db_obj.machineMode is None)):
        db_obj.machineMode = get_operating_mode_from_injector(db_obj.machineSN, db_obj.startTime)
        current_app.logger.debug(f"machineMode: {db_obj.machineMode}")

    # 母批
    if (mode == "motherLot"):
        db_obj.serialNumber = 0
        db_obj.lotName = db_obj.workOrderSN
        # 生產數量 = sum(production quantity of child lots)
        # 不良數 = sum(defective quantity of child lots)
        # 工時 = sum(工時 of child lots)
        # 預計生產數量 = sum(預計生產數量 of child lots)
        # 生產數差異值 = sum(生產數差異值 of child lots)
        # each item of 異常 = sum(the item of child lots)
        childLots = find_childLots_by_workOrderSN(db_obj.workOrderSN)
        if len(childLots) > 0:
            db_obj.productionQuantity = sum([child.productionQuantity for child in childLots if child.productionQuantity])
            db_obj.defectiveQuantity = sum([child.defectiveQuantity for child in childLots if child.defectiveQuantity])
            db_obj.workingHours = sum([child.workingHours for child in childLots if child.workingHours])
            db_obj.planProductionQuantity = sum([child.planProductionQuantity for child in childLots if child.planProductionQuantity])
            db_obj.productionQuantityDifference = sum([child.productionQuantityDifference for child in childLots if child.productionQuantityDifference])
            db_obj.colorDifference = sum([child.colorDifference for child in childLots if child.colorDifference])
            db_obj.deformation = sum([child.deformation for child in childLots if child.deformation])
            db_obj.shrinkage = sum([child.shrinkage for child in childLots if child.shrinkage])
            db_obj.shortage = sum([child.shortage for child in childLots if child.shortage])
            db_obj.hole = sum([child.hole for child in childLots if child.hole])
            db_obj.bubble = sum([child.bubble for child in childLots if child.bubble])
            db_obj.impurity = sum([child.impurity for child in childLots if child.impurity])
            db_obj.pressure = sum([child.pressure for child in childLots if child.pressure])
            db_obj.overflow = sum([child.overflow for child in childLots if child.overflow])
            db_obj.flowMark = sum([child.flowMark for child in childLots if child.flowMark])
            db_obj.oilStain = sum([child.oilStain for child in childLots if child.oilStain])
            db_obj.burr = sum([child.burr for child in childLots if child.burr])
            db_obj.blackSpot = sum([child.blackSpot for child in childLots if child.blackSpot])
            db_obj.scratch = sum([child.scratch for child in childLots if child.scratch])
            db_obj.encapsulation = sum([child.encapsulation for child in childLots if child.encapsulation])
            db_obj.other = sum([child.other for child in childLots if child.other])
        if (db_obj.productionQuantity):
            # 尚未完成數量 = 製令數量 - 生產數量
            temp_unfinished = db_obj.workOrderQuantity - db_obj.productionQuantity
            db_obj.unfinishedQuantity = 0 if temp_unfinished < 0 else temp_unfinished
        else:
            db_obj.unfinishedQuantity = db_obj.workOrderQuantity
        
    elif (mode == "childLot"):
        # 子批
        # the serialNumber is auto increment and grouped by the workOrderSN
        # 製令單號 is the same as the mother lot
        # 製令數量 is the same as the mother lot
        # LotName = 製令單號 + "-" + the serialNumber with 3 zero padding
        childLots = find_childLots_by_workOrderSN(db_obj.workOrderSN)
        if db_obj.lotName is None or db_obj.lotName == "":
            if len(childLots) == 0:
                db_obj.serialNumber = 1
            else:
                db_obj.serialNumber = max([child.serialNumber for child in childLots]) + 1
            db_obj.lotName = f"{db_obj.workOrderSN}-{db_obj.serialNumber:03d}"
        # 尚未完成數量 = 製令數量 - 所有子批生產數量
        if (db_obj.productionQuantity):
            allChildProductionQuantity = 0
            if len(childLots) > 0:
                allChildProductionQuantity = sum([child.productionQuantity for child in childLots if child.lotName != db_obj.lotName])
            temp_unfinished = db_obj.workOrderQuantity - db_obj.productionQuantity - allChildProductionQuantity
            db_obj.unfinishedQuantity = 0 if temp_unfinished < 0 else temp_unfinished
    return db_obj


class productionReportService:
    @staticmethod
    # get data from molds
    def get_mold_data():
        try:
            query = molds.query
            data = query.first()
            return data.mold_no
        except Exception as error:
            raise error
            

    @staticmethod
    def get_workOrders(start_planOnMachineDate, end_planOnMachineDate, machineSN=None, status="all", workOrderSN=None, 
                              productName=None, expiry="無期限", motherOnly=False, productionSchedule_ids=None):
        try:
            # transform the ISO format datetime to UNIX timestamp
            start_planOnMachineDate = datetime.fromisoformat(start_planOnMachineDate) \
                if start_planOnMachineDate else None
            end_planOnMachineDate = datetime.fromisoformat(end_planOnMachineDate) \
                if end_planOnMachineDate else None
            productionSchedule_ids = [int(id) for id in productionSchedule_ids.replace("[", "").replace("]", "").split(",")] if productionSchedule_ids else None

            query = ProductionSchedule.query
            query = query.with_entities(ProductionSchedule.productionSchedule_id, ProductionSchedule.machineSN, ProductionSchedule.moldNo,
                                        ProductionSchedule.workOrderSN, ProductionSchedule.productSN, ProductionSchedule.productName,
                                        ProductionSchedule.workOrderQuantity, ProductionSchedule.planOnMachineDate, ProductionSchedule.planFinishDate,
                                        ProductionSchedule.actualOnMachineDate, ProductionSchedule.status, 
                                        ProductionReport.productionReport_id, ProductionReport.serialNumber, ProductionReport.lotName,
                                        ProductionReport.productionQuantity, ProductionReport.defectiveQuantity,  
                                        ProductionReport.productionDefectiveRate, ProductionReport.unfinishedQuantity, ProductionReport.colorDifference,
                                        ProductionReport.deformation, ProductionReport.shrinkage, ProductionReport.shortage,
                                        ProductionReport.hole, ProductionReport.bubble, ProductionReport.impurity, ProductionReport.pressure,
                                        ProductionReport.overflow, ProductionReport.flowMark, ProductionReport.oilStain, ProductionReport.burr,
                                        ProductionReport.blackSpot, ProductionReport.scratch, ProductionReport.encapsulation, ProductionReport.other,
                                        ProductionReport.leader, ProductionReport.operator1, ProductionReport.operator2, ProductionReport.startTime,
                                        ProductionReport.endTime)
            query = query.join(ProductionReport, ProductionSchedule.workOrderSN == ProductionReport.workOrderSN, isouter = True) # left outer join
            
            query = query.filter(ProductionSchedule.planOnMachineDate.between(start_planOnMachineDate, end_planOnMachineDate)) \
                    if start_planOnMachineDate and end_planOnMachineDate else query
            query = query.filter(ProductionSchedule.machineSN == machineSN) if machineSN else query
            query = query.filter(ProductionSchedule.status == status) if status != "all" else query
            query = query.filter(ProductionSchedule.workOrderSN.like(f"%{workOrderSN}%")) if workOrderSN else query
            query = query.filter(ProductionSchedule.productName.like(f"%{productName}%")) if productName else query
            if (expiry == "即將到期"):
                # 預計完成日前七天，該單尚未完成，為即將到期
                query = query.filter(ProductionSchedule.status != "Done", 
                                     ProductionSchedule.planFinishDate.between(datetime.now(), datetime.now() + timedelta(days=7)))
            elif (expiry == "已經過期"):
                # 過了預計完成日，該單尚未完成，就是已經過期
                query = query.filter(ProductionSchedule.status != "Done",
                                     ProductionSchedule.planFinishDate < datetime.now())
            query = query.filter(or_(ProductionReport.serialNumber == 0, ProductionReport.serialNumber == None)) if bool(motherOnly) else query
            query = query.filter(ProductionSchedule.productionSchedule_id.in_(productionSchedule_ids)) if productionSchedule_ids else query
            
            query = query.order_by(ProductionSchedule.id.desc(), ProductionReport.id.asc())
            productionReport_db = query.all()
            if not (productionReport_db):
                productionReport_db = []

            productionReport_dto = productionScheduleReport_schema.dump(productionReport_db, many=True)

            resp = message(True, "productionReport data sent")
            resp["data"] = productionReport_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    @staticmethod
    def get_productionReport(id):
        try:
            # Get the current productionReport
            productionReport_db = ProductionReport.query.filter(
                    ProductionReport.id == id
                ).first()

            if productionReport_db is None:
                return err_resp("productionReport not found", "productionReport_404", 404)
                # productionReport_db = []
            
            productionReport_dto = productionReport_schema.dump(productionReport_db)

            resp = message(True, "productionReport data sent")
            resp["data"] = productionReport_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    @staticmethod
    def create_productionReport(payload):
        try:
            productionReport_db = ProductionReport()
            productionReport_db = complete_productionReport(productionReport_db, payload)
            db.session.add(productionReport_db)
            db.session.flush()
            db.session.commit()

            productionReport_dto = productionReport_schema.dump(productionReport_db)
            resp = message(True, "productionReport has been created..")
            resp["data"] = productionReport_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
    
    
    # create multiple productionReports
    @staticmethod
    def create_productionReports(mode, payload):
        try:
            productionReport_db_list = []
            for data in payload:
                productionReport_db_list.append(complete_productionReport(mode, ProductionReport(), data))
            db.session.add_all(productionReport_db_list)
            db.session.flush()
            db.session.commit()

            productionReport_dto = productionReport_schema.dump(productionReport_db_list, many=True)
            resp = message(True, "productionReports have been created..")
            resp["data"] = productionReport_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
    

    @staticmethod
    def update_productionReport(id, payload):
        try:
            productionReport_db = ProductionReport.query.filter(
                    ProductionReport.id == id
                ).first()
            if productionReport_db is None:
                return err_resp("productionReport not found", "productionReport_404", 404)
            else:
                productionReport_db = complete_productionReport(productionReport_db, payload)

            db.session.add(productionReport_db)
            db.session.flush()
            db.session.commit()

            productionReport_dto = productionReport_schema.dump(productionReport_db)
            resp = message(True, "productionReport has been updated..")
            resp["data"] = productionReport_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    # update multiple productionReports
    @staticmethod
    def update_productionReports(mode, payload):
        try:
            productionReport_db_list = []
            for data in payload:
                productionReport_db = ProductionReport.query.filter(
                    ProductionReport.id == data["id"]
                ).first()
                if productionReport_db is None:
                    return err_resp("productionReport not found", "productionReport_404", 404)
                else:
                    productionReport_db = complete_productionReport(mode, productionReport_db, data)
                productionReport_db_list.append(productionReport_db)
            db.session.add_all(productionReport_db_list)
            db.session.flush()
            db.session.commit()

            productionReport_dto = productionReport_schema.dump(productionReport_db_list, many=True)
            resp = message(True, "productionReports have been updated..")
            resp["data"] = productionReport_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    # update motherLots after child lots created or updated
    @staticmethod
    def update_motherLotsAfterChildChanged(payload):
        try:
            productionReport_db_list = []
            for data in payload:
                productionReport_db = ProductionReport.query.filter(
                    ProductionReport.serialNumber == 0,
                    ProductionReport.workOrderSN == data["workOrderSN"]
                ).first()
                if productionReport_db is None:
                    return err_resp("productionReport not found", "productionReport_404", 404)
                else:
                    productionReport_db = complete_productionReport("motherLot", productionReport_db, {})
                productionReport_db_list.append(productionReport_db)
            db.session.add_all(productionReport_db_list)
            db.session.flush()
            db.session.commit()

        # exception without handling should raise to the caller
        except Exception as error:
            raise error
    
    
    # update multiple productionReports with the same payload
    @staticmethod
    def update_productionReports_samePayload(ids, payload):
        try:
            productionReport_db = ProductionReport.query.filter(
                ProductionReport.id.in_(ids)
            ).all()
            if productionReport_db is None or len(productionReport_db) == 0:
                return err_resp("productionReport not found", "productionReport_404", 404)
            else:
                for prodSchedule in productionReport_db:
                    prodSchedule = complete_productionReport(prodSchedule, payload)
            selected_ids = [prodSchedule.id for prodSchedule in productionReport_db]

            db.session.add_all(productionReport_db)
            db.session.flush()
            db.session.commit()

            productionReport_dto = productionReport_schema.dump(productionReport_db, many=True)
            resp = message(True, f"productionReport {selected_ids} has been updated..")
            resp["data"] = productionReport_dto
            resp["meta"] = {
                "ids": selected_ids
            }
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
    

    @staticmethod
    def delete_productionReport(id):
        try:
            productionReport_db = ProductionReport.query.filter(
                ProductionReport.id == id
            ).first()
            if productionReport_db is None:
                return err_resp("productionReport not found", "productionReport_404", 404)  

            db.session.delete(productionReport_db)
            db.session.commit()
            resp = message(True, "productionReport has been deleted..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error

    
    @staticmethod
    def delete_productionReports(ids):
        try:
            productionReport_db = ProductionReport.query.filter(
                ProductionReport.id.in_(ids)
            ).all()
            if productionReport_db is None or len(productionReport_db) == 0:
                return err_resp("productionReport not found", "productionReport_404", 404)
            selected_ids = [prodSchedule.id for prodSchedule in productionReport_db]

            for prodSchedule in productionReport_db:
                db.session.delete(prodSchedule)
            db.session.commit()
            resp = message(True, f"productionReport {selected_ids} has been deleted..")
            resp["meta"] = {
                "ids": selected_ids
            }
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error