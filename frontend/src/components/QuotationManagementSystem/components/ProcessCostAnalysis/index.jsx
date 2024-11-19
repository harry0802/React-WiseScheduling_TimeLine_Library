import { useState, useMemo, useEffect } from "react";
import ProcessList from "./components/ProcessList";
import ProductContextCard from "../../../ProductionRecord/utility/ProductContextCard";
import ProcessDrawer from "./components/ProcessDrawer";
import TransportationProcessItem from "../TransportationProcessItem";

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
  } = quotationSlice();
  const [isNewDrawerOpen, setIsNewDrawerOpen] = useState(false);

  // 處理製程更新
  const handleUpdate = (updatedProcess) => {
    console.log("🚀 ~ handleUpdate ~ updatedProcess:", updatedProcess);
    updateProcess(updatedProcess);
    // 重新計算成本
    calculateAll();
  };

  // 處理製程刪除
  const handleDelete = (processId) => {
    removeProcess(processId);
    // 重新計算成本
    calculateAll();
  };
  // 更新運輸成本
  const handleUpdateShippingCosts = (updatedShippingCosts) => {
    updateShippingCosts(updatedShippingCosts);
    // 重新計算成本
    calculateAll();
  };

  // 處理新增製程
  const handleAdd = (newProcess) => {
    addProcess({
      id: processes.length + 1,
      salesQuotationId: id,
      processCategory: newProcess.processCategory,
      processSN: newProcess.processSN,
      processName: newProcess.processName,
      SQMaterialCostSetting: {
        estimatedDefectRate: 0,
        estimatedMaterialFluctuation: 0,
        extractionCost: 0,
        processingCost: 0,
      },
      SQMaterialCosts: newProcess.SQMaterialCosts || [],
      SQPackagingCosts: newProcess.SQPackagingCosts || [],
      SQInjectionMoldingCosts: newProcess.SQInjectionMoldingCosts || [],
      SQInPostProcessingCosts: newProcess.SQInPostProcessingCosts || [],
      SQOutPostProcessingCosts: newProcess.SQOutPostProcessingCosts || [],
    });
    setIsNewDrawerOpen(false);
    // 重新計算成本
    calculateAll();
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
      {/* <ProcessList
        processes={processes}
        costResult={{
          costDetails: processCostDetails,
          totalCostSubtotal: calculationResults.costSubtotal,
        }}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      /> */}
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
