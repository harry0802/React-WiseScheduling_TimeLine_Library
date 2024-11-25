import ProductAddtionLayout from "../../../Global/layout/ProductAddtionLayout";
import QmsDashbord from "../../components/QmsDashbord";
import QmsPdInfo from "../../components/QmsPdInfo";
import QmsProfitDashboard from "../../components/ProfitDashboard/QmsProfitDashboard";
import { ProcessCostAnalysis } from "../../components/ProcessCostAnalysis";
import AddIcon from "@mui/icons-material/Add";
import { useBusinessQuotationStore } from "../../slice/useFactorySalesQuotationSlice_v1";

import { Spin } from "antd";
import { useQmsBase } from "../../hook/useQmsBase";

const QmsCreate = () => {
  const {
    costAndQuotation,
    totalCostnoMarketing,
    setCostAndQuotation,
    handleUpdate,
    productData,
    loading,
  } = useQmsBase("create");

  const breadcrumbs = [
    { to: "/SalesQuotationManagementSystem", label: "產品資訊建立" },
    { label: "業務報價管理系統" },
  ];

  if (loading) return <Spin size="large" />;

  return (
    <ProductAddtionLayout breadcrumbs={breadcrumbs}>
      <QmsDashbord costAndQuotation={costAndQuotation} />
      <QmsPdInfo
        type="sales"
        onUpdate={handleUpdate}
        productData={productData}
        BusinessQuotationStore={useBusinessQuotationStore}
      />
      <QmsProfitDashboard
        totalCostnoMarketing={totalCostnoMarketing}
        setCostAndQuotation={setCostAndQuotation}
        BusinessQuotationStore={useBusinessQuotationStore}
      />
      <ProcessCostAnalysis
        icon={<AddIcon />}
        quotationSlice={useBusinessQuotationStore}
      />
    </ProductAddtionLayout>
  );
};

export default QmsCreate;
