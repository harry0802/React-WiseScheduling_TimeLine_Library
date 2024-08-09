# Validations with Marshmallow
from marshmallow import Schema, fields


class productSchema(Schema):
    id = fields.Integer(dump_only=True)
    productSN = fields.String(required=True)
    productName = fields.String(required=True)
    oldProductSN = fields.String(required=True)
    
