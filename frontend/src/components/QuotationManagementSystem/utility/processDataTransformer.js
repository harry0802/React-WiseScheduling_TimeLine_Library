/**
 * 轉換委外成型製程數據格式
 * @param {Object} data - 原始表單數據
 * @returns {Object} 轉換後的數據
 */
export const transformOutsourceInjectionData = (data) => {
  // 提取材料成本設置數據
  const materialCostSetting = {
    estimatedDefectRate: data.estimatedDefectRate,
    estimatedMaterialFluctuation: data.estimatedMaterialFluctuation,
    extractionCost: data.extractionCost,
    processingCost: data.processingCost,
  };

  // 清理材料成本數組數據
  const materialCosts = data.SQMaterialCosts.map((item) => ({
    materialName: item.materialName,
    materialSN: item.materialSN,
    unit: item.unit,
    weight: item.weight,
    unitPrice: item.unitPrice,
  }));

  // 清理包裝成本數組數據
  const packagingCosts = data.SQPackagingCosts.map((item) => ({
    materialName: item.materialName,
    materialSN: item.materialSN,
    packagingType: item.packagingType,
    unit: item.unit,
    quantity: item.quantity,
    unitPrice: item.unitPrice || 0,
    amount: item.amount,
  }));

  // 清理委外加工費用數據
  const outPostProcessingCosts = data.SQOutPostProcessingCosts || [];

  return {
    processCategory: data.processCategory,
    processSN: data.processSN,
    activeTab: data.activeTab,
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
  // 提取材料成本設置數據
  const materialCostSetting = {
    estimatedDefectRate: data.estimatedDefectRate,
    estimatedMaterialFluctuation: data.estimatedMaterialFluctuation,
    extractionCost: data.extractionCost,
    processingCost: data.processingCost,
  };

  // 清理材料成本數組數據
  const materialCosts = data.SQMaterialCosts.map((item) => ({
    materialName: item.materialName,
    materialSN: item.materialSN,
    unit: item.unit,
    weight: item.weight,
    unitPrice: item.unitPrice,
  }));

  // 清理包裝成本數組數據
  const packagingCosts = data.SQPackagingCosts.map((item) => ({
    materialName: item.materialName,
    materialSN: item.materialSN,
    packagingType: item.packagingType,
    unit: item.unit,
    quantity: item.quantity,
    unitPrice: item.unitPrice || 0,
    amount: item.amount,
  }));

  // 清理廠內加工費用數據
  const inPostProcessingCosts = data.SQInPostProcessingCosts || [];

  return {
    processCategory: data.processCategory,
    processSN: data.processSN,
    activeTab: data.activeTab,
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
  // 提取材料成本設置數據
  const materialCostSetting = {
    estimatedDefectRate: data.estimatedDefectRate,
    estimatedMaterialFluctuation: data.estimatedMaterialFluctuation,
    extractionCost: data.extractionCost,
    processingCost: data.processingCost,
  };

  // 清理材料成本數組數據
  const materialCosts = data.SQMaterialCosts.map((item) => ({
    materialName: item.materialName,
    materialSN: item.materialSN,
    unit: item.unit,
    weight: item.weight,
    unitPrice: item.unitPrice,
  }));

  // 清理包裝成本數組數據
  const packagingCosts = data.SQPackagingCosts.map((item) => ({
    materialName: item.materialName,
    materialSN: item.materialSN,
    packagingType: item.packagingType,
    unit: item.unit,
    quantity: item.quantity,
    unitPrice: item.unitPrice || 0,
    amount: item.amount,
  }));

  // 清理委外加工費用數據
  const outPostProcessingCosts = data.SQOutPostProcessingCosts || [];

  return {
    processCategory: data.processCategory,
    processSN: data.processSN,
    activeTab: data.activeTab,
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
  // 清理檢驗費用數據
  const inPostProcessingCosts = data.SQInPostProcessingCosts || [];

  return {
    processCategory: data.processCategory,
    processSN: data.processSN,
    activeTab: data.activeTab,
    SQInPostProcessingCosts: inPostProcessingCosts,
  };
};
/**
 * 轉換廠內成型製程數據格式
 * @param {Object} data - 原始表單數據
 * @returns {Object} 轉換後的數據
 */
export const transformInhouseInjectionData = (data) => {
  // 1. 基礎數據
  const baseData = {
    processCategory: data.processCategory,
    processSN: data.processSN,
    activeTab: data.activeTab,
  };

  // 2. 材料成本設置數據
  const materialCostSetting = {
    estimatedDefectRate: data.estimatedDefectRate || 0,
    estimatedMaterialFluctuation: data.estimatedMaterialFluctuation || 0,
    extractionCost: data.extractionCost || 0,
    processingCost: data.processingCost || 0,
  };

  // 3. 材料成本數組數據
  const materialCosts = Array.isArray(data.SQMaterialCosts)
    ? data.SQMaterialCosts.filter(Boolean).map((item) => ({
        materialName: item.materialName,
        materialSN: item.materialSN,
        unit: item.unit,
        weight: item.weight || 0,
        unitPrice: item.unitPrice || 0,
      }))
    : [];

  // 4. 包裝成本數組數據
  const packagingCosts = Array.isArray(data.SQPackagingCosts)
    ? data.SQPackagingCosts.filter(Boolean).map((item) => ({
        materialName: item.materialName,
        materialSN: item.materialSN,
        packagingType: item.packagingType,
        unit: item.unit,
        quantity: item.quantity || 0,
        unitPrice: item.unitPrice || 0,
        amount: item.amount || 0,
      }))
    : [];

  // 5. 注塑成型數據
  const injectionMoldingCost = {
    machineId: data.machineId || 0,
    machineSN: data.machineSN || "",
    workHoursRatio: data.workHoursRatio || 0,
    defectiveRate: data.defectiveRate || 0,
    cycleTime: data.cycleTime || 0,
    packageTime: data.packageTime || 0,
    moldCavity: data.moldCavity || 0,
    unitPrice: 0,
    amount: 0,
    subtotal: 0,
    electricityCost: 0,
  };

  return {
    ...baseData,
    SQMaterialCostSetting: materialCostSetting,
    SQMaterialCosts: materialCosts,
    SQPackagingCosts: packagingCosts,
    SQInjectionMoldingCosts: [injectionMoldingCost],
  };
};
/**
 * 根據製程類型選擇對應的轉換函數
 * @param {number} processCategory - 製程類型
 * @param {Object} data - 原始表單數據
 * @returns {Object} 轉換後的數據
 */
export const transformProcessData = (processCategory, data) => {
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
