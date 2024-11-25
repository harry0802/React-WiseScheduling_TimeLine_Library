import ProductAddtionLayout from "../../../Global/layout/ProductAddtionLayout";
import QmsDashbord from "../../components/QmsDashbord";
import QmsPdInfo from "../../components/QmsPdInfo";
import { ProcessCostAnalysis } from "../../components/ProcessCostAnalysis";
import AddIcon from "@mui/icons-material/Add";
import QmsProfitDashboard from "../../components/ProfitDashboard/QmsProfitDashboard";

import { Spin } from "antd";
import { useQmsBase } from "../../hook/useQmsBase";
import { useBusinessQuotationStore } from "../../slice/useFactorySalesQuotationSlice_v1";

const QmsMaintain = () => {
  const {
    costAndQuotation,
    productData,
    handleUpdate,
    totalCostnoMarketing,
    setCostAndQuotation,
    BusinessQuotationStore,
    loading,
  } = useQmsBase("maintain");

  const breadcrumbs = [
    { to: "/SalesQuotationManagementSystem", label: "產品資訊維護" },
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
        BusinessQuotationStore={BusinessQuotationStore}
      />
      <ProcessCostAnalysis
        icon={<AddIcon />}
        quotationSlice={BusinessQuotationStore}
      />
    </ProductAddtionLayout>
  );
};

export default QmsMaintain;
