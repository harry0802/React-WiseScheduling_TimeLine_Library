from itertools import groupby
import os
from datetime import datetime, timedelta
import sys
import pytz
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.productionCost import ProductionCost
from app.models.views.productionScheduleReportView import ProductionScheduleReportView
from app.models.factoryQuotation.factoryQuotation import FactoryQuotation
from app.models.factoryQuotation.FQProcess import FQProcess
from app.models.factoryQuotation.FQMaterialCostSetting import FQMaterialCostSetting
from app.api.option.optionEnum import WorkOrderStatusEnum
from app.service.utils_iot import get_current_modulus_from_injector
from app.api.productionCost.schemas import ProductionCostSchema
from dotenv import load_dotenv
load_dotenv()

TZ = os.getenv("TIMEZONE","Asia/Taipei")


def calculate_costs(ProductionScheduleReportView_db, data_type):
    # Get FactoryQuotation by productSNs
    query = FactoryQuotation.query
    query = query.with_entities(*FactoryQuotation.__table__.columns, FQMaterialCostSetting.estimatedDefectRate)
    query = query.join(FQProcess, FactoryQuotation.id == FQProcess.factoryQuotationId)
    query = query.join(FQMaterialCostSetting, FQProcess.id == FQMaterialCostSetting.FQProcessId)
    query = query.filter(FactoryQuotation.productSN == ProductionScheduleReportView_db.productSN)
    query = query.order_by(FactoryQuotation.createDate.desc())
    factoryQuotation_db = query.first()
    
    productionCost_db = ProductionCost()
    productionCost_db.productionReportId = ProductionScheduleReportView_db.productionReportId
    # 「單位產品收益」=【廠內報價】中的「實際報價」，由「產品編號」對應「實際報價」
    # 若有多筆結果，以最新的一筆為準
    unitProductRevenue = round(factoryQuotation_db.actualQuotation, 3) if factoryQuotation_db and factoryQuotation_db.actualQuotation else None
    
    # 「固定單位產品成本」=【廠內報價】中的「總成本」，由「產品編號」對應「總成本」
    fixedUnitProductCost = None
    if factoryQuotation_db:
        # 「管銷研金額」= 成本小計(不含管銷研) * 管銷研百分比
        overheadRnd_amount = factoryQuotation_db.subtotalCostWithoutOverhead * factoryQuotation_db.overheadRnd
        # 「利潤金額」= (成本小計(不含管銷研) + 「管銷研金額」) * 利潤百分比
        profit_amount = (factoryQuotation_db.subtotalCostWithoutOverhead + overheadRnd_amount) * factoryQuotation_db.profit
        # 成本小計(含管銷研) = 成本小計(不含管銷研) + 管銷研金額 + 利潤金額
        subtotalCostWithOverhead = factoryQuotation_db.subtotalCostWithoutOverhead + overheadRnd_amount + profit_amount
        # 風險金額 = 成本小計(含管銷研) * 風險百分比
        risk_amount = subtotalCostWithOverhead * factoryQuotation_db.risk
        # 總成本 = 成本小計(含管銷研) + 風險金額
        fixedUnitProductCost = subtotalCostWithOverhead + risk_amount
        fixedUnitProductCost = round(fixedUnitProductCost, 3)
    
    # 「變動單位產品不良率」=【廠內報價】中的「預估不良率」
    variableUnitProductDefectRate = round(factoryQuotation_db.estimatedDefectRate, 3) if factoryQuotation_db and factoryQuotation_db.estimatedDefectRate else None
    
    # 「變動單位產品不良成本」=「變動單位產品不良率」*「固定單位產品成本」
    variableUnitProductCost = round(variableUnitProductDefectRate * fixedUnitProductCost, 3) if variableUnitProductDefectRate and fixedUnitProductCost else None

    # 「單位產品總成本」= 「固定單位產品成本」+「變動單位產品不良成本」
    totalUnitProductCost = round(fixedUnitProductCost + variableUnitProductCost, 3) if fixedUnitProductCost and variableUnitProductCost else None

    # ========== 最終成本和即時成本的差異 ==========
    maximumDefectQuantity = None
    breakevenTotalQuantity = None
    breakevenDefectRate = None
    riskControlAlertDefectRate = None
    actualDefectRate = None
    if data_type == "real-time":
        # 「即時總生產數量」=「機台生產模數」*「穴數」
        start_current_modulus, end_current_modulus = get_current_modulus_from_injector(ProductionScheduleReportView_db.machineSN, 
                                                            ProductionScheduleReportView_db.startTime, 
                                                            datetime.now(pytz.timezone('UTC')))
        current_modulus = end_current_modulus - start_current_modulus if end_current_modulus and start_current_modulus else None
        totalProductionQuantity = current_modulus * ProductionScheduleReportView_db.moldCavity if current_modulus and ProductionScheduleReportView_db.moldCavity else None
        # 「即時總收益」= 「即時總生產數量」*「單位產品收益」
        totalRevenue = totalProductionQuantity * unitProductRevenue if totalProductionQuantity and unitProductRevenue else None
        # 「即時目標總成本」= 「即時總生產數量」*「單位產品總成本』
        targetTotalCost = totalProductionQuantity * totalUnitProductCost if totalProductionQuantity and totalUnitProductCost else None
        # 「即時目標營業利益」= 「即時總收益」-「即時目標總成本」
        targetOperatingProfit = totalRevenue - targetTotalCost if totalRevenue and targetTotalCost else None
        # 「即時目標營業利益率」= 「即時目標營業利益」/ 「即時目標總成本」
        targetOperatingProfitMargin = targetOperatingProfit / targetTotalCost if targetOperatingProfit and targetTotalCost else None
        # 「實際不良率」= 「不良數」/(「即時總生產數量」+「不良數」)
        actualDefectRate = ProductionScheduleReportView_db.defectiveQuantity / (totalProductionQuantity + ProductionScheduleReportView_db.defectiveQuantity) \
            if totalProductionQuantity and ProductionScheduleReportView_db.defectiveQuantity else 0
    elif data_type == "final":
        # 「總收益」=「製令數量」*「單位產品收益」
        totalRevenue = ProductionScheduleReportView_db.workOrderQuantity * unitProductRevenue if ProductionScheduleReportView_db.workOrderQuantity and unitProductRevenue else None
        # 「目標總成本」=「製令數量」*「單位產品總成本」
        targetTotalCost = ProductionScheduleReportView_db.workOrderQuantity * totalUnitProductCost if ProductionScheduleReportView_db.workOrderQuantity and totalUnitProductCost else None
        # 「目標營業利益」= 「總收益」-「目標總成本」
        targetOperatingProfit = totalRevenue - targetTotalCost if totalRevenue and targetTotalCost else None
        # 「目標營業利益率」= 「目標營業利益」/ 「目標總成本」
        targetOperatingProfitMargin = targetOperatingProfit / targetTotalCost if targetOperatingProfit and targetTotalCost else None
        # 「生產不良極限數」=(「總收益」-(「製令數量」*「固定單位產品成本」))/ 「固定單位產品成本」
        maximumDefectQuantity = (totalRevenue - (ProductionScheduleReportView_db.workOrderQuantity * fixedUnitProductCost)) / fixedUnitProductCost \
            if totalRevenue and ProductionScheduleReportView_db.workOrderQuantity and fixedUnitProductCost else None
        # 「損益平衝總數量」=「製令數量」+「生產不良極限數」
        breakevenTotalQuantity = ProductionScheduleReportView_db.workOrderQuantity + maximumDefectQuantity if ProductionScheduleReportView_db.workOrderQuantity and maximumDefectQuantity else None
        # 「損益平衝不良率」= 「生產不良極限數」/ 「損益平衝總數量」
        breakevenDefectRate = maximumDefectQuantity / breakevenTotalQuantity if maximumDefectQuantity and breakevenTotalQuantity else None
        # 「風控警示不良率」= 「變動單位產品不良率」/2
        riskControlAlertDefectRate = variableUnitProductDefectRate / 2 if variableUnitProductDefectRate else None
        # 「總生產數量」= 「生產良品數量」+「不良數」
        totalProductionQuantity = ProductionScheduleReportView_db.productionQuantity + ProductionScheduleReportView_db.defectiveQuantity \
            if ProductionScheduleReportView_db.productionQuantity and ProductionScheduleReportView_db.defectiveQuantity else None
        # 「實際不良率」= 「不良數」/(「生產良品數量」+「不良數」)
        actualDefectRate = ProductionScheduleReportView_db.defectiveQuantity / (ProductionScheduleReportView_db.productionQuantity + ProductionScheduleReportView_db.defectiveQuantity) \
            if ProductionScheduleReportView_db.productionQuantity and ProductionScheduleReportView_db.defectiveQuantity else 0
    totalRevenue = round(totalRevenue, 3) if totalRevenue else None
    targetTotalCost = round(targetTotalCost, 3) if targetTotalCost else None
    targetOperatingProfitMargin = round(targetOperatingProfitMargin, 3) if targetOperatingProfitMargin else None
    maximumDefectQuantity = round(maximumDefectQuantity, 3) if maximumDefectQuantity else None
    breakevenDefectRate = round(breakevenDefectRate, 3) if breakevenDefectRate else None
    riskControlAlertDefectRate = round(riskControlAlertDefectRate, 3) if riskControlAlertDefectRate else None
    actualDefectRate = round(actualDefectRate, 3) if actualDefectRate else None
    # ==========The end of 最終成本和即時成本的差異 ==========

    # 「良率差異分析」=「變動單位產品不良成本」-「實際不良率」
    yieldRateDifferenceAnalysis = variableUnitProductCost - actualDefectRate if variableUnitProductCost and actualDefectRate else None

    # 「總生產成本」= 「固定單位產品成本」* 「總生產數量」
    totalProductionCost = round(fixedUnitProductCost * totalProductionQuantity, 3) if fixedUnitProductCost and totalProductionQuantity else None

    # 「營業利益」=「總收益」- 「總生產成本」
    operatingProfit = totalRevenue - totalProductionCost if totalRevenue and totalProductionCost else None

    #  「營業利益率」= 「營業利益」/ 「總收益」
    operatingProfitMargin = round(operatingProfit / totalRevenue, 3) if operatingProfit and totalRevenue else None

    # 「營業利益差異分析」=「目標營業利益」-「營業利益」
    operatingProfitDifferenceAnalysis = targetOperatingProfit - operatingProfit if targetOperatingProfit and operatingProfit else None
        
    # 「營業利益變異率」=「目標營業利益」/「營業利益差異分析」
    operatingProfitVariationRate = round(targetOperatingProfit / operatingProfitDifferenceAnalysis, 3) if operatingProfitDifferenceAnalysis else None

    productionCost_db.unitProductRevenue = unitProductRevenue
    productionCost_db.fixedUnitProductCost = fixedUnitProductCost
    productionCost_db.variableUnitProductDefectRate = variableUnitProductDefectRate
    productionCost_db.variableUnitProductCost = variableUnitProductCost
    productionCost_db.totalUnitProductCost = totalUnitProductCost
    productionCost_db.totalRevenue = totalRevenue
    productionCost_db.targetTotalCost = targetTotalCost
    productionCost_db.targetOperatingProfit = targetOperatingProfit
    productionCost_db.targetOperatingProfitMargin = targetOperatingProfitMargin
    productionCost_db.maximumDefectQuantity = maximumDefectQuantity
    productionCost_db.breakevenTotalQuantity = breakevenTotalQuantity
    productionCost_db.breakevenDefectRate = breakevenDefectRate
    productionCost_db.riskControlAlertDefectRate = riskControlAlertDefectRate
    productionCost_db.actualDefectRate = actualDefectRate
    productionCost_db.yieldRateDifferenceAnalysis = yieldRateDifferenceAnalysis
    productionCost_db.totalProductionQuantity = totalProductionQuantity
    productionCost_db.totalProductionCost = totalProductionCost
    productionCost_db.operatingProfit = operatingProfit
    productionCost_db.operatingProfitMargin = operatingProfitMargin
    productionCost_db.operatingProfitDifferenceAnalysis = operatingProfitDifferenceAnalysis
    productionCost_db.operatingProfitVariationRate = operatingProfitVariationRate
    productionCost_db.type = data_type
    productionCost_db.logTime = datetime.now(pytz.timezone(TZ))
    return productionCost_db


class ProductionCostService:
    @staticmethod
    def get_productCosts(page, size, sort, dataType, productionScheduleId=None):
        try:
            # Get the current productionSchedule
            query = ProductionScheduleReportView.query
            query = query.with_entities(*ProductionCost.__table__.columns, *ProductionScheduleReportView.__table__.columns)
            query = query.join(ProductionCost, ProductionCost.productionReportId == ProductionScheduleReportView.productionReportId, isouter = True) # left outer join
            if dataType != "all":
                query = query.filter(ProductionScheduleReportView.serialNumber == 0) if dataType == "mother" else query.filter(ProductionScheduleReportView.serialNumber > 0)
            query = query.filter(ProductionScheduleReportView.productionScheduleId == productionScheduleId) if productionScheduleId else query
            query = query.filter(ProductionScheduleReportView.planOnMachineDate > datetime.now(pytz.utc) - timedelta(weeks=1))

            if hasattr(ProductionCost, sort):
                query = query.order_by(getattr(ProductionCost, sort).desc())
            elif hasattr(ProductionScheduleReportView, sort):
                query = query.order_by(getattr(ProductionScheduleReportView, sort).desc())
            else:
                query = query.order_by(ProductionScheduleReportView.productionReportId.desc())
                
            if size:
                pagination = query.paginate(page=page, per_page=size)
                productionCost_db = pagination.items
                total_pages = pagination.pages
                total_count = pagination.total
            else:
                productionCost_db = query.all()
                total_pages = 1
                total_count = len(productionCost_db)

            if not (productionCost_db):
                productionCost_db = []
            
            productionCost_dump = ProductionCostSchema().dump(productionCost_db, many=True)

            resp = message(True, "productionCost data sent")
            resp["data"] = productionCost_dump
            resp["meta"] = {
                "page": page,
                "size": size,
                "sort": sort if hasattr(ProductionCost, sort) else "id",
                "total_pages": total_pages,
                "total_count": total_count,
            }
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        

    @staticmethod
    def create_productionCost_realTime():
        try:
            # 抓出所有進行中的生產排程，只抓子批
            query = ProductionScheduleReportView.query
            query = query.filter(ProductionScheduleReportView.status == WorkOrderStatusEnum.ON_GOING.value)
            query = query.filter(ProductionScheduleReportView.serialNumber > 0)
            query = query.filter(ProductionScheduleReportView.endTime == None)
            ProductionScheduleReportView_db_list = query.all()

            # group by productionScheduleId and get the latest productionReportId
            ProductionScheduleReportView_db_list = sorted(ProductionScheduleReportView_db_list, key=lambda x: x.productionScheduleId)
            ProductionScheduleReportView_db_list = {k: list(v) for k, v in groupby(ProductionScheduleReportView_db_list, key=lambda x: x.productionScheduleId)}
            ProductionScheduleReportView_db_list = [max(v, key=lambda x: x.productionReportId) for k, v in ProductionScheduleReportView_db_list.items()]

            # 每15分鐘計算一次成本，所以要先取得實際上機時間，並計算當前時間是否為15分鐘間隔
            # 如果是，則計算成本。如果不是，則不計算成本
            for ProductionScheduleReportView_db in ProductionScheduleReportView_db_list:
                startTime = ProductionScheduleReportView_db.startTime
                now = datetime.now(pytz.utc)
                minutes_difference = (now - startTime).total_seconds() // 60
                if minutes_difference % 15 == 0:
                    productionCost_db = ProductionCost()
                    productionCost_db = calculate_costs(ProductionScheduleReportView_db, "real-time")
                    db.session.add(productionCost_db)
                    db.session.commit()

        # exception without handling should raise to the caller
        except Exception as error:
            raise error

        
    @staticmethod
    def create_productionCost_final(productionReportId):
        try:
            # Get child lot from ProductionScheduleReportView by productionReportId
            query = ProductionScheduleReportView.query
            query = query.filter(ProductionScheduleReportView.productionReportId == productionReportId)
            ProductionScheduleReportView_db = query.first()

            # Check if the final productioncost is already in DB
            query = ProductionCost.query
            query = query.filter(ProductionCost.productionReportId == productionReportId)
            query = query.filter(ProductionCost.type == "final")
            productionCost_db = query.first()
            if productionCost_db is None:
                productionCost_db = ProductionCost()
                productionCost_db = calculate_costs(ProductionScheduleReportView_db, "final")
                db.session.add(productionCost_db)
                db.session.commit()

        # exception without handling should raise to the caller
        except Exception as error:
            raise error
