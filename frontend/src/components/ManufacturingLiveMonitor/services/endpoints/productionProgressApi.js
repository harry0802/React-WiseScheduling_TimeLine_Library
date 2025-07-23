import { manufacturingApiSlice } from "../manufacturingApiSlice";
import { 
  API_ENDPOINTS, 
  ERROR_MESSAGES, 
  TAG_TYPES,
  POLLING_INTERVALS 
} from "../shared/constants";
import { 
  transformArrayResponse,
  transformObjectResponse,
  transformErrorResponse,
  transformWorkOrderProcessData
} from "../shared/transformers";

/**
 * @description 生產進度追蹤 API 端點
 * @feature ProductionProgressTracker
 * 提供生產進度追蹤功能所需的所有 API 端點
 *
 * 功能涵蓋：
 * - 每日生產任務追蹤
 * - 庫存狀況監控
 * - 生產排程管理
 * - 材料需求計劃
 * - 今日工單製程資訊
 *
 * @note 已整合至 manufacturingApiSlice，使用端點注入模式
 * 統一配置、錯誤處理和回應轉換邏輯
 */
export const productionProgressApi = manufacturingApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description 取得每日生產任務資料
     * @endpoint GET /dashboard/dailyProductionTasks
     * @usage 用於 ProductionProgressTracker/feature/DailyProductionTasks 組件
     * @returns {Array<Object>} 每日生產任務資料陣列
     *
     * 提供當日生產任務詳細資訊：
     * - 任務編號、產品資訊、數量、進度等
     */
    getDailyProductionTasks: builder.query({
      query: () => API_ENDPOINTS.PRODUCTION_PROGRESS.DAILY_PRODUCTION_TASKS,
      providesTags: [TAG_TYPES.DAILY_PRODUCTION_TASKS],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformArrayResponse(response),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.PRODUCTION_PROGRESS.DAILY_PRODUCTION_TASKS),
    }),

    /**
     * @description 取得每日進貨庫存資料
     * @endpoint GET /dashboard/dailyIncomingStock
     * @usage 用於 ProductionProgressTracker/feature/DailyInComingStock 組件
     * @returns {Array<Object>} 每日進貨庫存資料陣列
     *
     * 提供當日進貨庫存詳細資訊：
     * - 進貨日期、產品編號、數量、供應商等
     */
    getDailyIncomingStock: builder.query({
      query: () => API_ENDPOINTS.PRODUCTION_PROGRESS.DAILY_INCOMING_STOCK,
      providesTags: [TAG_TYPES.DAILY_INCOMING_STOCK],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformArrayResponse(response),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.PRODUCTION_PROGRESS.DAILY_INCOMING_STOCK),
    }),

    /**
     * @description 取得未來三天進貨庫存資料
     * @endpoint GET /dashboard/nextThreeDaysIncomingStock
     * @usage 用於 ProductionProgressTracker/feature/NextThreeDaysIncomingStock 組件
     * @returns {Array<Object>} 未來三天進貨庫存資料陣列
     *
     * 提供未來三天進貨庫存預測：
     * - 預計進貨日期、產品編號、預期數量等
     */
    getNextThreeDaysIncomingStock: builder.query({
      query: () => API_ENDPOINTS.PRODUCTION_PROGRESS.NEXT_THREE_DAYS_INCOMING_STOCK,
      providesTags: [TAG_TYPES.NEXT_THREE_DAYS_INCOMING_STOCK],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformArrayResponse(response),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.PRODUCTION_PROGRESS.NEXT_THREE_DAYS_INCOMING_STOCK),
    }),

    /**
     * @description 取得生產排程資料
     * @endpoint GET /dashboard/productionSchedule
     * @usage 用於生產排程管理組件
     * @returns {Array<Object>} 生產排程資料陣列
     *
     * 提供生產排程詳細資訊：
     * - 排程時間、機台分配、產品資訊等
     */
    getProductionSchedule: builder.query({
      query: () => API_ENDPOINTS.PRODUCTION_PROGRESS.PRODUCTION_SCHEDULE,
      providesTags: [TAG_TYPES.PRODUCTION_SCHEDULE],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformArrayResponse(response),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.PRODUCTION_PROGRESS.PRODUCTION_SCHEDULE),
    }),

    /**
     * @description 取得庫存預測資料
     * @endpoint GET /dashboard/inventoryForecast
     * @usage 用於庫存預測分析組件
     * @returns {Array<Object>} 庫存預測資料陣列
     *
     * 提供庫存預測分析：
     * - 產品編號、預測需求、安全庫存等
     */
    getInventoryForecast: builder.query({
      query: () => API_ENDPOINTS.PRODUCTION_PROGRESS.INVENTORY_FORECAST,
      providesTags: [TAG_TYPES.INVENTORY_FORECAST],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformArrayResponse(response),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.PRODUCTION_PROGRESS.INVENTORY_FORECAST),
    }),

    /**
     * @description 取得生產進度總覽
     * @endpoint GET /dashboard/productionOverview
     * @usage 用於生產進度總覽儀表板
     * @returns {Object} 生產進度總覽資料
     *
     * 提供生產進度總覽：
     * - 整體進度、完成率、異常狀況等
     */
    getProductionOverview: builder.query({
      query: () => API_ENDPOINTS.PRODUCTION_PROGRESS.PRODUCTION_OVERVIEW,
      providesTags: [TAG_TYPES.PRODUCTION_OVERVIEW],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformObjectResponse(response),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.PRODUCTION_PROGRESS.PRODUCTION_OVERVIEW),
    }),

    /**
     * @description 取得材料需求計劃
     * @endpoint GET /dashboard/materialRequirements
     * @usage 用於材料需求計劃管理組件
     * @returns {Array<Object>} 材料需求計劃資料陣列
     *
     * 提供材料需求計劃：
     * - 材料編號、需求數量、需求時間等
     */
    getMaterialRequirements: builder.query({
      query: () => API_ENDPOINTS.PRODUCTION_PROGRESS.MATERIAL_REQUIREMENTS,
      providesTags: [TAG_TYPES.MATERIAL_REQUIREMENTS],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformArrayResponse(response),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.PRODUCTION_PROGRESS.MATERIAL_REQUIREMENTS),
    }),

    /**
     * @description 取得包含製程的今日工單資料
     * @endpoint GET /dashboard/todayWorkOrderWithProcess
     * @usage 用於今日工單製程管理組件
     * @returns {Array<Object>} 今日工單製程資料陣列
     * @returns {string} returns[].id - 工單唯一識別碼 (基於 workOrderSN)
     * @returns {string} returns[].workOrderDate - 工單日期 (YYYY-MM-DD 格式)
     * @returns {string} returns[].workOrderSN - 工單序號
     * @returns {number} returns[].workOrderQuantity - 工單數量
     * @returns {string} returns[].productName - 產品名稱
     * @returns {string} returns[].processOne - 製程一
     * @returns {string} returns[].processTwo - 製程二
     * @returns {string} returns[].planFinishDate - 計劃完成日期 (YYYY-MM-DD 格式)
     * @returns {string} returns[].status - 工單狀態
     *
     * 提供今日工單製程詳細資訊：
     * - 工單基本資訊、製程流程、時間規劃等
     * - 自動格式化日期為 YYYY-MM-DD 格式
     * - 使用 workOrderSN 作為唯一識別碼
     */
    getTodayWorkOrderWithProcess: builder.query({
      query: () => API_ENDPOINTS.PRODUCTION_PROGRESS.TODAY_WORK_ORDER_WITH_PROCESS,
      providesTags: [TAG_TYPES.TODAY_WORK_ORDER_WITH_PROCESS],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => 
        transformArrayResponse(response, transformWorkOrderProcessData),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.PRODUCTION_PROGRESS.TODAY_WORK_ORDER_WITH_PROCESS),
    }),
  }),
});

/**
 * @description 匯出自動生成的 React Hooks
 * 供 ProductionProgressTracker 相關組件使用
 *
 * Hook 與組件對應關係：
 * - useGetDailyProductionTasksQuery: DailyProductionTasks 組件
 * - useGetDailyIncomingStockQuery: DailyInComingStock 組件
 * - useGetNextThreeDaysIncomingStockQuery: NextThreeDaysIncomingStock 組件
 * - useGetProductionScheduleQuery: 生產排程管理組件
 * - useGetInventoryForecastQuery: 庫存預測分析組件
 * - useGetProductionOverviewQuery: 生產進度總覽組件
 * - useGetMaterialRequirementsQuery: 材料需求計劃組件
 * - useGetTodayWorkOrderWithProcessQuery: 今日工單製程管理組件 (新增)
 */
export const {
  useGetDailyProductionTasksQuery,
  useGetDailyIncomingStockQuery,
  useGetNextThreeDaysIncomingStockQuery,
  useGetProductionScheduleQuery,
  useGetInventoryForecastQuery,
  useGetProductionOverviewQuery,
  useGetMaterialRequirementsQuery,
  useGetTodayWorkOrderWithProcessQuery,
} = productionProgressApi;
