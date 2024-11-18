from app import db
Column = db.Column
Model = db.Model 
relationship = db.relationship


class LY0000AODetail(Model):
    """
    凌越資料類別：0000AO 進貨單明細資料
        SD_DATE         	datetime	8	貨單日期            
        SD_NO           	nvarchar	22	貨單編號            
        SD_SKNO         	nvarchar	30	貨品編號            
        SD_NAME         	nvarchar	60	品名            
        SD_PRICE        	float	8	單價       
    """
    __tablename__ = "ly0000AO_detail"
    id = Column(db.Integer , primary_key = True)
    SD_DATE = Column(db.DateTime, comment='貨單日期')
    SD_NO = Column(db.String(22), comment='貨單編號')
    SD_SKNO = Column(db.String(30), comment='貨品編號')
    SD_NAME = Column(db.String(60), comment='品名')
    SD_PRICE = Column(db.Float, comment='單價')


    def __repr__(self):
        return f"<{self.SD_NO}>"

    def __init__(self, **kwargs):
        super(LY0000AODetail, self).__init__(**kwargs)
