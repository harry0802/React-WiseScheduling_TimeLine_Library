// CostAnalysisService.js

/*
 MaterialCost：處理原物料、蒂頭、色母等材料的計算，考慮到重量和波動率。
 PackagingCost：根據不同單位和容量計算包材費用。
 MoldingCost：包括機台費用、不良率、成型週期等，計算成型加工費用。
 PostProcessingCost：分別計算廠內和委外的後製程費用。
 AdditionalFees：依據運輸距離、油價、預估出貨數量等計算附加費用。
 ProfitManagement：計算管銷研費用、風險金額、利潤金額等，得出最終報價金額。
*/

/**
 * 主計算服務，整合各個領域邏輯進行總計成本分析。
 * @param {MaterialCost} materialCost - 原物料費用計算領域
 * @param {PackagingCost} packagingCost - 包材費用計算領域
 * @param {MoldingCost} moldingCost - 成型加工費用計算領域
 * @param {PostProcessingCost} postProcessingCost - 後製程費用計算領域
 * @param {AdditionalFees} additionalFees - 附加費用計算領域
 * @param {ProfitManagement} profitManagement - 利潤管理費用計算領域
 */
class CostAnalysisService {
  constructor(
    materialCost,
    packagingCost,
    moldingCost,
    postProcessingCost,
    additionalFees,
    profitManagement
  ) {
    this.materialCost = materialCost;
    this.packagingCost = packagingCost;
    this.moldingCost = moldingCost;
    this.postProcessingCost = postProcessingCost;
    this.additionalFees = additionalFees;
    this.profitManagement = profitManagement;
  }

  /**
   * 計算總成本
   * @returns {number} - 回傳所有成本項目的總計
   */
  calculateTotalCost() {
    // 計算原物料費用
    const materialCost = this.materialCost.calculate();
    // 計算包材費用
    const packagingCost = this.packagingCost.calculate();
    // 計算成型加工費用
    const moldingCost = this.moldingCost.calculate();
    // 計算後製程費用
    const postProcessingCost = this.postProcessingCost.calculate();
    // 計算附加費用
    const additionalFees = this.additionalFees.calculate();
    // 計算利潤相關費用
    const profitCost = this.profitManagement.calculateProfit(
      materialCost +
        packagingCost +
        moldingCost +
        postProcessingCost +
        additionalFees
    );

    return (
      materialCost +
      packagingCost +
      moldingCost +
      postProcessingCost +
      additionalFees +
      profitCost
    );
  }
}

/**
 * 原物料費用計算領域
 * @param {Array} items - 原物料列表
 * @param {number} defectRate - 預估不良率
 * @param {number} fluctuationRate - 波動率
 */
class MaterialCost {
  constructor(items, defectRate, fluctuationRate) {
    this.items = items;
    this.defectRate = defectRate;
    this.fluctuationRate = fluctuationRate;
  }
  /**
   * 計算原物料費用小計
   * @returns {number} - 原物料費用小計
   */

  calculate() {
    // todo : item.unit 不只有一個情況，需要考慮使用一個 陣列並在裡面查找如果有就是重量單位 沒有就是數量單位
    // * [kg, g, ml, l, pc ]
    return (
      this.items.reduce((total, item) => {
        // 計算單位成本
        const unitCost =
          item.unit === "kg" ? item.unitPrice / 1000 : item.unitPrice;
        // 計算總成本
        const cost = unitCost * item.weight * (1 + this.fluctuationRate);
        return total + cost;
      }, 0) *
      // 計算不良率
      (1 + this.defectRate)
    );
  }
}

/**
 * 包材費用計算領域
 * @param {Array} items - 包材列表
 */
class PackagingCost {
  constructor(items) {
    this.items = items;
  }

  /**
   * 計算包材費用小計
   * @returns {number} - 包材費用小計
   */
  calculate() {
    return this.items.reduce((total, item) => {
      const cost =
        item.unit === "kg"
          ? item.unitPrice / item.capacity
          : item.unitPrice / (item.perKg * item.capacity);
      return total + cost;
    }, 0);
  }
}

/**
 * 成型與生產加工費用計算領域
 * @param {Array} machines - 機器列表
 * @param {number} defectRate - 缺陷率
 * @param {number} cycleTime - 循環時間
 * @param {number} shallowPackageTime - 淺包裝時間
 * @param {number} holeCount - 孔洞數量
 * @param {number} workHourRatio - 工時比例
 */
class MoldingCost {
  constructor(
    machines,
    defectRate,
    cycleTime,
    shallowPackageTime,
    holeCount,
    workHourRatio
  ) {
    this.machines = machines;
    this.defectRate = defectRate;
    this.cycleTime = cycleTime;
    this.shallowPackageTime = shallowPackageTime;
    this.holeCount = holeCount;
    this.workHourRatio = workHourRatio;
  }

  /**
   * 計算成型加工費用
   * @returns {number} - 成型加工費用小計
   */
  calculate() {
    return this.machines.reduce((total, machine) => {
      const cost = machine.ratePer8Hrs * (1 + this.defectRate);
      const hourlyCost =
        cost /
        (((8 * 3600) / (this.cycleTime + this.shallowPackageTime)) *
          this.holeCount *
          this.workHourRatio);
      return total + hourlyCost;
    }, 0);
  }
}

/**
 * 後製程費用計算領域
 */
class PostProcessingCost {
  constructor(inHouseProcesses, outsourcedProcesses) {
    this.inHouseProcesses = inHouseProcesses;
    this.outsourcedProcesses = outsourcedProcesses;
  }

  /**
   * 計算後製程費用小計
   * @returns {number} - 後製程費用小計
   */
  calculate() {
    // 計算內部製程費用
    const inHouseTotal = this.inHouseProcesses.reduce(
      (total, process) => total + process.hours * process.unitPrice,
      0
    );
    // 計算外包製程費用
    const outsourcedTotal = this.outsourcedProcesses.reduce(
      (total, process) => total + process.unitPrice,
      0
    );
    // 計算後製程費用小計
    return inHouseTotal + outsourcedTotal;
  }
}

/**
 * 附加費用計算領域
 * @param {number} transportFees - 運輸費用
 * @param {number} customsFees - 關稅費用
 * @param {number} distance - 距離
 * @param {number} oilPrice - 油價
 * @param {number} estimatedShipment - 預估運送量
 * @param {number} driverHours - 司機工時
 */
class AdditionalFees {
  constructor(
    transportFees,
    customsFees,
    distance,
    oilPrice,
    estimatedShipment,
    driverHours
  ) {
    this.transportFees = transportFees;
    this.customsFees = customsFees;
    this.distance = distance;
    this.oilPrice = oilPrice;
    this.estimatedShipment = estimatedShipment;
    this.driverHours = driverHours;
  }

  /**
   * 計算附加費用小計
   * @returns {number} - 附加費用小計
   */
  calculate() {
    const transportCost =
      (this.distance * 2 * this.oilPrice) / this.estimatedShipment +
      this.driverHours;
    const customsCost = this.customsFees / this.estimatedShipment;
    return transportCost + customsCost;
  }
}

/**
 * 利潤管理費用計算領域
 * @param {number} costSubtotal - 不含管銷研的成本小計
 * @param {number} sgAndAdminPercentage - 管銷研費用百分比
 * @param {number} profitPercentage - 利潤費用百分比
 * @param {number} riskPercentage - 風險費用百分比
 * @param {number} annualDecrease - 年度減損百分比
 * @param {number} feedbackPercentage - 回饋費用百分比
 * @returns {number} - 最終報價金額
 */
class ProfitManagement {
  constructor(
    costSubtotal,
    sgAndAdminPercentage,
    profitPercentage,
    riskPercentage,
    annualDecrease,
    feedbackPercentage
  ) {
    this.costSubtotal = costSubtotal;
    this.sgAndAdminPercentage = sgAndAdminPercentage;
    this.profitPercentage = profitPercentage;
    this.riskPercentage = riskPercentage;
    this.annualDecrease = annualDecrease;
    this.feedbackPercentage = feedbackPercentage;
  }

  /**
   * 計算利潤相關費用
   * @param {number} costSubtotal - 不含管銷研的成本小計
   * @returns {number} - 最終報價金額
   */
  calculateProfit(costSubtotal) {
    // 計算管銷研費用
    const sgAndAdminFee = costSubtotal * this.sgAndAdminPercentage;
    // 計算利潤費用
    const profitFee = (costSubtotal + sgAndAdminFee) * this.profitPercentage;
    // 計算總成本
    const subtotalWithSGA = costSubtotal + sgAndAdminFee + profitFee;
    // 計算風險費用
    const riskFee = subtotalWithSGA * this.riskPercentage;
    // 計算總成本
    const totalCost = subtotalWithSGA + riskFee;
    // 計算年度減損費用
    const annualDecreaseCost = totalCost * (1 - this.annualDecrease);
    // 計算最終報價金額
    const finalQuote = annualDecreaseCost * (1 - this.feedbackPercentage);
    return finalQuote;
  }
}
