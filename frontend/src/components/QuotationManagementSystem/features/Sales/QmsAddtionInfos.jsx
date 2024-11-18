import ProductAddtionLayout from "../../../Global/layout/ProductAddtionLayout";
import QmsDashbord from "../../components/QmsDashbord";
import QmsPdInfo from "../../components/QmsPdInfo";
import AddIcon from "@mui/icons-material/Add";
import QmsProfitDashboard from "../../components/ProfitDashboard/QmsProfitDashboard";
import { ProcessCostAnalysis } from "../../components/ProcessCostAnalysis";
import { useEffect, useState } from "react";
import { useBusinessQuotationStore } from "../../slice/useFactorySalesQuotationSlice_v1";
import quotationData from "../../data/realdataStructure";
import { Spin } from "antd";

const breadcrumbs = [
  { to: "/SalesQuotationManagementSystem", label: "編輯產品資訊 " },
  { label: "業務報價管理系統" },
];

function QmsAddtions() {
  const {
    calculationResults,
    addProcess,
    updateProfitManagement,
    resetAll,
    calculateAll,
    calculateProfit,
    updateStore,
    actualQuotation,
  } = useBusinessQuotationStore();

  const [loading, setLoading] = useState(false);

  // 初始化數據
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (quotationData) {
          resetAll();
          const { processes, ...restData } = quotationData;
          updateStore(restData);
          processes.forEach((process) => addProcess(process));

          // 合并计算,避免多次触发状态更新
          const results = calculateAll();
          const profitResults = calculateProfit();

          // 一次性更新所有状态
          updateStore({
            ...restData,
            calculationResults: {
              ...results,
              ...profitResults,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 添加依赖

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <ProductAddtionLayout breadcrumbs={breadcrumbs}>
      <QmsDashbord
        costAndQuotation={{ ...calculationResults, actualQuotation }}
      />
      <QmsPdInfo type="sales" />
      <QmsProfitDashboard
        totalCostnoMarketing={calculationResults.costSubtotal}
        setCostAndQuotation={updateProfitManagement}
        BusinessQuotationStore={useBusinessQuotationStore}
      />
      <ProcessCostAnalysis
        icon={<AddIcon />}
        quotationSlice={useBusinessQuotationStore}
      />
    </ProductAddtionLayout>
  );
}
export default QmsAddtions;
