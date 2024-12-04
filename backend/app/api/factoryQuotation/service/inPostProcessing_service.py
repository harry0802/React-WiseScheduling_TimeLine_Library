import sys
from app import db
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


def delete_inPostProcessing(ids):
    """刪除後製程與檢驗費用

    Args:
        ids (_type_): 要刪除的後製程與檢驗費用 id
    """
    try:
        FQInPostProcessingCost_db_list = FQInPostProcessingCost.query.filter(FQInPostProcessingCost.id.in_(ids)).all()
        return FQInPostProcessingCost_db_list
    except Exception as error:
        raise error
    
    
def create_update_delete_inPostProcessing(payload):
    # 後製程與檢驗費用沒有id的情況下，判斷為新增
    # 後製程與檢驗費用有id的情況下，判斷為更新
    # 後製程與檢驗費用已不存在的id，判斷為刪除
    delete_inPostProcessing_ids = []
    created_updated_inPostProcessing_db_list = []
    deleted_inPostProcessing_db_list = []
    
    # 將payload中的後製程與檢驗費用分為新增和更新
    new_inPostProcessings = [postProcessing for postProcessing in payload["FQInPostProcessingCosts"] if "id" not in postProcessing]
    updated_inPostProcessings = [postProcessing for postProcessing in payload["FQInPostProcessingCosts"] if "id" in postProcessing]
    
    # 取得資料庫中的所有後製程與檢驗費用ID
    existing_inPostProcessing_ids = {
        pid for pid in db.session.execute(
            db.select(FQInPostProcessingCost.id)
            .filter(FQInPostProcessingCost.FQProcessId == payload["id"])
        ).scalars()
    }
    
    # 取得更新後製程與檢驗費用中已經存在的ID
    updated_inPostProcessing_ids = {postProcessing["id"] for postProcessing in updated_inPostProcessings}
    
    # 刪除的後製程與檢驗費用ID：資料庫中有但更新清單中沒有的ID
    delete_inPostProcessing_ids = list(existing_inPostProcessing_ids - updated_inPostProcessing_ids)
    
    # 創建新後製程與檢驗費用
    if new_inPostProcessings:
        created_list = create_inPostProcessing(payload["id"], {"FQInPostProcessingCosts": new_inPostProcessings})
        created_updated_inPostProcessing_db_list.extend(created_list)
    
    # 更新已存在的後 製程與檢驗費用
    if updated_inPostProcessings:
        updated_list = update_inPostProcessing({"FQInPostProcessingCosts": updated_inPostProcessings})
        created_updated_inPostProcessing_db_list.extend(updated_list)
    
    # 刪除後製程與檢驗費用
    if delete_inPostProcessing_ids:
        deleted_inPostProcessing_db_list = delete_inPostProcessing(delete_inPostProcessing_ids)
    return created_updated_inPostProcessing_db_list, deleted_inPostProcessing_db_list
