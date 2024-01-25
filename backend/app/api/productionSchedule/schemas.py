# Validations with Marshmallow
from marshmallow import Schema, fields


class productionScheduleSchema(Schema):
    id = fields.Integer(dump_only=True)
    productionSchedulerId = fields.Integer(dump_only=True)
    productionArea = fields.String(required=False)
    machineSN = fields.String(required=False)
    serialNumber = fields.String(required=False)
    workOrderSN = fields.String(required=True)
    productSN = fields.String(required=True)
    productName = fields.String(required=True)
    workOrderQuantity = fields.Integer(required=True)
    workOrderDate = fields.Date(required=True)
    moldingSecond = fields.Integer(required=False)
    planOnMachineDate = fields.Date(required=False)
    actualOnMachineDate = fields.Date(required=False)
    moldWorkDays = fields.Integer(required=False)
    workDays = fields.Integer(required=False)
    planFinishDate = fields.Date(required=False)
    actualFinishDate = fields.Date(required=False)
    comment = fields.String(required=False)
    dailyWorkingHours = fields.Integer(required=False)
    moldCavity = fields.Integer(required=False)
    week = fields.Integer(required=False)
    singleOrDoubleColor = fields.String(required=False)
    conversionRate = fields.Float(required=False)
    status = fields.String(required=False)
    
