import sys
from app import db
import requests
from flask import current_app
from app.utils import message, err_resp, internal_err_resp
from app.models.ly0000AB import LY0000AB
from app.api.lysErp.xmlEnum import DataKind, Ixmlda0000AB
from app.api.lysErp.xmlRequest import LyDataOutRequestParameter, LyGetPassKeyRequest, LyDataOutRequest
from app.api.lysErp.xmlParser import parse_LyGetPassKey, parse_LyDataOut
import xml.etree.ElementTree as ET
from app.utils import err_resp, internal_err_resp
import os
from dotenv import load_dotenv
load_dotenv()

LY_ERP_URL = os.getenv("LY_ERP_URL","http://api.lyserp.com.tw/erpapi/erpservice.svc")
LY_XML_TEMPURI_NAMESPACE = os.getenv("LY_XML_TEMPURI_NAMESPACE", "http://tempuri.org/")


def call_LyGetPassKey() -> str:
    """取得金鑰

    Returns:
        str: 呼叫API時必備的金鑰
    """
    try:
        ly = LyGetPassKeyRequest(os.getenv("LY_ERP_PUSID","LY"), os.getenv("LY_ERP_PVERIFYKEY","LY"))
        payload = ly.__str__()
        headers = {
            'Content-type': "text/xml",
            'SOAPAction': f"{LY_XML_TEMPURI_NAMESPACE}IErpService/LyGetPassKey",
        }
        response = requests.post(LY_ERP_URL, headers=headers, data=payload)
        result = parse_LyGetPassKey(response.text)
        return result
    except Exception as error:
        raise error


def call_LyDataOut(lyDataOutRequestParameter) -> str:
    """轉出資料

    Returns:
        str: 從凌越ERP轉出的資料
    """
    try:
        lyDataOutRequestParameter.ikye = call_LyGetPassKey()
        lyDataOutRequestParameter.icpno = os.getenv("LY_ERP_ICPNO","103") #公司代號
        ly = LyDataOutRequest(lyDataOutRequestParameter)
        payload = ly.__str__()
        headers = {
            'Content-type': "text/xml",
            'SOAPAction': f"{LY_XML_TEMPURI_NAMESPACE}IErpService/LyDataOut",
        }
        response = requests.post(LY_ERP_URL, headers=headers, data=payload)
        result = parse_LyDataOut(response.text)
        return result
    except Exception as error:
        raise error


def call_LyDataOut_0000AB(lyDataOutRequestParameter) -> list[LY0000AB]:
    """利用轉出資料API取得廠內製令單抬頭資料

    Returns:
        LY0000AB: 廠內製令單抬頭資料
    """
    ixmlda = call_LyDataOut(lyDataOutRequestParameter)
    ly0000AB_db_list = []
    if ixmlda:
        root_ixmlda = ET.fromstring(ixmlda)
        for lydata_title in root_ixmlda.findall('LYDATATITLE'):
            ly0000AB_db = LY0000AB()
            for key in Ixmlda0000AB:
                element = lydata_title.find(key.value)
                if element is not None:
                    ly0000AB_db.__setattr__(key.name, element.text)
            ly0000AB_db_list.append(ly0000AB_db)
    return ly0000AB_db_list


# get the last MP_NO from the database
def get_last_mp_no_from_0000AB() -> str:
    try:
        select_result = db.session.execute(
            db.select(LY0000AB)
            .filter(LY0000AB.MP_DATE > db.func.date_sub(db.func.current_date(), db.text("INTERVAL 6 MONTH")))
            .order_by(LY0000AB.MP_NO.desc())
        ).first()
        if select_result:
            return select_result[0].MP_NO
        else:
            return ""
    except Exception as error:
        current_app.logger.error(error)
        raise error


def insert_0000AB(ly0000AB_db_list):
    try:
        # check if there is duplicate data
        for ly0000AB_db in ly0000AB_db_list:
            select_result = db.session.execute(db.select(LY0000AB).filter_by(MP_NO=ly0000AB_db.MP_NO)).scalar_one_or_none()
            if select_result:
                db.session.delete(select_result)

        db.session.add_all(ly0000AB_db_list)
        db.session.commit()
    except Exception as error:
        raise error
    

def delete_0000AB_within_three_months():
    try:
        delete_0000AB_list = db.session.execute(db.select(LY0000AB).filter(LY0000AB.MP_DATE < db.func.date_sub(db.func.current_date(), db.text("INTERVAL 6 MONTH")))).scalars()
        for delete_0000AB in delete_0000AB_list:
            db.session.delete(delete_0000AB)
        db.session.commit()
    except Exception as error:
        raise error


class LyService:
    @staticmethod
    def get_workOrderSNs():
        """Get distinct workOrderSNs"""
        try:
            workOrderSNs = db.session.execute(
                db.select(LY0000AB.MP_NO).distinct()
            ).scalars().all()
            
            resp = message(True, "Distinct workOrderSNs")
            resp["data"] = workOrderSNs
            return resp, 200
        except Exception as error:
            raise error

    @staticmethod
    def sync_ly_0000AB():
        """Sync 0000AB Data from LY ERP"""
        try:
            # get the last MP_NO from the database
            irwhere = ""
            last_mp_no = get_last_mp_no_from_0000AB()
            if last_mp_no != "":
                irwhere = f"MP_NO>'{last_mp_no}'"
            
            # call api and get the data from LY ERP  
            lyDataOutRequestParameter = LyDataOutRequestParameter(idakd=DataKind.FactoryProductionOrder.value, irwhere=irwhere)
            ly0000AB_db_list = call_LyDataOut_0000AB(lyDataOutRequestParameter)
            # insert the data into the database
            insert_0000AB(ly0000AB_db_list)

            # remove the data that older than 3 months
            delete_0000AB_within_three_months()
        except Exception as error:
            raise error
        
    