import sys
from app.utils_log import message, err_resp, internal_err_resp
from app.models.factoryQuotation.FQInPostProcessingCost import FQInPostProcessingCost
from ..schemas import FactoryQuotationSchema
factoryQuotation_schema = FactoryQuotationSchema()


def complete_FQInPostProcessingCost(db_obj, payload):
    db_obj.FQProcessId = int(payload["FQProcessId"]) \
        if payload.get("FQProcessId") is not None else db_obj.FQProcessId
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


def create_inPostProcessing(newFQProcessId, payload):
    """新增後製程與檢驗費用

    Args:
        newFQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的後製程與檢驗費用
    """
    try:
        if "FQInPostProcessingCosts" not in payload:
            return err_resp("FQInPostProcessingCosts is required", "FQInPostProcessingCosts_400", 400)
        
        FQInPostProcessingCost_db_list = []
        for postProcessing in payload["FQInPostProcessingCosts"]:
            FQInPostProcessingCost_db = complete_FQInPostProcessingCost(FQInPostProcessingCost(), postProcessing)
            FQInPostProcessingCost_db.FQProcessId = newFQProcessId
            FQInPostProcessingCost_db_list.append(FQInPostProcessingCost_db)
        return FQInPostProcessingCost_db_list
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
        if "FQInPostProcessingCosts" not in payload:
            return err_resp("FQInPostProcessingCosts is required", "FQInPostProcessingCosts_400", 400)
        
        FQInPostProcessingCost_db_list = []
        for postProcessing in payload["FQInPostProcessingCosts"]:
            if (FQInPostProcessingCost_db := FQInPostProcessingCost.query.filter(FQInPostProcessingCost.id == postProcessing["id"]).first()) is None:
                raise err_resp("FQInPostProcessingCost not found", "FQInPostProcessingCost_404", 404)
            FQInPostProcessingCost_db = complete_FQInPostProcessingCost(FQInPostProcessingCost_db, postProcessing)
            FQInPostProcessingCost_db_list.append(FQInPostProcessingCost_db)
        return FQInPostProcessingCost_db_list
    except Exception as error:
        raise error
