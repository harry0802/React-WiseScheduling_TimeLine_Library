# Validations with Marshmallow
from marshmallow import Schema, fields


class qualityInspectionSchema(Schema):
    id = fields.Integer(dump_only=True)
    productionScheduleId = fields.Integer(dump_only=True)
    workOrderSN = fields.String(required=True)
    processName = fields.String(dump_only=True)
    machineSN = fields.String(required=False)
    productName = fields.String(dump_only=True)
    inspectionQuantity = fields.Integer(required=True)
    goodQuantity = fields.Integer(required=True)
    inspector = fields.String(required=True)
    inspectionDate = fields.DateTime(required=True)
    inspectionType = fields.String(required=True)
    inspectionCount = fields.Integer(required=True)
    result = fields.String(required=True)
