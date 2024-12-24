# Validations with Marshmallow
from marshmallow import Schema, fields


class MaintenanceSchema(Schema):
    id = fields.Integer(dump_only=True)
    machineId = fields.Integer()
    moldSN = fields.String()
    week = fields.Integer(required=True)
    maintenanceItem = fields.String(required=True)
    inspectionResult = fields.String(required=True)
    inspector = fields.String(required=True)
    inspectionDate = fields.DateTime(required=True)
    reinspectionResult = fields.String(required=True)
    reinspector = fields.String(required=True)
    reinspectionDate = fields.DateTime(required=True)
    approveResult = fields.String(required=True)
    approver = fields.String(required=True)
    approvalDate = fields.DateTime(required=True)
    
