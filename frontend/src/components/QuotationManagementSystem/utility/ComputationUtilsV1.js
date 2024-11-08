// 我要所有的金額 ui也需要展現個別單一金額
// 全部都是繁體中文
//  所有數值最大精度到小數點後三位

const COMMON_UNITS = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "pcs", label: "pcs" },
  { value: "set", label: "set" },
];
/**
 * 計算原物料費用小計
 * @param {Array} items - 原物料列表，每个项目包含 unitPrice（單價），quantity（數量），unit（單位）
 * @param {number} fluctuationPercentage - 原料波動百分比（例如：0.05 表示 5%）
 * @param {number} defectRate - 預估不良率（例如：0.02 表示 2%）
 * @param {number} materialWithdrawalFee - 抽料費用
 * @returns {number} - 原物料費用小計
 */
function calculateMaterialCost(
  items,
  fluctuationPercentage,
  defectRate,
  materialWithdrawalFee
) {
  if (!items || items.length === 0) {
    return {
      totalCost: 0,
      amounts: [],
    };
  }

  // 把參數轉為百分比 但我要先確保他是沒有被轉換過的數字
  const fluctuationPercentage_ = parseFloat(fluctuationPercentage) / 100;
  const materialWithdrawalFee_ = parseFloat(materialWithdrawalFee);
  const defectRate_ = parseFloat(defectRate) / 100;

  // 計算各項金額
  const amounts = items.map((item) => {
    const { unitPrice, weight, unit } = item;
    let amount = 0;
    if (COMMON_UNITS.find((unit) => unit.value === item.unit)) {
      amount = (unitPrice / 1000) * weight * (1 + fluctuationPercentage_);
    } else if (unit === "件" || unit === "個") {
      amount = unitPrice * weight;
    } else {
      throw new Error(`未知的单位类型：${item.unit}`);
    }
    return amount;
  });

  // 計算金額總和並加上抽料費用
  const subtotal =
    amounts.reduce((total, amount) => total + amount, 0) +
    materialWithdrawalFee_;

  // 計算最終小計，考慮預估不良率

  const totalCost = Number((subtotal * (1 + defectRate_)).toFixed(3));

  console.log("🚀 ~ totalCost:", totalCost);
  return {
    totalCost,
    amounts,
  };
}

const MATERIAL_TYPES = [
  { value: "鋼鐵", label: "鋼鐵" },
  { value: "包材", label: "包材" },
  { value: "色母", label: "色母" },
];
/**
 * 計算包材費用小計
 * @param {Array} items - 包材列表，每个项目包含 unitPrice（單價），quantity（數量，單位：件）
 * @returns {number} - 包材費用小計
 */
/*
  3. 「單位為「件」「個」時「金額」=「單價」*「數量」
(註:單位為「件」「個」)ex:0.0313*3.5=0.11
4.「金額」=「單價」/「每公斤幾個」/容量
(註:單位為「公斤」「磅」)ex:68/308/2=0.11
*/
function calculatePackagingCost(items) {
  if (!items || items.length === 0) {
    return {
      totalCost: 0,
      amounts: [],
    };
  }
  const amounts = items.map((item) => {
    let amount = 0;
    if (MATERIAL_TYPES.find((type) => type.value === item.materialType)) {
      amount = item.unitPrice * item.quantity;
    } else if (item.unit === "公斤" || item.unit === "磅") {
      amount = item.unitPrice / item.quantity / item.capacity;
    }
    return amount;
  });
  const totalCost = amounts.reduce((total, amount) => total + amount, 0);
  return {
    // 包材總金額
    totalCost,
    // 包材金額
    amounts,
  };
}

/**
 * 計算成型加工費用小計
 * !單價預設為3000
 * @param {number} defectRate - 不良率（例如：0.02 表示 2%）
 * @param {number} moldingCycle - 成型周期（單位：秒）
 * @param {number} shallowPackageWorkHour - 灌包工時（單位：秒）
 * @param {number} cavityCount - 穴數
 * @param {number} workHourRatio - 工時比例（例如：0.8 表示 80%）
 * @param {number} unitPrice - 單價，“廠內試模費率 8hr”
 * @returns {number} - 成型加工費用小計
 */
function calculateMoldingCost(
  defectRate,
  moldingCycle,
  shallowPackageWorkHour,
  cavityCount,
  workHourRatio,
  unitPrice = 3000
) {
  //應該是百分比的參數 要轉換成百分比
  const defectRate_ = parseFloat(defectRate) / 100;
  const workHourRatio_ = parseFloat(workHourRatio) / 100;

  // 計算金額
  const amount = unitPrice * (1 + defectRate_);

  // 計算總射出次數
  const totalShots =
    ((60 * 60 * 8) / (moldingCycle + shallowPackageWorkHour)) *
    cavityCount *
    workHourRatio_;

  // 計算小計
  const subtotal = Number((amount / totalShots).toFixed(3));

  return subtotal;
}

/**
 * 計算成型加工電費小計
 * @param {number} electricityCostPerSecond - 每秒電費
 * @param {number} moldingCycle - 成型周期（單位：秒）
 * @param {number} cavityCount - 穴數
 * @returns {number} - 成型加工電費小計
 * !需要除以穴數
 */
function calculateMoldingElectricityCost(
  moldingCycle,
  cavityCount,
  electricityCostPerSecond = 0.0152
) {
  const electricityCost =
    (+electricityCostPerSecond * +moldingCycle) / +cavityCount;

  return Number(electricityCost.toFixed(3));
}

/**
 * 計算后制程與檢驗費用小計
 * @param {number} laborCostPerHour - 工時成本，單位：每小時費用
 * @param {number} laborHours - 工時數
 * @param {number} inspectionCost - 檢驗費用
 * @returns {number} - 后制程與檢驗費用小計
 */
//  todo 有可能是多筆
function calculatePostProcessingCost(
  laborCostPerHour,
  laborHours,
  inspectionCost
) {
  console.log("🚀 ~   inspectionCost:", laborCostPerHour);

  const laborCost = laborCostPerHour * laborHours;
  const totalCost = laborCost + inspectionCost;
  return {
    totalCost,
    laborCost,
  };
}
/**
 * 計算附加費用小計
 * @param {Array} transportFees - 運輸費用列表
 * @param {Array} freightAndCustomsFees - 貨運與關稅費用列表
 * @returns {number} - 附加費用小計
 */
function calculateAdditionalFees(transportFees, freightAndCustomsFees) {
  if (!transportFees || !freightAndCustomsFees) {
    return {
      totalCost: 0,
    };
  }
  // 司机工时固定为 0.3
  const driverWorkHours = 0.3;

  //  計算運輸費用
  // *運輸「金額」=(運距*2*油價/預估出貨數)+司機工時
  const transportAmounts = transportFees.map((item) => {
    const amount =
      (item.deliveryDistance * 2 * item.fuelPricePerUnit) /
        item.estimatedShipmentQuantity +
      driverWorkHours;
    return amount;
  });

  // 運輸費用小計
  const transportSubtotal = transportAmounts.reduce(
    (total, amount) => total + amount,
    0
  );

  // *貨運「金額」=運費/預估出貨數
  // 計算貨運與關稅費用
  const freightAmounts = freightAndCustomsFees.map((item) => {
    const amount = item.freightCost / item.estimatedShipmentQuantity;
    return amount;
  });

  // 貨運與關稅費用小計
  const freightSubtotal = freightAmounts.reduce(
    (total, amount) => total + amount,
    0
  );

  // 附加費用小計 = 運輸費用小計 + 貨運與關稅費用小計
  const totalAdditionalFees = transportSubtotal + freightSubtotal;

  return {
    // 附加費用總金額
    totalCost: totalAdditionalFees,
    // 個別小計
    transportSubtotal,
    freightSubtotal,
    // 貨運與關稅金額
    freightAmounts,
    // 運輸費用金額
    transportAmounts,
  };
}

/**
 * 计算利润管理费用
 * @param {number} costSubtotal - 成本小计（不含管销研）
 * @param {number} sgAndAdminPercentage - 管销研费用百分比（例如：0.07 表示 7%）
 * @param {number} profitPercentage - 利润费用百分比（例如：0.05 表示 5%）
 * @param {number} riskPercentage - 风险费用百分比
 * @param {number} annualReductionPercentage - 年降百分比
 * @param {number} rebatePercentage - 回馈百分比
 * @param {number} actualQuotation - 实际报价
 * @returns {object} - 返回所有计算步骤的结果，包括最终报价金额和毛利率
 */
function calculateProfitManagement(
  costSubtotal,
  sgAndAdminPercentage = 0.07,
  profitPercentage = 0.05,
  riskPercentage = 0.02,
  annualReductionPercentage = 0.02,
  rebatePercentage = 0.02,
  actualQuotation
) {
  // 2. 管销研金额
  const sgAndAdminFee = costSubtotal * sgAndAdminPercentage;

  // 3. 利润金额
  const profitFee = (costSubtotal + sgAndAdminFee) * profitPercentage;

  // 4. 成本小计（含管销研）
  const subtotalWithSGA = costSubtotal + sgAndAdminFee + profitFee;

  // 5. 风险金额
  const riskFee = subtotalWithSGA * riskPercentage;

  // 6. 总成本
  const totalCost = subtotalWithSGA + riskFee;

  // 7. 年降金额
  const annualReductionAmount = totalCost * (1 + annualReductionPercentage);

  // 8. 回馈金额
  const rebateAmount = annualReductionAmount * (1 + rebatePercentage);

  // 9. 毛利率计算
  const grossProfitMargin = (actualQuotation - costSubtotal) / costSubtotal;

  return {
    costSubtotal: costSubtotal,
    sgAndAdminFee: sgAndAdminFee,
    profitFee: profitFee,
    subtotalWithSGA: subtotalWithSGA,
    riskFee: riskFee,
    totalCost: totalCost,
    annualReductionAmount: annualReductionAmount,
    rebateAmount: rebateAmount,
    grossProfitMargin: grossProfitMargin,
  };
}

export {
  calculateMaterialCost,
  calculatePackagingCost,
  calculateMoldingCost,
  calculateMoldingElectricityCost,
  calculatePostProcessingCost,
  calculateAdditionalFees,
  calculateProfitManagement,
};
