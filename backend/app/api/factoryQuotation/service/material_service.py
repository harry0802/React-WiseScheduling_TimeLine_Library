import sys
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.factoryQuotation.FQMaterialCostSetting import FQMaterialCostSetting
from app.models.factoryQuotation.FQMaterialCost import FQMaterialCost
from app.api.option.optionEnum import MaterialUnitEnum
from ..schemas import FactoryQuotationSchema
factoryQuotation_schema = FactoryQuotationSchema()

"""廠內報價系統-原物料費用服務
從BOM表同步過去廠內報價之後，製程不能新增跟刪除的，製程裡面的物料/包材必須跟BOM表一樣，只能修改，不能新增刪除
"""

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
