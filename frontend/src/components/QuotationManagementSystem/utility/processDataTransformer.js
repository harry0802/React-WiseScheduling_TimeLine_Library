import { PROCESS_CATEGORY_OPTION } from "../../../config/config";
import { convertToPercentage } from "./commonUtils";

/**
 * 轉換材料成本設置數據
 * @param {Object} setting - 材料成本設置
 * @returns {Object} - 轉換後的設置
 */
const transformMaterialCostSetting = (setting) => ({
  ...setting,
  estimatedDefectRate: convertToPercentage(setting.estimatedDefectRate),
  estimatedMaterialFluctuation: convertToPercentage(
    setting.estimatedMaterialFluctuation
  ),
});

/**
 * 轉換注塑成型數據
 * @param {Array} costs - 注塑成型成本數組
 * @returns {Array} - 轉換後的成本數組
 */
const transformInjectionMoldingCosts = (costs) =>
  costs.map((cost) => ({
    ...cost,
    workHoursRatio: convertToPercentage(cost.workHoursRatio),
    defectiveRate: convertToPercentage(cost.defectiveRate),
  }));

/**
 * 處理包裝成本數據
 * @param {Object} item - 包裝成本項目
 * @returns {Object} - 處理後的包裝成本項目
 */
const processPackagingCost = (item) => {
  const unitLowerCase = item.unit?.toLowerCase();

  // 如果單位是「件」或「個」，則 bagsPerKg 設為 0
  if (unitLowerCase === "件" || unitLowerCase === "個") {
    return {
      ...item,
      bagsPerKg: 0,
    };
  }

  // 如果單位是「公斤」或「磅」，保持原值
  if (unitLowerCase === "公斤" || unitLowerCase === "磅") {
    return {
      ...item,
    };
  }

  // 其他情況保持原值
  return {
    ...item,
  };
};

/**
 * 轉換委外成型製程數據格式
 * @param {Object} data - 原始表單數據
 * @returns {Object} 轉換後的數據
 */
export const transformOutsourceInjectionData = (data) => {
  // 1. 基礎數據
  const baseData = {
    processOptionId: data.processSN,
    processCategory: data.processCategory,
    processSN: data.processSN,
  };

  // 提取材料成本設置數據
  const materialCostSetting = transformMaterialCostSetting(
    data.SQMaterialCostSetting
  );

  // 清理材料成本數組數據
  const materialCosts = data.SQMaterialCosts.map((item) => ({
    ...item,
  }));

  // 清理包裝成本數組數據
  const packagingCosts = data.SQPackagingCosts.map(processPackagingCost);

  // 清理委外加工費用數據
  const outPostProcessingCosts = data.SQOutPostProcessingCosts || [];

  return {
    ...baseData,
    SQMaterialCostSetting: materialCostSetting,
    SQMaterialCosts: materialCosts,
    SQPackagingCosts: packagingCosts,
    SQOutPostProcessingCosts: outPostProcessingCosts,
  };
};

/**
 * 轉換廠內後製程數據格式
 * @param {Object} data - 原始表單數據
 * @returns {Object} 轉換後的數據
 */
export const transformInhousePostProcessData = (data) => {
  // 1. 基礎數據
  const baseData = {
    processOptionId: data.processSN,
    processCategory: data.processCategory,
    processSN: data.processSN,
    activeTab: data.activeTab,
  };

  // 提取材料成本設置數據
  const materialCostSetting = transformMaterialCostSetting(
    data.SQMaterialCostSetting
  );

  // 清理材料成本數組數據
  const materialCosts = data.SQMaterialCosts.map((item) => ({
    ...item,
  }));

  // 清理包裝成本數組數據
  const packagingCosts = data.SQPackagingCosts.map(processPackagingCost);

  // 清理廠內加工費用數據
  const inPostProcessingCosts = data.SQInPostProcessingCosts || [];

  return {
    ...baseData,
    SQMaterialCostSetting: materialCostSetting,
    SQMaterialCosts: materialCosts,
    SQPackagingCosts: packagingCosts,
    SQInPostProcessingCosts: inPostProcessingCosts,
  };
};

/**
 * 轉換委外後製程數據格式
 * @param {Object} data - 原始表單數據
 * @returns {Object} 轉換後的數據
 */
export const transformOutsourcePostProcessData = (data) => {
  // 1. 基礎數據
  const baseData = {
    processOptionId: data.processSN,
    processCategory: data.processCategory,
    processSN: data.processSN,
    activeTab: data.activeTab,
  };

  // 提取材料成本設置數據
  const materialCostSetting = transformMaterialCostSetting(
    data.SQMaterialCostSetting
  );

  // 清理材料成本數組數據
  const materialCosts = data.SQMaterialCosts.map((item) => ({
    ...item,
  }));

  // 清理包裝成本數組數據
  const packagingCosts = data.SQPackagingCosts.map(processPackagingCost);

  // 清理委外加工費用數據
  const outPostProcessingCosts = data.SQOutPostProcessingCosts || [];

  return {
    ...baseData,
    SQMaterialCostSetting: materialCostSetting,
    SQMaterialCosts: materialCosts,
    SQPackagingCosts: packagingCosts,
    SQOutPostProcessingCosts: outPostProcessingCosts,
  };
};

/**
 * 轉換廠內出貨檢驗數據格式
 * @param {Object} data - 原始表單數據
 * @returns {Object} 轉換後的數據
 */
export const transformInhouseShipmentInspectionData = (data) => {
  // 1. 基礎數據
  const baseData = {
    processOptionId: data.processSN,
    processCategory: data.processCategory,
    processSN: data.processSN,
  };

  // 清理檢驗費用數據
  const inPostProcessingCosts = Array.isArray(data.SQInPostProcessingCosts)
    ? data.SQInPostProcessingCosts.map((item) => ({
        ...item,
      }))
    : [];

  return {
    ...baseData,
    SQInPostProcessingCosts: inPostProcessingCosts,
  };
};
/**
 * 轉換廠內成型製程數據格式
 * @param {Object} data - 原始表單數據s
 * @returns {Object} 轉換後的數據
 */
export const transformInhouseInjectionData = (data) => {
  // 1. 基礎數據
  const baseData = {
    processOptionId: data.processSN,
    processCategory: data.processCategory,
    processSN: data.processSN,
  };

  // 2. 材料成本設置數據
  const materialCostSetting = transformMaterialCostSetting(
    data.SQMaterialCostSetting
  );

  // 3. 材料成本數組數據
  const materialCosts = Array.isArray(data.SQMaterialCosts)
    ? data.SQMaterialCosts.filter(Boolean).map((item) => ({
        ...item,
      }))
    : [];

  // 4. 包裝成本數組數據
  const packagingCosts = Array.isArray(data.SQPackagingCosts)
    ? data.SQPackagingCosts.filter(Boolean).map(processPackagingCost)
    : [];

  // 5. 注塑成型數據
  const injectionMoldingCost = Array.isArray(data.SQInjectionMoldingCosts)
    ? transformInjectionMoldingCosts(
        data.SQInjectionMoldingCosts.filter(Boolean)
      )
    : [];
  return {
    ...baseData,
    SQMaterialCostSetting: materialCostSetting,
    SQMaterialCosts: materialCosts,
    SQPackagingCosts: packagingCosts,
    SQInjectionMoldingCosts: injectionMoldingCost,
  };
};
/**
 * 根據製程類型選擇對應的轉換函數
 * @param {number} processCategory - 製程類型
 * @param {Object} data - 原始表單數據
 * @returns {Object} 轉換後的數據
 */
export const transformProcessData = (processCategory, data) => {
  console.log(PROCESS_CATEGORY_OPTION[0].category);

  switch (processCategory) {
    case PROCESS_CATEGORY_OPTION[0].category: // 廠內成型
      return transformInhouseInjectionData(data);
    case PROCESS_CATEGORY_OPTION[1].category: // 委外成型
      return transformOutsourceInjectionData(data);
    case PROCESS_CATEGORY_OPTION[2].category: // 廠內後製程
      return transformInhousePostProcessData(data);
    case PROCESS_CATEGORY_OPTION[3].category: // 委外後製程
      return transformOutsourcePostProcessData(data);
    case PROCESS_CATEGORY_OPTION[4].category: // 廠內出貨檢驗
      return transformInhouseShipmentInspectionData(data);
    default:
      throw new Error(`不支援的製程類型: ${processCategory}`);
  }
};
