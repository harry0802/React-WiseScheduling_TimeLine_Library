from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.machine import Machine
from app.models.salesQuotation.SQInjectionMoldingCost import SQInjectionMoldingCost
from ..schemas import SalesQuotationSchema
salesQuotation_schema = SalesQuotationSchema()


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
    # 人員選擇「生產機台」帶入「廠內試模費率 8hr」、「每秒電費」
    machine_db = db.session.query(Machine).filter(Machine.id == db_obj.machineId).first()
    if machine_db is None:
        raise err_resp("machine not found", "machine_404", 404)
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
