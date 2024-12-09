/**
 * @fileoverview 工廠報價單 API 服務
 * @description
 * 提供完整的報價單 CRUD 操作的 API 端點定義
 * 使用 RTK Query 管理 API 狀態和快取
 *
 * @version 1.0.0
 * @lastModified 2024-12-06
 */

//! =============== 1. 依賴導入 ===============
import { transformResponse } from "../../../utility/commonUtils";
import factoryQuotationApiSlice from "../apiSlice";

//! =============== 2. API 端點配置 ===============
/**
 * @constant {Object} API_ENDPOINTS
 * @description API 端點路徑配置
 */
const API_ENDPOINTS = {
  BASE: "/factoryQuotation",
  PRODUCT: "/product",
};

/**
 * @constant {Object} TAG_TYPES
 * @description API 快取標籤類型
 */
const TAG_TYPES = {
  QUOTATION: "Quotation",
};

//! =============== 3. API 服務定義 ===============
/**
 * @namespace quotationApi
 * @description 報價單相關 API 服務擴展定義
 */
export const quotationApi = factoryQuotationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for fetching quotations with pagination and filtering
    getQuotationList: builder.query({
      query: (params = {}) => ({
        url: "factoryQuotation/", // API endpoint path
        params: Object.fromEntries(
          Object.entries(params).filter(([_, v]) => v !== undefined)
        ), // Filter out undefined parameters
      }),
      providesTags: ["Quotation"], // Caching tag to optimize performance
    }),

    /**
     * @query getQuotations
     * @description 獲取所有報價單列表
     * @deprecated 此端點將被後端新 API 替換
     */
    getQuotations: builder.query({
      query: () => API_ENDPOINTS.PRODUCT,
      providesTags: [TAG_TYPES.QUOTATION],
    }),

    /**
     * @query getQuotationById
     * @description 根據 ID 獲取單個報價單詳情
     * @param {string} id - 報價單 ID
     * @returns {Object} 轉換後的報價單數據
     *
     * @notes
     * - 使用 transformResponse 確保數據格式一致性
     * - 添加時間戳強制觸發更新
     */
    getQuotationById: builder.query({
      query: (id) => `${API_ENDPOINTS.BASE}/${id}`,
      providesTags: (result, error, id) => [{ type: TAG_TYPES.QUOTATION, id }],
      transformResponse: (response, meta, arg) => {
        return transformResponse({
          ...response,
          _timestamp: Date.now(),
        });
      },
    }),

    /**
     * @mutation createQuotation
     * @description 創建新的報價單
     * @param {Object} body - 報價單數據
     */
    createQuotation: builder.mutation({
      query: (body) => ({
        url: `${API_ENDPOINTS.BASE}/`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_TYPES.QUOTATION],
    }),

    /**
     * @mutation updateQuotation
     * @description 更新現有報價單
     * @param {Object} params
     * @param {string} params.id - 報價單 ID
     * @param {Object} params.body - 更新的報價單數據
     */
    updateQuotation: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${API_ENDPOINTS.BASE}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: TAG_TYPES.QUOTATION, id },
      ],
    }),

    /**
     * @mutation deleteQuotation
     * @description 刪除報價單
     * @param {string} id - 要刪除的報價單 ID
     */
    deleteQuotation: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS.BASE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.QUOTATION],
    }),
  }),
});

//! =============== 4. Hooks 導出 ===============
/**
 * @exports API Hooks
 * @description 導出所有 API 操作的 React Hooks
 *
 * @example
 * // 使用示例
 * const { data, isLoading } = useGetQuotationByIdQuery(id);
 * const [updateQuotation] = useUpdateQuotationMutation();
 */
export const {
  useGetQuotationsQuery,
  useGetQuotationByIdQuery,
  useCreateQuotationMutation,
  useUpdateQuotationMutation,
  useDeleteQuotationMutation,
  useGetQuotationListQuery,
} = quotationApi;
