import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../store/api/apiConfig";
import { TAG_TYPES, RTK_QUERY_CONFIG } from "./shared/constants";

/**
 * @description Manufacturing Live Monitor 統一 API Slice
 * 整合所有製造監控相關的 API 端點，採用端點注入模式
 *
 * 架構重構：
 * - 統一 baseQuery 配置，支援真實 API 調用
 * - 集中化 tagTypes 管理，避免重複定義
 * - 標準化輪詢和錯誤處理配置
 * - 支援模組化端點注入擴展
 */
export const manufacturingApiSlice = createApi({
  reducerPath: "manufacturingApi",

  // 統一使用真實 API baseQuery
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    // 統一請求頭配置
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  // 預設每小時重新獲取數據
  refetchOnMountOrArgChange:
    RTK_QUERY_CONFIG.DEFAULT_REFETCH_ON_MOUNT_OR_ARG_CHANGE,

  // 統一管理所有標籤類型 - 從 constants.js 導入
  tagTypes: Object.values(TAG_TYPES),

  // 初始端點為空，通過注入方式添加
  endpoints: () => ({}),
});

export default manufacturingApiSlice;
