from datetime import datetime
from flask import request
from flask_restx import Resource

from app.utils import validation_error

from .service import CalendarService
from .dto import CalendarDto
from .schemas import CalendarSchema


api = CalendarDto.api
control_schema = CalendarSchema()

"""API Documentation
1. Get the current calendar
Get /api/calendar/{date}
2. Get a period of calendar
Get /api/calendar/{date}?len={len}
3. Upsert the current calendar
Put /api/calendar/{date}
4. delete a calendar record by date
Delete /api/calendar/{date}
"""

@api.route("/<int:year>/<int:month>/<int:day>/")
@api.param("day", "Day of the calendar")
@api.param("month", "Month of the calendar")
@api.param("year", "Year of the calendar")
class CalendarController(Resource):
    calendar_resp = CalendarDto.calendar_resp
    control_input = CalendarDto.calendar_object
    control_resp = CalendarDto.calendar_resp

    @api.doc(
        "Get the current calendar",
        responses={
            200: ("Calendar data successfully sent", calendar_resp),
            404: "Calendar not found",
        },
    )
    @api.param("len", "Length of the period")
    def get(self, year, month, day):
        calendar_date = datetime(year, month, day)
        period_len = request.args.get('len', default=1, type=int)
        return CalendarService.get_calendar(calendar_date, period_len)

    @api.doc(
        "upsert the current calendar",
        responses={
            200: ("Calendar data successfully upserted", control_resp),
            404: "Calendar not found",
        },
    )
    @api.expect(control_input, validate=True)
    def put(self, year, month, day):
        calendar_date = datetime(year, month, day)
        payload = api.payload
        return CalendarService.upsert_calendar(calendar_date, payload)

    @api.doc(
        "delete the current calendar",
        responses={
            200: ("Calendar data successfully deleted", calendar_resp),
            404: "Calendar not found",
        },
    )
    def delete(self, year, month, day):
        calendar_date = datetime(year, month, day)
        return CalendarService.delete_calendar(calendar_date)
