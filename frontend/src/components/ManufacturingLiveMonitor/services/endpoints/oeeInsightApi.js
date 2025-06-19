import { manufacturingApiSlice } from "../manufacturingApiSlice";

/**
 * @description OEE 洞察系統 API 端點
 * 對應 OEEInsightSystem feature
 * 處理設備稼動率分析、停機因素、機台狀態等 OEE 相關數據
 */
export const oeeInsightApi = manufacturingApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description 取得機台稼動時間率資料
     * 📁 對應檔案: /public/mock/MachineOperationRateMock.json
     * 🎯 對應組件: OEEInsightSystem/feature/MachineOperationRate
     */
    getMachineOperationRate: builder.query({
      query: () => "mock/MachineOperationRateMock.json",
      providesTags: ["MachineOperationRate"],
      transformErrorResponse: (response) => ({
        message: "無法讀取機台稼動時間率資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得停機因素分析資料
     * 📁 對應檔案: /public/mock/DowntimeFactorsMock.json
     * 🎯 對應組件: OEEInsightSystem/feature/DowntimeFactors
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
     * @description 取得機台狀態持續時間資料
     * 📁 對應檔案: /public/mock/MachineStatusDurationMock.json
     * 🎯 對應組件: OEEInsightSystem/feature/MachineStatusDuration
     */
    getMachineStatusDuration: builder.query({
      query: () => "mock/MachineStatusDurationMock.json",
      providesTags: ["MachineStatusDuration"],
      transformErrorResponse: (response) => ({
        message: "無法讀取機台狀態持續時間資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得機台操作摘要資料
     * 📁 對應檔案: /public/mock/MachineOperationSummaryMock.json
     * 🎯 對應組件: OEEInsightSystem/feature/MachineOperationSummary
     */
    getMachineOperationSummary: builder.query({
      query: () => "mock/MachineOperationSummaryMock.json",
      providesTags: ["MachineOperationSummary"],
      transformErrorResponse: (response) => ({
        message: "無法讀取機台操作摘要資料",
        status: response.status,
      }),
    }),

    // 未來擴展的 OEE 洞察相關端點
    /**
     * @description 取得 OEE 綜合洞察資料 (未來擴展)
     * 📁 對應檔案: /public/mock/OEEInsightsMock.json
     */
    getOEEInsights: builder.query({
      query: () => "mock/OEEInsightsMock.json",
      providesTags: ["OEEInsights"],
      transformErrorResponse: (response) => ({
        message: "無法讀取 OEE 綜合洞察資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得設備效率分析資料 (未來擴展)
     * 📁 對應檔案: /public/mock/EquipmentEfficiencyMock.json
     */
    getEquipmentEfficiency: builder.query({
      query: () => "mock/EquipmentEfficiencyMock.json",
      providesTags: ["EquipmentEfficiency"],
      transformErrorResponse: (response) => ({
        message: "無法讀取設備效率分析資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得品質損失分析資料 (未來擴展)
     * 📁 對應檔案: /public/mock/QualityLossMock.json
     */
    getQualityLoss: builder.query({
      query: () => "mock/QualityLossMock.json",
      providesTags: ["QualityLoss"],
      transformErrorResponse: (response) => ({
        message: "無法讀取品質損失分析資料",
        status: response.status,
      }),
    }),
  }),
});

// 匯出生成的 hooks
export const {
  useGetMachineOperationRateQuery,
  useGetDowntimeFactorsQuery,
  useGetMachineStatusDurationQuery,
  useGetMachineOperationSummaryQuery,
  useGetOEEInsightsQuery,
  useGetEquipmentEfficiencyQuery,
  useGetQualityLossQuery,
} = oeeInsightApi;