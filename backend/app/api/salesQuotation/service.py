from datetime import datetime
import sys
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.machine import Machine
from app.models.processOption import ProcessOption
from app.models.salesQuotation.salesQuotation import SalesQuotation
from app.models.salesQuotation.SQProcess import SQProcess
from app.models.salesQuotation.SQMaterialCostSetting import SQMaterialCostSetting
from app.models.salesQuotation.SQMaterialCost import SQMaterialCost
from app.models.salesQuotation.SQPackagingCost import SQPackagingCost
from app.models.salesQuotation.SQInjectionMoldingCost import SQInjectionMoldingCost
from app.models.salesQuotation.SQInPostProcessingCost import SQInPostProcessingCost
from app.models.salesQuotation.SQOutPostProcessingCost import SQOutPostProcessingCost
from app.models.salesQuotation.SQFreight import SQFreight
from app.models.salesQuotation.SQCustomsDuty import SQCustomsDuty
from app.api.option.optionEnum import ProcessCategoryEnum, MaterialUnitEnum, PackagingUnitEnum
from .schemas import SalesQuotationSchema, ShippingCostSchema, SQProcessSchema, SQMaterialCostSettingSchema, SQMaterialCostSchema, SQPackagingCostSchema, SQInjectionMoldingCostSchema, SQInPostProcessingCostSchema, SQOutPostProcessingCostSchema, SQFreightSchema, SQCustomsDutySchema
salesQuotation_schema = SalesQuotationSchema()


def generate_quotationSN():
    """Generate quotationSN
       Format: SYYYYMMDDXXX
    """
    try:
        today = datetime.now()
        year = today.strftime("%Y")
        month = today.strftime("%m")
        day = today.strftime("%d")
        # get the last quotationSN
        last_salesQuotation = db.session.query(SalesQuotation).order_by(SalesQuotation.id.desc()).first()
        if last_salesQuotation is None:
            return f"S{year}{month}{day}001"
        else:
            last_quotationSN = last_salesQuotation.quotationSN
            last_quotationSN_date = last_quotationSN[1:9]
            last_quotationSN_num = last_quotationSN[9:]
            if last_quotationSN_date == f"{year}{month}{day}":
                num = int(last_quotationSN_num) + 1
                return f"S{year}{month}{day}{num:03}"
            else:
                return f"S{year}{month}{day}001"
    except Exception as error:
        raise error


def calculate_subtotalCostWithoutOverhead(salesQuotationId):
    # Get all processes for the salesQuotation
    processes = SQProcess.query.filter(SQProcess.factoryQuotationId == salesQuotationId).all()
    subtotalCostWithoutOverhead = 0
    # Calculate all costs for each process
    cost_models = [
        SQMaterialCost,
        SQPackagingCost,
        SQInjectionMoldingCost,
        SQInPostProcessingCost,
        SQOutPostProcessingCost
    ]

    for process in processes:
        for model in cost_models:
            costs = model.query.filter(model.SQProcessId == process.id).all()
            subtotalCostWithoutOverhead += sum(cost.amount or 0 for cost in costs)

    return subtotalCostWithoutOverhead


def complete_salesQuotation(db_obj, payload):
    db_obj.customerName = payload["customerName"] \
        if payload.get("customerName") is not None else db_obj.customerName
    db_obj.productName = payload["productName"] \
        if payload.get("productName") is not None else db_obj.productName
    db_obj.overheadRnd = float(payload["overheadRnd"]) \
        if payload.get("overheadRnd") is not None else db_obj.overheadRnd
    db_obj.profit = float(payload["profit"]) \
        if payload.get("profit") is not None else db_obj.profit
    db_obj.risk = float(payload["risk"]) \
        if payload.get("risk") is not None else db_obj.risk
    db_obj.annualDiscount = float(payload["annualDiscount"]) \
        if payload.get("annualDiscount") is not None else db_obj.annualDiscount
    db_obj.rebate = float(payload["rebate"]) \
        if payload.get("rebate") is not None else db_obj.rebate
    db_obj.actualQuotation = float(payload["actualQuotation"]) \
        if payload.get("actualQuotation") is not None else db_obj.actualQuotation
    return db_obj


def complete_SQMaterialCostSetting(db_obj, payload):
    db_obj.SQProcessId = int(payload["SQProcessId"]) \
        if payload.get("SQProcessId") is not None else db_obj.SQProcessId
    db_obj.estimatedDefectRate = float(payload["estimatedDefectRate"]) \
        if payload.get("estimatedDefectRate") is not None else db_obj.estimatedDefectRate
    db_obj.estimatedMaterialFluctuation = float(payload["estimatedMaterialFluctuation"]) \
        if payload.get("estimatedMaterialFluctuation") is not None else db_obj.estimatedMaterialFluctuation
    db_obj.extractionCost = float(payload["extractionCost"]) \
        if payload.get("extractionCost") is not None else db_obj.extractionCost
    db_obj.processingCost = float(payload["processingCost"]) \
        if payload.get("processingCost") is not None else db_obj.processingCost
    return db_obj


def complete_SQMaterialCost(db_obj, payload, estimatedMaterialFluctuation):
    db_obj.SQProcessId = int(payload["SQProcessId"]) \
        if payload.get("SQProcessId") is not None else db_obj.SQProcessId
    db_obj.materialOptionId = int(payload["materialOptionId"]) \
        if payload.get("materialOptionId") is not None else db_obj.materialOptionId
    db_obj.materialSN = payload["materialSN"] \
        if payload.get("materialSN") is not None else db_obj.materialSN
    db_obj.materialName = payload["materialName"] \
        if payload.get("materialName") is not None else db_obj.materialName
    db_obj.unit = payload["unit"] \
        if payload.get("unit") is not None else db_obj.unit
    db_obj.weight = float(payload["weight"]) \
        if payload.get("weight") is not None else db_obj.weight
    db_obj.unitPrice = float(payload["unitPrice"]) \
        if payload.get("unitPrice") is not None else db_obj.unitPrice
    db_obj.amount = float(payload["amount"]) \
        if payload.get("amount") is not None else db_obj.amount
    # 「單位」為「公克」時「金額」=「單價」/ 1000 *「重量」* (1+「預計原料波動率」)
    # 「單位」為「件」或「個」時 「金額」=「數量」*「單價」
    if db_obj.unit == MaterialUnitEnum.G.value:
        db_obj.amount = db_obj.unitPrice / 1000 * db_obj.weight * (1 + estimatedMaterialFluctuation)
    else:
        db_obj.amount = db_obj.unitPrice * db_obj.weight
    db_obj.amount = round(db_obj.amount, 3)
    return db_obj


def complete_SQPackagingCost(db_obj, payload):
    db_obj.SQProcessId = int(payload["SQProcessId"]) \
        if payload.get("SQProcessId") is not None else db_obj.SQProcessId
    db_obj.packagingType = payload["packagingType"] \
        if payload.get("packagingType") is not None else db_obj.packagingType
    db_obj.materialSN = payload["materialSN"] \
        if payload.get("materialSN") is not None else db_obj.materialSN
    db_obj.materialName = payload["materialName"] \
        if payload.get("materialName") is not None else db_obj.materialName
    db_obj.unit = payload["unit"] \
        if payload.get("unit") is not None else db_obj.unit
    db_obj.quantity = int(payload["quantity"]) \
        if payload.get("quantity") is not None else db_obj.quantity
    db_obj.capacity = float(payload["capacity"]) \
        if payload.get("capacity") is not None else db_obj.capacity
    db_obj.bagsPerKg = float(payload["bagsPerKg"]) \
        if payload.get("bagsPerKg") is not None else db_obj.bagsPerKg
    db_obj.unitPrice = float(payload["unitPrice"]) \
        if payload.get("unitPrice") is not None else db_obj.unitPrice
    db_obj.amount = float(payload["amount"]) \
        if payload.get("amount") is not None else db_obj.amount
    #  「單位為「件」「個」時「金額」=「單價」*「數量」
    #  「單位為「公斤」「磅」時「金額」=「單價」/「每公斤幾個」/容量
    if db_obj.unit in [PackagingUnitEnum.PIECE.value, PackagingUnitEnum.ITEM.value]:
        db_obj.amount = db_obj.unitPrice * db_obj.quantity
    else:
        db_obj.amount = db_obj.unitPrice / db_obj.bagsPerKg / db_obj.capacity
    db_obj.amount = round(db_obj.amount, 3)
    return db_obj


def complete_SQInjectionMoldingCost(db_obj, payload):
    db_obj.SQProcessId = int(payload["SQProcessId"]) \
        if payload.get("SQProcessId") is not None else db_obj.SQProcessId
    db_obj.machineId = int(payload["machineId"]) \
        if payload.get("machineId") is not None else db_obj.machineId
    db_obj.workHoursRatio = float(payload["workHoursRatio"]) \
        if payload.get("workHoursRatio") is not None else db_obj.workHoursRatio
    db_obj.defectiveRate = float(payload["defectiveRate"]) \
        if payload.get("defectiveRate") is not None else db_obj.defectiveRate
    db_obj.cycleTime = float(payload["cycleTime"]) \
        if payload.get("cycleTime") is not None else db_obj.cycleTime
    db_obj.packageTime = float(payload["packageTime"]) \
        if payload.get("packageTime") is not None else db_obj.packageTime
    db_obj.moldCavity = int(payload["moldCavity"]) \
        if payload.get("moldCavity") is not None else db_obj.moldCavity
    db_obj.unitPrice = float(payload["unitPrice"]) \
        if payload.get("unitPrice") is not None else db_obj.unitPrice
    db_obj.amount = float(payload["amount"]) \
        if payload.get("amount") is not None else db_obj.amount
    db_obj.subtotal = float(payload["subtotal"]) \
        if payload.get("subtotal") is not None else db_obj.subtotal
    db_obj.electricityCost = float(payload["electricityCost"]) \
        if payload.get("electricityCost") is not None else db_obj.electricityCost
    #  「金額」=「單價」*(1+不良率)
    db_obj.amount = db_obj.unitPrice * (1 + db_obj.defectiveRate)
    db_obj.amount = round(db_obj.amount, 3)
    # 「小計」=金額/((60*60*8)/(成型週期+灌包工時)*穴數*工時比例)
    db_obj.subtotal = db_obj.amount / ((60 * 60 * 8) / (db_obj.cycleTime + db_obj.packageTime) * db_obj.moldCavity * db_obj.workHoursRatio)
    db_obj.subtotal = round(db_obj.subtotal, 3)
    # 人員選擇「生產機台」帶入「每秒電費」
    machine_db = db.session.query(Machine).filter(Machine.id == db_obj.machineId).first()
    if machine_db is None:
        raise err_resp("machine not found", "machine_404", 404)
    # 「電費」=「每秒電費」*「成型週期」/ 穴數
    db_obj.electricityCost = float(machine_db.electricityCostPerSec) * db_obj.cycleTime / db_obj.moldCavity
    db_obj.electricityCost = round(db_obj.electricityCost, 3)
    return db_obj


def complete_SQInPostProcessingCost(db_obj, payload):
    db_obj.SQProcessId = int(payload["SQProcessId"]) \
        if payload.get("SQProcessId") is not None else db_obj.SQProcessId
    db_obj.workSecond = float(payload["workSecond"]) \
        if payload.get("workSecond") is not None else db_obj.workSecond
    db_obj.unitPrice = float(payload["unitPrice"]) \
        if payload.get("unitPrice") is not None else db_obj.unitPrice
    db_obj.amount = float(payload["amount"]) \
        if payload.get("amount") is not None else db_obj.amount
    # 「金額」=「工時」*「單價」
    db_obj.amount = db_obj.workSecond * db_obj.unitPrice
    db_obj.amount = round(db_obj.amount, 3)
    return db_obj


def complete_SQOutPostProcessingCost(db_obj, payload):
    db_obj.SQProcessId = int(payload["SQProcessId"]) \
        if payload.get("SQProcessId") is not None else db_obj.SQProcessId
    db_obj.unitPrice = float(payload["unitPrice"]) \
        if payload.get("unitPrice") is not None else db_obj.unitPrice
    db_obj.amount = float(payload["amount"]) \
        if payload.get("amount") is not None else db_obj.amount
    # 「金額」=「單價」
    db_obj.amount = db_obj.unitPrice
    db_obj.amount = round(db_obj.amount, 3)
    return db_obj


def complete_SQFreight(db_obj, payload):
    db_obj.salesQuotationId = int(payload["salesQuotationId"]) \
        if payload.get("salesQuotationId") is not None else db_obj.salesQuotationId
    db_obj.deliveryDistance = float(payload["deliveryDistance"]) \
        if payload.get("deliveryDistance") is not None else db_obj.deliveryDistance
    db_obj.driverWorkHours = float(payload["driverWorkHours"]) \
        if payload.get("driverWorkHours") is not None else db_obj.driverWorkHours
    db_obj.fuelCostPerKM = float(payload["fuelCostPerKM"]) \
        if payload.get("fuelCostPerKM") is not None else db_obj.fuelCostPerKM
    db_obj.estimatedShipment = int(payload["estimatedShipment"]) \
        if payload.get("estimatedShipment") is not None else db_obj.estimatedShipment
    db_obj.amount = float(payload["amount"]) \
        if payload.get("amount") is not None else db_obj.amount
    # 金額 = (「送貨距離」* 2 *「油錢單價」/「預估出貨數」) + 司機工時
    db_obj.amount = (db_obj.deliveryDistance * 2 * db_obj.fuelCostPerKM / db_obj.estimatedShipment) + db_obj.driverWorkHours
    db_obj.amount = round(db_obj.amount, 3)
    return db_obj


def complete_SQCustomsDuty(db_obj, payload):
    db_obj.salesQuotationId = int(payload["salesQuotationId"]) \
        if payload.get("salesQuotationId") is not None else db_obj.salesQuotationId
    db_obj.feeType = payload["feeType"] \
        if payload.get("feeType") is not None else db_obj.feeType
    db_obj.freight = float(payload["freight"]) \
        if payload.get("freight") is not None else db_obj.freight
    db_obj.estimatedShipment = int(payload["estimatedShipment"]) \
        if payload.get("estimatedShipment") is not None else db_obj.estimatedShipment
    db_obj.amount = float(payload["amount"]) \
        if payload.get("amount") is not None else db_obj.amount
    # 「金額」= 運費 / 預估出貨數
    db_obj.amount = db_obj.freight / db_obj.estimatedShipment
    db_obj.amount = round(db_obj.amount, 3)
    return db_obj


def create_materialSetting(newSQProcessId, payload):
    """新增原物料費用的計算參數

    Args:
        newSQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的原物料費用計算參數
    """
    try:
        if "SQMaterialCostSetting" not in payload:
            return err_resp("SQMaterialCostSetting is required", "SQMaterialCostSetting_400", 400)
        SQMaterialCostSetting_db = complete_SQMaterialCostSetting(SQMaterialCostSetting(), payload["SQMaterialCostSetting"])
        SQMaterialCostSetting_db.SQProcessId = newSQProcessId
        return SQMaterialCostSetting_db
    except Exception as error:
        raise error


def update_materialSetting(payload):
    """更新原物料費用的計算參數

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 回傳更新的原物料費用
    """
    try:
        if "SQMaterialCostSetting" not in payload:
            return err_resp("SQMaterialCostSetting is required", "SQMaterialCostSetting_400", 400)
        
        SQMaterialCostSetting_payload = payload["SQMaterialCostSetting"]
        if (SQMaterialCostSetting_db := SQMaterialCostSetting.query.filter(SQMaterialCostSetting.id == SQMaterialCostSetting_payload["id"]).first()) is None:
            raise err_resp("SQMaterialCostSetting not found", "SQMaterialCostSetting_404", 404)
        SQMaterialCostSetting_db = complete_SQMaterialCostSetting(SQMaterialCostSetting_db, SQMaterialCostSetting_payload)
        return SQMaterialCostSetting_db
    except Exception as error:
        raise error
    

def create_material(newSQProcessId, payload, estimatedMaterialFluctuation):
    """新增原物料費用

    Args:
        newSQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的原物料費用
    """
    try:
        if "SQMaterialCosts" not in payload:
            return err_resp("SQMaterialCosts is required", "SQMaterialCosts_400", 400)
        
        SQMaterialCost_db_list = []
        for material in payload["SQMaterialCosts"]:
            SQMaterialCost_db = complete_SQMaterialCost(SQMaterialCost(),material, estimatedMaterialFluctuation)
            SQMaterialCost_db.SQProcessId = newSQProcessId
            SQMaterialCost_db_list.append(SQMaterialCost_db)
        return SQMaterialCost_db_list
    except Exception as error:
        raise error



def update_material(payload, estimatedMaterialFluctuation):
    """更新原物料費用

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 原物料費用
    """
    try:
        if "SQMaterialCosts" not in payload:
            return err_resp("SQMaterialCosts is required", "SQMaterialCosts_400", 400)
        
        SQMaterialCost_db_list = []
        for material in payload["SQMaterialCosts"]:
            if (SQMaterialCost_db := SQMaterialCost.query.filter(SQMaterialCost.id == material["id"]).first()) is None:
                raise err_resp("SQMaterialCost not found", "SQMaterialCost_404", 404)
            SQMaterialCost_db = complete_SQMaterialCost(SQMaterialCost_db, material, estimatedMaterialFluctuation)
            SQMaterialCost_db_list.append(SQMaterialCost_db)
        return SQMaterialCost_db_list
    except Exception as error:
        raise error


def delete_material(ids):
    """刪除原物料費用

    Args:
        ids (_type_): 要刪除的原物料費用 id
    """
    try:
        SQMaterialCost_db_list = []
        for id in ids:
            if (SQMaterialCost_db := SQMaterialCost.query.filter(SQMaterialCost.id == id).first()):
                SQMaterialCost_db_list.append(SQMaterialCost_db)
        return SQMaterialCost_db_list
    except Exception as error:
        raise error


def create_packaging(newSQProcessId, payload):
    """新增包材費用

    Args:
        newSQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的包材費用
    """
    try:
        if "SQPackagingCosts" not in payload:
            return err_resp("SQPackagingCosts is required", "SQPackagingCosts_400", 400)
        
        SQPackagingCost_db_list = []
        for packaging in payload["SQPackagingCosts"]:
            SQPackagingCost_db = complete_SQPackagingCost(SQPackagingCost(), packaging)
            SQPackagingCost_db.SQProcessId = newSQProcessId
            SQPackagingCost_db_list.append(SQPackagingCost_db)
        return SQPackagingCost_db_list
    except Exception as error:
        raise error


def update_packaging(payload):
    """更新包材費用

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 回傳更新的包材費用
    """
    try:
        if "SQPackagingCosts" not in payload:
            return err_resp("SQPackagingCosts is required", "SQPackagingCosts_400", 400)
        
        SQPackagingCost_db_list = []
        for packaging in payload["SQPackagingCosts"]:
            if (SQPackagingCost_db := SQPackagingCost.query.filter(SQPackagingCost.id == packaging["id"]).first()) is None:
                raise err_resp("SQPackagingCost not found", "SQPackagingCost_404", 404)
            SQPackagingCost_db = complete_SQPackagingCost(SQPackagingCost_db, packaging)
            SQPackagingCost_db_list.append(SQPackagingCost_db)
        return SQPackagingCost_db_list
    except Exception as error:
        raise error


def delete_packaging(ids):
    """刪除包材費用

    Args:
        ids (_type_): 要刪除的包材費用 id
    """
    try:
        SQPackagingCost_db_list = []
        for id in ids:
            if (SQPackagingCost_db := SQPackagingCost.query.filter(SQPackagingCost.id == id).first()):
                SQPackagingCost_db_list.append(SQPackagingCost_db)
        return SQPackagingCost_db_list
    except Exception as error:
        raise error
    

def create_injectionMolding(newSQProcessId, payload):
    """新增成型加工費用

    Args:
        newSQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的成型加工費用
    """
    try:
        if "SQInjectionMoldingCosts" not in payload:
            return err_resp("SQInjectionMoldingCosts is required", "SQInjectionMoldingCosts_400", 400)
        
        SQInjectionMoldingCost_db_list = []
        for molding in payload["SQInjectionMoldingCosts"]:
            SQInjectionMoldingCost_db = complete_SQInjectionMoldingCost(SQInjectionMoldingCost(), molding)
            SQInjectionMoldingCost_db.SQProcessId = newSQProcessId
            SQInjectionMoldingCost_db_list.append(SQInjectionMoldingCost_db)
        return SQInjectionMoldingCost_db_list
    except Exception as error:
        raise error
    

def update_injectionMolding(payload):
    """更新成型加工費用

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 回傳更新的成型加工費用
    """
    try:
        if "SQInjectionMoldingCosts" not in payload:
            return err_resp("SQInjectionMoldingCosts is required", "SQInjectionMoldingCosts_400", 400)
        
        SQInjectionMoldingCost_db_list = []
        SQInjectionMoldingCosts_payload = payload["SQInjectionMoldingCosts"]
        for molding in SQInjectionMoldingCosts_payload:
            if (SQInjectionMoldingCost_db := SQInjectionMoldingCost.query.filter(SQInjectionMoldingCost.id == molding["id"]).first()) is None:
                raise err_resp("SQInjectionMoldingCost not found", "SQInjectionMoldingCost_404", 404)
            SQInjectionMoldingCost_db = complete_SQInjectionMoldingCost(SQInjectionMoldingCost_db, molding)
            SQInjectionMoldingCost_db_list.append(SQInjectionMoldingCost_db)
        return SQInjectionMoldingCost_db_list
    except Exception as error:
        raise error


def create_inPostProcessing(newSQProcessId, payload):
    """新增後製程與檢驗費用

    Args:
        newSQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的後製程與檢驗費用
    """
    try:
        if "SQInPostProcessingCosts" not in payload:
            return err_resp("SQInPostProcessingCosts is required", "SQInPostProcessingCosts_400", 400)
        
        SQInPostProcessingCost_db_list = []
        for postProcessing in payload["SQInPostProcessingCosts"]:
            SQInPostProcessingCost_db = complete_SQInPostProcessingCost(SQInPostProcessingCost(), postProcessing)
            SQInPostProcessingCost_db.SQProcessId = newSQProcessId
            SQInPostProcessingCost_db_list.append(SQInPostProcessingCost_db)
        return SQInPostProcessingCost_db_list
    except Exception as error:
        raise error


def update_inPostProcessing(payload):
    """更新後製程與檢驗費用

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 回傳更新的後製程與檢驗費用
    """
    try:
        if "SQInPostProcessingCosts" not in payload:
            return err_resp("SQInPostProcessingCosts is required", "SQInPostProcessingCosts_400", 400)
        
        SQInPostProcessingCost_db_list = []
        for postProcessing in payload["SQInPostProcessingCosts"]:
            if (SQInPostProcessingCost_db := SQInPostProcessingCost.query.filter(SQInPostProcessingCost.id == postProcessing["id"]).first()) is None:
                raise err_resp("SQInPostProcessingCost not found", "SQInPostProcessingCost_404", 404)
            SQInPostProcessingCost_db = complete_SQInPostProcessingCost(SQInPostProcessingCost_db, postProcessing)
            SQInPostProcessingCost_db_list.append(SQInPostProcessingCost_db)
        return SQInPostProcessingCost_db_list
    except Exception as error:
        raise error


def create_outPostProcessing(newSQProcessId, payload):
    """新增委外後製程與檢驗費用

    Args:
        newSQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的委外後製程與檢驗費用
    """
    try:
        if "SQOutPostProcessingCosts" not in payload:
            return err_resp("SQOutPostProcessingCosts is required", "SQOutPostProcessingCosts_400", 400)
        
        SQOutPostProcessingCost_db_list = []
        for postProcessing in payload["SQOutPostProcessingCosts"]:
            SQOutPostProcessingCost_db = complete_SQOutPostProcessingCost(SQOutPostProcessingCost(), postProcessing)
            SQOutPostProcessingCost_db.SQProcessId = newSQProcessId
            SQOutPostProcessingCost_db_list.append(SQOutPostProcessingCost_db)
        return SQOutPostProcessingCost_db_list
    except Exception as error:
        raise error
    

def update_outPostProcessing(payload):
    """更新委外後製程與檢驗費用

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 回傳更新的委外後製程與檢驗費用
    """
    try:
        if "SQOutPostProcessingCosts" not in payload:
            return err_resp("SQOutPostProcessingCosts is required", "SQOutPostProcessingCosts_400", 400)
        
        SQOutPostProcessingCost_db_list = []
        for postProcessing in payload["SQOutPostProcessingCosts"]:
            if (SQOutPostProcessingCost_db := SQOutPostProcessingCost.query.filter(SQOutPostProcessingCost.id == postProcessing["id"]).first()) is None:
                raise err_resp("SQOutPostProcessingCost not found", "SQOutPostProcessingCost_404", 404)
            SQOutPostProcessingCost_db = complete_SQOutPostProcessingCost(SQOutPostProcessingCost_db, postProcessing)
            SQOutPostProcessingCost_db_list.append(SQOutPostProcessingCost_db)
        return SQOutPostProcessingCost_db_list
    except Exception as error:
        raise error
    

def update_freight(payload):
    """更新運費

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 回傳更新的運費
    """
    try:
        if "SQFreights" not in payload:
            return err_resp("SQFreights is required", "SQFreights_400", 400)
        
        SQFreight_db_list = []
        for freight in payload["SQFreights"]:
            if (SQFreight_db := SQFreight.query.filter(SQFreight.id == freight["id"]).first()) is None:
                raise err_resp("SQFreight not found", "SQFreight_404", 404)
            SQFreight_db = complete_SQFreight(SQFreight_db, freight)
            SQFreight_db_list.append(SQFreight_db)
        return SQFreight_db_list
    except Exception as error:
        raise error


def update_customsDuty(payload):
    """更新貨運與關稅

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 回傳更新的貨運與關稅
    """
    try:
        if "SQCustomsDuties" not in payload:
            return err_resp("SQCustomsDuties is required", "SQCustomsDuties_400", 400)
        
        SQCustomsDuty_db_list = []
        SQCustomsDuties_payload = payload["SQCustomsDuties"]
        for customs in SQCustomsDuties_payload:
            if (SQCustomsDuty_db := SQCustomsDuty.query.filter(SQCustomsDuty.id == customs["id"]).first()) is None:
                raise err_resp("SQCustomsDuty not found", "SQCustomsDuty_404", 404)
            SQCustomsDuty_db = complete_SQCustomsDuty(SQCustomsDuty_db, customs)
            SQCustomsDuty_db_list.append(SQCustomsDuty_db)
        return SQCustomsDuty_db_list
    except Exception as error:
        raise error


def create_update_delete_material(payload, estimatedMaterialFluctuation):
    # 原物料費用沒有id的情況下，判斷為新增
    # 原物料費用有id的情況下，判斷為更新
    # 原物料費用已不存在的id，判斷為刪除
    delete_material_ids = []
    created_updated_material_db_list = []
    deleted_material_db_list = []

    # 將payload中的原物料分為新增和更新
    new_materials = [material for material in payload["SQMaterialCosts"] if "id" not in material]
    updated_materials = [material for material in payload["SQMaterialCosts"] if "id" in material]
    
    # 取得資料庫中的所有原物料ID
    existing_material_ids = {
        mid for mid in db.session.execute(
            db.select(SQMaterialCost.id).filter(SQMaterialCost.SQProcessId == payload["id"])
        ).scalars()
    }

    # 取得更新原物料中已經存在的ID
    updated_material_ids = {material["id"] for material in updated_materials}

    # 刪除的原物料ID：資料庫中有但更新清單中沒有的ID
    delete_material_ids = list(existing_material_ids - updated_material_ids)

    # 創建新原物料
    if new_materials:
        created_list = create_material(payload["id"], {"SQMaterialCosts": new_materials}, estimatedMaterialFluctuation)
        created_updated_material_db_list.extend(created_list)

    # 更新已存在的原物料
    if updated_materials:
        updated_list = update_material({"SQMaterialCosts": updated_materials}, estimatedMaterialFluctuation)
        created_updated_material_db_list.extend(updated_list)

    # 刪除原物料
    if delete_material_ids:
        deleted_material_db_list = delete_material(delete_material_ids)

    return created_updated_material_db_list, deleted_material_db_list


def create_update_delete_packaging(payload):
    # 包材費用沒有id的情況下，判斷為新增
    # 包材費用有id的情況下，判斷為更新
    # 包材費用已不存在的id，判斷為刪除
    delete_packaging_ids = []
    created_updated_packaging_db_list = []
    deleted_packaging_db_list = []
    
    # 將payload中的包材分為新增和更新
    new_packagings = [packaging for packaging in payload["SQPackagingCosts"] if "id" not in packaging]
    updated_packagings = [packaging for packaging in payload["SQPackagingCosts"] if "id" in packaging]
    
    # 取得資料庫中的所有包材ID
    existing_packaging_ids = {
        pid for pid in db.session.execute(
            db.select(SQPackagingCost.id)
            .filter(SQPackagingCost.SQProcessId == payload["id"])
        ).scalars()
    }
    
    # 取得更新包材中已經存在的ID
    updated_packaging_ids = {packaging["id"] for packaging in updated_packagings}
    
    # 刪除的包材ID：資料庫中有但更新清單中沒有的ID
    delete_packaging_ids = list(existing_packaging_ids - updated_packaging_ids)
    
    # 創建新包材
    if new_packagings:
        created_list = create_packaging(payload["id"], {"SQPackagingCosts": new_packagings})
        created_updated_packaging_db_list.extend(created_list)
    
    # 更新已存在的包材
    if updated_packagings:
        updated_list = update_packaging({"SQPackagingCosts": updated_packagings})
        created_updated_packaging_db_list.extend(updated_list)
    
    # 刪除包材
    if delete_packaging_ids:
        deleted_packaging_db_list = delete_packaging(delete_packaging_ids)
    return created_updated_packaging_db_list, deleted_packaging_db_list


class SalesQuotationService:
    @staticmethod
    def get_salesQuotation(salesQuotationId):
        try:
            if (salesQuotation_db := SalesQuotation.query.get(salesQuotationId)) is None:
                return err_resp("salesQuotation not found", "salesQuotation_404", 404)
            
            # get SQFreight by salesQuotationId
            freight_db = db.session.execute(
                db.select(SQFreight)
                .filter(SQFreight.salesQuotationId == salesQuotationId)
            ).scalars().all()
            freight_dump = SQFreightSchema().dump(freight_db, many=True)
            salesQuotation_db.freights = freight_dump

            # get SQCustomsDuty by salesQuotationId
            customsDuty_db = db.session.execute(
                db.select(SQCustomsDuty)
                .filter(SQCustomsDuty.salesQuotationId == salesQuotationId)
            ).scalars().all()
            customsDuty_dump = SQCustomsDutySchema().dump(customsDuty_db, many=True)
            salesQuotation_db.customsDuties = customsDuty_dump

            # ShippingCostSchema
            shipping = {"SQFreights": freight_db, "SQCustomsDuties": customsDuty_db}
            salesQuotation_db.shippingCosts = ShippingCostSchema().dump(shipping)
            
            # get SQProcess by salesQuotationId
            query = SQProcess.query
            query = query.join(ProcessOption, SQProcess.processOptionId == ProcessOption.id)
            process_db_list = query.filter(SQProcess.salesQuotationId == salesQuotationId).all()
            if process_db_list:
                process_dump_list = []
                for process_db in process_db_list:
                    process_db.processCategory = process_db.processOptions.processCategory
                    process_db.processSN = process_db.processOptions.processSN
                    process_db.processName = process_db.processOptions.processName
                    
                    # get SQMaterialCostSetting by SQProcessId
                    materialSetting_db = db.session.execute(
                        db.select(SQMaterialCostSetting)
                        .filter(SQMaterialCostSetting.SQProcessId == process_db.id)
                    ).scalars().first()
                    if materialSetting_db:
                        materialSetting_dump = SQMaterialCostSettingSchema().dump(materialSetting_db)
                        process_db.SQMaterialCostSetting = materialSetting_dump

                    # get SQMaterialCost by SQProcessId
                    material_db = db.session.execute(
                        db.select(SQMaterialCost)
                        .filter(SQMaterialCost.SQProcessId == process_db.id)
                    ).scalars().all()
                    if material_db:
                        material_dump = SQMaterialCostSchema().dump(material_db, many=True)
                        process_db.SQMaterialCosts = material_dump

                    # get SQPackagingCost by SQProcessId
                    packaging_db = db.session.execute(
                        db.select(SQPackagingCost)
                        .filter(SQPackagingCost.SQProcessId == process_db.id)
                    ).scalars().all()
                    if packaging_db:
                        packaging_dump = SQPackagingCostSchema().dump(packaging_db, many=True)
                        process_db.SQPackagingCosts = packaging_dump

                    # get SQInjectionMoldingCost by SQProcessId
                    injectionMolding_db = db.session.execute(
                        db.select(SQInjectionMoldingCost)
                        .filter(SQInjectionMoldingCost.SQProcessId == process_db.id)
                    ).scalars().all()
                    if injectionMolding_db:
                        injectionMolding_dump = SQInjectionMoldingCostSchema().dump(injectionMolding_db, many=True)
                        process_db.SQInjectionMoldingCosts = injectionMolding_dump

                    # get SQInPostProcessingCost by SQProcessId
                    inPostProcessing_db = db.session.execute(
                        db.select(SQInPostProcessingCost)
                        .filter(SQInPostProcessingCost.SQProcessId == process_db.id)
                    ).scalars().all()
                    if inPostProcessing_db:
                        inPostProcessing_dump = SQInPostProcessingCostSchema().dump(inPostProcessing_db, many=True)
                        process_db.SQInPostProcessingCosts = inPostProcessing_dump

                    # get SQOutPostProcessingCost by SQProcessId
                    outPostProcessing_db = db.session.execute(
                        db.select(SQOutPostProcessingCost)
                        .filter(SQOutPostProcessingCost.SQProcessId == process_db.id)
                    ).scalars().all()
                    if outPostProcessing_db:
                        outPostProcessing_dump = SQOutPostProcessingCostSchema().dump(outPostProcessing_db, many=True)
                        process_db.SQOutPostProcessingCosts = outPostProcessing_dump

                    process_dump = SQProcessSchema().dump(process_db)
                    process_dump_list.append(process_dump)

                salesQuotation_db.processes = process_dump_list

            salesQuotation_dto = salesQuotation_schema.dump(salesQuotation_db)
            resp = message(True, "salesQuotation data sent")
            resp["data"] = salesQuotation_dto
            return resp, 200
        except Exception as error:
            raise error
        
        

    @staticmethod
    def get_products():
        try:
            query = SalesQuotation.query
            query = query.with_entities(SalesQuotation.id, SalesQuotation.quotationSN, SalesQuotation.customerName, SalesQuotation.productName)
            SalesQuotation_db = query.all()
            SalesQuotation_dump = salesQuotation_schema.dump(SalesQuotation_db, many=True)
            resp = message(True, "products data sent")
            resp["data"] = SalesQuotation_dump
            return resp, 200
        except Exception as error:
            raise error


    # create SalesQuotation
    @staticmethod
    def create_salesQuotation(payload):
        try:
            # 新增報價單
            salesQuotation_db = SalesQuotation()
            salesQuotation_db.quotationSN = generate_quotationSN()
            salesQuotation_db.createDate = datetime.fromisoformat(payload["createDate"])
            db.session.add(salesQuotation_db)
            db.session.flush()
            
            # 新增運費、貨運與關稅
            SQFreight_db = SQFreight()
            SQFreight_db.salesQuotationId = salesQuotation_db.id
            SQCustomsDuty_db = SQCustomsDuty()
            SQCustomsDuty_db.salesQuotationId = salesQuotation_db.id
            
            db.session.add_all([SQFreight_db, SQCustomsDuty_db])
            db.session.commit()

            salesQuotation_dump = salesQuotation_schema.dump(salesQuotation_db)
            resp = message(True, "salesQuotation have been created..")
            resp["data"] = salesQuotation_dump

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
        
    
    # update SalesQuotation
    @staticmethod
    def update_salesQuotation(salesQuotationId, payload):
        try:
            if(salesQuotation_db := SalesQuotation.query.get(salesQuotationId)) is None:
                return err_resp("salesQuotation not found", "salesQuotation_404", 404)
            salesQuotation_db = complete_salesQuotation(salesQuotation_db, payload)
            db.session.add(salesQuotation_db)
            db.session.commit()

            salesQuotation_dump = salesQuotation_schema.dump(salesQuotation_db)
            resp = message(True, "salesQuotation have been updated.")
            resp["data"] = salesQuotation_dump

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    # delete SalesQuotation
    @staticmethod
    def delete_salesQuotation(salesQuotationId):
        try:
            if(salesQuotation_db := SalesQuotation.query.get(salesQuotationId)) is None:
                return err_resp("salesQuotation not found", "salesQuotation_404", 404)
            # check if salesQuotation is empty, except quotationSN and createDate
            if salesQuotation_db.customerName is not None or salesQuotation_db.productName is not None or salesQuotation_db.overheadRnd is not None or salesQuotation_db.profit is not None or salesQuotation_db.risk is not None or salesQuotation_db.annualDiscount is not None or salesQuotation_db.rebate is not None or salesQuotation_db.actualQuotation is not None:
                return err_resp("salesQuotation cannot be deleted", "salesQuotation_409", 409)
            
            # delete freight and customsDuty
            if (SQFreight_db := SQFreight.query.filter(SQFreight.salesQuotationId == salesQuotationId).first()) is not None:
                db.session.delete(SQFreight_db)
            if (SQCustomsDuty_db := SQCustomsDuty.query.filter(SQCustomsDuty.salesQuotationId == salesQuotationId).first()) is not None:
                db.session.delete(SQCustomsDuty_db)

            db.session.delete(salesQuotation_db)
            db.session.commit()

            resp = message(True, "salesQuotation have been deleted.")

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
    
    
    # create SalesQuotationProcess
    @staticmethod
    def create_salesQuotationProcess(salesQuotationId, payload):
        try:
            # Get the process category
            if (processOption_db := ProcessOption.query.filter(ProcessOption.id == payload["processOptionId"]).first()) is None:
                return err_resp("process not found", "process_404", 404)

            # 新增製程
            SQProcess_db = SQProcess()
            SQProcess_db.salesQuotationId = salesQuotationId
            SQProcess_db.processOptionId = payload["processOptionId"]
            db.session.add(SQProcess_db)
            db.session.flush()
            # Get the new id of SQProcess
            newSQProcessId = SQProcess_db.id

            add_to_session_list = []
            # 新增 In-IJ(廠內成型) 製程類別的原物料費用、包材費用、成型加工費用、成型加工電費
            if  processOption_db.processCategory == ProcessCategoryEnum.In_IJ.value:
                SQMaterialCostSetting_db = create_materialSetting(newSQProcessId, payload)
                SQMaterialCost_db_list = create_material(newSQProcessId, payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                SQPackagingCost_db_list = create_packaging(newSQProcessId, payload)
                SQInjectionMoldingCost_db_list = create_injectionMolding(newSQProcessId, payload)
                add_to_session_list.extend([SQMaterialCostSetting_db, *SQMaterialCost_db_list, *SQPackagingCost_db_list, *SQInjectionMoldingCost_db_list])
            # 新增 Out-IJ(委外成型) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.Out_IJ.value:
                SQMaterialCostSetting_db = create_materialSetting(newSQProcessId, payload)
                SQMaterialCost_db_list = create_material(newSQProcessId, payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                SQPackagingCost_db_list = create_packaging(newSQProcessId, payload)
                SQOutPostProcessingCost_db_list = create_outPostProcessing(newSQProcessId, payload)
                add_to_session_list.extend([SQMaterialCostSetting_db, *SQMaterialCost_db_list, *SQPackagingCost_db_list, *SQOutPostProcessingCost_db_list])
            # 新增 In-BE(廠內後製程) 製程類別的原物料費用、包材費用、廠內後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.In_BE.value:
                SQMaterialCostSetting_db = create_materialSetting(newSQProcessId, payload)
                SQMaterialCost_db_list = create_material(newSQProcessId, payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                SQPackagingCost_db_list = create_packaging(newSQProcessId, payload)
                SQInPostProcessingCost_db_list = create_inPostProcessing(newSQProcessId, payload)
                add_to_session_list.extend([SQMaterialCostSetting_db, *SQMaterialCost_db_list, *SQPackagingCost_db_list, *SQInPostProcessingCost_db_list])
            # 新增 Out-BE(委外後製程) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.Out_BE.value:
                SQMaterialCostSetting_db = create_materialSetting(newSQProcessId, payload)
                SQMaterialCost_db_list = create_material(newSQProcessId, payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                SQPackagingCost_db_list = create_packaging(newSQProcessId, payload)
                SQOutPostProcessingCost_db_list = create_outPostProcessing(newSQProcessId, payload)
                add_to_session_list.extend([SQMaterialCostSetting_db, *SQMaterialCost_db_list, *SQPackagingCost_db_list, *SQOutPostProcessingCost_db_list])
            # 新增 In-TS(廠內出貨檢驗) 製程類別的廠內後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.In_TS.value:
                SQInPostProcessingCost_db_list = create_inPostProcessing(newSQProcessId, payload)
                add_to_session_list.extend(SQInPostProcessingCost_db_list)
            
            db.session.add_all(add_to_session_list)
            db.session.commit()

            resp = message(True, "salesQuotation process have been created..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
        
    
    # update SalesQuotationProcess
    @staticmethod
    def update_salesQuotationProcess(payload):
        try:
            # Get the process category
            if (processOption_db := ProcessOption.query.filter(ProcessOption.id == payload["processOptionId"]).first()) is None:
                return err_resp("process not found", "process_404", 404)
            
            create_update_session_list = []
            delete_session_list = []
            # 更新 In-IJ(廠內成型) 製程類別的原物料費用、包材費用、成型加工費用、成型加工電費
            if processOption_db.processCategory == ProcessCategoryEnum.In_IJ.value:
                SQMaterialCostSetting_db = update_materialSetting(payload)
                created_updated_material_db_list, deleted_material_db_list = create_update_delete_material(payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list, deleted_packaging_db_list = create_update_delete_packaging(payload)
                SQInjectionMoldingCost_db_list = update_injectionMolding(payload)
                create_update_session_list.extend([SQMaterialCostSetting_db, *created_updated_material_db_list, *created_updated_packaging_db_list, *SQInjectionMoldingCost_db_list])
                delete_session_list.extend([*deleted_material_db_list, *deleted_packaging_db_list])
            # 更新 Out-IJ(委外成型) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.Out_IJ.value:
                SQMaterialCostSetting_db = update_materialSetting(payload)
                created_updated_material_db_list, deleted_material_db_list = create_update_delete_material(payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list, deleted_packaging_db_list = create_update_delete_packaging(payload)
                SQOutPostProcessingCost_db_list = update_outPostProcessing(payload)
                create_update_session_list.extend([SQMaterialCostSetting_db, *created_updated_material_db_list, *created_updated_packaging_db_list, *SQOutPostProcessingCost_db_list])
                delete_session_list.extend([*deleted_material_db_list, *deleted_packaging_db_list])
            # 更新 In-BE(廠內後製程) 製程類別的原物料費用、包材費用、廠內後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.In_BE.value:
                SQMaterialCostSetting_db = update_materialSetting(payload)
                created_updated_material_db_list, deleted_material_db_list = create_update_delete_material(payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list, deleted_packaging_db_list = create_update_delete_packaging(payload)
                SQInPostProcessingCost_db_list = update_inPostProcessing(payload)
                create_update_session_list.extend([SQMaterialCostSetting_db, *created_updated_material_db_list, *created_updated_packaging_db_list, *SQInPostProcessingCost_db_list])
                delete_session_list.extend([*deleted_material_db_list, *deleted_packaging_db_list])
            # 更新 Out-BE(委外後製程) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.Out_BE.value:
                SQMaterialCostSetting_db = update_materialSetting(payload)
                created_updated_material_db_list, deleted_material_db_list = create_update_delete_material(payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list, deleted_packaging_db_list = create_update_delete_packaging(payload)
                SQOutPostProcessingCost_db_list = update_outPostProcessing(payload)
                create_update_session_list.extend([SQMaterialCostSetting_db, *created_updated_material_db_list, *created_updated_packaging_db_list, *SQOutPostProcessingCost_db_list])
                delete_session_list.extend([*deleted_material_db_list, *deleted_packaging_db_list])
            # 更新 In-TS(廠內出貨檢驗) 製程類別的廠內後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.In_TS.value:
                SQInPostProcessingCost_db_list = update_inPostProcessing(payload)
                create_update_session_list.extend(SQInPostProcessingCost_db_list)
            
            db.session.add_all(create_update_session_list)
            for delete_session in delete_session_list:
                db.session.delete(delete_session)
            db.session.commit()

            resp = message(True, "salesQuotation process have been updated..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
    

    # update SalesQuotationProcess
    @staticmethod
    def delete_salesQuotationProcess(SQProcessId):
        try:
            # Retrieve main SQProcess record
            if (SQProcess_db := SQProcess.query.get(SQProcessId)) is None:
                return err_resp("salesQuotation process not found", "salesQuotation process_404", 404)
            
            # Get the process category
            processOption_db = ProcessOption.query.filter_by(id=SQProcess_db.processOptionId).first()
            if processOption_db is None:
                return err_resp("process not found", "process_404", 404)
            
            # Define deletions by process category
            deletion_map = {
                ProcessCategoryEnum.In_IJ.value: [
                    SQMaterialCostSetting, SQMaterialCost, SQPackagingCost, SQInjectionMoldingCost
                ],
                ProcessCategoryEnum.Out_IJ.value: [
                    SQMaterialCostSetting, SQMaterialCost, SQPackagingCost, SQOutPostProcessingCost
                ],
                ProcessCategoryEnum.In_BE.value: [
                    SQMaterialCostSetting, SQMaterialCost, SQPackagingCost, SQInPostProcessingCost
                ],
                ProcessCategoryEnum.Out_BE.value: [
                    SQMaterialCostSetting, SQMaterialCost, SQPackagingCost, SQOutPostProcessingCost
                ],
                ProcessCategoryEnum.In_TS.value: [
                    SQInPostProcessingCost
                ]
            }

            # Get models to delete based on the process category
            models_to_delete = deletion_map.get(processOption_db.processCategory, [])

            # Perform deletions for related records
            for model in models_to_delete:
                related_records = model.query.filter_by(SQProcessId=SQProcessId).all()
                for record in related_records:
                    db.session.delete(record)

            # Delete the main SQProcess record
            db.session.delete(SQProcess_db)
            db.session.commit()

            resp = message(True, "salesQuotation process has been deleted.")
            return resp, 200
        
        except Exception as error:
            db.session.rollback()
            raise error



    @staticmethod
    def update_shippingCosts(payload):
        try:
            add_to_session_list = []
            SQFreight_db_list = update_freight(payload)
            SQCustomsDuty_db_list = update_customsDuty(payload)
            add_to_session_list.extend([*SQFreight_db_list, *SQCustomsDuty_db_list])
            db.session.add_all(add_to_session_list)
            db.session.commit()

            resp = message(True, "salesQuotation ShippingCost have been updated..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
