from app.service.customField import *
from flask_restx import Namespace, fields
import copy

class MachineStatusDto:
    api = Namespace("machineStatus", description="machineStatus related operations.")
    
    base_obj = {
        "id": NullableInteger(required=False, description="primary key", example=1),
        "machineId": NullableInteger(required=False, description="機台ID", example=1),
        "planStartDate": NullableDateTime(required=False, description="預計開始日期", example="2025-02-25T00:00:00.000+08:00"),
        "planEndDate": NullableDateTime(required=False, description="預計結束日期", example="2025-02-25T00:00:00.000+08:00"),
        "actualStartDate": NullableDateTime(required=False, description="實際開始日期", example="2025-02-25T00:00:00.000+08:00"),
        "actualEndDate": NullableDateTime(required=False, description="實際結束日期", example="2025-02-25T00:00:00.000+08:00"),
        "status": NullableString(required=False, description="機台狀態", example="status", enum=["生產中", "待機中", "上模與調機", "產品試模", "機台停機"]),
        "reason": NullableString(required=False, description="停機原因", example="停機原因"),
        "product": NullableString(required=False, description="試模產品", example="產品名稱")
    }
    #GET model
    get_obj = copy.deepcopy(base_obj)
    machineStatus_object = api.model(
        "machineStatus object", base_obj
    )
    #POST model
    post_obj = copy.deepcopy(base_obj)
    pop_list = ["id", "actualEndDate"]
    required_list = ["machineId"]
    not_required_list = []
    for attr in [item for item in pop_list]:
        post_obj.pop(attr)
    for key in [item for item in required_list]:
        post_obj[key].required = True
    for key in [item for item in not_required_list]:
        post_obj[key].required = False
    machineStatus_post = api.model("machineStatus post", post_obj)
    
    #PUT model
    put_obj = copy.deepcopy(base_obj)
    pop_list = ["machineId"]
    required_list = ["id"]
    not_required_list = [] # default all not required
    for attr in [item for item in pop_list]:
        put_obj.pop(attr)
    for key in [item for item in required_list]:
        put_obj[key].required = True
    for key in [item for item in not_required_list]:
        put_obj[key].required = False
    machineStatus_put = api.model("machineStatus put", put_obj)
    
    machineStatus_resp = api.model(
        "machineStatus response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(machineStatus_object),
        }
    )
