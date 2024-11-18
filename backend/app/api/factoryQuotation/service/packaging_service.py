import sys
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.factoryQuotation.FQPackagingCost import FQPackagingCost
from app.api.option.optionEnum import PackagingUnitEnum
from ..schemas import FactoryQuotationSchema
factoryQuotation_schema = FactoryQuotationSchema()


def complete_FQPackagingCost(db_obj, payload):
    db_obj.FQProcessId = int(payload["FQProcessId"]) \
        if payload.get("FQProcessId") is not None else db_obj.FQProcessId
    db_obj.packagingType = payload["packagingType"] \
        if payload.get("packagingType") is not None else db_obj.packagingType
    db_obj.materialSN = payload["materialSN"] \
        if payload.get("materialSN") is not None else db_obj.materialSN
    db_obj.materialName = payload["materialName"] \
        if payload.get("materialName") is not None else db_obj.materialName
    db_obj.unit = payload["unit"] \
        if payload.get("unit") is not None else db_obj.unit
    db_obj.quantity = int(payload["quantity"]) \
        if payload.get("quantity") is not None else db_obj.quantity
    db_obj.capacity = float(payload["capacity"]) \
        if payload.get("capacity") is not None else db_obj.capacity
    db_obj.bagsPerKg = float(payload["bagsPerKg"]) \
        if payload.get("bagsPerKg") is not None else db_obj.bagsPerKg
    db_obj.unitPrice = float(payload["unitPrice"]) \
        if payload.get("unitPrice") is not None else db_obj.unitPrice
    db_obj.amount = float(payload["amount"]) \
        if payload.get("amount") is not None else db_obj.amount
    #  「單位為「件」「個」時「金額」=「單價」*「數量」
    #  「單位為「公斤」「磅」時「金額」=「單價」/「每公斤幾個」/容量
    if db_obj.unit in [PackagingUnitEnum.PIECE.value, PackagingUnitEnum.ITEM.value]:
        db_obj.amount = db_obj.unitPrice * db_obj.quantity if db_obj.unitPrice and db_obj.quantity else db_obj.amount
    else:
        db_obj.amount = db_obj.unitPrice / db_obj.bagsPerKg / db_obj.capacity if db_obj.unitPrice and db_obj.bagsPerKg and db_obj.capacity else db_obj.amount
    db_obj.amount = round(db_obj.amount, 3) if db_obj.amount else db_obj.amount
    return db_obj


def create_packaging(newFQProcessId, payload):
    """新增包材費用

    Args:
        newFQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的包材費用
    """
    try:
        if "FQPackagingCosts" not in payload:
            return err_resp("FQPackagingCosts is required", "FQPackagingCosts_400", 400)
        
        FQPackagingCost_db_list = []
        for packaging in payload["FQPackagingCosts"]:
            FQPackagingCost_db = complete_FQPackagingCost(FQPackagingCost(), packaging)
            FQPackagingCost_db.FQProcessId = newFQProcessId
            FQPackagingCost_db_list.append(FQPackagingCost_db)
        return FQPackagingCost_db_list
    except Exception as error:
        raise error


def update_packaging(payload):
    """更新包材費用

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 回傳更新的包材費用
    """
    try:
        if "FQPackagingCosts" not in payload:
            return err_resp("FQPackagingCosts is required", "FQPackagingCosts_400", 400)
        
        FQPackagingCost_db_list = []
        for packaging in payload["FQPackagingCosts"]:
            if (FQPackagingCost_db := FQPackagingCost.query.filter(FQPackagingCost.id == packaging["id"]).first()) is None:
                raise err_resp("FQPackagingCost not found", "FQPackagingCost_404", 404)
            FQPackagingCost_db = complete_FQPackagingCost(FQPackagingCost_db, packaging)
            FQPackagingCost_db_list.append(FQPackagingCost_db)
        return FQPackagingCost_db_list
    except Exception as error:
        raise error


def delete_packaging(ids):
    """刪除包材費用

    Args:
        ids (_type_): 要刪除的包材費用 id
    """
    try:
        FQPackagingCost_db_list = []
        for id in ids:
            if (FQPackagingCost_db := FQPackagingCost.query.filter(FQPackagingCost.id == id).first()):
                FQPackagingCost_db_list.append(FQPackagingCost_db)
        return FQPackagingCost_db_list
    except Exception as error:
        raise error
    

def create_update_delete_packaging(payload):
    # 包材費用沒有id的情況下，判斷為新增
    # 包材費用有id的情況下，判斷為更新
    # 包材費用已不存在的id，判斷為刪除
    delete_packaging_ids = []
    created_updated_packaging_db_list = []
    deleted_packaging_db_list = []
    
    # 將payload中的包材分為新增和更新
    new_packagings = [packaging for packaging in payload["FQPackagingCosts"] if "id" not in packaging]
    updated_packagings = [packaging for packaging in payload["FQPackagingCosts"] if "id" in packaging]
    
    # 取得資料庫中的所有包材ID
    existing_packaging_ids = {
        pid for pid in db.session.execute(
            db.select(FQPackagingCost.id)
            .filter(FQPackagingCost.FQProcessId == payload["id"])
        ).scalars()
    }
    
    # 取得更新包材中已經存在的ID
    updated_packaging_ids = {packaging["id"] for packaging in updated_packagings}
    
    # 刪除的包材ID：資料庫中有但更新清單中沒有的ID
    delete_packaging_ids = list(existing_packaging_ids - updated_packaging_ids)
    
    # 創建新包材
    if new_packagings:
        created_list = create_packaging(payload["id"], {"FQPackagingCosts": new_packagings})
        created_updated_packaging_db_list.extend(created_list)
    
    # 更新已存在的包材
    if updated_packagings:
        updated_list = update_packaging({"FQPackagingCosts": updated_packagings})
        created_updated_packaging_db_list.extend(updated_list)
    
    # 刪除包材
    if delete_packaging_ids:
        deleted_packaging_db_list = delete_packaging(delete_packaging_ids)
    return created_updated_packaging_db_list, deleted_packaging_db_list
