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
  transformMachineStatusHoursData,
  getDefaultUtilizationStatistics,
  getDefaultOfflineReasonData
} from "../shared/transformers";

/**
 * @description OEE 洞察系統 API 端點
 * @feature OEEInsightSystem
 * 提供實際被使用的 OEE 分析功能
 *
 * 功能涵蓋：
 * - 機台各狀態時間佔比
 * - 設備稼動分析統計
 * - 停機因素佔比分析
 * - 當日機台各狀態時數統計
 *
 * @note 已整合至 manufacturingApiSlice，使用端點注入模式
 * 統一配置、錯誤處理和回應轉換邏輯
 */
export const oeeInsightApi = manufacturingApiSlice.injectEndpoints({
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
      query: () => API_ENDPOINTS.OEE_INSIGHT.MACHINE_STATUS_PROPORTION,
      providesTags: [TAG_TYPES.MACHINE_STATUS_PROPORTION],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformArrayResponse(response),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.OEE_INSIGHT.MACHINE_STATUS_PROPORTION),
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
      query: () => API_ENDPOINTS.OEE_INSIGHT.MACHINE_UTILIZATION_STATISTICS,
      providesTags: [TAG_TYPES.MACHINE_UTILIZATION_STATISTICS],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => 
        transformObjectResponse(response, getDefaultUtilizationStatistics()),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.OEE_INSIGHT.MACHINE_UTILIZATION_STATISTICS),
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
      query: () => API_ENDPOINTS.OEE_INSIGHT.MACHINE_OFFLINE_REASON_PROPORTION,
      providesTags: [TAG_TYPES.MACHINE_OFFLINE_REASON_PROPORTION],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => 
        transformObjectResponse(response, getDefaultOfflineReasonData()),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.OEE_INSIGHT.MACHINE_OFFLINE_REASON_PROPORTION),
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
      query: () => API_ENDPOINTS.OEE_INSIGHT.MACHINE_STATUS_HOURS_STATISTICS,
      providesTags: [TAG_TYPES.MACHINE_STATUS_HOURS_STATISTICS],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => 
        transformArrayResponse(response, transformMachineStatusHoursData),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.OEE_INSIGHT.MACHINE_STATUS_HOURS_STATISTICS),
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
