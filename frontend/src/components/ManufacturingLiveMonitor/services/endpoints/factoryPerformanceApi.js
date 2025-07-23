import { manufacturingApiSlice } from "../manufacturingApiSlice";
import { 
  API_ENDPOINTS, 
  ERROR_MESSAGES, 
  TAG_TYPES,
  POLLING_INTERVALS 
} from "../shared/constants";
import { 
  transformProductionZoneData, 
  transformErrorResponse 
} from "../shared/transformers";

/**
 * @description 工廠績效儀表板 API 端點
 * @feature FactoryPerformanceDashboard
 * 處理各生產區域績效數據與工廠總體表現
 * 
 * @note 已整合至 manufacturingApiSlice，使用端點注入模式
 * 統一配置、錯誤處理和回應轉換邏輯
 */
export const factoryPerformanceApi = manufacturingApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description 取得生產區域 A 資料
     * @endpoint GET /dashboard/machineOverview?productionArea=A
     * @usage 用於 FactoryPerformanceDashboard/feature/ProductionZoneA 組件
     * @returns {Promise<Array<Object>>} 生產區域 A 機台資料陣列
     * 
     * 提供生產區域 A 的機台狀態：
     * - 機台編號、當前狀態、運行時間
     * - 生產數量、效率指標、異常狀況
     */
    getProductionZoneA: builder.query({
      query: () => API_ENDPOINTS.FACTORY_PERFORMANCE.PRODUCTION_ZONE_A,
      providesTags: [TAG_TYPES.PRODUCTION_ZONE_A],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformProductionZoneData(response),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.FACTORY_PERFORMANCE.PRODUCTION_ZONE_A),
    }),

    /**
     * @description 取得生產區域 B 資料
     * @endpoint GET /dashboard/machineOverview?productionArea=B
     * @usage 用於 FactoryPerformanceDashboard/feature/ProductionZoneB 組件
     * @returns {Promise<Array<Object>>} 生產區域 B 機台資料陣列
     * 
     * 提供生產區域 B 的機台狀態：
     * - 機台編號、當前狀態、運行時間
     * - 生產數量、效率指標、異常狀況
     */
    getProductionZoneB: builder.query({
      query: () => API_ENDPOINTS.FACTORY_PERFORMANCE.PRODUCTION_ZONE_B,
      providesTags: [TAG_TYPES.PRODUCTION_ZONE_B],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformProductionZoneData(response),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.FACTORY_PERFORMANCE.PRODUCTION_ZONE_B),
    }),

    /**
     * @description 取得生產區域 C 資料
     * @endpoint GET /dashboard/machineOverview?productionArea=C
     * @usage 用於 FactoryPerformanceDashboard/feature/ProductionZoneC 組件
     * @returns {Promise<Array<Object>>} 生產區域 C 機台資料陣列
     * 
     * 提供生產區域 C 的機台狀態：
     * - 機台編號、當前狀態、運行時間
     * - 生產數量、效率指標、異常狀況
     */
    getProductionZoneC: builder.query({
      query: () => API_ENDPOINTS.FACTORY_PERFORMANCE.PRODUCTION_ZONE_C,
      providesTags: [TAG_TYPES.PRODUCTION_ZONE_C],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformProductionZoneData(response),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.FACTORY_PERFORMANCE.PRODUCTION_ZONE_C),
    }),

    /**
     * @description 取得生產區域 D 資料
     * @endpoint GET /dashboard/machineOverview?productionArea=D
     * @usage 用於 FactoryPerformanceDashboard/feature/ProductionZoneD 組件
     * @returns {Promise<Array<Object>>} 生產區域 D 機台資料陣列
     * 
     * 提供生產區域 D 的機台狀態：
     * - 機台編號、當前狀態、運行時間
     * - 生產數量、效率指標、異常狀況
     */
    getProductionZoneD: builder.query({
      query: () => API_ENDPOINTS.FACTORY_PERFORMANCE.PRODUCTION_ZONE_D,
      providesTags: [TAG_TYPES.PRODUCTION_ZONE_D],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformResponse: (response) => transformProductionZoneData(response),
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.FACTORY_PERFORMANCE.PRODUCTION_ZONE_D),
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
