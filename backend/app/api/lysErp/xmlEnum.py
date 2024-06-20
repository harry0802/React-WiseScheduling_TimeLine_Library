from enum import Enum

class DataKind(Enum):
    """資料種類 \n
        000000=貨品基本資料 (ProductBasicData) \n
        000004=倉庫基本資料 (WarehouseBasicData) \n
        000005=員工基本資料 (Employee) \n
        000009=目前庫存(廠內倉) (CurrentInventory) \n
        00000D=客戶基本資料 (Customer) \n
        0000AB=廠內製令單 (FactoryProductionOrder) \n
        0000AC=加工製令單 (ProcessingProductionOrder) \n
        0000AD=代工製令單 (SubcontractingProductionOrder) \n
        0000AE=廠內領料單 (FactoryMaterialRequisition) \n
        0000AF=加工領料單 (ProcessingMaterialRequisition) \n
        0000AG=代工領料單 (SubcontractingMaterialRequisition) \n
        0000AH=廠內組合單 (FactoryCombinationOrder) \n
        0000AI=加工組合單 (ProcessingCombinationOrder) \n
        0000AJ=代工組合單 (SubcontractingCombinationOrder) \n
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
    FactoryProductionOrder = '0000AB'
    ProcessingProductionOrder = '0000AC'
    SubcontractingProductionOrder = '0000AD'
    FactoryMaterialRequisition = '0000AE'
    ProcessingMaterialRequisition = '0000AF'
    SubcontractingMaterialRequisition = '0000AG'
    FactoryCombinationOrder = '0000AH'
    ProcessingCombinationOrder = '0000AI'
    SubcontractingCombinationOrder = '0000AJ'
    WarehouseReceipt = '0000B6'
    OutboundOrder = '0000B7'
    FactoryReturnOrder = '0000BJ'
    ProcessingReturnOrder = '0000BK'
    SubcontractingReturnOrder = '0000BL'


class Ixmlda0000AB(Enum):
    """ MP_NO	nvarchar	22	單據編號 \n
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

