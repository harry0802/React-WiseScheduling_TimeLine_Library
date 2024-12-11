from app import db
from app.service.customType import TimestampDatetime
Column = db.Column
Model = db.Model 


class ProductionScheduleReportView(Model):
    """"結合生產排程與派工生產的視圖"""
    __tablename__ = "productionScheduleReportView"
    productionScheduleId = Column(db.Integer, comment='生產排程ID')
    machineSN = Column(db.String(255), comment='機台編號')
    workOrderSN = Column(db.String(255), comment='製令單編號')
    workOrderQuantity = Column(db.Integer, comment='製令數量')
    planOnMachineDate = Column(TimestampDatetime, comment='計劃上機日期')
    planFinishDate = Column(TimestampDatetime, comment='計劃完成日期')
    actualOnMachineDate = Column(TimestampDatetime, comment='實際上機日期')
    status = Column(db.String(255), comment='狀態')
    productionReportId = Column(db.Integer, primary_key=True, comment='派工生產ID') # primary_key
    serialNumber = Column(db.Integer, comment='流水號')
    lotName = Column(db.String(255), comment='批號')
    material = Column(db.String(255), comment='材質')
    productionQuantity = Column(db.Integer, comment='生產數量')
    defectiveQuantity = Column(db.Integer, comment='不良數')
    productionDefectiveRate = Column(db.Float, comment='生產不良率')
    unfinishedQuantity = Column(db.Integer, comment='未完成數量')
    colorDifference = Column(db.Integer, comment='色差')
    deformation = Column(db.Integer, comment='變形')
    shrinkage = Column(db.Integer, comment='縮水')
    shortage = Column(db.Integer, comment='短料')
    hole = Column(db.Integer, comment='孔洞')
    bubble = Column(db.Integer, comment='氣泡')
    impurity = Column(db.Integer, comment='雜質')
    pressure = Column(db.Integer, comment='壓痕')
    overflow = Column(db.Integer, comment='溢料')
    flowMark = Column(db.Integer, comment='流痕')
    oilStain = Column(db.Integer, comment='油污')
    burr = Column(db.Integer, comment='毛邊')
    blackSpot = Column(db.Integer, comment='黑點')
    scratch = Column(db.Integer, comment='刮傷')
    encapsulation = Column(db.Integer, comment='封裝')
    other = Column(db.Integer, comment='其他')
    moldCavity = Column(db.Integer, comment='穴數')
    moldingSecond = Column(db.Integer, comment='成型秒數')
    moldModulePerHour = Column(db.Integer, comment='模數/1H')
    workingHours = Column(db.Float, comment='工時')
    planProductionQuantity = Column(db.Integer, comment='預計生產數量')
    productionQuantityDifference = Column(db.Integer, comment='生產數差異值')
    productionYield = Column(db.Float, comment='生產良率')
    machineMode = Column(db.String(255), comment='機台模式')
    machineProductionModule = Column(db.Integer, comment='機台生產模數')
    machineProductionQuantity = Column(db.Integer, comment='機台生產數量')
    machineDefectiveRate = Column(db.Float, comment='實際不良率')
    utilizationRate = Column(db.Float, comment='稼動率')
    productionEfficiency = Column(db.Float, comment='產能效率')
    OEE = Column(db.Float, comment='OEE')
    leader = Column(db.String(255), comment='小班長')
    operator1 = Column(db.String(255), comment='作業人員1')
    operator2 = Column(db.String(255), comment='作業人員2')
    startTime = Column(TimestampDatetime, comment='開始時間')
    endTime = Column(TimestampDatetime, comment='結束時間')
    productSN = Column(db.String(255), comment='產品編號')
    productName = Column(db.String(255), comment='產品名稱')
    processOptionId = Column(db.Integer, comment='製程選項ID')
    processName = Column(db.String(255), comment='製程名稱')
    processId = Column(db.Integer, comment='製程ID')
    moldNos = Column(db.String(255), comment='模具編號')


    def __init__(self, **kwargs):
        super(ProductionScheduleReportView, self).__init__(**kwargs)

    def __repr__(self):
        return f"<{self.workOrderSN}>"
