# Validations with Marshmallow
from marshmallow import Schema, fields


class MachineSchema(Schema):
    id = fields.Integer(dump_only=True)
    productionArea = fields.String(required=False)
    machineSN = fields.String(required=False)
    singleOrDoubleColor = fields.String(required=False)
    tonnage = fields.String(required=False)
    moldTrialCost = fields.Integer(required=False)
    electricityCostPerSec = fields.Float(required=False)


    
