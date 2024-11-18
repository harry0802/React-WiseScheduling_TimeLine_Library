from app import db
Column = db.Column
Model = db.Model 


class FQInPostProcessingCost(Model):
    """廠內報價中的廠內後製程與檢驗費用"""
    __tablename__ = "FQInPostProcessingCost"
    id = Column(db.Integer, primary_key=True)
    FQProcessId = Column(db.Integer, db.ForeignKey('FQProcess.id'), nullable=False, comment='對應的報價製程ID')
    workSecond = Column(db.Float, comment='工時(秒)')
    unitPrice = Column(db.Float, comment='單價')
    amount = Column(db.Float, comment='金額')


    def __init__(self, **kwargs):
        super(FQInPostProcessingCost, self).__init__(**kwargs)

    def __repr__(self):
        return f"<工時:{self.workSecond} 金額:{self.amount}>"
