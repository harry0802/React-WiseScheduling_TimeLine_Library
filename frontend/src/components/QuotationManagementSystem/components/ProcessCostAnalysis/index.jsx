import ProcessList from "./components/ProcessList";
import ProductContextCard from "../../../ProductionRecord/utility/ProductContextCard";
import ProcessDrawer from "./components/ProcessDrawer";
import TransportationProcessItem from "../TransportationProcessItem";
import { transportationProcessData } from "../../data/processCostAnalysisData";
import { useState, useMemo, useEffect } from "react";
import { calculateTotalCost } from "../../hook/useProcessComputations";

export function ProcessCostAnalysis({
  title = "各製程物料與加工成本分析",
  icon,
  quotationSlice,
}) {
  const {
    processData,
    setData: updateProcess,
    costAndQuotation,
    setCostAndQuotation,
  } = quotationSlice;

  const [isNewDrawerOpen, setIsNewDrawerOpen] = useState(false);

  // 處理製程更新
  const handleUpdate = (updatedProcess) => {
    const newProcesses = processData.map((process) =>
      process.id === updatedProcess.id ? updatedProcess : process
    );
    updateProcess(newProcesses);
  };

  // 處理製程刪除
  const handleDelete = (processId) => {
    const newProcesses = processData.filter(
      (process) => process.id !== processId
    );
    updateProcess(newProcesses);
  };

  // 處理新增製程
  const handleAdd = (newProcess) => {
    updateProcess([...processData, newProcess]);
    setIsNewDrawerOpen(false);
  };

  // 計算成本結果
  const costResult = useMemo(() => {
    return calculateTotalCost(
      processData.map((process) => ({
        processCategory: process.processType,
        data: process,
      }))
    );
  }, [processData]);

  // 更新成本
  useEffect(() => {
    if (!costResult || !setCostAndQuotation) return;
    setCostAndQuotation({
      base: costResult.totalCostSubtotal,
    });
  }, [costResult, setCostAndQuotation]);

  return (
    <ProductContextCard
      title={title}
      icon={icon}
      OnClick={() => setIsNewDrawerOpen(true)}
    >
      <ProcessList
        processes={processData}
        costResult={costResult}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <TransportationProcessItem process={transportationProcessData} />
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
