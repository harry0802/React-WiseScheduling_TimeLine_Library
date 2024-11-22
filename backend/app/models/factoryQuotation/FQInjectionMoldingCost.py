from app import db
Column = db.Column
Model = db.Model 


class FQInjectionMoldingCost(Model):
    """廠內報價中的成型與生產加工費用資訊"""
    __tablename__ = "FQInjectionMoldingCost"
    id = Column(db.Integer, primary_key=True)
    FQProcessId = Column(db.Integer, db.ForeignKey('FQProcess.id'), nullable=False, comment='對應的報價製程ID')
    machineId = Column(db.Integer, db.ForeignKey('machine.id'), comment='對應的機台ID')
    workHoursRatio = Column(db.Float, comment='工時比例 (%)')
    defectiveRate = Column(db.Float, comment='不良率 (%)')
    cycleTime = Column(db.Float, comment='成型週期 (秒)')
    packageTime = Column(db.Float, comment='灌包工時 (秒)')
    moldCavity = Column(db.Integer, comment='穴數')
    unitPrice = Column(db.Float, comment='單價')
    amount = Column(db.Float, comment='金額')
    subtotal = Column(db.Float, comment='小計')
    electricityCost = Column(db.Float, comment='電費')

    machines = db.relationship('Machine', backref='FQInjectionMoldingCost', lazy=True)


    def __init__(self, **kwargs):
        super(FQInjectionMoldingCost, self).__init__(**kwargs)

    def __repr__(self):
        return f"<小計:{self.subtotal} 電費:{self.electricityCost}>"
