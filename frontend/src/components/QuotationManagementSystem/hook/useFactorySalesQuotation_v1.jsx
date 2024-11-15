/* eslint-disable no-undef */
/**
 * quotationStore.js
 * Zustand store 專注於本地狀態管理
 */
import * as calculations from "./useProcessComputations_v1";

export const initialState = {
  // API 狀態
  status: {
    isLoading: false,
    error: null,
  },

  // 報價單基本資料
  id: null,
  quotationSN: "",
  createDate: null,
  customerName: "",
  productName: "",

  // 利潤管理相關
  overheadRnd: 0,
  profit: 0,
  risk: 0,
  annualDiscount: 0,
  rebate: 0,
  actualQuotation: 0,

  // 製程資料
  processes: [],

  // 運輸成本
  shippingCosts: {
    SQFreights: [],
    SQCustomsDuties: [],
  },

  // 成本計算結果
  calculationResults: {
    subtotal: 0,
    shippingTotal: 0,
    totalBeforeOverhead: 0,
    overheadCost: 0,
    totalCost: 0,
  },
};

export const useQuotationStore = (set, get) => ({
  // 狀態控制
  setLoading: (isLoading) =>
    set((state) => ({
      status: { ...state.status, isLoading },
    })),

  setError: (error) =>
    set((state) => ({
      status: { ...state.status, error },
    })),

  // 整體 store 更新
  updateStore: (data) => set(data),

  // 製程操作
  updateProcess: (processId, updateData) =>
    set((state) => ({
      processes: state.processes.map((process) =>
        process.id === processId ? { ...process, ...updateData } : process
      ),
    })),

  addProcess: (process) =>
    set((state) => ({
      processes: [...state.processes, process],
    })),

  removeProcess: (processId) =>
    set((state) => ({
      processes: state.processes.filter((p) => p.id !== processId),
    })),

  // 運輸成本
  updateShippingCosts: (shippingData) => set({ shippingCosts: shippingData }),

  // 利潤管理
  updateProfitManagement: (profitData) =>
    set((state) => ({
      overheadRnd: profitData.overheadRnd ?? state.overheadRnd,
      profit: profitData.profit ?? state.profit,
      risk: profitData.risk ?? state.risk,
      annualDiscount: profitData.annualDiscount ?? state.annualDiscount,
      rebate: profitData.rebate ?? state.rebate,
      actualQuotation: profitData.actualQuotation ?? state.actualQuotation,
    })),

  // 重置功能
  resetAll: () => set(initialState),

  resetCalculations: () =>
    set((state) => ({
      calculationResults: {
        subtotal: 0,
        shippingTotal: 0,
        totalBeforeOverhead: 0,
        overheadCost: 0,
        totalCost: 0,
      },
    })),

  // 新增計算相關方法
  calculations: {
    computeProcessCosts: () => {
      const { processes, shippingCosts } = get();

      if (!processes?.length) return { totalCostSubtotal: 0, costDetails: [] };

      const costDetails = processes.map((process) => {
        const calculators = {
          "In-IJ(廠內成型)": calculations.calculateInHouseMoldingCost,
          "Out-IJ(委外成型)": calculations.calculateOutsourcedMoldingCost,
          "In-BE(廠內後製程)": calculations.calculateInHousePostProcessingCost,
          "Out-BE(委外後製程)": calculations.calculateOutsourcedMoldingCost,
          "In-TS(廠內出貨檢驗)":
            calculations.calculateInHouseShippingInspectionCost,
        };

        const calculator = calculators[process.processCategory];
        if (!calculator)
          throw new Error(`未知的製程類別: ${process.processCategory}`);

        const result = calculator(process);

        return {
          id: process.id,
          processCategory: process.processCategory,
          costSubtotal: result.totalCost || 0,
          costDetails: result.details,
        };
      });

      if (
        shippingCosts?.SQFreights?.length ||
        shippingCosts?.SQCustomsDuties?.length
      ) {
        const transportResult =
          calculations.calculateTransportationCost(shippingCosts);
        costDetails.push({
          id: "transportation",
          processCategory: "Transportation",
          costSubtotal: transportResult.totalCost || 0,
          costDetails: transportResult.details,
        });
      }

      return {
        totalCostSubtotal: costDetails.reduce(
          (sum, detail) => sum + detail.costSubtotal,
          0
        ),
        costDetails,
      };
    },

    calculateAll: () => {
      const state = get();
      const { overheadRnd } = state;
      const { totalCostSubtotal, costDetails } =
        state.calculations.computeProcessCosts();

      const results = {
        subtotal: totalCostSubtotal,
        shippingTotal:
          costDetails.find((d) => d.id === "transportation")?.costSubtotal || 0,
        totalBeforeOverhead: totalCostSubtotal,
        overheadCost: totalCostSubtotal * overheadRnd,
        totalCost: totalCostSubtotal * (1 + overheadRnd),
        costDetails,
      };

      set({ calculationResults: results });
      return results;
    },
  },
});
