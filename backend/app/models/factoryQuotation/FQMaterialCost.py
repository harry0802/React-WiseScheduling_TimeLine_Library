from app import db
Column = db.Column
Model = db.Model 


class FQMaterialCost(Model):
    """"廠內報價中的原物料費用"""
    __tablename__ = "FQMaterialCost"
    id = Column(db.Integer, primary_key=True)
    FQProcessId = Column(db.Integer, db.ForeignKey('FQProcess.id'), nullable=False, comment='對應的報價製程ID')
    materialOptionId = Column(db.Integer, db.ForeignKey('materialOption.id'), comment='原物料類別')
    materialSN = Column(db.String(255), comment='物料編碼')
    materialName = Column(db.String(255), comment='物料名稱')
    unit = Column(db.String(255), comment='單位 (如公斤、件等)')
    weight = Column(db.Float, comment='重量')
    unitPrice = Column(db.Float, comment='單價')
    amount = Column(db.Float, comment='金額')


    def __init__(self, **kwargs):
        super(FQMaterialCost, self).__init__(**kwargs)

    def __repr__(self):
        return f"<物料編碼:{self.materialSN} 物料名稱:{self.materialName}>"
