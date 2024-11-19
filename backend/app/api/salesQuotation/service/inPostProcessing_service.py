from app.utils_log import message, err_resp, internal_err_resp
from app.models.salesQuotation.SQInPostProcessingCost import SQInPostProcessingCost
from ..schemas import SalesQuotationSchema
salesQuotation_schema = SalesQuotationSchema()


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
