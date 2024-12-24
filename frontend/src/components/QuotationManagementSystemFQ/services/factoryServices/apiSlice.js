/**
 * @fileoverview 工廠報價系統基礎 API 配置
 * @description
 * 此檔案建立了工廠報價系統的基礎 API 服務配置，包括：
 * - API 基礎設定
 * - 快取標籤定義
 * - 基礎查詢配置
 *
 * 目錄結構：
 * services/
 * ├── api/
 * │   ├── apiSlice.js (當前檔案)
 * │   └── endpoints/
 * │       ├── quotationApi.js  - 報價相關 API
 * │       ├── processApi.js    - 製程相關 API
 * │       └── shippingApi.js   - 出貨相關 API
 *
 * @version 1.0.0
 * @lastModified 2024-12-06
 */

//! =============== 1. 依賴導入 ===============
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../../store/api/apiConfig";

//! =============== 2. API 配置常量 ===============
/**
 * @constant {Object} API_CONFIG
 * @description API 相關配置常量
 */
const API_CONFIG = {
  REDUCER_PATH: "factoryQuotationApi",
  TAG_TYPES: {
    QUOTATION: "Quotation",
    PROCESS: "Process",
    SHIPPING: "Shipping",
  },
};

//! =============== 3. API 服務創建 ===============
/**
 * @constant factoryQuotationApiSlice
 * @description 工廠報價系統的基礎 API 服務配置
 *
 * @property {string} reducerPath - Redux reducer 路徑
 * @property {Function} baseQuery - 基礎查詢配置
 * @property {string[]} tagTypes - 快取標籤類型
 *
 * @notes
 * - 使用 RTK Query 作為 API 管理工具
 * - 採用 fetchBaseQuery 作為基礎請求工具
 * - 定義了三種快取標籤用於管理數據快取
 *
 * @example
 *  在其他 API 文件中擴展此服務
 * const extendedApi = factoryQuotationApiSlice.injectEndpoints({
 *   endpoints: (builder) => ({
 *      添加具體的 API 端點
 *   })
 * });
 */
const factoryQuotationApiSlice = createApi({
  reducerPath: API_CONFIG.REDUCER_PATH,
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
  }),
  tagTypes: Object.values(API_CONFIG.TAG_TYPES),
  endpoints: () => ({}),
});

//! =============== 4. 導出 ===============
export default factoryQuotationApiSlice;

/**
 * @exports TAG_TYPES
 * @description 導出快取標籤類型供其他檔案使用
 */
export const { TAG_TYPES } = API_CONFIG;
