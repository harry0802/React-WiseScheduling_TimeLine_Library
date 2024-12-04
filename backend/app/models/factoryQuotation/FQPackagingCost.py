from app import db
Column = db.Column
Model = db.Model 


class FQPackagingCost(Model):
    """廠內報價中的包材費用資訊"""
    __tablename__ = "FQPackagingCost"
    id = Column(db.Integer, primary_key=True)
    FQProcessId = Column(db.Integer, db.ForeignKey('FQProcess.id'), nullable=False, comment='對應的報價製程ID')
    packagingType = Column(db.String(50), comment='包材種類')
    materialSN = Column(db.String(255), comment='物料編碼')
    materialName = Column(db.String(255), comment='物料名稱')
    unit = Column(db.String(255), comment='單位 (如件、公斤等)')
    quantity = Column(db.Float, comment='數量')
    capacity = Column(db.Float, comment='容量')
    bagsPerKg = Column(db.Float, comment='每公斤幾個袋子')
    unitPrice = Column(db.Float, comment='單價')
    amount = Column(db.Float, comment='金額')



    def __init__(self, **kwargs):
        super(FQPackagingCost, self).__init__(**kwargs)

    def __repr__(self):
        return f"<包材種類:{self.packagingType}>"
