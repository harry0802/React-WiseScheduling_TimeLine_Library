import { create } from "zustand";

// Initial state
const initialState = {
  processId: null,
  processName: "",
  processSN: "",
  moldName: "",
  mold: [],
  productProcSecId: "",
  isEditMode: false,
  onDelete: true,
  processIndex: 0,
  jigSN: "",
  //   selectedProcessOpt: {},
};

// Actions to manipulate the state
const actions = (set) => ({
  setProcessAll: (data) => {
    set((state) => ({
      processId: data?.processId ?? state.processId,
      processName: data?.processName ?? "",
      processSN: data?.processSN ?? "",
      mold: data?.molds ?? state.mold,
      productProcSecId: data?.productId ?? "",
      isEditMode: data?.isEditMode ?? state.isEditMode,
      onDelete: data?.onDelete ?? state.onDelete,
      processIndex: data?.processIndex + 1 ?? state.processIndex,
      jigSN: data?.jigSN ?? "",
    }));
  },

  setProcessSection: (data) => set(() => ({ processSection: data })),
  setMold: (data) => set(() => ({ mold: data })),
  setIsEditMode: (status) => set(() => ({ isEditMode: status })),
  setOnDelete: (deletable) => set(() => ({ onDelete: deletable })),
  setProcessName: (data) => set(() => ({ processName: data })),
  setMoldName: (data) => set(() => ({ moldName: data })),
  setProcessIndex: (index) => set(() => ({ processIndex: index })),
  setJigSN: (data) => set(() => ({ jigSN: data })),
  reset: () => set({ ...initialState }),
});

// Zustand store creation
export const useProcessSectionSlice = create((set) => ({
  ...initialState,
  ...actions(set),
}));
