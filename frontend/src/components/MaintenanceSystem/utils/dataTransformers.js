// utils/dataTransformers.js
import { timeUtils } from "../../QuotationManagementSystem/utility/timeUtils";

// 新增一個過濾 null 值的輔助函數
const removeNullValues = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null)
  );
};

/**
 * @function transformFromApi
 * @description 將 API 資料轉換為前端格式
 */
export const transformFromApi = (apiData, maintenanceItems) => {
  if (!apiData?.data || !Array.isArray(apiData.data) || !maintenanceItems)
    return { rows: [] };

  // 用 Map 優化查找效率
  const maintenanceMap = new Map(
    apiData.data.map((item) => [item.maintenanceItem, item])
  );

  const rows = maintenanceItems?.map((config) => {
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
      approveResult: data.approveResult || null,
      approver: data.approver || null,
      approvalDate: data.approvalDate
        ? timeUtils.formatters.dateOnly(data.approvalDate)
        : null,
    };
  });

  return { rows };
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
        acc[item.maintenanceItem] = item.approveResult;
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

// 轉換表單數據為 API 格式 機器維護
export const transformToMaintenanceApiFormat = (
  formData,
  type,
  selectedData
) => {
  console.log("🚀 ~ formData:", formData);
  if (!selectedData.machineId || !selectedData.year || !selectedData.week) {
    throw new Error("缺少必要欄位: machineId, year, week");
  }

  // 基礎數據
  const baseData = {
    machineId: selectedData.machineId,
    year: selectedData.year,
    week: selectedData.week,
  };
  // 轉換檢查項目
  const checkItems = Object.entries(
    formData?.checkItems || {
      boxClean: formData.boxClean,
      fullClean: formData.fullClean,
      hotWire: formData.hotWire,
      oilPipe: formData.oilPipe,
      safetyEquipment: formData.safetyEquipment,
      wireCheck: formData.wireCheck,
    }
  ).reduce((acc, [key, value]) => {
    const apiKey = key;
    if (apiKey) {
      acc[apiKey] = value;
    }
    return acc;
  }, {});
  // 根據類型設置人員和日期
  const personnelData = {
    inspector: null,
    inspectionDate: null,
    reinspector: null,
    reinspectionDate: null,
    approver: null,
    approvalDate: null,
  };

  switch (type) {
    case "inspector":
      personnelData.inspector = formData.inspector;
      personnelData.inspectionDate = formData.inspectorDate;
      break;
    case "reinspector":
      personnelData.reinspector = formData.reinspector;
      personnelData.reinspectionDate = formData.reinspectorDate;
      break;
    case "approver":
      personnelData.approver = formData.approver;
      personnelData.approvalDate = formData.approverDate;
      break;
    default:
      break;
  }

  // 在返回前過濾掉 null 值
  return removeNullValues({
    machineId: baseData.machineId,
    year: baseData.year,
    week: baseData.week,
    ...checkItems,
    ...personnelData,
  });
};

// 轉換 API 數據為表單格式 模具維護
export const transformToMoldMaintenanceForm = (
  formData,
  type,
  selectedData
) => {
  console.log("🚀 ~ formData:", formData);
  if (!selectedData.moldSN || !selectedData.year || !selectedData.week) {
    throw new Error("缺少必要欄位: moldSN, year, week");
  }
  // 基礎數據
  const baseData = {
    moldSN: selectedData.moldSN,
    year: selectedData.year,
    week: selectedData.week,
  };

  // 轉換檢查項目
  const checkItems = Object.entries({
    moldClean: formData.moldClean,
    moldOil: formData.moldOil,
    wireCheck: formData.wireCheck,
    cavityCheck: formData.cavityCheck,
    partsCheck: formData.partsCheck,
    screwCheck: formData.screwCheck,
  }).reduce((acc, [key, value]) => {
    const apiKey = key;
    if (apiKey) {
      acc[apiKey] = value;
    }
    return acc;
  }, {});

  // 根據類型設置人員和日期
  const personnelData = {
    inspector: null,
    inspectionDate: null,
    reinspector: null,
    reinspectionDate: null,
    approver: null,
    approvalDate: null,
  };

  switch (type) {
    case "inspector":
      personnelData.inspector = formData.inspector;
      personnelData.inspectionDate = formData.inspectorDate;
      break;
    case "reinspector":
      personnelData.reinspector = formData.reinspector;
      personnelData.reinspectionDate = formData.reinspectorDate;
      break;
    case "approver":
      personnelData.approver = formData.approver;
      personnelData.approvalDate = formData.approverDate;
      break;
    default:
      break;
  }

  // 在返回前過濾掉 null 值
  return removeNullValues({
    moldSN: baseData.moldSN,
    year: baseData.year,
    week: baseData.week,
    ...checkItems,
    ...personnelData,
  });
};
