/**
 * @fileoverview 工單資料處理Custom Hooks
 * @description 提供工單資料轉換和狀態規則的業務邏輯
 * @version 2.1.0 - React 效能優化版本
 * @author Manufacturing Live Monitor Team
 * @since 2025-01-03
 */

import { useMemo, useCallback } from "react";
import {
  transformWorkOrderData,
  validateWorkOrderData,
} from "../utils/workOrderTransformers";
import { STATUS_COLORS } from "../../../../../configs/Color";
import { isExpired, isExpiredSoon } from "../../../../../utils/calcDay";

/**
 * 工單資料轉換Hook
 * @description 將API原始資料轉換為組件所需格式，具備資料驗證和記憶化功能
 *
 * 功能特色：
 * - 🔍 資料驗證：確保輸入資料結構正確
 * - 🚀 效能優化：使用 useMemo 避免不必要的重新計算
 * - 🛡️ 錯誤處理：優雅處理無效或空資料
 * - 📊 格式標準化：統一工單資料格式
 *
 * @hook
 * @param {Array|null|undefined} rawData - API回傳的原始資料陣列
 * @param {Object} rawData[].workOrderSN - 工單序號
 * @param {Object} rawData[].processName - 製程名稱
 * @param {Object} rawData[].productSN - 產品編號
 * @param {Object} rawData[].productName - 產品名稱
 * @param {number|null} rawData[].productionQuantity - 生產數量
 * @param {Object} rawData[].machineSN - 機台編號
 * @param {string} rawData[].planFinishDate - 計劃完成日期 (ISO格式)
 * @param {string} rawData[].status - 工單狀態
 *
 * @returns {Array} 轉換後的資料陣列，包含標準化的工單項目
 * @returns {number} returns[].no - 序號（從1開始）
 * @returns {string} returns[].workOrderSN - 工單序號
 * @returns {string} returns[].processName - 製程名稱
 * @returns {string} returns[].productSN - 產品編號
 * @returns {string} returns[].productName - 產品名稱
 * @returns {number|string} returns[].productionQuantity - 生產數量（數字或"--"）
 * @returns {string} returns[].machineSN - 機台編號
 * @returns {string} returns[].planFinishDate - 計劃完成日期
 * @returns {string} returns[].status - 工單狀態
 *
 * @example
 * ```jsx
 * const MyComponent = () => {
 *   const { data: rawData } = useGetTodayWorkOrderQuery();
 *   const transformedData = useWorkOrderTransformation(rawData);
 *
 *   return (
 *     <Table data={transformedData} />
 *   );
 * };
 * ```
 *
 * @since 2025-01-03
 * @version 2.1.0
 */
export const useWorkOrderTransformation = (rawData) => {
  return useMemo(() => {
    if (!rawData || !validateWorkOrderData(rawData)) {
      return [];
    }

    return transformWorkOrderData(rawData);
  }, [rawData]);
};

/**
 * 工單狀態規則Hook
 * @description 定義工單狀態的條件樣式規則，重用現有的calcDay.js工具
 *
 * 功能特色：
 * - 🎨 智能狀態檢測：根據日期和數量自動判斷工單狀態
 * - 🚀 效能優化：使用 useCallback 和 useMemo 記憶化規則
 * - 📅 日期邏輯整合：重用專案既有的 calcDay.js 工具函數
 * - 🎯 精準條件判斷：多層次的狀態優先級處理
 * - 🔄 動態樣式：根據狀態自動套用對應顏色
 *
 * 狀態優先級 (由高到低)：
 * 1. expired - 已過期工單（紅色警示）
 * 2. warning - 即將到期工單（橘色警告）
 * 3. lowStock - 低庫存工單（藍色提醒）
 *
 * @hook
 * @returns {Object} 狀態規則配置物件
 * @returns {Object} returns.expired - 已過期工單規則
 * @returns {Function} returns.expired.condition - 過期狀態檢查函數
 * @returns {string} returns.expired.color - 過期狀態顏色 (STATUS_COLORS.EXPIRED)
 * @returns {Array<number>} returns.expired.columns - 套用樣式的欄位索引
 * @returns {Object} returns.warning - 即將到期工單規則
 * @returns {Function} returns.warning.condition - 警告狀態檢查函數
 * @returns {string} returns.warning.color - 警告狀態顏色 (STATUS_COLORS.WARNING)
 * @returns {Array<number>} returns.warning.columns - 套用樣式的欄位索引
 * @returns {Object} returns.lowStock - 低庫存工單規則
 * @returns {Function} returns.lowStock.condition - 低庫存狀態檢查函數
 * @returns {string} returns.lowStock.color - 低庫存狀態顏色 (STATUS_COLORS.LOW_STOCK)
 * @returns {Array<number>} returns.lowStock.columns - 套用樣式的欄位索引
 *
 * @example
 * ```jsx
 * const MyTableComponent = () => {
 *   const statusRules = useWorkOrderStatusRules();
 *   const workOrders = useWorkOrderTransformation(rawData);
 *
 *   return (
 *     <ProductionTable
 *       data={workOrders}
 *       statusRules={statusRules}
 *     />
 *   );
 * };
 * ```
 *
 * @example
 * ```javascript
 * // 規則物件結構範例
 * const rules = {
 *   expired: {
 *     condition: (item) => item.status !== "done" && isExpired(item.planFinishDate),
 *     color: "#d32f2f",
 *     columns: [1, 2, 3, 4, 5, 6, 7]
 *   },
 *   warning: {
 *     condition: (item) => item.status !== "done" && isExpiredSoon(item.planFinishDate, 7),
 *     color: "#f57c00",
 *     columns: [1, 2, 3, 4, 5, 6, 7]
 *   },
 *   lowStock: {
 *     condition: (item) => item.productionQuantity < 3000,
 *     color: "#1976d2",
 *     columns: [1, 2, 3, 4, 5, 6, 7]
 *   }
 * };
 * ```
 *
 * @since 2025-01-03
 * @version 2.1.0
 */
export const useWorkOrderStatusRules = () => {
  // 🚀 React 效能優化：記憶化狀態檢查函數
  const checkExpired = useCallback(
    (item) =>
      item.status !== "done" &&
      item.planFinishDate &&
      isExpired(item.planFinishDate),
    []
  );

  const checkWarning = useCallback(
    (item) =>
      item.status !== "done" &&
      item.planFinishDate &&
      isExpiredSoon(item.planFinishDate, 7),
    []
  );

  const checkLowStock = useCallback((item) => {
    const quantity = item.productionQuantity;
    return typeof quantity === "number" && quantity > 0 && quantity < 3000;
  }, []);

  // 🚀 React 效能優化：穩定的狀態規則物件
  return useMemo(
    () => ({
      // 已過期：狀態非完成且過期日期已過
      expired: {
        condition: checkExpired,
        color: STATUS_COLORS.EXPIRED,
        columns: [1, 2, 3, 4, 5, 6, 7, 8],
      },

      // 即將到期：狀態非完成且7天內到期
      warning: {
        condition: checkWarning,
        color: STATUS_COLORS.WARNING,
        columns: [1, 2, 3, 4, 5, 6, 7, 8],
      },

      // 低庫存：生產數量低於3000
      lowStock: {
        condition: checkLowStock,
        color: STATUS_COLORS.LOW_STOCK,
        columns: [1, 2, 3, 4, 5, 6, 7, 8],
      },
    }),
    [checkExpired, checkWarning, checkLowStock]
  );
};
