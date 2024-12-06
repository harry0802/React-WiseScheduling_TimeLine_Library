import ProductAddtionLayout from "../../../Global/layout/ProductAddtionLayout";
import QmsDashbord from "../../components/QmsDashbord";
import QmsPdInfo from "../../components/QmsPdInfo";
import QmsProfitDashboard from "../../components/ProfitDashboard/QmsProfitDashboard";
import { ProcessCostAnalysis } from "../../components/ProcessCostAnalysis";
import AddIcon from "@mui/icons-material/Add";
import { useBusinessQuotationStore } from "../../slice/useFactorySalesQuotationSlice_v1";
import { Spin } from "antd";
import { useQmsBase } from "../../hook/useQmsBase";
import { useSalesHomeSlice } from "../../slice/qmsHome";
import { useQmsApi } from "./useQmsApi";
import { useSalesProcessApi } from "../../hook/useSalesProcessService";

const QmsBasePage = ({ type }) => {
  const {
    costAndQuotation,
    totalCostnoMarketing,
    setCostAndQuotation,
    handleUpdate,
    productData,
    loading,
    handleUpdateProfitManagement,
  } = useQmsBase(type, useBusinessQuotationStore, useSalesHomeSlice, useQmsApi);

  const breadcrumbs = [
    {
      to: "/SalesQuotationManagementSystem",
      label: type === "create" ? "產品資訊建立" : "產品資訊維護",
    },
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
        handleUpdateProfitManagement={handleUpdateProfitManagement}
      />
      <ProcessCostAnalysis
        icon={<AddIcon />}
        quotationSlice={useBusinessQuotationStore}
        processService={useSalesProcessApi}
      />
    </ProductAddtionLayout>
  );
};

export default QmsBasePage;
