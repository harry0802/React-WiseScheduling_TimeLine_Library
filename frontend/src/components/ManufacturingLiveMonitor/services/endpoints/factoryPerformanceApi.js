import { manufacturingApiSlice } from "../manufacturingApiSlice";

/**
 * @description 工廠績效儀表板 API 端點
 * 對應 FactoryPerformanceDashboard feature
 * 處理各生產區域績效數據與工廠總體表現
 */
export const factoryPerformanceApi = manufacturingApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description 取得生產區域 A 資料
     * 📁 對應檔案: /public/mock/ProductionZoneAMock.json
     * 🎯 對應組件: FactoryPerformanceDashboard/feature/ProductionZoneA
     */
    getProductionZoneA: builder.query({
      query: () => "mock/ProductionZoneAMock.json",
      providesTags: ["ProductionZoneA"],
      transformErrorResponse: (response) => ({
        message: "無法讀取生產區域 A 資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得生產區域 B 資料
     * 📁 對應檔案: /public/mock/ProductionZoneBMock.json
     * 🎯 對應組件: FactoryPerformanceDashboard/feature/ProductionZoneB
     */
    getProductionZoneB: builder.query({
      query: () => "mock/ProductionZoneBMock.json",
      providesTags: ["ProductionZoneB"],
      transformErrorResponse: (response) => ({
        message: "無法讀取生產區域 B 資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得生產區域 C 資料
     * 📁 對應檔案: /public/mock/ProductionZoneCMock.json
     * 🎯 對應組件: FactoryPerformanceDashboard/feature/ProductionZoneC
     */
    getProductionZoneC: builder.query({
      query: () => "mock/ProductionZoneCMock.json",
      providesTags: ["ProductionZoneC"],
      transformErrorResponse: (response) => ({
        message: "無法讀取生產區域 C 資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得生產區域 D 資料
     * 📁 對應檔案: /public/mock/ProductionZoneDMock.json
     * 🎯 對應組件: FactoryPerformanceDashboard/feature/ProductionZoneD
     */
    getProductionZoneD: builder.query({
      query: () => "mock/ProductionZoneDMock.json",
      providesTags: ["ProductionZoneD"],
      transformErrorResponse: (response) => ({
        message: "無法讀取生產區域 D 資料",
        status: response.status,
      }),
    }),

    // 未來擴展的工廠績效相關端點
    /**
     * @description 取得工廠總覽資料 (未來擴展)
     * 📁 對應檔案: /public/mock/FactoryOverviewMock.json
     */
    getFactoryOverview: builder.query({
      query: () => "mock/FactoryOverviewMock.json",
      providesTags: ["FactoryOverview"],
      transformErrorResponse: (response) => ({
        message: "無法讀取工廠總覽資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得生產區域比較資料 (未來擴展)
     * 📁 對應檔案: /public/mock/ZoneComparisonMock.json
     */
    getZoneComparison: builder.query({
      query: () => "mock/ZoneComparisonMock.json",
      providesTags: ["ZoneComparison"],
      transformErrorResponse: (response) => ({
        message: "無法讀取生產區域比較資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得工廠績效指標 (未來擴展)
     * 📁 對應檔案: /public/mock/FactoryKPIMock.json
     */
    getFactoryKPI: builder.query({
      query: () => "mock/FactoryKPIMock.json",
      providesTags: ["FactoryKPI"],
      transformErrorResponse: (response) => ({
        message: "無法讀取工廠績效指標資料",
        status: response.status,
      }),
    }),
  }),
});

// 匯出生成的 hooks
export const {
  useGetProductionZoneAQuery,
  useGetProductionZoneBQuery,
  useGetProductionZoneCQuery,
  useGetProductionZoneDQuery,
  useGetFactoryOverviewQuery,
  useGetZoneComparisonQuery,
  useGetFactoryKPIQuery,
} = factoryPerformanceApi;