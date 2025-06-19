import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../../store/api/apiConfig";

/**
 * @description 即時監控 API 專用 baseQuery
 * 使用真實 API 配置，完全脫離 customBaseQuery 的 mock 資料依賴
 */
const realTimeMonitorBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
});

/**
 * @description 即時 OEE 監控 API 端點
 * 提供戰情室即時監控功能所需的所有 API 端點
 *
 * 功能涵蓋：
 * - 機台狀態統計與比例分析
 * - 設備累計時間追蹤
 * - 逾期工單監控
 * - 機台離線事件記錄
 *
 * @note 所有端點均使用真實 API，回應格式統一為 { status, message, data }
 */
export const realTimeMonitorApi = createApi({
  reducerPath: "realTimeMonitorApi",
  baseQuery: realTimeMonitorBaseQuery,
  tagTypes: [
    "CurrentMachineStatusCount",
    "MachineStatusProportion",
    "MachineAccumulatedTime",
    "OverdueWorkOrder",
    "MachineOfflineEvent",
  ],
  endpoints: (builder) => ({
    /**
     * @description 取得當前機台狀態統計
     * @endpoint GET /dashboard/currentMachineStatusCount
     * @usage 用於 Scoreboard 組件顯示各狀態設備數量
     * @returns {Object} { status: string, count: number }
     *
     * 統計當天所有設備機台的狀態數量：
     * - 生產中、待機中、上模與調機、產品試模、機台停機等狀態
     */
    getCurrentMachineStatusCount: builder.query({
      query: () => "dashboard/currentMachineStatusCount",
      providesTags: ["CurrentMachineStatusCount"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取當前機台狀態統計資料",
        status: response.data?.status || false,
      }),
    }),

    /**
     * @description 取得機台各狀態時間佔比
     * @endpoint GET /dashboard/machineStatusProportion
     * @usage 用於 Scoreboard 與 MachineStateTimeRatioPieChart 組件
     * @returns {Object} { status: string, percentage: number, hours: number }
     *
     * 加總所有設備機台當天累積時間並以佔比顯示：
     * - 生產/調機/停機/試模/待機時間統計與佔比分析
     */
    getMachineStatusProportion: builder.query({
      query: () => "dashboard/machineStatusProportion",
      providesTags: ["MachineStatusProportion"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取機台狀態比例資料",
        status: response.data?.status || false,
      }),
    }),

    /**
     * @description 取得機台累計時間資料
     * @endpoint GET /dashboard/machineAccumulatedTime
     * @usage 用於 RealTimeDeviceTrackerDashboard 組件
     * @returns {Object} { machineSN, runTime, tuningTime, offlineTime, testingTime, idleTime, status }
     *
     * 提供各機台詳細時間統計：
     * - 運行時間、調機時間、離線時間、測試時間、閒置時間
     */
    getMachineAccumulatedTime: builder.query({
      query: () => "dashboard/machineAccumulatedTime",
      providesTags: ["MachineAccumulatedTime"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取機台累計時間資料",
        status: response.data?.status || false,
      }),
    }),

    /**
     * @description 取得逾期工單資料
     * @endpoint GET /dashboard/overdueWorkOrder
     * @usage 用於 OverdueTasksDashboard 組件
     * @returns {Object} { machineSN, workOrderSN, planFinishDate, unfinishedQuantity, productSN }
     *
     * 列出生產逾期任務：
     * - 預計完成日前七天或已過預計完成日但未完成的製令單
     * - 包含機台編號、工單編號、計畫完成日、未完成數量、產品編號
     */
    getOverdueWorkOrder: builder.query({
      query: () => "dashboard/overdueWorkOrder",
      providesTags: ["OverdueWorkOrder"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取逾期工單資料",
        status: response.data?.status || false,
      }),
    }),

    /**
     * @description 取得機台離線事件資料
     * @endpoint GET /dashboard/machineOfflineEvent
     * @usage 用於 EquipmentRiskModuleDashboard 組件
     * @returns {Object} { actualStartDate, machineSN, reason }
     *
     * 設備異常事件記錄：
     * - 列出當天有停機狀態的設備
     * - 包含發生時間、機台編號及停機原因
     */
    getMachineOfflineEvent: builder.query({
      query: () => "dashboard/machineOfflineEvent",
      providesTags: ["MachineOfflineEvent"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取機台離線事件資料",
        status: response.data?.status || false,
      }),
    }),
  }),
});

/**
 * @description 匯出自動生成的 React Hooks
 * 供 RealTimeOEEMonitor 相關組件使用
 *
 * Hook 與組件對應關係：
 * - useGetCurrentMachineStatusCountQuery: Scoreboard.jsx
 * - useGetMachineStatusProportionQuery: Scoreboard.jsx + MachineStateTimeRatioPieChart.jsx
 * - useGetMachineAccumulatedTimeQuery: RealTimeDeviceTrackerDashboard.jsx
 * - useGetOverdueWorkOrderQuery: OverdueTasksDashboard.jsx
 * - useGetMachineOfflineEventQuery: EquipmentRiskModuleDashboard.jsx
 */
export const {
  useGetCurrentMachineStatusCountQuery,
  useGetMachineStatusProportionQuery,
  useGetMachineAccumulatedTimeQuery,
  useGetOverdueWorkOrderQuery,
  useGetMachineOfflineEventQuery,
} = realTimeMonitorApi;
