import sys
from app import db
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
    if db_obj.unitPrice:
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


def delete_outPostProcessing(ids):
    """刪除委外後製程與檢驗費用

    Args:
        ids (_type_): 要刪除的委外後製程與檢驗費用 id
    """
    try:
        FQOutPostProcessingCost_db_list = FQOutPostProcessingCost.query.filter(FQOutPostProcessingCost.id.in_(ids)).all()
        return FQOutPostProcessingCost_db_list
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
    new_outPostProcessings = [postProcessing for postProcessing in payload["FQOutPostProcessingCosts"] if "id" not in postProcessing]
    updated_outPostProcessings = [postProcessing for postProcessing in payload["FQOutPostProcessingCosts"] if "id" in postProcessing]
    
    # 取得資料庫中的所有委外後製程ID
    existing_outPostProcessing_ids = {
        pid for pid in db.session.execute(
            db.select(FQOutPostProcessingCost.id)
            .filter(FQOutPostProcessingCost.FQProcessId == payload["id"])
        ).scalars()
    }
    
    # 取得更新委外後製程中已經存在的ID
    updated_outPostProcessing_ids = {postProcessing["id"] for postProcessing in updated_outPostProcessings}
    
    # 刪除的委外後製程ID：資料庫中有但更新清單中沒有的ID
    delete_outPostProcessing_ids = list(existing_outPostProcessing_ids - updated_outPostProcessing_ids)
    
    # 創建新委外後製程
    if new_outPostProcessings:
        created_list = create_outPostProcessing(payload["id"], {"FQOutPostProcessingCosts": new_outPostProcessings})
        created_updated_outPostProcessing_db_list.extend(created_list)
    
    # 更新已存在的委外後製程
    if updated_outPostProcessings:
        updated_list = update_outPostProcessing({"FQOutPostProcessingCosts": updated_outPostProcessings})
        created_updated_outPostProcessing_db_list.extend(updated_list)

    # 刪除委外後製程
    if delete_outPostProcessing_ids:
        deleted_outPostProcessing_db_list = delete_outPostProcessing(delete_outPostProcessing_ids)
    return created_updated_outPostProcessing_db_list, deleted_outPostProcessing_db_list
                                                         