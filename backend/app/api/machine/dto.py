from app.service.customField import *
from flask_restx import Namespace, fields
from marshmallow.validate import Length, Range
from app.utils_log import validation_error
import logging
import copy

class MachineDto:
    api = Namespace("machine", description="machine related operations.")
    base_obj = {
        "id": NullableInteger(required=False, description="primary key", example=1),
        "productionArea": NullableString(required=False, description="機台區域", example="A"),
        "machineSN": NullableString(required=False, description="機台編號", example="A01"),
        "singleOrDoubleColor": NullableString(required=False, description="單射或雙射", example="單"),
        "tonnage": NullableString(required=False, description="噸數", example="100T"),
        "moldTrialCost": NullableInteger(required=False, description="廠內試模費率 8hr", example=1000),
        "electricityCostPerSec": NullableFloat(required=False, description="每秒電費", example=0.0010),
    }
    #GET model
    get_obj = copy.deepcopy(base_obj)
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    machine_object = api.model(
        "machine object", base_obj
    )
    #POST model
    post_obj = copy.deepcopy(base_obj)
    pop_list = ["id"]
    required_list = []
    not_required_list = []
    for attr in [item for item in pop_list]:
        post_obj.pop(attr)
    for key in post_obj:
        post_obj[key].description = f"POST {key}"
    for key in [item for item in required_list]:
        post_obj[key].required = True
    for key in [item for item in not_required_list]:
        post_obj[key].required = False
    machine_post = api.model("machine post", post_obj)
    
    #PUT model
    put_obj = copy.deepcopy(base_obj)
    pop_list = []
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
    machine_put = api.model("machine put", put_obj)
    
    machine_resp = api.model(
        "machine response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(machine_object),
        }
    )
