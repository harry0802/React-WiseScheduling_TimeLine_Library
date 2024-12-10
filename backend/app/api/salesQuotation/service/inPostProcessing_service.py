from app import db
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
    if db_obj.workSecond and db_obj.unitPrice:
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


def delete_inPostProcessing(ids):
    """刪除後製程與檢驗費用

    Args:
        ids (_type_): 要刪除的後製程與檢驗費用 id
    """
    try:
        SQInPostProcessingCost_db_list = SQInPostProcessingCost.query.filter(SQInPostProcessingCost.id.in_(ids)).all()
        return SQInPostProcessingCost_db_list
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
    new_inPostProcessings = [postProcessing for postProcessing in payload["SQInPostProcessingCosts"] if "id" not in postProcessing]
    updated_inPostProcessings = [postProcessing for postProcessing in payload["SQInPostProcessingCosts"] if "id" in postProcessing]
    
    # 取得資料庫中的所有後製程與檢驗費用ID
    existing_inPostProcessing_ids = {
        pid for pid in db.session.execute(
            db.select(SQInPostProcessingCost.id)
            .filter(SQInPostProcessingCost.SQProcessId == payload["id"])
        ).scalars()
    }
    
    # 取得更新後製程與檢驗費用中已經存在的ID
    updated_inPostProcessing_ids = {postProcessing["id"] for postProcessing in updated_inPostProcessings}
    
    # 刪除的後製程與檢驗費用ID：資料庫中有但更新清單中沒有的ID
    delete_inPostProcessing_ids = list(existing_inPostProcessing_ids - updated_inPostProcessing_ids)
    
    # 創建新後製程與檢驗費用
    if new_inPostProcessings:
        created_list = create_inPostProcessing(payload["id"], {"SQInPostProcessingCosts": new_inPostProcessings})
        created_updated_inPostProcessing_db_list.extend(created_list)
    
    # 更新已存在的後 製程與檢驗費用
    if updated_inPostProcessings:
        updated_list = update_inPostProcessing({"SQInPostProcessingCosts": updated_inPostProcessings})
        created_updated_inPostProcessing_db_list.extend(updated_list)
    
    # 刪除後製程與檢驗費用
    if delete_inPostProcessing_ids:
        deleted_inPostProcessing_db_list = delete_inPostProcessing(delete_inPostProcessing_ids)
    return created_updated_inPostProcessing_db_list, deleted_inPostProcessing_db_list
    