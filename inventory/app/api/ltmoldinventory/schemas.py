from marshmallow import Schema, fields


class LtMoldInventorySchema(Schema):
    no = fields.Integer(dump_only=True)
    rfidno = fields.String(required=False)
    finalinventory = fields.DateTime(required=False)
    memo = fields.String(required=False)
