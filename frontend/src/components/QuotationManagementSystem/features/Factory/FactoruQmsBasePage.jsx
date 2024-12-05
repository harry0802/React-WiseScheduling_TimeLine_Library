import ProductAddtionLayout from "../../../Global/layout/ProductAddtionLayout";
import QmsDashbord from "../../components/QmsDashbord";
import QmsPdInfo from "../../components/QmsPdInfo";
import QmsProfitDashboard from "../../components/ProfitDashboard/QmsProfitDashboard";
import { ProcessCostAnalysis } from "../../components/ProcessCostAnalysis";
import AddIcon from "@mui/icons-material/Add";
import { useBusinessQuotationStore } from "../../slice/useFactorySalesQuotationSlice_v1";
import { Spin } from "antd";
import { useQmsBase } from "../../hook/useQmsBase";

const QmsBasePage = ({ type }) => {
  const {
    costAndQuotation,
    totalCostnoMarketing,
    setCostAndQuotation,
    handleUpdate,
    productData,
    loading,
    handleUpdateProfitManagement,
  } = useQmsBase(type);

  const breadcrumbs = [
    {
      to: "/FactoryQuotationManagementSystem",
      label: type === "create" ? "產品資訊建立" : "產品資訊維護",
    },
    { label: "工廠報價管理系統" },
  ];

  if (loading) return <Spin size="large" />;

  return (
    <ProductAddtionLayout breadcrumbs={breadcrumbs}>
      <QmsDashbord costAndQuotation={costAndQuotation} />
      <QmsPdInfo
        type="factory"
        onUpdate={handleUpdate}
        productData={productData}
        BusinessQuotationStore={useBusinessQuotationStore}
      />
      <QmsProfitDashboard
        totalCostnoMarketing={totalCostnoMarketing}
        setCostAndQuotation={setCostAndQuotation}
        BusinessQuotationStore={useBusinessQuotationStore}
        handleUpdateProfitManagement={handleUpdateProfitManagement}
      />
      <ProcessCostAnalysis
        icon={<AddIcon />}
        quotationSlice={useBusinessQuotationStore}
      />
    </ProductAddtionLayout>
  );
};

export default QmsBasePage;
