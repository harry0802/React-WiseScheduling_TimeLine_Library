import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../../store/api/apiConfig";

/**
 * @description 生產進度追蹤 API 專用 baseQuery
 * 使用真實 API 配置，完全脫離 Mock 資料依賴
 */
const productionProgressBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
});

/**
 * @description 生產進度追蹤 API 端點
 * 提供生產進度追蹤功能所需的所有 API 端點
 *
 * 功能涵蓋：
 * - 每日生產任務追蹤
 * - 庫存狀況監控
 * - 生產排程管理
 * - 材料需求計劃
 * - 今日工單製程資訊
 *
 * @note 所有端點均使用真實 API，回應格式統一為 { status, message, data }
 */
export const productionProgressApi = createApi({
  reducerPath: "productionProgressApi",
  baseQuery: productionProgressBaseQuery,
  tagTypes: [
    "DailyProductionTasks",
    "DailyIncomingStock",
    "NextThreeDaysIncomingStock",
    "ProductionSchedule",
    "InventoryForecast",
    "ProductionOverview",
    "MaterialRequirements",
    "TodayWorkOrderWithProcess",
  ],
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
      query: () => "dashboard/dailyProductionTasks",
      providesTags: ["DailyProductionTasks"],
      transformResponse: (response) => {
        if (!response?.data) {
          return [];
        }
        return response.data;
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取每日生產任務資料",
        status: response.data?.status || false,
      }),
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
      query: () => "dashboard/dailyIncomingStock",
      providesTags: ["DailyIncomingStock"],
      transformResponse: (response) => {
        if (!response?.data) {
          return [];
        }
        return response.data;
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取每日進貨庫存資料",
        status: response.data?.status || false,
      }),
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
      query: () => "dashboard/nextThreeDaysIncomingStock",
      providesTags: ["NextThreeDaysIncomingStock"],
      transformResponse: (response) => {
        if (!response?.data) {
          return [];
        }
        return response.data;
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取未來三天進貨庫存資料",
        status: response.data?.status || false,
      }),
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
      query: () => "dashboard/productionSchedule",
      providesTags: ["ProductionSchedule"],
      transformResponse: (response) => {
        if (!response?.data) {
          return [];
        }
        return response.data;
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取生產排程資料",
        status: response.data?.status || false,
      }),
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
      query: () => "dashboard/inventoryForecast",
      providesTags: ["InventoryForecast"],
      transformResponse: (response) => {
        if (!response?.data) {
          return [];
        }
        return response.data;
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取庫存預測資料",
        status: response.data?.status || false,
      }),
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
      query: () => "dashboard/productionOverview",
      providesTags: ["ProductionOverview"],
      transformResponse: (response) => {
        if (!response?.data) {
          return {};
        }
        return response.data;
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取生產進度總覽資料",
        status: response.data?.status || false,
      }),
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
      query: () => "dashboard/materialRequirements",
      providesTags: ["MaterialRequirements"],
      transformResponse: (response) => {
        if (!response?.data) {
          return [];
        }
        return response.data;
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取材料需求計劃資料",
        status: response.data?.status || false,
      }),
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
      query: () => "dashboard/todayWorkOrderWithProcess",
      providesTags: ["TodayWorkOrderWithProcess"],
      transformResponse: (response) => {
        if (!response?.data || !Array.isArray(response.data)) {
          return [];
        }

        /**
         * 格式化日期為 YYYY-MM-DD 格式
         * @param {string} isoDateString - ISO 8601 格式的日期字串
         * @returns {string} YYYY-MM-DD 格式的日期或空字串
         */
        const formatDate = (isoDateString) => {
          if (!isoDateString) return "";
          try {
            return new Date(isoDateString).toLocaleDateString("sv-SE");
          } catch (error) {
            console.warn("日期格式化錯誤:", error);
            return "";
          }
        };

        return response.data.map((item) => ({
          id: item.workOrderSN,
          workOrderDate: formatDate(item.workOrderDate),
          workOrderSN: item.workOrderSN,
          workOrderQuantity: item.workOrderQuantity,
          productName: item.productName,
          processOne: item.processOne,
          processTwo: item.processTwo,
          planFinishDate: formatDate(item.planFinishDate),
          status: item.status,
        }));
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取今日工單製程資料",
        status: response.data?.status || false,
      }),
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
