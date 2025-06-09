from app.service.customField import *
from flask_restx import Namespace, fields
from app.api.option.optionEnum import MachineStatusEnum
import copy

class SmartScheduleDto:
    api = Namespace("smartSchedule", description="smartSchedule related operations.")
    

    # GET model
    get_obj = {
        "id": NullableInteger(required=False, description="primary key", example=1),
        "machineId": NullableInteger(required=False, description="機台ID", example=1),
        "planStartDate": NullableDateTime(required=False, description="預計開始日期", example="2025-02-25T00:00:00.000+08:00"),
        "planEndDate": NullableDateTime(required=False, description="預計結束日期", example="2025-02-25T00:00:00.000+08:00"),
        "actualStartDate": NullableDateTime(required=False, description="實際開始日期", example="2025-02-25T00:00:00.000+08:00"),
        "actualEndDate": NullableDateTime(required=False, description="實際結束日期", example="2025-02-25T00:00:00.000+08:00"),
        "status": NullableString(required=False, description="機台狀態", example="status", enum=[e.value for e in MachineStatusEnum]),
        "reason": NullableString(required=False, description="停機原因", example="停機原因"),
        "product": NullableString(required=False, description="試模產品", example="產品名稱")
    }
    for key in get_obj:
        get_obj[key].description = f"GET {key}"
    smartSchedule_object = api.model(
        "smartSchedule object", get_obj
    )
    
    # PUT model for changeWorkOrder
    put_obj_workorder = {
        "productionScheduleId": NullableInteger(required=False, description="productionSchedule ID，調整製令單的時間要傳這個參數", example=1),
        "newStartDate": NullableDateTime(required=True, description="修改後的開始日期", example="2025-03-25T00:00:00.000+08:00"),
        "machineSN": NullableString(required=True, description="機台編號", example="A1")
    }
    for key in put_obj_workorder:
        put_obj_workorder[key].description = f"PUT {key}"
    smartSchedule_workorder_put = api.model("smartSchedule workorder put", put_obj_workorder)


    # PUT model for changeWorkOrder
    put_obj_workorder_by_endtime = {
        "productionScheduleId": NullableInteger(required=False, description="productionSchedule ID，調整製令單的時間要傳這個參數", example=1),
        "newEndDate": NullableDateTime(required=True, description="修改後的結束日期", example="2025-03-25T00:00:00.000+08:00"),
    }
    for key in put_obj_workorder_by_endtime:
        put_obj_workorder_by_endtime[key].description = f"PUT {key}"
    smartSchedule_workorder_by_endtime_put = api.model("smartSchedule workorder by endtime put", put_obj_workorder_by_endtime)


    # PUT model for changeMachineStatus
    put_obj_machineStatus = {
        "machineStatusId": NullableInteger(required=False, description="machineStatus ID，調整機台狀態的時間要傳這個參數", example=1),
        "newStartDate": NullableDateTime(required=True, description="修改後的開始日期", example="2025-03-25T00:00:00.000+08:00"),
        "newEndDate": NullableDateTime(required=True, description="修改後的結束日期", example="2025-03-25T00:00:00.000+08:00"),
    }
    for key in put_obj_machineStatus:
        put_obj_machineStatus[key].description = f"PUT {key}"
    smartSchedule_machineStatus_put = api.model("smartSchedule machineStatus put", put_obj_machineStatus)
    

    # PUT model for changeMachineStatus when create
    put_obj_machineStatus_create = {
        "machineId": NullableInteger(required=False, description="machineStatus ID，調整機台狀態的時間要傳這個參數", example=1),
        "planStartDate": NullableDateTime(required=True, description="修改後的開始日期", example="2025-03-25T00:00:00.000+08:00"),
        "planEndDate": NullableDateTime(required=True, description="修改後的結束日期", example="2025-03-25T00:00:00.000+08:00"),
    }
    for key in put_obj_machineStatus_create:
        put_obj_machineStatus_create[key].description = f"PUT {key}"
    smartSchedule_machineStatus_create_put = api.model("smartSchedule machineStatus create put", put_obj_machineStatus_create)


    # PUT model for changeMachineStatus when delete
    put_obj_machineStatus_delete = {
        "machineStatusId": NullableInteger(required=False, description="machineStatus ID，調整機台狀態的時間要傳這個參數", example=1),
    }
    for key in put_obj_machineStatus_delete:
        put_obj_machineStatus_delete[key].description = f"PUT {key}"
    smartSchedule_machineStatus_delete_put = api.model("smartSchedule machineStatus delete put", put_obj_machineStatus_delete)
    



    # response model
    smartSchedule_resp = api.model(
        "smartSchedule response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(smartSchedule_object),
        }
    )
