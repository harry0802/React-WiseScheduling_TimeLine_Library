from app import db
Column = db.Column
Model = db.Model 
relationship = db.relationship

class LY00000RTitle(Model):
    """
    凌越資料類別：00000R 產品結構抬頭檔(產品)
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
    id = Column(db.Integer , primary_key = True)
    BM_USKNO = Column(db.String(30))
    BM_USKNM = Column(db.String(60))
    BM_STDTIME = Column(db.Float)
    BM_REM = Column(db.Text)
    BM_CODE = Column(db.String(25))
    BM_UNIT = Column(db.String(8))
    BM_SPEC = Column(db.Text)
    BM_NVCH = Column(db.String(30))
    BM_STOP = Column(db.Boolean)
    BM_CHECK = Column(db.Boolean)
    BM_CHECKER = Column(db.String(40))
    BM_CHKDATE = Column(db.DateTime)
    BM_BDATE = Column(db.DateTime)
    BM_STOPDATE = Column(db.DateTime)
    BM_KEY = Column(db.Boolean)
    BM_MAKER = Column(db.String(40))
    BM_CDATE = Column(db.DateTime)
    BM_BIMTYPE = Column(db.Integer)



    def __repr__(self):
        return f"<{self.BM_USKNO}>"

    def __init__(self, **kwargs):
        super(LY00000RTitle, self).__init__(**kwargs)
