import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  calculateAllCosts,
  calculateTotalCost,
  calculateProfit,
} from "./useProcessComputations";

const initialState = {
  quotationInfo: {
    id: null,
    quotationSN: "",
    createDate: "",
    customerName: "",
    productName: "",
    overheadRnd: 0,
    profit: 0,
    risk: 0,
    annualDiscount: 0,
    rebate: 0,
    actualQuotation: 0,
  },
  processes: [],
  shippingCosts: {
    SQFreights: [],
    SQCustomsDuties: [],
  },
  calculations: null,
};

// 数据适配器 - 将API数据转换为计算函数所需格式
const processAdapter = {
  convertProcess: (process) => {
    // 基础数据结构
    const baseData = {
      id: process.id,
      preInspectionLossRate:
        process.SQMaterialCostSetting?.estimatedMaterialFluctuation || 0,
      preInspectionRate:
        process.SQMaterialCostSetting?.estimatedDefectRate || 0,
      inspectionFee: process.SQMaterialCostSetting?.extractionCost || 0,
      todoItems_原物料成本:
        process.SQMaterialCosts?.map((m) => ({
          unitPrice: m.unitPrice,
          weight: m.weight,
          unit: m.unit,
        })) || [],
      todoItems_包裝材料費:
        process.SQPackagingCosts?.map((p) => ({
          materialType: p.packagingType,
          unitPrice: p.unitPrice,
          quantity: p.quantity,
          capacity: p.capacity,
          unit: p.unit,
        })) || [],
    };

    // 根据不同制程类型添加特定数据
    switch (process.processCategory) {
      case "In-IJ(廠內成型)":
        return {
          ...baseData,
          processCategory: "FACTORY_INTERNAL_SHAPING",
          defectRate: process.SQInjectionMoldingCosts?.[0]?.defectiveRate || 0,
          moldingCycle: process.SQInjectionMoldingCosts?.[0]?.cycleTime || 0,
          shallowPackageTime:
            process.SQInjectionMoldingCosts?.[0]?.packageTime || 0,
          holeCount: process.SQInjectionMoldingCosts?.[0]?.moldCavity || 0,
          workHourRatio:
            process.SQInjectionMoldingCosts?.[0]?.workHoursRatio || 0,
          unitPrice: process.SQInjectionMoldingCosts?.[0]?.unitPrice || 0,
        };

      case "Out-IJ(委外成型)":
        return {
          ...baseData,
          processCategory: "OUTSOURCED_SHAPING",
          unitPrice: process.SQOutPostProcessingCosts?.[0]?.unitPrice || 0,
        };

      case "In-BE(廠內後製程)":
        return {
          ...baseData,
          processCategory: "FACTORY_INTERNAL_FINISHING",
          workHours: process.SQInPostProcessingCosts?.[0]?.workSecond || 0,
          unitPrice: process.SQInPostProcessingCosts?.[0]?.unitPrice || 0,
        };

      case "Out-BE(委外後製程)":
        return {
          ...baseData,
          processCategory: "OUTSOURCED_FINISHING",
          unitPrice: process.SQOutPostProcessingCosts?.[0]?.unitPrice || 0,
        };

      case "In-TS(廠內出貨檢驗)":
        return {
          ...baseData,
          processCategory: "FACTORY_INTERNAL_SHIPPING_INSPECTION",
          unitPrice: process.SQInPostProcessingCosts?.[0]?.unitPrice || 0,
        };

      default:
        return baseData;
    }
  },

  // 适配运输成本数据
  convertShippingCosts: (shippingCosts) => ({
    processCategory: "TRANSPORTATION",
    todoItems_運輸費用:
      shippingCosts.SQFreights?.map((f) => ({
        distance: f.deliveryDistance,
        oilPrice: f.fuelCostPerKM,
        shipmentQuantity: f.estimatedShipment,
      })) || [],
    todoItems_貨運與關稅:
      shippingCosts.SQCustomsDuties?.map((c) => ({
        freightCost: c.freight,
        estimatedShipment: c.estimatedShipment,
      })) || [],
  }),
};

export const useQuotationStore = create(
  devtools(
    (set, get) => ({
      ...initialState,

      // 导入并计算
      importQuotation: (data) => {
        // 1. 设置基本数据
        set({
          quotationInfo: {
            id: data.id,
            quotationSN: data.quotationSN,
            createDate: data.createDate,
            customerName: data.customerName,
            productName: data.productName,
            overheadRnd: data.overheadRnd,
            profit: data.profit,
            risk: data.risk,
            annualDiscount: data.annualDiscount,
            rebate: data.rebate,
            actualQuotation: data.actualQuotation,
          },
          processes: data.processes || [],
          shippingCosts: data.shippingCosts || {
            SQFreights: [],
            SQCustomsDuties: [],
          },
        });

        // 2. 转换数据并计算
        get().calculateAll();
      },

      // 计算所有成本
      calculateAll: () => {
        const { processes, shippingCosts, quotationInfo } = get();

        // 转换制程数据
        const adaptedProcesses = processes.map((process) => ({
          processCategory: process.processCategory,
          data: processAdapter.convertProcess(process),
        }));

        // 添加运输成本数据
        if (
          shippingCosts.SQFreights?.length ||
          shippingCosts.SQCustomsDuties?.length
        ) {
          adaptedProcesses.push({
            processCategory: "TRANSPORTATION",
            data: processAdapter.convertShippingCosts(shippingCosts),
          });
        }

        // 准备利润数据
        const profitData = {
          sgAndAdminPercentage: quotationInfo.overheadRnd,
          profitPercentage: quotationInfo.profit,
          riskPercentage: quotationInfo.risk,
          annualReductionPercentage: quotationInfo.annualDiscount,
          rebatePercentage: quotationInfo.rebate,
          actualQuotation: quotationInfo.actualQuotation,
        };

        // 计算所有成本
        const calculationResult = calculateAllCosts(
          adaptedProcesses,
          profitData
        );

        // 更新计算结果
        set({ calculations: calculationResult });
      },

      // 获取计算结果
      getCalculations: () => get().calculations,
    }),
    {
      name: "quotation-store",
    }
  )
);
