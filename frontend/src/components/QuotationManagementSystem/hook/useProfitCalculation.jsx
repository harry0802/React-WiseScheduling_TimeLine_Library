// useProfitCalculation.js

//! =============== 1. 設定與常量 ===============
import { useCallback, useMemo } from "react";

//* 數值計算相關常量
const DECIMAL_PLACES = 3;
const PERCENTAGE_FACTOR = 100;

//* 利潤相關欄位定義
const PROFIT_FIELDS = {
  QUOTATION: "quotationAmount",
  MARKETING: "marketingDiscount",
  PROFIT: "profit",
  RISK: "risk",
  YEAR_FACTOR: "yearFactor",
  FEEDBACK: "feedback",
  SUBTOTAL_WITHOUT_MARKETING: "subtotalWithoutMarketing",
  SUBTOTAL_WITH_SGA: "subtotalWithSGA",
  SUBTOTAL_WITH_COSTS: "subtotalWithCosts",
  GROSS_PROFIT_MARGIN: "grossProfitMargin",
};

//! =============== 2. 工具函數 ===============
/**
 * @function formatCurrency
 * @description 格式化貨幣顯示，統一金額展示格式
 * @param {number} value - 待格式化的數值
 * @returns {string} 格式化後的貨幣字串
 */
const formatCurrency = (value) =>
  `${(value || 0).toFixed(DECIMAL_PLACES)} 元/pcs`;

/**
 * @function formatPercentage
 * @description 格式化百分比顯示
 * @param {number} value - 待格式化的數值
 * @returns {string} 格式化後的百分比字串
 */
const formatPercentage = (value) => `${(value || 0).toFixed(DECIMAL_PLACES)}%`;

/**
 * @function convertFormValuesToApiFormat
 * @description 將表單數據轉換為 API 所需格式
 * @param {Object} values - 表單值物件
 * @returns {Object} 轉換後的數據物件
 */
const convertFormValuesToApiFormat = (values) => ({
  actualQuotation: parseFloat(values.quotationAmount),
  overheadRnd: parseFloat(values.marketingDiscount) / PERCENTAGE_FACTOR,
  profit: parseFloat(values.profit) / PERCENTAGE_FACTOR,
  risk: parseFloat(values.risk) / PERCENTAGE_FACTOR,
  annualDiscount: parseFloat(values.yearFactor) / PERCENTAGE_FACTOR,
  rebate: parseFloat(values.feedback) / PERCENTAGE_FACTOR,
});

/**
 * @function generateProfitDataArray
 * @description 生成利潤數據陣列
 * @param {Object} params - 包含所需參數的物件
 * @returns {Array} 格式化後的利潤數據陣列
 */
const generateProfitDataArray = ({
  actualQuotation,
  percentages,
  calculationResults,
}) => [
  {
    key: PROFIT_FIELDS.QUOTATION,
    label: "報價金額",
    value: formatCurrency(actualQuotation),
  },
  {
    key: PROFIT_FIELDS.MARKETING,
    label: `管銷研(${percentages.marketingDiscount}%)`,
    value: formatCurrency(calculationResults?.sgAndAdminFee),
  },
  {
    key: PROFIT_FIELDS.PROFIT,
    label: `利潤(${percentages.profit}%)`,
    value: formatCurrency(calculationResults?.profitFee),
  },
  {
    key: PROFIT_FIELDS.RISK,
    label: `風險(${percentages.risk}%)`,
    value: formatCurrency(calculationResults?.riskFee),
  },
  {
    key: PROFIT_FIELDS.YEAR_FACTOR,
    label: `年降(${percentages.yearFactor}%)`,
    value: formatCurrency(calculationResults?.annualReductionAmount),
  },
  {
    key: PROFIT_FIELDS.SUBTOTAL_WITHOUT_MARKETING,
    label: "成本小計(不含管銷研)",
    value: formatCurrency(calculationResults?.costSubtotal),
  },
  {
    key: PROFIT_FIELDS.SUBTOTAL_WITH_SGA,
    label: "成本小計(含管銷研)",
    value: formatCurrency(calculationResults?.subtotalWithSGA),
  },
  {
    key: PROFIT_FIELDS.SUBTOTAL_WITH_COSTS,
    label: "總成本",
    value: formatCurrency(calculationResults?.totalCost),
  },
  {
    key: PROFIT_FIELDS.FEEDBACK,
    label: `回饋(${percentages.feedback}%)`,
    value: formatCurrency(calculationResults?.rebateAmount),
  },
  {
    key: PROFIT_FIELDS.GROSS_PROFIT_MARGIN,
    label: "毛利率",
    value: formatPercentage(calculationResults?.grossProfitMargin),
  },
];

//! =============== 3. 核心 Hook ===============
/**
 * @function useProfitCalculation
 * @description 處理利潤計算的自定義 Hook
 * @param {Function} BusinessQuotationStore - 報價資料管理store
 * @param {Function} handleUpdateProfitManagement - 更新利潤管理的回調函數
 * @returns {Object} 包含計算結果和處理方法的物件
 */
export function useProfitCalculation(
  BusinessQuotationStore,
  handleUpdateProfitManagement
) {
  //* 從 store 中解構所需數據
  const {
    overheadRnd,
    profit,
    risk,
    annualDiscount,
    rebate,
    actualQuotation,
    calculationResults,
  } = BusinessQuotationStore();

  //* 計算各項百分比
  const percentages = useMemo(
    () => ({
      marketingDiscount: overheadRnd,
      profit,
      risk,
      yearFactor: annualDiscount,
      feedback: rebate,
    }),
    [overheadRnd, profit, risk, annualDiscount, rebate]
  );

  //* 生成利潤數據陣列
  const profitData = useMemo(
    () =>
      generateProfitDataArray({
        actualQuotation,
        percentages,
        calculationResults,
      }),
    [actualQuotation, percentages, calculationResults]
  );

  //* 處理表單提交
  const handleFormSubmit = useCallback(
    (values) => {
      if (!handleUpdateProfitManagement) {
        console.warn("handleUpdateProfitManagement is not defined");
        return;
      }

      const convertedData = convertFormValuesToApiFormat(values);
      handleUpdateProfitManagement(convertedData);
    },
    [handleUpdateProfitManagement]
  );

  return {
    profitData,
    quotationAmount: actualQuotation,
    percentages,
    handleFormSubmit,
  };
}

export default useProfitCalculation;
