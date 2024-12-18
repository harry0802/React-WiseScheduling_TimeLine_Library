import {
  useGetQuotationByIdQuery,
  useUpdateQuotationMutation,
} from "../../services/salesServices/endpoints/quotationApi";

export const useQmsApi = (productId) => {
  const [updateQuotation] = useUpdateQuotationMutation();
  const { data: quotationData, isSuccess: isSuccessQuotation } =
    useGetQuotationByIdQuery(productId, { skip: !productId });

  const handleUpdateQuotation = (data) => {
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
