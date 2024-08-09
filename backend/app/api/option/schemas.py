# Validations with Marshmallow
from marshmallow import Schema, fields


class optionSchema(Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    content = fields.String(required=True)
    
