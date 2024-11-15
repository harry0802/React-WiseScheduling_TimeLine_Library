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

export const useBusinessQuotationStore = create(
  persist(
    (set, get) => ({
      ...businessInitialState,
      ...actions(set, get),
    }),
    {
      name: "businessQuotationStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useInternalQuotationStore = create(
  persist(
    (set, get) => ({
      ...internalInitialState,
      ...actions(set, get),
    }),
    {
      name: "internalQuotationStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
