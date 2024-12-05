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
    SQMaterialCostSetting.extractionCost
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
    moldingData.cycleTime,
    moldingData.moldCavity,
    moldingData.electricityCostPerSec
  );
  return {
    totalCost:
      +materialCostResult.totalCost +
      +packagingCostResult.totalCost +
      +moldingElectricityCost +
      +moldingCostResult.totalCost,
    details: {
      materialCostResult,
      packagingCostResult,
      moldingCostResult: moldingCostResult.amounts,
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
    SQMaterialCostSetting.extractionCost
  );
  const packagingCostResult = calculatePackagingCost(SQPackagingCosts);

  const postProcessingCostResult = {
    totalCost: SQOutPostProcessingCosts.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    ),
    amounts: SQOutPostProcessingCosts.map((item) => item.amount),
  };
  return {
    totalCost:
      +materialCostResult.totalCost +
      +packagingCostResult.totalCost +
      +postProcessingCostResult.totalCost,
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
    SQMaterialCostSetting.extractionCost
  );

  const packagingCostResult = calculatePackagingCost(SQPackagingCosts);

  const postProcessingCostResult = {
    totalCost: SQInPostProcessingCosts.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    ),
    amounts: SQInPostProcessingCosts.map((item) => item.amount),
  };

  return {
    totalCost:
      +materialCostResult.totalCost +
      +packagingCostResult.totalCost +
      +postProcessingCostResult.totalCost,
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

  const postProcessingCostResult = {
    totalCost: SQInPostProcessingCosts.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    ),
    amounts: SQInPostProcessingCosts.map((item) => item.amount),
  };

  return {
    totalCost: postProcessingCostResult.totalCost,
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
