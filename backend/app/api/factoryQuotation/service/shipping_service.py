import sys
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
    db_obj.amount = db_obj.freight / db_obj.estimatedShipment
    db_obj.amount = round(db_obj.amount, 3)
    return db_obj


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
