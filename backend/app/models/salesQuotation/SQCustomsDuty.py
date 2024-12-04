from app import db
Column = db.Column
Model = db.Model 


class SQCustomsDuty(Model):
    """業務報價中的貨運與關稅"""
    __tablename__ = "SQCustomsDuty"
    id = Column(db.Integer, primary_key=True)
    salesQuotationId = Column(db.Integer, db.ForeignKey('salesQuotation.id'), nullable=False, comment='對應的報價ID')
    feeType = Column(db.String(255), comment='貨運/關稅')
    freight = Column(db.Float, comment='運費')
    estimatedShipment = Column(db.Integer, comment='預估出貨數量')
    amount = Column(db.Float, comment='金額')

    def __init__(self, **kwargs):
        super(SQCustomsDuty, self).__init__(**kwargs)

    def __repr__(self):
        return f"<金額:{self.amount}>"
