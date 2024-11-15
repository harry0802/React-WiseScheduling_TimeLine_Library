/**
 * useQuotationComputation.js
 * 整合所有報價計算邏輯的 Custom Hook
 * 包含製程成本、運輸成本、利潤管理等計算功能
 */
import { useCallback } from "react";
import {
  calculateMaterialCost, // 計算材料成本
  calculatePackagingCost, // 計算包裝成本
  calculateMoldingCost, // 計算成型成本
  calculateMoldingElectricityCost, // 計算成型電費
  calculatePostProcessingCost, // 計算後製程成本
  calculateAdditionalFees, // 計算額外費用(運輸、關稅)
  calculateProfitManagement, // 計算利潤管理
} from "../utility/ComputationUtilsV1";
import { useQuotationStore } from "./useFactorySalesQuotation_v1";

/**
 * 計算廠內成型成本
 * @param {Object} process - 製程資料
 * @returns {Object} 包含總成本和各項成本明細的物件
 */
export const calculateInHouseMoldingCost = (process) => {
  // 解構必要的成本資料
  const {
    SQMaterialCostSetting, // 材料成本設定
    SQMaterialCosts, // 材料成本項目
    SQPackagingCosts, // 包裝成本項目
    SQInjectionMoldingCosts, // 射出成型成本項目
  } = process;

  // 取得射出成型的第一筆資料
  const moldingData = SQInjectionMoldingCosts[0];

  // 計算材料成本
  const materialCostResult = calculateMaterialCost(
    SQMaterialCosts,
    SQMaterialCostSetting.estimatedDefectRate, // 預估不良率
    SQMaterialCostSetting.estimatedMaterialFluctuation, // 預估物料波動
    SQMaterialCostSetting.processingCost // 加工費用
  );

  // 計算包裝成本
  const packagingCostResult = calculatePackagingCost(SQPackagingCosts);

  // 計算成型成本
  const moldingCostResult = calculateMoldingCost(
    moldingData.defectiveRate, // 不良率
    moldingData.cycleTime, // 週期時間
    moldingData.packageTime, // 包裝時間
    moldingData.moldCavity, // 模具穴數
    moldingData.workHoursRatio // 工時比例
  );

  // 計算成型電費
  const moldingElectricityCost = calculateMoldingElectricityCost(
    moldingData.moldCavity, // 模具穴數
    moldingData.cycleTime // 週期時間
  );

  // 計算總成本並回傳結果
  return {
    totalCost:
      +materialCostResult.totalCost +
      +packagingCostResult.totalCost +
      +moldingCostResult +
      +moldingElectricityCost,
    details: {
      materialCostResult, // 材料成本明細
      packagingCostResult, // 包裝成本明細
      moldingCostResult, // 成型成本
      moldingElectricityCost, // 電費成本
    },
  };
};

/**
 * 計算委外成型成本
 * @param {Object} process - 製程資料
 * @returns {Object} 包含總成本和各項成本明細的物件
 */
export const calculateOutsourcedMoldingCost = (process) => {
  // 解構必要的成本資料
  const {
    SQMaterialCostSetting,
    SQMaterialCosts,
    SQPackagingCosts,
    SQOutPostProcessingCosts, // 委外加工成本
  } = process;

  // 計算材料成本
  const materialCostResult = calculateMaterialCost(
    SQMaterialCosts,
    SQMaterialCostSetting.estimatedDefectRate,
    SQMaterialCostSetting.estimatedMaterialFluctuation,
    SQMaterialCostSetting.processingCost
  );

  // 計算包裝成本
  const packagingCostResult = calculatePackagingCost(SQPackagingCosts);

  // 取得委外加工費用
  const postProcessingCostResult = SQOutPostProcessingCosts[0].amount;

  return {
    totalCost:
      +materialCostResult.totalCost +
      +packagingCostResult.totalCost +
      +postProcessingCostResult,
    details: {
      materialCostResult,
      packagingCostResult,
      postProcessingCostResult,
    },
  };
};

/**
 * 計算廠內後製程成本
 * @param {Object} process - 製程資料
 * @returns {Object} 包含總成本和各項成本明細的物件
 */
export const calculateInHousePostProcessingCost = (process) => {
  // 解構必要的成本資料
  const {
    SQMaterialCostSetting,
    SQMaterialCosts,
    SQPackagingCosts,
    SQInPostProcessingCosts, // 廠內後製程成本
  } = process;

  // 計算材料成本
  const materialCostResult = calculateMaterialCost(
    SQMaterialCosts,
    SQMaterialCostSetting.estimatedDefectRate,
    SQMaterialCostSetting.estimatedMaterialFluctuation,
    SQMaterialCostSetting.processingCost
  );

  // 計算包裝成本
  const packagingCostResult = calculatePackagingCost(SQPackagingCosts);

  // 計算後製程成本
  const postProcessingData = SQInPostProcessingCosts[0];
  const postProcessingCostResult = calculatePostProcessingCost(
    postProcessingData.workSecond, // 工作秒數
    postProcessingData.unitPrice // 單價
  );

  return {
    totalCost:
      +materialCostResult.totalCost +
      +packagingCostResult.totalCost +
      +postProcessingCostResult,
    details: {
      materialCostResult,
      packagingCostResult,
      postProcessingCostResult,
    },
  };
};

/**
 * 計算廠內出貨檢驗成本
 * @param {Object} process - 製程資料
 * @returns {Object} 包含總成本和檢驗成本明細的物件
 */
export const calculateInHouseShippingInspectionCost = (process) => {
  const { SQInPostProcessingCosts } = process;
  const postProcessingCostResult = SQInPostProcessingCosts[0].amount;

  return {
    totalCost: postProcessingCostResult,
    details: {
      postProcessingCostResult,
    },
  };
};

/**
 * 計算運輸成本
 * @param {Object} shippingCosts - 運輸成本資料
 * @returns {Object} 包含總成本和運輸成本明細的物件
 */
export const calculateTransportationCost = (shippingCosts) => {
  const { SQFreights, SQCustomsDuties } = shippingCosts;
  const costResult = calculateAdditionalFees(SQFreights, SQCustomsDuties);

  return {
    totalCost: costResult.totalCost,
    details: costResult,
  };
};

/**
 * 報價計算 Custom Hook
 * 整合所有計算邏輯，提供完整的報價計算功能
 */
export const useQuotationComputation = () => {
  // 從 Zustand store 獲取所需的資料和更新方法
  const {
    processes, // 製程資料
    shippingCosts, // 運輸成本
    overheadRnd, // 管銷研發費用
    profit, // 利潤
    risk, // 風險
    annualDiscount, // 年降
    rebate, // 回饋
    actualQuotation, // 實際報價
    updateCalculationResults, // 更新計算結果的方法
  } = useQuotationStore();

  /**
   * 計算所有製程成本
   * @param {Array} processes - 製程資料陣列
   * @param {Object} shippingCosts - 運輸成本資料
   * @returns {Object} 包含總成本和各製程成本明細的物件
   */
  const computeProcessCosts = useCallback((processes, shippingCosts) => {
    // 如果沒有製程資料，返回預設值
    if (!processes?.length) {
      return {
        totalCostSubtotal: 0,
        costDetails: [],
      };
    }

    // 計算每個製程的成本
    const costDetails = processes.map((process) => {
      let costSubtotalResult;

      // 根據製程類別選擇對應的計算方法
      switch (process.processCategory) {
        case "In-IJ(廠內成型)":
          costSubtotalResult = calculateInHouseMoldingCost(process);
          break;
        case "Out-IJ(委外成型)":
          costSubtotalResult = calculateOutsourcedMoldingCost(process);
          break;
        case "In-BE(廠內後製程)":
          costSubtotalResult = calculateInHousePostProcessingCost(process);
          break;
        case "Out-BE(委外後製程)":
          costSubtotalResult = calculateOutsourcedMoldingCost(process);
          break;
        case "In-TS(廠內出貨檢驗)":
          costSubtotalResult = calculateInHouseShippingInspectionCost(process);
          break;
        default:
          throw new Error(`未知的制程類別: ${process.processCategory}`);
      }

      return {
        id: process.id,
        processCategory: process.processCategory,
        costSubtotal: costSubtotalResult.totalCost || 0,
        costSubtotalResult,
      };
    });

    // 如果有運輸成本，加入計算
    if (shippingCosts) {
      const transportationCostResult =
        calculateTransportationCost(shippingCosts);
      costDetails.push({
        id: "transportation",
        processCategory: "Transportation",
        costSubtotal: transportationCostResult.totalCost || 0,
        costSubtotalResult: transportationCostResult,
      });
    }

    // 計算總成本
    const totalCostSubtotal = costDetails.reduce(
      (sum, detail) => sum + detail.costSubtotal,
      0
    );

    return { totalCostSubtotal, costDetails };
  }, []);

  /**
   * 計算利潤管理相關數據
   * @param {number} totalCostSubtotal - 總成本
   * @returns {Object} 利潤管理計算結果
   */
  const computeProfitManagement = useCallback(
    (totalCostSubtotal) => {
      return calculateProfitManagement(
        totalCostSubtotal,
        overheadRnd, // 管銷研發費用
        profit, // 利潤
        risk, // 風險
        annualDiscount, // 年降
        rebate, // 回饋
        actualQuotation // 實際報價
      );
    },
    [overheadRnd, profit, risk, annualDiscount, rebate, actualQuotation]
  );

  /**
   * 計算所有成本並更新結果
   * 包括製程成本、運輸成本、管銷成本等
   * @returns {Object} 完整的成本計算結果
   */
  const calculateAll = useCallback(() => {
    // 計算製程和運輸成本
    const { totalCostSubtotal, costDetails } = computeProcessCosts(
      processes,
      shippingCosts
    );
    // 計算利潤管理
    const profitManagementResult = computeProfitManagement(totalCostSubtotal);

    // 整理最終結果
    const results = {
      subtotal: totalCostSubtotal,
      shippingTotal:
        costDetails.find((d) => d.id === "transportation")?.costSubtotal || 0,
      totalBeforeOverhead: totalCostSubtotal,
      overheadCost: totalCostSubtotal * overheadRnd,
      totalCost: totalCostSubtotal * (1 + overheadRnd),
      costDetails,
      profitManagementResult,
    };
    console.log("🚀 ~ calculateAll ~ results:", results);

    // 更新計算結果到 store
    updateCalculationResults(results);
    return results;
  }, [
    processes,
    shippingCosts,
    computeProcessCosts,
    computeProfitManagement,
    updateCalculationResults,
    overheadRnd,
  ]);

  // 返回計算方法供外部使用
  return {
    calculateAll, // 計算所有成本
    computeProcessCosts, // 計算製程成本
    computeProfitManagement, // 計算利潤管理
  };
};
