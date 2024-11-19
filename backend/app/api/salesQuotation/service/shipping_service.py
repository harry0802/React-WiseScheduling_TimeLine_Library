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
