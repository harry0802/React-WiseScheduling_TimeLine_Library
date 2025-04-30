# Validations with Marshmallow
from marshmallow import Schema, fields


class SmartScheduleSchema(Schema):
    timeLineStatus = fields.String(description='時間軸狀態')
    machineStatusId = fields.Integer(description='機台狀態ID')
    productionArea = fields.String(description='機台區域')
    machineSN = fields.String(description='機台編號')
    machineStatusPlanStartTime = fields.DateTime(description='機台狀態預計開始時間')
    machineStatusPlanEndTime = fields.DateTime(description='機台狀態預計結束時間')
    machineStatusActualStartTime = fields.DateTime(description='機台狀態實際開始時間')
    machineStatusActualEndTime = fields.DateTime(description='機台狀態實際結束時間')
    machineStatusReason = fields.String(description='機台狀態原因')
    machineStatusProduct = fields.String(description='機台狀態-試調的產品')
    productionScheduleId = fields.String(description='計畫排程表ID')
    planOnMachineDate = fields.DateTime(description='製令單預計上機日')
    planFinishDate = fields.DateTime(description='製令單預計完成日')
    actualOnMachineDate = fields.DateTime(description='製令單實際上機日')
    actualFinishDate = fields.DateTime(description='製令單實際完成日')
    postponeTime = fields.String(description='製令單延後時間')
    productSN = fields.String(description='產品編號')
    productName = fields.String(description='產品名稱')
    workOrderQuantity = fields.String(description='製令單數量')
    productionQuantity = fields.String(description='生產數量')
    processName = fields.String(description='製程名稱')
    productionScheduleStatus = fields.String(description='製令單狀態')


    
