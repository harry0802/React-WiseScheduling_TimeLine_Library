/**
 * baseQuotationStore.js - 基礎報價 store
 */
const DEFAULT_CONFIG = {
  statusConfig: {},
  basicConfig: {},
  profitConfig: {},
  processConfig: {},
  shippingConfig: {},
  calculationConfig: {},
};

const DEFAULT_STATUS = {
  isLoading: false,
  error: null,
};

const DEFAULT_CALCULATION = {
  costSubtotal: 0,
  sgAndAdminFee: 0,
  profitFee: 0,
  subtotalWithSGA: 0,
  riskFee: 0,
  totalCost: 0,
  annualReductionAmount: 0,
  rebateAmount: 0,
  grossProfitMargin: 0,
};

export function createInitialState(config = DEFAULT_CONFIG) {
  const {
    statusConfig,
    basicConfig,
    profitConfig,
    processConfig,
    shippingConfig,
    calculationConfig,
  } = config;

  return {
    status: {
      ...DEFAULT_STATUS,
      ...statusConfig,
    },
    id: null,
    quotationSN: "",
    createDate: null,
    customerName: "",
    productName: "",
    ...basicConfig,

    overheadRnd: 0,
    profit: 0,
    risk: 0,
    annualDiscount: 0,
    rebate: 0,
    actualQuotation: 0,
    ...profitConfig,

    processes: [],
    ...processConfig,

    shippingCosts: {
      freights: [],
      customsDuties: [],
      ...shippingConfig,
    },

    calculationResults: {
      ...DEFAULT_CALCULATION,
      ...calculationConfig,
    },
  };
}

export function createBaseStore({
  calculateInHouseMoldingCost,
  calculateOutsourcedMoldingCost,
  calculateInHousePostProcessingCost,
  calculateInHouseShippingInspectionCost,
  calculateTransportationCost,
  calculateProfitManagement,
  config = {},
}) {
  return function storeCreator(set, get) {
    const baseStore = {
      setLoading: (isLoading) =>
        set((state) => ({
          status: { ...state.status, isLoading },
        })),

      setError: (error) =>
        set((state) => ({
          status: { ...state.status, error },
        })),

      updateStore: (data) => set(data),

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

      updateShippingCosts: (shippingData) =>
        set({ shippingCosts: shippingData }),

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

      resetAll: () => set(createInitialState(config)),

      resetCalculations: () =>
        set((state) => ({
          calculationResults: { ...DEFAULT_CALCULATION },
        })),

      calculateBaseCosts() {
        const { processes } = get();
        if (!Array.isArray(processes) || processes.length === 0) {
          return { processTotal: 0, costDetails: [] };
        }

        const costDetails = processes.map((process) => {
          if (!process?.processCategory) {
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
            console.error("計算製程成本時發生錯誤:", error);
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

      calculateAll() {
        const baseCosts = get().calculateBaseCosts() || {
          processTotal: 0,
          costDetails: [],
        };
        const transportCosts = get().calculateTransportation() || {
          costSubtotal: 0,
          costDetails: [],
        };

        // 確保數值有效
        const processTotal = Number(baseCosts.processTotal) || 0;
        const transportSubtotal = Number(transportCosts.costSubtotal) || 0;
        const totalCost = processTotal + transportSubtotal;

        // 更新 store 時確保有完整的結構
        set((state) => ({
          calculationResults: {
            ...state.calculationResults,
            costSubtotal: totalCost,
            transportationCost: {
              costSubtotal: transportSubtotal,
              costDetails: transportCosts.costDetails || [],
            },
          },
        }));

        return {
          costSubtotal: totalCost,
          costDetails: baseCosts.costDetails || [],
          transportationCost: {
            costSubtotal: transportSubtotal,
            costDetails: transportCosts.costDetails || [],
          },
        };
      },

      calculateTransportationOnly: () => {
        const transportCosts = get().calculateTransportation();

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
    };

    return {
      ...baseStore,
      ...config.extensions?.(set, get, baseStore),
    };
  };
}
