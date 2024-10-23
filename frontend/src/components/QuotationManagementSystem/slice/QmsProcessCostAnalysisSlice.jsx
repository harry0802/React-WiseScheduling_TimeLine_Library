import { create } from "zustand";

const useProcessCostAnalysisStore = create((set) => ({
  processType: null,
  formData: {},
  infoDrawer: false,
  activeDrawerId: null,

  setProcessType: (type) => set({ processType: type }),
  setFormData: (data) => set({ formData: data }),
  setInfoDrawer: (isOpen) => set({ infoDrawer: isOpen }),
  setActiveDrawerId: (id) => set({ activeDrawerId: id }),

  handleFormSubmit: async (data) => {
    // 實現表單提交邏輯
    set({ formData: data });
    // 這裡可以添加API調用等
  },
}));

export default useProcessCostAnalysisStore;
