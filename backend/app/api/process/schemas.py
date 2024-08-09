# Validations with Marshmallow
from marshmallow import Schema, fields

class moldsSchema(Schema):
    id = fields.Integer(dump_only=True)
    moldno = fields.String(required=True)

class materialsSchema(Schema):
    id = fields.Integer(dump_only=True)
    materialCode = fields.String(required=True)
    materialType = fields.String(required=True)
    productSN = fields.String(required=True)
    materialSN = fields.String(required=True)
    materialName = fields.String(required=True)
    quantity = fields.Float(required=True)
    unit = fields.String(required=True)

class processSchema(Schema):
    id = fields.Integer(dump_only=True)
    productId = fields.Integer(required=True)
    processCategory = fields.String(required=True)
    processSN = fields.String(required=True)
    processName = fields.String(required=True)
    jigSN = fields.String(required=True)
    molds = fields.List(fields.Nested(moldsSchema))
    materials = fields.List(fields.Nested(materialsSchema))

    
