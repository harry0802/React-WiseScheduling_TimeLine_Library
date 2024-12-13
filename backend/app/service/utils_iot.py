from datetime import datetime, timedelta, timezone
import sys
from flask import current_app
from app.models.injector import Injector


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
