import sys
from app.utils_log import message, err_resp, internal_err_resp
from app.models.factoryQuotation.FQOutPostProcessingCost import FQOutPostProcessingCost
from ..schemas import FactoryQuotationSchema
factoryQuotation_schema = FactoryQuotationSchema()


def complete_FQOutPostProcessingCost(db_obj, payload):
    db_obj.FQProcessId = int(payload["FQProcessId"]) \
        if payload.get("FQProcessId") is not None else db_obj.FQProcessId
    db_obj.unitPrice = float(payload["unitPrice"]) \
        if payload.get("unitPrice") is not None else db_obj.unitPrice
    db_obj.amount = float(payload["amount"]) \
        if payload.get("amount") is not None else db_obj.amount
    # 「金額」=「單價」
    db_obj.amount = db_obj.unitPrice
    db_obj.amount = round(db_obj.amount, 3)
    return db_obj


def create_outPostProcessing(newFQProcessId, payload):
    """新增委外後製程與檢驗費用

    Args:
        newFQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的委外後製程與檢驗費用
    """
    try:
        if "FQOutPostProcessingCosts" not in payload:
            return err_resp("FQOutPostProcessingCosts is required", "FQOutPostProcessingCosts_400", 400)
        
        FQOutPostProcessingCost_db_list = []
        for postProcessing in payload["FQOutPostProcessingCosts"]:
            FQOutPostProcessingCost_db = complete_FQOutPostProcessingCost(FQOutPostProcessingCost(), postProcessing)
            FQOutPostProcessingCost_db.FQProcessId = newFQProcessId
            FQOutPostProcessingCost_db_list.append(FQOutPostProcessingCost_db)
        return FQOutPostProcessingCost_db_list
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
        if "FQOutPostProcessingCosts" not in payload:
            return err_resp("FQOutPostProcessingCosts is required", "FQOutPostProcessingCosts_400", 400)
        
        FQOutPostProcessingCost_db_list = []
        for postProcessing in payload["FQOutPostProcessingCosts"]:
            if (FQOutPostProcessingCost_db := FQOutPostProcessingCost.query.filter(FQOutPostProcessingCost.id == postProcessing["id"]).first()) is None:
                raise err_resp("FQOutPostProcessingCost not found", "FQOutPostProcessingCost_404", 404)
            FQOutPostProcessingCost_db = complete_FQOutPostProcessingCost(FQOutPostProcessingCost_db, postProcessing)
            FQOutPostProcessingCost_db_list.append(FQOutPostProcessingCost_db)
        return FQOutPostProcessingCost_db_list
    except Exception as error:
        raise error
    