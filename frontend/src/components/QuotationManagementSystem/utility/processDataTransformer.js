import { PROCESS_CATEGORY_OPTION } from "../../../config/config";

/**
 * 轉換委外成型製程數據格式
 * @param {Object} data - 原始表單數據
 * @returns {Object} 轉換後的數據
 */
export const transformOutsourceInjectionData = (data) => {
  console.log(
    "🔥🔥🔥🔥 ~ transformOutsourceInjectionData ~ data:",
    data.processCategory
  );
  // 1. 基礎數據
  const baseData = {
    processOptionId: data.processCategory,
    processCategory: PROCESS_CATEGORY_OPTION[data.processCategory - 1].category,
    processSN: data.processSN,
  };

  // 提取材料成本設置數據
  const materialCostSetting = {
    ...data.SQMaterialCostSetting,
  };

  // 清理材料成本數組數據
  const materialCosts = data.SQMaterialCosts.map((item) => ({
    ...item,
  }));

  // 清理包裝成本數組數據
  const packagingCosts = data.SQPackagingCosts.map((item) => ({
    ...item,
    // unitPrice: item.unitPrice || 0,
    // amount: item.amount,
    // capacity: item.capacity,
    // bagsPerKg: item.bagsPerKg,
  }));

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
    processOptionId: data.processCategory,
    processCategory: PROCESS_CATEGORY_OPTION[data.processCategory - 1].category,
    processSN: data.processSN,
    activeTab: data.activeTab,
  };

  // 提取材料成本設置數據
  const materialCostSetting = {
    ...data.SQMaterialCostSetting,
  };

  // 清理材料成本數組數據
  const materialCosts = data.SQMaterialCosts.map((item) => ({
    ...item,
    // id: item.id || index + 1,
    // materialName: item.materialName,
    // materialSN: item.materialSN,
    // unit: item.unit,
    // weight: item.weight,
    // unitPrice: item.unitPrice,
  }));

  // 清理包裝成本數組數據
  const packagingCosts = data.SQPackagingCosts.map((item) => ({
    ...item,
    // id: item.id || index + 1,
    // materialName: item.materialName,
    // materialSN: item.materialSN,
    // packagingType: item.packagingType,
    // unit: item.unit,
    // quantity: item.quantity,
    // unitPrice: item.unitPrice || 0,
    // amount: item.amount,
  }));

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
    processOptionId: data.processCategory,
    processCategory: PROCESS_CATEGORY_OPTION[data.processCategory - 1].category,
    processSN: data.processSN,
    activeTab: data.activeTab,
  };

  // 提取材料成本設置數據
  const materialCostSetting = {
    ...data.SQMaterialCostSetting,
  };

  // 清理材料成本數組數據
  const materialCosts = data.SQMaterialCosts.map((item) => ({
    ...item,
    // id: item.id || index + 1,
    // materialName: item.materialName,
    // materialSN: item.materialSN,
    // unit: item.unit,
    // weight: item.weight,
    // unitPrice: item.unitPrice,
  }));

  // 清理包裝成本數組數據
  const packagingCosts = data.SQPackagingCosts.map((item) => ({
    ...item,
    // id: item.id || index + 1,
    // materialName: item.materialName,
    // materialSN: item.materialSN,
    // packagingType: item.packagingType,
    // unit: item.unit,
    // quantity: item.quantity,
    unitPrice: item.unitPrice || 0,
    amount: item.amount,
  }));

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
    processOptionId: data.processCategory,
    processCategory: PROCESS_CATEGORY_OPTION[data.processCategory - 1].category,
    processSN: data.processSN,
    activeTab: data.activeTab,
  };

  // 清理檢驗費用數據
  const inPostProcessingCosts = data.SQInPostProcessingCosts || [];

  return {
    ...baseData,
    SQInPostProcessingCosts: inPostProcessingCosts,
  };
};
/**
 * 轉換廠內成型製程數據格式
 * @param {Object} data - 原始表單數據
 * @returns {Object} 轉換後的數據
 */
export const transformInhouseInjectionData = (data) => {
  console.log("🔥🔥🔥🔥 ~ transformInhouseInjectionData ~ data:", data);
  // 1. 基礎數據
  const baseData = {
    processOptionId: data.processCategory,
    processCategory: PROCESS_CATEGORY_OPTION[data.processCategory - 1].category,
    processSN: data.processSN,
  };

  // 2. 材料成本設置數據
  const materialCostSetting = {
    ...data.SQMaterialCostSetting,
  };

  // 3. 材料成本數組數據
  const materialCosts = Array.isArray(data.SQMaterialCosts)
    ? data.SQMaterialCosts.filter(Boolean).map((item) => ({
        ...item,
      }))
    : [];

  // 4. 包裝成本數組數據
  const packagingCosts = Array.isArray(data.SQPackagingCosts)
    ? data.SQPackagingCosts.filter(Boolean).map((item) => ({
        ...item,
        // materialName: item.materialName,
        // materialSN: item.materialSN,
        // packagingType: item.packagingType,
        // unit: item.unit,
        // quantity: item.quantity || 0,
        // unitPrice: item.unitPrice || 0,
        // amount: item.amount || 0,
      }))
    : [];

  // 5. 注塑成型數據
  const injectionMoldingCost = Array.isArray(data.SQInjectionMoldingCosts)
    ? data.SQInjectionMoldingCosts.filter(Boolean).map((item) => ({
        ...item,
        // machineId: data.machineId || 0,
        // machineSN: data.machineSN || "",
        // workHoursRatio: data.workHoursRatio || 0,
        // defectiveRate: data.defectiveRate || 0,
        // cycleTime: data.cycleTime || 0,
        // packageTime: data.packageTime || 0,
      }))
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
  console.log("🔥🔥🔥🔥 ~ transformProcessData ~ data:", data);
  console.log(
    "🔥🔥🔥🔥 ~ transformProcessData ~ processCategory:",
    processCategory
  );
  switch (processCategory) {
    case 1: // 廠內成型
      return transformInhouseInjectionData(data);
    case 2: // 委外成型
      return transformOutsourceInjectionData(data);
    case 3: // 廠內後製程
      return transformInhousePostProcessData(data);
    case 4: // 委外後製程
      return transformOutsourcePostProcessData(data);
    case 5: // 廠內出貨檢驗
      return transformInhouseShipmentInspectionData(data);
    default:
      throw new Error(`不支援的製程類型: ${processCategory}`);
  }
};
