import sys
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.salesQuotation.SQMaterialCostSetting import SQMaterialCostSetting
from app.models.salesQuotation.SQMaterialCost import SQMaterialCost
from app.api.option.optionEnum import MaterialUnitEnum
from ..schemas import SalesQuotationSchema
salesQuotation_schema = SalesQuotationSchema()


def complete_SQMaterialCostSetting(db_obj, payload):
    db_obj.SQProcessId = int(payload["SQProcessId"]) \
        if payload.get("SQProcessId") is not None else db_obj.SQProcessId
    db_obj.estimatedDefectRate = float(payload["estimatedDefectRate"]) \
        if payload.get("estimatedDefectRate") is not None else db_obj.estimatedDefectRate
    db_obj.estimatedMaterialFluctuation = float(payload["estimatedMaterialFluctuation"]) \
        if payload.get("estimatedMaterialFluctuation") is not None else db_obj.estimatedMaterialFluctuation
    db_obj.extractionCost = float(payload["extractionCost"]) \
        if payload.get("extractionCost") is not None else db_obj.extractionCost
    db_obj.processingCost = float(payload["processingCost"]) \
        if payload.get("processingCost") is not None else db_obj.processingCost
    return db_obj


def complete_SQMaterialCost(db_obj, payload, estimatedMaterialFluctuation):
    db_obj.SQProcessId = int(payload["SQProcessId"]) \
        if payload.get("SQProcessId") is not None else db_obj.SQProcessId
    db_obj.materialOptionId = int(payload["materialOptionId"]) \
        if payload.get("materialOptionId") is not None else db_obj.materialOptionId
    db_obj.materialSN = payload["materialSN"] \
        if payload.get("materialSN") is not None else db_obj.materialSN
    db_obj.materialName = payload["materialName"] \
        if payload.get("materialName") is not None else db_obj.materialName
    db_obj.unit = payload["unit"] \
        if payload.get("unit") is not None else db_obj.unit
    db_obj.weight = float(payload["weight"]) \
        if payload.get("weight") is not None else db_obj.weight
    db_obj.unitPrice = float(payload["unitPrice"]) \
        if payload.get("unitPrice") is not None else db_obj.unitPrice
    db_obj.amount = float(payload["amount"]) \
        if payload.get("amount") is not None else db_obj.amount
    # 「單位」為「公克」時「金額」=「單價」/ 1000 *「重量」* (1+「預計原料波動率」)
    # 「單位」為「件」或「個」時 「金額」=「數量」*「單價」
    if db_obj.unit == MaterialUnitEnum.G.value:
        db_obj.amount = db_obj.unitPrice / 1000 * db_obj.weight * (1 + estimatedMaterialFluctuation)
    else:
        db_obj.amount = db_obj.unitPrice * db_obj.weight
    db_obj.amount = round(db_obj.amount, 3)
    return db_obj


def create_materialSetting(newSQProcessId, payload):
    """新增原物料費用的計算參數

    Args:
        newSQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的原物料費用計算參數
    """
    try:
        if "SQMaterialCostSetting" not in payload:
            return err_resp("SQMaterialCostSetting is required", "SQMaterialCostSetting_400", 400)
        SQMaterialCostSetting_db = complete_SQMaterialCostSetting(SQMaterialCostSetting(), payload["SQMaterialCostSetting"])
        SQMaterialCostSetting_db.SQProcessId = newSQProcessId
        return SQMaterialCostSetting_db
    except Exception as error:
        raise error


def update_materialSetting(payload):
    """更新原物料費用的計算參數

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 回傳更新的原物料費用
    """
    try:
        if "SQMaterialCostSetting" not in payload:
            return err_resp("SQMaterialCostSetting is required", "SQMaterialCostSetting_400", 400)
        
        SQMaterialCostSetting_payload = payload["SQMaterialCostSetting"]
        if (SQMaterialCostSetting_db := SQMaterialCostSetting.query.filter(SQMaterialCostSetting.id == SQMaterialCostSetting_payload["id"]).first()) is None:
            raise err_resp("SQMaterialCostSetting not found", "SQMaterialCostSetting_404", 404)
        SQMaterialCostSetting_db = complete_SQMaterialCostSetting(SQMaterialCostSetting_db, SQMaterialCostSetting_payload)
        return SQMaterialCostSetting_db
    except Exception as error:
        raise error
    

def create_material(newSQProcessId, payload, estimatedMaterialFluctuation):
    """新增原物料費用

    Args:
        newSQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的原物料費用
    """
    try:
        if "SQMaterialCosts" not in payload:
            return err_resp("SQMaterialCosts is required", "SQMaterialCosts_400", 400)
        
        SQMaterialCost_db_list = []
        for material in payload["SQMaterialCosts"]:
            SQMaterialCost_db = complete_SQMaterialCost(SQMaterialCost(),material, estimatedMaterialFluctuation)
            SQMaterialCost_db.SQProcessId = newSQProcessId
            SQMaterialCost_db_list.append(SQMaterialCost_db)
        return SQMaterialCost_db_list
    except Exception as error:
        raise error


def update_material(payload, estimatedMaterialFluctuation):
    """更新原物料費用

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 原物料費用
    """
    try:
        if "SQMaterialCosts" not in payload:
            return err_resp("SQMaterialCosts is required", "SQMaterialCosts_400", 400)
        
        SQMaterialCost_db_list = []
        for material in payload["SQMaterialCosts"]:
            if (SQMaterialCost_db := SQMaterialCost.query.filter(SQMaterialCost.id == material["id"]).first()) is None:
                raise err_resp("SQMaterialCost not found", "SQMaterialCost_404", 404)
            SQMaterialCost_db = complete_SQMaterialCost(SQMaterialCost_db, material, estimatedMaterialFluctuation)
            SQMaterialCost_db_list.append(SQMaterialCost_db)
        return SQMaterialCost_db_list
    except Exception as error:
        raise error


def delete_material(ids):
    """刪除原物料費用

    Args:
        ids (_type_): 要刪除的原物料費用 id
    """
    try:
        SQMaterialCost_db_list = []
        for id in ids:
            if (SQMaterialCost_db := SQMaterialCost.query.filter(SQMaterialCost.id == id).first()):
                SQMaterialCost_db_list.append(SQMaterialCost_db)
        return SQMaterialCost_db_list
    except Exception as error:
        raise error


def create_update_delete_material(payload, estimatedMaterialFluctuation):
    # 原物料費用沒有id的情況下，判斷為新增
    # 原物料費用有id的情況下，判斷為更新
    # 原物料費用已不存在的id，判斷為刪除
    delete_material_ids = []
    created_updated_material_db_list = []
    deleted_material_db_list = []

    # 將payload中的原物料分為新增和更新
    new_materials = [material for material in payload["SQMaterialCosts"] if "id" not in material]
    updated_materials = [material for material in payload["SQMaterialCosts"] if "id" in material]
    
    # 取得資料庫中的所有原物料ID
    existing_material_ids = {
        mid for mid in db.session.execute(
            db.select(SQMaterialCost.id).filter(SQMaterialCost.SQProcessId == payload["id"])
        ).scalars()
    }

    # 取得更新原物料中已經存在的ID
    updated_material_ids = {material["id"] for material in updated_materials}

    # 刪除的原物料ID：資料庫中有但更新清單中沒有的ID
    delete_material_ids = list(existing_material_ids - updated_material_ids)

    # 創建新原物料
    if new_materials:
        created_list = create_material(payload["id"], {"SQMaterialCosts": new_materials}, estimatedMaterialFluctuation)
        created_updated_material_db_list.extend(created_list)

    # 更新已存在的原物料
    if updated_materials:
        updated_list = update_material({"SQMaterialCosts": updated_materials}, estimatedMaterialFluctuation)
        created_updated_material_db_list.extend(updated_list)

    # 刪除原物料
    if delete_material_ids:
        deleted_material_db_list = delete_material(delete_material_ids)

    return created_updated_material_db_list, deleted_material_db_list
