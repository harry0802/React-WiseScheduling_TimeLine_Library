# Validations with Marshmallow
from marshmallow import Schema, fields


class CalendarSchema(Schema):
    date = fields.Date(required=True)
    isHoliday = fields.Boolean(required=True)
    chinese = fields.String(required=False)
    holidayCategory = fields.String(required=False)
    description = fields.String(required=False)