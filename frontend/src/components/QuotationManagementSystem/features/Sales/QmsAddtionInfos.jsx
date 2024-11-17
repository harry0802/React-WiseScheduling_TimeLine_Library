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
    processes,
    calculationResults,
    updateProcess,
    addProcess,
    removeProcess,
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
    resetAll();
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (quotationData) {
          const { processes, ...restData } = quotationData;
          updateStore(restData);
          processes.forEach((process) => addProcess(process));
          // 初始化時計算所有成本和利潤
          const costResult = calculateAll();
          calculateProfit();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 監聽製程變化，重新計算成本
  useEffect(() => {
    if (processes.length > 0) {
      const timer = setTimeout(() => {
        const costResult = calculateAll();
        calculateProfit();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [processes]);

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
      />
      {/* <ProcessCostAnalysis
        icon={<AddIcon />}
        quotationSlice={{
          processData: processes,
          setData: updateProcess,
          costAndQuotation: calculationResults,
          setCostAndQuotation: updateProfitManagement,
        }}
      /> */}
    </ProductAddtionLayout>
  );
}
export default QmsAddtions;
