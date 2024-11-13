import ProductAddtionLayout from "../../../Global/layout/ProductAddtionLayout";
import BaseProcessCostAnalysis from "../../components/ProcessCostAnalysisSections";
import QmsDashbord from "../../components/QmsDashbord";
import QmsPdInfo from "../../components/QmsPdInfo";
import AddIcon from "@mui/icons-material/Add";
import { useFactoryQuotationSlice } from "../../slice/useFactorySalesQuotationSlice";
import QmsProfitDashboard from "../ProfitDashboard/QmsProfitDashboard";
import { ProcessCostAnalysis } from "../../components/ProcessCostAnalysis";
import { mockProcessCostAnalysisData } from "../../data/processCostAnalysisData";
import { useEffect, useState } from "react";
const breadcrumbs = [
  { to: "/FactoryQuotationManagementSystem", label: "編輯產品資訊" },
  { label: "工廠報價管理系統" },
];

const type = "factory";
function FactoryQmsAddtions() {
  const {
    data: processData,
    setData,
    costAndQuotation,
    setCostAndQuotation,
  } = useFactoryQuotationSlice();
  const [processCostAnalysisData, setProcessCostAnalysisData] = useState(
    mockProcessCostAnalysisData
  );

  // 設定數據
  useEffect(() => {
    setData(processCostAnalysisData);
  }, [processCostAnalysisData, setData]);

  return (
    <ProductAddtionLayout breadcrumbs={breadcrumbs}>
      <QmsDashbord costAndQuotation={costAndQuotation} />
      <QmsPdInfo type={type} />
      <QmsProfitDashboard
        totalCostnoMarketing={costAndQuotation.base}
        setCostAndQuotation={setCostAndQuotation}
      />
      <ProcessCostAnalysis
        icon={<AddIcon />}
        quotationSlice={{
          processData,
          setData,
          costAndQuotation,
          setCostAndQuotation,
        }}
      />
    </ProductAddtionLayout>
  );
}

export default FactoryQmsAddtions;
