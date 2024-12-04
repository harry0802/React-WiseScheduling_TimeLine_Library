from datetime import datetime, timedelta
import sys
from app import db
import requests
from app.api.product.service import productService
from app.api.material.service import materialService

from flask import current_app
from app.utils_log import message, err_resp, internal_err_resp
from app.models.product import Product
from app.models.material import Material
from app.models.ly00000RTitle import LY00000RTitle
from app.models.ly00000RDetail import LY00000RDetail
from app.models.ly0000AB import LY0000AB
from app.models.ly0000AO import LY0000AODetail
from app.api.lysErp.xmlEnum import DataKind, Ixmlda00000R_Title, Ixmlda00000R_Detail, Ixmlda0000AB_Title, Ixmlda0000AO_Detail
from app.api.lysErp.xmlRequest import LyDataOutRequestParameter, LyGetPassKeyRequest, LyDataOutRequest
from app.api.lysErp.xmlParser import parse_LyGetPassKey, parse_LyDataOut
import xml.etree.ElementTree as ET
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
        lyDataOutRequestParameter.icpno = os.getenv("LY_ERP_ICPNO","00") #公司代號
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


def call_LyDataOut_00000R_Title(lyDataOutRequestParameter) -> list[LY00000RTitle]:
    """利用轉出資料API取得產品結構抬頭檔(產品)

    Returns:
        LY00000R: 產品結構抬頭檔(產品)
    """
    ixmlda = call_LyDataOut(lyDataOutRequestParameter)
    ly00000R_title_db_list = []
    if ixmlda:
        root_ixmlda = ET.fromstring(ixmlda)
        for lydata_title in root_ixmlda.findall('LYDATATITLE'):
            ly00000R_title_db = LY00000RTitle()
            for key in Ixmlda00000R_Title:
                element = lydata_title.find(key.value)
                if element is not None:
                    ly00000R_title_db.__setattr__(key.name, element.text)
            ly00000R_title_db_list.append(ly00000R_title_db)
    return ly00000R_title_db_list


def insert_00000R_title_into_product_table(ly00000R_title_db_list):
    try:
        insert_list = []
        update_list = []
        # check if there is duplicate data
        for ly00000R_title_db in ly00000R_title_db_list:
            product_dict = {'productSN': ly00000R_title_db.BM_USKNO, 'productName': ly00000R_title_db.BM_USKNM}
            select_result = db.session.execute(db.select(Product).filter_by(productSN=ly00000R_title_db.BM_USKNO)).scalar_one_or_none()
            if select_result:
                product_dict['id'] = select_result.id
                update_list.append(product_dict)
            else:
                insert_list.append(product_dict)

        productService.create_products(insert_list)
        productService.update_products(update_list)
    except Exception as error:
        raise error


def call_LyDataOut_00000R_Detail(lyDataOutRequestParameter) -> list[LY00000RDetail]:
    """利用轉出資料API取得產品結構明細表(物料)

    Returns:
        LY00000R: 產品結構明細表(物料)
    """
    ixmlda = call_LyDataOut(lyDataOutRequestParameter)
    ly00000R_detail_db_list = []
    if ixmlda:
        root_ixmlda = ET.fromstring(ixmlda)
        for lydata_title in root_ixmlda.findall('LYDATADETAIL'):
            ly00000R_detail_db = LY00000RDetail()
            for key in Ixmlda00000R_Detail:
                element = lydata_title.find(key.value)
                if element is not None:
                    ly00000R_detail_db.__setattr__(key.name, element.text)
            ly00000R_detail_db_list.append(ly00000R_detail_db)
    return ly00000R_detail_db_list


def insert_00000R_detail_into_material_table(ly00000R_detail_db_list):
    try:
        insert_list = []
        update_list = []
        # check if there is duplicate data
        for ly00000R_detail_db in ly00000R_detail_db_list:
            material_dict = {
                'productSN': ly00000R_detail_db.BD_USKNO, 
                'materialSN': ly00000R_detail_db.BD_DSKNO, 
                'materialName': ly00000R_detail_db.BD_DSKNM, 
                'quantity': ly00000R_detail_db.BD_QTY, 
                'unit': ly00000R_detail_db.BD_UNIT
            }
            select_result = db.session.execute(
                db.select(Material)
                .filter_by(productSN=ly00000R_detail_db.BD_USKNO)
                .filter_by(materialSN=ly00000R_detail_db.BD_DSKNO)
            ).scalar_one_or_none()
            if select_result:
                material_dict['id'] = select_result.id
                update_list.append(material_dict)
            else:
                insert_list.append(material_dict)

        materialService.create_materials(insert_list)
        materialService.update_materials(update_list)
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
            for key in Ixmlda0000AB_Title:
                element = lydata_title.find(key.value)
                if element is not None:
                    ly0000AB_db.__setattr__(key.name, element.text)
            ly0000AB_db_list.append(ly0000AB_db)
    return ly0000AB_db_list


def get_last_mp_no_from_0000AB() -> str:
    """get the last MP_NO from the database

    Raises:
        error: _description_

    Returns:
        str: _description_
    """
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
    

def delete_0000AB_older_than_six_months():
    try:
        delete_0000AB_list = db.session.execute(db.select(LY0000AB).filter(LY0000AB.MP_DATE < db.func.date_sub(db.func.current_date(), db.text("INTERVAL 6 MONTH")))).scalars()
        for delete_0000AB in delete_0000AB_list:
            db.session.delete(delete_0000AB)
        db.session.commit()
    except Exception as error:
        raise error
    

def call_LyDataOut_0000AO_Detail(lyDataOutRequestParameter) -> list[LY0000AODetail]:
    """利用轉出資料API取得進貨單明細資料

    Returns:
        LY0000AO: 進貨單明細資料
    """
    ixmlda = call_LyDataOut(lyDataOutRequestParameter)
    ly0000AO_detail_db_list = []
    if ixmlda:
        root_ixmlda = ET.fromstring(ixmlda)
        for lydata_title in root_ixmlda.findall('LYDATADETAIL'):
            ly0000AO_detail_db = LY0000AODetail()
            for key in Ixmlda0000AO_Detail:
                element = lydata_title.find(key.value)
                if element is not None:
                    ly0000AO_detail_db.__setattr__(key.name, element.text)
            ly0000AO_detail_db_list.append(ly0000AO_detail_db)
    return ly0000AO_detail_db_list

    
def insert_0000AODetail(ly0000AODetail_db_list):
    try:
        # check if there is duplicate data
        for ly0000AODetail_db in ly0000AODetail_db_list:
            select_result = db.session.execute(db.select(LY0000AODetail)
                                               .filter_by(SD_NO=ly0000AODetail_db.SD_NO,
                                                          SD_SKNO=ly0000AODetail_db.SD_NO,
                                                          SD_NAME=ly0000AODetail_db.SD_NAME,
                                                )).scalar_one_or_none()
            if select_result:
                db.session.delete(select_result)

        db.session.add_all(ly0000AODetail_db_list)
        db.session.commit()
    except Exception as error:
        raise error
    

def delete_0000AO_older_than_six_months():
    try:
        delete_0000AODetail_list = db.session.execute(db.select(LY0000AODetail).filter(LY0000AODetail.SD_DATE < db.func.date_sub(db.func.current_date(), db.text("INTERVAL 6 MONTH")))).scalars()
        for delete_0000AODetail in delete_0000AODetail_list:
            db.session.delete(delete_0000AODetail)
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
    def sync_ly_00000R():
        """Sync 00000R 產品結構抬頭檔(產品) & 產品結構明細表(物料) Data from LY ERP"""
        try:
            # 2024/6/12 之前建立的產品結構資料，又稱為BOM，都是舊產品編號的產品；之後建立的產品則改以新編號規則建立，
            # 所以從凌越同步資料時，只要同步 2024/6/12 以後的新編號產品結構資料即可。
            irwhere = "BM_CDATE>='2024-06-12'"

            # call api and get the title data of 00000R from LY ERP
            lyDataOutRequestParameter = LyDataOutRequestParameter(idakd=DataKind.ProductStructure.value, irwhere=irwhere)
            ly00000R_title_db_list = call_LyDataOut_00000R_Title(lyDataOutRequestParameter)
            # insert the data into the product_table
            insert_00000R_title_into_product_table(ly00000R_title_db_list)

            # call api and get the detail data of 00000R from LY ERP
            ly00000R_detail_db_list = call_LyDataOut_00000R_Detail(lyDataOutRequestParameter)
            # insert the data into the database
            insert_00000R_detail_into_material_table(ly00000R_detail_db_list)
        except Exception as error:
            raise error


    @staticmethod
    def sync_ly_0000AB():
        """Sync 0000AB Data from LY ERP"""
        try:
            irwhere = ""
            # get the date of 6 months ago
            six_months_ago = (datetime.now() - timedelta(days=180)).strftime("%Y-%m-%d")
            irwhere += f"MP_DATE>'{six_months_ago}'"
            
            # 2024/10/23 註解掉，因為隆廷會開未來的製令單，如果開10天後的製令單，會導致這10天內新增的製令單無法同步
            # get the last MP_NO from the database
            # last_mp_no = get_last_mp_no_from_0000AB()
            # if last_mp_no != "":
            #     irwhere += f"AND MP_NO>'{last_mp_no}'"
            print(irwhere)
            # call api and get the data from LY ERP  
            lyDataOutRequestParameter = LyDataOutRequestParameter(idakd=DataKind.FactoryProductionOrder.value, irwhere=irwhere)
            ly0000AB_db_list = call_LyDataOut_0000AB(lyDataOutRequestParameter)
            # insert the data into the database
            insert_0000AB(ly0000AB_db_list)

            # remove the data that older than 6 months
            delete_0000AB_older_than_six_months()
        except Exception as error:
            raise error
        
    
    @staticmethod
    def sync_ly_0000AO():
        """Sync 0000AO 進貨單明細資料 Data from LY ERP
        目前僅有進貨單明細資料，日後若有需要再增加其他進貨單抬頭資料
        """
        try:
            # get the date of 6 months ago
            six_months_ago = (datetime.now() - timedelta(days=180)).strftime("%Y-%m-%d")
            irwhere = f"SD_DATE>'{six_months_ago}'"
            # only retrieve the part of fields
            ifld = "SP_DATE" # title
            idetfields = "SD_DATE,SD_NO,SD_SKNO,SD_NAME,SD_PRICE" # detail

            lyDataOutRequestParameter = LyDataOutRequestParameter(idakd=DataKind.PurchaseOrder.value, irwhere=irwhere, ifld=ifld, idetfields=idetfields)
            # call api and get the detail data of 0000AO from LY ERP
            ly0000AO_detail_db_list = call_LyDataOut_0000AO_Detail(lyDataOutRequestParameter)
            # insert the data into the database
            insert_0000AODetail(ly0000AO_detail_db_list)
            # remove the data that older than 6 months
            delete_0000AO_older_than_six_months()
        except Exception as error:
            raise error
        
    