import { manufacturingApiSlice } from "../manufacturingApiSlice";

/**
 * @description 配送趨勢分析 API 端點
 * 對應 DeliveryTrendAnalyzer feature
 * 處理出貨面板、配送戰情等相關功能
 */
export const deliveryTrendApi = manufacturingApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description 取得近期出貨面板資料
     * 📁 對應檔案: /public/mock/RecentShippingPanelMock.json
     * 🎯 對應組件: DeliveryTrendAnalyzer/feature/RecentShippingPanel
     */
    getRecentShippingPanel: builder.query({
      query: () => "mock/RecentShippingPanelMock.json",
      providesTags: ["RecentShippingPanel"],
      transformErrorResponse: (response) => ({
        message: "無法讀取當日待出貨即時戰情資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得當日出貨面板資料
     * 📁 對應檔案: /public/mock/TodayShippingPanelMock.json
     * 🎯 對應組件: DeliveryTrendAnalyzer/feature/TodayShippingPanel
     */
    getTodayShippingPanel: builder.query({
      query: () => "mock/TodayShippingPanelMock.json",
      providesTags: ["TodayShippingPanel"],
      transformErrorResponse: (response) => ({
        message: "無法讀取當日出貨面板資料",
        status: response.status,
      }),
    }),

    // 未來擴展的配送趨勢相關端點
    /**
     * @description 取得出貨趨勢分析資料 (未來擴展)
     * 📁 對應檔案: /public/mock/ShippingTrendsMock.json
     */
    getShippingTrends: builder.query({
      query: () => "mock/ShippingTrendsMock.json",
      providesTags: ["ShippingTrends"],
      transformErrorResponse: (response) => ({
        message: "無法讀取出貨趨勢分析資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得配送統計資料 (未來擴展)
     * 📁 對應檔案: /public/mock/DeliveryStatisticsMock.json
     */
    getDeliveryStatistics: builder.query({
      query: () => "mock/DeliveryStatisticsMock.json",
      providesTags: ["DeliveryStatistics"],
      transformErrorResponse: (response) => ({
        message: "無法讀取配送統計資料",
        status: response.status,
      }),
    }),
  }),
});

// 匯出生成的 hooks
export const {
  useGetRecentShippingPanelQuery,
  useGetTodayShippingPanelQuery,
  useGetShippingTrendsQuery,
  useGetDeliveryStatisticsQuery,
} = deliveryTrendApi;