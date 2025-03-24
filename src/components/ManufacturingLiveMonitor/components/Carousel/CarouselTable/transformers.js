// src/components/ProductionTable/transformers.js
import { DEFAULT_HEADER } from "./config";

/**
 * 設定表格單元格的顯示顏色
 * @param {string} content - 單元格的原始內容
 * @param {string} color - 顏色代碼，如 "#fff" 或 "red"
 * @returns {string} 包含顏色樣式的HTML片段
 *
 * 這個函數通過將內容包裝在帶有顏色樣式的span標籤中來改變文字顏色
 * 例如: applyColorToCell("測試", "red") 會返回 '<span style="color:red;">測試</span>'
 */
export const applyColorToCell = (content, color) =>
  `<span style="color:${color};">${content}</span>`;

/**
 * 格式化表格行號
 * @param {number} index - 行的索引（從0開始）
 * @returns {string} 格式化後帶有白色樣式的行號HTML
 *
 * 這個函數將索引+1並補零，然後應用白色樣式
 * 例如: 索引0 -> "01", 索引9 -> "10"，並且顏色為白色
 */
export const formatRowNumber = (index) => {
  // 將索引+1轉為字串，並使用padStart確保至少有2位數（不足則補0）
  const rowNum = String(index + 1).padStart(2, "0");

  // 應用白色樣式並返回
  return applyColorToCell(rowNum, "#fff");
};

/**
 * 🧠 評估項目是否符合特定條件
 * @param {function|string} condition - 評估條件，可以是函數或狀態字串
 * @param {object} item - 要評估的數據項
 * @returns {boolean} 項目是否符合條件
 *
 * 這個函數有兩種工作模式:
 * 1. 如果condition是函數，調用它並傳入item作為參數
 * 2. 如果condition是字串，檢查item.status是否等於該字串
 */
export const evaluateCondition = (condition, item) =>
  typeof condition === "function"
    ? condition(item) // 如果是函數，調用並傳入item
    : item.status === condition; // 如果是字串，與item.status比較

/**
 * 根據規則集確定行的狀態
 * @param {object} item - 數據項
 * @param {object} statusRules - 狀態規則對象，格式為 {狀態名: {condition: 條件, ...}}
 * @param {string} defaultStatus - 默認狀態，當沒有規則匹配時使用
 * @returns {string} 確定的狀態名稱
 *
 * 這個函數遍歷所有狀態規則，返回第一個條件匹配的狀態名稱
 * 如果沒有匹配的規則，則返回defaultStatus
 */
export const determineRowStatus = (item, statusRules, defaultStatus) => {
  // 遍歷所有狀態規則
  for (const [status, rule] of Object.entries(statusRules)) {
    // 使用evaluateCondition檢查item是否符合當前規則的條件
    if (evaluateCondition(rule.condition, item)) {
      return status; // 返回匹配的狀態名稱
    }
  }

  // 如果沒有匹配的規則，返回默認狀態
  return defaultStatus;
};

/**
 * 根據狀態對行數據的特定列應用顏色
 * @param {array} rowData - 行數據陣列
 * @param {string} status - 狀態名稱
 * @param {object} statusRules - 狀態規則對象
 * @returns {array} 應用顏色後的行數據陣列
 *
 * 這個函數根據狀態規則中的顏色和指定列，對行數據進行著色處理
 * 只有在規則中指定的列索引才會被著色
 */
export const applyStatusColoring = (rowData, status, statusRules) => {
  // 獲取對應狀態的規則
  const rule = statusRules[status];

  // 如果規則不存在或沒有顏色屬性，直接返回原始數據
  if (!rule || !rule.color) return rowData;

  // 獲取需要著色的列索引陣列，如果未指定則使用空陣列
  const columns = rule.columns || [];

  // 🧠 對行數據進行映射處理，為指定列應用顏色
  return rowData.map((cell, index) => {
    // 如果當前列在指定列中且內容不為空，則應用顏色
    if (columns.includes(index) && cell) {
      return applyColorToCell(cell, rule.color);
    }
    // 否則保持原樣
    return cell;
  });
};

/**
 * ✨ 將API返回的原始數據轉換為表格可用的格式
 * @param {array} apiData - API返回的原始數據陣列
 * @param {object} options - 轉換選項
 * @param {array} [options.header] - 表頭定義
 * @param {object} [options.fieldMapping] - API字段到表格列的映射關係
 * @param {object} [options.formatters] - 字段格式化器
 * @param {object} [options.statusRules] - 狀態規則定義
 * @param {string} [options.defaultStatus] - 默認狀態
 * @param {function} [options.dataProcessor] - 數據後處理函數
 * @returns {object} 包含表頭和處理後數據的對象 {header, data}
 *
 * 這是轉換過程的主函數，它協調各個步驟將原始數據轉換為表格所需格式
 */
export const transformApiData = (apiData, options = {}) => {
  // 數據有效性檢查: 如果數據無效則返回空數據集
  if (!apiData || !Array.isArray(apiData) || apiData.length === 0) {
    return { header: options.header || DEFAULT_HEADER, data: [] };
  }

  // 解構並設置處理選項，應用默認值
  const {
    header = DEFAULT_HEADER,
    fieldMapping = {
      modelCode: 1, // 型號編號映射到第1列
      modelName: 2, // 型號名稱映射到第2列
      productCode: 3, // 產品編號映射到第3列
      productName: 4, // 產品名稱映射到第4列
      quantity: 5, // 數量映射到第5列
      station: 6, // 機台映射到第6列
    },
    formatters = {
      // 數量格式化為本地數字格式，例如 1000 -> "1,000"
      quantity: (val) => val.toLocaleString(),
    },
    statusRules = {
      // 默認的正常狀態規則，條件始終為真，對第1列應用綠色
      normal: {
        condition: () => true,
        color: "#1DE9B6",
        columns: [1],
      },
    },
    defaultStatus = "normal",
    dataProcessor, // 可選的數據後處理函數
  } = options;

  // 💡 處理每一行數據
  let data = apiData.map((item, index) => {
    // 創建與表頭長度相同的空白行數據陣列
    const rowData = Array(header.length).fill("");

    // 設置行號（第0列）
    rowData[0] = formatRowNumber(index);

    // 根據字段映射填充每一列的數據
    Object.entries(fieldMapping).forEach(([apiField, colIndex]) => {
      // 只處理API數據中存在的字段
      if (item[apiField] !== undefined) {
        // 獲取對應字段的格式化器（如果有）
        const formatter = formatters[apiField];

        // 應用格式化器或直接使用原值
        rowData[colIndex] = formatter
          ? formatter(item[apiField])
          : item[apiField];
      }
    });

    // 確定行的狀態並應用相應的顏色處理
    const status = determineRowStatus(item, statusRules, defaultStatus);
    return applyStatusColoring(rowData, status, statusRules);
  });

  // 應用可選的後處理函數，用於額外的數據處理或轉換
  if (typeof dataProcessor === "function") {
    data = dataProcessor(data, apiData);
  }

  // 返回最終的表頭和數據
  return { header, data };
};
