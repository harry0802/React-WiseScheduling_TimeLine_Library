import { manufacturingApiSlice } from "../manufacturingApiSlice";

/**
 * @description 生產進度追蹤 API 端點
 * 對應 ProductionProgressTracker feature
 * 處理生產任務、庫存狀況、進度追蹤等相關功能
 */
export const productionProgressApi = manufacturingApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description 取得每日生產任務資料
     * 📁 對應檔案: /public/mock/DailyProductionTasksMock.json
     * 🎯 對應組件: ProductionProgressTracker/feature/DailyProductionTasks
     */
    getDailyProductionTasks: builder.query({
      query: () => "mock/DailyProductionTasksMock.json",
      providesTags: ["DailyProductionTasks"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => ({
        message: "無法讀取每日生產任務資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得每日進貨庫存資料
     * 📁 對應檔案: /public/mock/DailyIncomingStockMock.json
     * 🎯 對應組件: ProductionProgressTracker/feature/DailyInComingStock
     */
    getDailyIncomingStock: builder.query({
      query: () => "mock/DailyIncomingStockMock.json",
      providesTags: ["DailyIncomingStock"],
      transformErrorResponse: (response) => ({
        message: "無法讀取每日進貨庫存資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得未來三天進貨庫存資料
     * 📁 對應檔案: /public/mock/NextThreeDaysIncomingStockMock.json
     * 🎯 對應組件: ProductionProgressTracker/feature/NextThreeDaysIncomingStock
     */
    getNextThreeDaysIncomingStock: builder.query({
      query: () => "mock/NextThreeDaysIncomingStockMock.json",
      providesTags: ["NextThreeDaysIncomingStock"],
      transformErrorResponse: (response) => ({
        message: "無法讀取未來三天進貨庫存資料",
        status: response.status,
      }),
    }),

    // 未來擴展的生產進度相關端點
    /**
     * @description 取得生產排程資料 (未來擴展)
     * 📁 對應檔案: /public/mock/ProductionScheduleMock.json
     */
    getProductionSchedule: builder.query({
      query: () => "mock/ProductionScheduleMock.json",
      providesTags: ["ProductionSchedule"],
      transformErrorResponse: (response) => ({
        message: "無法讀取生產排程資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得庫存預測資料 (未來擴展)
     * 📁 對應檔案: /public/mock/InventoryForecastMock.json
     */
    getInventoryForecast: builder.query({
      query: () => "mock/InventoryForecastMock.json",
      providesTags: ["InventoryForecast"],
      transformErrorResponse: (response) => ({
        message: "無法讀取庫存預測資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得生產進度總覽 (未來擴展)
     * 📁 對應檔案: /public/mock/ProductionOverviewMock.json
     */
    getProductionOverview: builder.query({
      query: () => "mock/ProductionOverviewMock.json",
      providesTags: ["ProductionOverview"],
      transformErrorResponse: (response) => ({
        message: "無法讀取生產進度總覽資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得材料需求計劃 (未來擴展)
     * 📁 對應檔案: /public/mock/MaterialRequirementsMock.json
     */
    getMaterialRequirements: builder.query({
      query: () => "mock/MaterialRequirementsMock.json",
      providesTags: ["MaterialRequirements"],
      transformErrorResponse: (response) => ({
        message: "無法讀取材料需求計劃資料",
        status: response.status,
      }),
    }),
  }),
});

// 匯出生成的 hooks
export const {
  useGetDailyProductionTasksQuery,
  useGetDailyIncomingStockQuery,
  useGetNextThreeDaysIncomingStockQuery,
  useGetProductionScheduleQuery,
  useGetInventoryForecastQuery,
  useGetProductionOverviewQuery,
  useGetMaterialRequirementsQuery,
} = productionProgressApi;