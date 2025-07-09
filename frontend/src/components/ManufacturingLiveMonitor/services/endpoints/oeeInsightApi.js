import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../../store/api/apiConfig";

/**
 * @description OEE 洞察系統 API 專用 baseQuery
 * 使用真實 API 配置，完全脫離 mock 資料依賴
 */
const oeeInsightBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
});

/**
 * @description OEE 洞察系統 API 端點
 * 提供實際被使用的 OEE 分析功能
 *
 * 功能涵蓋：
 * - 機台各狀態時間佔比
 * - 設備稼動分析統計
 * - 停機因素佔比分析
 * - 當日機台各狀態時數統計
 *
 * @note 所有端點均使用真實 API，回應格式統一為 { status, message, data }
 */
export const oeeInsightApi = createApi({
  reducerPath: "oeeInsightApi",
  baseQuery: oeeInsightBaseQuery,
  tagTypes: [
    "MachineStatusProportion",
    "MachineUtilizationStatistics",
    "MachineOfflineReasonProportion",
    "MachineStatusHoursStatistics",
  ],
  endpoints: (builder) => ({
    /**
     * @description 取得機台各狀態時間佔比
     * @endpoint GET /dashboard/machineStatusProportion
     * @usage 用於 MachineStateTimeRatioPieChart 圓餅圖組件
     * @returns {Promise<Array<Object>>} 機台狀態佔比資料陣列
     * @returns {string} returns[].status - 機台狀態名稱 (生產中、上模與調機、機台停機、產品試模、待機中)
     * @returns {number} returns[].percentage - 時間佔比 (百分比)
     * @returns {number} returns[].hours - 累計時間 (小時)
     */
    getMachineStatusProportion: builder.query({
      query: () => "dashboard/machineStatusProportion",
      providesTags: ["MachineStatusProportion"],
      transformResponse: (response) => {
        if (!response || !response.data || !Array.isArray(response.data)) {
          return [];
        }
        return response.data;
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取機台各狀態時間佔比資料",
        status: response.data?.status || false,
      }),
    }),

    /**
     * @description 取得設備稼動分析統計
     * @endpoint GET /dashboard/machineUtilizationStatistics
     * @usage 用於 OEE 設備稼動摘要儀表板
     * @returns {Promise<Object>} 設備稼動統計資料
     * @returns {string} returns.utilizationTime - 稼動時間 (格式: "XX時XX分")
     * @returns {number} returns.utilizationRate - 稼動率 (百分比)
     * @returns {number} returns.runCount - 運行機台數量
     * @returns {number} returns.offlineCount - 離線機台數量
     */
    getMachineUtilizationStatistics: builder.query({
      query: () => "dashboard/machineUtilizationStatistics",
      providesTags: ["MachineUtilizationStatistics"],
      transformResponse: (response) => {
        if (!response || !response.data) {
          return {
            utilizationTime: "00時00分",
            utilizationRate: 0,
            runCount: 0,
            offlineCount: 0,
          };
        }
        return response.data;
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取設備稼動分析統計資料",
        status: response.data?.status || false,
      }),
    }),

    /**
     * @description 取得停機因素佔比分析
     * @endpoint GET /dashboard/machineOfflineReasonProportion
     * @usage 用於 OEE 停機原因分析圖表
     * @returns {Promise<Object>} 停機因素佔比資料
     * @returns {string} returns.reason - 停機原因
     * @returns {number} returns.hours - 停機時間 (小時)
     */
    getMachineOfflineReasonProportion: builder.query({
      query: () => "dashboard/machineOfflineReasonProportion",
      providesTags: ["MachineOfflineReasonProportion"],
      transformResponse: (response) => {
        if (!response || !response.data) {
          return {
            reason: "",
            hours: 0,
          };
        }
        return response.data;
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取停機因素佔比分析資料",
        status: response.data?.status || false,
      }),
    }),

    /**
     * @description 取得當日機台各狀態時數統計
     * @endpoint GET /dashboard/machineStatusHoursStatistics
     * @usage 用於 OEE 機台狀態時數統計表格或圖表
     * @returns {Promise<Array<Object>>} 機台狀態時數統計陣列
     * @returns {string} returns[].machineSN - 機台編號 (用作唯一識別)
     * @returns {number} returns[].run - 運行時間 (小時)
     * @returns {number} returns[].idle - 閒置時間 (小時)
     * @returns {number} returns[].tuning - 調機時間 (小時)
     * @returns {number} returns[].testing - 測試時間 (小時)
     * @returns {number} returns[].offline - 離線時間 (小時)
     */
    getMachineStatusHoursStatistics: builder.query({
      query: () => "dashboard/machineStatusHoursStatistics",
      providesTags: ["MachineStatusHoursStatistics"],
      transformResponse: (response) => {
        if (!response || !response.data || !Array.isArray(response.data)) {
          return [];
        }
        // 為陣列資料添加唯一 id (使用 machineSN)
        return response.data.map((item) => ({
          ...item,
          id:
            item.machineSN ||
            `machine-${Math.random().toString(36).substr(2, 9)}`,
        }));
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取當日機台各狀態時數統計資料",
        status: response.data?.status || false,
      }),
    }),
  }),
});

/**
 * @description 匯出自動生成的 React Hooks
 * 供實際使用的組件調用
 *
 * Hook 與組件對應關係：
 * - useGetMachineStatusProportionQuery: MachineStateTimeRatioPieChart.jsx
 * - useGetMachineUtilizationStatisticsQuery: 設備稼動摘要儀表板
 * - useGetMachineOfflineReasonProportionQuery: 停機原因分析圖表
 * - useGetMachineStatusHoursStatisticsQuery: 機台狀態時數統計表格/圖表
 */
export const {
  useGetMachineStatusProportionQuery,
  useGetMachineUtilizationStatisticsQuery,
  useGetMachineOfflineReasonProportionQuery,
  useGetMachineStatusHoursStatisticsQuery,
} = oeeInsightApi;
