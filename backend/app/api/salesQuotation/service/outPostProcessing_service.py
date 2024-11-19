from app.utils_log import message, err_resp, internal_err_resp
from app.models.salesQuotation.SQOutPostProcessingCost import SQOutPostProcessingCost
from ..schemas import SalesQuotationSchema
salesQuotation_schema = SalesQuotationSchema()


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
    