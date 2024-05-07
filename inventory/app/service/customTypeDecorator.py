from datetime import datetime
from sqlalchemy.types import TypeDecorator, Integer
import pytz


class TimestampDatetime(TypeDecorator):
    impl = Integer
    cache_ok = False

    def process_bind_param(self, value, dialect):
        # when inserting to database, convert ISO format datetime to unix timestamp
        if value is not None:
            return int(value.timestamp())
        else:
            return None

    def process_result_value(self, value, dialect):
        # when selecting from database, convert unix timestamp to ISO format datetime
        if value is not None:
            # return datetime.fromisoformat(datetime.fromtimestamp(value).isoformat())
            return datetime.fromisoformat(datetime.fromtimestamp(value, pytz.timezone('UTC')).isoformat())
        else:
            return None