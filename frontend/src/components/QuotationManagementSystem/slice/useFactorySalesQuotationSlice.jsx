import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { initialState, actions } from "../hook/useFactorySalesQuotation";

// 工廠報價系統
export const useFactoryQuotationSlice = create(
  persist(
    (set) => ({
      ...initialState,
      type: "factory", // 覆蓋初始 type
      ...actions(set),
    }),
    {
      name: "factory-quotation-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// 業務報價系統
export const useSalesQuotationSlice = create(
  persist(
    (set) => ({
      ...initialState,
      type: "sales", // 覆蓋初始 type
      ...actions(set),
    }),
    {
      name: "sales-quotation-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
