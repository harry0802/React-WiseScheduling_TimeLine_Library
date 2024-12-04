# Validations with Marshmallow
from marshmallow import Schema, fields


class materialSchema(Schema):
    id = fields.Integer(dump_only=True)
    materialOptionId = fields.Integer()
    materialCode = fields.String(required=True)
    materialType = fields.String(required=True)
    productSN = fields.String(required=True)
    materialSN = fields.String(required=True)
    materialName = fields.String(required=True)
    quantity = fields.Float(required=True)
    unit = fields.String(required=True)
    
