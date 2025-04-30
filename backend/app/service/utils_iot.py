from datetime import datetime, timedelta, timezone
import sys
from flask import current_app
from app.models.injector import Injector
from app.api.calendar.service import CalendarService
from app.utils_log import message, err_resp, internal_err_resp


def get_current_modulus_from_injector(machineSN, startTime, endTime):
    # SELECT current_modulus FROM opcua.injector WHERE last_updated BETWEEN '母批/子批結束時間 - 1分鐘' AND '母批/子批結束時間' AND name = '機台號碼' ORDER BY last_updated DESC LIMIT 1;
    # SELECT current_modulus FROM opcua.injector WHERE last_updated BETWEEN '母批/子批開始時間' AND '母批/子批開始時間 + 1分鐘' AND name = '機台號碼' ORDER BY last_updated ASC LIMIT 1;
    try:
        # convert startTime to user's local timezone according to the endTime
        startTime = startTime.astimezone(timezone(endTime.tzinfo.utcoffset(startTime)))

        query = Injector.query
        query = query.filter(
            Injector.last_updated.between(endTime - timedelta(minutes=1), endTime),
            Injector.name == machineSN.lower()
        )
        query = query.order_by(Injector.last_updated.desc())
        end_current_modulus = query.with_entities(Injector.current_modulus).first()
        end_current_modulus = int(end_current_modulus[0]) if end_current_modulus else 0

        query = Injector.query
        query = query.filter(
            Injector.last_updated.between(startTime, startTime + timedelta(minutes=1)),
            Injector.name == machineSN.lower()
        )
        query = query.order_by(Injector.last_updated.asc())
        start_current_modulus = query.with_entities(Injector.current_modulus).first()
        start_current_modulus = int(start_current_modulus[0]) if start_current_modulus else 0
        return start_current_modulus, end_current_modulus
    except Exception as error:
        # log the error message
        current_app.logger.error(f"get_current_modulus_from_injector error: {error}")
        return None, None


def isHoliday(obj, start, end, api_version = "api.calendar_calendar_controller"):
    if api_version == "api.calendar_calendar_controller":
        event_date = datetime.fromisoformat(obj['date']) if type(obj['date']) == str else obj['date']
        # evnet_date加上時區
        event_date = event_date.replace(tzinfo=start.tzinfo)
        
        return event_date >= start and event_date <= end and obj['isHoliday'] == True
    else:
        return False


"""shift_by_holiday

Keyword arguments:
argument -- start_date, end_date, workdays
Return: return end_date

this function should able to shift the end_date by holidays
the workdays + holidays should be the same as the end_date - start_date
"""
def shift_by_holiday(start_date, end_date=datetime(1,1,1), workdays=1):
    # get the holiday list (twice of workdays)
    # to avoid the holiday list is not enough in final check
    # the calendar_api
    end_date = end_date.replace(tzinfo=start_date.tzinfo)
    deltaDays = max(workdays, (end_date - start_date).days)
    holiday_list, code = CalendarService.get_calendar(start_date.date(), deltaDays*7)
    if holiday_list["status"] != True:
        return internal_err_resp()
    holiday_list = holiday_list["data"]

    #get the holiday list between start_date and end_date
    holiday_list_1st_count = sum( 1 for holiday in holiday_list if isHoliday(holiday, start_date, end_date, "api.calendar_calendar_controller"))
    #1st shift the end_date by workdays + holidays
    new_end_date = start_date + timedelta(days=workdays+holiday_list_1st_count)
    #final check if the workdays + holiday is the same as the end_date
    holiday_list_2nd_count = sum( 1 for holiday in holiday_list if isHoliday(holiday, start_date, new_end_date, "api.calendar_calendar_controller"))

    # check is any new holiday created in the 1st shift
    if workdays+holiday_list_1st_count < workdays + holiday_list_2nd_count:
        return shift_by_holiday(start_date, new_end_date, workdays)
    else:
        final_end_date = new_end_date
    deltaDays = (final_end_date - start_date).days
    
    current_app.logger.debug(f"shift_by_holiday: ")
    current_app.logger.debug(f"start: {start_date}, workdays: {workdays},")
    current_app.logger.debug(f"final_end: {final_end_date}, deltaDays: {deltaDays}, holiday_count: {holiday_list_2nd_count}")
    return final_end_date