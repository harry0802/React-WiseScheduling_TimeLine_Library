import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBusinessQuotationStore } from "../slice/useFactorySalesQuotationSlice_v1";
import {
  useGetQuotationByIdQuery,
  useUpdateQuotationMutation,
} from "../services/salesServices/endpoints/quotationApi";
import { useSalesHomeSlice } from "../slice/qmsHome";

export const useQmsBase = (mode = "create") => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Store hooks
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
  } = useBusinessQuotationStore();

  const { data: homeData, type } = useSalesHomeSlice();

  // API hooks
  const [updateQuotation] = useUpdateQuotationMutation();
  const { data: quotationData, isSuccess: isSuccessQuotation } =
    useGetQuotationByIdQuery(productId, { skip: !productId });

  // Navigation logic
  const handleNavigation = useCallback(() => {
    if (homeData === null || !productId) {
      const path =
        type === "sales"
          ? "/SalesQuotationManagementSystem"
          : "/FactoryQuotationManagementSystem";
      navigate(path);
    }
  }, [homeData, productId, type, navigate]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  // Data processing logic
  const processQuotationData = useCallback(async () => {
    if (!quotationData) return;

    try {
      resetAll();
      const { processes, ...restData } = quotationData.data;
      updateStore(restData);

      if (processes) {
        processes.forEach((process) => addProcess(process));
        const results = calculateAll();
        const profitResults = calculateProfit();

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
  ]);

  // Update handling
  // 產品資訊更新
  const handleUpdate = useCallback(
    (formData) => {
      const customerName =
        formData.customerName && typeof formData.customerName === "object"
          ? formData.customerName.label
          : formData.customerName;

      // Update API
      updateQuotation({
        id: productId,
        productName: formData.productName,
        customerName,
      });

      // Update local state
      updateBasicInfo(formData);
    },
    [productId, updateQuotation, updateBasicInfo]
  );

  // 利潤管理更新
  const handleUpdateProfitManagement = useCallback(
    (data) => {
      updateQuotation({
        id: productId,
        ...data,
      });
      updateProfitManagement(data);
    },
    [updateProfitManagement, updateQuotation]
  );

  // Data fetching effect
  useEffect(() => {
    if (!isSuccessQuotation) return;
    setLoading(true);
    processQuotationData();
  }, [isSuccessQuotation, processQuotationData]);

  // Memoized common props
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

  // Return unified props
  return {
    ...commonProps,
    loading,
    mode,
  };
};
