from app import db
from app.service.customType import TimestampDatetime
Column = db.Column
Model = db.Model 


class QualityInspection(Model):
    __tablename__ = "qualityInspection"

    id = Column(db.Integer, primary_key=True)
    productionScheduleId = db.Column(db.Integer, db.ForeignKey('productionSchedule.id'), nullable=False, comment='生產排程ID')
    inspectionQuantity = Column(db.Integer, nullable=True, comment='檢驗數量')
    goodQuantity = Column(db.Integer, nullable=True, comment='良品數量')
    inspector = Column(db.String(255), nullable=True, comment='檢驗人員')
    inspectionDate = Column(TimestampDatetime, nullable=True, comment='檢驗日期')
    inspectionType = Column(db.String(255), nullable=True, comment='檢驗類型：首件、巡檢')
    productionSchedules = db.relationship('ProductionSchedule', backref='qualityInspection', lazy=True)

    def __init__(self, **kwargs):
        super(QualityInspection, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
