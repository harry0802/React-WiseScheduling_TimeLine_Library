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
    set((state) => {
      console.log("🔥🔥🔥🔥 ~ set ~ updateData:", updateData);

      console.log(
        "🔥🔥🔥🔥 ~ set ~ processes:",
        state.processes.map((process) =>
          process.id === processId ? { ...process, ...updateData } : process
        )
      );

      return {
        processes: state.processes.map((process) =>
          process.id === processId ? { ...process, ...updateData } : process
        ),
      };
    }),

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
    if (!Array.isArray(processes) || processes.length === 0) {
      return { processTotal: 0, costDetails: [] };
    }

    const costDetails = processes.map((process) => {
      if (!process || !process.processCategory) {
        return {
          id: process?.id || "unknown",
          processCategory: "unknown",
          costSubtotal: 0,
          costDetails: [],
        };
      }

      let result;
      try {
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
            console.warn(`未知的製程類別: ${process.processCategory}`);
            result = { totalCost: 0, details: [] };
        }
      } catch (error) {
        console.error(`計算製程成本時發生錯誤:`, error);
        result = { totalCost: 0, details: [] };
      }

      return {
        id: process.id || "unknown",
        processCategory: process.processCategory,
        costSubtotal: Number(result.totalCost) || 0,
        costDetails: result.details || [],
      };
    });

    const processTotal = costDetails.reduce(
      (sum, detail) => sum + (Number(detail.costSubtotal) || 0),
      0
    );
    return { processTotal, costDetails };
  },

  // 2. 運輸成本計算
  calculateTransportation: () => {
    const { shippingCosts } = get();
    if (
      !shippingCosts ||
      (!Array.isArray(shippingCosts.SQFreights) &&
        !Array.isArray(shippingCosts.SQCustomsDuties))
    ) {
      return {
        costSubtotal: 0,
        costDetails: [],
      };
    }

    try {
      const result = calculateTransportationCost(shippingCosts);
      return {
        costSubtotal: Number(result.totalCost) || 0,
        costDetails: result.details || [],
      };
    } catch (error) {
      console.error("計算運輸成本時發生錯誤:", error);
      return {
        costSubtotal: 0,
        costDetails: [],
      };
    }
  },

  // 3. 總成本計算（不含利潤）
  calculateAll: () => {
    const baseCosts = get().calculateBaseCosts();
    const transportCosts = get().calculateTransportation();
    const totalCost = baseCosts.processTotal + transportCosts.costSubtotal;

    // 更新 store
    set((state) => ({
      calculationResults: {
        ...state.calculationResults,
        costSubtotal: totalCost,
        transportationCost: transportCosts,
      },
    }));

    return {
      costSubtotal: totalCost,
      costDetails: baseCosts.costDetails,
      transportationCost: transportCosts,
    };
  },

  // 4. 利潤計算
  calculateProfit: () => {
    const state = get();
    const requiredFields = {
      overheadRnd: Number(state.overheadRnd),
      profit: Number(state.profit),
      risk: Number(state.risk),
      annualDiscount: Number(state.annualDiscount),
      rebate: Number(state.rebate),
      actualQuotation: Number(state.actualQuotation),
      costSubtotal: Number(state.calculationResults?.costSubtotal),
    };

    // 檢查所有必要欄位是否為有效數字
    if (Object.values(requiredFields).some(isNaN)) {
      console.warn("利潤計算所需的欄位包含無效數值");
      return state.calculationResults;
    }

    try {
      const profitResult = calculateProfitManagement(
        requiredFields.costSubtotal,
        requiredFields.overheadRnd,
        requiredFields.profit,
        requiredFields.risk,
        requiredFields.annualDiscount,
        requiredFields.rebate,
        requiredFields.actualQuotation
      );

      set({ calculationResults: profitResult });
      return profitResult;
    } catch (error) {
      console.error("計算利潤時發生錯誤:", error);
      return state.calculationResults;
    }
  },

  // 只計算運輸成本
  calculateTransportationOnly: () => {
    const transportCosts = get().calculateTransportation();
    // 更新 store 中的運輸成本
    set((state) => ({
      calculationResults: {
        ...state.calculationResults,
        transportationCost: transportCosts,
      },
    }));

    return {
      costSubtotal: transportCosts.costSubtotal,
      transportationCost: transportCosts,
    };
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

  updateBasicInfo: (basicInfo) =>
    set((state) => ({
      id: basicInfo.id ?? state.id,
      quotationSN: basicInfo.productNumber ?? state.quotationSN,
      createDate: basicInfo.createDate ?? state.createDate,
      customerName: basicInfo.customerName?.value ?? state.customerName?.value,
      productName: basicInfo.productName ?? state.productName,
    })),
});
