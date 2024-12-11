from app import db
from app.service.customType import TimestampDatetime
Column = db.Column
Model = db.Model 


class ProductionCost(Model):
    """"智慧成本分析"""
    __tablename__ = "productionCost"
    id = Column(db.Integer, primary_key=True)
    productionReportId = Column(db.Integer, nullable=True, comment='生產報告ID')
    unitProductRevenue = Column(db.Float, nullable=True, comment='單位產品收益。「單位產品收益」=【廠內報價】中的「實際報價」由「產品編號」對應「實際報價」')
    fixedUnitProductCost = Column(db.Float, nullable=True, comment='固定單位產品成本。「固定單位產品成本」=【廠內報價】中的「總成本」由「產品編號」對應「總成本」')
    variableUnitProductDefectRate = Column(db.Float, nullable=True, comment='變動單位產品不良率。「變動單位產品不良率」=【廠內報價中的原物料費用計算的參數】中的「預估不良率」')
    variableUnitProductCost = Column(db.Float, nullable=True, comment='變動單位產品成本（設定之20%不良率）。「變動單位產品不良成本」=「變動單位產品不良率」*「固定單位產品成本」')
    totalUnitProductCost = Column(db.Float, nullable=True, comment='單位產品總成本。「單位產品總成本」= 「固定單位產品成本」+「變動單位產品不良成本」')
    totalRevenue = Column(db.Float, nullable=True, comment='總收益。「總收益」=「製令數量」*「單位產品收益」')
    targetTotalCost = Column(db.Float, nullable=True, comment='目標總成本（含設定之20%不良率）。「目標總成本」=「製令數量」*「單位產品總成本」')
    targetOperatingProfit = Column(db.Float, nullable=True, comment='目標營業利益。「目標營業利益」= 「總收益」-「目標總成本」')
    targetOperatingProfitMargin = Column(db.Float, nullable=True, comment='目標營業利益率。「目標營業利益率」= 「目標營業利益」/ 「目標總成本」')
    maximumDefectQuantity = Column(db.Float, nullable=True, comment='生產不良極限數量，超過就賠錢（20%不良＋超過的不良）。「生產不良極限數」=(「總收益」-(「製令數量」*「固定單立產品成本」))/ 「固定單立產品成本」')
    breakevenTotalQuantity = Column(db.Float, nullable=True, comment='損益平衡總數量(良品數＋不良品數）。「損益平衝總數量」=「製令數量」+「生產不良極限數」')
    breakevenDefectRate = Column(db.Float, nullable=True, comment='損益平衡不良率。「損益平衝不良率」= 「生產不良極限數」/ 「損益平衝總數量」')
    riskControlAlertDefectRate = Column(db.Float, nullable=True, comment='風控警示不良率(原始設定不良率的一半）。「風控警示不良率」= 「變動單位產品不良率」/2')
    actualDefectRate = Column(db.Float, nullable=True, comment='實際不良率（不良數/（良品數＋不良品數）。「實際不良率」= 「不良數」/(「生產良品數量」+「不良數」)')
    yieldRateDifferenceAnalysis = Column(db.Float, nullable=True, comment='良率差異分析（預設不良率-實際不良率）。「良率差異分析」=「變動單位產品不良成本」-「實際不良率」')
    totalProductionQuantity = Column(db.Float, nullable=True, comment='總生產數量（良品數＋不良品數）。「總生產數量」= 「生產良品數量」+「不良數」')
    totalProductionCost = Column(db.Float, nullable=True, comment='總生產成本。「總生產成本」= 「固定單位產品成本」* 「總生產數量」')
    operatingProfit = Column(db.Float, nullable=True, comment='營業利益。「營業利益」=「總收益」- 「總生產成本」')
    operatingProfitMargin = Column(db.Float, nullable=True, comment='營業利益率。「營業利益率」= 「營業利益」/ 「總收益」')
    operatingProfitDifferenceAnalysis = Column(db.Float, nullable=True, comment='營業利益差異分析。「營業利益差異分析」=「目標營業利益」-「營業利益」')
    operatingProfitVariationRate = Column(db.Float, nullable=True, comment='營業利益變異率。「營業利益變異率」=「目標營業利益」/「營業利益差異分析」')
    type = Column(db.String(255), nullable=True, comment='紀錄的類型。即時：real-time，最終：final')
    logTime = Column(TimestampDatetime, nullable=True, comment='寫入資料的時間')

    def __init__(self, **kwargs):
        super(ProductionCost, self).__init__(**kwargs)

    def __repr__(self):
        return f"<{self.productionReportId}>"
