// contexts/ProcessContext.js
import React, { createContext, useContext, useState, useMemo } from "react";

const ProcessContext = createContext();

// 基礎 Hook - 提供所有共享狀態
export function useProcess() {
  const context = useContext(ProcessContext);
  if (!context) {
    throw new Error("useProcess 必須在 ProcessProvider 內使用");
  }
  return context;
}

// 流程管理 Hook - 處理流程邏輯
export function useProcessManagement() {
  const {
    processes = [],
    updateProcess,
    addProcess,
    removeProcess,
    calculateBaseCosts = () => ({ costDetails: [] }),
    calculateAll,
    handleUpdateProcess,
    handleDeleteProcess,
    handleAddProcess,
    type,
  } = useProcess();

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
    return calculateBaseCosts()?.costDetails || [];
  }, [processes, calculateBaseCosts]);

  return {
    processes,
    type,
    processCostDetails,
    isNewDrawerOpen,
    setIsNewDrawerOpen,
    confirmOpen,
    setConfirmOpen,
    dialogConfig,
    handleUpdate,
    handleDelete,
    handleAdd,
    handleConfirm,
  };
}

// 運輸管理 Hook - 處理運輸成本邏輯
export function useShipping() {
  const {
    shippingCosts = {},
    updateShippingCosts,
    calculationResults = {},
    calculateAll,
    handleUpdateShippingCosts,
  } = useProcess();

  const handleShippingUpdate = async (updatedShippingCosts, onClose) => {
    const result = await handleUpdateShippingCosts?.(
      updatedShippingCosts,
      onClose
    );
    if (result) {
      updateShippingCosts?.(result);
      calculateAll?.();
    }
  };

  return {
    shippingCosts,
    transportationCost: calculationResults?.transportationCost || {},
    handleShippingUpdate,
  };
}

// 表單管理 Hook - 處理表單相關邏輯
export function useProcessForm() {
  const {
    formConfig,
    initializeProcessValues,
    processForm,
    getProcessResolver,
  } = useProcess();

  return {
    formConfig,
    initializeProcessValues,
    processForm,
    getProcessResolver,
  };
}

// Context Provider - 提供全局狀態
export function ProcessProvider({
  children,
  quotationSlice,
  processService,
  formConfig,
  initializeProcessValues,
  processForm,
  getProcessResolver,
}) {
  const {
    processes = [],
    updateProcess,
    addProcess,
    removeProcess,
    calculateBaseCosts = () => ({ costDetails: [] }),
    calculateAll = () => ({}),
    calculationResults = {},
    id,
    shippingCosts = {},
    updateShippingCosts,
    type,
  } = quotationSlice?.() ?? {};

  const contextValue = {
    processes,
    calculationResults,
    shippingCosts,
    type,
    id,
    updateProcess: updateProcess ?? (() => {}),
    addProcess: addProcess ?? (() => {}),
    removeProcess: removeProcess ?? (() => {}),
    updateShippingCosts: updateShippingCosts ?? (() => {}),
    calculateBaseCosts,
    calculateAll,
    handleUpdateProcess: processService?.handleUpdateProcess ?? (() => false),
    handleDeleteProcess: processService?.handleDeleteProcess ?? (() => false),
    handleUpdateShippingCosts:
      processService?.handleUpdateShippingCosts ?? (() => null),
    handleAddProcess: processService?.handleAddProcess ?? (() => null),
    formConfig,
    initializeProcessValues,
    processForm,
    getProcessResolver,
  };

  return (
    <ProcessContext.Provider value={contextValue}>
      {children}
    </ProcessContext.Provider>
  );
}
