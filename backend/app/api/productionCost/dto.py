from app.service.customField import *
from flask_restx import Namespace, fields
import copy

class ProductionCostDto:
    api = Namespace("productionCost", description="productionCost related operations.")
    
    base_obj = {
        "productionScheduleId": fields.Integer(required=False, description="生產排程ID", example=1),
        "machineSN": fields.String(required=False, description="機台編號", example="machineSN"),
        "workOrderSN": fields.String(required=False, description="製令單編號", example="workOrderSN"),
        "workOrderQuantity": fields.Integer(required=False, description="製令數量", example=10),
        "planOnMachineDate": fields.DateTime(required=False, description="計劃上機日期", example="2024-12-01T00:00:00.000+08:00"),
        "planFinishDate": fields.DateTime(required=False, description="計劃完成日期", example="2024-12-01T00:00:00.000+08:00"),
        "actualOnMachineDate": fields.DateTime(required=False, description="實際上機日期", example="2024-12-01T00:00:00.000+08:00"),
        "status": fields.String(required=False, description="狀態", example="status"),
        "productionReportId": fields.Integer(required=False, description="派工生產ID", example=1),
        "serialNumber": fields.Integer(required=False, description="流水號", example=1),
        "lotName": fields.String(required=False, description="批號", example="lotName"),
        "material": fields.String(required=False, description="材質", example="material"),
        "productionQuantity": fields.Integer(required=False, description="生產數量", example=10),
        "defectiveQuantity": fields.Integer(required=False, description="不良數", example=1),
        "productionDefectiveRate": fields.Float(required=False, description="生產不良率", example=0.1),
        "unfinishedQuantity": fields.Integer(required=False, description="未完成數量", example=1),
        "colorDifference": fields.Integer(required=False, description="色差", example=1),
        "deformation": fields.Integer(required=False, description="變形", example=1),
        "shrinkage": fields.Integer(required=False, description="縮水", example=1),
        "shortage": fields.Integer(required=False, description="短料", example=1),
        "hole": fields.Integer(required=False, description="孔洞", example=1),
        "bubble": fields.Integer(required=False, description="氣泡", example=1),
        "impurity": fields.Integer(required=False, description="雜質", example=1),
        "pressure": fields.Integer(required=False, description="壓痕", example=1),
        "overflow": fields.Integer(required=False, description="溢料", example=1),
        "flowMark": fields.Integer(required=False, description="流痕", example=1),
        "oilStain": fields.Integer(required=False, description="油污", example=1),
        "burr": fields.Integer(required=False, description="毛邊", example=1),
        "blackSpot": fields.Integer(required=False, description="黑點", example=1),
        "scratch": fields.Integer(required=False, description="刮傷", example=1),
        "encapsulation": fields.Integer(required=False, description="封裝", example=1),
        "other": fields.Integer(required=False, description="其他", example=1),
        "moldCavity": fields.Integer(required=False, description="穴數", example=1),
        "moldingSecond": fields.Integer(required=False, description="成型秒數", example=1),
        "moldModulePerHour": fields.Integer(required=False, description="模數/1H", example=1),
        "workingHours": fields.Float(required=False, description="工時", example=1.0),
        "planProductionQuantity": fields.Integer(required=False, description="預計生產數量", example=1),
        "productionQuantityDifference": fields.Integer(required=False, description="生產數差異值", example=1),
        "productionYield": fields.Float(required=False, description="生產良率", example=1.0),
        "machineMode": fields.String(required=False, description="機台模式", example="machineMode"),
        "machineProductionModule": fields.Integer(required=False, description="機台生產模數", example=1),
        "machineProductionQuantity": fields.Integer(required=False, description="機台生產數量", example=1),
        "machineDefectiveRate": fields.Float(required=False, description="實際不良率", example=1.0),
        "utilizationRate": fields.Float(required=False, description="稼動率", example=1.0),
        "productionEfficiency": fields.Float(required=False, description="產能效率", example=1.0),
        "OEE": fields.Float(required=False, description="OEE", example=1.0),
        "leader": fields.String(required=False, description="小班長", example="leader"),
        "operator1": fields.String(required=False, description="作業人員1", example="operator1"),
        "operator2": fields.String(required=False, description="作業人員2", example="operator2"),
        "startTime": fields.DateTime(required=False, description="開始時間", example="2024-12-01T00:00:00.000+08:00"),
        "endTime": fields.DateTime(required=False, description="結束時間", example="2024-12-01T00:00:00.000+08:00"),
        "productSN": fields.String(required=False, description="產品編號", example="productSN"),
        "productName": fields.String(required=False, description="產品名稱", example="productName"),
        "processOptionId": fields.Integer(required=False, description="製程選項ID", example=1),
        "processName": fields.String(required=False, description="製程名稱", example="processName"),
        "processId": fields.Integer(required=False, description="製程ID", example=1),
        "moldNos": fields.String(required=False, description="模具編號", example="moldNos"),
        "id": fields.Integer(required=False, description="productionCost ID", example=1),
        "productionReportId" : fields.Integer(required=False, description="生產報告ID", example=1),
        "unitProductRevenue" : fields.Float(required=False, description="單位產品收益", example=1.0),
        "fixedUnitProductCost" : fields.Float(required=False, description="固定單位產品成本", example=1.0),
        "variableUnitProductDefectRate" : fields.Float(required=False, description="變動單位產品不良率", example=1.0),
        "variableUnitProductCost" : fields.Float(required=False, description="變動單位產品成本", example=1.0),
        "totalUnitProductCost" : fields.Float(required=False, description="單位產品總成本", example=1.0),
        "totalRevenue" : fields.Float(required=False, description="總收益", example=1.0),
        "targetTotalCost" : fields.Float(required=False, description="目標總成本", example=1.0),
        "targetOperatingProfit" : fields.Float(required=False, description="目標營業利益", example=1.0),
        "targetOperatingProfitMargin" : fields.Float(required=False, description="目標營業利益率", example=1.0),
        "maximumDefectQuantity" : fields.Float(required=False, description="生產不良極限數量", example=1.0),
        "breakevenTotalQuantity" : fields.Float(required=False, description="損益平衡總數量", example=1.0),
        "breakevenDefectRate" : fields.Float(required=False, description="損益平衡不良率", example=1.0),
        "riskControlAlertDefectRate" : fields.Float(required=False, description="風控警示不良率", example=1.0),
        "actualDefectRate" : fields.Float(required=False, description="實際不良率", example=1.0),
        "yieldRateDifferenceAnalysis" : fields.Float(required=False, description="良率差異分析", example=1.0),
        "totalProductionQuantity" : fields.Float(required=False, description="總生產數量", example=1.0),
        "totalProductionCost" : fields.Float(required=False, description="總生產成本", example=1.0),
        "operatingProfit" : fields.Float(required=False, description="營業利益", example=1.0),
        "operatingProfitMargin" : fields.Float(required=False, description="營業利益率", example=1.0),
        "operatingProfitDifferenceAnalysis" : fields.Float(required=False, description="營業利益差異分析", example=1.0),
        "operatingProfitVariationRate" : fields.Float(required=False, description="營業利益變異率", example=1.0),
        "type" : fields.String(required=False, description="紀錄的類型(real-time/final)", example="real-time"),
        "logTime" : fields.DateTime(required=False, description="寫入資料的時間", example="2024-12-01T00:00:00.000+08:00"),
    }
    #GET model
    get_obj = copy.deepcopy(base_obj)
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    productionCost_object = api.model(
        "productionCost object", base_obj
    )
    productionCost_meta = api.model(
        "productionCost meta",
        {
            "page": NullableInteger(required=False, description="page number", example=1),
            "size": NullableInteger(required=False, description="size of the page", example=10),
            "sort": NullableString(required=False, description="sort by a column", example="id"),
            "total_pages": NullableInteger(required=False, description="total pages", example=1),
            "total_count": NullableInteger(required=False, description="total count", example=10),
        }
    )
    productionCost_paging = api.model(
        "productionCost paging",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.List(fields.Nested(productionCost_object)),
            "meta": fields.Nested(productionCost_meta)
        }
    )
    productionCost_resp = api.model(
        "productionCost response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(productionCost_object),
        }
    )
