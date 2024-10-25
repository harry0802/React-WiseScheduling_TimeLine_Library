import { useCallback } from "react";
import useProcessCostAnalysisStore from "../store/useProcessCostAnalysisStore";
import useNotification from "antd/es/notification/useNotification";

export function useProcessManagement(process, onUpdate) {
  const { handleFormSubmit, setActiveDrawerId } = useProcessCostAnalysisStore();
  const { notifySuccess } = useNotification();

  const openDrawer = useCallback(
    () => setActiveDrawerId(process.id),
    [process.id, setActiveDrawerId]
  );
  const closeDrawer = useCallback(
    () => setActiveDrawerId(null),
    [setActiveDrawerId]
  );

  const handleConfirm = useCallback(
    async (formData) => {
      const updatedProcess = {
        ...process,
        ...formData,
      };

      if (onUpdate) await onUpdate(updatedProcess);
      closeDrawer();
      setTimeout(() => notifySuccess("資料已成功保存"), 100);
    },
    [process, handleFormSubmit, onUpdate, closeDrawer, notifySuccess]
  );

  return {
    openDrawer,
    closeDrawer,
    handleConfirm,
  };
}
