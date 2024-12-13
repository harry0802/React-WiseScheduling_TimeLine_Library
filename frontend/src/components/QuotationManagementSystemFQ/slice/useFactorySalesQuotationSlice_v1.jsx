import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import {
  useQuotationStore as actions,
  initialState,
} from "../hook/useFactorySalesQuotation_v1";

const internalInitialState = {
  ...initialState,
  department: "",
  requestPerson: "",
};

// 內部報價管理系統
export const useInternalQuotationStore = create(
  persist(
    (set, get) => ({
      ...internalInitialState,
      type: "factory",
      ...actions(set, get),
    }),
    {
      name: "internalQuotationStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
