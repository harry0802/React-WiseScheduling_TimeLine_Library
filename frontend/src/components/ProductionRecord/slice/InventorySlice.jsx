import { create } from "zustand";

/**
 * Zustand store for managing inventory state.
 * This store handles the state and actions related to managing inventory data,
 * including managing the data source, selected rows, and the visibility of UI elements.
 */

const InventorySlice = create((set, get) => {
  // State
  const initialState = {
    dataSource: [],
    tableView: [],
    selectedRowKeys: [],
    drawerVisible: false,
    selectedProductNumber: "",
    radioData: [],
    searchState: null, // Add searchState to initial state
  };

  // Actions
  const actions = {
    /**
     * Set data source and optionally reset table view.
     * @param {Array} data - The new data source.
     * @param {boolean} [resetTableView=true] - Whether to reset the table view.
     */
    setData: (data, resetTableView = true) => {
      set((state) => ({
        dataSource: data,
        tableView: resetTableView ? data : state.tableView, // Conditionally reset tableView
      }));
    },

    /**
     * Reset table view to match data source.
     */
    resetTableView: () => {
      const state = get();
      set({ tableView: state.dataSource }); // Reset tableView to dataSource
    },

    /**
     * Set selected row keys.
     * @param {Array} selectedRowKeys - The selected row keys.
     */
    setSelectedKeys: (selectedRowKeys) => set({ selectedRowKeys }),

    /**
     * Set drawer visibility.
     * @param {boolean} drawerVisible - The drawer visibility.
     */
    setDrawerVisible: (drawerVisible) => set({ drawerVisible }),

    /**
     * Set selected product number.
     * @param {string} selectedProductNumber - The selected product number.
     */
    setSelectedProductNumber: (selectedProductNumber) =>
      set({ selectedProductNumber }),

    /**
     * Set search state.
     * @param {Object} searchState - The search state.
     */
    setSearchState: (searchState) => set({ searchState }), // Store search state

    /**
     * Filter data based on search term and key.
     * @param {string} searchTerm - The search term.
     * @param {string} searchKey - The key to search by.
     */
    filterData: (searchTerm, searchKey) => {
      const trimmedSearchTerm = searchTerm.trim();
      set((state) => ({
        tableView: trimmedSearchTerm
          ? state.dataSource.filter((item) => {
              const itemValue = item[searchKey]?.toString();
              if (!itemValue) return false;

              return trimmedSearchTerm.match(/^[a-zA-Z]+$/)
                ? itemValue
                    .toLowerCase()
                    .includes(trimmedSearchTerm.toLowerCase())
                : itemValue.includes(trimmedSearchTerm);
            })
          : state.dataSource, // Filter data based on search term
      }));
    },

    /**
     * Set radio data.
     * @param {Array} materialType - The material type data.
     */
    setRadioData: (materialType) => set({ radioData: materialType }),

    /**
     * Edit a row in the data source.
     * @param {Object} row - The row to edit.
     */
    editRow: (row) =>
      set((state) => ({
        dataSource: state.dataSource.map((r) => (r.key === row.key ? row : r)),
      })),

    /**
     * Handle edit button click.
     */
    handleEditClick: () =>
      set(
        (state) => state.selectedRowKeys.length > 0 && { drawerVisible: true }
      ),

    /**
     * Handle save action.
     * @returns {Promise<Array>} - The updated data source.
     */
    handleSave: async () => {
      const state = get();
      const {
        selectedRowKeys,
        dataSource,
        selectedProductNumber,
        searchState,
      } = state;
      const updateDataSource = dataSource.map((item) => ({
        ...item,
        materialOptionId: selectedRowKeys.some((pd) => pd === item.id)
          ? +selectedProductNumber
          : item.productNumber,
      }));

      set({
        dataSource: updateDataSource,
        selectedProductNumber: "",
        drawerVisible: false,
        selectedRowKeys: [],
      });

      // Reapply filter if searchState exists
      if (searchState?.userSearch) {
        actions.filterData(searchState.userSearch, searchState.userSelect);
      } else {
        actions.resetTableView(); // Reset tableView if no search state
      }

      return updateDataSource;
    },
  };
  return {
    ...initialState,
    ...actions,
  };
});

export default InventorySlice;
