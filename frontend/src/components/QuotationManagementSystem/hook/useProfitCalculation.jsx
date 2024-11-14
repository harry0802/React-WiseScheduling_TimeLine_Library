import { useState, useCallback, useEffect } from "react";
import { INITIAL_PERCENTAGES } from "../components/ProfitDashboard/constants";
import { calculateProfit } from "./useProcessComputations";

export function useProfitCalculation(
  setCostAndQuotation,
  totalCostnoMarketing = 200000,
  initialAmount = 100000
) {
  // 基礎狀態
  const [quotationAmount, setQuotationAmount] = useState(initialAmount);
  const [percentages, setPercentages] = useState(INITIAL_PERCENTAGES);
  // 計算利潤，返回展示數據和計算結果
  const calculateProfitData = useCallback(
    (amount, costNoMarketing) => {
      const data = {
        sgAndAdminPercentage: percentages.marketingDiscount,
        profitPercentage: percentages.profit,
        riskPercentage: percentages.risk,
        annualReductionPercentage: percentages.yearFactor,
        rebatePercentage: percentages.feedback,
        actualQuotation: amount,
      };

      const results = calculateProfit(costNoMarketing, data);

      // 分離顯示數據和計算結果
      return {
        displayData: [
          {
            key: "quotationAmount",
            label: "報價金額",
            value: `${amount.toFixed(2)} 元`,
          },
          {
            key: "marketingDiscount",
            label: `管銷研(${percentages.marketingDiscount}%)`,
            value: `${results.sgAndAdminFee.toFixed(2)} 元`,
          },
          {
            key: "profit",
            label: `利潤(${percentages.profit}%)`,
            value: `${results.profitFee.toFixed(2)} 元`,
          },
          {
            key: "risk",
            label: `風險(${percentages.risk}%)`,
            value: `${results.riskFee.toFixed(2)} 元`,
          },
          {
            key: "yearFactor",
            label: `年降(${percentages.yearFactor}%)`,
            value: `${results.annualReductionAmount.toFixed(2)} 元`,
          },
          {
            key: "subtotalWithoutMarketing",
            label: "成本小計(不含管銷研)",
            value: `${results.costSubtotal.toFixed(2)} 元`,
          },
          {
            key: "subtotalWithSGA",
            label: "成本小計(含管銷研)",
            value: `${results.subtotalWithSGA.toFixed(2)} 元`,
          },
          {
            key: "subtotalWithCosts",
            label: "總成本",
            value: `${results.totalCost.toFixed(2)} 元`,
          },
          {
            key: "feedback",
            label: `回饋(${percentages.feedback}%)`,
            value: `${results.rebateAmount.toFixed(2)} 元`,
          },
          {
            key: "grossProfitMargin",
            label: "毛利率",
            value: `${results.grossProfitMargin.toFixed(2)}%`,
          },
        ],
        calculationData: {
          base: results.costSubtotal,
          withMarketing: results.subtotalWithSGA,
          amount: costNoMarketing,
          actual: amount,
          totalCost: results.totalCost,
        },
      };
    },
    [percentages]
  );

  // 統一管理計算結果
  const [profitData, setProfitData] = useState(
    () => calculateProfitData(quotationAmount, totalCostnoMarketing).displayData
  );

  // 統一的更新效果
  useEffect(() => {
    const { displayData, calculationData } = calculateProfitData(
      quotationAmount,
      totalCostnoMarketing
    );

    setProfitData(displayData);

    if (setCostAndQuotation) {
      console.log("🚀 ~ useEffect ~ calculationData:", calculationData);
      setCostAndQuotation(calculationData);
    }
  }, [
    calculateProfitData,
    quotationAmount,
    totalCostnoMarketing,
    setCostAndQuotation,
  ]);

  // 表單提交處理
  const handleFormSubmit = useCallback((values) => {
    setQuotationAmount(parseFloat(values.quotationAmount));
    setPercentages({
      marketingDiscount: parseFloat(values.marketingDiscount),
      profit: parseFloat(values.profit),
      risk: parseFloat(values.risk),
      yearFactor: parseFloat(values.yearFactor),
      feedback: parseFloat(values.feedback),
    });
  }, []);

  return {
    profitData,
    quotationAmount,
    percentages,
    handleFormSubmit,
  };
}
