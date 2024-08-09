# Validations with Marshmallow
from marshmallow import Schema, fields


class materialOptionSchema(Schema):
    id = fields.Integer(dump_only=True)
    materialCode = fields.String(required=True)
    materialType = fields.String(required=True)
