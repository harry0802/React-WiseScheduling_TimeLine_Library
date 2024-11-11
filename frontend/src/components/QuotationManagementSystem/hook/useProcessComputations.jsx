import {
  calculateMaterialCost,
  calculatePackagingCost,
  calculateMoldingCost,
  calculateMoldingElectricityCost,
  calculatePostProcessingCost,
  calculateAdditionalFees,
  calculateProfitManagement,
} from "../utility/ComputationUtilsV1";

/**
 * Calculate total cost for In-House Molding (In-IJ)
 * @param {Object} data - Contains all necessary data
 * @param {Array} data.rawMaterials - Raw materials data
 * @param {number} data.fluctuationPercentage - Fluctuation percentage
 * @param {number} data.defectRate - Defect rate
 * @param {number} data.materialWithdrawalFee - Material withdrawal fee
 * @param {Array} data.packagingItems - Packaging items data
 * @returns {Object} - Total cost and individual cost breakdown
 */
function calculateInHouseMoldingCost(data) {
  // 函數用到的所參數解構
  const {
    preInspectionLossRate,
    preInspectionRate,
    inspectionFee,
    defectRate,
    moldingCycle,
    shallowPackageTime,
    holeCount,
    workHourRatio,
  } = data;

  // Calculate material cost
  const materialCostResult = calculateMaterialCost(
    data["todoItems_原物料成本"],
    preInspectionLossRate,
    preInspectionRate,
    inspectionFee
  );

  // Calculate packaging cost
  const packagingCostResult = calculatePackagingCost(
    data["todoItems_包裝材料費"]
  );

  // Calculate molding cost
  const moldingCostResult = calculateMoldingCost(
    defectRate,
    moldingCycle,
    shallowPackageTime,
    holeCount,
    workHourRatio
  );

  // Calculate molding electricity cost
  const moldingElectricityCost = calculateMoldingElectricityCost(
    holeCount,
    moldingCycle
  );

  // Calculate total cost
  const totalCost =
    +materialCostResult.totalCost +
    +packagingCostResult.totalCost +
    +moldingCostResult +
    +moldingElectricityCost;

  // Return individual costs and total cost
  return {
    totalCost: totalCost,
    materialCostResult,
    packagingCostResult,
    moldingCostResult,
    moldingElectricityCost,
  };
}

/**
 * Calculate total cost for Outsourced Molding (Out-IJ)
 * @param {Object} data - Contains all necessary data
 * @param {Array} data.rawMaterials - Raw materials data
 * @param {number} data.fluctuationPercentage - Fluctuation percentage
 * @param {number} data.defectRate - Defect rate
 * @param {number} data.materialWithdrawalFee - Material withdrawal fee
 * @param {Array} data.packagingItems - Packaging items data
 * @returns {Object} - Total cost and individual cost breakdown
 */
function calculateOutsourcedMoldingCost(data) {
  //  函數用到的所參數解構
  const { unitPrice, preInspectionLossRate, preInspectionRate, inspectionFee } =
    data;

  // Calculate material cost
  const materialCostResult = calculateMaterialCost(
    data["todoItems_原物料成本"],
    preInspectionLossRate,
    preInspectionRate,
    inspectionFee
  );

  // Calculate packaging cost
  const packagingCostResult = calculatePackagingCost(
    data["todoItems_包裝材料費"]
  );

  // 委外後製程與檢驗費用  金額 =單價
  const postProcessingCostResult = +unitPrice;

  // Calculate total cost
  const totalCost =
    +materialCostResult.totalCost +
    +packagingCostResult.totalCost +
    +postProcessingCostResult;
  // Return individual costs and total cost

  return {
    totalCost: totalCost,
    materialCostResult,
    packagingCostResult,
    postProcessingCostResult,
  };
}

/**
 * Calculate total cost for In-House Post-Processing (In-BE)
 * @param {Object} data - Contains all necessary data
 * @param {Array} data.rawMaterials - Raw materials data
 * @param {number} data.fluctuationPercentage - Fluctuation percentage
 * @param {number} data.defectRate - Defect rate
 * @param {number} data.materialWithdrawalFee - Material withdrawal fee
 * @param {Array} data.packagingItems - Packaging items data
 * @returns {Object} - Total cost and individual cost breakdown
 */
function calculateInHousePostProcessingCost(data) {
  // 函數用到的所參數解構
  const {
    preInspectionLossRate,
    preInspectionRate,
    inspectionFee,
    workHours,
    unitPrice,
  } = data;
  // Calculate material cost
  const materialCostResult = calculateMaterialCost(
    data["todoItems_原物料成本"],
    preInspectionLossRate,
    preInspectionRate,
    inspectionFee
  );

  // Calculate packaging cost
  const packagingCostResult = calculatePackagingCost(
    data["todoItems_包裝材料費"]
  );

  // Calculate post-processing cost
  const postProcessingCostResult = calculatePostProcessingCost(
    workHours,
    unitPrice
  );

  // Calculate total cost
  const totalCost =
    materialCostResult.totalCost +
    packagingCostResult.totalCost +
    postProcessingCostResult;

  // Return individual costs and total cost
  return {
    totalCost: totalCost,
    materialCostResult,
    packagingCostResult,
    postProcessingCostResult,
  };
}
/**
 * Calculate total cost for Outsourced Post-Processing (Out-BE)
 * @param {Object} data - Contains all necessary data
 * @param {Array} data.rawMaterials - Raw materials data
 * @param {number} data.fluctuationPercentage - Fluctuation percentage
 * @param {number} data.defectRate - Defect rate
 * @param {number} data.materialWithdrawalFee - Material withdrawal fee
 * @param {Array} data.packagingItems - Packaging items data
 * @returns {Object} - Total cost and individual cost breakdown
 */
function calculateOutsourcedPostProcessingCost(data) {
  // Similar to In-House Post-Processing

  return calculateOutsourcedMoldingCost(data);
}
/**
 * Calculate total cost for In-House Shipping Inspection (In-TS)
 * @param {Object} data - Contains all necessary data
 * @param {Array} data.rawMaterials - Raw materials data
 * @param {number} data.fluctuationPercentage - Fluctuation percentage
 * @param {number} data.defectRate - Defect rate
 * @param {number} data.materialWithdrawalFee - Material withdrawal fee
 * @param {Array} data.packagingItems - Packaging items data
 * @returns {Object} - Total cost and individual cost breakdown
 */
function calculateInHouseShippingInspectionCost(data) {
  // Calculate post-processing cost (inspection cost)
  const { unitPrice } = data;
  const postProcessingCostResult = +unitPrice;

  return {
    totalCost: postProcessingCostResult,
    postProcessingCostResult,
  };
}

/**
 * 计算所有制程的成本小计
 * @param {Array} processes - 制程数据
 * @returns {Object} - 总成本小计和每个制程的详细信息
 */
function calculateTotalCost(processes) {
  if (!processes || processes.length === 0) {
    return {
      totalCostSubtotal: 0,
      costDetails: [],
    };
  }

  const costDetails = processes.map(({ processCategory, data }) => {
    let costSubtotalResult;

    // 使用 switch 判斷製程類型並計算
    switch (processCategory) {
      case "FACTORY_INTERNAL_SHAPING":
        costSubtotalResult = calculateInHouseMoldingCost(data);
        break;
      case "OUTSOURCED_SHAPING":
        costSubtotalResult = calculateOutsourcedMoldingCost(data);
        break;
      case "FACTORY_INTERNAL_FINISHING":
        costSubtotalResult = calculateInHousePostProcessingCost(data);
        break;
      case "OUTSOURCED_FINISHING":
        costSubtotalResult = calculateOutsourcedPostProcessingCost(data);
        break;
      case "FACTORY_INTERNAL_SHIPPING_INSPECTION":
        costSubtotalResult = calculateInHouseShippingInspectionCost(data);
        break;
      case "TRANSPORTATION":
        costSubtotalResult = calculateAdditionalFees(
          data["todoItems_運輸費用"],
          data["todoItems_貨運與關稅"]
        );
        break;
      default:
        throw new Error("未知的制程类别");
    }

    return {
      id: data.id, // 添加 id
      processCategory,
      costSubtotal: costSubtotalResult.totalCost || 0,
      costSubtotalResult,
    };
  });

  const totalCostSubtotal = costDetails.reduce(
    (sum, detail) => sum + detail.costSubtotal,
    0
  );

  return {
    totalCostSubtotal,
    costDetails,
  };
}

/**
 * 计算利润管理
 * @param {number} totalCostSubtotal - 总成本小计
 * @param {Object} data - 利润管理数据
 * @returns {Object} - 利润管理结果
 */
function calculateProfit(totalCostSubtotal, data) {
  // 调用利润管理的计算函数
  const profitManagementResult = calculateProfitManagement(
    totalCostSubtotal,
    data.sgAndAdminPercentage,
    data.profitPercentage,
    data.riskPercentage,
    data.annualReductionPercentage,
    data.rebatePercentage,
    data.actualQuotation
  );

  return profitManagementResult;
}
/**
 * 计算所有成本
 * @param {Array} processes - 制程数据
 * @param {Object} profitData - 利润管理数据
 * @returns {Object} - 最终结果
 */
function calculateAllCosts(processes, profitData) {
  // 计算所有制程的成本小计
  const { totalCostSubtotal, costDetails } = calculateTotalCost(processes);

  // 计算利润管理
  const profitManagementResult = calculateProfit(totalCostSubtotal, profitData);

  // 返回最终结果
  return {
    totalCostSubtotal,
    costDetails,
    profitManagementResult,
  };
}

export { calculateAllCosts, calculateProfit, calculateTotalCost };
