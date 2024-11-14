import ProductAddtionLayout from "../../../Global/layout/ProductAddtionLayout";
import QmsDashbord from "../../components/QmsDashbord";
import QmsPdInfo from "../../components/QmsPdInfo";
import AddIcon from "@mui/icons-material/Add";
import { useSalesQuotationSlice } from "../../slice/useFactorySalesQuotationSlice";
import QmsProfitDashboard from "../../components/ProfitDashboard/QmsProfitDashboard";
import { ProcessCostAnalysis } from "../../components/ProcessCostAnalysis";
import { mockProcessCostAnalysisData } from "../../data/processCostAnalysisData";
import { useEffect, useState } from "react";
const breadcrumbs = [
  { to: "/SalesQuotationManagementSystem", label: "編輯產品資訊 " },
  { label: "業務報價管理系統" },
];
function QmsAddtions() {
  const {
    data: processData,
    setData,
    costAndQuotation,
    setCostAndQuotation,
    type,
  } = useSalesQuotationSlice();
  const [processCostAnalysisData] = useState(mockProcessCostAnalysisData);

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

export default QmsAddtions;
