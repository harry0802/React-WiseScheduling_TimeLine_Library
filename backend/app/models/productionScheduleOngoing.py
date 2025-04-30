from app import db
from app.service.customType import TimestampDatetime
Column = db.Column
Model = db.Model 


class ProductionScheduleOngoing(Model):
    """"製令單生產時段紀錄
    只記錄製令單生產的開始時間和結束時間，其他製令單狀態的時段不紀錄，主要用於智慧排程的顯示
    """
    __tablename__ = "productionScheduleOngoing"
    id = Column(db.Integer, primary_key=True)
    productionScheduleId = Column(db.Integer, db.ForeignKey('productionSchedule.id'), nullable=True, comment='ProductionSchedule ID')
    startTime = Column(TimestampDatetime, nullable=True, comment='生產開始日期')
    endTime = Column(TimestampDatetime, nullable=True, comment='生產結束日期')
    postponeTime = Column(TimestampDatetime, nullable=True, comment='延遲完成日期。公式：(製令數量 - 已完成數量) / 每小時產能 + 當天日期')
    productionSchedule = db.relationship("ProductionSchedule", backref="productionScheduleOngoing", lazy=True, uselist=False)

    def __init__(self, **kwargs):
        super(ProductionScheduleOngoing, self).__init__(**kwargs)

    def __repr__(self):
        return f"<{self.productionScheduleId} from {self.startTime} to {self.endTime}>"
