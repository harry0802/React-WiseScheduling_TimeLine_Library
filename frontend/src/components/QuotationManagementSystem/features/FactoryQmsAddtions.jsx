import ProductAddtionLayout from "../../Global/layout/ProductAddtionLayout";
import ProcessCostAnalysis from "../components/ProcessCostAnalysis/ProcessCostAnalysis";
import { ProcessCostAnalysisSections } from "../components/ProcessCostAnalysisSections";
import QmsDashbord from "../components/QmsDashbord";
import QmsPdInfo from "../components/QmsPdInfo";
import QmsProfitDashboard from "../components/QmsProfitDashboard";
import AddIcon from "@mui/icons-material/Add";

const type = "factory";
function FactoryQmsAddtions() {
  const breadcrumbs = [
    { to: "/FactoryQuotationManagementSystem", label: "編輯產品資訊" },
    { label: "工廠報價管理系統" },
  ];

  return (
    <ProductAddtionLayout breadcrumbs={breadcrumbs}>
      <QmsDashbord type={type} />
      <QmsPdInfo type={type} />
      <QmsProfitDashboard type={type} />
      <ProcessCostAnalysisSections
        type={type}
        title="各製程物料與加工成本分析"
        icon={<AddIcon />}
      />
    </ProductAddtionLayout>
  );
}

export default FactoryQmsAddtions;
