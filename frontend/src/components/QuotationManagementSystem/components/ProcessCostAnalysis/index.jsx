import ProcessList from "./components/ProcessList";
import { useProcessCostAnalysis } from "../../hook/useProcessCostAnalysis";
import ProductContextCard from "../../../ProductionRecord/utility/ProductContextCard";
import ProcessDrawer from "./components/ProcessDrawer";
import TransportationProcessItem from "../TransportationProcessItem";
import { transportationProcessData } from "../../data/processCostAnalysisData";

export function ProcessCostAnalysis({
  title = "各製程物料與加工成本分析",
  icon,
  quotationSlice,
}) {
  // 從 hook 獲取所需的狀態和方法
  const {
    processes,
    costResult,
    handlers,
    isNewDrawerOpen,
    setIsNewDrawerOpen,
  } = useProcessCostAnalysis(quotationSlice);

  return (
    <ProductContextCard
      title={title}
      icon={icon}
      OnClick={() => setIsNewDrawerOpen(true)}
    >
      <ProcessList
        processes={processes}
        costResult={costResult}
        onUpdate={handlers.updateProcess}
        onDelete={handlers.deleteProcess}
      />
      {/*  這邊要一個單獨的固定製程 他只負責顯示運輸與關稅   */}
      <TransportationProcessItem process={transportationProcessData} />
      {isNewDrawerOpen && (
        <ProcessDrawer
          isNew={true}
          visible={isNewDrawerOpen}
          onClose={() => setIsNewDrawerOpen(false)}
          onUpdate={handlers.addProcess}
        />
      )}
    </ProductContextCard>
  );
}
