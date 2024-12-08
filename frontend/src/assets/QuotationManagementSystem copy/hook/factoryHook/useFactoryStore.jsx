// salesStore.js
import { create } from "zustand";
import { createBaseStore, createInitialState } from "../baseQuotationStore";
import * as calculations from "./useProcessComputations_v1";

const initialState = createInitialState({
  shippingConfig: {
    freights: "FQFreights",
    customsDuties: "FQCustomsDuties",
  },
});

// 銷售特有擴展
const extensions = (set, get) => ({
  calculateTransportation: () => {
    const { shippingCosts } = get();
    if (
      !shippingCosts ||
      (!Array.isArray(shippingCosts.FQFreights) &&
        !Array.isArray(shippingCosts.FQCustomsDuties))
    ) {
      return {
        costSubtotal: 0,
        costDetails: [],
      };
    }
  },

  // 其他銷售特有方法
});

export const useSalesStore = create((set, get) =>
  createBaseStore({
    ...calculations,
    type: "factory",
    config: {
      initialState,
      extensions,
    },
  })(set, get)
);
