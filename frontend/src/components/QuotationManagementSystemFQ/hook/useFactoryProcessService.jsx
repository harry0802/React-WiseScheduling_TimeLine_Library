import { useUpdateProcessMutation } from "../services/factoryServices/endpoints/processApi";
import { useDeleteQuotationMutation } from "../services/factoryServices/endpoints/quotationApi";

import { useUpdateShippingMutation } from "../services/factoryServices/endpoints/shippingApi";

export const useFactoryProcessApi = (id) => {
  const [updateShipping] = useUpdateShippingMutation();
  const [deleteProcess] = useDeleteQuotationMutation();
  const [updateProcessApi] = useUpdateProcessMutation();

  // Update process
  const handleUpdateProcess = async (updatedProcess, onClose) => {
    try {
      await updateProcessApi({
        quotationId: id,
        data: updatedProcess,
      }).unwrap();
      onClose?.();
      return true;
    } catch (error) {
      console.error("更新製程失敗:", error);
      return false;
    }
  };

  // Delete process
  const handleDeleteProcess = async (processId) => {
    try {
      await deleteProcess({ quotationId: id, processId }).unwrap();
      return true;
    } catch (error) {
      console.error("刪除製程失敗:", error);
      return false;
    }
  };

  // Update shipping costs
  const handleUpdateShippingCosts = async (updatedShippingCosts, onClose) => {
    const transformedShippingCosts = {
      FQFreights: updatedShippingCosts.FQFreights.map((freight) => ({
        ...freight,
        amount: freight.amount ?? 0,
      })),
      FQCustomsDuties: updatedShippingCosts.FQCustomsDuties.map((duty) => ({
        ...duty,
        amount: duty.amount ?? 0,
      })),
    };

    try {
      await updateShipping({
        quotationId: id,
        ...transformedShippingCosts,
      }).unwrap();
      onClose?.();
      return transformedShippingCosts;
    } catch (error) {
      console.error("更新運費失敗:", error);
      return null;
    }
  };

  return {
    handleUpdateProcess,
    handleDeleteProcess,
    handleUpdateShippingCosts,
  };
};
