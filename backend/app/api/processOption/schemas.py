# Validations with Marshmallow
from marshmallow import Schema, fields


class processOptionSchema(Schema):
    id = fields.Integer(dump_only=True)
    processCategory = fields.String(required=True)
    processSN = fields.String(required=True)
    processName = fields.String(required=True)
