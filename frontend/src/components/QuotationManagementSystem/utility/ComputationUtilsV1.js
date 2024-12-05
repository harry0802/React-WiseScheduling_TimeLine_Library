/**
 * @fileoverview 報價系統計算工具函數
 * @description
 * 1. 所有金額需要展示個別單一金額與總金額
 * 2. 所有顯示文字皆為繁體中文
 * 3. 所有數值精度到小數點後三位(第四位四捨五入)
 */

/**
 * 通用單位列表
 * @constant {Array<{value: string, label: string}>}
 */
const COMMON_UNITS = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "pcs", label: "pcs" },
  { value: "set", label: "set" },
  { value: "個", label: "個" },
  { value: "件", label: "件" },
  { value: "磅", label: "磅" },
  { value: "公斤", label: "公斤" },
  { value: "公克", label: "公克" },
];

/**
 * 材料類型列表
 * @constant {Array<{value: string, label: string}>}
 */
const MATERIAL_TYPES = [
  { value: "鋼鐵", label: "鋼鐵" },
  { value: "包材", label: "包材" },
  { value: "色母", label: "色母" },
];

/**
 * 計算原物料費用
 * @param {Array<Object>} items - 原物料清單
 * @param {string} items[].unit - 單位
 * @param {number} items[].unitPrice - 單價
 * @param {number} items[].weight - 重量
 * @param {number} fluctuationPercentage - 原料波動率(%)
 * @param {number} defectRate - 預估不良率(%)
 * @param {number} materialWithdrawalFee - 抽料費用
 * @returns {{
 *   totalCost: number,
 *   amounts: Array<number>
 * }} 總成本與個別金額列表
 */
function calculateMaterialCost(
  items,
  defectRate,
  fluctuationPercentage,
  materialWithdrawalFee
) {
  if (!items || items.length === 0) {
    return {
      totalCost: 0,
      amounts: [],
    };
  }
  console.log(items, fluctuationPercentage, defectRate, materialWithdrawalFee);

  // 使用 convertToPercentage 轉換百分比
  const fluctuationPercentage_ = convertToPercentage(fluctuationPercentage);
  const materialWithdrawalFee_ = parseFloat(materialWithdrawalFee);
  const defectRate_ = convertToPercentage(defectRate);

  // 計算各項金額
  const amounts = items.map((item) => {
    const { unitPrice, weight, unit } = item;
    let amount = 0;
    if (unit === "公克") {
      amount = (unitPrice / 1000) * weight * (1 + fluctuationPercentage_);
    } else if (unit === "件" || unit === "個") {
      amount = unitPrice * weight;
    }
    return amount;
  });

  const subtotal =
    amounts.reduce((total, amount) => total + amount, 0) +
    materialWithdrawalFee_;

  const totalCost = Number((subtotal * (1 + defectRate_)).toFixed(3));
  return {
    totalCost,
    amounts,
  };
}

/**
 * 計算包材費用
 * @param {Array<Object>} items - 包材清單
 * @param {string} items[].packagingType - 包材類型
 * @param {string} items[].unit - 單位
 * @param {number} items[].unitPrice - 單價
 * @param {number} items[].quantity - 數量
 * @param {number} items[].capacity - 容量
 * @returns {{
 *   totalCost: number,
 *   amounts: Array<number>
 * }} 總成本與個別金額列表
 * @description
 * 1. 包材類型為「包材」時: 金額 = 單價 × 數量
 * 2. 單位為「公斤」「磅」時: 金額 = (單價 × 數量) / 容量
 */
function calculatePackagingCost(items) {
  if (!items || items.length === 0) {
    return {
      totalCost: 0,
      amounts: [],
    };
  }
  console.log("🚀 ~ calculatePackagingCost ~ items:", items);

  const amounts = items.map((item) => {
    let amount = 0;

    if (item.unit === "件" || item.unit === "個") {
      // 單位為「件」「個」時:金額 = 單價 × 數量
      amount = item.unitPrice * item.capacity;
    } else if (item.unit === "公斤" || item.unit === "磅") {
      // 金額 = 單價 / 每公斤幾個袋子 / 容量
      amount = item.unitPrice / item.bagsPerKg / item.capacity;
    }

    return amount || item.amount || 0;
  });
  console.log("🚀 ~ amounts ~ amounts:", amounts);

  return {
    totalCost: amounts.reduce((sum, amt) => sum + amt, 0),
    amounts,
  };
}
/**
 * 計算成型加工費用
 * @param {number} defectRate - 不良率(%)
 * @param {number} moldingCycle - 成型週期(秒)
 * @param {number} shallowPackageWorkHour - 灌包工時(秒)
 * @param {number} cavityCount - 模具穴數
 * @param {number} workHourRatio - 工時比例(%)
 * @param {number} [unitPrice=3000] - 廠內試模費率(8小時)
 * @returns {number} 成型加工費用
 * @description
 * 1. 金額 = 單價 × (1 + 不良率)
 * 2. 總射出次數 = ((60 × 60 × 8) / (成型週期 + 灌包工時)) × 穴數 × 工時比例
 * 3. 小計 = 金額 / 總射出次數
 */
function calculateMoldingCost(
  defectRate,
  moldingCycle,
  shallowPackageWorkHour,
  cavityCount,
  workHourRatio,
  unitPrice = 3000
) {
  const defectRate_ = convertToPercentage(defectRate);
  const workHourRatio_ = convertToPercentage(workHourRatio);

  const amount = unitPrice * (1 + defectRate_);
  const totalShots =
    ((60 * 60 * 8) / (moldingCycle + shallowPackageWorkHour)) *
    cavityCount *
    workHourRatio_;

  const moldingCost = amount / totalShots;
  return { amounts: amount, totalCost: moldingCost };
}

/**
 * 計算成型加工電費
 * @param {number} moldingCycle - 成型週期(秒)
 * @param {number} cavityCount - 模具穴數
 * @param {number} [electricityCostPerSec=0.0152] - 每秒電費
 * @returns {number} 成型加工電費(已除以穴數)
 */
function calculateMoldingElectricityCost(
  moldingCycle,
  cavityCount,
  electricityCost
) {
  const electricityCost_ = (+electricityCost * +moldingCycle) / +cavityCount;
  return Number(electricityCost_.toFixed(3));
}

/**
 * 計算廠內後製程與檢驗費用
 * @param {number} laborCostPerHour - 每小時人工費用
 * @param {number} laborHours - 工時數
 * @returns {number} 後製程與檢驗總費用
 */
function calculatePostProcessingCost(laborCostPerHour, laborHours) {
  if (!laborHours || !laborCostPerHour) {
    return 0;
  }

  return Number((laborCostPerHour * laborHours).toFixed(3));
}

/**
 * 計算運輸及關稅費用
 * @param {Array<Object>} transportFees - 運輸費用清單
 * @param {number} transportFees[].deliveryDistance - 運距
 * @param {number} transportFees[].fuelCostPerKM - 每公里油價
 * @param {number} transportFees[].estimatedShipment - 預估出貨數
 * @param {number} transportFees[].driverWorkHours - 司機工時
 * @param {Array<Object>} freightAndCustomsFees - 貨運與關稅費用清單
 * @param {number} freightAndCustomsFees[].freight - 運費
 * @param {number} freightAndCustomsFees[].estimatedShipment - 預估出貨數
 * @returns {{
 *   totalCost: number,
 *   transportSubtotal: number,
 *   freightSubtotal: number,
 *   freightAmounts: Array<number>,
 *   transportAmounts: Array<number>
 * }} 總成本及細項費用
 * @description
 * 1. 運輸金額 = (運距 × 2 × 油價 / 預估出貨數) + 司機工時
 * 2. 貨運金額 = 運費 / 預估出貨數
 * 3. 司機工時預設為 0.3
 */
function calculateAdditionalFees(transportFees, freightAndCustomsFees) {
  if (!transportFees || !freightAndCustomsFees) {
    return {
      totalCost: 0,
      transportSubtotal: 0,
      freightSubtotal: 0,
      freightAmounts: [],
      transportAmounts: [],
    };
  }

  const driverWorkHours = 0.3;

  const transportAmounts = transportFees.map((item) => {
    const amount =
      (item.deliveryDistance * 2 * item.fuelCostPerKM) / item.estimatedShipment;
    const driverCost = item.driverWorkHours || driverWorkHours;
    const totalAmount = amount + driverCost;

    return Number(totalAmount.toFixed(3));
  });

  const transportSubtotal = transportAmounts.reduce(
    (total, amount) => total + amount,
    0
  );

  const freightAmounts = freightAndCustomsFees.map((item) => {
    const amount = item.freight / item.estimatedShipment;
    return Number(amount.toFixed(3));
  });

  const freightSubtotal = freightAmounts.reduce(
    (total, amount) => total + amount,
    0
  );

  return {
    totalCost: Number((transportSubtotal + freightSubtotal).toFixed(3)),
    transportSubtotal,
    freightSubtotal,
    freightAmounts,
    transportAmounts,
  };
}

/**
 * 轉換百分比為小數
 * @param {number} value - 百分比值(1-100或0.01-1)
 * @returns {number} 轉換後的小數(0.01-1)
 */
function convertToPercentage(value) {
  const numValue = parseFloat(value);
  return numValue >= 1 ? numValue / 100 : numValue;
}

/**
 * 格式化數字至小數點後三位
 * @param {number} value - 待格式化的數字
 * @returns {number} 格式化後的數字
 */
function formatToThreeDecimals(value) {
  return Math.round(value * 1000) / 1000;
}

/**
 * 計算利潤管理費用
 * @param {number} costSubtotal - 成本小計(不含管銷研)
 * @param {number} [sgAndAdminPercentage=0.07] - 管銷研費用比例(%)
 * @param {number} [profitPercentage=0.05] - 利潤比例(%)
 * @param {number} [riskPercentage=0.02] - 風險比例(%)
 * @param {number} [annualReductionPercentage=0.02] - 年降比例(%)
 * @param {number} [rebatePercentage=0.02] - 回饋比例(%)
 * @param {number} actualQuotation - 實際報價
 * @returns {{
 *   costSubtotal: number,
 *   sgAndAdminFee: number,
 *   profitFee: number,
 *   subtotalWithSGA: number,
 *   riskFee: number,
 *   totalCost: number,
 *   annualReductionAmount: number,
 *   rebateAmount: number,
 *   grossProfitMargin: number
 * }} 所有計算結果
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
  const sgAndAdminRate = convertToPercentage(sgAndAdminPercentage);
  const profitRate = convertToPercentage(profitPercentage);
  const riskRate = convertToPercentage(riskPercentage);
  const annualReductionRate = convertToPercentage(annualReductionPercentage);
  const rebateRate = convertToPercentage(rebatePercentage);

  const sgAndAdminFee = costSubtotal * sgAndAdminRate;
  const profitFee = (costSubtotal + sgAndAdminFee) * profitRate;
  const subtotalWithSGA = costSubtotal + sgAndAdminFee + profitFee;
  const riskFee = subtotalWithSGA * riskRate;
  const totalCost = subtotalWithSGA + riskFee;
  const annualReductionAmount = totalCost * (1 + annualReductionRate);
  const rebateAmount = annualReductionAmount * (1 + rebateRate);
  const grossProfitMargin = (actualQuotation - costSubtotal) / costSubtotal;

  return {
    costSubtotal: formatToThreeDecimals(costSubtotal),
    sgAndAdminFee: formatToThreeDecimals(sgAndAdminFee),
    profitFee: formatToThreeDecimals(profitFee),
    subtotalWithSGA: formatToThreeDecimals(subtotalWithSGA),
    riskFee: formatToThreeDecimals(riskFee),
    totalCost: formatToThreeDecimals(totalCost),
    annualReductionAmount: formatToThreeDecimals(annualReductionAmount),
    rebateAmount: formatToThreeDecimals(rebateAmount),
    grossProfitMargin: formatToThreeDecimals(grossProfitMargin),
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
