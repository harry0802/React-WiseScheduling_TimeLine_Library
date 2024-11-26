import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import {
  useQuotationStore as actions,
  initialState,
} from "../hook/useFactorySalesQuotation_v1";

const businessInitialState = {
  ...initialState,
  salesPerson: "",
  contactPerson: "",
  validityPeriod: null,
  paymentTerms: "",
};

const internalInitialState = {
  ...initialState,
  department: "",
  requestPerson: "",
};

// 業務報價管理系統
export const useBusinessQuotationStore = create(
  persist(
    (set, get) => ({
      ...businessInitialState,
      type: "sales",
      ...actions(set, get),
    }),
    {
      name: "businessQuotationStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

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
      storage: createJSONStorage(() => localStorage),
    }
  )
);
