import { create } from "zustand";

/**
 * Zustand store for managing inventory state.
 * This store handles the state and actions related to managing inventory data,
 * including managing the data source, selected rows, and the visibility of UI elements.
 */

const InventorySlice = create((set) => {
  // State
  const initialState = {
    dataSource: [],
    selectedRowKeys: [],
    drawerVisible: false,
    selectedProductNumber: "",
  };

  // Actions
  const actions = {
    setData: (data) => set({ dataSource: data }),
    setSelectedKeys: (selectedRowKeys) => set({ selectedRowKeys }),
    setDrawerVisible: (drawerVisible) => set({ drawerVisible }),
    setSelectedProductNumber: (selectedProductNumber) =>
      set({ selectedProductNumber }),

    editRow: (row) =>
      set((state) => ({
        dataSource: state.dataSource.map((r) => (r.key === row.key ? row : r)),
      })),

    handleEditClick: () =>
      set(
        (state) => state.selectedRowKeys.length > 0 && { drawerVisible: true }
      ),

    handleSave: () =>
      set((state) => {
        const { selectedRowKeys, dataSource, selectedProductNumber } = state;
        const updateDataSource = dataSource.map((item) => ({
          ...item,
          productNumber: selectedRowKeys.some((pd) => pd === item.id)
            ? selectedProductNumber
            : item.productNumber,
        }));

        return {
          dataSource: updateDataSource,
          selectedProductNumber: "",
          drawerVisible: false,
          selectedRowKeys: [],
        };
      }),
  };
  return {
    ...initialState,
    ...actions,
  };
});

export default InventorySlice;
