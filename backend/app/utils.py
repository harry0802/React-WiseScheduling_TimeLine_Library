import traceback
from flask import current_app, request
from datetime import datetime

def message(status, message):
    response_object = {"status": status, "message": message}
    return response_object


def validation_error(status, errors):
    response_object = {"status": status, "errors": errors}

    return response_object


def err_resp(msg, reason, code):
    err = message(False, msg)
    err["error_reason"] = reason
    return err, code


def internal_err_resp():
    err = message(False, "Something went wrong during the process!")
    err["error_reason"] = "server_error"
    return err, 500

def acceptable_condition_check(condition, test_val):
    # check test_val is in (interval) condition or not
    # input: interval string, float/int value
    # condition: |          (          a  ,  b          ]
    #            | left_open(True) |  a | | b | right_open(False)
    # regex for interval expression (123, 456), [-inf, 123], (456, INF]...
    # .........................|    3    |..............................|    5    |...................
    # |  1  |...| 2                              |..|.|..|      4                         |...| 6    |
    # (\[|\()\s*([+-]?Inf|[+-]?([0-9]*[.])?[0-9]+)\s*,\s*([+-]?Inf|[+-]?([0-9]*[.])?[0-9]+)\s*(\]|\))
    import re
    import logging
    re_str = r'(\[|\()\s*([+-]?Inf|[+-]?([0-9]*[.])?[0-9]+)\s*,\s*([+-]?Inf|[+-]?([0-9]*[.])?[0-9]+)\s*(\]|\))'
    m = re.search(re_str, condition, flags=re.IGNORECASE)
    left_open= m.group(1) == "("
    right_open= m.group(6) == ")"
    a = round( float(m.group(2)), 2)
    b = round( float(m.group(4)), 2)
    test_val = round( float(test_val), 2)
    # result =  a <= test_val and test_val <= b
    #                          ( always false when left open )                        ( always false when right open )
    result = (a < test_val or (not left_open and a == test_val)) and (test_val < b or (not right_open and test_val == b))
    # logging.info(f'{left_open}, {right_open}, {a}, {b}, {test_val}')
    return result

def get_user_info_by_token(request):
    # get user info from jwt token
    # from flask_jwt_extended import get_jwt_identity
    # user_name = get_jwt_identity()
    user_name = "byAnonymous"
    return user_name
def get_client_info(request):
    user_name = get_user_info_by_token(request)
    return {
        "remote_addr": request.remote_addr,
        "user_agent": request.user_agent.string,
        "referrer": request.referrer,
        "user_name": user_name,
    }

def log_decorator(func):
    def wrapper(*args, **kwargs):
        try:
            client_info = get_client_info(request)
            current_app.logger.info (f"Called {func.__name__} with args: {args}")
            current_app.logger.debug(f" with kwargs: {kwargs}") 
            result = func(*args, **kwargs)
            current_app.logger.info(f"Returned {func.__name__}")
            # current_app.logger.debug("I'm a DEBUG message")
            # current_app.logger.info("I'm an INFO message")
            # current_app.logger.warning("I'm a WARNING message")
            # current_app.logger.error("I'm a ERROR message")
            # current_app.logger.critical("I'm a CRITICAL message")
            return result
        except Exception as e:
            current_app.logger.error(f"Error in {func.__name__}: {e}")
            raise e
    return wrapper

""" log format
{
    "timestamp": datetime, //the time of the log
    "level": "string", //the level of the log
    "message": "string", //the message of the log to describe the action
    "data": "object"  //the data of the log
}
"timestamp": "2021-01-01 00:00:00"
"level": ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
"message": "{who} {what} {where} {why}"
"data": {json object}
example:
{
    "timestamp": "2021-01-01 00:00:00",
    "level": "INFO",
    "message": "Bob create production schedule at 127.0.0.1 action logging",
    "data": {'productionArea': 'A', 'machineSN': 'A01', 'serialNumber': 1, 'workOrderSN': 'WO0001', 'productSN': 'P0001', 'productName': 'P1', 'workOrderQuantity': 1000, 'workOrderDate': '2021-01-01 00:00:00', 'moldingSecond': 10, 'hourlyCapacity': 360, 'dailyCapacity': 8640, 'planOnMachineDate': '2021-01-01 00:00:00', 'actualOnMachineDate': '2021-01-01 00:00:00', 'moldWorkDays': 1, 'workDays': 1, 'planFinishDate': '2021-01-01 00:00:00', 'actualFinishDate': '2021-01-01 00:00:00', 'comment': 'comment', 'dailyWorkingHours': 24, 'moldCavity': 1, 'week': 1, 'singleOrDoubleColor': '單色', 'conversionRate': 1, 'status': '尚未上機'}
}
{
    "timestamp": "2021-01-01 00:00:00",
    "level": "INFO",
    "message": "Bob update production schedule at 127.0.0.1 action logging",
    "data": {'productionArea': 'A'}
}
{
    "timestamp": "2021-01-01 00:00:00",
    "level": "DEBUG",
    "message": "Bob update production schedule at 127.0.0.1 debug",
    "data": {'workDays': 1}"
}
{
    "timestamp": "2021-01-01 00:00:00",
    "level": "ERROR",
    "message": "Bob update production schedule at 127.0.0.1 exception",
    "data": {
        'request': {'productionArea': 'A'},
        'exception': 'ValueException',
        'message': e.message,
        'process_info': {
            'caller':"shiftByHolidays",
            'line': 100,
        }
    }
}


"""
def controller_entrance_log(description=""):
    def decorator(func):
        def wrapper(*args, **kwargs):
            log_format = {
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "level": "ERROR",
                "message": "entry log",
                "data": {}
            }
            message_info = {
                "who": "byAnonymous",
                "what": "GET /controller/entrance",
                "where": "at xxx.xxx.xxx.xxx",
                "why": "action logging"
            }
            try:
                #before calling the function
                client_info = get_client_info(request)
                message_info["who"] = client_info['user_name']
                message_info["what"] = f"{request.method} {request.path}"
                message_info["where"] = f"at {client_info['remote_addr']}"
                message_info["why"] = f"[{description}]"
                log_format = {
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "level": "INFO",
                    "message": f"{message_info['who']} {message_info['what']} {message_info['where']} {message_info['why']}",
                    "data": {
                        "args": f"{args}",
                        "kwargs": f"{kwargs}",
                        "request.args": request.args.to_dict(),
                        "payload": request.json if request.method in ["POST", "PUT"] else None
                    }
                }
                current_app.logger.info(log_format)

                #call the function
                result = func(*args, **kwargs)
                
                #after calling the function
                log_format["level"] = "INFO"
                log_format["data"]["result"] = result
                if result[1] == 200:
                    log_format["message"] = f"{message_info['who']} {message_info['what']} {message_info['where']} {message_info['why']} successfully"
                else:
                    log_format["message"] = f"{message_info['who']} {message_info['what']} {message_info['where']} {message_info['why']} failed"
                current_app.logger.info(log_format)
                return result
            except Exception as e:
                log_format["level"] = "CRITICAL"
                log_format["message"] = f"{message_info['who']} {message_info['what']} {message_info['where']} {message_info['why']} exception"
                log_format["data"]["exception"] = e.__class__.__name__
                log_format["data"]["message"] = e.__str__()
                log_format["data"]['process_info'] = {}
                log_format["data"]['process_info']['call_stack']=[]
                call_stack = traceback.format_exc()
                for idx, line in enumerate(call_stack.split("\n")):
                    log_format["data"]['process_info']['call_stack'].append(f"{idx}: {line}")
                    
                current_app.logger.critical(log_format)
                return internal_err_resp()
        return wrapper
    return decorator
