# Validations with Marshmallow
from marshmallow import Schema, fields


class TodayWorkOrderSchema(Schema):
    machineSN = fields.String(required=False, description="機台編號")
    workOrderSN = fields.String(required=False, description="製令單號")
    planFinishDate = fields.DateTime(required=False, description="預計完工日")
    status = fields.String(required=False, description="製令單狀態")
    productionQuantity = fields.String(required=False, description="生產數量")
    productSN = fields.String(required=False, description="產品編號")
    productName = fields.String(required=False, description="產品名稱")
    processName = fields.String(required=False, description="製程名稱")

class OverdueWorkOrderSchema(Schema):
    machineSN = fields.String(required=False, description="機台編號")
    workOrderSN = fields.String(required=False, description="製令單號")
    planFinishDate = fields.DateTime(required=False, description="預計完工日")
    unfinishedQuantity = fields.String(required=False, description="未完成數量")
    productSN = fields.String(required=False, description="產品編號")


class MachineAccumulatedTimeSchema(Schema):
    machineSN = fields.String(required=False, description="機台編號")
    runTime = fields.String(required=False, description="生產時間(hh:mm:ss)")
    tuningTime = fields.String(required=False, description="調機時間(hh:mm:ss)")
    offlineTime = fields.String(required=False, description="停機時間(hh:mm:ss)")
    testingTime = fields.String(required=False, description="試模時間(hh:mm:ss)")
    idleTime = fields.String(required=False, description="待機時間(hh:mm:ss)")
    status = fields.String(required=False, description="機台狀態")


class MachineOfflineEventSchema(Schema):
    actualStartDate = fields.DateTime(required=False, description="停機實際開始時間")
    machineSN = fields.String(required=False, description="機台編號")
    reason = fields.String(required=False, description="停機原因")


class TodayWorkOrderWithProcess(Schema):
    workOrderDate = fields.String(required=False, description="製令交期")
    workOrderSN = fields.String(required=False, description="製令單號")
    workOrderQuantity = fields.Integer(required=False, description="製令數量")
    productName = fields.String(required=False, description="產品名稱")
    processOne = fields.String(required=False, description="一射")
    processTwo = fields.String(required=False, description="二射")
    planFinishDate = fields.String(required=False, description="預計完工日")
    status = fields.String(required=False, description="製令單狀態")


class MachineStatusHoursStatisticsSchema(Schema):
    machineSN = fields.String(required=False, description="機台編號")
    run = fields.Float(required=False, description="生產狀態時數")
    idle = fields.Float(required=False, description="待機狀態時數")
    tuning = fields.Float(required=False, description="上模與調機狀態時數")
    testing = fields.Float(required=False, description="產品試模狀態時數")
    offline = fields.Float(required=False, description="機台停機狀態時數")
