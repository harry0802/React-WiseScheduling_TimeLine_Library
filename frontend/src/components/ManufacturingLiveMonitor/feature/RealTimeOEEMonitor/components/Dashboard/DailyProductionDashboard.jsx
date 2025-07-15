/**
 * @fileoverview 每日生產進度儀表板組件
 * @description 顯示今日工單資料，整合真實API並保留自定義header配置
 * @version 2.2.0 - React 效能優化版本
 * @author Manufacturing Live Monitor Team
 * @since 2025-01-03
 */

import React, { useMemo } from "react";
import ProductionTable from "../../../../components/Carousel/CarouselTable/CarouselTable";
import { useWorkOrderTransformation } from "./hooks/useWorkOrderData";
import { useGetTodayWorkOrderQuery } from "../../../../services";
import { STATUS_COLORS } from "../../../../configs/Color";
import { isExpired, isExpiredSoon } from "../../../../utils/calcDay";

// 🎨 樣式常量 - 模組級別，避免每次渲染重新創建
const CONTAINER_STYLES = {
  padding: "20px",
  textAlign: "center",
  fontSize: "16px",
};

const LOADING_STYLES = {
  ...CONTAINER_STYLES,
  color: "#666",
};

const ERROR_STYLES = {
  ...CONTAINER_STYLES,
  color: "#d32f2f",
};

const RETRY_BUTTON_STYLES = {
  padding: "8px 16px",
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};

const SUBTITLE_STYLES = {
  fontSize: "14px",
  marginTop: "8px",
};

// 📊 配置常量 - 模組級別，確保引用穩定性
const HEADER_CONFIG = [
  "NO",
  "製令單號",
  "製程名稱",
  "產品編號",
  "產品名稱",
  "生產數量",
  "機台",
];

const FIELD_MAPPING = {
  workOrderSN: 1,
  processName: 2,
  productSN: 3,
  productName: 4,
  productionQuantity: 5,
  machineSN: 6,
};

const COLUMN_WIDTHS = [80, 200, 180, 240, 320, 120];

/**
 * 每日生產進度儀表板組件
 * @description 從 /dashboard/todayWorkOrder API 獲取今日工單資料並顯示
 *
 * 功能特色：
 * - 🚀 React 效能優化：記憶化組件和 props
 * - 📊 即時資料整合：RTK Query 自動快取和更新
 * - 🎨 狀態驅動樣式：根據工單狀態動態顯示
 * - 🔄 錯誤處理：完整的載入、錯誤、空資料狀態
 * - 📱 響應式設計：適應不同螢幕尺寸
 *
 * @component
 * @example
 * ```jsx
 * // 基本使用
 * <DailyProductionDashboard />
 *
 * // 通常在生產監控頁面中使用
 * <div className="dashboard-container">
 *   <DailyProductionDashboard />
 * </div>
 * ```
 *
 * @returns {React.ReactElement} 渲染的每日生產進度組件
 *
 * @author Manufacturing Live Monitor Team
 * @since 2025-01-03
 * @version 2.2.0
 */
function DailyProductionDashboard() {
  const {
    data: rawData,
    isLoading,
    error,
    refetch,
  } = useGetTodayWorkOrderQuery();
  const transformedData = useWorkOrderTransformation(rawData);

  // 📊 業務特定的狀態規則 - 專屬於 DailyProductionDashboard 的邏輯
  const statusRules = useMemo(
    () => ({
      // 已過期：狀態非完成且過期日期已過 (DailyProductionDashboard 特有業務邏輯)
      expired: {
        condition: (item) =>
          item.status !== "done" &&
          item.planFinishDate &&
          isExpired(item.planFinishDate),
        color: STATUS_COLORS.EXPIRED,
        columns: [1, 2, 3, 4, 5, 6, 7],
      },

      // 即將到期：狀態非完成且7天內到期 (DailyProductionDashboard 特有業務邏輯)
      warning: {
        condition: (item) =>
          item.status !== "done" &&
          item.planFinishDate &&
          isExpiredSoon(item.planFinishDate, 7),
        color: STATUS_COLORS.WARNING,
        columns: [1, 2, 3, 4, 5, 6, 7],
      },

      // 低庫存：生產數量低於3000 (DailyProductionDashboard 特有業務邏輯)
      lowStock: {
        condition: (item) => {
          const quantity = item.productionQuantity;
          return (
            typeof quantity === "number" && quantity > 0 && quantity < 3000
          );
        },
        color: STATUS_COLORS.LOW_STOCK,
        columns: [1, 2, 3, 4, 5, 6, 7],
      },
    }),
    []
  ); // 業務邏輯是靜態的，無需依賴項

  // 🚀 React 效能優化：記憶化載入狀態組件
  const loadingComponent = useMemo(
    () => (
      <div style={LOADING_STYLES}>
        <div>📊 載入今日工單資料中...</div>
        <div style={SUBTITLE_STYLES}>正在從伺服器取得最新資料</div>
      </div>
    ),
    []
  );

  // 🚀 React 效能優化：記憶化錯誤狀態組件
  const errorComponent = useMemo(
    () => (
      <div style={ERROR_STYLES}>
        <div>⚠️ 資料載入失敗</div>
        <div style={{ ...SUBTITLE_STYLES, margin: "8px 0" }}>
          {error?.message || "無法連接到伺服器，請檢查網路連線"}
        </div>
        <button onClick={refetch} style={RETRY_BUTTON_STYLES}>
          重新載入
        </button>
      </div>
    ),
    [error?.message, refetch]
  );

  // 🚀 React 效能優化：記憶化空資料狀態組件
  const emptyDataComponent = useMemo(
    () => (
      <div style={LOADING_STYLES}>
        <div>📋 今日暫無工單資料</div>
        <div style={SUBTITLE_STYLES}>請確認是否有安排今日的生產計畫</div>
      </div>
    ),
    []
  );

  // 🚀 React 效能優化：記憶化 ProductionTable props
  const productionTableProps = useMemo(
    () => ({
      header: HEADER_CONFIG,
      initialData: transformedData,
      columnWidths: COLUMN_WIDTHS,
      fieldMapping: FIELD_MAPPING,
      statusRules: statusRules,
    }),
    [transformedData, statusRules]
  );

  if (isLoading) {
    return loadingComponent;
  }

  if (error) {
    return errorComponent;
  }

  if (!transformedData || transformedData.length === 0) {
    return emptyDataComponent;
  }

  return <ProductionTable {...productionTableProps} />;
}

export default DailyProductionDashboard;
