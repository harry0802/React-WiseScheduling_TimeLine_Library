from app.service.customField import *
from flask_restx import Namespace, fields
from .schemas import materialSchema
from marshmallow.validate import Length, Range
from app.utils_log import validation_error
import logging
import copy

class materialDto:
    api = Namespace("material", description="material related operations.")
    base_obj = {
            "id": NullableInteger(required=False, description="primary key", example=1),
            "materialOptionId": fields.Integer(required=False, description="foreign key connect to materialOption table", example=1),
            "productSN": fields.String(required=False, description="materialCode", example="JK-01044-02"),
            "materialSN": fields.String(required=False, description="materialSN", example="A-AC-A001"),
            "materialName": fields.String(required=False, description="materialName", example="奇美AC-CM205N"),
            "quantity": fields.Float(required=False, description="quantity", example="4.2"),
            "unit": fields.String(required=False, description="unit", example="公克"),
        }
    #GET model
    get_obj = copy.deepcopy(base_obj)
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    material_object = api.model(
        "material object", base_obj
    )
    #POST model
    post_obj = copy.deepcopy(base_obj)
    pop_list = ["id"]
    required_list = ["materialSN", "materialName", "quantity", "unit"]
    not_required_list = []
    for attr in [item for item in pop_list]:
        post_obj.pop(attr)
    for key in post_obj:
        post_obj[key].description = f"POST {key}"
    for key in [item for item in required_list]:
        post_obj[key].required = True
    for key in [item for item in not_required_list]:
        post_obj[key].required = False
    material_post = api.model("material post", post_obj)
    
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
    material_put = api.model("material put", put_obj)
    
    material_resp = api.model(
        "material response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(material_object),
        }
    )

        
    unitPrice_resp = api.model(
        "material unit price response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Integer,
        }
    )
