import sys
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.factoryQuotation.FQFreight import FQFreight
from app.models.factoryQuotation.FQCustomsDuty import FQCustomsDuty
from ..schemas import FactoryQuotationSchema
factoryQuotation_schema = FactoryQuotationSchema()


def complete_FQFreight(db_obj, payload):
    db_obj.factoryQuotationId = int(payload["factoryQuotationId"]) \
        if payload.get("factoryQuotationId") is not None else db_obj.factoryQuotationId
    db_obj.deliveryDistance = float(payload["deliveryDistance"]) \
        if payload.get("deliveryDistance") is not None else db_obj.deliveryDistance
    db_obj.driverWorkHours = float(payload["driverWorkHours"]) \
        if payload.get("driverWorkHours") is not None else db_obj.driverWorkHours
    db_obj.fuelCostPerKM = float(payload["fuelCostPerKM"]) \
        if payload.get("fuelCostPerKM") is not None else db_obj.fuelCostPerKM
    db_obj.estimatedShipment = int(payload["estimatedShipment"]) \
        if payload.get("estimatedShipment") is not None else db_obj.estimatedShipment
    db_obj.amount = float(payload["amount"]) \
        if payload.get("amount") is not None else db_obj.amount
    # 金額 = (「送貨距離」* 2 *「油錢單價」/「預估出貨數」) + 司機工時
    if db_obj.deliveryDistance and db_obj.fuelCostPerKM and db_obj.estimatedShipment and db_obj.driverWorkHours:
        db_obj.amount = (db_obj.deliveryDistance * 2 * db_obj.fuelCostPerKM / db_obj.estimatedShipment) + db_obj.driverWorkHours
        db_obj.amount = round(db_obj.amount, 3)
    return db_obj


def complete_FQCustomsDuty(db_obj, payload):
    db_obj.factoryQuotationId = int(payload["factoryQuotationId"]) \
        if payload.get("factoryQuotationId") is not None else db_obj.factoryQuotationId
    db_obj.feeType = payload["feeType"] \
        if payload.get("feeType") is not None else db_obj.feeType
    db_obj.freight = float(payload["freight"]) \
        if payload.get("freight") is not None else db_obj.freight
    db_obj.estimatedShipment = int(payload["estimatedShipment"]) \
        if payload.get("estimatedShipment") is not None else db_obj.estimatedShipment
    db_obj.amount = float(payload["amount"]) \
        if payload.get("amount") is not None else db_obj.amount
    # 「金額」= 運費 / 預估出貨數
    db_obj.amount = db_obj.freight / db_obj.estimatedShipment if db_obj.freight and db_obj.estimatedShipment else 0
    db_obj.amount = round(db_obj.amount, 3)
    return db_obj


def create_freight(newFactoryQuotationId, payload):
    """新增運費

    Args:
        newFactoryQuotationId (_type_): 新增報價單的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的運費
    """
    try:
        if "FQFreights" not in payload:
            return err_resp("FQFreights is required", "FQFreights_400", 400)
        
        FQFreight_db_list = []
        for freight in payload["FQFreights"]:
            FQFreight_db = complete_FQFreight(FQFreight(), freight)
            FQFreight_db.factoryQuotationId = newFactoryQuotationId
            FQFreight_db_list.append(FQFreight_db)
        return FQFreight_db_list
    except Exception as error:
        raise error


def update_freight(payload):
    """更新運費

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 回傳更新的運費
    """
    try:
        if "FQFreights" not in payload:
            return err_resp("FQFreights is required", "FQFreights_400", 400)
        
        FQFreight_db_list = []
        for freight in payload["FQFreights"]:
            if (FQFreight_db := FQFreight.query.filter(FQFreight.id == freight["id"]).first()) is None:
                raise err_resp("FQFreight not found", "FQFreight_404", 404)
            FQFreight_db = complete_FQFreight(FQFreight_db, freight)
            FQFreight_db_list.append(FQFreight_db)
        return FQFreight_db_list
    except Exception as error:
        raise error


def delete_freight(ids):
    """刪除運費

    Args:
        ids (_type_): 要刪除的運費 id
    """
    try:
        FQFreight_db_list = FQFreight.query.filter(FQFreight.id.in_(ids)).all()
        return FQFreight_db_list
    except Exception as error:
        raise error


def create_update_delete_freight(factoryQuotationId, payload):
    # 運費沒有id的情況下，判斷為新增
    # 運費有id的情況下，判斷為更新
    # 運費已不存在的id，判斷為刪除
    delete_freight_ids = []
    created_updated_freight_db_list = []
    deleted_freight_db_list = []
    
    # 將payload中的運費分為新增和更新
    new_freights = [freight for freight in payload["FQFreights"] if "id" not in freight]
    updated_freights = [freight for freight in payload["FQFreights"] if "id" in freight]
    
    # 取得資料庫中的所有運費ID
    existing_freight_ids = {
        fid for fid in db.session.execute(
            db.select(FQFreight.id)
            .filter(FQFreight.factoryQuotationId == factoryQuotationId)
        ).scalars()
    }
    
    # 取得更新運費中已經存在的ID
    updated_freight_ids = {freight["id"] for freight in updated_freights}
    
    # 刪除的運費ID：資料庫中有但更新清單中沒有的ID
    delete_freight_ids = list(existing_freight_ids - updated_freight_ids)
    
    # 創建新運費
    if new_freights:
        created_list = create_freight(factoryQuotationId, {"FQFreights": new_freights})
        created_updated_freight_db_list.extend(created_list)
    
    # 更新已存在的運費
    if updated_freights:
        updated_list = update_freight({"FQFreights": updated_freights})
        created_updated_freight_db_list.extend(updated_list)
    
    # 刪除運費
    if delete_freight_ids:
        deleted_freight_db_list = delete_freight(delete_freight_ids)
    return created_updated_freight_db_list, deleted_freight_db_list


def create_customsDuty(newFactoryQuotationId, payload):
    """新增貨運與關稅

    Args:
        newFactoryQuotationId (_type_): 新增報價單的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的貨運與關稅
    """
    try:
        if "FQCustomsDuties" not in payload:
            return err_resp("FQCustomsDuties is required", "FQCustomsDuties_400", 400)
        
        FQCustomsDuty_db_list = []
        for customs in payload["FQCustomsDuties"]:
            FQCustomsDuty_db = complete_FQCustomsDuty(FQCustomsDuty(), customs)
            FQCustomsDuty_db.factoryQuotationId = newFactoryQuotationId
            FQCustomsDuty_db_list.append(FQCustomsDuty_db)
        return FQCustomsDuty_db_list
    except Exception as error:
        raise error


def update_customsDuty(payload):
    """更新貨運與關稅

    Args:
        payload (_type_): _description_

    Returns:
        _type_: 回傳更新的貨運與關稅
    """
    try:
        if "FQCustomsDuties" not in payload:
            return err_resp("FQCustomsDuties is required", "FQCustomsDuties_400", 400)
        
        FQCustomsDuty_db_list = []
        FQCustomsDuties_payload = payload["FQCustomsDuties"]
        for customs in FQCustomsDuties_payload:
            if (FQCustomsDuty_db := FQCustomsDuty.query.filter(FQCustomsDuty.id == customs["id"]).first()) is None:
                raise err_resp("FQCustomsDuty not found", "FQCustomsDuty_404", 404)
            FQCustomsDuty_db = complete_FQCustomsDuty(FQCustomsDuty_db, customs)
            FQCustomsDuty_db_list.append(FQCustomsDuty_db)
        return FQCustomsDuty_db_list
    except Exception as error:
        raise error


def delete_customsDuty(ids):
    """刪除貨運與關稅

    Args:
        ids (_type_): 要刪除的貨運與關稅 id
    """
    try:
        FQCustomsDuty_db_list = []
        for id in ids:
            if (FQCustomsDuty_db := FQCustomsDuty.query.filter(FQCustomsDuty.id == id).first()):
                FQCustomsDuty_db_list.append(FQCustomsDuty_db)
        return FQCustomsDuty_db_list
    except Exception as error:
        raise error


def create_update_delete_customsDuty(factoryQuotationId, payload):
    # 貨運與關稅沒有id的情況下，判斷為新增
    # 貨運與關稅有id的情況下，判斷為更新
    # 貨運與關稅已不存在的id，判斷為刪除
    delete_customsDuty_ids = []
    created_updated_customsDuty_db_list = []
    deleted_customsDuty_db_list = []
    
    # 將payload中的貨運與關稅分為新增和更新
    new_customsDuties = [customs for customs in payload["FQCustomsDuties"] if "id" not in customs]
    updated_customsDuties = [customs for customs in payload["FQCustomsDuties"] if "id" in customs]
    
    # 取得資料庫中的所有貨運與關稅ID
    existing_customsDuty_ids = {
        cid for cid in db.session.execute(
            db.select(FQCustomsDuty.id)
            .filter(FQCustomsDuty.factoryQuotationId == factoryQuotationId)
        ).scalars()
    }
    
    # 取得更新貨運與關稅中已經存在的ID
    updated_customsDuty_ids = {customs["id"] for customs in updated_customsDuties}
    
    # 刪除的貨運與關稅ID：資料庫中有但更新清單中沒有的ID
    delete_customsDuty_ids = list(existing_customsDuty_ids - updated_customsDuty_ids)
    
    # 創建新貨運與關稅
    if new_customsDuties:
        created_list = create_customsDuty(factoryQuotationId, {"FQCustomsDuties": new_customsDuties})
        created_updated_customsDuty_db_list.extend(created_list)
    
    # 更新已存在的貨運與關稅
    if updated_customsDuties:
        updated_list = update_customsDuty({"FQCustomsDuties": updated_customsDuties})
        created_updated_customsDuty_db_list.extend(updated_list)
    
    # 刪除貨運與關稅
    if delete_customsDuty_ids:
        deleted_customsDuty_db_list = delete_customsDuty(delete_customsDuty_ids)
    return created_updated_customsDuty_db_list, deleted_customsDuty_db_list
