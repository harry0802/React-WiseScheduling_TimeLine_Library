import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { unstable_batchedUpdates } from "react-dom";

/**
 * Creates a Zustand store for managing home page state and actions.
 */
export const homeSlice = create(
  persist(
    (set, get) => ({
      // Initial State
      pageStatus: "產品履歷與BOM",
      data: null,
      displayedData: null,
      currentPage: 1,
      itemsPerPage: 10,
      total: 0,
      filteredData: null,

      // Actions
      setPageStatus: (status) => set({ pageStatus: status }),

      setData: (data) => {
        const { itemsPerPage } = get();
        const updateData = () => {
          unstable_batchedUpdates(() => {
            set({
              data,
              total: data.length,
              displayedData: data.slice(0, itemsPerPage),
              filteredData: null,
            });
          });
        };
        if (typeof window !== "undefined") {
          requestAnimationFrame(updateData);
        } else {
          updateData();
        }
      },

      setDisplayedData: (displayedData) => {
        const updateDisplayedData = () => {
          unstable_batchedUpdates(() => {
            set({ displayedData });
          });
        };
        if (typeof window !== "undefined") {
          requestAnimationFrame(updateDisplayedData);
        } else {
          updateDisplayedData();
        }
      },

      setPage: (page) => {
        const { filteredData, data, itemsPerPage } = get();
        const activeData = filteredData || data;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const updatePage = () => {
          unstable_batchedUpdates(() => {
            set({
              displayedData: activeData.slice(startIndex, endIndex),
              currentPage: page,
            });
          });
        };
        if (typeof window !== "undefined") {
          requestAnimationFrame(updatePage);
        } else {
          updatePage();
        }
      },

      setPageSize: (itemsPerPage) => {
        const { currentPage, filteredData, data } = get();
        const activeData = filteredData || data;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const updatePageSize = () => {
          unstable_batchedUpdates(() => {
            set({
              displayedData: activeData.slice(startIndex, endIndex),
              itemsPerPage,
            });
          });
        };
        if (typeof window !== "undefined") {
          requestAnimationFrame(updatePageSize);
        } else {
          updatePageSize();
        }
      },

      searchData: (searchKey, searchTerm) => {
        const { data, itemsPerPage } = get();
        const filteredData = searchKey
          ? data.filter((item) => {
              const value = item[searchTerm];
              if (!value) return false;

              return /[a-zA-Z]/.test(searchKey)
                ? value.toLowerCase().includes(searchKey.toLowerCase())
                : value.includes(searchKey);
            })
          : data;

        const updateSearchData = () => {
          unstable_batchedUpdates(() => {
            set({
              displayedData: filteredData.slice(0, itemsPerPage),
              total: filteredData.length,
              currentPage: 1,
              filteredData,
            });
          });
        };

        if (typeof window !== "undefined") {
          requestAnimationFrame(updateSearchData);
        } else {
          updateSearchData();
        }
      },

      setFilteredData: (filteredData, itemsPerPage) => {
        if (!Array.isArray(filteredData) || typeof itemsPerPage !== "number") {
          console.error("Invalid payload for setFilteredData action");
          return;
        }

        const updateFilteredData = () => {
          unstable_batchedUpdates(() => {
            set({
              displayedData: filteredData.slice(0, itemsPerPage),
              total: filteredData.length,
              currentPage: 1,
              filteredData,
            });
          });
        };

        if (typeof window !== "undefined") {
          requestAnimationFrame(updateFilteredData);
        } else {
          updateFilteredData();
        }
      },
    }),
    {
      name: "homeSlice-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Notification hooks and component omitted for brevity
