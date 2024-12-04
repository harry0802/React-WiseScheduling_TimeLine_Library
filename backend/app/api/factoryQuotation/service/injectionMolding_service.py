import sys
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.machine import Machine
from app.models.factoryQuotation.FQInjectionMoldingCost import FQInjectionMoldingCost
from ..schemas import FactoryQuotationSchema
factoryQuotation_schema = FactoryQuotationSchema()


def complete_FQInjectionMoldingCost(db_obj, payload):
    db_obj.FQProcessId = int(payload["FQProcessId"]) \
        if payload.get("FQProcessId") is not None else db_obj.FQProcessId
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
    # 人員選擇「生產機台」帶入「每秒電費」、「廠內試模費率 8hr」，如果沒有找到機台，則不帶入，僅帶入人員輸入的值
    machine_db = db.session.query(Machine).filter(Machine.id == db_obj.machineId).first()
    if machine_db is None:
        return db_obj
    # 「單價」= 「廠內試模費率 8hr」
    db_obj.unitPrice = machine_db.moldTrialCost
    #  「金額」=「單價」*(1+不良率)
    db_obj.amount = db_obj.unitPrice * (1 + db_obj.defectiveRate)
    db_obj.amount = round(db_obj.amount, 3)
    # 「小計」=金額/((60*60*8)/(成型週期+灌包工時)*穴數*工時比例)
    db_obj.subtotal = db_obj.amount / ((60 * 60 * 8) / (db_obj.cycleTime + db_obj.packageTime) * db_obj.moldCavity * db_obj.workHoursRatio)
    db_obj.subtotal = round(db_obj.subtotal, 3)
    # 「電費」=「每秒電費」*「成型週期」/ 穴數
    db_obj.electricityCost = float(machine_db.electricityCostPerSec) * db_obj.cycleTime / db_obj.moldCavity
    db_obj.electricityCost = round(db_obj.electricityCost, 3)
    return db_obj


def create_injectionMolding(newFQProcessId, payload):
    """新增成型加工費用

    Args:
        newFQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的成型加工費用
    """
    try:
        if "FQInjectionMoldingCosts" not in payload:
            return err_resp("FQInjectionMoldingCosts is required", "FQInjectionMoldingCosts_400", 400)
        
        FQInjectionMoldingCost_db_list = []
        for molding in payload["FQInjectionMoldingCosts"]:
            FQInjectionMoldingCost_db = complete_FQInjectionMoldingCost(FQInjectionMoldingCost(), molding)
            FQInjectionMoldingCost_db.FQProcessId = newFQProcessId
            FQInjectionMoldingCost_db_list.append(FQInjectionMoldingCost_db)
        return FQInjectionMoldingCost_db_list
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
        if "FQInjectionMoldingCosts" not in payload:
            return err_resp("FQInjectionMoldingCosts is required", "FQInjectionMoldingCosts_400", 400)
        
        FQInjectionMoldingCost_db_list = []
        FQInjectionMoldingCosts_payload = payload["FQInjectionMoldingCosts"]
        for molding in FQInjectionMoldingCosts_payload:
            if (FQInjectionMoldingCost_db := FQInjectionMoldingCost.query.filter(FQInjectionMoldingCost.id == molding["id"]).first()) is None:
                raise err_resp("FQInjectionMoldingCost not found", "FQInjectionMoldingCost_404", 404)
            FQInjectionMoldingCost_db = complete_FQInjectionMoldingCost(FQInjectionMoldingCost_db, molding)
            FQInjectionMoldingCost_db_list.append(FQInjectionMoldingCost_db)
        return FQInjectionMoldingCost_db_list
    except Exception as error:
        raise error
