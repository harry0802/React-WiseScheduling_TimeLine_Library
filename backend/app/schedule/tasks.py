from flask import current_app

from app import scheduler, db

from app.api.calendar.service import CalendarService

@scheduler.task(
    "cron",
    id="update_calendar",
    month='*',
    max_instances=1,
)
def update_calendar():
    with scheduler.app.app_context():
        try:
            CalendarService.update_calendar()
        except Exception as error:
            current_app.logger.error(error)
