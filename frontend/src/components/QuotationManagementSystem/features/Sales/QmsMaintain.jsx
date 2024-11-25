import QmsBase from "./QmsBase";
import ProductAddtionLayout from "../../../Global/layout/ProductAddtionLayout";
import QmsDashbord from "../../components/QmsDashbord";
import QmsPdInfo from "../../components/QmsPdInfo";
import { ProcessCostAnalysis } from "../../components/ProcessCostAnalysis";
import AddIcon from "@mui/icons-material/Add";

import QmsProfitDashboard from "../../components/ProfitDashboard/QmsProfitDashboard";

const QmsMaintain = () => {
  const breadcrumbs = [
    { to: "/SalesQuotationManagementSystem", label: "產品資訊維護" },
    { label: "業務報價管理系統" },
  ];

  return (
    <QmsBase mode="maintain">
      {({
        costAndQuotation,
        productData,
        handleUpdate,
        totalCostnoMarketing,
        setCostAndQuotation,
        BusinessQuotationStore,
      }) => (
        <ProductAddtionLayout breadcrumbs={breadcrumbs}>
          <QmsDashbord costAndQuotation={costAndQuotation} />
          <QmsPdInfo
            type="sales"
            productData={productData}
            onUpdate={handleUpdate}
          />
          <QmsProfitDashboard
            totalCostnoMarketing={totalCostnoMarketing}
            setCostAndQuotation={setCostAndQuotation}
            BusinessQuotationStore={BusinessQuotationStore}
          />
          <ProcessCostAnalysis
            icon={<AddIcon />}
            quotationSlice={BusinessQuotationStore}
          />
        </ProductAddtionLayout>
      )}
    </QmsBase>
  );
};

export default QmsMaintain;
