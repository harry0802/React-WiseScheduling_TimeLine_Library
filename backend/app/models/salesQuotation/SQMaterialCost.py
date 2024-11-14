from app import db
Column = db.Column
Model = db.Model 


class SQMaterialCost(Model):
    """"業務報價中的原物料費用"""
    __tablename__ = "SQMaterialCost"
    id = Column(db.Integer, primary_key=True)
    SQProcessId = Column(db.Integer, db.ForeignKey('SQProcess.id'), nullable=False, comment='對應的報價製程ID')
    materialOptionId = Column(db.Integer, db.ForeignKey('materialOption.id'), comment='原物料類別')
    materialSN = Column(db.String(255), comment='物料編碼')
    materialName = Column(db.String(255), comment='物料名稱')
    unit = Column(db.String(255), comment='單位 (如公斤、件等)')
    weight = Column(db.Float, comment='重量')
    unitPrice = Column(db.Float, comment='單價')
    amount = Column(db.Float, comment='金額')


    def __init__(self, **kwargs):
        super(SQMaterialCost, self).__init__(**kwargs)

    def __repr__(self):
        return f"<不良率:{self.estimatedDefectRate} 原料波動:{self.estimatedMaterialFluctuation}>"
