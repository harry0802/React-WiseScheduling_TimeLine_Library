from app.service.customField import *
from flask_restx import Namespace, fields
from marshmallow.validate import Length, Range
from app.utils_log import validation_error
import logging
import copy

class FactoryQuotationDto:
    api = Namespace("factoryQuotation", description="factoryQuotation related operations.")

    FQMaterialCostSetting_obj = {
        "id": NullableInteger(required=False, description="FQMaterialCostSetting table primary key", example=1),
        "FQProcessId": fields.Integer(required=True, description="對應的報價製程ID", example=1),
        "estimatedDefectRate": fields.Float(required=False, description="預估不良率 (%)", example=0.1),
        "estimatedMaterialFluctuation": fields.Float(required=False, description="預估原料波動 (%)", example=0.1),
        "extractionCost": fields.Float(required=False, description="抽料費用", example=0.1),
        "processingCost": fields.Float(required=False, description="加工費用", example=0.1),
    }

    FQMaterialCost_obj = {
        "id": NullableInteger(required=False, description="FQMaterialCost table primary key", example=1),
        "FQProcessId": fields.Integer(required=True, description="對應的報價製程ID", example=1),
        "materialOptionId": fields.Integer(required=False, description="原物料類別", example=1),
        "materialSN": fields.String(required=False, description="物料編碼", example="A-AC-A001"),
        "materialName": fields.String(required=False, description="物料名稱", example="奇美AC-CM205N"),
        "unit": fields.String(required=False, description="單位 (如公斤、件等)", example="公克"),
        "weight": fields.Float(required=False, description="重量", example=4.2),
        "unitPrice": fields.Float(required=False, description="單價", example=0.1),
        "amount": fields.Float(required=False, description="金額", example=0.1),
    }

    FQPackagingCost_obj = {
        "id": NullableInteger(required=False, description="FQPackagingCost table primary key", example=1),
        "FQProcessId": fields.Integer(required=True, description="對應的報價製程ID", example=1),
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

    FQInjectionMoldingCost_obj = {
        "id": NullableInteger(required=False, description="FQInjectionMoldingCost table primary key", example=1),
        "FQProcessId": fields.Integer(required=True, description="對應的報價製程ID", example=1),
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

    FQInPostProcessingCost_obj = {
        "id": NullableInteger(required=False, description="FQInPostProcessingCost table primary key", example=1),
        "FQProcessId": fields.Integer(required=True, description="對應的報價製程ID", example=1),
        "workSecond": fields.Float(required=False, description="工時(秒)", example=0.1),
        "unitPrice": fields.Float(required=False, description="單價", example=0.1),
        "amount": fields.Float(required=False, description="金額", example=0.1),
    }

    FQOutPostProcessingCost_obj = {
        "id": NullableInteger(required=False, description="FQOutPostProcessingCost table primary key", example=1),
        "FQProcessId": fields.Integer(required=True, description="對應的報價製程ID", example=1),
        "unitPrice": fields.Float(required=False, description="單價", example=0.1),
        "amount": fields.Float(required=False, description="金額", example=0.1),
    }

    FQFreight_obj = {
        "id": NullableInteger(required=False, description="FQFreight table primary key", example=1),
        "factoryQuotationId": fields.Integer(required=True, description="對應的報價ID", example=1),
        "deliveryDistance": fields.Float(required=False, description="送貨距離 (公里)", example=1),
        "driverWorkHours": fields.Float(required=False, description="司機工時", example=1),
        "fuelCostPerKM": fields.Float(required=False, description="油錢單價 (每公里)", example=1),
        "estimatedShipment": fields.Integer(required=False, description="預估出貨數量", example=1),
        "amount": fields.Float(required=False, description="金額", example=1),
    }

    FQCustomsDuty_obj = {
        "id": NullableInteger(required=False, description="FQCustomsDuty table primary key", example=1),
        "factoryQuotationId": fields.Integer(required=True, description="對應的報價ID", example=1),
        "feeType": fields.String(required=False, description="貨運/關稅", example="運費"),
        "freight": fields.Float(required=False, description="運費", example=0.1),
        "estimatedShipment": fields.Integer(required=False, description="預估出貨數量", example=1),
        "amount": fields.Float(required=False, description="金額", example=0.1),
    }

    FQProcess_obj = {
        "id": NullableInteger(required=False, description="ltmoldmap table primary key", example=1),
        "factoryQuotationId": fields.Integer(required=True, description="對應的報價ID", example=1),
        "processOptionId": fields.Integer(required=True, description="製程選項ID", example=1),
        "FQMaterialCostSetting": fields.Nested(api.model("FQMaterialCostSetting object", FQMaterialCostSetting_obj)),
        "FQMaterialCosts": fields.List(fields.Nested(api.model("FQMaterialCost object", FQMaterialCost_obj))),
        "FQPackagingCosts": fields.List(fields.Nested(api.model("FQPackagingCost object", FQPackagingCost_obj))),
        "FQInjectionMoldingCosts": fields.List(fields.Nested(api.model("FQInjectionMoldingCost object", FQInjectionMoldingCost_obj))),
        "FQInPostProcessingCosts": fields.List(fields.Nested(api.model("FQInPostProcessingCost object", FQInPostProcessingCost_obj))),
        "FQOutPostProcessingCosts": fields.List(fields.Nested(api.model("FQOutPostProcessingCost object", FQOutPostProcessingCost_obj))),
    }

    shippingCost_obj = {
        "FQFreights": fields.List(fields.Nested(api.model("FQFreight object", FQFreight_obj))),
        "FQCustomsDuties": fields.List(fields.Nested(api.model("FQCustomsDuty object", FQCustomsDuty_obj))),
    }

    base_obj = {
        "id": NullableInteger(required=False, description="factoryQuotation table primary key", example=1),
        "quotationSN": fields.String(required=False, description="報價單編號", example="S20241108001"),
        "createDate": NullableDateTime(required=False, description="報價單建立日期", example="2024-11-08T00:00:00.000+08:00"),
        "customerName": fields.String(required=False, description="客戶名稱", example="LT"),
        "productSN": fields.String(required=False, description="產品編號", example="KJ-91001-AM1-01"),
        "productName": fields.String(required=False, description="產品名稱", example="20-5803LCT(透明燈殼+硬化)"),
        "overheadRnd": fields.Float(required=False, description="管銷研百分比", example=0.1),
        "profit": fields.Float(required=False, description="利潤百分比", example=0.1),
        "risk": fields.Float(required=False, description="風險百分比", example=0.1),
        "annualDiscount": fields.Float(required=False, description="年降百分比", example=0.1),
        "rebate": fields.Float(required=False, description="回饋百分比", example=0.1),
        "actualQuotation": fields.Float(required=False, description="實際報價", example=0.1),
        # https://github.com/noirbizarre/flask-restplus/issues/292 nested fields not working, should add api.model() to fix
        "processes": fields.List(fields.Nested(api.model("FQProcess object", FQProcess_obj))),
        "shippingCosts": fields.Nested(api.model("FQFreight and FQCustomsDuty object", shippingCost_obj)),
    }
    
    #FactoryQuotation GET model
    get_obj = copy.deepcopy(base_obj)
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    FactoryQuotation_get = api.model("FactoryQuotation object", base_obj)

    #FactoryQuotation POST model
    FactoryQuotation_post_obj = copy.deepcopy(base_obj)
    pop_list = ["id", "quotationSN", "customerName", "productSN", "productName", "overheadRnd", "profit", "risk", "annualDiscount", "rebate", "actualQuotation", "processes", "shippingCosts"]
    required_list = []
    not_required_list = []
    for attr in [item for item in pop_list]:
        FactoryQuotation_post_obj.pop(attr)
    for key in FactoryQuotation_post_obj:
        FactoryQuotation_post_obj[key].description = f"POST {key}"
    for key in [item for item in required_list]:
        FactoryQuotation_post_obj[key].required = True
    for key in [item for item in not_required_list]:
        FactoryQuotation_post_obj[key].required = False
    FactoryQuotation_post = api.model("FactoryQuotation post", FactoryQuotation_post_obj)

    #FactoryQuotation PUT model
    FactoryQuotation_put_obj = copy.deepcopy(base_obj)
    pop_list = ["id", "productSN", "productName", "quotationSN", "createDate", "processes", "shippingCosts"]
    required_list = []
    not_required_list = []
    for attr in [item for item in pop_list]:
        FactoryQuotation_put_obj.pop(attr)
    for key in FactoryQuotation_put_obj:
        FactoryQuotation_put_obj[key].description = f"PUT {key}"
    for key in [item for item in required_list]:
        FactoryQuotation_put_obj[key].required = True
    for key in [item for item in not_required_list]:
        FactoryQuotation_put_obj[key].required = False
    FactoryQuotation_put = api.model("FactoryQuotation put", FactoryQuotation_put_obj)

    #FQProcess POST model
    FQProcess_post_obj = copy.deepcopy(FQProcess_obj)
    pop_list = ["id", "factoryQuotationId"]
    required_list = ["processOptionId"]
    not_required_list = []
    for attr in [item for item in pop_list]:
        FQProcess_post_obj.pop(attr)
    for key in FQProcess_post_obj:
        FQProcess_post_obj[key].description = f"POST {key}"
    for key in [item for item in required_list]:
        FQProcess_post_obj[key].required = True
    for key in [item for item in not_required_list]:
        FQProcess_post_obj[key].required = False
    # FQMaterialCostSetting_obj pop 
    post_FQMaterialCostSetting_obj = copy.deepcopy(FQMaterialCostSetting_obj)
    FQMaterialCostSetting_pop_list = ["id", "FQProcessId"]
    for attr in [item for item in FQMaterialCostSetting_pop_list]:
        post_FQMaterialCostSetting_obj.pop(attr)
    FQProcess_post_obj["FQMaterialCostSetting"] = fields.Nested(api.model("FQMaterialCostSetting_obj object", post_FQMaterialCostSetting_obj))
    # FQMaterialCost_obj
    post_FQMaterialCost_obj = copy.deepcopy(FQMaterialCost_obj)
    FQMaterialCost_pop_list = ["id", "FQProcessId"]
    for attr in [item for item in FQMaterialCost_pop_list]:
        post_FQMaterialCost_obj.pop(attr)
    FQProcess_post_obj["FQMaterialCosts"] = fields.List(fields.Nested(api.model("FQMaterialCost_obj object", post_FQMaterialCost_obj)))
    # FQPackagingCost_obj
    post_FQPackagingCost_obj = copy.deepcopy(FQPackagingCost_obj)
    FQPackagingCost_pop_list = ["id", "FQProcessId"]
    for attr in [item for item in FQPackagingCost_pop_list]:
        post_FQPackagingCost_obj.pop(attr)
    FQProcess_post_obj["FQPackagingCosts"] = fields.List(fields.Nested(api.model("FQPackagingCost_obj object", post_FQPackagingCost_obj)))
    # FQInjectionMoldingCost_obj
    post_FQInjectionMoldingCost_obj = copy.deepcopy(FQInjectionMoldingCost_obj)
    FQInjectionMoldingCost_pop_list = ["id", "FQProcessId"]
    for attr in [item for item in FQInjectionMoldingCost_pop_list]:
        post_FQInjectionMoldingCost_obj.pop(attr)
    FQProcess_post_obj["FQInjectionMoldingCosts"] = fields.List(fields.Nested(api.model("FQInjectionMoldingCost_obj object", post_FQInjectionMoldingCost_obj)))
    # FQInPostProcessingCost_obj
    post_FQInPostProcessingCost_obj = copy.deepcopy(FQInPostProcessingCost_obj)
    FQInPostProcessingCost_pop_list = ["id", "FQProcessId"]
    for attr in [item for item in FQInPostProcessingCost_pop_list]:
        post_FQInPostProcessingCost_obj.pop(attr)
    FQProcess_post_obj["FQInPostProcessingCosts"] = fields.List(fields.Nested(api.model("FQInPostProcessingCost_obj object", post_FQInPostProcessingCost_obj)))
    # FQOutPostProcessingCost_obj
    post_FQOutPostProcessingCost_obj = copy.deepcopy(FQOutPostProcessingCost_obj)
    FQOutPostProcessingCost_pop_list = ["id", "FQProcessId"]
    for attr in [item for item in FQOutPostProcessingCost_pop_list]:
        post_FQOutPostProcessingCost_obj.pop(attr)
    FQProcess_post_obj["FQOutPostProcessingCosts"] = fields.List(fields.Nested(api.model("FQOutPostProcessingCost_obj object", post_FQOutPostProcessingCost_obj)))
    FQProcess_post = api.model("FQProcess post", FQProcess_post_obj)
    
    #FQProcess PUT model
    FQProcess_put_obj = copy.deepcopy(FQProcess_obj)
    pop_list = ["factoryQuotationId"]
    required_list = []
    not_required_list = [] # default all not required
    for attr in [item for item in pop_list]:
        FQProcess_put_obj.pop(attr)
    for key in FQProcess_put_obj:
        FQProcess_put_obj[key].description = f"PUT {key}"
    for key in [item for item in required_list]:
        FQProcess_put_obj[key].required = True
    for key in [item for item in not_required_list]:
        FQProcess_put_obj[key].required = False
    # FQMaterialCostSetting_obj
    put_FQMaterialCostSetting_obj = copy.deepcopy(FQMaterialCostSetting_obj)
    FQMaterialCostSetting_pop_list = ["FQProcessId"]
    for attr in [item for item in FQMaterialCostSetting_pop_list]:
        put_FQMaterialCostSetting_obj.pop(attr)
    FQProcess_put_obj["FQMaterialCostSetting"] = fields.Nested(api.model("put_FQMaterialCostSetting_obj object", put_FQMaterialCostSetting_obj))
    # FQMaterialCost_obj
    put_FQMaterialCost_obj = copy.deepcopy(FQMaterialCost_obj)
    FQMaterialCost_pop_list = ["FQProcessId"]
    for attr in [item for item in FQMaterialCost_pop_list]:
        put_FQMaterialCost_obj.pop(attr)
    FQProcess_put_obj["FQMaterialCosts"] = fields.List(fields.Nested(api.model("put_FQMaterialCost_obj object", put_FQMaterialCost_obj)))
    # FQPackagingCost_obj
    put_FQPackagingCost_obj = copy.deepcopy(FQPackagingCost_obj)
    FQPackagingCost_pop_list = ["FQProcessId"]
    for attr in [item for item in FQPackagingCost_pop_list]:
        put_FQPackagingCost_obj.pop(attr)
    FQProcess_put_obj["FQPackagingCosts"] = fields.List(fields.Nested(api.model("put_FQPackagingCost_obj object", put_FQPackagingCost_obj)))
    # FQInjectionMoldingCost_obj
    put_FQInjectionMoldingCost_obj = copy.deepcopy(FQInjectionMoldingCost_obj)
    FQInjectionMoldingCost_pop_list = ["FQProcessId"]
    for attr in [item for item in FQInjectionMoldingCost_pop_list]:
        put_FQInjectionMoldingCost_obj.pop(attr)
    FQProcess_put_obj["FQInjectionMoldingCosts"] = fields.List(fields.Nested(api.model("put_FQInjectionMoldingCost_obj object", put_FQInjectionMoldingCost_obj)))
    # FQInPostProcessingCost_obj
    put_FQInPostProcessingCost_obj = copy.deepcopy(FQInPostProcessingCost_obj)
    FQInPostProcessingCost_pop_list = ["FQProcessId"]
    for attr in [item for item in FQInPostProcessingCost_pop_list]:
        put_FQInPostProcessingCost_obj.pop(attr)
    FQProcess_put_obj["FQInPostProcessingCosts"] = fields.List(fields.Nested(api.model("put_FQInPostProcessingCost_obj object", put_FQInPostProcessingCost_obj)))
    # FQOutPostProcessingCost_obj
    put_FQOutPostProcessingCost_obj = copy.deepcopy(FQOutPostProcessingCost_obj)
    FQOutPostProcessingCost_pop_list = ["FQProcessId"]
    for attr in [item for item in FQOutPostProcessingCost_pop_list]:
        put_FQOutPostProcessingCost_obj.pop(attr)
    FQProcess_put_obj["FQOutPostProcessingCosts"] = fields.List(fields.Nested(api.model("put_FQOutPostProcessingCost_obj object", put_FQOutPostProcessingCost_obj)))    
    FQProcess_put = api.model("FQProcess put", FQProcess_put_obj)
    
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
    # FQFreight_obj
    put_FQFreight_obj = copy.deepcopy(FQFreight_obj)
    FQFreight_pop_list = ["factoryQuotationId"]
    FQFreight_required_list = ["id"]
    for attr in [item for item in FQFreight_pop_list]:
        put_FQFreight_obj.pop(attr)
    for key in [item for item in FQFreight_required_list]:
        put_FQFreight_obj[key].required = True
    shippingCost_put_obj["FQFreights"] = fields.List(fields.Nested(api.model("put_FQFreight_obj object", put_FQFreight_obj)))
    # FQCustomsDuty_obj
    put_FQCustomsDuty_obj = copy.deepcopy(FQCustomsDuty_obj)
    FQCustomsDuty_pop_list = ["factoryQuotationId"]
    FQCustomsDuty_required_list = ["id"]
    for attr in [item for item in FQCustomsDuty_pop_list]:
        put_FQCustomsDuty_obj.pop(attr)
    for key in [item for item in FQCustomsDuty_required_list]:
        put_FQCustomsDuty_obj[key].required = True
    shippingCost_put_obj["FQCustomsDuties"] = fields.List(fields.Nested(api.model("put_FQCustomsDuty_obj object", put_FQCustomsDuty_obj)))
    shippingCost_put = api.model("Factory Quotation ShippingCost put", shippingCost_put_obj)

    #FactoryQuotation response model
    FactoryQuotation_resp = api.model(
        "FactoryQuotation response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(FactoryQuotation_get),
        }
    )
