import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// 確保此路徑能正確對應到您的 apiConfig 檔案
import { API_BASE } from "../../../../store/api/apiConfig";

/**
 * @description 工廠績效儀表板 API 端點
 * @feature FactoryPerformanceDashboard
 * 處理各生產區域績效數據與工廠總體表現
 */
export const factoryPerformanceApi = createApi({
  reducerPath: "factoryPerformanceApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  tagTypes: [
    "ProductionZoneA",
    "ProductionZoneB",
    "ProductionZoneC",
    "ProductionZoneD",
  ],
  endpoints: (builder) => ({
    /**
     * @description 取得生產區域 A 資料
     * @endpoint GET /dashboard/machineOverview?productionArea=A
     */
    getProductionZoneA: builder.query({
      query: () => "dashboard/machineOverview?productionArea=A",
      providesTags: ["ProductionZoneA"],
      transformResponse: (response) => {
        // 提取 data 欄位，如果 response 已經是陣列則直接返回
        return Array.isArray(response) ? response : response?.data || [];
      },
      transformErrorResponse: (response) => ({
        message: "無法讀取生產區域 A 資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得生產區域 B 資料
     * @endpoint GET /dashboard/machineOverview?productionArea=B
     */
    getProductionZoneB: builder.query({
      query: () => "dashboard/machineOverview?productionArea=B",
      providesTags: ["ProductionZoneB"],
      transformResponse: (response) => {
        // 提取 data 欄位，如果 response 已經是陣列則直接返回
        return Array.isArray(response) ? response : response?.data || [];
      },
      transformErrorResponse: (response) => ({
        message: "無法讀取生產區域 B 資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得生產區域 C 資料
     * @endpoint GET /dashboard/machineOverview?productionArea=C
     */
    getProductionZoneC: builder.query({
      query: () => "dashboard/machineOverview?productionArea=C",
      providesTags: ["ProductionZoneC"],
      transformResponse: (response) => {
        // 提取 data 欄位，如果 response 已經是陣列則直接返回
        return Array.isArray(response) ? response : response?.data || [];
      },
      transformErrorResponse: (response) => ({
        message: "無法讀取生產區域 C 資料",
        status: response.status,
      }),
    }),

    /**
     * @description 取得生產區域 D 資料
     * @endpoint GET /dashboard/machineOverview?productionArea=D
     */
    getProductionZoneD: builder.query({
      query: () => "dashboard/machineOverview?productionArea=D",
      providesTags: ["ProductionZoneD"],
      transformResponse: (response) => {
        // 提取 data 欄位，如果 response 已經是陣列則直接返回
        return Array.isArray(response) ? response : response?.data || [];
      },
      transformErrorResponse: (response) => ({
        message: "無法讀取生產區域 D 資料",
        status: response.status,
      }),
    }),
  }),
});

// 匯出 RTK Query 自動生成的 hooks
export const {
  useGetProductionZoneAQuery,
  useGetProductionZoneBQuery,
  useGetProductionZoneCQuery,
  useGetProductionZoneDQuery,
} = factoryPerformanceApi;
