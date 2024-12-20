// utils/dataTransformers.js
import { MAINTENANCE_ITEMS } from "../configs/maintenanceItems";
import { timeUtils } from "../../../../QuotationManagementSystem/utility/timeUtils";

/**
 * @function transformFromApi
 * @description 將 API 資料轉換為前端格式
 */
export const transformFromApi = (apiData) => {
  if (!apiData?.data || !Array.isArray(apiData.data)) return { rows: [] };

  // 用 Map 優化查找效率
  const maintenanceMap = new Map(
    apiData.data.map((item) => [item.maintenanceItem, item])
  );

  const rows = MAINTENANCE_ITEMS.map((config) => {
    // 直接用 config.id 對應 API 的 maintenanceItem
    const data = maintenanceMap.get(config.id) || {};

    return {
      id: data.id,
      machineId: data.machineId,
      week: data.week,
      maintenanceCheckItem: config.label,
      maintenanceMethod: config.method,
      inspectionResult: data.inspectionResult || null,
      inspector: data.inspector || null,
      inspectionDate: data.inspectionDate
        ? timeUtils.formatters.dateOnly(data.inspectionDate)
        : null,
      reinspectionResult: data.reinspectionResult || null,
      reinspector: data.reinspector || null,
      reinspectionDate: data.reinspectionDate
        ? timeUtils.formatters.dateOnly(data.reinspectionDate)
        : null,
      approver: data.approver || null,
      approvalDate: data.approvalDate
        ? timeUtils.formatters.dateOnly(data.approvalDate)
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

// ��增表單數據過濾函數
export const filterFormData = (type, data) => {
  if (!data?.rows?.length) return null;

  const row = data.rows[0]; // 因為同一批次的數據共用這些信息

  switch (type) {
    case "inspector":
      return {
        inspector: row.inspector,
        inspectionDate: row.inspectionDate,
        inspectionResults: data.rows.map((item) => ({
          id: item.id,
          maintenanceCheckItem: item.maintenanceCheckItem,
          inspectionResult: item.inspectionResult,
        })),
      };

    case "reinspector":
      return {
        reinspector: row.reinspector,
        reinspectionDate: row.reinspectionDate,
        reinspectionResults: data.rows.map((item) => ({
          id: item.id,
          maintenanceCheckItem: item.maintenanceCheckItem,
          reinspectionResult: item.reinspectionResult,
        })),
      };

    case "approver":
      return {
        approver: row.approver,
        approvalDate: row.approvalDate,
        approvalResults: data.rows.map((item) => ({
          id: item.id,
          maintenanceCheckItem: item.maintenanceCheckItem,
          inspectionResult: item.inspectionResult,
          reinspectionResult: item.reinspectionResult,
        })),
      };

    default:
      return null;
  }
};

// 轉換 API 數據為表單格式
export const transformApiToForm = (apiData, type) => {
  if (!apiData?.data?.length) return null;

  const checkItems = apiData.data.reduce((acc, item) => {
    switch (type) {
      case "inspector":
        acc[item.maintenanceItem] = item.inspectionResult;
        break;
      case "reinspector":
        acc[item.maintenanceItem] = item.reinspectionResult;
        break;
      case "approver":
        acc[item.maintenanceItem] = item.approvalResult;
        break;
      default:
        break;
    }

    return acc;
  }, {});

  const firstItem = apiData.data[0];
  const personnel =
    type === "inspector"
      ? firstItem.inspector
      : type === "reinspector"
      ? firstItem.reinspector
      : type === "approver"
      ? firstItem.approver
      : null;

  const date =
    type === "inspector"
      ? firstItem.inspectionDate
      : type === "reinspector"
      ? firstItem.reinspectionDate
      : type === "approver"
      ? firstItem.approvalDate
      : null;

  return {
    checkItems,
    personnel,
    date: date ? timeUtils.formatters.dateOnly(date) : timeUtils.getNow(),
    type,
  };
};
