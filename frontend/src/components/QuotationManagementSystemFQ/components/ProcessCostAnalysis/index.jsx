import { useState, useMemo } from "react";
import ProcessList from "./components/ProcessList";
import ProductContextCard from "../../../ProductionRecord/utility/ProductContextCard";
import ProcessDrawer from "./components/ProcessDrawer";
import TransportationProcessItem from "../TransportationProcessItem";
import ConfirmationDialog from "../../../Global/dialog/BaseDialog";
import { LoadingSkeleton } from "../LoadingSkeleton";

export function ProcessCostAnalysis({
  title = "各製程物料與加工成本分析",
  icon,
  quotationSlice,
  processService,
}) {
  const {
    processes,
    updateProcess,
    addProcess,
    removeProcess,
    calculateBaseCosts,
    calculateAll,
    calculationResults,
    id,
    shippingCosts,
    updateShippingCosts,
    type,
  } = quotationSlice?.();

  const {
    handleUpdateProcess,
    handleDeleteProcess,
    handleUpdateShippingCosts,
    handleAddProcess,
  } = processService?.(id) ?? {
    handleUpdateProcess: async () => false,
    handleDeleteProcess: async () => false,
    handleUpdateShippingCosts: async () => null,
    handleAddProcess: async () => null,
  };

  const [isNewDrawerOpen, setIsNewDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
  });

  const handleUpdate = async (updatedProcess, onClose) => {
    const success = await handleUpdateProcess(updatedProcess, onClose);
    if (success) {
      updateProcess(updatedProcess.id, updatedProcess);
      calculateAll();
    }
  };

  const handleDelete = async (processId) => {
    setPendingAction(() => async () => {
      const success = await handleDeleteProcess(processId);
      if (success) {
        removeProcess(processId);
        calculateAll();
        setIsNewDrawerOpen(false);
      }
    });
    setDialogConfig({
      title: "確認刪除",
      message: "你確定要刪除這個製程嗎？此操作無法撤銷。",
      confirmText: "確認刪除",
      cancelText: "取消",
    });
    setConfirmOpen(true);
  };

  const handleShippingUpdate = async (updatedShippingCosts, onClose) => {
    const result = await handleUpdateShippingCosts(
      updatedShippingCosts,
      onClose
    );
    if (result) {
      updateShippingCosts(result);
      calculateAll();
    }
  };

  const handleAdd = async (newProcess) => {
    const result = await handleAddProcess(newProcess);
    if (result) {
      addProcess(result);
      calculateAll();
      setIsNewDrawerOpen(false);
    }
  };

  const handleConfirm = async () => {
    if (pendingAction) {
      try {
        await pendingAction();
      } catch (error) {
        console.error("Action error:", error);
      }
    }
    setConfirmOpen(false);
  };

  const processCostDetails = useMemo(() => {
    return calculateBaseCosts().costDetails;
  }, [processes, calculateBaseCosts]);

  if (!processService) {
    return <LoadingSkeleton />;
  }

  return (
    <ProductContextCard
      type={type}
      title={title}
      icon={icon}
      OnClick={() => setIsNewDrawerOpen(true)}
      hideButton={type === "factory"}
    >
      <ProcessList
        processes={processes}
        costResult={{
          costDetails: processCostDetails,
          totalCostSubtotal: calculationResults.costSubtotal,
        }}
        onUpdate={handleUpdate}
        onDelete={type === "sales" ? handleDelete : null}
      />
      <TransportationProcessItem
        process={shippingCosts}
        costDetail={calculationResults.transportationCost}
        onUpdate={handleShippingUpdate}
      />

      {isNewDrawerOpen && (
        <ProcessDrawer
          isNew={true}
          visible={isNewDrawerOpen}
          onClose={() => setIsNewDrawerOpen(false)}
          onUpdate={handleAdd}
        />
      )}

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        {...dialogConfig}
      />
    </ProductContextCard>
  );
}
