/**
 * @fileoverview Manufacturing Live Monitor 統一配置常數
 * @description 集中管理所有 API 相關的配置，確保一致性和可維護性
 */

/**
 * @description 輪詢間隔配置
 * 統一管理所有 RTK Query 的輪詢設定，便於全域調整
 */
export const POLLING_INTERVALS = {
  /** 每小時輪詢 (3600000ms) - 用於大部分製造數據 */
  HOURLY: 3600000,

  /** 每30分鐘輪詢 (1800000ms) - 用於較重要的監控數據 */
  HALF_HOURLY: 1800000,

  /** 每15分鐘輪詢 (900000ms) - 用於關鍵製程監控 */
  QUARTER_HOURLY: 900000,

  /** 每5分鐘輪詢 (300000ms) - 用於即時監控 */
  FREQUENT: 300000,

  /** 停用輪詢 */
  DISABLED: undefined,
};

/**
 * @description API 端點路徑配置
 * 集中管理所有 API 端點，便於維護和調整
 */
export const API_ENDPOINTS = {
  // 配送趨勢分析
  DELIVERY_TREND: {
    RECENT_SHIPPING_PANEL: "mock/RecentShippingPanelMock.json",
  },

  // 工廠績效儀表板
  FACTORY_PERFORMANCE: {
    PRODUCTION_ZONE_A: "dashboard/machineOverview?productionArea=A",
    PRODUCTION_ZONE_B: "dashboard/machineOverview?productionArea=B",
    PRODUCTION_ZONE_C: "dashboard/machineOverview?productionArea=C",
    PRODUCTION_ZONE_D: "dashboard/machineOverview?productionArea=D",
  },

  // OEE 洞察系統
  OEE_INSIGHT: {
    MACHINE_STATUS_PROPORTION: "dashboard/machineStatusProportion",
    MACHINE_UTILIZATION_STATISTICS: "dashboard/machineUtilizationStatistics",
    MACHINE_OFFLINE_REASON_PROPORTION:
      "dashboard/machineOfflineReasonProportion",
    MACHINE_STATUS_HOURS_STATISTICS: "dashboard/machineStatusHoursStatistics",
  },

  // 生產進度追蹤
  PRODUCTION_PROGRESS: {
    DAILY_PRODUCTION_TASKS: "dashboard/dailyProductionTasks",
    DAILY_INCOMING_STOCK: "dashboard/dailyIncomingStock",
    NEXT_THREE_DAYS_INCOMING_STOCK: "dashboard/nextThreeDaysIncomingStock",
    PRODUCTION_SCHEDULE: "dashboard/productionSchedule",
    INVENTORY_FORECAST: "dashboard/inventoryForecast",
    PRODUCTION_OVERVIEW: "dashboard/productionOverview",
    MATERIAL_REQUIREMENTS: "dashboard/materialRequirements",
    TODAY_WORK_ORDER_WITH_PROCESS: "dashboard/todayWorkOrderWithProcess",
  },

  // 即時監控
  REAL_TIME_MONITOR: {
    CURRENT_MACHINE_STATUS_COUNT: "dashboard/currentMachineStatusCount",
    MACHINE_ACCUMULATED_TIME: "dashboard/machineAccumulatedTime",
    OVERDUE_WORK_ORDER: "dashboard/overdueWorkOrder",
    MACHINE_OFFLINE_EVENT: "dashboard/machineOfflineEvent",
    TODAY_WORK_ORDER: "dashboard/todayWorkOrder",
    DAILY_OEE: "dashboard/dailyOEE",
  },
};

/**
 * @description 標準化錯誤訊息
 * 提供一致的使用者錯誤提示
 */
export const ERROR_MESSAGES = {
  // 配送趨勢相關錯誤
  DELIVERY_TREND: {
    RECENT_SHIPPING_PANEL: "無法讀取當日待出貨即時戰情資料",
  },

  // 工廠績效相關錯誤
  FACTORY_PERFORMANCE: {
    PRODUCTION_ZONE_A: "無法讀取生產區域 A 資料",
    PRODUCTION_ZONE_B: "無法讀取生產區域 B 資料",
    PRODUCTION_ZONE_C: "無法讀取生產區域 C 資料",
    PRODUCTION_ZONE_D: "無法讀取生產區域 D 資料",
  },

  // OEE 洞察相關錯誤
  OEE_INSIGHT: {
    MACHINE_STATUS_PROPORTION: "無法讀取機台各狀態時間佔比資料",
    MACHINE_UTILIZATION_STATISTICS: "無法讀取設備稼動分析統計資料",
    MACHINE_OFFLINE_REASON_PROPORTION: "無法讀取停機因素佔比分析資料",
    MACHINE_STATUS_HOURS_STATISTICS: "無法讀取當日機台各狀態時數統計資料",
  },

  // 生產進度相關錯誤
  PRODUCTION_PROGRESS: {
    DAILY_PRODUCTION_TASKS: "無法讀取每日生產任務資料",
    DAILY_INCOMING_STOCK: "無法讀取每日進貨庫存資料",
    NEXT_THREE_DAYS_INCOMING_STOCK: "無法讀取未來三天進貨庫存資料",
    PRODUCTION_SCHEDULE: "無法讀取生產排程資料",
    INVENTORY_FORECAST: "無法讀取庫存預測資料",
    PRODUCTION_OVERVIEW: "無法讀取生產進度總覽資料",
    MATERIAL_REQUIREMENTS: "無法讀取材料需求計劃資料",
    TODAY_WORK_ORDER_WITH_PROCESS: "無法讀取今日工單製程資料",
  },

  // 即時監控相關錯誤
  REAL_TIME_MONITOR: {
    CURRENT_MACHINE_STATUS_COUNT: "無法讀取當前機台狀態統計資料",
    MACHINE_ACCUMULATED_TIME: "無法讀取機台累計時間資料",
    OVERDUE_WORK_ORDER: "無法讀取逾期工單資料",
    MACHINE_OFFLINE_EVENT: "無法讀取機台離線事件資料",
    TODAY_WORK_ORDER: "無法讀取今日製令單資料",
    DAILY_OEE: "無法讀取每日 OEE 資料",
  },
};

/**
 * @description RTK Query 通用配置
 * 標準化所有 API slice 的共通設定
 */
export const RTK_QUERY_CONFIG = {
  /** 預設重新獲取間隔 (秒) */
  DEFAULT_REFETCH_ON_MOUNT_OR_ARG_CHANGE: 3600,

  /** 預設輪詢間隔 */
  DEFAULT_POLLING_INTERVAL: POLLING_INTERVALS.HOURLY,

  /** 預設重試次數 */
  DEFAULT_RETRY_COUNT: 3,

  /** 預設重試延遲 (毫秒) */
  DEFAULT_RETRY_DELAY: 1000,
};

/**
 * @description 統一的 tag 類型定義
 * 集中管理所有 RTK Query 的 tagTypes，避免重複和衝突
 */
export const TAG_TYPES = {
  // 配送趨勢分析
  RECENT_SHIPPING_PANEL: "RecentShippingPanel",

  // 工廠績效儀表板
  PRODUCTION_ZONE_A: "ProductionZoneA",
  PRODUCTION_ZONE_B: "ProductionZoneB",
  PRODUCTION_ZONE_C: "ProductionZoneC",
  PRODUCTION_ZONE_D: "ProductionZoneD",
  PRODUCTION_ZONE_DATA: "ProductionZoneData",

  // OEE 洞察系統
  MACHINE_STATUS_PROPORTION: "MachineStatusProportion",
  MACHINE_UTILIZATION_STATISTICS: "MachineUtilizationStatistics",
  MACHINE_OFFLINE_REASON_PROPORTION: "MachineOfflineReasonProportion",
  MACHINE_STATUS_HOURS_STATISTICS: "MachineStatusHoursStatistics",
  DOWNTIME_FACTORS: "DowntimeFactors",
  MACHINE_OPERATION_RATE: "MachineOperationRate",
  OEE_INSIGHTS: "OEEInsights",

  // 生產進度追蹤
  DAILY_PRODUCTION_TASKS: "DailyProductionTasks",
  DAILY_INCOMING_STOCK: "DailyIncomingStock",
  NEXT_THREE_DAYS_INCOMING_STOCK: "NextThreeDaysIncomingStock",
  PRODUCTION_SCHEDULE: "ProductionSchedule",
  INVENTORY_FORECAST: "InventoryForecast",
  PRODUCTION_OVERVIEW: "ProductionOverview",
  MATERIAL_REQUIREMENTS: "MaterialRequirements",
  TODAY_WORK_ORDER_WITH_PROCESS: "TodayWorkOrderWithProcess",

  // 即時監控
  CURRENT_MACHINE_STATUS_COUNT: "CurrentMachineStatusCount",
  MACHINE_ACCUMULATED_TIME: "MachineAccumulatedTime",
  OVERDUE_WORK_ORDER: "OverdueWorkOrder",
  MACHINE_OFFLINE_EVENT: "MachineOfflineEvent",
  TODAY_WORK_ORDER: "TodayWorkOrder",
  DAILY_OEE: "DailyOEE",
  DAILY_PRODUCTION: "DailyProduction",
  EQUIPMENT_RISK: "EquipmentRisk",
  OEE_DATA: "OEEData",
  OVERDUE_TASKS: "OverdueTasks",
  SCOREBOARD: "Scoreboard",
  REAL_TIME_OEE: "RealTimeOEE",
};
