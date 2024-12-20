// utils/dataTransformers.js
import { MAINTENANCE_ITEMS } from "../configs/maintenanceItems";
import { timeUtils } from "../../../../QuotationManagementSystem/utility/timeUtils";

/**
 * @function transformFromApi
 * @description 將 API 資料轉換為前端格式
 */
export const transformFromApi = (apiData) => {
  if (!apiData) return { rows: [] };

  // 將每個維護項目轉換為獨立的行
  const rows = MAINTENANCE_ITEMS.map((item) => {
    const itemId = item.id;

    return {
      id: apiData.id,
      machineId: apiData.machineId,
      week: apiData.week,
      maintenanceCheckItem: item.label,
      maintenanceMethod: item.method,
      inspectionResult: apiData[itemId] || null,
      inspector: apiData.inspector,
      inspectionDate: timeUtils.formatters.isoWithTZ(apiData.inspectionDate),
      reinspectionResult: apiData[`${itemId}Reinspection`] || null,
      reinspector: apiData.reinspector,
      reinspectionDate: apiData.reinspectionDate
        ? timeUtils.formatters.isoWithTZ(apiData.reinspectionDate)
        : null,
      approver: apiData.approver,
      approvalDate: apiData.approvalDate
        ? timeUtils.formatters.isoWithTZ(apiData.approvalDate)
        : null,
    };
  });

  return { rows };
};

/**
 * @function transformToApi
 * @description 將前端資料轉換為 API 格式
 */
export const transformToApi = (formData, originalData) => {
  // 保留原始資料的基本信息
  const baseData = {
    machineId: originalData.machineId,
    year: originalData.year,
    week: originalData.week,
  };

  // 將所有維護項目的結果轉換為扁平結構
  const maintenanceResults = MAINTENANCE_ITEMS.reduce((acc, item) => {
    acc[item.id] = formData.inspectionResult;
    return acc;
  }, {});

  return {
    ...baseData,
    ...maintenanceResults,
    inspector: formData.inspector,
    inspectionDate: formData.inspectionDate,
    reinspector: formData.reinspector,
    reinspectionDate: formData.reinspectionDate,
    approver: formData.approver,
    approvalDate: formData.approvalDate,
  };
};

// 輔助函數：查找項目資訊
export const findMaintenanceItem = (itemId) => {
  return MAINTENANCE_ITEMS.find((item) => item.id === itemId);
};
