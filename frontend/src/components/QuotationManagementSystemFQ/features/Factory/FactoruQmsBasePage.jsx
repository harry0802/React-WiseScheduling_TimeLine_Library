import ProductAddtionLayout from "../../../Global/layout/ProductAddtionLayout";
import QmsDashbord from "../../components/QmsDashbord";
import QmsPdInfo from "../../components/QmsPdInfo";
import QmsProfitDashboard from "../../components/ProfitDashboard/QmsProfitDashboard";
import { ProcessCostAnalysis } from "../../components/ProcessCostAnalysis";
import AddIcon from "@mui/icons-material/Add";
import { useInternalQuotationStore } from "../../slice/useFactorySalesQuotationSlice_v1";
import { Spin } from "antd";
import { useQmsBase } from "../../hook/useQmsBase";
import { useFactoryHomeSlice } from "../../slice/qmsHome";
import { useFactoryApi } from "./useFactoryApi";
import { useFactoryProcessApi } from "../../hook/useFactoryProcessService";
import { LoadingSkeleton } from "../../components/LoadingSkeleton";

const QmsBasePage = ({ type }) => {
  const {
    costAndQuotation,
    totalCostnoMarketing,
    setCostAndQuotation,
    handleUpdate,
    productData,
    loading,
    handleUpdateProfitManagement,
    isSuccessQuotation,
  } = useQmsBase(
    type,
    useInternalQuotationStore,
    useFactoryHomeSlice,
    useFactoryApi
  );

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
        BusinessQuotationStore={useInternalQuotationStore}
      />
      <QmsProfitDashboard
        totalCostnoMarketing={totalCostnoMarketing}
        setCostAndQuotation={setCostAndQuotation}
        BusinessQuotationStore={useInternalQuotationStore}
        handleUpdateProfitManagement={handleUpdateProfitManagement}
      />
      {isSuccessQuotation ? (
        <ProcessCostAnalysis
          icon={<AddIcon />}
          quotationSlice={useInternalQuotationStore}
          processService={useFactoryProcessApi}
        />
      ) : (
        <LoadingSkeleton />
      )}
    </ProductAddtionLayout>
  );
};

export default QmsBasePage;
