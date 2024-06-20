from app import db
Column = db.Column
Model = db.Model 
relationship = db.relationship

class LY0000AB(Model):
    '''
    凌越資料類別：0000AB 廠內製令單抬頭資料
    MP_NO	nvarchar	22	單據編號
    MP_DATE	datetime	8	單據日期
    MP_BDTE	datetime	8	開工日期
    MP_EDTE	datetime	8	預設完工日期
    MP_SDTE	datetime	8	結案日期
    MP_CTNO	nvarchar	10	客戶\廠商編號
    MP_CTNM	nvarchar	60	客戶\廠商名稱
    MP_SKNO	nvarchar	30	成品編號  
    MP_SKNM  	nvarchar	60	成品名稱
    MP_RATE_NM	nvarchar	10	匯率名稱
    MP_RATE	float	8	匯率
    MP_WRNO	nvarchar	10	倉庫編號
    MP_AQTY	float	8	製令數量
    MP_SJTIME	float	8	實際總工時
    MP_FIM_FLG	nvarchar	1	結案否
    MP_FINNUM	float	8	已完工數量
    MP_MAKER	nvarchar	40	製單人員
    MP_CHECK	bit	1	是否確認
    MP_CHECKER	nvarchar	40	確認人員
    MP_CHKDTE	datetime	8	確認日期
    MP_REM	ntext	16	附注
    MP_PH	nvarchar	30	批號編號
    MP_PHNAME	nvarchar	60	批號名稱
    MP_WEIGHT	float	8	重量
    MP_SKDH	nvarchar	25	結構代號
    MP_BZCNO	nvarchar	30	標準製程編號
    MP_ZCNO	nvarchar	22	製程編號
    MP_UNIT	nvarchar	8	單位
    MP_UDEC	int	4	單價小數點位數
    MP_TDEC	int	4	合計小數點位數
    MP_SDEC	int	4	小計小數點位數
    MP_MAENO	nvarchar	10	人工成本種類
    MP_MAENOC	nvarchar	10	製造費用種類
    MP_HUNO	nvarchar	22	母製令單號
    MP_STDTE	datetime	8	實際開始日
    MP_WSNO         	nvarchar     	10	站號            
    MP_WSNM         	nvarchar     	60	工作站名        
    MP_SPEC	ntext		産品規格
    MP_SUMCOST	float	8	總成本
    MP_WKORD        	nvarchar      	4	製程代碼
    MP_WEIGHTTOT	float	8	重量合計
    MP_ETDTE	datetime	8	實際完工日
    MP_NOSW	bit	1	不計庫存
    MP_HUKIND	nvarchar	1	母制令類別
    MP_DPNO	nvarchar	8	部門編號
    MP_PRINT	int	4	列印範圍
    MP_CASE	nvarchar	8	專案代號
    MP_FINNUMB	float	8	約當完工數
    MP_UNFG	bit	1	不良品修復入庫
    MP_ PRICEFG	nvarchar	1	計價種類         
    MP_CHECK2	bit	1	是否審核
    MP_CHECKER2	nvarchar	10	審核人
    MP_CHKDTE2	datetime	8	審核日期
    '''
    __tablename__ = "ly0000AB"
    id = Column(db.Integer , primary_key = True)
    MP_NO = Column(db.String(22))
    MP_DATE = Column(db.DateTime)
    MP_BDTE = Column(db.DateTime)
    MP_EDTE = Column(db.DateTime)
    MP_SDTE = Column(db.DateTime)
    MP_CTNO = Column(db.String(10))
    MP_CTNM = Column(db.String(60))
    MP_SKNO = Column(db.String(30))
    MP_SKNM = Column(db.String(60))
    MP_RATE_NM = Column(db.String(10))
    MP_RATE = Column(db.Float)
    MP_WRNO = Column(db.String(10))
    MP_AQTY = Column(db.Float)
    MP_SJTIME = Column(db.Float)
    MP_FIM_FLG = Column(db.String(1))
    MP_FINNUM = Column(db.Float)
    MP_MAKER = Column(db.String(40))
    MP_CHECK = Column(db.SmallInteger)
    MP_CHECKER = Column(db.String(40))
    MP_CHKDTE = Column(db.DateTime)
    MP_REM = Column(db.Text)
    MP_PH = Column(db.String(30))
    MP_PHNAME = Column(db.String(60))
    MP_WEIGHT = Column(db.Float)
    MP_SKDH = Column(db.String(25))
    MP_BZCNO = Column(db.String(30))
    MP_ZCNO = Column(db.String(22))
    MP_UNIT = Column(db.String(8))
    MP_UDEC = Column(db.Integer)
    MP_TDEC = Column(db.Integer)
    MP_SDEC = Column(db.Integer)
    MP_MAENO = Column(db.String(10))
    MP_MAENOC = Column(db.String(10))
    MP_HUNO = Column(db.String(22))
    MP_STDTE = Column(db.DateTime)
    MP_WSNO = Column(db.String(10))
    MP_WSNM = Column(db.String(60))
    MP_SPEC = Column(db.Text)
    MP_SUMCOST = Column(db.Float)
    MP_WKORD = Column(db.String(4))
    MP_WEIGHTTOT = Column(db.Float)
    MP_ETDTE = Column(db.DateTime)
    MP_NOSW = Column(db.SmallInteger)
    MP_HUKIND = Column(db.String(1))
    MP_DPNO = Column(db.String(8))
    MP_PRINT = Column(db.Integer)
    MP_CASE = Column(db.String(8))
    MP_FINNUMB = Column(db.Float)
    MP_UNFG = Column(db.SmallInteger)
    MP_PRICEFG = Column(db.String(1))
    MP_CHECK2 = Column(db.SmallInteger)
    MP_CHECKER2 = Column(db.String(10))
    MP_CHKDTE2 = Column(db.DateTime)

    def __repr__(self):
        return f"<{self.MP_NO}>"

    def __init__(self, **kwargs):
        super(LY0000AB, self).__init__(**kwargs)
