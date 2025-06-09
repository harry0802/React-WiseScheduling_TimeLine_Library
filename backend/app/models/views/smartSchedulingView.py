from app import db
from app.service.customType import TimestampDatetime
Column = db.Column
Model = db.Model 


class SmartSchedulingView(Model):
    """"智慧排程的視圖"""
    __tablename__ = "smartSchedulingView"
    # sqlalchemy.exc.ArgumentError: Mapper Mapper[SmartSchedulingView(smartSchedulingView)] could not assemble any primary key columns for mapped table 'smartSchedulingView'
    fakeId = Column(db.Integer(), primary_key=True, comment='假的主鍵')
    timeLineStatus = Column(db.String(255), comment='時間軸狀態')
    machineStatusId = Column(db.Integer(), comment='機台狀態ID')
    productionArea = Column(db.String(255), comment='機台區域')
    machineSN = Column(db.String(255), comment='機台編號')
    machineStatusPlanStartTime = Column(TimestampDatetime, comment='機台狀態預計開始時間')
    machineStatusPlanEndTime = Column(TimestampDatetime, comment='機台狀態預計結束時間')
    machineStatusActualStartTime = Column(TimestampDatetime, comment='機台狀態實際開始時間')
    machineStatusActualEndTime = Column(TimestampDatetime, comment='機台狀態實際結束時間')
    machineStatusReason = Column(db.String(255), comment='機台狀態原因')
    machineStatusProduct = Column(db.String(255), comment='機台狀態-試調的產品')
    productionScheduleId = Column(db.String(255), comment='計畫排程表ID')
    planOnMachineDate = Column(TimestampDatetime, comment='製令單預計上機日')
    planFinishDate = Column(TimestampDatetime, comment='製令單預計完成日')
    actualOnMachineDate = Column(TimestampDatetime, comment='製令單實際上機日')
    actualFinishDate = Column(TimestampDatetime, comment='製令單實際完成日')
    postponeTime = Column(db.String(255), comment='製令單延後時間')
    workOrderSN = Column(db.String(255), comment='製令單號')
    productSN = Column(db.String(255), comment='產品編號')
    productName = Column(db.String(255), comment='產品名稱')
    workOrderQuantity = Column(db.String(255), comment='製令單數量')
    productionQuantity = Column(db.String(255), comment='生產數量')
    processName = Column(db.String(255), comment='製程名稱')
    productionScheduleStatus = Column(db.String(255), comment='製令單狀態')

    def __init__(self, **kwargs):
        super(SmartSchedulingView, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
