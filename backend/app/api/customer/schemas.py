# Validations with Marshmallow
from marshmallow import Schema, fields


class CustomerSchema(Schema):
    name = fields.String(required=False)


    
