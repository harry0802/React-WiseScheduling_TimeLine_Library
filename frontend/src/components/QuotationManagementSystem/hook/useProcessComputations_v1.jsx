/**
 * 製程計算相關的工具函數集合
 */
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
 * 計算廠內成型成本
 * @param {Object} process - 製程資料
 * @returns {Object} { totalCost, details } 總成本和詳細成本明細
 */
export const calculateInHouseMoldingCost = (process) => {
  const {
    SQMaterialCostSetting,
    SQMaterialCosts,
    SQPackagingCosts,
    SQInjectionMoldingCosts,
  } = process;
  const moldingData = SQInjectionMoldingCosts[0];

  const materialCostResult = calculateMaterialCost(
    SQMaterialCosts,
    SQMaterialCostSetting.estimatedDefectRate,
    SQMaterialCostSetting.estimatedMaterialFluctuation,
    SQMaterialCostSetting.processingCost
  );

  const packagingCostResult = calculatePackagingCost(SQPackagingCosts);

  const moldingCostResult = calculateMoldingCost(
    moldingData.defectiveRate,
    moldingData.cycleTime,
    moldingData.packageTime,
    moldingData.moldCavity,
    moldingData.workHoursRatio,
    moldingData.unitPrice
  );

  const moldingElectricityCost = calculateMoldingElectricityCost(
    moldingData.moldCavity,
    moldingData.cycleTime,
    moldingData.electricityCost
  );
  return {
    totalCost:
      +materialCostResult.totalCost +
      +packagingCostResult.totalCost +
      +moldingCostResult +
      +moldingElectricityCost,
    details: {
      materialCostResult,
      packagingCostResult,
      moldingCostResult,
      moldingElectricityCost,
    },
  };
};

/**
 * 計算委外成型成本
 * @param {Object} process - 製程資料
 * @returns {Object} { totalCost, details } 總成本和詳細成本明細
 */
export const calculateOutsourcedMoldingCost = (process) => {
  const {
    SQMaterialCostSetting,
    SQMaterialCosts,
    SQPackagingCosts,
    SQOutPostProcessingCosts,
  } = process;

  const materialCostResult = calculateMaterialCost(
    SQMaterialCosts,
    SQMaterialCostSetting.estimatedDefectRate,
    SQMaterialCostSetting.estimatedMaterialFluctuation,
    SQMaterialCostSetting.processingCost
  );
  const packagingCostResult = calculatePackagingCost(SQPackagingCosts);
  const postProcessingCostResult = SQOutPostProcessingCosts[0].amount;

  return {
    totalCost:
      +materialCostResult.totalCost +
      +packagingCostResult.totalCost +
      +postProcessingCostResult,
    details: {
      materialCostResult,
      packagingCostResult,
      postProcessingCostResult,
    },
  };
};

/**
 * 計算廠內後製程成本
 * @param {Object} process - 製程資料
 * @returns {Object} { totalCost, details } 總成本和詳細成本明細
 */
export const calculateInHousePostProcessingCost = (process) => {
  const {
    SQMaterialCostSetting,
    SQMaterialCosts,
    SQPackagingCosts,
    SQInPostProcessingCosts,
  } = process;

  const materialCostResult = calculateMaterialCost(
    SQMaterialCosts,
    SQMaterialCostSetting.estimatedDefectRate,
    SQMaterialCostSetting.estimatedMaterialFluctuation,
    SQMaterialCostSetting.processingCost
  );

  const packagingCostResult = calculatePackagingCost(SQPackagingCosts);

  const postProcessingData = SQInPostProcessingCosts[0];
  const postProcessingCostResult = calculatePostProcessingCost(
    postProcessingData.workSecond,
    postProcessingData.unitPrice
  );

  return {
    totalCost:
      +materialCostResult.totalCost +
      +packagingCostResult.totalCost +
      +postProcessingCostResult,
    details: {
      materialCostResult,
      packagingCostResult,
      postProcessingCostResult,
    },
  };
};

/**
 * 計算廠內出貨檢驗成本
 * @param {Object} process - 製程資料
 * @returns {Object} { totalCost, details } 總成本和檢驗成本明細
 */
export const calculateInHouseShippingInspectionCost = (process) => {
  const { SQInPostProcessingCosts } = process;
  const postProcessingCostResult = SQInPostProcessingCosts[0].amount;

  return {
    totalCost: postProcessingCostResult,
    details: {
      postProcessingCostResult,
    },
  };
};

/**
 * 計算運輸成本
 * @param {Object} shippingCosts - 運輸成本資料
 * @returns {Object} { totalCost, details } 總成本和運輸成本明細
 */
export const calculateTransportationCost = (shippingCosts) => {
  const { SQFreights, SQCustomsDuties } = shippingCosts;
  const costResult = calculateAdditionalFees(SQFreights, SQCustomsDuties);

  return {
    totalCost: costResult.totalCost,
    details: costResult,
  };
};

export { calculateProfitManagement };
