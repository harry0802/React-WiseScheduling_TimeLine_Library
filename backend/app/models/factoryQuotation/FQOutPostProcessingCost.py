from app import db
Column = db.Column
Model = db.Model 


class FQOutPostProcessingCost(Model):
    """廠內報價中的委外後製程與檢驗費用"""
    __tablename__ = "FQOutPostProcessingCost"
    id = Column(db.Integer, primary_key=True)
    FQProcessId = Column(db.Integer, db.ForeignKey('FQProcess.id'), nullable=False, comment='對應的報價製程ID')
    unitPrice = Column(db.Float, comment='單價')
    amount = Column(db.Float, comment='金額')


    def __init__(self, **kwargs):
        super(FQOutPostProcessingCost, self).__init__(**kwargs)

    def __repr__(self):
        return f"<單價:{self.unitPrice} 金額:{self.amount}>"
