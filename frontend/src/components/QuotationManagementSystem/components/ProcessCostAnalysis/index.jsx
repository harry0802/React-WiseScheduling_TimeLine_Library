import { useState, useMemo, useEffect } from "react";
import ProcessList from "./components/ProcessList";
import ProductContextCard from "../../../ProductionRecord/utility/ProductContextCard";
import ProcessDrawer from "./components/ProcessDrawer";
import TransportationProcessItem from "../TransportationProcessItem";
import { useUpdateShippingMutation } from "../../services/salesServices/endpoints/shippingApi";
import {
  useCreateProcessMutation,
  useDeleteProcessMutation,
  useUpdateProcessMutation,
} from "../../services/salesServices/endpoints/processApi";
import ConfirmationDialog from "../../../Global/dialog/BaseDialog";

export function ProcessCostAnalysis({
  title = "各製程物料與加工成本分析",
  icon,
  quotationSlice,
}) {
  const {
    processes, // 從 store 取得製程列表
    updateProcess, // 更新製程方法
    addProcess, // 新增製程方法
    removeProcess, // 刪除製程方法
    calculateBaseCosts, // 計算基礎成本
    calculateAll, // 計算總成本
    calculationResults, // 成本計算結果
    id,
    shippingCosts,
    updateShippingCosts,
    type,
  } = quotationSlice();

  const [createProcess] = useCreateProcessMutation();
  const [updateShipping] = useUpdateShippingMutation();
  const [deleteProcess] = useDeleteProcessMutation();
  const [updateProcessApi] = useUpdateProcessMutation();
  const [isNewDrawerOpen, setIsNewDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
  });

  // 處理製程更新
  const handleUpdate = async (updatedProcess, onClose) => {
    try {
      await updateProcessApi({
        quotationId: id,
        process: updatedProcess,
      }).unwrap();
      updateProcess(updatedProcess.id, updatedProcess);
      calculateAll();
      onClose?.();
    } catch (error) {
      console.error("更新製程失敗:", error);
    }
  };

  // 處理製程刪除
  const handleDelete = async (processId) => {
    setPendingAction(() => async () => {
      try {
        await deleteProcess({ quotationId: id, processId }).unwrap();
        removeProcess(processId);
        calculateAll();
      } catch (error) {
        console.error("刪除製程失敗:", error);
      } finally {
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

  // 更新運輸成本
  const handleUpdateShippingCosts = async (updatedShippingCosts, onClose) => {
    const transformedShippingCosts = {
      SQFreights: updatedShippingCosts.SQFreights.map((freight) => ({
        ...freight,
        amount: freight.amount ?? 0,
      })),
      SQCustomsDuties: updatedShippingCosts.SQCustomsDuties.map((duty) => ({
        ...duty,
        amount: duty.amount ?? 0,
      })),
    };

    try {
      await (type === "sales" ? updateShipping : updateShippingCosts)({
        quotationId: id,
        shipping: transformedShippingCosts,
      }).unwrap();
      updateShippingCosts(transformedShippingCosts);
      calculateAll();
      onClose?.();
    } catch (error) {
      console.error("更新運費失敗:", error);
    }
  };

  // 處理新增製程
  const handleAdd = async (newProcess) => {
    const processData = {
      ...newProcess,
      id,
    };

    try {
      await createProcess({
        quotationId: id,
        process: processData,
      }).unwrap();
      addProcess(processData);
      calculateAll();
      setIsNewDrawerOpen(false);
    } catch (error) {
      console.error("新增製程失敗:", error);
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

  // 計算各製程成本詳情
  const processCostDetails = useMemo(() => {
    return calculateBaseCosts().costDetails;
  }, [processes, calculateBaseCosts]);

  return (
    <ProductContextCard
      title={title}
      icon={icon}
      OnClick={() => setIsNewDrawerOpen(true)}
    >
      <ProcessList
        processes={processes}
        costResult={{
          costDetails: processCostDetails,
          totalCostSubtotal: calculationResults.costSubtotal,
        }}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <TransportationProcessItem
        process={shippingCosts}
        costDetail={calculationResults.transportationCost}
        onUpdate={handleUpdateShippingCosts}
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
