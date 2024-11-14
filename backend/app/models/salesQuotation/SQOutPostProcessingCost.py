from app import db
Column = db.Column
Model = db.Model 


class SQOutPostProcessingCost(Model):
    """業務報價中的委外後製程與檢驗費用"""
    __tablename__ = "SQOutPostProcessingCost"
    id = Column(db.Integer, primary_key=True)
    SQProcessId = Column(db.Integer, db.ForeignKey('SQProcess.id'), nullable=False, comment='對應的報價製程ID')
    unitPrice = Column(db.Float, comment='單價')
    amount = Column(db.Float, comment='金額')


    def __init__(self, **kwargs):
        super(SQOutPostProcessingCost, self).__init__(**kwargs)

    def __repr__(self):
        return f"<單價:{self.unitPrice} 金額:{self.amount}>"
