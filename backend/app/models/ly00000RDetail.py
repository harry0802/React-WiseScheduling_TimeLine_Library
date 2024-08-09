from app import db
Column = db.Column
Model = db.Model 
relationship = db.relationship

class LY00000RDetail(Model):
    """
    凌越資料類別：00000R 產品結構明細表(物料)
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
    id = Column(db.Integer , primary_key = True)
    BD_USKNO = Column(db.String(30))
    BD_DSKNO = Column(db.String(30))
    BD_DSKNM = Column(db.String(60))
    BD_BNUM = Column(db.Float)
    BD_QTY = Column(db.Float)
    BD_RATE = Column(db.Float)
    BD_CJNAME = Column(db.String(100))
    BD_PLACE = Column(db.String(255))
    BD_REM = Column(db.Text)
    BD_WEIGHT = Column(db.Float)
    BD_UNIT = Column(db.String(8))
    BD_UNITFG = Column(db.Boolean)
    BD_RQTY = Column(db.Float)
    BD_CODE = Column(db.String(10))
    BD_MCODE = Column(db.String(10))
    BD_SPEC = Column(db.Text)
    BD_PARTFG = Column(db.Boolean)


    def __repr__(self):
        return f"<{self.BD_DSKNO}>"

    def __init__(self, **kwargs):
        super(LY00000RDetail, self).__init__(**kwargs)
