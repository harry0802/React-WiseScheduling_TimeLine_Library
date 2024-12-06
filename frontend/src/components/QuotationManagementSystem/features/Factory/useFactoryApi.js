// 工廠報價管理系統 API
import { useGetQuotationByIdQuery } from "../../services/factoryServices/endpoints/quotationApi";
import { useUpdateQuotationMutation } from "../../services/factoryServices/endpoints/quotationApi";

export const useFactoryApi = (productId) => {
  const { data: quotationData, isSuccess: isSuccessQuotation } =
    useGetQuotationByIdQuery(productId, { skip: !productId });

  const [updateQuotation] = useUpdateQuotationMutation();

  const handleUpdateQuotation = (data) => {
    console.log("data", data);
    return updateQuotation({
      id: productId,
      ...data,
    });
  };

  return {
    quotationData,
    isSuccessQuotation,
    handleUpdateQuotation,
  };
};
