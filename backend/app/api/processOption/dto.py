from app.service.customField import *
from flask_restx import Namespace, fields
from marshmallow.validate import Length, Range
from app.utils import validation_error
import logging
import copy

class processOptionDto:
    api = Namespace("processOption", description="processOption related operations.")
    base_obj = {
            "id": NullableInteger(required=False, description="primary key", example=1),
            "processCategory": fields.String(required=False, description="processCategory", example="In-IJ(廠內成型)"),
            "processSN": fields.String(required=False, description="processSN", example="In-IJ01"),
            "processName": fields.String(required=False, description="processName", example="廠內-成型-IJ01"),
        }
    #GET model
    get_obj = copy.deepcopy(base_obj)
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    processOption_object = api.model(
        "processOption object", base_obj
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
    processOption_post = api.model("processOption post", post_obj)
    
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
    processOption_put = api.model("processOption put", put_obj)
    
    processOption_resp = api.model(
        "processOption response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(processOption_object),
        }
    )
