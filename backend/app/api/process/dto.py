from app.service.customField import *
from flask_restx import Namespace, fields
from marshmallow.validate import Length, Range
from backend.app.utils_log import validation_error
import logging
import copy

class processDto:
    api = Namespace("process", description="process related operations.")
    mold_obj = {
        "id": NullableInteger(required=False, description="ltmoldmap table primary key", example=1),
        "moldno": fields.String(required=False, description="moldno", example="mold-01"),
    }
    material_obj = {
        "id": NullableInteger(required=False, description="material table primary key", example=1),
        "materialCode": fields.String(required=False, description="materialCode", example="Rm"),
        "materialType": fields.String(required=False, description="materialType", example="原物料"),
        "productSN": fields.String(required=False, description="materialCode", example="JK-01044-02"),
        "materialSN": fields.String(required=False, description="materialSN", example="A-AC-A001"),
        "materialName": fields.String(required=False, description="materialName", example="奇美AC-CM205N"),
        "quantity": fields.Float(required=False, description="quantity", example="4.2"),
        "unit": fields.String(required=False, description="unit", example="公克"),
    }
    base_obj = {
        "id": NullableInteger(required=False, description="process table primary key", example=1),
        "productId": fields.Integer(required=False, description="foreign key connect to product table", example=1),
        "processOptionId": fields.Integer(required=False, description="foreign key connect to processOption table", example=1),
        "jigSN": fields.String(required=False, description="jigSN", example=""),
        # https://github.com/noirbizarre/flask-restplus/issues/292 nested fields not working, should add api.model() to fix
        "molds": fields.List(fields.Nested(api.model("mold object", mold_obj))),
        "materials": fields.List(fields.Nested(api.model("material object",material_obj))),
    }
    
    #GET model
    get_obj = copy.deepcopy(base_obj)
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    process_object = api.model(
        "process object", base_obj
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
    # mold_obj pop 
    post_mold_obj = copy.deepcopy(mold_obj)
    molds_pop_list = ["id"]
    for attr in [item for item in molds_pop_list]:
        post_mold_obj.pop(attr)
    post_obj["molds"] = fields.List(fields.Nested(api.model("post_mold object", post_mold_obj)))
    # material_obj pop 
    post_material_obj = copy.deepcopy(material_obj)
    materials_pop_list = ["materialCode", "materialType", "productSN", "materialSN", "materialName", "quantity", "unit"]
    for attr in [item for item in materials_pop_list]:
        post_material_obj.pop(attr)
    post_obj["materials"] = fields.List(fields.Nested(api.model("post_material object", post_material_obj)))
    process_post = api.model("process post", post_obj)
    
    #PUT model
    put_obj = copy.deepcopy(base_obj)
    pop_list = ["productId"]
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
    # material_obj pop 
    put_material_obj = copy.deepcopy(material_obj)
    materials_pop_list = ["materialCode", "materialType", "productSN", "materialSN", "materialName", "quantity", "unit"]
    for attr in [item for item in materials_pop_list]:
        put_material_obj.pop(attr)
    put_obj["materials"] = fields.List(fields.Nested(api.model("put_material object", put_material_obj)))
    process_put = api.model("process put", put_obj)
    
    #response model
    process_resp = api.model(
        "process response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(process_object),
        }
    )
