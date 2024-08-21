from datetime import datetime, timedelta

import requests
from flask import current_app

from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.calendar import Calendar
from .schemas import CalendarSchema

calendar_schema = CalendarSchema()

def timestamp():
    return datetime.utcnow()

class CalendarService:
    @staticmethod
    def get_calendar(date, period_len):
        try:
            # Get the current calendar
            if not (calendar_db := Calendar.query.filter(
                    Calendar.date >= date,
                    Calendar.date < date + timedelta(days=period_len)
                ).all()):
                calendar_db = []
            
            calendar_dto = calendar_schema.dump(calendar_db, many=True)

            resp = message(True, "Calendar data sent")
            resp["data"] = calendar_dto
            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def upsert_calendar(date, payload):
        try:
            calendar_db = Calendar.query.filter(Calendar.date == date).first()
            if calendar_db is None:
                calendar_db = Calendar(
                    date=date,
                    isHoliday=payload["isHoliday"],
                    chinese=payload["chinese"],
                    holidayCategory=payload["holidayCategory"],
                    description=payload["description"],
                )
            else:
                calendar_db.isHoliday = payload["isHoliday"]
                calendar_db.chinese = payload["chinese"]
                calendar_db.holidayCategory = payload["holidayCategory"]
                calendar_db.description = payload["description"]

            db.session.add(calendar_db)
            db.session.flush()

            calendar_dto = calendar_schema.dump(calendar_db)

            db.session.commit()

            resp = message(True, "Calendar has been updated..")
            resp["data"] = calendar_dto

            return resp, 201

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def delete_calendar(date):
        try:
            calendar_db = Calendar.query.filter(Calendar.date == date).first()
            if calendar_db is None:
                return err_resp("Calendar not found", "calendar_404", 404)  

            db.session.delete(calendar_db)
            db.session.commit()

            return message(True, "Calendar has been deleted.."), 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def update_calendar():
        """Get Calendar from 新北API and update to database
        新北API: https://data.ntpc.gov.tw/api/datasets/308dcd75-6434-45bc-a95f-584da4fed251/json
        新北API response:[{
            "date": "2013/10/19",
            "chinese": "",
            "isholiday": "是",
            "holidaycategory": "星期六、星期日",
            "description": ""
            }, ...
        ]
        """
        try:
            # Get the calendar from 新北API
            url = "https://data.ntpc.gov.tw/api/datasets/308dcd75-6434-45bc-a95f-584da4fed251/json?size=3000"
            response = requests.get(url)
            response.raise_for_status() # Raise exception if invalid response
            calendar = response.json() # Convert response to json

            # Write to database
            # Delete all existing records
            # Calendar.query.delete()
            # db.session.commit()

            # Insert new records
            
            # #call PUT /api/calendar/{date}
            # for record in calendar:
            #     payload = {
            #        "date": record["date"],
            #        "isHoliday": True if record["isholiday"] == "是" else False,
            #        "chinese": record["chinese"],
            #        "holidayCategory": record["holidaycategory"],
            #        "description": record["description"],
            #     }
            #     CalendarService.upsert_calendar(datetime.strptime(record["date"], '%Y/%m/%d'), payload)

            # #session.add
            # for record in calendar:
            #     calendar_db = Calendar(
            #         id=None,
            #         date=record["date"],
            #         isHoliday=True if record["isholiday"] == "是" else False,
            #         chinese=record["chinese"],
            #         holidayCategory=record["holidaycategory"],
            #         description=record["description"],
            #     )
            #     try:
            #         db.session.add(calendar_db)
            #         db.session.commit()
            #     except Exception as error:
            #         skip = True

            #insert ignore
            entries = []
            for record in calendar:
                calendar_db = {
                    "date":record["date"],
                    "isHoliday":True if record["isholiday"] == "是" else False,
                    "chinese":record["chinese"],
                    "holidayCategory":record["holidaycategory"],
                    "description":record["description"],
                }
                entries.append(calendar_db)
            insert_command = Calendar.__table__.insert().prefix_with('IGNORE').values(entries)
            db.session.execute(insert_command)
            db.session.commit()

            current_app.logger.info("Calendar has been updated..")
        except Exception as error:
            current_app.logger.error(error)
