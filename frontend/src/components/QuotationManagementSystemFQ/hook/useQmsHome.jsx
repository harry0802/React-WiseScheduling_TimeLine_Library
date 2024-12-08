// homeStore.js
import { create } from "zustand";

export const initialState = {
  pageStatus: "",
  data: [],
  displayedData: [],
  currentPage: 1,
  itemsPerPage: 12,
  total: 0,
  filteredData: null,
  isLoading: false,
  error: null,
  selectedItems: [], // 新增選擇項目功能
  sortConfig: {
    key: null,
    direction: "asc",
  },
};

// 共用的安全更新函數
const safeSetState = (updateFn, set) => {
  if (typeof window !== "undefined") {
    requestAnimationFrame(() => updateFn());
  } else {
    updateFn();
  }
};

export const createHomeActions = (set, get) => ({
  // API 相關
  setAPIData: (response) => {
    if (!response?.data || !Array.isArray(response.data)) {
      set({ error: "Invalid API response format" });
      return;
    }
    const { itemsPerPage } = get();
    safeSetState(() => {
      set({
        data: response.data,
        total: response.data.length,
        displayedData: response.data.slice(0, itemsPerPage),
        filteredData: null,
        error: null,
        isLoading: false,
        currentPage: 1,
        selectedItems: [],
      });
    }, set);
  },

  // 載入狀態
  setLoading: (isLoading) => set({ isLoading }),

  // 錯誤處理
  setError: (error) => set({ error }),

  // 分頁處理
  setPage: (page) => {
    const { filteredData, data, itemsPerPage } = get();
    const activeData = filteredData || data;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, activeData.length);

    safeSetState(() => {
      set({
        displayedData: activeData.slice(startIndex, endIndex),
        currentPage: page,
      });
    }, set);
  },

  // 設定每頁筆數
  setPageSize: (newItemsPerPage) => {
    const { currentPage, filteredData, data } = get();
    const activeData = filteredData || data;
    const startIndex = (currentPage - 1) * newItemsPerPage;
    const endIndex = Math.min(startIndex + newItemsPerPage, activeData.length);

    safeSetState(() => {
      set({
        displayedData: activeData.slice(startIndex, endIndex),
        itemsPerPage: newItemsPerPage,
        currentPage: 1, // 重置到第一頁
      });
    }, set);
  },

  searchData: (
    searchKey,
    searchFields = ["quotationSN", "customerName", "productName"]
  ) => {
    const { data, itemsPerPage, sortConfig } = get();

    // 驗證輸入
    if (!data || !Array.isArray(data)) {
      console.error("Invalid data for search");
      return;
    }

    if (!searchFields) {
      console.error("Invalid search fields");
      return;
    }

    // 確保 searchFields 是陣列
    const fields = Array.isArray(searchFields) ? searchFields : [searchFields];

    try {
      if (!searchKey) {
        safeSetState(() => {
          set({
            displayedData: data.slice(0, itemsPerPage),
            total: data.length,
            currentPage: 1,
            filteredData: data,
          });
        }, set);
        return;
      }

      const searchKeyLower = String(searchKey).toLowerCase();
      const isEnglish = /[a-zA-Z]/.test(searchKey);

      let filteredData = data.filter((item) => {
        if (!item) return false;

        return fields.some((field) => {
          const value = item[field];
          if (value == null) return false;

          const stringValue = String(value);

          return isEnglish
            ? stringValue.toLowerCase().includes(searchKeyLower)
            : stringValue.includes(searchKey);
        });
      });

      if (sortConfig?.key) {
        filteredData = [...filteredData].sort((a, b) => {
          const aValue = a[sortConfig.key] ?? "";
          const bValue = b[sortConfig.key] ?? "";
          return sortConfig.direction === "asc"
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        });
      }

      safeSetState(() => {
        set({
          displayedData: filteredData.slice(0, itemsPerPage),
          total: filteredData.length,
          currentPage: 1,
          filteredData,
        });
      }, set);
    } catch (error) {
      console.error("Search error:", error);
      set({ error: "搜尋時發生錯誤" });
    }
  },
  // 排序功能
  setSortConfig: (key) => {
    const { sortConfig, filteredData, data, itemsPerPage } = get();
    const activeData = filteredData || data;

    const newDirection =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    const sortedData = [...activeData].sort((a, b) => {
      const aValue = a[key] || "";
      const bValue = b[key] || "";
      return newDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    safeSetState(() => {
      set({
        sortConfig: { key, direction: newDirection },
        displayedData: sortedData.slice(0, itemsPerPage),
        filteredData: sortedData,
        currentPage: 1,
      });
    }, set);
  },

  // 選擇項目
  toggleSelectItem: (id) => {
    const { selectedItems } = get();
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter((item) => item !== id)
      : [...selectedItems, id];

    set({ selectedItems: newSelectedItems });
  },

  // 全選/取消全選
  toggleSelectAll: () => {
    const { displayedData, selectedItems } = get();
    const displayedIds = displayedData.map((item) => item.id);
    const allSelected = displayedIds.every((id) => selectedItems.includes(id));

    set({
      selectedItems: allSelected
        ? selectedItems.filter((id) => !displayedIds.includes(id))
        : [...new Set([...selectedItems, ...displayedIds])],
    });
  },

  // 重置功能
  resetAll: () =>
    safeSetState(
      () =>
        set({
          ...initialState,
          data: [],
          displayedData: [],
        }),
      set
    ),

  // 重置分頁
  resetPagination: () =>
    safeSetState(
      () =>
        set({
          currentPage: 1,
          itemsPerPage: 12,
        }),
      set
    ),

  // 重置篩選和排序
  resetFilters: () => {
    const { data, itemsPerPage } = get();
    safeSetState(
      () =>
        set({
          filteredData: null,
          displayedData: data.slice(0, itemsPerPage),
          total: data.length,
          currentPage: 1,
          sortConfig: { key: null, direction: "asc" },
        }),
      set
    );
  },
});

// 創建 store
const useHomeStore = create((set, get) => ({
  ...initialState,
  ...createHomeActions(set, get),
}));

export default useHomeStore;
