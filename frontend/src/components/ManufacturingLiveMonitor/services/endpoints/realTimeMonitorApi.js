import { manufacturingApiSlice } from "../manufacturingApiSlice";
import {
  API_ENDPOINTS,
  ERROR_MESSAGES,
  TAG_TYPES,
  POLLING_INTERVALS,
} from "../shared/constants";
import {
  transformArrayResponse,
  transformObjectResponse,
  transformErrorResponse,
  transformMachineTimeData,
  transformOverdueWorkOrderData,
  transformMachineOfflineEventData,
  transformDailyOEEData,
  transformApiResponse,
} from "../shared/transformers";

/**
 * @description 即時 OEE 監控 API 端點
 * @feature RealTimeOEEMonitor
 * 提供戰情室即時監控功能所需的所有 API 端點
 *
 * 功能涵蓋：
 * - 機台狀態統計與比例分析
 * - 設備累計時間追蹤
 * - 逾期工單監控
 * - 機台離線事件記錄
 *
 * @note 已整合至 manufacturingApiSlice，使用端點注入模式
 * 統一配置、錯誤處理和回應轉換邏輯
 */
export const realTimeMonitorApi = manufacturingApiSlice.injectEndpoints({
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
      pollingInterval: 3600000, // 每小時輪詢
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取當前機台狀態統計資料",
        status: response.data?.status || false,
      }),
    }),

    /**
     * 取得機台累計時間資料
     *
     * @description 提供製造業機台的詳細時間統計資料，包含運行、調機、離線、測試、閒置等各種狀態的累計時間
     *
     * @endpoint GET /dashboard/machineAccumulatedTime
     * @usage 主要用於 RealTimeDeviceTrackerDashboard 組件的即時監控顯示
     *
     * @returns {Promise<Array<Object>>} 機台時間資料陣列
     * @returns {string} returns[].id - 機台唯一識別碼（基於 machineSN）
     * @returns {string} returns[].machine - 機台編號
     * @returns {string} returns[].productionTime - 生產時間（格式化後，空值顯示為 "--:--:--"）
     * @returns {string} returns[].adjustmentTime - 調機時間（格式化後）
     * @returns {string} returns[].downtime - 停機時間（格式化後）
     * @returns {string} returns[].testingTime - 測試時間（格式化後）
     * @returns {string} returns[].waitingTime - 等待時間（格式化後）
     * @returns {string} returns[].status - 機台當前狀態
     *
     * @example
     * // 使用範例
     * const { data, isLoading, error } = useGetMachineAccumulatedTimeQuery();
     * if (data) {
     *   data.forEach(machine => {
     *     console.log(`機台 ${machine.machine}: 生產時間 ${machine.productionTime}`);
     *   });
     * }
     *
     * @since 2024.12 - 新增時間格式化功能（"0:00:00" 顯示為 "--:--:--"）
     * @notes
     * - 所有時間欄位已在 API 層進行格式化處理
     * - 符合製造業界面慣例，空值統一顯示為破折號格式
     * - 資料來源：生產管理系統即時統計
     */
    getMachineAccumulatedTime: builder.query({
      query: () => "dashboard/machineAccumulatedTime",
      providesTags: ["MachineAccumulatedTime"],
      pollingInterval: 3600000, // 每小時輪詢
      transformResponse: (response) => {
        if (!response.data || !Array.isArray(response.data)) {
          return [];
        }

        /**
         * 格式化時間顯示值
         * @description 將空值或 "0:00:00" 格式化為 "--:--:--"，符合製造業界面慣例
         * @param {string|null|undefined} timeValue - 原始時間值
         * @returns {string} 格式化後的時間顯示值
         */
        const formatTimeDisplay = (timeValue) => {
          if (!timeValue || timeValue === "0:00:00") {
            return "-- -- -- ";
          }
          return timeValue;
        };

        return response.data.map((item, index) => ({
          id: item.machineSN || `machine-${index}`,
          machine: item.machineSN,
          productionTime: formatTimeDisplay(item.runTime),
          adjustmentTime: formatTimeDisplay(item.tuningTime),
          downtime: formatTimeDisplay(item.offlineTime),
          testingTime: formatTimeDisplay(item.testingTime),
          waitingTime: formatTimeDisplay(item.idleTime),
          status: item.status || "IDLE",
        }));
      },
      transformErrorResponse: (response) => ({
        message: response.data?.message || "無法讀取機台累計時間資料",
        status: response.data?.status || false,
      }),
    }),

    /**
     * @description 取得逾期工單資料
     * @endpoint GET /dashboard/overdueWorkOrder
     * @usage 用於 OverdueTasksDashboard 組件
     * @returns {Array<Object>} 轉換後的逾期工單陣列
     * @returns {string} returns[].orderNumber - 製令單號 (從 workOrderSN 轉換)
     * @returns {string} returns[].productId - 產品編號 (從 productSN 轉換)
     * @returns {number} returns[].incompleteQty - 未完成數量 (從 unfinishedQuantity 轉換)
     * @returns {string} returns[].machine - 機台編號 (從 machineSN 轉換)
     * @returns {string} returns[].expiryDate - 到期日期 (從 planFinishDate 轉換為 YYYY-MM-DD 格式)
     *
     * 列出生產逾期任務：
     * - 預計完成日前七天或已過預計完成日但未完成的製令單
     * - 資料已在 API 層完成欄位映射和日期格式轉換
     */
    getOverdueWorkOrder: builder.query({
      query: () => API_ENDPOINTS.REAL_TIME_MONITOR.OVERDUE_WORK_ORDER,
      providesTags: [TAG_TYPES.OVERDUE_WORK_ORDER],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) =>
        transformArrayResponse(response, transformOverdueWorkOrderData),
      transformErrorResponse: (response) =>
        transformErrorResponse(
          response,
          ERROR_MESSAGES.REAL_TIME_MONITOR.OVERDUE_WORK_ORDER
        ),
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
      query: () => API_ENDPOINTS.REAL_TIME_MONITOR.MACHINE_OFFLINE_EVENT,
      providesTags: [TAG_TYPES.MACHINE_OFFLINE_EVENT],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) =>
        transformArrayResponse(response, transformMachineOfflineEventData),
      transformErrorResponse: (response) =>
        transformErrorResponse(
          response,
          ERROR_MESSAGES.REAL_TIME_MONITOR.MACHINE_OFFLINE_EVENT
        ),
    }),
    /**
     * @description 取得今日製令單資料
     * @endpoint GET /dashboard/todayWorkOrder
     * @usage 用於 DailyProductionDashboard 組件
     * @returns {Object} { workOrderSN, productSN, unfinishedQuantity, machineSN, planFinishDate }
     */
    getTodayWorkOrder: builder.query({
      query: () => API_ENDPOINTS.REAL_TIME_MONITOR.TODAY_WORK_ORDER,
      providesTags: [TAG_TYPES.TODAY_WORK_ORDER],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformArrayResponse(response),
      transformErrorResponse: (response) =>
        transformErrorResponse(
          response,
          ERROR_MESSAGES.REAL_TIME_MONITOR.TODAY_WORK_ORDER
        ),
    }),

    /**
     * @description 取得每日 OEE 資料
     * @endpoint GET /dashboard/dailyOEE
     * @usage 用於 OEEMonitorBarChart 組件
     * @returns {Array<Object>} 每日 OEE 資料陣列，按日期排序
     * @returns {string} returns[].date - 日期 (YYYY-MM-DD 格式)
     * @returns {number} returns[].OEE - OEE 值
     *
     * 提供每日 OEE 圖表資料：
     * - 資料按日期由小到大排序
     * - 用於替換 OEEMonitorBarChart 中的靜態資料
     */
    getDailyOEE: builder.query({
      query: () => API_ENDPOINTS.REAL_TIME_MONITOR.DAILY_OEE,
      providesTags: [TAG_TYPES.DAILY_OEE],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) =>
        transformApiResponse(response, [], transformDailyOEEData),
      transformErrorResponse: (response) =>
        transformErrorResponse(
          response,
          ERROR_MESSAGES.REAL_TIME_MONITOR.DAILY_OEE
        ),
    }),
  }),
});

/**
 * @description 匯出自動生成的 React Hooks
 * 供 RealTimeOEEMonitor 相關組件使用
 *
 * Hook 與組件對應關係：
 * - useGetCurrentMachineStatusCountQuery: Scoreboard.jsx
 * - useGetMachineAccumulatedTimeQuery: RealTimeDeviceTrackerDashboard.jsx
 * - useGetOverdueWorkOrderQuery: OverdueTasksDashboard.jsx
 * - useGetMachineOfflineEventQuery: EquipmentRiskModuleDashboard.jsx
 * - useGetTodayWorkOrderQuery: DailyProductionDashboard.jsx
 * - useGetDailyOEEQuery: OEEMonitorBarChart.jsx
 */
export const {
  useGetCurrentMachineStatusCountQuery,
  useGetMachineAccumulatedTimeQuery,
  useGetOverdueWorkOrderQuery,
  useGetMachineOfflineEventQuery,
  useGetTodayWorkOrderQuery,
  useGetDailyOEEQuery,
} = realTimeMonitorApi;
