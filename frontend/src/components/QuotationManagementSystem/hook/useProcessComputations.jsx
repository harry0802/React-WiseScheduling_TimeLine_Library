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
  // Calculate material cost
  const materialCostResult = calculateMaterialCost(
    data.rawMaterials,
    data.fluctuationPercentage,
    data.defectRate,
    data.materialWithdrawalFee
  );

  // Calculate packaging cost
  const packagingCostResult = calculatePackagingCost(data.packagingItems);

  // Calculate molding cost
  const moldingCostResult = calculateMoldingCost(
    data.unitPrice,
    data.defectRate,
    data.moldingCycle,
    data.shallowPackageTime,
    data.holeCount,
    data.workHourRatio
  );

  // Calculate molding electricity cost
  const moldingElectricityCost = calculateMoldingElectricityCost(
    data.electricityCostPerSecond,
    data.moldingCycle
  );

  // Calculate total cost
  const totalCost =
    materialCostResult.totalCost +
    packagingCostResult.totalCost +
    moldingCostResult +
    moldingElectricityCost;

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
  // Calculate material cost
  const materialCostResult = calculateMaterialCost(
    data.rawMaterials,
    data.fluctuationPercentage,
    data.defectRate,
    data.materialWithdrawalFee
  );

  // Calculate packaging cost
  const packagingCostResult = calculatePackagingCost(data.packagingItems);

  // Calculate post-processing cost
  const postProcessingCostResult = calculatePostProcessingCost(
    data.laborCostPerHour,
    data.laborHours,
    data.inspectionCost
  );

  // Calculate total cost
  const totalCost =
    materialCostResult.totalCost +
    packagingCostResult.totalCost +
    postProcessingCostResult.totalCost;

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
  // Calculate material cost
  const materialCostResult = calculateMaterialCost(
    data.rawMaterials,
    data.fluctuationPercentage,
    data.defectRate,
    data.materialWithdrawalFee
  );

  // Calculate packaging cost
  const packagingCostResult = calculatePackagingCost(data.packagingItems);

  // Calculate post-processing cost
  const postProcessingCostResult = calculatePostProcessingCost(
    data.laborCostPerHour,
    data.laborHours,
    data.inspectionCost
  );

  // Calculate total cost
  const totalCost =
    materialCostResult.totalCost +
    packagingCostResult.totalCost +
    postProcessingCostResult.totalCost;

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
  return calculateInHousePostProcessingCost(data);
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
  const postProcessingCostResult = calculatePostProcessingCost(
    data.laborCostPerHour,
    data.laborHours,
    data.inspectionCost
  );

  // Return total cost and breakdown
  return {
    totalCost: postProcessingCostResult.totalCost,
    postProcessingCostResult,
  };
}

// /**
//  * Calculate total cost based on process category
//  * @param {string} processCategory - Process category (e.g., 'In-IJ')
//  * @param {Object} data - Contains all necessary data
//  * @param {Array} data.rawMaterials - Raw materials data
//  * @param {number} data.fluctuationPercentage - Fluctuation percentage
//  * @param {number} data.defectRate - Defect rate
//  * @param {number} data.materialWithdrawalFee - Material withdrawal fee
//  * @param {Array} data.packagingItems - Packaging items data
//  * @returns {Object} - Final quote and cost breakdown
//  */

// function calculateTotalCost(processCategory, data) {
//   let costSubtotalResult;

//   // Calculate cost subtotal based on process category
//   switch (processCategory) {
//     case "In-IJ":
//       costSubtotalResult = calculateInHouseMoldingCost(data);
//       break;
//     case "Out-IJ":
//       costSubtotalResult = calculateOutsourcedMoldingCost(data);
//       break;
//     case "In-BE":
//       costSubtotalResult = calculateInHousePostProcessingCost(data);
//       break;
//     case "Out-BE":
//       costSubtotalResult = calculateOutsourcedPostProcessingCost(data);
//       break;
//     case "In-TS":
//       costSubtotalResult = calculateInHouseShippingInspectionCost(data);
//       break;
//     case "TRANSPORTATION":
//       costSubtotalResult = {
//         totalCost: calculateAdditionalFees(
//           data.transportFees,
//           data.freightAndCustomsFees
//         ),
//       };
//       break;
//     default:
//       throw new Error("Unknown process category");
//   }

//   // Get cost subtotal
//   const costSubtotal = costSubtotalResult.totalCost;

//   // Calculate profit management
//   const profitManagementResult = calculateProfitManagement(
//     costSubtotal,
//     data.sgAndAdminPercentage,
//     data.profitPercentage,
//     data.riskPercentage,
//     data.annualReductionPercentage,
//     data.rebatePercentage,
//     data.actualQuotation
//   );

//   // Return final quote and cost breakdown
//   return {
//     profitManagementResult,
//     costSubtotalResult,
//     costSubtotal,
//   };
// }

// export default calculateTotalCost;

/**
 * 计算所有制程的成本小计
 * @param {Array} processes - 制程数据
 * @returns {Object} - 总成本小计和每个制程的详细信息
 */
function calculateTotalCost(processes) {
  // 初始化总成本小计
  let totalCostSubtotal = 0;
  // 初始化每个制程的详细信息
  const costDetails = [];
  // 遍历每个制程
  processes.forEach((process) => {
    const { processCategory, data } = process;
    let costSubtotalResult;

    // 根据制程类别计算成本小计
    switch (processCategory) {
      case "In-IJ":
        costSubtotalResult = calculateInHouseMoldingCost(data);
        break;
      case "Out-IJ":
        costSubtotalResult = calculateOutsourcedMoldingCost(data);
        break;
      case "In-BE":
        costSubtotalResult = calculateInHousePostProcessingCost(data);
        break;
      case "Out-BE":
        costSubtotalResult = calculateOutsourcedPostProcessingCost(data);
        break;
      case "In-TS":
        costSubtotalResult = calculateInHouseShippingInspectionCost(data);
        break;
      case "TRANSPORTATION":
        costSubtotalResult = {
          totalCost: calculateAdditionalFees(
            data.transportFees,
            data.freightAndCustomsFees
          ),
        };
        break;
      default:
        throw new Error("未知的制程类别");
    }

    // 获取该制程的成本小计
    const costSubtotal = costSubtotalResult.totalCost || 0;

    // 累加到总成本小计
    totalCostSubtotal += costSubtotal;

    // 存储每个制程的详细信息
    costDetails.push({
      processCategory,
      costSubtotal,
      costSubtotalResult,
    });
  });

  // 返回总成本小计和每个制程的详细信息
  return {
    // 总成本小计
    totalCostSubtotal,
    // 每个制程的详细信息
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

export default calculateAllCosts;
