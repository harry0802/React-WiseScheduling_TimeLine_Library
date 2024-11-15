import ProductAddtionLayout from "../../../Global/layout/ProductAddtionLayout";
import QmsDashbord from "../../components/QmsDashbord";
import QmsPdInfo from "../../components/QmsPdInfo";
import AddIcon from "@mui/icons-material/Add";
import QmsProfitDashboard from "../../components/ProfitDashboard/QmsProfitDashboard";
import { ProcessCostAnalysis } from "../../components/ProcessCostAnalysis";
import { useEffect, useState } from "react";
import { useBusinessQuotationStore } from "../../slice/useFactorySalesQuotationSlice_v1";
import quotationData from "../../data/realdataStructure";
import { useQuotationComputation } from "../../hook/useProcessComputations_v1";

const breadcrumbs = [
  { to: "/SalesQuotationManagementSystem", label: "編輯產品資訊 " },
  { label: "業務報價管理系統" },
];

function QmsAddtions() {
  const {
    processes,
    calculationResults,
    updateProcess,
    addProcess,
    removeProcess,
    updateProfitManagement,
    resetAll,
  } = useBusinessQuotationStore();
  const { calculateAll } = useQuotationComputation();
  useEffect(() => {
    // 先重置所有數據
    resetAll();

    // 然後設置新數據
    if (quotationData) {
      console.log("🚀 ~ useEffect ~ quotationData:", quotationData);
      if (!Array.isArray(quotationData)) {
        addProcess(quotationData);
      } else {
        quotationData.forEach((process) => addProcess(process));
      }
      console.log("🚀 ~ QmsAddtions ~ processes:", processes);
      //  計算所有成本
    }
  }, []); // 只在組件掛載時執行一次
  return null;
  return (
    <ProductAddtionLayout breadcrumbs={breadcrumbs}>
      <QmsDashbord costAndQuotation={calculationResults} />
      <QmsPdInfo type="sales" />
      <QmsProfitDashboard
        totalCostnoMarketing={calculationResults.totalBeforeOverhead}
        setCostAndQuotation={updateProfitManagement}
      />
      <ProcessCostAnalysis
        icon={<AddIcon />}
        quotationSlice={{
          processData: processes,
          setData: updateProcess,
          costAndQuotation: calculationResults,
          setCostAndQuotation: updateProfitManagement,
        }}
      />
    </ProductAddtionLayout>
  );
}

export default QmsAddtions;
