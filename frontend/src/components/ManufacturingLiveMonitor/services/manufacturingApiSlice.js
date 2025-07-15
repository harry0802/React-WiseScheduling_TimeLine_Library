import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./shared/customBaseQuery";

/**
 * @description Manufacturing Live Monitor 核心 API Slice
 * 統一管理所有製造監控相關的 API 端點
 * 採用端點注入模式，支援模組化擴展
 */
export const manufacturingApiSlice = createApi({
  reducerPath: "manufacturingApi",
  baseQuery: customBaseQuery,

  // 統一管理所有標籤類型
  tagTypes: [
    // 生產進度追蹤
    "DailyProductionTasks",
    "DailyIncomingStock",
    "NextThreeDaysIncomingStock",

    // 配送趨勢分析
    "RecentShippingPanel",
    "TodayShippingPanel",

    // 工廠績效儀表板
    "ProductionZoneData",
    "ProductionZoneA",
    "ProductionZoneB",
    "ProductionZoneC",
    "ProductionZoneD",

    // OEE 洞察系統
    "DowntimeFactors",
    "MachineOperationRate",
    "OEEInsights",

    // 即時 OEE 監控
    "DailyProduction",
    "EquipmentRisk",
    "OEEData",
    "OverdueTasks",
    "Scoreboard",
    "RealTimeOEE",
  ],

  // 初始端點為空，通過注入方式添加
  endpoints: () => ({}),
});

export default manufacturingApiSlice;
