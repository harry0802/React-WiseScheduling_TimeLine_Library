from app import db
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


def delete_outPostProcessing(ids):
    """刪除委外後製程與檢驗費用

    Args:
        ids (_type_): 要刪除的委外後製程與檢驗費用 id
    """
    try:
        SQOutPostProcessingCost_db_list = SQOutPostProcessingCost.query.filter(SQOutPostProcessingCost.id.in_(ids)).all()
        return SQOutPostProcessingCost_db_list
    except Exception as error:
        raise error


def create_update_delete_outPostProcessing(payload):
    # 委外後製程費用沒有id的情況下，判斷為新增
    # 委外後製程費用有id的情況下，判斷為更新
    # 委外後製程費用已不存在的id，判斷為刪除
    delete_outPostProcessing_ids = []
    created_updated_outPostProcessing_db_list = []
    deleted_outPostProcessing_db_list = []
    
    # 將payload中的委外後製程分為新增和更新
    new_outPostProcessings = [postProcessing for postProcessing in payload["SQOutPostProcessingCosts"] if "id" not in postProcessing]
    updated_outPostProcessings = [postProcessing for postProcessing in payload["SQOutPostProcessingCosts"] if "id" in postProcessing]
    
    # 取得資料庫中的所有委外後製程ID
    existing_outPostProcessing_ids = {
        pid for pid in db.session.execute(
            db.select(SQOutPostProcessingCost.id)
            .filter(SQOutPostProcessingCost.SQProcessId == payload["id"])
        ).scalars()
    }
    
    # 取得更新委外後製程中已經存在的ID
    updated_outPostProcessing_ids = {postProcessing["id"] for postProcessing in updated_outPostProcessings}
    
    # 刪除的委外後製程ID：資料庫中有但更新清單中沒有的ID
    delete_outPostProcessing_ids = list(existing_outPostProcessing_ids - updated_outPostProcessing_ids)
    
    # 創建新委外後製程
    if new_outPostProcessings:
        created_list = create_outPostProcessing(payload["id"], {"SQOutPostProcessingCosts": new_outPostProcessings})
        created_updated_outPostProcessing_db_list.extend(created_list)
    
    # 更新已存在的委外後製程
    if updated_outPostProcessings:
        updated_list = update_outPostProcessing({"SQOutPostProcessingCosts": updated_outPostProcessings})
        created_updated_outPostProcessing_db_list.extend(updated_list)

    # 刪除委外後製程
    if delete_outPostProcessing_ids:
        deleted_outPostProcessing_db_list = delete_outPostProcessing(delete_outPostProcessing_ids)
    return created_updated_outPostProcessing_db_list, deleted_outPostProcessing_db_list
                                                         