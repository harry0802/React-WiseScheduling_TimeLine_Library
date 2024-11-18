from enum import Enum

class DataKind(Enum):
    """資料種類 \n
        000000=貨品基本資料 (ProductBasicData) \n
        000004=倉庫基本資料 (WarehouseBasicData) \n
        000005=員工基本資料 (Employee) \n
        000009=目前庫存(廠內倉) (CurrentInventory) \n
        00000D=客戶基本資料 (Customer) \n
        00000R=產品結構 (ProductStructure) \n
        0000AB=廠內製令單 (FactoryProductionOrder) \n
        0000AC=加工製令單 (ProcessingProductionOrder) \n
        0000AD=代工製令單 (SubcontractingProductionOrder) \n
        0000AE=廠內領料單 (FactoryMaterialRequisition) \n
        0000AF=加工領料單 (ProcessingMaterialRequisition) \n
        0000AG=代工領料單 (SubcontractingMaterialRequisition) \n
        0000AH=廠內組合單 (FactoryCombinationOrder) \n
        0000AI=加工組合單 (ProcessingCombinationOrder) \n
        0000AJ=代工組合單 (SubcontractingCombinationOrder) \n
        0000AO=進貨單 (PurchaseOrder) \n
        0000B6=入庫單 (WarehouseReceipt) \n
        0000B7=出庫單 (OutboundOrder) \n
        0000BJ=廠內退料單 (FactoryReturnOrder) \n
        0000BK=加工退料單 (ProcessingReturnOrder) \n
        0000BL=代工退料 (SubcontractingReturnOrder) \n
    """
    ProductBasicData = '000000'
    WarehouseBasicData = '000004'
    Employee = '000005'
    CurrentInventory = '000009'
    Customer = '00000D'
    ProductStructure = '00000R'
    FactoryProductionOrder = '0000AB'
    ProcessingProductionOrder = '0000AC'
    SubcontractingProductionOrder = '0000AD'
    FactoryMaterialRequisition = '0000AE'
    ProcessingMaterialRequisition = '0000AF'
    SubcontractingMaterialRequisition = '0000AG'
    FactoryCombinationOrder = '0000AH'
    ProcessingCombinationOrder = '0000AI'
    SubcontractingCombinationOrder = '0000AJ'
    PurchaseOrder = '0000AO'
    WarehouseReceipt = '0000B6'
    OutboundOrder = '0000B7'
    FactoryReturnOrder = '0000BJ'
    ProcessingReturnOrder = '0000BK'
    SubcontractingReturnOrder = '0000BL'


class Ixmlda00000R_Title(Enum):
    """
        BM_USKNO	NVARCHAR	30	成品編號
        BM_USKNM	NVARCHAR	60	成品名稱
        BM_STDTIME	FLOAT	8	標準工時
        BM_REM	NTEXT	16	備注
        BM_CODE	NVARCHAR	25	結構代號
        BM_UNIT	NVARCHAR	8	基本單位
        BM_SPEC	NTEXT		規格
        BM_NVCH	NVARCHAR	30	版本別
        BM_STOP	BIT	1	是否停用
        BM_CHECK	BIT	1	是否審核
        BM_CHECKER	NVARCHAR	40	審核人員
        BM_CHKDATE	DATETIME     	8	審核日期
        BM_BDATE	DATETIME	8	生效日
        BM_STOPDATE	DATETIME     	8	停用日期
        BM_KEY           	BIT	1	是否關鍵配方
        BM_MAKER	NVARCHAR	40	製單人員
        BM_CDATE	DATETIME	8	建檔日期
        BM_BIMTYPE	INT	4	電子簽核狀態
    """
    BM_USKNO = 'BM_USKNO'
    BM_USKNM = 'BM_USKNM'
    BM_STDTIME = 'BM_STDTIME'
    BM_REM = 'BM_REM'
    BM_CODE = 'BM_CODE'
    BM_UNIT = 'BM_UNIT'
    BM_SPEC = 'BM_SPEC'
    BM_NVCH = 'BM_NVCH'
    BM_STOP = 'BM_STOP'
    BM_CHECK = 'BM_CHECK'
    BM_CHECKER = 'BM_CHECKER'
    BM_CHKDATE = 'BM_CHKDATE'
    BM_BDATE = 'BM_BDATE'
    BM_STOPDATE = 'BM_STOPDATE'
    BM_KEY = 'BM_KEY'
    BM_MAKER = 'BM_MAKER'
    BM_CDATE = 'BM_CDATE'
    BM_BIMTYPE = 'BM_BIMTYPE'
    

class Ixmlda00000R_Detail(Enum):
    """
        BD_USKNO	NVARCHAR	30	成品編號
        BD_DSKNO	NVARCHAR	30	原料編號
        BD_DSKNM	NVARCHAR	60	原料名稱
        BD_BNUM	FLOAT	8	成品基數
        BD_QTY	FLOAT	8	成品基數所需要的原料的用量
        BD_RATE	FLOAT	8	成品基數所需原料的損耗率
        BD_CJNAME	NVARCHAR	100	材積
        BD_PLACE	NVARCHAR	255	插件位置
        BD_REM	NTEXT	16	備注
        BD_WEIGHT	FLOAT	8	重量
        BD_UNIT	NVARCHAR	8	基本單位
        BD_UNITFG	BIT	1	是否輔助單位
        BD_RQTY         	FLOAT	8	輔助單位對應基本單位數量
        BD_CODE	NVARCHAR	10	產品結構代碼
        BD_MCODE	NVARCHAR	10	半成品結構代碼
        BD_SPEC	NTEXT		規格
        BD_PARTFG	BIT		是否主要零件
    """
    BD_USKNO = 'BD_USKNO'
    BD_DSKNO = 'BD_DSKNO'
    BD_DSKNM = 'BD_DSKNM'
    BD_BNUM = 'BD_BNUM'
    BD_QTY = 'BD_QTY'
    BD_RATE = 'BD_RATE'
    BD_CJNAME = 'BD_CJNAME'
    BD_PLACE = 'BD_PLACE'
    BD_REM = 'BD_REM'
    BD_WEIGHT = 'BD_WEIGHT'
    BD_UNIT = 'BD_UNIT'
    BD_UNITFG = 'BD_UNITFG'
    BD_RQTY = 'BD_RQTY'
    BD_CODE = 'BD_CODE'
    BD_MCODE = 'BD_MCODE'
    BD_SPEC = 'BD_SPEC'
    BD_PARTFG = 'BD_PARTFG'

    
class Ixmlda0000AB_Title(Enum):
    """ 
        0000AB_廠內製令單抬頭資料檔 \n
        MP_NO	nvarchar	22	單據編號 \n
        MP_DATE	datetime	8	單據日期 \n
        MP_BDTE	datetime	8	開工日期 \n
        MP_EDTE	datetime	8	預設完工日期 \n
        MP_SDTE	datetime	8	結案日期 \n
        MP_CTNO	nvarchar	10	客戶\廠商編號 \n
        MP_CTNM	nvarchar	60	客戶\廠商名稱 \n
        MP_SKNO	nvarchar	30	成品編號   \n
        MP_SKNM  	nvarchar	60	成品名稱 \n
        MP_RATE_NM	nvarchar	10	匯率名稱 \n
        MP_RATE	float	8	匯率 \n
        MP_WRNO	nvarchar	10	倉庫編號 \n
        MP_AQTY	float	8	製令數量 \n
        MP_SJTIME	float	8	實際總工時 \n
        MP_FIM_FLG	nvarchar	1	結案否 \n
        MP_FINNUM	float	8	已完工數量 \n
        MP_MAKER	nvarchar	40	製單人員 \n
        MP_CHECK	bit	1	是否確認 \n
        MP_CHECKER	nvarchar	40	確認人員 \n
        MP_CHKDTE	datetime	8	確認日期 \n
        MP_REM	ntext	16	附注 \n
        MP_PH	nvarchar	30	批號編號 \n
        MP_PHNAME	nvarchar	60	批號名稱 \n
        MP_WEIGHT	float	8	重量 \n
        MP_SKDH	nvarchar	25	結構代號 \n
        MP_BZCNO	nvarchar	30	標準製程編號 \n
        MP_ZCNO	nvarchar	22	製程編號 \n
        MP_UNIT	nvarchar	8	單位 \n
        MP_UDEC	int	4	單價小數點位數 \n
        MP_TDEC	int	4	合計小數點位數 \n
        MP_SDEC	int	4	小計小數點位數 \n
        MP_MAENO	nvarchar	10	人工成本種類 \n
        MP_MAENOC	nvarchar	10	製造費用種類 \n
        MP_HUNO	nvarchar	22	母製令單號 \n
        MP_STDTE	datetime	8	實際開始日 \n
        MP_WSNO         	nvarchar     	10	站號 \n
        MP_WSNM         	nvarchar     	60	工作站名 \n
        MP_SPEC	ntext		産品規格 \n
        MP_SUMCOST	float	8	總成本 \n
        MP_WKORD        	nvarchar      	4	製程代碼 \n
        MP_WEIGHTTOT	float	8	重量合計 \n
        MP_ETDTE	datetime	8	實際完工日 \n
        MP_NOSW	bit	1	不計庫存 \n
        MP_HUKIND	nvarchar	1	母制令類別 \n
        MP_DPNO	nvarchar	8	部門編號 \n
        MP_PRINT	int	4	列印範圍 \n
        MP_CASE	nvarchar	8	專案代號 \n
        MP_FINNUMB	float	8	約當完工數 \n
        MP_UNFG	bit	1	不良品修復入庫 \n
        MP_ PRICEFG	nvarchar	1	計價種類 \n
        MP_CHECK2	bit	1	是否審核 \n
        MP_CHECKER2	nvarchar	10	審核人 \n
        MP_CHKDTE2	datetime	8	審核日期 \n
    """
    MP_NO = 'MP_NO'
    MP_DATE = 'MP_DATE'
    MP_BDTE = 'MP_BDTE'
    MP_EDTE = 'MP_EDTE'
    MP_SDTE = 'MP_SDTE'
    MP_CTNO = 'MP_CTNO'
    MP_CTNM = 'MP_CTNM'
    MP_SKNO = 'MP_SKNO'
    MP_SKNM = 'MP_SKNM'
    MP_RATE_NM = 'MP_RATE_NM'
    MP_RATE = 'MP_RATE'
    MP_WRNO = 'MP_WRNO'
    MP_AQTY = 'MP_AQTY'
    MP_SJTIME = 'MP_SJTIME'
    MP_FIM_FLG = 'MP_FIM_FLG'
    MP_FINNUM = 'MP_FINNUM'
    MP_MAKER = 'MP_MAKER'
    MP_CHECK = 'MP_CHECK'
    MP_CHECKER = 'MP_CHECKER'
    MP_CHKDTE = 'MP_CHKDTE'
    MP_REM = 'MP_REM'
    MP_PH = 'MP_PH'
    MP_PHNAME = 'MP_PHNAME'
    MP_WEIGHT = 'MP_WEIGHT'
    MP_SKDH = 'MP_SKDH'
    MP_BZCNO = 'MP_BZCNO'
    MP_ZCNO = 'MP_ZCNO'
    MP_UNIT = 'MP_UNIT'
    MP_UDEC = 'MP_UDEC'
    MP_TDEC = 'MP_TDEC'
    MP_SDEC = 'MP_SDEC'
    MP_MAENO = 'MP_MAENO'
    MP_MAENOC = 'MP_MAENOC'
    MP_HUNO = 'MP_HUNO'
    MP_STDTE = 'MP_STDTE'
    MP_WSNO = 'MP_WSNO'
    MP_WSNM = 'MP_WSNM'
    MP_SPEC = 'MP_SPEC'
    MP_SUMCOST = 'MP_SUMCOST'
    MP_WKORD = 'MP_WKORD'
    MP_WEIGHTTOT = 'MP_WEIGHTTOT'
    MP_ETDTE = 'MP_ETDTE'
    MP_NOSW = 'MP_NOSW'
    MP_HUKIND = 'MP_HUKIND'
    MP_DPNO = 'MP_DPNO'
    MP_PRINT = 'MP_PRINT'
    MP_CASE = 'MP_CASE'
    MP_FINNUMB = 'MP_FINNUMB'
    MP_UNFG = 'MP_UNFG'
    MP_PRICEFG = 'MP_PRICEFG'
    MP_CHECK2 = 'MP_CHECK2'
    MP_CHECKER2 = 'MP_CHECKER2'
    MP_CHKDTE2 = 'MP_CHKDTE2'

class Ixmlda0000AO_Detail(Enum):
    """
        SD_DATE         	datetime	8	貨單日期            
        SD_NO           	nvarchar	22	貨單編號            
        SD_SKNO         	nvarchar	30	貨品編號            
        SD_NAME         	nvarchar	60	品名            
        SD_PRICE        	float	8	單價   
    """
    SD_DATE = 'SD_DATE'
    SD_NO = 'SD_NO'
    SD_SKNO = 'SD_SKNO'
    SD_NAME = 'SD_NAME'
    SD_PRICE = 'SD_PRICE'
    