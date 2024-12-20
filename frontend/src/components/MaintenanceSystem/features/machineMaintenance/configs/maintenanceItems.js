// config/maintenanceItems.js
export const MAINTENANCE_ITEMS = [
  {
    id: "boxClean",
    label: "電控箱內清潔",
    method: "壓縮空氣、遠距吹掃",
  },
  {
    id: "hotWire",
    label: "電熱線路",
    method: "檢查、鎖固",
  },
  {
    id: "wireCheck",
    label: "線路完整度",
    method: "包紮或更換",
  },
  {
    id: "oilPipe",
    label: "曲肘打油管",
    method: "檢查、換接頭、油管",
  },
  {
    id: "fullClean",
    label: "全機清潔保養",
    method: "維持清潔",
  },
  {
    id: "safetyEquipment",
    label: "安全門及相關安全設備",
    method: "檢查、復原",
  },
];

// 測試資料
export const mockMaintenanceData = {
  rows: MAINTENANCE_ITEMS.map((item) => ({
    maintenanceCheckItem: item.label,
    maintenanceMethod: item.method,
    inspectionResult: "OK",
    inspector: "王小明",
    inspectionDate: "2024-12-16",
    reinspectionResult: "OK",
    reinspector: "李大華",
    reinspectionDate: "2024-12-17",
    approver: "張組長",
    approvalDate: "2024-12-18",
  })),
};

// 工具函數 - 獲取檢查項目的中文標籤
export const getMaintenanceLabel = (itemId) => {
  const item = MAINTENANCE_ITEMS.find((item) => item.id === itemId);
  return item ? item.label : itemId;
};

// 工具函數 - 獲取檢查項目的方法
export const getMaintenanceMethod = (itemId) => {
  const item = MAINTENANCE_ITEMS.find((item) => item.id === itemId);
  return item ? item.method : "";
};
