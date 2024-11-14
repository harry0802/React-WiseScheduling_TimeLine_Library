from app import db
Column = db.Column
Model = db.Model 


class Machine(Model):
    __tablename__ = "machine"
    id = Column(db.Integer, primary_key=True)
    productionArea = Column(db.String(255), nullable=True, comment='機台區域')
    machineSN = Column(db.String(255), nullable=True, comment='機台編號')
    singleOrDoubleColor = Column(db.String(255), nullable=True, comment='單射或雙射')
    tonnage = Column(db.String(255), nullable=True, comment='噸數')
    moldTrialCost = Column(db.Integer, nullable=True, comment='廠內試模費率 8hr')
    electricityCostPerSec = Column(db.Float, nullable=True, comment='每秒電費')

    def __init__(self, **kwargs):
        super(Machine, self).__init__(**kwargs)

    def __repr__(self):
        return f"<{self.machineSN}>"
