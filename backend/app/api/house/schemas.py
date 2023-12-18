# Validations with Marshmallow
from marshmallow import Schema, fields
from marshmallow.validate import OneOf


class HousesSchema(Schema):
    class Meta:
        # Fields to expose
        fields = ("devices", "timestamp")

class DevicesSchema(Schema):
    class Meta:
        # Fields to expose
        fields = ("devices", "timestamp")


class ControlSchema(Schema):

    #command = fields.Str(validate=OneOf(["ON", "OFF"]))
    command = fields.Float()