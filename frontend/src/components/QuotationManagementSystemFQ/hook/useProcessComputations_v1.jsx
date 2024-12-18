/**
 * 製程計算相關的工具函數集合
 */
import {
  calculateMaterialCost,
  calculatePackagingCost,
  calculateMoldingCost,
  calculateMoldingElectricityCost,
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
    FQMaterialCostSetting,
    FQMaterialCosts,
    FQPackagingCosts,
    FQInjectionMoldingCosts,
  } = process;
  const moldingData = FQInjectionMoldingCosts[0];

  const materialCostResult = calculateMaterialCost(
    FQMaterialCosts,
    FQMaterialCostSetting.estimatedDefectRate,
    FQMaterialCostSetting.estimatedMaterialFluctuation,
    FQMaterialCostSetting.extractionCost
  );

  const packagingCostResult = calculatePackagingCost(FQPackagingCosts);

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
    FQMaterialCostSetting,
    FQMaterialCosts,
    FQPackagingCosts,
    FQOutPostProcessingCosts,
  } = process;
  const materialCostResult = calculateMaterialCost(
    FQMaterialCosts,
    FQMaterialCostSetting.estimatedDefectRate,
    FQMaterialCostSetting.estimatedMaterialFluctuation,
    FQMaterialCostSetting.extractionCost
  );
  const packagingCostResult = calculatePackagingCost(FQPackagingCosts);

  const postProcessingCostResult = {
    totalCost: FQOutPostProcessingCosts.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    ),
    amounts: FQOutPostProcessingCosts.map((item) => item.amount),
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
    FQMaterialCostSetting,
    FQMaterialCosts,
    FQPackagingCosts,
    FQInPostProcessingCosts,
  } = process;

  const materialCostResult = calculateMaterialCost(
    FQMaterialCosts,
    FQMaterialCostSetting.estimatedDefectRate,
    FQMaterialCostSetting.estimatedMaterialFluctuation,
    FQMaterialCostSetting.extractionCost
  );

  const packagingCostResult = calculatePackagingCost(FQPackagingCosts);

  const postProcessingCostResult = {
    totalCost: FQInPostProcessingCosts.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    ),
    amounts: FQInPostProcessingCosts.map((item) => item.amount),
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
  const { FQInPostProcessingCosts } = process;

  const postProcessingCostResult = {
    totalCost: FQInPostProcessingCosts.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    ),
    amounts: FQInPostProcessingCosts.map((item) => item.amount),
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
  const { FQFreights, FQCustomsDuties } = shippingCosts;
  const costResult = calculateAdditionalFees(FQFreights, FQCustomsDuties);

  return {
    totalCost: costResult.totalCost,
    details: costResult,
  };
};

export { calculateProfitManagement };
