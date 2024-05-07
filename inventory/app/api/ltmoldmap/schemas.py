from marshmallow import Schema, fields


class LtMoldMapSchema(Schema):
    no = fields.Integer(dump_only=True)
    moldno = fields.String(required=False)
    rfidno = fields.String(required=False)
    memo = fields.String(required=False)
