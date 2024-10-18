import ProductAddtionLayout from "../../Global/layout/ProductAddtionLayout";
import ProcessCostAnalysis from "../components/ProcessCostAnalysis/ProcessCostAnalysis";
import QmsDashbord from "../components/QmsDashbord";
import QmsPdInfo from "../components/QmsPdInfo";
import QmsProfitDashboard from "../components/QmsProfitDashboard";

function QmsAddtions() {
  const breadcrumbs = [
    { to: "/QuotationManagementSystem", label: "編輯產品資訊" },
    { label: "業務報價管理系統" },
  ];

  return (
    <ProductAddtionLayout breadcrumbs={breadcrumbs}>
      <QmsDashbord />
      <QmsPdInfo />
      <QmsProfitDashboard />
      <ProcessCostAnalysis />
    </ProductAddtionLayout>
  );
}

export default QmsAddtions;
