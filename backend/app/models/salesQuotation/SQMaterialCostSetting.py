from app import db
Column = db.Column
Model = db.Model 


class SQMaterialCostSetting(Model):
    """"業務報價中的原物料費用計算的參數"""
    __tablename__ = "SQMaterialCostSetting"
    id = Column(db.Integer, primary_key=True)
    SQProcessId = Column(db.Integer, db.ForeignKey('SQProcess.id'), nullable=False, comment='對應的報價製程ID')
    estimatedDefectRate = Column(db.Float, comment='預估不良率 (%)')
    estimatedMaterialFluctuation = Column(db.Float, comment='預估原料波動 (%)')
    extractionCost = Column(db.Float, comment='抽料費用')
    processingCost = Column(db.Float, comment='加工費用')
    

    def __init__(self, **kwargs):
        super(SQMaterialCostSetting, self).__init__(**kwargs)

    def __repr__(self):
        return f"<不良率:{self.estimatedDefectRate} 原料波動:{self.estimatedMaterialFluctuation}>"
