from app.service.customField import *
from flask_restx import Namespace, fields
import copy

class MaintenanceDto:
    api = Namespace("maintenance", description="maintenance related operations.")
    # 用於response的model
    base_obj = {
        "id": NullableInteger(required=False, description="primary key", example=1),
        "machineId": NullableInteger(required=False, description="機台ID", example=1),
        "moldSN": NullableString(required=False, description="模具編號", example="moldSN"),
        "year": NullableInteger(required=False, description="年份", example=2025),
        "week": NullableInteger(required=False, description="週次", example=1),
        "maintenanceItem": NullableString(required=False, description="保養檢查項目", example="boxClean", 
                                          enum=["boxClean", "hotWire", "wireCheck", "oilPipe", "fullClean", "safetyEquipment", 
                                                "moldClean", "moldOil", "cavityCheck", "screwCheck", "partsCheck", "wireCheck"]),
        "inspectionResult": NullableString(required=False, description="檢查結果", example="OK", enum=["OK", "NG"]),
        "inspector": NullableString(required=False, description="檢查者", example="inspector"),
        "inspectionDate": NullableDateTime(required=False, description="檢查日期", example="2024-12-31T00:00:00.000+08:00"),
        "reinspectionResult": NullableString(required=False, description="複查結果", example="OK", enum=["OK", "NG"]),
        "reinspector": NullableString(required=False, description="複查者", example="reinspector"),
        "reinspectionDate": NullableDateTime(required=False, description="複查日期", example="2024-12-31T00:00:00.000+08:00"),
        "approveResult": NullableString(required=False, description="承認結果", example="OK", enum=["OK", "NG"]),
        "approver": NullableString(required=False, description="承認者", example="approver"),
        "approvalDate": NullableDateTime(required=False, description="承認日期", example="2024-12-31T00:00:00.000+08:00"),
    }

    # machine maintenance input model for POST and PUT
    machine_input_obj = {
        "machineId": NullableInteger(required=False, description="機台ID", example=1),
        "year": NullableInteger(required=False, description="年份", example=2025),
        "week": NullableInteger(required=False, description="週次", example=1),
        "boxClean": NullableString(required=False, description="電控箱內清潔", example="OK", enum=["OK", "NG"]),
        "hotWire": NullableString(required=False, description="電熱線路", example="OK", enum=["OK", "NG"]),
        "wireCheck": NullableString(required=False, description="線路完整度", example="OK", enum=["OK", "NG"]),
        "oilPipe": NullableString(required=False, description="曲肘打油管", example="OK", enum=["OK", "NG"]),
        "fullClean": NullableString(required=False, description="全機清潔保養", example="OK", enum=["OK", "NG"]),
        "safetyEquipment": NullableString(required=False, description="安全門及相關安全設備", example="OK", enum=["OK", "NG"]),
        "inspector": NullableString(required=False, description="檢查者", example="inspector"),
        "inspectionDate": NullableDateTime(required=False, description="檢查日期", example="2024-12-31T00:00:00.000+08:00"),
        "reinspector": NullableString(required=False, description="複查者", example="reinspector"),
        "reinspectionDate": NullableDateTime(required=False, description="複查日期", example="2024-12-31T00:00:00.000+08:00"),
        "approver": NullableString(required=False, description="承認者", example="approver"),
        "approvalDate": NullableDateTime(required=False, description="承認日期", example="2024-12-31T00:00:00.000+08:00"),
    }
    
    # mold maintenance input model for POST and PUT
    mold_input_obj = {
        "moldSN": NullableString(required=False, description="模具編號", example="moldSN"),
        "year": NullableInteger(required=False, description="年份", example=2025),
        "week": NullableInteger(required=False, description="週次", example=1),
        "moldClean": NullableString(required=False, description="模具清潔", example="OK", enum=["OK", "NG"]),
        "moldOil": NullableString(required=False, description="模具上油", example="OK", enum=["OK", "NG"]),
        "cavityCheck": NullableString(required=False, description="模穴外觀面檢查", example="OK", enum=["OK", "NG"]),
        "screwCheck": NullableString(required=False, description="鎖付螺絲是否鬆動", example="OK", enum=["OK", "NG"]),
        "partsCheck": NullableString(required=False, description="易損件是否老化需更換", example="OK", enum=["OK", "NG"]),
        "wireCheck": NullableString(required=False, description="線路檢查是否有壓傷、斷裂或雜亂", example="OK", enum=["OK", "NG"]),
        "inspector": NullableString(required=False, description="檢查者", example="inspector"),
        "inspectionDate": NullableDateTime(required=False, description="檢查日期", example="2024-12-31T00:00:00.000+08:00"),
        "reinspector": NullableString(required=False, description="複查者", example="reinspector"),
        "reinspectionDate": NullableDateTime(required=False, description="複查日期", example="2024-12-31T00:00:00.000+08:00"),
        "approver": NullableString(required=False, description="承認者", example="approver"),
        "approvalDate": NullableDateTime(required=False, description="承認日期", example="2024-12-31T00:00:00.000+08:00"),
    }
    
    # machine GET model
    machine_get_obj = copy.deepcopy(base_obj)
    machine_get_obj.pop("moldSN")
    for key in machine_get_obj:
        machine_get_obj[key].description = f"GET {key}"
    machine_object = api.model(
        "machine object", machine_get_obj
    )

    # machine POST model
    machine_post_obj = copy.deepcopy(machine_input_obj)
    pop_list = []
    required_list = ["machineId", "year", "week"]
    not_required_list = []
    for attr in [item for item in pop_list]:
        machine_post_obj.pop(attr)
    for key in machine_post_obj:
        machine_post_obj[key].description = f"POST {key}"
    for key in [item for item in required_list]:
        machine_post_obj[key].required = True
    for key in [item for item in not_required_list]:
        machine_post_obj[key].required = False
    machine_post = api.model("machine post", machine_post_obj)
    
    # machine PUT model
    machine_put_obj = copy.deepcopy(machine_input_obj)
    pop_list = []
    required_list = ["machineId", "year", "week"]
    not_required_list = [] # default all not required
    for attr in [item for item in pop_list]:
        machine_put_obj.pop(attr)
    for key in machine_put_obj:
        machine_put_obj[key].description = f"PUT {key}"
    for key in [item for item in required_list]:
        machine_put_obj[key].required = True
    for key in [item for item in not_required_list]:
        machine_put_obj[key].required = False
    machine_put = api.model("machine put", machine_put_obj)
    
    # machine response model
    machine_resp = api.model(
        "machine maintenance response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(machine_object),
        }
    )

    
    # mold GET model
    mold_get_obj = copy.deepcopy(base_obj)
    mold_get_obj.pop("machineId")
    for key in mold_get_obj:
        mold_get_obj[key].description = f"GET {key}"
    mold_object = api.model(
        "mold object", mold_get_obj
    )

    # mold POST model
    mold_post_obj = copy.deepcopy(mold_input_obj)
    pop_list = []
    required_list = ["moldSN", "year", "week"]
    not_required_list = []
    for attr in [item for item in pop_list]:
        mold_post_obj.pop(attr)
    for key in mold_post_obj:
        mold_post_obj[key].description = f"POST {key}"
    for key in [item for item in required_list]:
        mold_post_obj[key].required = True
    for key in [item for item in not_required_list]:
        mold_post_obj[key].required = False
    mold_post = api.model("mold post", mold_post_obj)
    
    # mold PUT model
    mold_put_obj = copy.deepcopy(mold_input_obj)
    pop_list = []
    required_list = ["moldSN", "year", "week"]
    not_required_list = [] # default all not required
    for attr in [item for item in pop_list]:
        mold_put_obj.pop(attr)
    for key in mold_put_obj:
        mold_put_obj[key].description = f"PUT {key}"
    for key in [item for item in required_list]:
        mold_put_obj[key].required = True
    for key in [item for item in not_required_list]:
        mold_put_obj[key].required = False
    mold_put = api.model("mold put", mold_put_obj)
    
    # mold response model
    mold_resp = api.model(
        "mold maintenance response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(mold_object),
        }
    )
