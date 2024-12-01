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

  // 處理製程更新
  const handleUpdate = async (updatedProcess) => {
    try {
      console.log("🔥🔥🔥🔥 ~ handleUpdate ~ updatedProcess:", updatedProcess);
      await updateProcessApi({
        quotationId: id,
        process: updatedProcess,
      }).unwrap();
      updateProcess(updatedProcess.id, updatedProcess);

      // 重新計算成本
      calculateAll();
    } catch (error) {
      console.error("更新製程失敗:", error);
    }
  };

  // 處理製程刪除
  const handleDelete = async (processId) => {
    try {
      await deleteProcess({ quotationId: id, processId }).unwrap();
      removeProcess(processId);
      // 重新計算成本
      calculateAll();
    } catch (error) {
      console.error("刪除製程失敗:", error);
    } finally {
      setIsNewDrawerOpen(false);
    }
  };
  // 更新運輸成本
  const handleUpdateShippingCosts = async (updatedShippingCosts) => {
    try {
      // API 呼叫
      // 未來這邊會是區分業務報價與場內 只是現在先統一用 updateShippingCosts
      await (type === "sales" ? updateShipping : updateShippingCosts)({
        quotationId: id,
        shipping: updatedShippingCosts,
      }).unwrap();
      // 本地狀態更新
      updateShippingCosts(updatedShippingCosts);
      calculateAll();
    } catch (error) {
      console.error("更新運費失敗:", error);
    }
  };
  // 處理新增製程
  const handleAdd = async (newProcess) => {
    console.log("🚀 ~ handleAdd ~ newProcess:", {
      ...newProcess,
      id,
    });

    const processData = {
      ...newProcess,
      id,
    };

    try {
      const result = await createProcess({
        quotationId: id,
        process: processData,
      }).unwrap();
      console.log("🔥🔥🔥🔥 ~ handleAdd ~ result:", result);

      return;
      addProcess(result);
      setIsNewDrawerOpen(false);
      // 重新計算成本
      calculateAll();
    } catch (error) {
      console.error("新增製程失敗:", error);
    } finally {
      setIsNewDrawerOpen(false);
    }
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
    </ProductContextCard>
  );
}
