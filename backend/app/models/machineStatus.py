from app import db
from app.service.customType import TimestampDatetime
Column = db.Column
Model = db.Model 


class MachineStatus(Model):
    """"機台狀態紀錄"""
    __tablename__ = "machineStatus"
    id = Column(db.Integer, primary_key=True)
    machineId = Column(db.Integer, db.ForeignKey('machine.id'), nullable=True, comment='機台ID')
    planStartDate = Column(TimestampDatetime, nullable=True, comment='預計開始日期')
    planEndDate = Column(TimestampDatetime, nullable=True, comment='預計結束日期')
    actualStartDate = Column(TimestampDatetime, nullable=True, comment='實際開始日期')
    actualEndDate = Column(TimestampDatetime, nullable=True, comment='實際結束日期')
    status = Column(db.String(255), nullable=True, comment='機台狀態')
    reason = Column(db.String(255), nullable=True, comment='停機原因')
    product = Column(db.String(255), nullable=True, comment='試模產品')
    machine = db.relationship('Machine', backref='machineStatus', lazy=True)

    def __init__(self, **kwargs):
        super(MachineStatus, self).__init__(**kwargs)

    def __repr__(self):
        return f"<{self.machineId}>"
