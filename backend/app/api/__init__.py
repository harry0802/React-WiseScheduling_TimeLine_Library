from flask_restx import Api
from flask import Blueprint

from .user.controller import api as user_ns
from .device.controller import api as device_ns
from .house.controller import api as house_ns
from .calendar.controller import api as calendar_ns
from app.api.calendar.service import CalendarService

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

@api_bp.cli.command('update_calendar')
def update_calendar():
    """Update calendar"""
    print("update_calendar")
    return CalendarService.update_calendar()
