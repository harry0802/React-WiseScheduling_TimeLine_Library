from app.api.productionSchedule.dto import NullableDateTime, NullableFloat, NullableInteger, NullableString, StringDateTime, StringInteger
from flask_restx import Namespace, fields
from .schemas import productionReportSchema
from marshmallow.validate import Length, Range
from app.utils import validation_error
import logging
import copy

class productionReportDto:
    # ref productionReportSDD.md
    api = Namespace("productionReport", description="productionReport related operations.")
    
    base_obj = {
        "id": NullableInteger(required=False, description="serialNumber", example=1),
        "startTime": NullableDateTime(required=False, description="開始時間", example="2024-03-28T00:00:00.000+08:00"),
        "machineSN": fields.String(required=False, description="機台號碼", example="A01"),
        "workOrderSN": NullableString(required=False, description="製令單號", example="S2023122800001"),
        "serialNumber": NullableInteger(required=False, description="流水號", example=1),
        "lotName": NullableString(required=False, description="批號", example="S2023122800001"),
        "workOrderQuantity": StringInteger(required=False, description="製令數量", example=1000, min=0, max=1000000, type=["integer", "string"], pattern="^[0-9]+$"),
        "material": NullableString(required=False, description="材質", example="AC"),
        "moldCavity": NullableInteger(required=False, description="穴數", example=1),
        "leader": NullableString(required=False, description="產線管理者小班長", example="[{'leader':'小班長一','log_time':'2024-03-28T00:00:00.000+08:00'}]"),
        "operator1": NullableString(required=False, description="作業人員(一)", example="作業人員(一)"),
        "operator2": NullableString(required=False, description="作業人員(二)", example="作業人員(二)"),
        "productionQuantity": NullableInteger(required=False, description="生產數量", example=1, min=0, max=1000000),
        "unfinishedQuantity": NullableInteger(required=False, description="未完成數量", example=1, min=0, max=1000000),
        "colorDifference": NullableInteger(required=False, description="色差", example=1, min=0, max=1000000),
        "deformation": NullableInteger(required=False, description="變形", example=1, min=0, max=1000000),
        "shrinkage": NullableInteger(required=False, description="縮水", example=1, min=0, max=1000000),
        "shortage": NullableInteger(required=False, description="缺料", example=1, min=0, max=1000000),
        "hole": NullableInteger(required=False, description="破洞", example=1, min=0, max=1000000),
        "bubble": NullableInteger(required=False, description="氣泡", example=1, min=0, max=1000000),
        "impurity": NullableInteger(required=False, description="雜質", example=1, min=0, max=1000000),
        "pressure": NullableInteger(required=False, description="壓克", example=1, min=0, max=1000000),
        "overflow": NullableInteger(required=False, description="溢料", example=1, min=0, max=1000000),
        "flowMark": NullableInteger(required=False, description="流痕", example=1, min=0, max=1000000),
        "oilStain": NullableInteger(required=False, description="油污", example=1, min=0, max=1000000),
        "burr": NullableInteger(required=False, description="毛邊", example=1, min=0, max=1000000),
        "blackSpot": NullableInteger(required=False, description="黑點", example=1, min=0, max=1000000),
        "scratch": NullableInteger(required=False, description="刮傷", example=1, min=0, max=1000000),
        "encapsulation": NullableInteger(required=False, description="包封", example=1, min=0, max=1000000),
        "other": NullableInteger(required=False, description="其它", example=1, min=0, max=1000000),
        "defectiveQuantity": NullableInteger(required=False, description="不良數", example=1, min=0, max=1000000),
        "moldModulePerHour": NullableInteger(required=False, description="模數/1H", example=8, min=0, max=1000000),
        "moldingSecond": NullableInteger(required=False, description="成型秒數", example=431, min=0, max=1000000),
        "endTime": NullableDateTime(required=False, description="結束時間", example="2024-03-29T00:00:00.000+08:00"),
        "comment": NullableString(required=False, description="備註", example="備註"),
        "workingHours": NullableFloat(required=False, description="工時", example=12.0),
        "planProductionQuantity": NullableInteger(required=False, description="預計生產數量", example=1, min=0, max=1000000),
        "productionQuantityDifference": NullableInteger(required=False, description="生產數差異值", example=1, min=0, max=1000000),
        "productionDefectiveRate": NullableFloat(required=False, description="生產不良率", example=1.0),
        "productionYield": NullableFloat(required=False, description="生產良率", example=1.0),
        "machineMode": NullableString(required=False, description="機台模式", example="手動"),
        "machineProductionModule": NullableInteger(required=False, description="機台生產模數", example=1, min=0, max=1000000),
        "machineProductionQuantity": NullableInteger(required=False, description="機台生產數量", example=1, min=0, max=1000000),
        "machineDefectiveRate": NullableFloat(required=False, description="實際不良率", example=1.0),
        "utilizationRate": NullableFloat(required=False, description="稼動率", example=1.0),
        "productionEfficiency": NullableFloat(required=False, description="產能效率", example=1.0),
        "OEE": NullableFloat(required=False, description="OEE", example=1.0),

    }
    #GET model
    get_obj = copy.deepcopy(base_obj)
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    productionReport_object = api.model(
        "productionReport object", base_obj
    )
    #POST model
    post_obj = copy.deepcopy(base_obj)
    pop_list = ["id", "serialNumber"]
    required_list = ["workOrderSN", "workOrderQuantity", "lotName"]
    not_required_list = []
    for attr in [item for item in pop_list]:
        post_obj.pop(attr)
    for key in post_obj:
        post_obj[key].description = f"POST {key}"
    for key in [item for item in required_list]:
        post_obj[key].required = True
    for key in [item for item in not_required_list]:
        post_obj[key].required = False
    productionReport_post = api.model("productionReport post", post_obj)
    
    #PUT model
    put_obj = copy.deepcopy(base_obj)
    pop_list = ["serialNumber"]
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
    productionReport_put = api.model("productionReport put", put_obj)
    
    #PUT model without ID
    put_withoutID_obj = copy.deepcopy(base_obj)
    pop_list = ["id", "serialNumber"]
    required_list = []
    not_required_list = [] # default all not required
    for attr in [item for item in pop_list]:
        put_withoutID_obj.pop(attr)
    for key in put_withoutID_obj:
        put_withoutID_obj[key].description = f"PUT {key}"
    for key in [item for item in required_list]:
        put_withoutID_obj[key].required = True
    for key in [item for item in not_required_list]:
        put_withoutID_obj[key].required = False
    productionReport_put_withoutID = api.model("productionReport put without ID", put_withoutID_obj)
    
    productionReport_meta = api.model(
        "productionReport meta",
        {
            "page": NullableInteger(required=False, description="page number", example=1),
            "size": NullableInteger(required=False, description="size of the page", example=10),
            "sort": NullableString(required=False, description="sort by a column", example="id"),
            "total_pages": NullableInteger(required=False, description="total pages", example=1),
            "total_count": NullableInteger(required=False, description="total count", example=10),
        }
    )
    productionReport_paging = api.model(
        "productionReport paging",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.List(fields.Nested(productionReport_object)),
            "meta": fields.Nested(productionReport_meta)
        }
    )
    productionReport_resp = api.model(
        "productionReport response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(productionReport_object),
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
