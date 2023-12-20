from flask_restx import Namespace, fields


class CalendarDto:

    api = Namespace("calendar", description="Calendar related operations.")

    # Calendar models
    calendar_object = api.model(
        "Calendar object",
        {
            "date": fields.Date(required=True),
            "isHoliday": fields.Boolean(required=True),
            "chinese": fields.String(required=False),
            "holidayCategory": fields.String(required=False),
            "description": fields.String(required=False),
        }
    )

    calendar_resp = api.model(
        "Calendar response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(calendar_object)
        }
    )

    # Control models
    control_input = api.model(
        "Control input",
        {
            "command": fields.String(required=True)
        }
    )

    control_resp = api.model(
        "Control response",
        {
            "status": fields.Boolean,
            "message": fields.String,
        }
    )
