/**
 * @fileoverview 工單資料轉換工具函數
 * @description 將API資料轉換為組件所需格式，重用現有的calcDay.js工具
 *
 * 這個模組提供了一系列純函數，用於處理從API獲取的工單資料：
 * - 資料結構標準化
 * - 空值和錯誤處理
 * - 日期格式轉換
 * - 資料驗證
 *
 * 所有函數都是純函數，沒有副作用，可以安全地在React組件中使用。
 *
 * @version 2.0.0
 * @author Manufacturing Live Monitor Team
 * @since 2025-01-03
 */

/**
 * 轉換單一工單項目
 * @description 將單個API工單物件轉換為標準化格式，處理空值並添加序號
 *
 * @function
 * @param {Object} item - API回傳的工單資料
 * @param {string} [item.workOrderSN] - 工單序號
 * @param {string} [item.processName] - 製程名稱
 * @param {string} [item.productSN] - 產品編號
 * @param {string} [item.productName] - 產品名稱
 * @param {number|null} [item.productionQuantity] - 生產數量
 * @param {string} [item.machineSN] - 機台編號
 * @param {string} [item.planFinishDate] - 計劃完成日期 (ISO格式)
 * @param {string} [item.status] - 工單狀態
 * @param {number} index - 項目索引，用於生成行號（從0開始）
 *
 * @returns {Object} 轉換後的工單資料
 * @returns {number} returns.no - 序號（從1開始）
 * @returns {string} returns.workOrderSN - 工單序號（"N/A" 如果為空）
 * @returns {string} returns.processName - 製程名稱（"N/A" 如果為空）
 * @returns {string} returns.productSN - 產品編號（"N/A" 如果為空）
 * @returns {string} returns.productName - 產品名稱（"N/A" 如果為空）
 * @returns {number|string} returns.productionQuantity - 生產數量（"--" 如果為null/undefined）
 * @returns {string} returns.machineSN - 機台編號（"N/A" 如果為空）
 * @returns {string} returns.planFinishDate - 計劃完成日期
 * @returns {string} returns.status - 工單狀態
 *
 * @example
 * ```javascript
 * const rawItem = {
 *   workOrderSN: "WO001",
 *   processName: "射出成型",
 *   productSN: "P001",
 *   productName: "塑膠零件A",
 *   productionQuantity: 5000,
 *   machineSN: "M001",
 *   planFinishDate: "2025-01-10T00:00:00Z",
 *   status: "in_progress"
 * };
 *
 * const transformed = transformWorkOrderItem(rawItem, 0);
 * // 結果: { no: 1, workOrderSN: "WO001", ... }
 * ```
 *
 * @since 2025-01-03
 */
export const transformWorkOrderItem = (item, index) => ({
  no: index + 1,
  workOrderSN: item.workOrderSN || "N/A",
  processName: item.processName || "N/A",
  productSN: item.productSN || "N/A",
  productName: item.productName || "N/A",
  productionQuantity:
    item.productionQuantity != null ? item.productionQuantity : "--",
  machineSN: item.machineSN || "N/A",
  planFinishDate: item.planFinishDate,
  status: item.status,
});

/**
 * 轉換工單資料陣列
 * @description 批次轉換API回傳的工單資料陣列，為每個項目添加序號
 *
 * @function
 * @param {Array} rawData - API回傳的原始資料陣列
 * @returns {Array} 轉換後的資料陣列，每個項目都經過標準化處理
 *
 * @example
 * ```javascript
 * const rawData = [
 *   { workOrderSN: "WO001", productName: "零件A" },
 *   { workOrderSN: "WO002", productName: "零件B" }
 * ];
 *
 * const transformed = transformWorkOrderData(rawData);
 * // 結果: [
 * //   { no: 1, workOrderSN: "WO001", productName: "零件A", ... },
 * //   { no: 2, workOrderSN: "WO002", productName: "零件B", ... }
 * // ]
 * ```
 *
 * @since 2025-01-03
 */
export const transformWorkOrderData = (rawData) => {
  if (!Array.isArray(rawData)) return [];

  return rawData.map((item, index) => transformWorkOrderItem(item, index));
};

/**
 * 格式化日期為本地顯示格式
 * @description 將ISO格式的日期字串轉換為本地格式 (YYYY-MM-DD)，包含錯誤處理
 *
 * @function
 * @param {string} isoString - ISO格式的日期字串 (如 "2025-01-10T00:00:00Z")
 * @returns {string} 格式化後的日期字串 (YYYY-MM-DD) 或 "--" 如果輸入無效
 *
 * @example
 * ```javascript
 * formatDateToLocal("2025-01-10T14:30:00Z");  // "2025-01-10"
 * formatDateToLocal("");                       // "--"
 * formatDateToLocal(null);                     // "--"
 * formatDateToLocal("invalid-date");           // "--"
 * ```
 *
 * @since 2025-01-03
 */
export const formatDateToLocal = (isoString) => {
  if (!isoString) return "--";

  try {
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? "--" : date.toLocaleDateString("sv-SE");
  } catch {
    return "--";
  }
};

/**
 * 驗證工單資料結構
 * @description 檢查輸入資料是否為有效的工單陣列，確保每個項目都包含必要的屬性
 *
 * @function
 * @param {Array} data - 要驗證的資料
 * @returns {boolean} 驗證結果 - true 表示資料結構有效，false 表示無效
 *
 * 驗證規則：
 * - 必須是陣列
 * - 陣列中的每個項目必須是物件
 * - 每個項目必須包含 workOrderSN 或 productSN 其中之一
 *
 * @example
 * ```javascript
 * // 有效資料
 * validateWorkOrderData([
 *   { workOrderSN: "WO001", productName: "零件A" },
 *   { productSN: "P001", productName: "零件B" }
 * ]); // true
 *
 * // 無效資料
 * validateWorkOrderData(null);                    // false
 * validateWorkOrderData([]);                      // true (空陣列有效)
 * validateWorkOrderData([{ random: "data" }]);    // false
 * validateWorkOrderData("not an array");          // false
 * ```
 *
 * @since 2025-01-03
 */
export const validateWorkOrderData = (data) => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        item &&
        typeof item === "object" &&
        (item.hasOwnProperty("workOrderSN") || item.hasOwnProperty("productSN"))
    )
  );
};
