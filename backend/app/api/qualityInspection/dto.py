from app.service.customField import *
from flask_restx import Namespace, fields
from .schemas import qualityInspectionSchema
from marshmallow.validate import Length, Range
from app.utils_log import validation_error
import logging
import copy

class qualityInspectionDto:
    api = Namespace("qualityInspection", description="qualityInspection related operations.")
    base_obj = {
        "id": NullableInteger(required=False, description="primary key", example=1),
        "productionScheduleId": NullableInteger(required=False, description="productionScheduleId", example="1"),
        "inspectionQuantity": NullableInteger(required=False, description="檢驗數量", example="5"),
        "goodQuantity": NullableInteger(required=False, description="良品數量", example="5"),
        "inspector": NullableString(required=False, description="檢驗人員", example="John"),
        "inspectionDate": StringDateTime(required=False, description="檢驗日期", example="2024-09-01 00:00:00+08:00"),
        "inspectionType": fields.String(required=False, description="檢驗類型：首件、巡檢", example="首件"),
    }
    
    #GET model
    get_obj = copy.deepcopy(base_obj)
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    qualityInspection_object = api.model(
        "qualityInspection object", base_obj
    )

    #POST model
    post_obj = copy.deepcopy(base_obj)
    pop_list = ["id"]
    required_list = ["productionScheduleId", "inspectionQuantity", "goodQuantity", "inspector", "inspectionDate", "inspectionType"]
    not_required_list = []
    for attr in [item for item in pop_list]:
        post_obj.pop(attr)
    for key in post_obj:
        post_obj[key].description = f"POST {key}"
    for key in [item for item in required_list]:
        post_obj[key].required = True
    for key in [item for item in not_required_list]:
        post_obj[key].required = False
    qualityInspection_post = api.model("qualityInspection post", post_obj)
    
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
    qualityInspection_put = api.model("qualityInspection put", put_obj)
    
    #response model
    qualityInspection_resp = api.model(
        "qualityInspection response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(qualityInspection_object),
        }
    )
