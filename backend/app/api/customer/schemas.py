# Validations with Marshmallow
from marshmallow import Schema, fields


class CustomerSchema(Schema):
    id = fields.Integer(required=False)
    name = fields.String(required=False)


    
