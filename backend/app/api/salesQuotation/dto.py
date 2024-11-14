from app.service.customField import *
from flask_restx import Namespace, fields
from marshmallow.validate import Length, Range
from app.utils_log import validation_error
import logging
import copy

class SalesQuotationDto:
    api = Namespace("salesQuotation", description="salesQuotation related operations.")

    SQMaterialCostSetting_obj = {
        "id": NullableInteger(required=False, description="SQMaterialCostSetting table primary key", example=1),
        "SQProcessId": fields.Integer(required=True, description="對應的報價製程ID", example=1),
        "estimatedDefectRate": fields.Float(required=False, description="預估不良率 (%)", example=0.1),
        "estimatedMaterialFluctuation": fields.Float(required=False, description="預估原料波動 (%)", example=0.1),
        "extractionCost": fields.Float(required=False, description="抽料費用", example=0.1),
        "processingCost": fields.Float(required=False, description="加工費用", example=0.1),
    }

    SQMaterialCost_obj = {
        "id": NullableInteger(required=False, description="SQMaterialCost table primary key", example=1),
        "SQProcessId": fields.Integer(required=True, description="對應的報價製程ID", example=1),
        "materialOptionId": fields.Integer(required=False, description="原物料類別", example=1),
        "materialSN": fields.String(required=False, description="物料編碼", example="A-AC-A001"),
        "materialName": fields.String(required=False, description="物料名稱", example="奇美AC-CM205N"),
        "unit": fields.String(required=False, description="單位 (如公斤、件等)", example="公克"),
        "weight": fields.Float(required=False, description="重量", example=4.2),
        "unitPrice": fields.Float(required=False, description="單價", example=0.1),
        "amount": fields.Float(required=False, description="金額", example=0.1),
    }

    SQPackagingCost_obj = {
        "id": NullableInteger(required=False, description="SQPackagingCost table primary key", example=1),
        "SQProcessId": fields.Integer(required=True, description="對應的報價製程ID", example=1),
        "packagingType": fields.String(required=False, description="包材種類", example="包材"),
        "materialSN": fields.String(required=False, description="物料編碼", example="H-0518-CC08"),
        "materialName": fields.String(required=False, description="物料名稱", example="紙箱57.6*39.4*32.4cm(5層)VW326外封蓋用"),
        "unit": fields.String(required=False, description="單位 (如公斤、件等)", example="件"),
        "quantity": fields.Float(required=False, description="數量", example=0.0105),
        "capacity": fields.Float(required=False, description="容量", example=96),
        "bagsPerKg": fields.Float(required=False, description="每公斤幾個袋子", example=4.2),
        "unitPrice": fields.Float(required=False, description="單價", example=35),
        "amount": fields.Float(required=False, description="金額", example=0.36),
    }

    SQInjectionMoldingCost_obj = {
        "id": NullableInteger(required=False, description="SQInjectionMoldingCost table primary key", example=1),
        "SQProcessId": fields.Integer(required=True, description="對應的報價製程ID", example=1),
        "machineId": fields.Integer(required=False, description="對應的機台ID", example=1),
        "workHoursRatio": fields.Float(required=False, description="工時比例 (%)", example=0.1),
        "defectiveRate": fields.Float(required=False, description="不良率 (%)", example=0.1),
        "cycleTime": fields.Float(required=False, description="成型週期 (秒)", example=0.1),
        "packageTime": fields.Float(required=False, description="灌包工時 (秒)", example=0.1),
        "moldCavity": fields.Integer(required=False, description="穴數", example=1),
        "unitPrice": fields.Float(required=False, description="單價", example=0.1),
        "amount": fields.Float(required=False, description="金額", example=0.1),
        "subtotal": fields.Float(required=False, description="小計", example=0.1),
        "electricityCost": fields.Float(required=False, description="電費", example=0.1),
    }

    SQInPostProcessingCost_obj = {
        "id": NullableInteger(required=False, description="SQInPostProcessingCost table primary key", example=1),
        "SQProcessId": fields.Integer(required=True, description="對應的報價製程ID", example=1),
        "workSecond": fields.Integer(required=False, description="工時(秒)", example=1),
        "unitPrice": fields.Float(required=False, description="單價", example=0.1),
        "amount": fields.Float(required=False, description="金額", example=0.1),
    }

    SQOutPostProcessingCost_obj = {
        "id": NullableInteger(required=False, description="SQOutPostProcessingCost table primary key", example=1),
        "SQProcessId": fields.Integer(required=True, description="對應的報價製程ID", example=1),
        "unitPrice": fields.Float(required=False, description="單價", example=0.1),
        "amount": fields.Float(required=False, description="金額", example=0.1),
    }

    SQFreight_obj = {
        "id": NullableInteger(required=False, description="SQFreight table primary key", example=1),
        "salesQuotationId": fields.Integer(required=True, description="對應的報價ID", example=1),
        "deliveryDistance": fields.Float(required=False, description="送貨距離 (公里)", example=1),
        "driverWorkHours": fields.Float(required=False, description="司機工時", example=1),
        "fuelCostPerKM": fields.Float(required=False, description="油錢單價 (每公里)", example=1),
        "estimatedShipment": fields.Integer(required=False, description="預估出貨數量", example=1),
        "amount": fields.Float(required=False, description="金額", example=1),
    }

    SQCustomsDuty_obj = {
        "id": NullableInteger(required=False, description="SQCustomsDuty table primary key", example=1),
        "salesQuotationId": fields.Integer(required=True, description="對應的報價ID", example=1),
        "feeType": fields.String(required=False, description="貨運/關稅", example="運費"),
        "freight": fields.Float(required=False, description="運費", example=0.1),
        "estimatedShipment": fields.Integer(required=False, description="預估出貨數量", example=1),
        "amount": fields.Float(required=False, description="金額", example=0.1),
    }

    SQProcess_obj = {
        "id": NullableInteger(required=False, description="ltmoldmap table primary key", example=1),
        "salesQuotationId": fields.Integer(required=True, description="對應的報價ID", example=1),
        "processOptionId": fields.Integer(required=True, description="製程選項ID", example=1),
        "SQMaterialCostSetting": fields.Nested(api.model("SQMaterialCostSetting object", SQMaterialCostSetting_obj)),
        "SQMaterialCosts": fields.List(fields.Nested(api.model("SQMaterialCost object", SQMaterialCost_obj))),
        "SQPackagingCosts": fields.List(fields.Nested(api.model("SQPackagingCost object", SQPackagingCost_obj))),
        "SQInjectionMoldingCosts": fields.List(fields.Nested(api.model("SQInjectionMoldingCost object", SQInjectionMoldingCost_obj))),
        "SQInPostProcessingCosts": fields.List(fields.Nested(api.model("SQInPostProcessingCost object", SQInPostProcessingCost_obj))),
        "SQOutPostProcessingCosts": fields.List(fields.Nested(api.model("SQOutPostProcessingCost object", SQOutPostProcessingCost_obj))),
    }

    shippingCost_obj = {
        "SQFreights": fields.List(fields.Nested(api.model("SQFreight object", SQFreight_obj))),
        "SQCustomsDuties": fields.List(fields.Nested(api.model("SQCustomsDuty object", SQCustomsDuty_obj))),
    }

    base_obj = {
        "id": NullableInteger(required=False, description="salesQuotation table primary key", example=1),
        "quotationSN": fields.String(required=False, description="報價單編號", example="S20241108001"),
        "createDate": NullableDateTime(required=False, description="報價單建立日期", example="2024-11-08T00:00:00.000+08:00"),
        "customerName": fields.String(required=False, description="客戶名稱", example="LT"),
        "productName": fields.String(required=False, description="產品名稱", example="JK-01044-02"),
        "overheadRnd": fields.Float(required=False, description="管銷研百分比", example=0.1),
        "profit": fields.Float(required=False, description="利潤百分比", example=0.1),
        "risk": fields.Float(required=False, description="風險百分比", example=0.1),
        "annualDiscount": fields.Float(required=False, description="年降百分比", example=0.1),
        "rebate": fields.Float(required=False, description="回饋百分比", example=0.1),
        "actualQuotation": fields.Float(required=False, description="實際報價", example=0.1),
        # https://github.com/noirbizarre/flask-restplus/issues/292 nested fields not working, should add api.model() to fix
        "processes": fields.List(fields.Nested(api.model("SQProcess object", SQProcess_obj))),
        "shippingCosts": fields.Nested(api.model("SQFreight and SQCustomsDuty object", shippingCost_obj)),
    }
    
    #SalesQuotation GET model
    get_obj = copy.deepcopy(base_obj)
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    SalesQuotation_get = api.model("SalesQuotation object", base_obj)

    #SalesQuotation POST model
    SalesQuotation_post_obj = copy.deepcopy(base_obj)
    pop_list = ["id", "quotationSN", "customerName", "productName", "overheadRnd", "profit", "risk", "annualDiscount", "rebate", "actualQuotation", "processes", "shippingCosts"]
    required_list = []
    not_required_list = []
    for attr in [item for item in pop_list]:
        SalesQuotation_post_obj.pop(attr)
    for key in SalesQuotation_post_obj:
        SalesQuotation_post_obj[key].description = f"POST {key}"
    for key in [item for item in required_list]:
        SalesQuotation_post_obj[key].required = True
    for key in [item for item in not_required_list]:
        SalesQuotation_post_obj[key].required = False
    SalesQuotation_post = api.model("SalesQuotation post", SalesQuotation_post_obj)

    #SalesQuotation PUT model
    SalesQuotation_put_obj = copy.deepcopy(base_obj)
    pop_list = ["id", "quotationSN", "createDate", "processes", "shippingCosts"]
    required_list = []
    not_required_list = []
    for attr in [item for item in pop_list]:
        SalesQuotation_put_obj.pop(attr)
    for key in SalesQuotation_put_obj:
        SalesQuotation_put_obj[key].description = f"PUT {key}"
    for key in [item for item in required_list]:
        SalesQuotation_put_obj[key].required = True
    for key in [item for item in not_required_list]:
        SalesQuotation_put_obj[key].required = False
    SalesQuotation_put = api.model("SalesQuotation put", SalesQuotation_put_obj)

    #SQProcess POST model
    SQProcess_post_obj = copy.deepcopy(SQProcess_obj)
    pop_list = ["id", "salesQuotationId"]
    required_list = ["processOptionId"]
    not_required_list = []
    for attr in [item for item in pop_list]:
        SQProcess_post_obj.pop(attr)
    for key in SQProcess_post_obj:
        SQProcess_post_obj[key].description = f"POST {key}"
    for key in [item for item in required_list]:
        SQProcess_post_obj[key].required = True
    for key in [item for item in not_required_list]:
        SQProcess_post_obj[key].required = False
    # SQMaterialCostSetting_obj pop 
    post_SQMaterialCostSetting_obj = copy.deepcopy(SQMaterialCostSetting_obj)
    SQMaterialCostSetting_pop_list = ["id", "SQProcessId"]
    for attr in [item for item in SQMaterialCostSetting_pop_list]:
        post_SQMaterialCostSetting_obj.pop(attr)
    SQProcess_post_obj["SQMaterialCostSetting"] = fields.Nested(api.model("SQMaterialCostSetting_obj object", post_SQMaterialCostSetting_obj))
    # SQMaterialCost_obj
    post_SQMaterialCost_obj = copy.deepcopy(SQMaterialCost_obj)
    SQMaterialCost_pop_list = ["id", "SQProcessId"]
    for attr in [item for item in SQMaterialCost_pop_list]:
        post_SQMaterialCost_obj.pop(attr)
    SQProcess_post_obj["SQMaterialCosts"] = fields.List(fields.Nested(api.model("SQMaterialCost_obj object", post_SQMaterialCost_obj)))
    # SQPackagingCost_obj
    post_SQPackagingCost_obj = copy.deepcopy(SQPackagingCost_obj)
    SQPackagingCost_pop_list = ["id", "SQProcessId"]
    for attr in [item for item in SQPackagingCost_pop_list]:
        post_SQPackagingCost_obj.pop(attr)
    SQProcess_post_obj["SQPackagingCosts"] = fields.List(fields.Nested(api.model("SQPackagingCost_obj object", post_SQPackagingCost_obj)))
    # SQInjectionMoldingCost_obj
    post_SQInjectionMoldingCost_obj = copy.deepcopy(SQInjectionMoldingCost_obj)
    SQInjectionMoldingCost_pop_list = ["id", "SQProcessId"]
    for attr in [item for item in SQInjectionMoldingCost_pop_list]:
        post_SQInjectionMoldingCost_obj.pop(attr)
    SQProcess_post_obj["SQInjectionMoldingCosts"] = fields.List(fields.Nested(api.model("SQInjectionMoldingCost_obj object", post_SQInjectionMoldingCost_obj)))
    # SQInPostProcessingCost_obj
    post_SQInPostProcessingCost_obj = copy.deepcopy(SQInPostProcessingCost_obj)
    SQInPostProcessingCost_pop_list = ["id", "SQProcessId"]
    for attr in [item for item in SQInPostProcessingCost_pop_list]:
        post_SQInPostProcessingCost_obj.pop(attr)
    SQProcess_post_obj["SQInPostProcessingCosts"] = fields.List(fields.Nested(api.model("SQInPostProcessingCost_obj object", post_SQInPostProcessingCost_obj)))
    # SQOutPostProcessingCost_obj
    post_SQOutPostProcessingCost_obj = copy.deepcopy(SQOutPostProcessingCost_obj)
    SQOutPostProcessingCost_pop_list = ["id", "SQProcessId"]
    for attr in [item for item in SQOutPostProcessingCost_pop_list]:
        post_SQOutPostProcessingCost_obj.pop(attr)
    SQProcess_post_obj["SQOutPostProcessingCosts"] = fields.List(fields.Nested(api.model("SQOutPostProcessingCost_obj object", post_SQOutPostProcessingCost_obj)))
    SQProcess_post = api.model("SQProcess post", SQProcess_post_obj)
    
    #SQProcess PUT model
    SQProcess_put_obj = copy.deepcopy(SQProcess_obj)
    pop_list = ["salesQuotationId"]
    required_list = []
    not_required_list = [] # default all not required
    for attr in [item for item in pop_list]:
        SQProcess_put_obj.pop(attr)
    for key in SQProcess_put_obj:
        SQProcess_put_obj[key].description = f"PUT {key}"
    for key in [item for item in required_list]:
        SQProcess_put_obj[key].required = True
    for key in [item for item in not_required_list]:
        SQProcess_put_obj[key].required = False
    # SQMaterialCostSetting_obj
    put_SQMaterialCostSetting_obj = copy.deepcopy(SQMaterialCostSetting_obj)
    SQMaterialCostSetting_pop_list = ["SQProcessId"]
    for attr in [item for item in SQMaterialCostSetting_pop_list]:
        put_SQMaterialCostSetting_obj.pop(attr)
    SQProcess_put_obj["SQMaterialCostSetting"] = fields.Nested(api.model("put_SQMaterialCostSetting_obj object", put_SQMaterialCostSetting_obj))
    # SQMaterialCost_obj
    put_SQMaterialCost_obj = copy.deepcopy(SQMaterialCost_obj)
    SQMaterialCost_pop_list = ["SQProcessId"]
    for attr in [item for item in SQMaterialCost_pop_list]:
        put_SQMaterialCost_obj.pop(attr)
    SQProcess_put_obj["SQMaterialCosts"] = fields.List(fields.Nested(api.model("put_SQMaterialCost_obj object", put_SQMaterialCost_obj)))
    # SQPackagingCost_obj
    put_SQPackagingCost_obj = copy.deepcopy(SQPackagingCost_obj)
    SQPackagingCost_pop_list = ["SQProcessId"]
    for attr in [item for item in SQPackagingCost_pop_list]:
        put_SQPackagingCost_obj.pop(attr)
    SQProcess_put_obj["SQPackagingCosts"] = fields.List(fields.Nested(api.model("put_SQPackagingCost_obj object", put_SQPackagingCost_obj)))
    # SQInjectionMoldingCost_obj
    put_SQInjectionMoldingCost_obj = copy.deepcopy(SQInjectionMoldingCost_obj)
    SQInjectionMoldingCost_pop_list = ["SQProcessId"]
    for attr in [item for item in SQInjectionMoldingCost_pop_list]:
        put_SQInjectionMoldingCost_obj.pop(attr)
    SQProcess_put_obj["SQInjectionMoldingCosts"] = fields.List(fields.Nested(api.model("put_SQInjectionMoldingCost_obj object", put_SQInjectionMoldingCost_obj)))
    # SQInPostProcessingCost_obj
    put_SQInPostProcessingCost_obj = copy.deepcopy(SQInPostProcessingCost_obj)
    SQInPostProcessingCost_pop_list = ["SQProcessId"]
    for attr in [item for item in SQInPostProcessingCost_pop_list]:
        put_SQInPostProcessingCost_obj.pop(attr)
    SQProcess_put_obj["SQInPostProcessingCosts"] = fields.List(fields.Nested(api.model("put_SQInPostProcessingCost_obj object", put_SQInPostProcessingCost_obj)))
    # SQOutPostProcessingCost_obj
    put_SQOutPostProcessingCost_obj = copy.deepcopy(SQOutPostProcessingCost_obj)
    SQOutPostProcessingCost_pop_list = ["SQProcessId"]
    for attr in [item for item in SQOutPostProcessingCost_pop_list]:
        put_SQOutPostProcessingCost_obj.pop(attr)
    SQProcess_put_obj["SQOutPostProcessingCosts"] = fields.List(fields.Nested(api.model("put_SQOutPostProcessingCost_obj object", put_SQOutPostProcessingCost_obj)))    
    SQProcess_put = api.model("SQProcess put", SQProcess_put_obj)
    
    # ShippingCost PUT model
    shippingCost_put_obj = copy.deepcopy(shippingCost_obj)
    pop_list = []
    required_list = []
    not_required_list = []
    for attr in [item for item in pop_list]:
        shippingCost_put_obj.pop(attr)
    for key in shippingCost_put_obj:
        shippingCost_put_obj[key].description = f"PUT {key}"
    for key in [item for item in required_list]:
        shippingCost_put_obj[key].required = True
    for key in [item for item in not_required_list]:
        shippingCost_put_obj[key].required = False
    # SQFreight_obj
    put_SQFreight_obj = copy.deepcopy(SQFreight_obj)
    SQFreight_pop_list = ["salesQuotationId"]
    SQFreight_required_list = ["id"]
    for attr in [item for item in SQFreight_pop_list]:
        put_SQFreight_obj.pop(attr)
    for key in [item for item in SQFreight_required_list]:
        put_SQFreight_obj[key].required = True
    shippingCost_put_obj["SQFreights"] = fields.List(fields.Nested(api.model("put_SQFreight_obj object", put_SQFreight_obj)))
    # SQCustomsDuty_obj
    put_SQCustomsDuty_obj = copy.deepcopy(SQCustomsDuty_obj)
    SQCustomsDuty_pop_list = ["salesQuotationId"]
    SQCustomsDuty_required_list = ["id"]
    for attr in [item for item in SQCustomsDuty_pop_list]:
        put_SQCustomsDuty_obj.pop(attr)
    for key in [item for item in SQCustomsDuty_required_list]:
        put_SQCustomsDuty_obj[key].required = True
    shippingCost_put_obj["SQCustomsDuties"] = fields.List(fields.Nested(api.model("put_SQCustomsDuty_obj object", put_SQCustomsDuty_obj)))
    shippingCost_put = api.model("ShippingCost put", shippingCost_put_obj)

    #SalesQuotation response model
    SalesQuotation_resp = api.model(
        "SalesQuotation response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(SalesQuotation_get),
        }
    )
