import sys
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.factoryQuotation.FQPackagingCost import FQPackagingCost
from app.api.option.optionEnum import PackagingUnitEnum
from ..schemas import FactoryQuotationSchema
factoryQuotation_schema = FactoryQuotationSchema()

"""廠內報價系統-包材費用服務
從BOM表同步過去廠內報價之後，製程不能新增跟刪除的，製程裡面的物料/包材必須跟BOM表一樣，只能修改，不能新增刪除
"""

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
    #  「單位為「件」「個」時「金額」=「單價」/「容量」
    #  「單位為「公斤」「磅」時「金額」=「單價」/「每公斤幾個」/容量
    if db_obj.unit in [PackagingUnitEnum.PIECE.value, PackagingUnitEnum.ITEM.value]:
        db_obj.amount = db_obj.unitPrice / db_obj.capacity if db_obj.unitPrice and db_obj.capacity else 0
    else:
        db_obj.amount = db_obj.unitPrice / db_obj.bagsPerKg / db_obj.capacity if db_obj.unitPrice and db_obj.bagsPerKg and db_obj.capacity else 0
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
