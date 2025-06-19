/**
 * @description Manufacturing Live Monitor Services 統一導出文件
 * 採用端點注入模式，按 feature 分類組織 API 端點
 * 與前端 feature 目錄結構完全對應，提供直覺的 API 組織方式
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
export {
  useGetRecentShippingPanelQuery,
  useGetTodayShippingPanelQuery,
  useGetShippingTrendsQuery,
  useGetDeliveryStatisticsQuery,
} from "./endpoints/deliveryTrendApi";

// 🏭 工廠績效儀表板 (FactoryPerformanceDashboard)
export {
  useGetProductionZoneAQuery,
  useGetProductionZoneBQuery,
  useGetProductionZoneCQuery,
  useGetProductionZoneDQuery,
  useGetFactoryOverviewQuery,
  useGetZoneComparisonQuery,
  useGetFactoryKPIQuery,
} from "./endpoints/factoryPerformanceApi";

// 📈 OEE 洞察系統 (OEEInsightSystem)
export {
  useGetMachineOperationRateQuery,
  useGetDowntimeFactorsQuery,
  useGetMachineStatusDurationQuery,
  useGetMachineOperationSummaryQuery,
  useGetOEEInsightsQuery,
  useGetEquipmentEfficiencyQuery,
  useGetQualityLossQuery,
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
} from "./endpoints/productionProgressApi";

// ⚡ 即時 OEE 監控 (RealTimeOEEMonitor)
export {
  useGetCurrentMachineStatusCountQuery,
  useGetMachineStatusProportionQuery,
  useGetMachineAccumulatedTimeQuery,
  useGetOverdueWorkOrderQuery,
  useGetMachineOfflineEventQuery,
} from "./endpoints/realTimeMonitorApi";
