from flask_restx import Namespace, fields
from .schemas import productionScheduleSchema
class NullableString(fields.String):
    __schema_type__ = [fields.String.__schema_type__, 'string', 'null']
    __schema_example__ = 'string or null'
class NullableInteger(fields.Integer):
    #accept the string type cause the technical reason (from frontend)
    __schema_type__ = [fields.Integer.__schema_type__, 'string', 'null']
    __schema_example__ = '1'
class NullableDateTime(fields.DateTime):
    __schema_type__ = [fields.DateTime.__schema_type__, 'string', 'null']
    __schema_example__ = '2024-01-01'
class NullableFloat(fields.Float):
    #accept the string type cause the technical reason (from frontend)
    __schema_type__ = [fields.Float.__schema_type__, 'string', 'null']
    __schema_example__ = '0.95'
class productionScheduleDto:

    api = Namespace("productionSchedule", description="productionSchedule related operations.")

    # productionSchedule models
    productionSchedule_object = api.model(
        "productionSchedule object",
        {
            "id": NullableInteger(required=False, description="productionSchedule serialNumber", example=1),
            "productionArea": NullableString(required=False, description="productionSchedule productionArea", example="A"),
            "machineSN": NullableString(required=False, description="productionSchedule machineSN", example="A1"),
            "serialNumber": NullableString(required=False, description="productionSchedule serialNumber", example="1"),
            "workOrderSN": fields.String(required=True, description="productionSchedule workOrderSN", example="2023122800001"),
            "productSN": fields.String(required=True, description="productionSchedule productSN", example="PROD-00001-01"),
            "productName": fields.String(required=True, description="productionSchedule productName", example="PROD_NAME-01"),
            "workOrderQuantity": fields.Integer(required=True, description="productionSchedule workOrderQuantity", example=1000),
            "workOrderDate": fields.Date(required=True, description="productionSchedule workOrderDate"),
            "moldingSecond": NullableInteger(required=False, description="productionSchedule moldingSecond", example=30),
            "planOnMachineDate": NullableDateTime(required=False, description="productionSchedule planOnMachineDate"),
            "actualOnMachineDate": NullableDateTime(required=False, description="productionSchedule actualOnMachineDate"),
            "moldWorkDays": NullableInteger(required=False, description="productionSchedule moldWorkDays", example=1),
            "workDays": NullableInteger(required=False, description="productionSchedule workDays", example=1),
            "planFinishDate": NullableDateTime(required=False, description="productionSchedule planFinishDate"),
            "actualFinishDate": NullableDateTime(required=False, description="productionSchedule actualFinishDate"),
            "comment": NullableString(required=False, description="productionSchedule comment"),
            "dailyWorkingHours": NullableInteger(required=False, description="productionSchedule dailyWorkingHours", example=8),
            "moldCavity": NullableInteger(required=False, description="productionSchedule moldCavity", example=2),
            "week": NullableInteger(required=False, description="productionSchedule week"),
            "singleOrDoubleColor": NullableString(required=False, description="productionSchedule singleOrDoubleColor", example="single"),
            "conversionRate": NullableFloat(required=False, description="productionSchedule conversionRate", example=0.95),
            "status": NullableString(required=False, description="productionSchedule status"),
            
        }
    )

    productionSchedule_post= api.model(
        "productionSchedule post",
        {
            # "id": NullableInteger(required=False, description="productionSchedule id"),
            "productionArea": NullableString(required=False, description="productionSchedule productionArea", example="A"),
            "machineSN": NullableString(required=False, description="productionSchedule machineSN", example="A1"),
            # "serialNumber": fields.String(required=True, description="productionSchedule serialNumber", example="1"),
            "workOrderSN": fields.String(required=True, description="productionSchedule workOrderSN", example="2023122800001"),
            "productSN": fields.String(required=True, description="productionSchedule productSN", example="PROD-00001-01"),
            "productName": fields.String(required=True, description="productionSchedule productName", example="PROD_NAME-01"),
            "workOrderQuantity": fields.Integer(required=True, description="productionSchedule workOrderQuantity", example=1000),
            "workOrderDate": fields.Date(required=True, description="productionSchedule workOrderDate"),
            "moldingSecond": NullableInteger(required=False, description="productionSchedule moldingSecond", example=30),
            "planOnMachineDate": NullableDateTime(required=False, description="productionSchedule planOnMachineDate"),
            "actualOnMachineDate": NullableDateTime(required=False, description="productionSchedule actualOnMachineDate"),
            "moldWorkDays": NullableInteger(required=False, description="productionSchedule moldWorkDays", example=1),
            "workDays": NullableInteger(required=False, description="productionSchedule workDays", example=1),
            "planFinishDate": NullableDateTime(required=False, description="productionSchedule planFinishDate"),
            "actualFinishDate": NullableDateTime(required=False, description="productionSchedule actualFinishDate"),
            "comment": NullableString(required=False, description="productionSchedule comment"),
            "dailyWorkingHours": NullableInteger(required=False, description="productionSchedule dailyWorkingHours", example=8),
            "moldCavity": NullableInteger(required=False, description="productionSchedule moldCavity", example=2),
            "week": NullableInteger(required=False, description="productionSchedule week"),
            "singleOrDoubleColor": NullableString(required=False, description="productionSchedule singleOrDoubleColor", example="single"),
            "conversionRate": NullableFloat(required=False, description="productionSchedule conversionRate", example=0.95),
            "status": NullableString(required=False, description="productionSchedule status"),
            
        }
    )

    productionSchedule_put = api.model(
        "productionSchedule put",
        {
            # "id": NullableInteger(required=False, description="productionSchedule id"),
            "productionArea": NullableString(required=False, description="productionSchedule productionArea", example="A"),
            "machineSN": NullableString(required=False, description="productionSchedule machineSN", example="A1"),
            # "serialNumber": NullableString(required=False, description="productionSchedule serialNumber", example="1"),
            "workOrderSN": NullableString(required=False, description="productionSchedule workOrderSN", example='"2023122800001"'),
            "productSN": NullableString(required=False, description="productionSchedule productSN", example="PROD-00001-01"),
            "productName": NullableString(required=False, description="productionSchedule productName", example="PROD_NAME-01"),
            "workOrderQuantity": NullableInteger(required=False, description="productionSchedule workOrderQuantity", example=1000),
            "workOrderDate": NullableDateTime(required=False, description="productionSchedule workOrderDate"),
            "moldingSecond": NullableInteger(required=False, description="productionSchedule moldingSecond", example=30),
            "planOnMachineDate": NullableDateTime(required=False, description="productionSchedule planOnMachineDate"),
            "actualOnMachineDate": NullableDateTime(required=False, description="productionSchedule actualOnMachineDate"),
            "moldWorkDays": NullableInteger(required=False, description="productionSchedule moldWorkDays", example=1),
            "workDays": NullableInteger(required=False, description="productionSchedule workDays", example=1),
            "planFinishDate": NullableDateTime(required=False, description="productionSchedule planFinishDate"),
            "actualFinishDate": NullableDateTime(required=False, description="productionSchedule actualFinishDate"),
            "comment": NullableString(required=False, description="productionSchedule comment"),
            "dailyWorkingHours": NullableInteger(required=False, description="productionSchedule dailyWorkingHours", example=8),
            "moldCavity": NullableInteger(required=False, description="productionSchedule moldCavity", example=2),
            "week": NullableInteger(required=False, description="productionSchedule week"),
            "singleOrDoubleColor": NullableString(required=False, description="productionSchedule singleOrDoubleColor", example="single"),
            "conversionRate": NullableFloat(required=False, description="productionSchedule conversionRate", example=0.95),
            "status": NullableString(required=False, description="productionSchedule status"),
            
        }
    )
    
    productionSchedule_meta = api.model(
        "productionSchedule meta",
        {
            "page": NullableInteger(required=False, description="page number", example=1),
            "size": NullableInteger(required=False, description="size of the page", example=10),
            "sort": NullableString(required=False, description="sort by a column", example="id"),
            "total_pages": NullableInteger(required=False, description="total pages", example=1),
            "total_count": NullableInteger(required=False, description="total count", example=10),
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
