from flask_restx import Namespace, fields
from .schemas import productionScheduleSchema
from marshmallow.validate import Length, Range
from app.utils import validation_error
import logging
import copy
class StringInteger(fields.Integer):
    __schema_type__ = [fields.Integer.__schema_type__, 'string']
    __schema_example__ = '1'
    def __init__(self, *args, **kwargs):
        super(StringInteger, self).__init__(*args, **kwargs)
        pattern = '^[0-9]+$'
        self.pattern = kwargs.get('pattern', pattern)
    def schema(self):
        schema = super(StringInteger, self).schema()
        schema['pattern'] = self.pattern
        return schema
class NullableString(fields.String):
    __schema_type__ = [fields.String.__schema_type__, 'string', 'null']
    __schema_example__ = 'string or null'
    def __init__(self, *args, **kwargs):
        super(NullableString, self).__init__(*args, **kwargs)
        pattern = '\w*'
        self.pattern = kwargs.get('pattern', pattern)
        
class NullableInteger(fields.Integer):
    #accept the string type cause the technical reason (from frontend)
    __schema_type__ = [fields.Integer.__schema_type__, 'string', 'null']
    __schema_example__ = '1'
    def __init__(self, *args, **kwargs):
        super(NullableInteger, self).__init__(*args, **kwargs)
        pattern = '^[0-9]+$'
        self.pattern = kwargs.get('pattern', pattern)
    def schema(self):
        schema = super(NullableInteger, self).schema()
        schema['pattern'] = self.pattern
        return schema
class StringDateTime(fields.DateTime):
    __schema_type__ = [fields.DateTime.__schema_type__, 'string']
    __schema_example__ = '2024-01-01T00:00:00.000+08:00'
    def __init__(self, *args, **kwargs):
        super(StringDateTime, self).__init__(*args, **kwargs)
        pattern = '(\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z?))$|(\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))$|(\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))$|(\d{4}-[01]\d-[0-3]\d)$'
        
        self.pattern = kwargs.get('pattern', pattern)
    def schema(self):
        schema = super(StringDateTime, self).schema()
        schema['pattern'] = self.pattern
        return schema
class NullableDateTime(fields.DateTime):
    """regex pattern for datetime
    2024-01-01T00:00:00.000+08:00
    2024-01-01T00:00:00+08:00
    2024-01-01T00:00+08:00
    2024-01-01T00:00:00.000Z
    2024-01-01T00:00:00Z
    2024-01-01T00:00Z
    2024-01-01
    2024-01-01T00:00:00.000
    2024-01-01T00:00:00
    2024-01-01T00:00

    reg: (\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z?))$|
         (\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))$|
         (\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))$|
         (\d{4}-[01]\d-[0-3]\d$)
    """
    # https://stackoverflow.com/questions/3143070/regex-to-match-an-iso-8601-datetime-string
    __schema_type__ = [fields.DateTime.__schema_type__, 'string', 'null']
    __schema_example__ = '2024-01-01'
    def __init__(self, *args, **kwargs):
        super(NullableDateTime, self).__init__(*args, **kwargs)
        pattern = '(\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z?))$|(\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))$|(\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))$|(\d{4}-[01]\d-[0-3]\d)$'
        self.pattern = kwargs.get('pattern', pattern)
    def schema(self):
        schema = super(NullableDateTime, self).schema()
        schema['pattern'] = self.pattern
        return schema
    
class NullableFloat(fields.Float):
    #accept the string type cause the technical reason (from frontend)
    # https://stackoverflow.com/questions/12643009/regular-expression-for-floating-point-numbers
    __schema_type__ = [fields.Float.__schema_type__, 'string', 'null']
    __schema_example__ = '0.95'
    def __init__(self, *args, **kwargs):
        super(NullableFloat, self).__init__(*args, **kwargs)
        pattern = '^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$'
        self.pattern = kwargs.get('pattern', pattern)
    def schema(self):
        schema = super(NullableFloat, self).schema()
        schema['pattern'] = self.pattern
        return schema
class productionScheduleDto:
    # ref productionScheduleSDD.md
    api = Namespace("productionSchedule", description="productionSchedule related operations.")
    base_obj = {
            "id": NullableInteger(required=False, description="serialNumber", example=1),
            "productionArea": NullableString(required=False, description="productionArea", example="A"),
            "machineSN": NullableString(required=False, description="machineSN", example="A1",
                                        validate=Length(min=1, max=1)),
            "serialNumber": NullableString(required=False, description="serialNumber", example="1"),
            "workOrderSN": fields.String(required=False, description="workOrderSN", example="2023122800001"),
            "moldNo": fields.String(required=False, description="moldNo", example="AGS-01001"),
            "productSN": fields.String(required=False, description="productSN", example="PROD-00001-01"),
            "productName": fields.String(required=False, description="productName", example="PROD_NAME-01"),
            "workOrderQuantity": StringInteger(required=False, description="workOrderQuantity", example=1000, min=0, max=1000000, type=["integer", "string"], pattern="^[0-9]+$"),
            "workOrderDate": StringDateTime(required=False, description="workOrderDate", example="2023-12-28T00:00:00.000+08:00"),
            "moldingSecond": NullableInteger(required=False, description="moldingSecond", example=30, min=0, max=86400),
            "planOnMachineDate": NullableDateTime(required=False, description="planOnMachineDate", example="2023-12-28T00:00:00.000+08:00"),
            "actualOnMachineDate": NullableDateTime(required=False, description="actualOnMachineDate", example="2023-12-28T00:00:00.000+08:00"),
            "moldWorkDays": NullableInteger(required=False, description="moldWorkDays", example=1, min=0, max=1000, default=0),
            "workDays": NullableInteger(required=False, description="workDays", example=1, min=0, max=1000),
            "planFinishDate": NullableDateTime(required=False, description="planFinishDate", example="2023-12-28T00:00:00.000+08:00"),
            "actualFinishDate": NullableDateTime(required=False, description="actualFinishDate", example="2023-12-28T00:00:00.000+08:00"),
            "comment": NullableString(required=False, description="comment"),
            "dailyWorkingHours": NullableInteger(required=False, description="dailyWorkingHours", example=8,min=0, max=24),
            "moldCavity": NullableInteger(required=False, description="moldCavity", example=2, min=0, max=1000),
            "week": NullableInteger(required=False, description="week",min=0, max=53),
            "singleOrDoubleColor": NullableString(required=False, description="singleOrDoubleColor", example="single"),
            "conversionRate": NullableFloat(required=False, description="conversionRate", example=0.95),
            "status": NullableString(required=False, description="status", example="尚未上機", enum=["尚未上機", "On-going", "Done", "暫停生產", "取消生產"]),
        }
    #GET model
    get_obj = copy.deepcopy(base_obj)
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    productionSchedule_object = api.model(
        "productionSchedule object", base_obj
    )
    #POST model
    post_obj = copy.deepcopy(base_obj)
    pop_list = ["id", "serialNumber"]
    required_list = ["workOrderSN", "productSN", "productName", "workOrderQuantity", "workOrderDate"]
    not_required_list = ["moldNo"]
    for attr in [item for item in pop_list]:
        post_obj.pop(attr)
    for key in post_obj:
        post_obj[key].description = f"POST {key}"
    for key in [item for item in required_list]:
        post_obj[key].required = True
    for key in [item for item in not_required_list]:
        post_obj[key].required = False
    productionSchedule_post = api.model("productionSchedule post", post_obj)
    
    #PUT model
    put_obj = copy.deepcopy(base_obj)
    pop_list = ["id", "serialNumber"]
    required_list = []
    not_required_list = [] # default all not required
    for attr in [item for item in pop_list]:
        put_obj.pop(attr)
    for key in put_obj:
        put_obj[key].description = f"PUT {key}"
    for key in [item for item in required_list]:
        put_obj[key].required = True
    for key in [item for item in not_required_list]:
        put_obj[key].required = False
    productionSchedule_put = api.model("productionSchedule put", put_obj)
    
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

    # machineSN 
    # Get model
    machineSN_object = api.model(
        "machineSN object",
        {
            "productionArea": NullableString(required=False, description="productionArea", example="A"),
            "machineSN": NullableString(required=False, description="machineSN", example="A1",
                                        validate=Length(min=1, max=1)),
        }
    )

    machineSN_resp = api.model(
        "machineSN response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(machineSN_object),
        }
    )
