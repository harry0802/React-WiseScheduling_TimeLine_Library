from flask_restx import Namespace, fields
from .schemas import productionScheduleSchema

class productionScheduleDto:

    api = Namespace("productionSchedule", description="productionSchedule related operations.")

    # productionSchedule models
    productionSchedule_object = api.model(
        "productionSchedule object",
        {
            "id": fields.Integer(required=False, description="productionSchedule serialNumber", example=1),
            "productionArea": fields.String(required=False, description="productionSchedule productionArea", example="A"),
            "machineSN": fields.String(required=False, description="productionSchedule machineSN", example="A1"),
            "serialNumber": fields.String(required=False, description="productionSchedule serialNumber", example="1"),
            "workOrderSN": fields.String(required=True, description="productionSchedule workOrderSN", example="2023122800001"),
            "productSN": fields.String(required=True, description="productionSchedule productSN", example="PROD-00001-01"),
            "productName": fields.String(required=True, description="productionSchedule productName", example="PROD_NAME-01"),
            "workOrderQuantity": fields.Integer(required=True, description="productionSchedule workOrderQuantity", example=1000),
            "workOrderDate": fields.Date(required=True, description="productionSchedule workOrderDate"),
            "moldingSecond": fields.Integer(required=False, description="productionSchedule moldingSecond", example=30),
            "planOnMachineDate": fields.Date(required=False, description="productionSchedule planOnMachineDate"),
            "actualOnMachineDate": fields.Date(required=False, description="productionSchedule actualOnMachineDate"),
            "moldWorkDays": fields.Integer(required=False, description="productionSchedule moldWorkDays", example=1),
            "workDays": fields.Integer(required=False, description="productionSchedule workDays", example=1),
            "planFinishDate": fields.Date(required=False, description="productionSchedule planFinishDate"),
            "actualFinishDate": fields.Date(required=False, description="productionSchedule actualFinishDate"),
            "comment": fields.String(required=False, description="productionSchedule comment"),
            "dailyWorkingHours": fields.Integer(required=False, description="productionSchedule dailyWorkingHours", example=8),
            "moldCavity": fields.Integer(required=False, description="productionSchedule moldCavity", example=2),
            "week": fields.Integer(required=False, description="productionSchedule week"),
            "singleOrDoubleColor": fields.String(required=False, description="productionSchedule singleOrDoubleColor", example="single"),
            "conversionRate": fields.Float(required=False, description="productionSchedule conversionRate", example=0.95),
            "status": fields.String(required=False, description="productionSchedule status"),
            
        }
    )

    productionSchedule_post= api.model(
        "productionSchedule post",
        {
            # "id": fields.Integer(required=False, description="productionSchedule id"),
            "productionArea": fields.String(required=False, description="productionSchedule productionArea", example="A"),
            "machineSN": fields.String(required=False, description="productionSchedule machineSN", example="A1"),
            # "serialNumber": fields.String(required=True, description="productionSchedule serialNumber", example="1"),
            "workOrderSN": fields.String(required=True, description="productionSchedule workOrderSN", example="2023122800001"),
            "productSN": fields.String(required=True, description="productionSchedule productSN", example="PROD-00001-01"),
            "productName": fields.String(required=True, description="productionSchedule productName", example="PROD_NAME-01"),
            "workOrderQuantity": fields.Integer(required=True, description="productionSchedule workOrderQuantity", example=1000),
            "workOrderDate": fields.Date(required=True, description="productionSchedule workOrderDate"),
            "moldingSecond": fields.Integer(required=False, description="productionSchedule moldingSecond", example=30),
            "planOnMachineDate": fields.Date(required=False, description="productionSchedule planOnMachineDate"),
            "actualOnMachineDate": fields.Date(required=False, description="productionSchedule actualOnMachineDate"),
            "moldWorkDays": fields.Integer(required=False, description="productionSchedule moldWorkDays", example=1),
            "workDays": fields.Integer(required=False, description="productionSchedule workDays", example=1),
            "planFinishDate": fields.Date(required=False, description="productionSchedule planFinishDate"),
            "actualFinishDate": fields.Date(required=False, description="productionSchedule actualFinishDate"),
            "comment": fields.String(required=False, description="productionSchedule comment"),
            "dailyWorkingHours": fields.Integer(required=False, description="productionSchedule dailyWorkingHours", example=8),
            "moldCavity": fields.Integer(required=False, description="productionSchedule moldCavity", example=2),
            "week": fields.Integer(required=False, description="productionSchedule week"),
            "singleOrDoubleColor": fields.String(required=False, description="productionSchedule singleOrDoubleColor", example="single"),
            "conversionRate": fields.Float(required=False, description="productionSchedule conversionRate", example=0.95),
            "status": fields.String(required=False, description="productionSchedule status"),
            
        }
    )

    productionSchedule_put = api.model(
        "productionSchedule put",
        {
            # "id": fields.Integer(required=False, description="productionSchedule id"),
            "productionArea": fields.String(required=False, description="productionSchedule productionArea", example="A"),
            "machineSN": fields.String(required=False, description="productionSchedule machineSN", example="A1"),
            # "serialNumber": fields.String(required=False, description="productionSchedule serialNumber", example="1"),
            "workOrderSN": fields.String(required=False, description="productionSchedule workOrderSN", example="2023122800001"),
            "productSN": fields.String(required=False, description="productionSchedule productSN", example="PROD-00001-01"),
            "productName": fields.String(required=False, description="productionSchedule productName", example="PROD_NAME-01"),
            "workOrderQuantity": fields.Integer(required=False, description="productionSchedule workOrderQuantity", example=1000),
            "workOrderDate": fields.Date(required=False, description="productionSchedule workOrderDate"),
            "moldingSecond": fields.Integer(required=False, description="productionSchedule moldingSecond", example=30),
            "planOnMachineDate": fields.Date(required=False, description="productionSchedule planOnMachineDate"),
            "actualOnMachineDate": fields.Date(required=False, description="productionSchedule actualOnMachineDate"),
            "moldWorkDays": fields.Integer(required=False, description="productionSchedule moldWorkDays", example=1),
            "workDays": fields.Integer(required=False, description="productionSchedule workDays", example=1),
            "planFinishDate": fields.Date(required=False, description="productionSchedule planFinishDate"),
            "actualFinishDate": fields.Date(required=False, description="productionSchedule actualFinishDate"),
            "comment": fields.String(required=False, description="productionSchedule comment"),
            "dailyWorkingHours": fields.Integer(required=False, description="productionSchedule dailyWorkingHours", example=8),
            "moldCavity": fields.Integer(required=False, description="productionSchedule moldCavity", example=2),
            "week": fields.Integer(required=False, description="productionSchedule week"),
            "singleOrDoubleColor": fields.String(required=False, description="productionSchedule singleOrDoubleColor", example="single"),
            "conversionRate": fields.Float(required=False, description="productionSchedule conversionRate", example=0.95),
            "status": fields.String(required=False, description="productionSchedule status"),
            
        }
    )
    
    productionSchedule_meta = api.model(
        "productionSchedule meta",
        {
            "page": fields.Integer(required=False, description="page number", example=1),
            "size": fields.Integer(required=False, description="size of the page", example=10),
            "sort": fields.String(required=False, description="sort by a column", example="id"),
            "total_pages": fields.Integer(required=False, description="total pages", example=1),
            "total_count": fields.Integer(required=False, description="total count", example=10),
        }
    )
    productionSchedule_paging = api.model(
        "productionSchedule paging",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.List(fields.Nested(productionSchedule_object)),
            "meta": fields.Nested(productionSchedule_meta)
        }
    )
    productionSchedule_resp = api.model(
        "productionSchedule response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(productionSchedule_object),
        }
    )

    # Control models
    control_input = api.model(
        "Control input",
        {
            "command": fields.String(required=True)
        }
    )

    control_resp = api.model(
        "Control response",
        {
            "status": fields.Boolean,
            "message": fields.String,
        }
    )
