// src/components/ProductionTable/config.js

// 表格默認配置
export const DEFAULT_TABLE_CONFIG = {
  headerBGC: "#0C2E49",
  // headerBGC: "oklch(50.51% 0.1026 237.81)",
  oddRowBGC: "#103362",
  // oddRowBGC: "oklch(94.61% 0 0)",
  evenRowBGC: "#0A2138",
  // evenRowBGC: "oklch(90.37% 0 0)",
  waitTime: 3000,
  carousel: "single",
  headerHeight: 45,
  index: false,
};

// 默認樣式
export const DEFAULT_STYLE = {
  border: "1px solid #114886",
  borderRadius: "4px",
  background: "rgba(4, 21, 46, 0.7)",
  boxShadow: "0 0 10px rgba(0, 140, 255, 0.3)",
};

// 其他默認值
export const DEFAULT_COLUMN_WIDTHS = [60];
export const DEFAULT_COLUMN_ALIGNS = [
  "center",
  "center",
  "center",
  "center",
  "left",
  "right",
  "center",
];
export const DEFAULT_HEADER = [
  "NO.",
  "型號編號",
  "型號名稱",
  "產品編號",
  "產品名稱",
  "生產數量",
  "機台",
];
