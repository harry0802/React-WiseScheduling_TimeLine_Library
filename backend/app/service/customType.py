from datetime import datetime
from sqlalchemy.types import TypeDecorator, Integer, TIMESTAMP
import pytz


class TimestampDatetime(TypeDecorator):
    """When storing datetime as TIMESTAMP(yyyy/MM/dd) type in MariaDB，use this class.

    Args:
        TypeDecorator (_type_): _description_

    Returns:
        _type_: _description_
    """
    impl = TIMESTAMP
    cache_ok = False

    def process_bind_param(self, value, dialect):
        # when inserting to database, convert ISO format datetime to UTC timezone
        if value is not None:
            return value.astimezone(pytz.timezone('UTC')).replace(tzinfo=None)
        else:
            return None
        
    def process_result_value(self, value, dialect):
        # when selecting from database, convert unix timestamp to ISO format datetime
        if value is not None:
            return value
        else:
            return None
        

class IntegerDatetime(TypeDecorator):
    """When storing datetime as Integer type in MariaDB，use this class to convert datetime to unix timestamp.

    Args:
        TypeDecorator (_type_): _description_

    Returns:
        _type_: _description_
    """
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