// 我要所有的金額 ui也需要展現個別單一金額
// 全部都是繁體中文
//  所有數值最大精度到小數點後三位 第四位四捨五入

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
// function calculatePackagingCost(items) {
//   /*
//  {
//       id: 7,
//       SQProcessId: 4,
//       packagingType: '包材',
//       materialSN: 'H-0356-CC05',
//       materialName: '格板375*555mm(3層)-六格籃用',
//       unit: '件',
//       quantity: 1,
//       capacity: 0.0313,
//       bagsPerKg: null,
//       unitPrice: 3.5,
//       amount: 3.5
//     },
// */

//   if (!items || items.length === 0) {
//     return {
//       totalCost: 0,
//       amounts: [],
//     };
//   }
//   const amounts = items.map((item) => {
//     let amount = 0;
//     if (MATERIAL_TYPES.find((type) => type.value === item.materialType)) {
//       amount = item.unitPrice * item.quantity;
//     } else if (item.unit === "公斤" || item.unit === "磅") {
//       amount = item.unitPrice / item.quantity / item.capacity;
//     }
//     return amount;
//   });
//   const totalCost = amounts.reduce((total, amount) => total + amount, 0);
//   return {
//     // 包材總金額
//     totalCost,
//     // 包材金額
//     amounts,
//   };
// }
function calculatePackagingCost(items) {
  if (!items || items.length === 0) {
    return {
      totalCost: 0,
      amounts: [],
    };
  }

  const amounts = items.map((item) => {
    let amount = 0;

    // 包材類型判斷
    if (item.packagingType === "包材") {
      amount = item.unitPrice * item.quantity;
    } else if (item.unit === "公斤" || item.unit === "磅") {
      amount = (item.unitPrice * item.quantity) / (item.capacity || 1);
    }

    return amount || item.amount || 0;
  });

  return {
    totalCost: amounts.reduce((sum, amt) => sum + amt, 0),
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

/** 場內
 * 計算后制程與檢驗費用小計
 * @param {number} laborCostPerHour - 工時成本，單位：每小時費用
 * @param {number} laborHours - 工時數
 * @param {number} inspectionCost - 檢驗費用
 * @returns {number} - 后制程與檢驗費用小計
 */
//  todo 有可能是多筆
function calculatePostProcessingCost(laborCostPerHour, laborHours) {
  if (!laborHours || !laborCostPerHour) {
    return 0;
  }
  const totalCost = laborCostPerHour * laborHours;
  return totalCost;
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
      transportSubtotal: 0,
      freightSubtotal: 0,
      freightAmounts: [],
      transportAmounts: [],
    };
  }

  // 司机工时固定为 0.3
  const driverWorkHours = 0.3;

  // 計算運輸費用
  // *運輸「金額」=(運距*2*油價/預估出貨數)+司機工時
  const transportAmounts = transportFees.map((item) => {
    const amount =
      (item.deliveryDistance * 2 * item.fuelCostPerKM) /
        item.estimatedShipment +
      driverWorkHours;
    return Number(amount.toFixed(3));
  });

  const transportSubtotal = transportAmounts.reduce(
    (total, amount) => total + amount,
    0
  );

  // *貨運「金額」=運費/預估出貨數
  const freightAmounts = freightAndCustomsFees.map((item) => {
    const amount = item.freight / item.estimatedShipment;
    return Number(amount.toFixed(3));
  });

  const freightSubtotal = freightAmounts.reduce(
    (total, amount) => total + amount,
    0
  );

  const totalAdditionalFees = Number(
    (transportSubtotal + freightSubtotal).toFixed(3)
  );

  return {
    totalCost: totalAdditionalFees,
    transportSubtotal,
    freightSubtotal,
    freightAmounts,
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
// 輔助函數：處理百分比轉換
function convertToDecimalPercentage(value) {
  const numValue = parseFloat(value);
  // 如果數值已經是小數形式（如 0.07），直接返回
  return numValue >= 1 ? numValue / 100 : numValue;
}

// 輔助函數：將數字格式化為三位小數
function formatToThreeDecimals(value) {
  return Math.round(value * 1000) / 1000;
}

function calculateProfitManagement(
  costSubtotal,
  sgAndAdminPercentage = 0.07,
  profitPercentage = 0.05,
  riskPercentage = 0.02,
  annualReductionPercentage = 0.02,
  rebatePercentage = 0.02,
  actualQuotation
) {
  console.log("🚀 ~ costSubtotal:", costSubtotal);
  // 轉換所有百分比為小數形式
  const sgAndAdminRate = convertToDecimalPercentage(sgAndAdminPercentage);
  const profitRate = convertToDecimalPercentage(profitPercentage);
  const riskRate = convertToDecimalPercentage(riskPercentage);
  const annualReductionRate = convertToDecimalPercentage(
    annualReductionPercentage
  );
  const rebateRate = convertToDecimalPercentage(rebatePercentage);

  // 計算過程
  const sgAndAdminFee = costSubtotal * sgAndAdminRate;
  const profitFee = (costSubtotal + sgAndAdminFee) * profitRate;
  const subtotalWithSGA = costSubtotal + sgAndAdminFee + profitFee;
  const riskFee = subtotalWithSGA * riskRate;
  const totalCost = subtotalWithSGA + riskFee;
  const annualReductionAmount = totalCost * (1 + annualReductionRate);
  const rebateAmount = annualReductionAmount * (1 + rebateRate);
  const grossProfitMargin = (actualQuotation - costSubtotal) / costSubtotal;

  // 返回所有結果，並將數值格式化為三位小數
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
