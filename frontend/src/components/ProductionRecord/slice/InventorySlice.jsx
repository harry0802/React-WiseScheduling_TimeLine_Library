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
  };

  // Actions
  const actions = {
    setData: (data) => set({ dataSource: data, tableView: data }),
    setSelectedKeys: (selectedRowKeys) => set({ selectedRowKeys }),
    setDrawerVisible: (drawerVisible) => set({ drawerVisible }),
    setSelectedProductNumber: (selectedProductNumber) =>
      set({ selectedProductNumber }),

    // *新增的 filterData 方法

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
          : state.dataSource,
      }));
    },

    setRadioData: (materialType) => set({ radioData: materialType }),

    editRow: (row) =>
      set((state) => ({
        dataSource: state.dataSource.map((r) => (r.key === row.key ? row : r)),
      })),

    handleEditClick: () =>
      set(
        (state) => state.selectedRowKeys.length > 0 && { drawerVisible: true }
      ),

    handleSave: async () => {
      const state = get();
      const { selectedRowKeys, dataSource, selectedProductNumber } = state;
      const updateDataSource = dataSource.map((item) => ({
        ...item,
        materialType: selectedRowKeys.some((pd) => pd === item.id)
          ? selectedProductNumber
          : item.productNumber,
      }));

      set({
        dataSource: updateDataSource,
        selectedProductNumber: "",
        drawerVisible: false,
        selectedRowKeys: [],
      });

      return updateDataSource;
    },
  };
  return {
    ...initialState,
    ...actions,
  };
});

export default InventorySlice;
