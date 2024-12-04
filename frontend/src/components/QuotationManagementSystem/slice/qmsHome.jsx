import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { initialState, createHomeActions } from "../hook/useQmsHome";

// 查詢參數常量
const DEFAULT_PARAMS = {
  productName: undefined,
  oldProductSN: undefined,
  productSN: undefined,
  sort: undefined,
  size: "10",
  page: "1",
};

// 分頁相關的初始狀態
const DEFAULT_PAGINATION = {
  total_pages: 0,
  total_count: 0,
  current_page: 1,
  page_size: 10,
};

// 工廠端專用的 actions
const factoryHomeActions = (set, get) => ({
  // 查詢參數相關
  setQueryParams: (newParams) =>
    set((state) => ({
      queryParams: {
        ...state.queryParams,
        ...newParams,
        page: newParams.page ?? "1",
      },
    })),

  resetQueryParams: () =>
    set({
      queryParams: DEFAULT_PARAMS,
      pagination: DEFAULT_PAGINATION,
    }),

  updateSearchParams: (searchText, searchType) =>
    set((state) => ({
      queryParams: {
        ...state.queryParams,
        [searchType]: searchText || undefined,
        page: "1", // 重置頁碼
      },
    })),

  // 更新分頁信息
  setPagination: (meta) =>
    set((state) => ({
      pagination: {
        total_pages: meta.total_pages,
        total_count: meta.total_count,
        current_page: meta.page,
        page_size: meta.size || state.pagination.page_size,
      },
    })),

  // 設置頁碼
  setPage: (page) =>
    set((state) => ({
      queryParams: {
        ...state.queryParams,
        page: String(page),
      },
    })),

  // 設置每頁數量
  setPageSize: (size) =>
    set((state) => ({
      queryParams: {
        ...state.queryParams,
        size: String(size),
        page: "1", // 重置到第一頁
      },
    })),
});

// 工廠報價系統 store
export const useFactoryHomeSlice = create(
  persist(
    (set, get) => ({
      queryParams: DEFAULT_PARAMS,
      pagination: DEFAULT_PAGINATION,
      pageStatus: "工廠報價管理系統",
      type: "factory",
      ...factoryHomeActions(set, get),
    }),
    {
      name: "factory-home-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// 業務報價系統 store (保持原有邏輯)
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
