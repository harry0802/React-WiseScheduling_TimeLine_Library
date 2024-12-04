from app import db
Column = db.Column
Model = db.Model 


class SQFreight(Model):
    """業務報價中的運費"""
    __tablename__ = "SQFreight"
    id = Column(db.Integer, primary_key=True)
    salesQuotationId = Column(db.Integer, db.ForeignKey('salesQuotation.id'), nullable=False, comment='對應的報價ID')
    deliveryDistance = Column(db.Float, comment='送貨距離 (公里)')
    driverWorkHours = Column(db.Float, comment='司機工時')
    fuelCostPerKM = Column(db.Float, comment='油錢單價 (每公里)')
    estimatedShipment = Column(db.Integer, comment='預估出貨數量')
    amount = Column(db.Float, comment='金額')


    def __init__(self, **kwargs):
        super(SQFreight, self).__init__(**kwargs)

    def __repr__(self):
        return f"<金額:{self.amount}>"
