from app.service.customField import *
from flask_restx import Namespace, fields
from marshmallow.validate import Length, Range
from app.utils import validation_error
import logging
import copy

class materialOptionDto:
    api = Namespace("materialOption", description="materialOption related operations.")
    base_obj = {
            "id": NullableInteger(required=False, description="primary key", example=1),
            "materialCode": fields.String(required=False, description="materialCode", example="Rm-1"),
            "materialType": fields.String(required=False, description="materialType", example="原物料1"),
        }
    #GET model
    get_obj = copy.deepcopy(base_obj)
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    materialOption_object = api.model(
        "materialOption object", base_obj
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
    materialOption_post = api.model("materialOption post", post_obj)
    
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
    materialOption_put = api.model("materialOption put", put_obj)
    
    materialOption_resp = api.model(
        "materialOption response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(materialOption_object),
        }
    )
