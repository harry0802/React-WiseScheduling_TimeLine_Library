import { manufacturingApiSlice } from "../manufacturingApiSlice";
import { 
  API_ENDPOINTS, 
  ERROR_MESSAGES, 
  TAG_TYPES,
  POLLING_INTERVALS 
} from "../shared/constants";
import { transformErrorResponse } from "../shared/transformers";

/**
 * @description 配送趨勢分析 API 端點
 * @feature DeliveryTrendAnalyzer
 * 處理出貨面板、配送戰情等相關功能
 * 
 * @note 使用 mock 資料的端點，通過統一的 API slice 管理
 * 保持架構一致性，同時支援 mock 資料需求
 */
export const deliveryTrendApi = manufacturingApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description 取得近期出貨面板資料
     * @endpoint GET /mock/RecentShippingPanelMock.json
     * @usage 用於 DeliveryTrendAnalyzer/feature/RecentShippingPanel 組件
     * @returns {Promise<Array<Object>>} 近期出貨面板資料陣列
     * 
     * 提供當日待出貨即時戰情：
     * - 組立包裝狀態、庫存未交數、客戶資訊
     * - 訂單編號、產品資訊、出貨數量
     * - 完成數量、未完成數量、交貨日期等
     * 
     * @note 目前使用 mock 資料，未來可升級為真實 API
     */
    getRecentShippingPanel: builder.query({
      query: () => API_ENDPOINTS.DELIVERY_TREND.RECENT_SHIPPING_PANEL,
      providesTags: [TAG_TYPES.RECENT_SHIPPING_PANEL],
      pollingInterval: POLLING_INTERVALS.HOURLY,
      transformErrorResponse: (response) => 
        transformErrorResponse(response, ERROR_MESSAGES.DELIVERY_TREND.RECENT_SHIPPING_PANEL),
    }),

  }),
});

// 匯出生成的 hooks
export const {
  useGetRecentShippingPanelQuery,
} = deliveryTrendApi;
