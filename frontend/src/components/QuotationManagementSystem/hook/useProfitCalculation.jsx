// useProfitCalculation.jsx
import { useCallback, useMemo, useEffect } from "react";

export function useProfitCalculation(BusinessQuotationStore) {
  const {
    overheadRnd,
    profit,
    risk,
    annualDiscount,
    rebate,
    actualQuotation,
    calculationResults,
    updateProfitManagement,
  } = BusinessQuotationStore();

  // !百分比計算
  //  四捨五入 保留小數點後三位
  const percentages = useMemo(
    () => ({
      marketingDiscount: parseFloat((overheadRnd * 100).toFixed(3)),
      profit: parseFloat((profit * 100).toFixed(3)),
      risk: parseFloat((risk * 100).toFixed(3)),
      yearFactor: parseFloat((annualDiscount * 100).toFixed(3)),
      feedback: parseFloat((rebate * 100).toFixed(3)),
    }),
    [overheadRnd, profit, risk, annualDiscount, rebate]
  );

  // !顯示數據計算
  const profitData = useMemo(
    () => [
      {
        key: "quotationAmount",
        label: "報價金額",
        value: `${actualQuotation?.toFixed(3)} 元/pcs`,
      },
      {
        key: "marketingDiscount",
        label: `管銷研(${percentages.marketingDiscount}%)`,
        value: `${calculationResults.sgAndAdminFee.toFixed(3)} 元/pcs`,
      },
      {
        key: "profit",
        label: `利潤(${percentages.profit}%)`,
        value: `${calculationResults.profitFee.toFixed(3)} 元/pcs`,
      },
      {
        key: "risk",
        label: `風險(${percentages.risk}%)`,
        value: `${calculationResults.riskFee.toFixed(3)} 元/pcs`,
      },
      {
        key: "yearFactor",
        label: `年降(${percentages.yearFactor}%)`,
        value: `${calculationResults.annualReductionAmount.toFixed(3)} 元/pcs`,
      },
      {
        key: "subtotalWithoutMarketing",
        label: "成本小計(不含管銷研)",
        value: `${calculationResults.costSubtotal.toFixed(3)} 元/pcs`,
      },
      {
        key: "subtotalWithSGA",
        label: "成本小計(含管銷研)",
        value: `${calculationResults.subtotalWithSGA.toFixed(3)} 元/pcs`,
      },
      {
        key: "subtotalWithCosts",
        label: "總成本",
        value: `${calculationResults.totalCost.toFixed(3)} 元/pcs`,
      },
      {
        key: "feedback",
        label: `回饋(${percentages.feedback}%)`,
        value: `${calculationResults.rebateAmount.toFixed(3)} 元/pcs`,
      },
      {
        key: "grossProfitMargin",
        label: "毛利率",
        value: `${calculationResults.grossProfitMargin?.toFixed(3)}%`,
      },
    ],
    [actualQuotation, percentages, calculationResults]
  );

  // !表單提交處理
  const handleFormSubmit = useCallback(
    (values) => {
      const convertedData = {
        actualQuotation: parseFloat(values.quotationAmount),
        overheadRnd: parseFloat(values.marketingDiscount) / 100,
        profit: parseFloat(values.profit) / 100,
        risk: parseFloat(values.risk) / 100,
        annualDiscount: parseFloat(values.yearFactor) / 100,
        rebate: parseFloat(values.feedback) / 100,
      };

      // 更新 store
      updateProfitManagement(convertedData);
    },
    [updateProfitManagement]
  );

  return {
    profitData,
    quotationAmount: actualQuotation,
    percentages,
    handleFormSubmit,
  };
}
