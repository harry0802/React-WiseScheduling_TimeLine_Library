/**
 * @fileoverview 報價系統狀態管理
 * @description
 * 使用 Zustand 管理工廠端和業務端的報價系統狀態
 * 包含查詢參數、分頁設置及相關操作方法
 *
 * @version 1.0.0
 * @lastModified 2024-12-06
 */

//! =============== 1. 依賴導入 ===============
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { initialState, createHomeActions } from "../hook/useQmsHome";

//! =============== 2. 類型定義 ===============
/**
 * @typedef {Object} QueryParams
 * @property {string} [productName] - 產品名稱
 * @property {string} [oldProductSN] - 舊產品編號
 * @property {string} [productSN] - 產品編號
 * @property {string} [sort] - 排序方式
 * @property {string} size - 每頁數量
 * @property {string} page - 當前頁碼
 */

/**
 * @typedef {Object} PaginationState
 * @property {number} total_pages - 總頁數
 * @property {number} total_count - 總記錄數
 * @property {number} current_page - 當前頁碼
 * @property {number} page_size - 每頁數量
 */

//! =============== 3. 默認值配置 ===============
/**
 * @constant {QueryParams} DEFAULT_PARAMS
 * @description 查詢參數默認值
 */
const DEFAULT_PARAMS = {
  productName: undefined,
  oldProductSN: undefined,
  productSN: undefined,
  sort: undefined,
  size: "10",
  page: "1",
};

/**
 * @constant {PaginationState} DEFAULT_PAGINATION
 * @description 分頁狀態默認值
 */
const DEFAULT_PAGINATION = {
  total_pages: 0,
  total_count: 0,
  current_page: 1,
  page_size: 10,
};

//! =============== 4. Store Actions ===============
/**
 * @function factoryHomeActions
 * @description 工廠端專用的狀態操作方法
 * @param {Function} set - Zustand 的 set 方法
 * @param {Function} get - Zustand 的 get 方法
 */
const factoryHomeActions = (set, get) => ({
  /**
   * @function setQueryParams
   * @description 更新查詢參數
   */
  setQueryParams: (newParams) =>
    set((state) => ({
      queryParams: {
        ...state.queryParams,
        ...newParams,
        page: newParams.page ?? "1",
      },
    })),

  /**
   * @function resetQueryParams
   * @description 重置所有查詢參數到默認值
   */
  resetQueryParams: () =>
    set({
      queryParams: DEFAULT_PARAMS,
      pagination: DEFAULT_PAGINATION,
    }),

  /**
   * @function updateSearchParams
   * @description 更新搜索條件
   * @param {string} searchText - 搜索文本
   * @param {string} searchType - 搜索類型
   */
  updateSearchParams: (searchText, searchType) =>
    set((state) => ({
      queryParams: {
        ...state.queryParams,
        [searchType]: searchText || undefined,
        page: "1", // 重置頁碼
      },
    })),

  /**
   * @function setPagination
   * @description 更新分頁信息
   */
  setPagination: (meta) =>
    set((state) => ({
      pagination: {
        total_pages: meta.total_pages,
        total_count: meta.total_count,
        current_page: meta.page,
        page_size: meta.size || state.pagination.page_size,
      },
    })),

  /**
   * @function setPage
   * @description 設置當前頁碼
   */
  setPage: (page) =>
    set((state) => ({
      queryParams: {
        ...state.queryParams,
        page: String(page),
      },
    })),

  /**
   * @function setPageSize
   * @description 設置每頁顯示數量
   */
  setPageSize: (size) =>
    set((state) => ({
      queryParams: {
        ...state.queryParams,
        size: String(size),
        page: "1", // 重置到第一頁
      },
    })),
});

//! =============== 5. Store 創建 ===============
/**
 * @constant useFactoryHomeSlice
 * @description 工廠報價系統狀態管理器
 *
 * @example
 * const { queryParams, setPage } = useFactoryHomeSlice();
 * setPage(2);
 */
export const useFactoryHomeSlice = create(
  persist(
    (set, get) => ({
      queryParams: DEFAULT_PARAMS,
      pagination: DEFAULT_PAGINATION,
      pageStatus: "工廠報價單管理系統",
      type: "factory",
      ...factoryHomeActions(set, get),
    }),
    {
      name: "factory-home-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * @constant useSalesHomeSlice
 * @description 業務報價系統狀態管理器
 */
export const useSalesHomeSlice = create(
  persist(
    (set, get) => ({
      ...initialState,
      pageStatus: "業務報價管理系統",
      type: "sales",
      ...createHomeActions(set, get),
    }),
    {
      name: "sales-home-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
