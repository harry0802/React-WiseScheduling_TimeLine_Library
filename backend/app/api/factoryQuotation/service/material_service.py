import sys
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.factoryQuotation.FQMaterialCostSetting import FQMaterialCostSetting
from app.models.factoryQuotation.FQMaterialCost import FQMaterialCost
from app.api.option.optionEnum import MaterialUnitEnum
from ..schemas import FactoryQuotationSchema
factoryQuotation_schema = FactoryQuotationSchema()


def complete_FQMaterialCostSetting(db_obj, payload):
    db_obj.FQProcessId = int(payload["FQProcessId"]) \
        if payload.get("FQProcessId") is not None else db_obj.FQProcessId
    db_obj.estimatedDefectRate = float(payload["estimatedDefectRate"]) \
        if payload.get("estimatedDefectRate") is not None else db_obj.estimatedDefectRate
    db_obj.estimatedMaterialFluctuation = float(payload["estimatedMaterialFluctuation"]) \
        if payload.get("estimatedMaterialFluctuation") is not None else db_obj.estimatedMaterialFluctuation
    db_obj.extractionCost = float(payload["extractionCost"]) \
        if payload.get("extractionCost") is not None else db_obj.extractionCost
    db_obj.processingCost = float(payload["processingCost"]) \
        if payload.get("processingCost") is not None else db_obj.processingCost
    return db_obj


def complete_FQMaterialCost(db_obj, payload, estimatedMaterialFluctuation):
    db_obj.FQProcessId = int(payload["FQProcessId"]) \
        if payload.get("FQProcessId") is not None else db_obj.FQProcessId
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
    if db_obj.unitPrice and db_obj.weight:
        if db_obj.unit == MaterialUnitEnum.G.value:
            db_obj.amount = db_obj.unitPrice / 1000 * db_obj.weight * (1 + estimatedMaterialFluctuation)
        else:
            db_obj.amount = db_obj.unitPrice * db_obj.weight
        db_obj.amount = round(db_obj.amount, 3)
    return db_obj


def create_materialSetting(newFQProcessId, payload):
    """新增原物料費用的計算參數

    Args:
        newFQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的原物料費用計算參數
    """
    try:
        if "FQMaterialCostSetting" not in payload:
            return err_resp("FQMaterialCostSetting is required", "FQMaterialCostSetting_400", 400)
        FQMaterialCostSetting_db = complete_FQMaterialCostSetting(FQMaterialCostSetting(), payload["FQMaterialCostSetting"])
        FQMaterialCostSetting_db.FQProcessId = newFQProcessId
        return FQMaterialCostSetting_db
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
        if "FQMaterialCostSetting" not in payload:
            return err_resp("FQMaterialCostSetting is required", "FQMaterialCostSetting_400", 400)
        
        FQMaterialCostSetting_payload = payload["FQMaterialCostSetting"]
        if (FQMaterialCostSetting_db := FQMaterialCostSetting.query.filter(FQMaterialCostSetting.id == FQMaterialCostSetting_payload["id"]).first()) is None:
            raise err_resp("FQMaterialCostSetting not found", "FQMaterialCostSetting_404", 404)
        FQMaterialCostSetting_db = complete_FQMaterialCostSetting(FQMaterialCostSetting_db, FQMaterialCostSetting_payload)
        return FQMaterialCostSetting_db
    except Exception as error:
        raise error
    

def create_material(newFQProcessId, payload, estimatedMaterialFluctuation):
    """新增原物料費用

    Args:
        newFQProcessId (_type_): 新增製程的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的原物料費用
    """
    try:
        if "FQMaterialCosts" not in payload:
            return err_resp("FQMaterialCosts is required", "FQMaterialCosts_400", 400)
        
        FQMaterialCost_db_list = []
        for material in payload["FQMaterialCosts"]:
            FQMaterialCost_db = complete_FQMaterialCost(FQMaterialCost(),material, estimatedMaterialFluctuation)
            FQMaterialCost_db.FQProcessId = newFQProcessId
            FQMaterialCost_db_list.append(FQMaterialCost_db)
        return FQMaterialCost_db_list
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
        if "FQMaterialCosts" not in payload:
            return err_resp("FQMaterialCosts is required", "FQMaterialCosts_400", 400)
        
        FQMaterialCost_db_list = []
        for material in payload["FQMaterialCosts"]:
            if (FQMaterialCost_db := FQMaterialCost.query.filter(FQMaterialCost.id == material["id"]).first()) is None:
                raise err_resp("FQMaterialCost not found", "FQMaterialCost_404", 404)
            FQMaterialCost_db = complete_FQMaterialCost(FQMaterialCost_db, material, estimatedMaterialFluctuation)
            FQMaterialCost_db_list.append(FQMaterialCost_db)
        return FQMaterialCost_db_list
    except Exception as error:
        raise error


def delete_material(ids):
    """刪除原物料費用

    Args:
        ids (_type_): 要刪除的原物料費用 id
    """
    try:
        FQMaterialCost_db_list = []
        for id in ids:
            if (FQMaterialCost_db := FQMaterialCost.query.filter(FQMaterialCost.id == id).first()):
                FQMaterialCost_db_list.append(FQMaterialCost_db)
        return FQMaterialCost_db_list
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
    new_materials = [material for material in payload["FQMaterialCosts"] if "id" not in material]
    updated_materials = [material for material in payload["FQMaterialCosts"] if "id" in material]
    
    # 取得資料庫中的所有原物料ID
    existing_material_ids = {
        mid for mid in db.session.execute(
            db.select(FQMaterialCost.id).filter(FQMaterialCost.FQProcessId == payload["id"])
        ).scalars()
    }

    # 取得更新原物料中已經存在的ID
    updated_material_ids = {material["id"] for material in updated_materials}

    # 刪除的原物料ID：資料庫中有但更新清單中沒有的ID
    delete_material_ids = list(existing_material_ids - updated_material_ids)

    # 創建新原物料
    if new_materials:
        created_list = create_material(payload["id"], {"FQMaterialCosts": new_materials}, estimatedMaterialFluctuation)
        created_updated_material_db_list.extend(created_list)

    # 更新已存在的原物料
    if updated_materials:
        updated_list = update_material({"FQMaterialCosts": updated_materials}, estimatedMaterialFluctuation)
        created_updated_material_db_list.extend(updated_list)

    # 刪除原物料
    if delete_material_ids:
        deleted_material_db_list = delete_material(delete_material_ids)

    return created_updated_material_db_list, deleted_material_db_list
