import sys
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.salesQuotation.SQFreight import SQFreight
from app.models.salesQuotation.SQCustomsDuty import SQCustomsDuty
from ..schemas import SalesQuotationSchema
salesQuotation_schema = SalesQuotationSchema()


def complete_SQFreight(db_obj, payload):
    db_obj.salesQuotationId = int(payload["salesQuotationId"]) \
        if payload.get("salesQuotationId") is not None else db_obj.salesQuotationId
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
    db_obj.amount = (db_obj.deliveryDistance * 2 * db_obj.fuelCostPerKM / db_obj.estimatedShipment) + db_obj.driverWorkHours
    db_obj.amount = round(db_obj.amount, 3)
    return db_obj


def complete_SQCustomsDuty(db_obj, payload):
    db_obj.salesQuotationId = int(payload["salesQuotationId"]) \
        if payload.get("salesQuotationId") is not None else db_obj.salesQuotationId
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


def create_freight(newSalesQuotationId, payload):
    """新增運費

    Args:
        newSalesQuotationId (_type_): 新增報價單的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的運費
    """
    try:
        if "SQFreights" not in payload:
            return err_resp("SQFreights is required", "SQFreights_400", 400)
        
        SQFreight_db_list = []
        for freight in payload["SQFreights"]:
            SQFreight_db = complete_SQFreight(SQFreight(), freight)
            SQFreight_db.salesQuotationId = newSalesQuotationId
            SQFreight_db_list.append(SQFreight_db)
        return SQFreight_db_list
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
        if "SQFreights" not in payload:
            return err_resp("SQFreights is required", "SQFreights_400", 400)
        
        SQFreight_db_list = []
        for freight in payload["SQFreights"]:
            if (SQFreight_db := SQFreight.query.filter(SQFreight.id == freight["id"]).first()) is None:
                raise err_resp("SQFreight not found", "SQFreight_404", 404)
            SQFreight_db = complete_SQFreight(SQFreight_db, freight)
            SQFreight_db_list.append(SQFreight_db)
        return SQFreight_db_list
    except Exception as error:
        raise error


def delete_freight(ids):
    """刪除運費

    Args:
        ids (_type_): 要刪除的運費 id
    """
    try:
        SQFreight_db_list = SQFreight.query.filter(SQFreight.id.in_(ids)).all()
        return SQFreight_db_list
    except Exception as error:
        raise error


def create_update_delete_freight(salesQuotationId, payload):
    # 運費沒有id的情況下，判斷為新增
    # 運費有id的情況下，判斷為更新
    # 運費已不存在的id，判斷為刪除
    delete_freight_ids = []
    created_updated_freight_db_list = []
    deleted_freight_db_list = []
    
    # 將payload中的運費分為新增和更新
    new_freights = [freight for freight in payload["SQFreights"] if "id" not in freight]
    updated_freights = [freight for freight in payload["SQFreights"] if "id" in freight]
    
    # 取得資料庫中的所有運費ID
    existing_freight_ids = {
        fid for fid in db.session.execute(
            db.select(SQFreight.id)
            .filter(SQFreight.salesQuotationId == salesQuotationId)
        ).scalars()
    }
    
    # 取得更新運費中已經存在的ID
    updated_freight_ids = {freight["id"] for freight in updated_freights}
    
    # 刪除的運費ID：資料庫中有但更新清單中沒有的ID
    delete_freight_ids = list(existing_freight_ids - updated_freight_ids)
    
    # 創建新運費
    if new_freights:
        created_list = create_freight(salesQuotationId, {"SQFreights": new_freights})
        created_updated_freight_db_list.extend(created_list)
    
    # 更新已存在的運費
    if updated_freights:
        updated_list = update_freight({"SQFreights": updated_freights})
        created_updated_freight_db_list.extend(updated_list)
    
    # 刪除運費
    if delete_freight_ids:
        deleted_freight_db_list = delete_freight(delete_freight_ids)
    return created_updated_freight_db_list, deleted_freight_db_list


def create_customsDuty(newSalesQuotationId, payload):
    """新增貨運與關稅

    Args:
        newSalesQuotationId (_type_): 新增報價單的 id
        payload (_type_): _description_

    Returns:
        _type_: 回傳新增的貨運與關稅
    """
    try:
        if "SQCustomsDuties" not in payload:
            return err_resp("SQCustomsDuties is required", "SQCustomsDuties_400", 400)
        
        SQCustomsDuty_db_list = []
        for customs in payload["SQCustomsDuties"]:
            SQCustomsDuty_db = complete_SQCustomsDuty(SQCustomsDuty(), customs)
            SQCustomsDuty_db.salesQuotationId = newSalesQuotationId
            SQCustomsDuty_db_list.append(SQCustomsDuty_db)
        return SQCustomsDuty_db_list
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
        if "SQCustomsDuties" not in payload:
            return err_resp("SQCustomsDuties is required", "SQCustomsDuties_400", 400)
        SQCustomsDuty_db_list = []
        SQCustomsDuties_payload = payload["SQCustomsDuties"]
        for customs in SQCustomsDuties_payload:
            if (SQCustomsDuty_db := SQCustomsDuty.query.filter(SQCustomsDuty.id == customs["id"]).first()) is None:
                raise err_resp("SQCustomsDuty not found", "SQCustomsDuty_404", 404)
            SQCustomsDuty_db = complete_SQCustomsDuty(SQCustomsDuty_db, customs)
            SQCustomsDuty_db_list.append(SQCustomsDuty_db)
        return SQCustomsDuty_db_list
    except Exception as error:
        raise error


def delete_customsDuty(ids):
    """刪除貨運與關稅

    Args:
        ids (_type_): 要刪除的貨運與關稅 id
    """
    try:
        SQCustomsDuty_db_list = []
        for id in ids:
            if (SQCustomsDuty_db := SQCustomsDuty.query.filter(SQCustomsDuty.id == id).first()):
                SQCustomsDuty_db_list.append(SQCustomsDuty_db)
        return SQCustomsDuty_db_list
    except Exception as error:
        raise error


def create_update_delete_customsDuty(salesQuotationId, payload):
    # 貨運與關稅沒有id的情況下，判斷為新增
    # 貨運與關稅有id的情況下，判斷為更新
    # 貨運與關稅已不存在的id，判斷為刪除
    delete_customsDuty_ids = []
    created_updated_customsDuty_db_list = []
    deleted_customsDuty_db_list = []
    
    # 將payload中的貨運與關稅分為新增和更新
    new_customsDuties = [customs for customs in payload["SQCustomsDuties"] if "id" not in customs]
    updated_customsDuties = [customs for customs in payload["SQCustomsDuties"] if "id" in customs]
    
    # 取得資料庫中的所有貨運與關稅ID
    existing_customsDuty_ids = {
        cid for cid in db.session.execute(
            db.select(SQCustomsDuty.id)
            .filter(SQCustomsDuty.salesQuotationId == salesQuotationId)
        ).scalars()
    }
    
    # 取得更新貨運與關稅中已經存在的ID
    updated_customsDuty_ids = {customs["id"] for customs in updated_customsDuties}
    
    # 刪除的貨運與關稅ID：資料庫中有但更新清單中沒有的ID
    delete_customsDuty_ids = list(existing_customsDuty_ids - updated_customsDuty_ids)
    
    # 創建新貨運與關稅
    if new_customsDuties:
        created_list = create_customsDuty(salesQuotationId, {"SQCustomsDuties": new_customsDuties})
        created_updated_customsDuty_db_list.extend(created_list)
    
    # 更新已存在的貨運與關稅
    if updated_customsDuties:
        updated_list = update_customsDuty({"SQCustomsDuties": updated_customsDuties})
        created_updated_customsDuty_db_list.extend(updated_list)
    
    # 刪除貨運與關稅
    if delete_customsDuty_ids:
        deleted_customsDuty_db_list = delete_customsDuty(delete_customsDuty_ids)
    return created_updated_customsDuty_db_list, deleted_customsDuty_db_list
