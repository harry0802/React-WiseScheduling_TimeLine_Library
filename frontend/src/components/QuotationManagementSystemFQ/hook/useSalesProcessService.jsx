import {
  useCreateProcessMutation,
  useDeleteProcessMutation,
  useUpdateProcessMutation,
} from "../services/salesServices/endpoints/processApi";
import { useUpdateShippingMutation } from "../services/salesServices/endpoints/shippingApi";

export const useSalesProcessApi = (id) => {
  const [createProcess] = useCreateProcessMutation();
  const [updateShipping] = useUpdateShippingMutation();
  const [deleteProcess] = useDeleteProcessMutation();
  const [updateProcessApi] = useUpdateProcessMutation();

  // Update process
  const handleUpdateProcess = async (updatedProcess, onClose) => {
    try {
      await updateProcessApi({
        quotationId: id,
        process: updatedProcess,
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
        shipping: transformedShippingCosts,
      }).unwrap();
      onClose?.();
      return transformedShippingCosts;
    } catch (error) {
      console.error("更新運費失敗:", error);
      return null;
    }
  };

  // Add new process
  const handleAddProcess = async (newProcess) => {
    const processData = {
      ...newProcess,
      id,
    };

    try {
      await createProcess({
        quotationId: id,
        process: processData,
      }).unwrap();
      return processData;
    } catch (error) {
      console.error("新增製程失敗:", error);
      return null;
    }
  };

  return {
    handleUpdateProcess,
    handleDeleteProcess,
    handleUpdateShippingCosts,
    handleAddProcess,
  };
};
