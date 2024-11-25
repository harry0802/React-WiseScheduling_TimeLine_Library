import { useCallback, useEffect, useMemo, useState } from "react";
import { Spin } from "antd";
import { useBusinessQuotationStore } from "../../slice/useFactorySalesQuotationSlice_v1";
import { useGetQuotationByIdQuery } from "../../services/endpoints/quotationApi";
import { useNavigate, useParams } from "react-router-dom";
import { useSalesHomeSlice } from "../../slice/qmsHome";

// TODO 我將使用 slice 去讀取全部的資料 不再使用本地
const QmsBase = ({ mode = "create", children }) => {
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
  // ! 不再使用本地資料 改用 slice 去讀取
  const [productData, setProductData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    data: quotationData,
    isLoading: isLoadingQuotation,
    isSuccess: isSuccessQuotation,
  } = useGetQuotationByIdQuery(productId, {
    skip: !productId,
  });
  // ! 不再使用本地資料 改用 slice 去讀取 使用 slice 的 update 去更新
  const handleUpdate = useCallback((formData) => {
    setProductData((prev) => ({
      ...prev,
      ...formData,
      customerName:
        formData.customerName && typeof formData.customerName === "object"
          ? formData.customerName.label
          : formData.customerName,
    }));
    // 這裡可以添加其他更新邏輯，比如發送API請求
  }, []);

  // 監聽產品ID變化，更新產品數據
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

  // 使用 useMemo 緩存計算結果
  const commonProps = useMemo(
    () => ({
      costAndQuotation: { ...calculationResults, actualQuotation },
      totalCostnoMarketing: calculationResults.costSubtotal,
      setCostAndQuotation: updateProfitManagement,
      BusinessQuotationStore: useBusinessQuotationStore,
    }),
    [calculationResults, actualQuotation, updateProfitManagement]
  );

  // 使用 useCallback 優化異步操作
  const fetchData = useCallback(async () => {
    if (!quotationData) return;

    try {
      resetAll();
      const { processes, ...restData } = quotationData.data;
      updateStore(restData);
      if (!processes) return;
      processes?.forEach((process) => addProcess(process));
      const results = calculateAll();
      const profitResults = calculateProfit();

      updateStore({
        ...restData,
        calculationResults: {
          ...results,
          ...profitResults,
        },
      });
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

  if (loading) return <Spin size="large" />;

  // 把 productData 和 handleUpdate 加入到 commonProps
  const extendedProps = {
    ...commonProps,
    productData,
    handleUpdate,
  };

  return children(extendedProps, mode);
};

export default QmsBase;
