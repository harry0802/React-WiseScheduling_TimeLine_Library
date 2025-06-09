from app.service.customField import *
from flask_restx import Namespace, fields
from marshmallow.validate import Length, Range
from app.utils_log import validation_error
from app.api.option.optionEnum import WorkOrderStatusEnum, MachineStatusEnum
import logging
import copy

class DashboardDto:
    api = Namespace("dashboard", description="dashboard related operations.")

    # 本日生產任務(todayWorkOrder)
    todayWorkOrder_object = api.model(
        "todayWorkOrder object",
        {
            "machineSN": NullableString(required=False, description="機台編號", example="A1"),
            "workOrderSN": NullableString(required=False, description="製令單號", example="2025010100001"),
            "planFinishDate": NullableDateTime(required=False, description="預計完工日", example="2025-05-01T00:00:00.000+08:00"),
            "productionQuantity": NullableString(required=False, description="生產數量", example="1000"),
            "productSN": NullableString(required=False, description="產品編號", example="PROD-00001-01"),
            "productName": NullableString(required=False, description="產品名稱", example="PROD_NAME-01"),
            "processName": NullableString(required=False, description="製程名稱", example="廠內成型-IJ01"),
        }
    )
    todayWorkOrder_resp = api.model(
        "todayWorkOrder response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(todayWorkOrder_object),
        }
    )

    # 生產逾期任務(overdueWorkOrder)
    overdueWorkOrder_object = api.model(
        "overdueWorkOrder object",
        {
            "machineSN": NullableString(required=False, description="機台編號", example="A1"),
            "workOrderSN": NullableString(required=False, description="製令單號", example="2025010100001"),
            "planFinishDate": NullableDateTime(required=False, description="預計完工日", example="2025-05-01T00:00:00.000+08:00"),
            "unfinishedQuantity": NullableString(required=False, description="未完成數量", example="1000"),
            "productSN": NullableString(required=False, description="產品編號", example="PROD-00001-01"),
        }
    )
    overdueWorkOrder_resp = api.model(
        "overdueWorkOrder response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(overdueWorkOrder_object),
        }
    )

    # 設備即時狀態(machineAccumulatedTime)
    machineAccumulatedTime_object = api.model(
        "machineAccumulatedTime object",
        {
            "machineSN": NullableString(required=False, description="機台編號", example="A1"),
            "runTime": NullableString(required=False, description="生產時間(hh:mm:ss)", example="01:00:00"),
            "tuningTime": NullableString(required=False, description="調機時間(hh:mm:ss)", example="01:00:00"),
            "offlineTime": NullableString(required=False, description="停機時間(hh:mm:ss)", example="01:00:00"),
            "testingTime": NullableString(required=False, description="試模時間(hh:mm:ss)", example="01:00:00"),
            "idleTime": NullableString(required=False, description="待機時間(hh:mm:ss)", example="01:00:00"),
            "status": NullableString(required=False, description="機台狀態", example="status", enum=[e.value for e in MachineStatusEnum]),
        }
    )
    machineAccumulatedTime_resp = api.model(
        "machineAccumulatedTime response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(machineAccumulatedTime_object),
        }
    )

    # 機台各狀態時間佔比(machineStatusProportion)
    machineStatusProportion_object = api.model(
        "machineStatusProportion object",
        {
            "status": NullableString(required=False, description="機台狀態", example="status", enum=[e.value for e in MachineStatusEnum]),
            "percentage": NullableFloat(required=False, description="時間佔比百分比", example="0.1"),
            "hours": NullableInteger(required=False, description="總計時數", example="1"),
        }
    )
    machineStatusProportion_resp = api.model(
        "machineStatusProportion response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(machineStatusProportion_object),
        }
    )

    # 設備異常事件(machineOfflineEvent)
    machineOfflineEvent_object = api.model(
        "machineOfflineEvent object",
        {
            "actualStartDate": NullableDateTime(required=False, description="停機實際開始時間", example="2025-05-01T00:00:00.000+08:00"),
            "machineSN": NullableFloat(required=False, description="機台編號", example="A1"),
            "reason": NullableString(required=False, description="停機原因", example="停機原因"),
        }
    )
    machineOfflineEvent_resp = api.model(
        "machineOfflineEvent response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(machineOfflineEvent_object),
        }
    )

    # 當下機台狀態的台數(currentMachineStatusCount)
    currentMachineStatusCount_object = api.model(
        "currentMachineStatusCount object",
        {
            "status": NullableString(required=False, description="機台狀態", example="status", enum=[e.value for e in MachineStatusEnum]),
            "count": NullableInteger(required=False, description="台數", example="1"),
        }
    )
    currentMachineStatusCount_resp = api.model(
        "currentMachineStatusCount response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(currentMachineStatusCount_object),
        }
    )

    # 生產進度追蹤即時戰情-本日生產任務(todayWorkOrderWithProcess)
    todayWorkOrderWithProcess_object = api.model(
        "todayWorkOrderWithProcess object",
        {
            "workOrderDate": NullableDateTime(required=False, description="製令交期", example="2025-05-01T00:00:00.000+08:00"),
            "workOrderSN": NullableString(required=False, description="製令單號", example="2025010100001"),
            "workOrderQuantity": NullableInteger(required=False, description="製令數量", example=100),
            "productName": NullableString(required=False, description="產品名稱", example="PROD_NAME-01"),
            "processOne": NullableString(required=False, description="一射", example="廠內成型-IJ01"),
            "processTwo": NullableString(required=False, description="二射", example="廠內-成型-IJ02"),
            "planFinishDate": NullableDateTime(required=False, description="預計完工日", example="2025-05-01T00:00:00.000+08:00"),
            "status": NullableString(required=False, description="製令單狀態", example="status", enum=[e.value for e in WorkOrderStatusEnum]),
        }
    )
    todayWorkOrderWithProcess_resp = api.model(
        "todayWorkOrderWithProcess response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(todayWorkOrderWithProcess_object),
        }
    )

    # 停機因素占比分析(machineOfflineReasonProportion)
    machineOfflineReasonProportion_object = api.model(
        "machineOfflineReasonProportion object",
        {
            "reason": NullableString(required=False, description="停機原因", example="異常停機"),
            "hours": NullableFloat(required=False, description="總計時數", example="1.0"),
        }
    )
    machineOfflineReasonProportion_resp = api.model(
        "machineOfflineReasonProportion response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(machineOfflineReasonProportion_object),
        }
    )

    # 當日機台各狀態時數統計(machineStatusHoursStatistics)
    machineStatusHoursStatistics_object = api.model(
        "machineStatusHoursStatistics object",
        {
            "machineSN": NullableString(required=False, description="機台編號", example="A1"),
            "run": NullableFloat(required=False, description="生產狀態時數", example=1.0),
            "idle": NullableFloat(required=False, description="待機狀態時數", example=1.0),
            "tuning": NullableFloat(required=False, description="上模與調機狀態時數", example=1.0),
            "testing": NullableFloat(required=False, description="產品試模狀態時數", example=1.0),
            "offline": NullableFloat(required=False, description="機台停機狀態時數", example=1.0),
        }
    )
    machineStatusHoursStatistics_resp = api.model(
        "machineStatusHoursStatistics response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(machineStatusHoursStatistics_object),
        }
    )

    # 設備稼動分析(machineUtilizationStatistics)
    machineUtilizationStatistics_object = api.model(
        "machineUtilizationStatistics object",
        {
            "utilizationTime": NullableString(required=False, description="稼動時間(時)", example="1"),
            "utilizationRate": NullableFloat(required=False, description="稼動率", example=1.0),
            "runCount": NullableFloat(required=False, description="生產機台數", example=1),
            "offlineCount": NullableFloat(required=False, description="停機次數", example=1),
        }
    )
    machineUtilizationStatistics_resp = api.model(
        "machineUtilizationStatistics response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(machineUtilizationStatistics_object),
        }
    )
