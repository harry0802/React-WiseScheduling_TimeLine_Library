import { manufacturingApiSlice } from "../manufacturingApiSlice";

/**
 * @description OEE 洞察系統 API 端點
 * 使用端點注入模式添加到核心 manufacturingApiSlice
 */
export const oeeApi = manufacturingApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description 取得停機因素分析資料 (未來擴展)
     * 📁 對應檔案: /public/mock/DowntimeFactorsMock.json
     */
    getDowntimeFactors: builder.query({
      query: () => "mock/DowntimeFactorsMock.json",
      providesTags: ["DowntimeFactors"],
      transformErrorResponse: (response) => ({
        message: "無法讀取停機因素分析資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得機器操作率資料 (未來擴展)
     * 📁 對應檔案: /public/mock/MachineOperationRateMock.json
     */
    getMachineOperationRate: builder.query({
      query: () => "mock/MachineOperationRateMock.json",
      providesTags: ["MachineOperationRate"],
      transformErrorResponse: (response) => ({
        message: "無法讀取機器操作率資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得 OEE 洞察資料 (未來擴展)
     * 📁 對應檔案: /public/mock/OEEInsightsMock.json
     */
    getOEEInsights: builder.query({
      query: () => "mock/OEEInsightsMock.json",
      providesTags: ["OEEInsights"],
      transformErrorResponse: (response) => ({
        message: "無法讀取 OEE 洞察資料",
        status: response.status,
      }),
    }),
  }),
});

// 匯出生成的 hooks
export const {
  useGetDowntimeFactorsQuery,
  useGetMachineOperationRateQuery,
  useGetOEEInsightsQuery,
} = oeeApi;
