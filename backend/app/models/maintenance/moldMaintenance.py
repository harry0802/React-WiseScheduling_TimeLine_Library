from app import db
from app.service.customType import TimestampDatetime
Column = db.Column
Model = db.Model 


class MoldMaintenance(Model):
    __tablename__ = "moldMaintenance"
    id = Column(db.Integer, primary_key=True)
    moldSN = Column(db.String(255), nullable=False, comment='模具編號')
    year = Column(db.Integer, nullable=False, comment='年份')
    week = Column(db.Integer, nullable=False, comment='週次')
    maintenanceItem = Column(db.String(255), nullable=False, comment='保養檢查項目')
    inspectionResult = Column(db.String(255), nullable=True, comment='檢查結果。有兩種結果：OK/NG')
    inspector = Column(db.String(255), nullable=True, comment='檢查者')
    inspectionDate = Column(TimestampDatetime, nullable=True, comment='檢查日期')
    reinspectionResult = Column(db.String(255), nullable=True, comment='複查結果。有兩種結果：OK/NG')
    reinspector = Column(db.String(255), nullable=True, comment='複查者')
    reinspectionDate = Column(TimestampDatetime, nullable=True, comment='複查日期')
    approveResult = Column(db.String(255), nullable=True, comment='複查結果。有兩種結果：OK/NG')
    approver = Column(db.String(255), nullable=True, comment='承認者')
    approvalDate = Column(TimestampDatetime, nullable=True, comment='承認日期')

    def __init__(self, **kwargs):
        super(MoldMaintenance, self).__init__(**kwargs)

    def __repr__(self):
        return f"<{self.moldSN}>"
