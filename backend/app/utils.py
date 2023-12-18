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
