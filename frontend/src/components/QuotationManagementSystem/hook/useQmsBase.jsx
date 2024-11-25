import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBusinessQuotationStore } from "../slice/useFactorySalesQuotationSlice_v1";
import { useGetQuotationByIdQuery } from "../services/endpoints/quotationApi";
import { useSalesHomeSlice } from "../slice/qmsHome";

export const useQmsBase = (mode = "create") => {
  const {
    calculationResults,
    addProcess,
    updateProfitManagement,
    resetAll,
    calculateAll,
    calculateProfit,
    updateStore,
    actualQuotation,
  } = useBusinessQuotationStore();

  const { data, type } = useSalesHomeSlice();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({});

  const { data: quotationData, isSuccess: isSuccessQuotation } =
    useGetQuotationByIdQuery(productId, { skip: !productId });

  const handleUpdate = useCallback((formData) => {
    setProductData((prev) => ({
      ...prev,
      ...formData,
      customerName:
        formData.customerName && typeof formData.customerName === "object"
          ? formData.customerName.label
          : formData.customerName,
    }));
  }, []);

  // 監聽產品ID變化
  useEffect(() => {
    if (data === null || !productId) {
      type === "sales"
        ? navigate("/SalesQuotationManagementSystem")
        : navigate("/FactoryQuotationManagementSystem");
    } else {
      const [product] = data?.filter((item) => item.id === productId) || [];
      if (product) {
        setProductData(product);
      }
    }
  }, [productId, data, navigate, type]);

  const fetchData = useCallback(async () => {
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
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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

  useEffect(() => {
    if (!isSuccessQuotation) return;
    setLoading(true);
    fetchData();
  }, [fetchData, isSuccessQuotation]);

  const commonProps = useMemo(
    () => ({
      costAndQuotation: { ...calculationResults, actualQuotation },
      totalCostnoMarketing: calculationResults.costSubtotal,
      setCostAndQuotation: updateProfitManagement,
      BusinessQuotationStore: useBusinessQuotationStore,
      productData,
      handleUpdate,
    }),
    [
      calculationResults,
      actualQuotation,
      updateProfitManagement,
      productData,
      handleUpdate,
    ]
  );

  return {
    ...commonProps,
    loading,
    mode,
  };
};
