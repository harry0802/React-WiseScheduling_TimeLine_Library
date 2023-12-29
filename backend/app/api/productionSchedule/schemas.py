# Validations with Marshmallow
from marshmallow import Schema, fields


class productionScheduleSchema(Schema):
    id = fields.Integer(dump_only=True)
    productionSchedulerId = fields.Integer(dump_only=True)
    productionArea = fields.String(required=True)
    machineSN = fields.String(required=True)
    serialNumber = fields.String(required=True)
    workOrderSN = fields.String(required=True)
    productSN = fields.String(required=True)
    productName = fields.String(required=True)
    workOrderQuantity = fields.Integer(required=True)
    workOrderDate = fields.Date(required=True)
    moldingSecond = fields.Integer(required=True)
    planOnMachineDate = fields.Date(required=True)
    actualOnMachineDate = fields.Date(required=False)
    moldWorkDays = fields.Integer(required=True)
    workDays = fields.Integer(required=True)
    planFinishDate = fields.Date(required=True)
    actualFinishDate = fields.Date(required=False)
    comment = fields.String(required=False)
    dailyWorkingHours = fields.Integer(required=True)
    moldCavity = fields.Integer(required=True)
    week = fields.Integer(required=False)
    singleOrDoubleColor = fields.String(required=True)
    conversionRate = fields.Float(required=True)
    status = fields.String(required=True)
    
