/* eslint-disable no-undef */
/**
 * quotationStore.js
 * Zustand store 專注於本地狀態管理
 */

import {
  calculateInHouseMoldingCost,
  calculateOutsourcedMoldingCost,
  calculateInHousePostProcessingCost,
  calculateInHouseShippingInspectionCost,
  calculateTransportationCost,
  calculateProfitManagement,
} from "./useProcessComputations_v1";

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
    // 製程成本
    costSubtotal: 0,
    // 管理費用
    sgAndAdminFee: 0,
    // 利潤
    profitFee: 0,
    // 總成本
    subtotalWithSGA: 0,
    // 風險費用
    riskFee: 0,
    // 總成本
    totalCost: 0,
    // 年度折扣
    annualReductionAmount: 0,
    // 折扣
    rebateAmount: 0,
    // 毛利率
    grossProfitMargin: 0,
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
    set((state) => {
      const currentState = get();
      const newTotalCost = currentState.calculationResults.costSubtotal;

      const profitResult = calculateProfitManagement(
        newTotalCost,
        profitData.overheadRnd,
        profitData.profit,
        profitData.risk,
        profitData.annualDiscount,
        profitData.rebate,
        profitData.actualQuotation
      );
      return {
        overheadRnd: profitData.overheadRnd,
        profit: profitData.profit,
        risk: profitData.risk,
        annualDiscount: profitData.annualDiscount,
        rebate: profitData.rebate,
        actualQuotation: profitData.actualQuotation,
        calculationResults: {
          ...profitResult,
        },
      };
    }),

  // 重置功能
  resetAll: () => set(initialState),

  // 重置計算結果
  resetCalculations: () =>
    set((state) => ({
      calculationResults: {
        costSubtotal: 0,
        sgAndAdminFee: 0,
        profitFee: 0,
        subtotalWithSGA: 0,
        riskFee: 0,
        totalCost: 0,
        annualReductionAmount: 0,
        rebateAmount: 0,
        grossProfitMargin: 0,
      },
    })),

  // 1. 基礎成本計算
  calculateBaseCosts: () => {
    const { processes } = get();
    if (!processes?.length) return { totalCostSubtotal: 0, costDetails: [] };

    // 計算各製程成本
    const costDetails = processes.map((process) => {
      let result;
      switch (process.processCategory) {
        case "In-IJ(廠內成型)":
          result = calculateInHouseMoldingCost(process);
          break;
        case "Out-IJ(委外成型)":
        case "Out-BE(委外後製程)":
          result = calculateOutsourcedMoldingCost(process);
          break;
        case "In-BE(廠內後製程)":
          result = calculateInHousePostProcessingCost(process);
          break;
        case "In-TS(廠內出貨檢驗)":
          result = calculateInHouseShippingInspectionCost(process);
          break;
        default:
          throw new Error(`未知的製程類別: ${process.processCategory}`);
      }

      return {
        id: process.id,
        processCategory: process.processCategory,
        costSubtotal: result.totalCost || 0,
        costDetails: result.details,
      };
    });

    const processTotal = costDetails.reduce(
      (sum, detail) => sum + detail.costSubtotal,
      0
    );
    return { processTotal, costDetails };
  },

  // 2. 運輸成本計算
  calculateTransportation: () => {
    const { shippingCosts } = get();
    return calculateTransportationCost(shippingCosts);
  },

  // 3. 總成本計算（不含利潤）
  calculateAll: () => {
    const baseCosts = get().calculateBaseCosts();
    const transportCosts = get().calculateTransportation();
    const totalCost = baseCosts.processTotal + transportCosts.totalCost;

    // 更新 store
    set({
      calculationResults: {
        ...get().calculationResults,
        costSubtotal: totalCost,
      },
    });

    return {
      costSubtotal: totalCost,
      costDetails: baseCosts.costDetails,
      transportationCost: transportCosts,
    };
  },

  // 4. 利潤計算
  calculateProfit: () => {
    const {
      calculationResults,
      overheadRnd,
      profit,
      risk,
      annualDiscount,
      rebate,
      actualQuotation,
    } = get();

    // if parameter is 0, don't calculate
    if (
      overheadRnd === 0 ||
      profit === 0 ||
      risk === 0 ||
      annualDiscount === 0 ||
      rebate === 0 ||
      actualQuotation === 0
    ) {
      return;
    }

    const profitResult = calculateProfitManagement(
      +calculationResults.costSubtotal,
      +overheadRnd,
      +profit,
      +risk,
      +annualDiscount,
      +rebate,
      +actualQuotation
    );

    console.log("🚀 ~ useQuotationStore ~ profitResult:", profitResult);

    set({ calculationResults: profitResult });
    return profitResult;
  },

  // ! 更新利潤管理
  setAllProfileManagement: (profileData) =>
    set((state) => {
      const currentState = get();
      // newTotalCost 計算利潤管理會用到
      const newTotalCost = currentState.calculationResults.costSubtotal;
      const profitResult = calculateProfitManagement(
        newTotalCost,
        profileData.overheadRnd,
        profileData.profit,
        profileData.risk,
        profileData.annualDiscount,
        profileData.rebate,
        profileData.actualQuotation
      );

      return {
        overheadRnd: profileData.overheadRnd,
        profit: profileData.profit,
        risk: profileData.risk,
        annualDiscount: profileData.annualDiscount,
        rebate: profileData.rebate,
        actualQuotation: profileData.actualQuotation ?? 0,
        calculationResults: {
          ...profitResult,
        },
      };
    }),
});
