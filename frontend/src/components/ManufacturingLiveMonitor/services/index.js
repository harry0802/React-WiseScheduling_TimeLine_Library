/**
 * @description Manufacturing Live Monitor Services 統一導出文件
 *
 * 🔄 重構完成：
 * - 統一架構：所有 API 整合至 manufacturingApiSlice 使用端點注入模式
 * - 配置集中：共用 constants.js 和 transformers.js 確保一致性
 * - 錯誤標準化：統一錯誤處理和回應轉換邏輯
 * - 輪詢統一：全面支援每小時自動輪詢 (3600000ms)
 *
 * 🎯 架構特色：
 * - 單一 API slice，減少 bundle 大小和 Redux store 複雜度
 * - 統一 baseQuery，支援真實 API 調用和錯誤處理
 * - 集中化 tagTypes 管理，避免重複和衝突
 * - 標準化轉換器，確保資料格式一致性
 */

// 導入核心 API slice
export { manufacturingApiSlice } from "./manufacturingApiSlice";

// 導入並註冊所有按 feature 分類的端點 API
export * from "./endpoints/deliveryTrendApi"; // 配送趨勢分析
export * from "./endpoints/factoryPerformanceApi"; // 工廠績效儀表板
export * from "./endpoints/oeeInsightApi"; // OEE 洞察系統
export * from "./endpoints/productionProgressApi"; // 生產進度追蹤
export * from "./endpoints/realTimeMonitorApi"; // 即時 OEE 監控

// 重新匯出所有可用的 hooks (統一入口)

// 🚚 配送趨勢分析 (DeliveryTrendAnalyzer)
export { useGetRecentShippingPanelQuery } from "./endpoints/deliveryTrendApi";

// 🏭 工廠績效儀表板 (FactoryPerformanceDashboard)
export {
  useGetProductionZoneAQuery,
  useGetProductionZoneBQuery,
  useGetProductionZoneCQuery,
  useGetProductionZoneDQuery,
} from "./endpoints/factoryPerformanceApi";

// 📈 OEE 洞察系統 (OEEInsightSystem)
export {
  useGetMachineStatusProportionQuery,
  useGetMachineUtilizationStatisticsQuery,
  useGetMachineOfflineReasonProportionQuery,
  useGetMachineStatusHoursStatisticsQuery,
} from "./endpoints/oeeInsightApi";

// 📋 生產進度追蹤 (ProductionProgressTracker)
export {
  useGetDailyProductionTasksQuery,
  useGetDailyIncomingStockQuery,
  useGetNextThreeDaysIncomingStockQuery,
  useGetProductionScheduleQuery,
  useGetInventoryForecastQuery,
  useGetProductionOverviewQuery,
  useGetMaterialRequirementsQuery,
  useGetTodayWorkOrderWithProcessQuery,
} from "./endpoints/productionProgressApi";

// ⚡ 即時 OEE 監控 (RealTimeOEEMonitor)
export {
  useGetCurrentMachineStatusCountQuery,
  useGetMachineAccumulatedTimeQuery,
  useGetOverdueWorkOrderQuery,
  useGetMachineOfflineEventQuery,
  useGetTodayWorkOrderQuery,
  useGetDailyOEEQuery,
} from "./endpoints/realTimeMonitorApi";
