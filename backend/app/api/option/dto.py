from app.service.customField import *
from flask_restx import Namespace, fields
from .schemas import optionSchema
from marshmallow.validate import Length, Range
from backend.app.utils_log import validation_error
import logging
import copy

class optionDto:
    api = Namespace("option", description="option related operations.")
    base_obj = {
        "id": NullableInteger(required=False, description="primary key", example=1),
        "name": fields.String(required=False, description="name", example="PROD-00001-01"),
        "content": fields.String(required=False, description="optionName", example="PROD_NAME-01"),
    }
    
    #GET model
    get_obj = copy.deepcopy(base_obj)
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    option_object = api.model(
        "option object", base_obj
    )

    #POST model
    post_obj = copy.deepcopy(base_obj)
    pop_list = ["id", "name", "content"]
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
    option_post = api.model("option post", post_obj)
    
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
    option_put = api.model("option put", put_obj)
    
    #response model
    option_resp = api.model(
        "option response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(option_object),
        }
    )
