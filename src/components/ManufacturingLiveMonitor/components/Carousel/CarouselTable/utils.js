// src/components/ProductionTable/utils.js
import { DEFAULT_TABLE_CONFIG } from "./config";

/**
 * 創建狀態規則集，合併默認規則與客製化規則
 * @param {Object} customRules - 客製化狀態規則
 * @returns {Object} 合併後的狀態規則對象
 *
 * 狀態規則格式範例:
 * {
 *   normal: {
 *     condition: () => true,  // 條件函數，返回布林值
 *     color: "#1DE9B6",       // 顯示顏色
 *     columns: [1]            // 要套用顏色的列索引
 *   }
 * }
 */
export const createStatusRules = (customRules = {}) => {
  // 默認規則：normal狀態，條件總是為真，對第1列應用綠色
  const defaultRules = {
    normal: {
      condition: () => true,
      color: "#1DE9B6",
      columns: [1],
    },
  };

  // 合併默認規則與客製化規則，後者會覆蓋前者
  return { ...defaultRules, ...customRules };
};

/**
 * 創建基於數值範圍的條件函數
 * @param {string} field - 要檢查的數據字段名稱
 * @param {number} minValue - 最小值（含）
 * @param {number} maxValue - 最大值（含）
 * @returns {Function} 條件函數，接受一個項目並返回布林值
 *
 * 用法範例:
 * const highQuantityCondition = createColorCondition('quantity', 1000, Infinity);
 * // 會檢查item.quantity >= 1000
 */
export const createColorCondition =
  (field, minValue, maxValue) =>
  // 返回一個接受item參數的函數
  (item) => {
    // 將字段值轉換為數值
    const value = Number(item[field]);
    // 檢查值是否在指定範圍內
    return value >= minValue && value <= maxValue;
  };

/**
 * 創建基於日期比較的條件函數
 * @param {string} dateField - 日期字段名稱
 * @param {number} daysThreshold - 天數閾值
 * @param {string} compareType - 比較類型，"before"或"after"
 * @returns {Function} 條件函數，接受一個項目並返回布林值
 *
 * 用法範例:
 * const upcomingDeadlineCondition = createDateCondition('dueDate', 7, 'before');
 * // 會檢查item.dueDate是否在未來7天內
 */
export const createDateCondition =
  (dateField, daysThreshold, compareType = "before") =>
  // 返回一個接受item參數的函數
  (item) => {
    // 今天的日期
    const today = new Date();
    // 項目的日期
    const itemDate = new Date(item[dateField]);
    // 計算日期差異（天數）
    const diffTime = Math.abs(itemDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 根據比較類型返回不同的條件結果
    return compareType === "before"
      ? // 在未來的daysThreshold天內
        diffDays <= daysThreshold && itemDate > today
      : // 在過去的daysThreshold天內
        diffDays <= daysThreshold && itemDate < today;
  };

/**
 * 創建滾動展示板配置
 * @param {Array} header - 表頭定義
 * @param {Array} data - 表格數據
 * @param {Object} options - 額外配置選項
 * @param {Array} [options.columnWidths] - 列寬度設定
 * @param {Array} [options.columnAligns] - 列對齊方式
 * @param {Object} [options.scrollBoardConfig] - 額外的滾動板配置
 * @returns {Object} 完整的滾動展示板配置
 *
 * 將基本配置與用戶提供的選項合併，形成最終配置對象
 */
export const createScrollBoardConfig = (header, data, options = {}) => ({
  // 展開默認配置
  ...DEFAULT_TABLE_CONFIG,
  // 設置表頭和數據
  header,
  data,
  // 設置行數，顯示3行
  rowNum: 3,
  // 設置列寬
  columnWidth: options.columnWidths,
  // 設置對齊方式
  align: options.columnAligns,

  // 展開其他滾動板配置
  ...(options.scrollBoardConfig || {}),
});
