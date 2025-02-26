# Validations with Marshmallow
from marshmallow import Schema, fields


class MachineStatusSchema(Schema):
    id = fields.Integer(dump_only=True)
    machineId = fields.Integer(required=False)
    productionArea = fields.String(required=False)
    machineSN = fields.String(required=False)
    planStartDate = fields.DateTime(required=False)
    planEndDate = fields.DateTime(required=False)
    actualStartDate = fields.DateTime(required=False)
    actualEndDate = fields.DateTime(required=False)
    status = fields.String(required=False)
    reason = fields.String(required=False)
    product = fields.String(required=False)


    
