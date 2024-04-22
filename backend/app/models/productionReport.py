from app import db
from sqlalchemy.orm import synonym
from app.service.customType import TimestampDatetime
Column = db.Column
Model = db.Model 
relationship = db.relationship

"""
| Column | Chinese | Type | Description | Acceptable Values |
| --- | --- | --- | --- | --- |
| startTime | 開始時間(manual) | TIMESTAMP | 開始時間 |  |
| machineSN | 機台號碼(from PdSch) | string | 機台號碼 | /[ABCD]?[1][0-9]/ |
| workOrderSN | 製令單號(單據編號)(from PdSch) | string | 製令單號(not null) |  |
| serialNumber | 流水號 | int | 流水號(not null) | [0, 1000) |
| lotName | 批號(formula) | string | 批號 |  |
| workOrderQuantity | 製令數量(from PdSch or manual) | int | 製令數量(not null) | (0, 1000000) |
| material | 材質 | string(manual) | 材質 |  |
| moldCavity | 穴數 | int(from PdSch) | 穴數 | (0, 1000) |
| leader | 產線管理者小班長(manual) | string | 產線管理者小班長 | [{leader:String, log_time: TIMESTAMP}] |
| operator1 | 作業人員(一)(manual) | string | 作業人員(一)(not null) |  |
| operator2 | 作業人員(二)(manual) | string | 作業人員(二) |  |
| productionQuantity | 生產數量(manual) | int | 生產數量 | [0, 1000000) |
| unfinishedQuantity | 未完成數量(formula) | int | 未完成數量 | [0, 1000000) |
| colorDifference | 色差(manual) | int | 色差(count) | [0, 1000000) |
| deformation | 變形(manual) | int | 變形(count) | [0, 1000000) |
| shrinkage | 縮水(manual) | int | 縮水(count) | [0, 1000000) |
| shortage | 缺料(manual) | int | 缺料(count) | [0, 1000000) |
| hole | 破洞(manual) | int | 破洞(count) | [0, 1000000) |
| bubble | 氣泡(manual) | int | 氣泡(count) | [0, 1000000) |
| impurity | 雜質(manual) | int | 雜質(count) | [0, 1000000) |
| pressure | 壓克(manual) | int | 壓克(count) | [0, 1000000) |
| overflow | 溢料(manual) | int | 溢料(count) | [0, 1000000) |
| flowMark | 流痕(manual) | int | 流痕(count) | [0, 1000000) |
| oilStain | 油污(manual) | int | 油污(count) | [0, 1000000) |
| burr | 毛邊(manual) | int | 毛邊(count) | [0, 1000000) |
| blackSpot | 黑點(manual) | int | 黑點(count) | [0, 1000000) |
| scratch | 刮傷(manual) | int | 刮傷(count) | [0, 1000000) |
| encapsulation | 包封(manual) | int | 包封(count) | [0, 1000000) |
| other | 其它(manual) | int | 其它(count) | [0, 1000000) |
| defectiveQuantity | 不良數(formula) | int | 不良數(total count) | [0, 1000000) |
| moldModulePerHour | 模數/1H(formula) | int | 模數/1H | (0, 3600] |
| moldingSecond | 成型秒數(from PdSch) | int | 成型秒數 | (0, 86400] |
| endTime | 結束時間(manual) | TIMESTAMP | 結束時間 |  |
| comment | 備註(manual) | string | 備註 |  |
| workingHours | 工時(formula) | decimal | 工時 | (0, 24] |
| planProductionQuantity | 預計生產數量(formula) | int | 預計生產數量 | (0, 1000000) |
| productionQuantityDifference | 生產數差異值(formula) | int | 生產數差異值 | (-1000000, 1000000) |
| productionDefectiveRate | 生產不良率(formula) | decimal | 生產不良率 | [0, 1] |
| productionYield | 生產良率(formula) | decimal | 生產良率 | [0, 1] |
| from IoT record | ----------------- | ----------------- | ----------------- | ----------------- |
| machineMode | 機台模式(from IoT record) | string | 機台模式 | ["自動", "半自動", "手動"] |
| machineProductionModule | 機台生產模數(from IoT record) | int | 機台生產模數 | [0, 1000000) |
| machineProductionQuantity | 機台生產數量(formula) | int | 機台生產數量 | [0, 1000000) |
| machineDefectiveRate | 實際不良率(產能漏失率)(formula) | decimal | 實際不良率 | [0, 1] |
| utilizationRate | 稼動率(formula) | decimal | 稼動率 | [0, 1] |
| productionEfficiency | 產能效率(formula) | decimal | 產能效率 | [0, 1] |
| OEE | OEE(formula) | decimal | OEE | [0, 1] |

"""

class ProductionReport(Model):
    __tablename__ = "productionReport"
    id = Column(db.Integer , primary_key = True)
    productionReport_id = synonym("id") # 用於Schema出現相同名稱時的區別
    startTime = Column(TimestampDatetime)
    machineSN = Column(db.String(255))
    workOrderSN = Column(db.String(255))
    serialNumber = Column(db.Integer)
    lotName = Column(db.String(255))
    workOrderQuantity = Column(db.Integer)
    material = Column(db.String(255))
    moldCavity = Column(db.Integer)
    leader = Column(db.String(64000))
    operator1 = Column(db.String(255))
    operator2 = Column(db.String(255))
    productionQuantity = Column(db.Integer)
    unfinishedQuantity = Column(db.Integer)
    colorDifference = Column(db.Integer)
    deformation = Column(db.Integer)
    shrinkage = Column(db.Integer)
    shortage = Column(db.Integer)
    hole = Column(db.Integer)
    bubble = Column(db.Integer)
    impurity = Column(db.Integer)
    pressure = Column(db.Integer)
    overflow = Column(db.Integer)
    flowMark = Column(db.Integer)
    oilStain = Column(db.Integer)
    burr = Column(db.Integer)
    blackSpot = Column(db.Integer)
    scratch = Column(db.Integer)
    encapsulation = Column(db.Integer)
    other = Column(db.Integer)
    defectiveQuantity = Column(db.Integer)
    moldModulePerHour = Column(db.Integer)
    moldingSecond = Column(db.Integer)
    endTime = Column(TimestampDatetime)
    comment = Column(db.String(255))
    workingHours = Column(db.Float)
    planProductionQuantity = Column(db.Integer)
    productionQuantityDifference = Column(db.Integer)
    productionDefectiveRate = Column(db.Float)
    productionYield = Column(db.Float)
    machineMode = Column(db.String(255))
    machineProductionModule = Column(db.Integer)
    machineProductionQuantity = Column(db.Integer)
    machineDefectiveRate = Column(db.Float)
    utilizationRate = Column(db.Float)
    productionEfficiency = Column(db.Float)
    OEE = Column(db.Float)




    def __init__(self, **kwargs):
        super(ProductionReport, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
