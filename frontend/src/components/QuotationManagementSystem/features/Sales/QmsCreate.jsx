import QmsBase from "./QmsBase";
import ProductAddtionLayout from "../../../Global/layout/ProductAddtionLayout";
import QmsDashbord from "../../components/QmsDashbord";
import QmsPdInfo from "../../components/QmsPdInfo";
import QmsProfitDashboard from "../../components/QmsProfitDashboard";
import { ProcessCostAnalysis } from "../../components/ProcessCostAnalysis";
import AddIcon from "@mui/icons-material/Add";

const QmsCreate = () => {
  const breadcrumbs = [
    { to: "/SalesQuotationManagementSystem", label: "產品資訊建立" },
    { label: "業務報價管理系統" },
  ];

  return (
    <QmsBase mode="create">
      {(commonProps) => (
        <ProductAddtionLayout breadcrumbs={breadcrumbs}>
          <QmsDashbord costAndQuotation={commonProps.costAndQuotation} />
          <QmsPdInfo type="sales" />
          <QmsProfitDashboard
            totalCostnoMarketing={commonProps.totalCostnoMarketing}
            setCostAndQuotation={commonProps.setCostAndQuotation}
            BusinessQuotationStore={commonProps.BusinessQuotationStore}
          />
          <ProcessCostAnalysis
            icon={<AddIcon />}
            quotationSlice={commonProps.BusinessQuotationStore}
          />
        </ProductAddtionLayout>
      )}
    </QmsBase>
  );
};

export default QmsCreate;
