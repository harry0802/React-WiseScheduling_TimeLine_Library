from datetime import datetime
from flask_restx import Api
from flask import Blueprint

from .user.controller import api as user_ns
from .device.controller import api as device_ns
from .house.controller import api as house_ns
from .calendar.controller import api as calendar_ns
from .productionSchedule.controller import api as productionSchedule_ns
from app.api.calendar.service import CalendarService
from app.api.productionSchedule.service import shift_by_holiday
import click

# Import controller APIs as namespaces.
api_bp = Blueprint("api", __name__)

authorizations = {
    'api_key': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

api = Api(api_bp, title="API", authorizations=authorizations,
          description="Main routes.", security='api_key')

# API namespaces
api.add_namespace(user_ns)
# api.add_namespace(device_ns)
# api.add_namespace(house_ns)
api.add_namespace(calendar_ns)
api.add_namespace(productionSchedule_ns)

@api_bp.cli.command('update_calendar')
def update_calendar():
    """Update calendar"""
    print("update_calendar")
    return CalendarService.update_calendar()


@api_bp.cli.command('shift_by_holiday')
@click.argument('start_date', type=click.DateTime(formats=["%Y-%m-%d"]))
@click.argument('workdays', type=click.INT)
def shift_test(start_date, workdays):
    """shift_by_holiday"""
    # format = '%Y-%m-%d'
    # start_date = datetime.strptime("2023-01-09", format)
    # end_date = datetime.strptime("2023-01-13", format)
    # workdays = (end_date - start_date).days
    return shift_by_holiday(start_date=start_date.date(), workdays=workdays)

