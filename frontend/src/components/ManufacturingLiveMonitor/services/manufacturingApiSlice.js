import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//! =============== 1. 設定與常量 ===============

/**
 * @function customBaseQuery
 * @description 自定義 baseQuery，支援 mock 資料和實際 API
 * @param {Object} args - 查詢參數
 * @returns {Promise} 查詢結果
 */
const customBaseQuery = async (args) => {
  try {
    console.log("🔄 API 請求開始:", args);
    console.log("🔍 args 內容:", JSON.stringify(args, null, 2));
    
    // 處理不同的 args 格式
    let url;
    if (typeof args === 'string') {
      url = args;
    } else if (args && args.url) {
      url = args.url;
    } else {
      throw new Error(`無效的請求參數: ${JSON.stringify(args)}`);
    }
    
    console.log("📁 解析後的 URL:", url);
    
    // 如果是 mock 資料請求
    if (url.startsWith("mock/")) {
      const mockUrl = `/${url}`;
      console.log("📁 請求 URL:", mockUrl);
      
      const response = await fetch(mockUrl);
      console.log("📊 Response 狀態:", {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
        url: response.url
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText} - URL: ${mockUrl}`);
      }

      const data = await response.json();
      console.log("✅ 成功取得資料，筆數:", data?.length || '非陣列資料');
      return { data };
    }

    // 實際 API 請求 (未來可以擴展)
    return fetchBaseQuery({
      baseUrl:
        process.env.REACT_APP_MANUFACTURING_API_BASE || "/api/manufacturing/",
    })(args);
  } catch (error) {
    console.error("💥 API 請求失敗:", {
      message: error.message,
      stack: error.stack,
      args: args
    });
    
    return {
      error: {
        status: "FETCH_ERROR",
        error: `請求失敗: ${error.message}`,
        originalError: error
      },
    };
  }
};

/**
 * @description 製造監控系統 API Slice
 * 負責處理所有與製造監控相關的資料請求
 * 🧠 只包含實際存在於 /public/mock 目錄中的資料端點
 */
const manufacturingApiSlice = createApi({
  reducerPath: "manufacturingApi",
  baseQuery: customBaseQuery,
  tagTypes: ["DailyProductionTasks", "RecentShippingPanel"],

  endpoints: (builder) => ({
    //! =============== 已存在的 Mock 資料端點 ===============

    /**
     * @description 取得每日生產任務資料
     * 📁 對應檔案: /public/mock/DailyProductionTasksMock.json
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
     * @description 取得近期出貨面板資料
     * 📁 對應檔案: /public/mock/RecentShippingPanelMock.json
     */
    getRecentShippingPanel: builder.query({
      query: () => "mock/RecentShippingPanelMock.json",
      providesTags: ["RecentShippingPanel"],
      transformErrorResponse: (response) => ({
        message: "無法讀取當日待出貨即時戰情資料",
        status: response.status,
      }),
    }),

    //! =============== 未來擴展的真實 API endpoints ===============
    /**
     * @description 未來可以添加真實的 API 端點
     * @example
     * getRealTimeData: builder.query({
     *   query: (params) => ({
     *     url: 'realtime/data',
     *     params
     *   }),
     *   providesTags: ['RealTimeData']
     * })
     */
  }),
});

//! =============== 匯出的 Hooks ===============
//* 🧠 自動生成的 hooks，遵循 RTK Query 命名慣例
//* 只匯出實際可用的 API hooks

export const {
  // 已存在的 Mock 資料 hooks
  useGetDailyProductionTasksQuery,
  useGetRecentShippingPanelQuery,
} = manufacturingApiSlice;

export default manufacturingApiSlice;
