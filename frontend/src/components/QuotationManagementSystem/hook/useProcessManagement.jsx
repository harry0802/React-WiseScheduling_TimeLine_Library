const { useState } = require("react");
const {
  useProcessCostAnalysis,
} = require("../context/ProcessCostAnalysisContext");
const {
  default: useNotification,
} = require("antd/es/notification/useNotification");

export function useProcessManagement(process, onUpdate) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { methods, handleFormSubmit } = useProcessCostAnalysis();
  const { notifySuccess } = useNotification();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleConfirm = async () => {
    const currentFormData = methods.getValues();
    const updatedProcess = {
      ...process,
      ...currentFormData,
    };

    try {
      await handleFormSubmit(updatedProcess);
      if (onUpdate) await onUpdate(updatedProcess);
      closeDrawer();
      setTimeout(() => notifySuccess("資料已成功保存"), 100);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    handleConfirm,
    methods,
  };
}
