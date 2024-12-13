//! =============== 1. 引入相依套件 ===============
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBusinessQuotationStore } from "../slice/useFactorySalesQuotationSlice_v1";

/**
 * @typedef {Object} QMSBaseResult
 * @property {Object} costAndQuotation - 成本和報價資訊
 * @property {number} totalCostnoMarketing - 不含行銷的總成本
 * @property {Function} setCostAndQuotation - 更新成本和報價的函數
 * @property {Object} BusinessQuotationStore - 報價store
 * @property {Function} handleUpdate - 處理更新的函數
 * @property {Function} handleUpdateProfitManagement - 處理利潤管理更新的函數
 * @property {boolean} loading - 載入狀態
 * @property {string} mode - 模式（create/edit）
 */

/**
 * QMS 基礎邏輯 Hook
 * @param {string} [mode="create"] - 操作模式
 * @returns {QMSBaseResult} QMS 操作相關的狀態和方法
 */
export const useQmsBase = (
  mode = "create",
  processStore,
  homeStore,
  useQmsApi
) => {
  //! =============== 2. 狀態與 Hooks 初始化 ===============
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //* Store hooks
  const {
    calculationResults,
    addProcess,
    updateProfitManagement,
    resetAll,
    calculateAll,
    calculateProfit,
    updateStore,
    actualQuotation,
    updateBasicInfo,
    calculateTransportationOnly,
  } = processStore();

  const { type } = homeStore();

  const { quotationData, isSuccessQuotation, handleUpdateQuotation } =
    useQmsApi(productId);

  //! =============== 3. 導航邏輯 ===============
  /**
   * 處理導航邏輯
   * 當無首頁數據或產品ID時導航到對應頁面
   */
  const handleNavigation = useCallback(() => {
    if (!productId) {
      const path =
        type === "sales"
          ? "/SalesQuotationManagementSystem"
          : "/FactoryQuotationManagementSystem";
      navigate(path);
    }
  }, [productId, type, navigate]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  //! =============== 4. 數據處理邏輯 ===============
  /**
   * 處理報價數據
   * 包含重置、更新store、計算結果等操作
   */
  const processQuotationData = useCallback(async () => {
    if (!quotationData) return;

    try {
      resetAll();
      const { processes, ...restData } = quotationData.data;
      updateStore(restData);

      if (processes) {
        //* 處理製程數據
        processes.forEach((process) => addProcess(process));
        const results = calculateAll();
        const profitResults = calculateProfit();

        //* 更新計算結果
        updateStore({
          ...restData,
          calculationResults: {
            ...results,
            ...profitResults,
          },
        });
      } else {
        calculateTransportationOnly();
      }
    } catch (error) {
      console.error("Error processing quotation data:", error);
    } finally {
      setLoading(false);
    }
  }, [
    quotationData,
    resetAll,
    updateStore,
    addProcess,
    calculateAll,
    calculateProfit,
    calculateTransportationOnly,
  ]);

  //! =============== 5. 更新處理邏輯 ===============
  /**
   * 處理產品資訊更新
   * @param {Object} formData - 表單數據
   */
  const handleUpdate = useCallback(
    (formData) => {
      const customerName =
        formData.customerName && typeof formData.customerName === "object"
          ? formData.customerName.label
          : formData.customerName;

      handleUpdateQuotation({
        productName: formData.productName,
        customerName,
      });

      updateBasicInfo(formData);
    },
    [productId, handleUpdateQuotation, updateBasicInfo]
  );

  /**
   * 處理利潤管理更新
   * @param {Object} data - 利潤管理數據
   */
  const handleUpdateProfitManagement = useCallback(
    (data) => {
      handleUpdateQuotation(data);
      updateProfitManagement(data);
    },
    [handleUpdateQuotation, updateProfitManagement]
  );

  //! =============== 6. 效果處理 ===============
  //* 數據獲取效果
  useEffect(() => {
    if (!isSuccessQuotation) return;
    setLoading(true);
    processQuotationData();
  }, [isSuccessQuotation, processQuotationData]);

  //! =============== 7. 返回值組裝 ===============
  //* 共用屬性記憶化
  const commonProps = useMemo(
    () => ({
      costAndQuotation: { ...calculationResults, actualQuotation },
      totalCostnoMarketing: calculationResults.costSubtotal,
      setCostAndQuotation: updateProfitManagement,
      BusinessQuotationStore: useBusinessQuotationStore,
      handleUpdate,
      handleUpdateProfitManagement,
    }),
    [
      calculationResults,
      actualQuotation,
      updateProfitManagement,
      handleUpdate,
      handleUpdateProfitManagement,
    ]
  );

  return {
    ...commonProps,
    loading,
    mode,
  };
};
