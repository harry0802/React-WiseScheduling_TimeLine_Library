import sys
import defusedxml.ElementTree as ET
import os
from dotenv import load_dotenv
load_dotenv()


LY_XML_SOAP_NAMESPACE = os.getenv("LY_XML_SOAP_NAMESPACE", "http://schemas.xmlsoap.org/soap/envelope/")
LY_XML_TEMPURI_NAMESPACE = os.getenv("LY_XML_TEMPURI_NAMESPACE", "http://tempuri.org/")
NS = {'envelope': LY_XML_SOAP_NAMESPACE,
      'tempuri': LY_XML_TEMPURI_NAMESPACE}


def is_digit(n):
    try:
        int(n)
        return True
    except ValueError:
        return  False

def parse_LyGetPassKey(xml_string:str) -> str:
    """取得金鑰

    Args:
        xml_string (str): 呼叫API後回傳的xml字串

    Raises:
        Exception: < 0: 失敗
        =-1 sql 連接失敗 
        =-2 帳號不存在 
        =-3 密碼不符 
        =-4 帳號存在沒有權限

    Returns:
        str: 取得LyGetPassKeyResult節點的內容
    """
    root = ET.fromstring(xml_string)
    Body =root.find('envelope:Body', NS)
    response = Body.find('tempuri:LyGetPassKeyResponse', NS)
    result = response.find('tempuri:LyGetPassKeyResult', NS)
    if is_digit(result.text):
        if int(result.text) < 0:
            error_code = {"-1": "sql 連接失敗", "-2": "帳號不存在", "-3": "密碼不符", "-4": "帳號存在沒有權限"}
            raise Exception(f"LyGetPassKey error: {result.text} {error_code[result.text]}")

    return result.text


def parse_LyDataOut(xml_string:str) -> str:
    """轉出資料

    Args:
        xml_string (str): 呼叫API後回傳的xml字串

    Raises:
        Exception: < 0: 失敗
        =-1 sql 連接失敗 
        =-2 讀取失敗 
        =-3 金鑰失效 
        =-4 金鑰不合法 
        =-5 無權限
        =-7 lydatatemp 檔不存在

    Returns:
        str: 取得LyDataOutResult節點的內容
    """
    root = ET.fromstring(xml_string)
    Body =root.find('envelope:Body', NS)
    response = Body.find('tempuri:LyDataOutResponse', NS)
    result = response.find('tempuri:LyDataOutResult', NS) # return 0 if success
    if is_digit(result.text):
        if int(result.text) < 0:
            error_code = {"-1": "sql 連接失敗", "-2": "讀取失敗", "-3": "金鑰失效", "-4": "金鑰不合法", "-5": "無權限", "-7": "lydatatemp 檔不存在"}
            raise Exception(f"LyDataOut error: {result.text} {error_code[result.text]}")
    ixmlda = response.find('tempuri:ixmlda', NS)
    return ixmlda.text
