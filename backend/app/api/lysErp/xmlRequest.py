import sys
import xml.etree.ElementTree as ET
from app.api.lysErp.xmlEnum import DataKind
import os
from dotenv import load_dotenv
load_dotenv()

LY_XML_SOAP_NAMESPACE = os.getenv("LY_XML_SOAP_NAMESPACE", "http://schemas.xmlsoap.org/soap/envelope/")
LY_XML_TEMPURI_NAMESPACE = os.getenv("LY_XML_TEMPURI_NAMESPACE", "http://tempuri.org/")

class XMLRoot:
    def __init__(self):
        ET.register_namespace('s', LY_XML_SOAP_NAMESPACE)
        ET.register_namespace('', LY_XML_TEMPURI_NAMESPACE)
        self.root = ET.Element(f'{{{LY_XML_SOAP_NAMESPACE}}}Envelope')
        self.body = ET.SubElement(self.root, f'{{{LY_XML_SOAP_NAMESPACE}}}Body')


class LyGetPassKeyRequest(XMLRoot):
    """生成呼叫"取得金鑰"API的xml

    Args:
        XMLRoot (_type_): _description_
    """
    def __init__(self, pusid, pverifykey):
        super().__init__()
        self.pusid = pusid
        self.pverifykey = pverifykey
        LyGetPassKey = ET.SubElement(self.body, f'{{{LY_XML_TEMPURI_NAMESPACE}}}LyGetPassKey')
        pusid = ET.SubElement(LyGetPassKey, 'pusid')
        pusid.text = self.pusid
        pverifykey = ET.SubElement(LyGetPassKey, 'pverifykey')
        pverifykey.text = self.pverifykey

    def __str__(self):
        return ET.tostring(self.root).decode()
    

class LyDataOutRequest(XMLRoot):
    """生成呼叫"轉出資料"API的xml

    Args:
        XMLRoot (_type_): _description_
    """
    def __init__(self, lyDataOutRequestParameter):
        # check if lyDataOutRequestParameter is an instance of LyDataOutRequestParameter
        if not isinstance(lyDataOutRequestParameter, LyDataOutRequestParameter):
            raise TypeError("lyDataOutRequestParameter must be an instance of LyDataOutRequestParameter")
        super().__init__()
        self.lyDataOutRequestParameter = lyDataOutRequestParameter
        LyDataOut = ET.SubElement(self.body, f'{{{LY_XML_TEMPURI_NAMESPACE}}}LyDataOut')
        ixmlda_node = ET.SubElement(LyDataOut, 'ixmlda')
        ixmlda_node.text = self.lyDataOutRequestParameter.ixmlda
        itmpnm_node = ET.SubElement(LyDataOut, 'itmpnm')
        itmpnm_node.text = self.lyDataOutRequestParameter.itmpnm
        itotrec_node = ET.SubElement(LyDataOut, 'itotrec')
        itotrec_node.text = self.lyDataOutRequestParameter.itotrec
        ikye_node = ET.SubElement(LyDataOut, 'ikye')
        ikye_node.text = self.lyDataOutRequestParameter.ikye
        icpno_node = ET.SubElement(LyDataOut, 'icpno')
        icpno_node.text = self.lyDataOutRequestParameter.icpno
        idakd_node = ET.SubElement(LyDataOut, 'idakd')
        idakd_node.text = self.lyDataOutRequestParameter.idakd
        ifld_node = ET.SubElement(LyDataOut, 'ifld')
        ifld_node.text = self.lyDataOutRequestParameter.ifld
        idetfields_node = ET.SubElement(LyDataOut, 'idetfields')
        idetfields_node.text = self.lyDataOutRequestParameter.idetfields
        irwhere_node = ET.SubElement(LyDataOut, 'irwhere')
        irwhere_node.text = self.lyDataOutRequestParameter.irwhere
        iwhval_node = ET.SubElement(LyDataOut, 'iwhval')
        iwhval_node.text = self.lyDataOutRequestParameter.iwhval
        irec_node = ET.SubElement(LyDataOut, 'irec')
        irec_node.text = self.lyDataOutRequestParameter.irec
        imode_node = ET.SubElement(LyDataOut, 'imode')
        imode_node.text = self.lyDataOutRequestParameter.imode
        iorder_node = ET.SubElement(LyDataOut, 'iorder')
        iorder_node.text = self.lyDataOutRequestParameter.iorder
        idtorder_node = ET.SubElement(LyDataOut, 'idtorder')
        idtorder_node.text = self.lyDataOutRequestParameter.idtorder
        iswhere_node = ET.SubElement(LyDataOut, 'iswhere')
        iswhere_node.text = self.lyDataOutRequestParameter.iswhere
        isifld_node = ET.SubElement(LyDataOut, 'isifld')
        isifld_node.text = self.lyDataOutRequestParameter.isifld
        Isecgroup_node = ET.SubElement(LyDataOut, 'Isecgroup')
        Isecgroup_node.text = self.lyDataOutRequestParameter.Isecgroup
        iseckindfg_node = ET.SubElement(LyDataOut, 'iseckindfg')
        iseckindfg_node.text = self.lyDataOutRequestParameter.iseckindfg
        iseckind_node = ET.SubElement(LyDataOut, 'iseckind')
        iseckind_node.text = self.lyDataOutRequestParameter.iseckind
        Isecorder_node = ET.SubElement(LyDataOut, 'Isecorder')
        Isecorder_node.text = self.lyDataOutRequestParameter.Isecorder
        Isecrec_node = ET.SubElement(LyDataOut, 'Isecrec')
        Isecrec_node.text = self.lyDataOutRequestParameter.Isecrec

    def __str__(self):
        return ET.tostring(self.root).decode()
    
class LyDataOutRequestParameter():
    def __init__(self, idakd: DataKind, ikye=None, icpno=None, ixmlda=None, itmpnm=None, itotrec="0", ifld=None, idetfields=None, 
                 irwhere=None, iwhval=None, irec="0", imode=None, iorder=None, idtorder=None, iswhere=None, 
                 isifld=None, Isecgroup=None, iseckindfg=None, iseckind=None, Isecorder=None, Isecrec="0"):
        """_summary_

        Args:
            ixmlda (_type_): 轉出的 xml 字串。當 irec 參數值>0 時，固定回傳，第一頁的資料
            itmpnm (_type_): 傳回分頁暫存檔名
            itotrec (_type_): 傳回總筆數
            ikye (_type_): 金鑰字串 
            icpno (_type_): 公司代號
            idakd (DataKind): 資料種類
            ifld (_type_):  轉出單據抬頭\基本資料欄位。(傳空白時回傳全部欄位)
            idetfields (_type_): 轉出單據明細資料欄位。(傳空白時回傳全部欄位) 
            irwhere (_type_): 過濾式欄位 。例 如 ： no='@v1@' and name='@v2@' 
            iwhval (_type_): 過濾式值 (2 個值以上用@#1#@連接) 。例如：A01 @#1#@ A02
            irec (_type_): 每頁筆數： 0=不分頁 >0 筆數
            imode (_type_): 參數設定 。留 30BYTES ，依照轉入的資料種類各自搭配位置
            iorder (_type_): 抬頭資料排序方式 。(需傳入完整語法 ，例如：order by ct_no) 
            idtorder (_type_): 明細資料排序方式 。(需傳入完整語法 ，例如：order by sd_skno) 
            iswhere (bool): 預留(傳空白)
            isifld (bool): 預留(傳空白)
            Isecgroup (_type_): 預留(傳空白)
            iseckindfg (bool): 預留(傳空白)
            iseckind (bool): 預留(傳空白)
            Isecorder (_type_): 預留(傳空白)
            Isecrec (_type_): 預留(傳空白)
        """
        self.ixmlda = ixmlda
        self.itmpnm = itmpnm
        self.itotrec = itotrec
        self.ikye = ikye
        self.icpno = icpno
        self.idakd = idakd
        self.ifld = ifld
        self.idetfields = idetfields
        self.irwhere = irwhere
        self.iwhval = iwhval
        self.irec = irec
        self.imode = imode
        self.iorder = iorder
        self.idtorder = idtorder
        self.iswhere = iswhere
        self.isifld = isifld
        self.Isecgroup = Isecgroup
        self.iseckindfg = iseckindfg
        self.iseckind = iseckind
        self.Isecorder = Isecorder
        self.Isecrec = Isecrec
