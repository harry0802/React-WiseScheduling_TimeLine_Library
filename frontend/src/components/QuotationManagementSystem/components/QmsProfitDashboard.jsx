import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Typography, Paper } from "@mui/material";
import BaseProductInfoSection from "../../Global/sections/BaseProductInfoSection";

const StyledPaper = styled(Paper)`
  border-radius: 8px;
  && {
    width: 100%;
    background-color: transparent;
    border: none;
    box-shadow: none;
  }
`;

const StyledGrid = styled(Grid)`
  && {
    display: flex;
    flex-wrap: wrap;
  }
`;

const StyledGridItem = styled(Grid)`
  && {
    flex-basis: 20%;
    max-width: 20%;
    padding: 8px;

    @media (max-width: 1200px) {
      flex-basis: 25%;
      max-width: 25%;
    }

    @media (max-width: 960px) {
      flex-basis: 33.333%;
      max-width: 33.333%;
    }

    @media (max-width: 600px) {
      flex-basis: 50%;
      max-width: 50%;
    }
  }
`;

const StyledLabel = styled(Typography)`
  && {
    color: var(--color-text-secondary);
    font-size: 1.125rem;
  }
`;

const StyledValue = styled(Typography)`
  && {
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--color-text);
  }
`;

// 核心計算函數根據規格書計算
function calculateProfitAnalysis(quotationAmount) {
  // 定義每個步驟的百分比 (可以根據規格書調整)
  const marketingDiscountPercentage = 0.07;
  const profitPercentage = 0.05;
  const riskPercentage = 0.02;
  const yearFactorPercentage = 0.02;
  const taxCostPercentage = 0.05;
  const feedbackPercentage = 0.02;

  // 成本小計(不含管)
  const subtotalWithoutMarketing = quotationAmount;

  // 根據規格書邏輯進行計算
  const marketingDiscount =
    subtotalWithoutMarketing * marketingDiscountPercentage;
  const profit = subtotalWithoutMarketing * profitPercentage;
  const risk = subtotalWithoutMarketing * riskPercentage;
  const yearFactor = subtotalWithoutMarketing * yearFactorPercentage;
  const taxCost = subtotalWithoutMarketing * taxCostPercentage;
  const feedback = subtotalWithoutMarketing * feedbackPercentage;

  // 總成本：包含管銷研與其他成本
  const subtotalWithCosts =
    subtotalWithoutMarketing + profit + risk + yearFactor + taxCost + feedback;
  // 毛利率
  const grossProfitMargin =
    ((subtotalWithoutMarketing - subtotalWithCosts) /
      subtotalWithoutMarketing) *
    100;

  // 根據規格書的字段格式化數據
  return [
    {
      key: "quotationAmount",
      label: "報價金額",
      value: `${quotationAmount.toFixed(2)} 元`,
    },
    {
      key: "marketingDiscount",
      label: "管銷研(7%)",
      value: `${marketingDiscount.toFixed(2)} 元`,
    },
    { key: "profit", label: "利潤(5%)", value: `${profit.toFixed(2)} 元` },
    { key: "risk", label: "風險(2%)", value: `${risk.toFixed(2)} 元` },
    {
      key: "yearFactor",
      label: "年份(2%)",
      value: `${yearFactor.toFixed(2)} 元`,
    },
    {
      key: "subtotalWithoutMarketing",
      label: "成本小計(不含管銷研 )",
      value: `${subtotalWithoutMarketing.toFixed(2)} 元`,
    },
    {
      key: "subtotalWithCosts",
      label: "總成本",
      value: `${subtotalWithCosts.toFixed(2)} 元`,
    },
    { key: "taxCost", label: "稅成本", value: `${taxCost.toFixed(2)} 元` },
    { key: "feedback", label: "回饋(2%)", value: `${feedback.toFixed(2)} 元` },
    {
      key: "grossProfitMargin",
      label: "毛利率",
      value: `${grossProfitMargin.toFixed(2)}%`,
    },
  ];
}

// 利潤分析展示組件
const ProfitManagementGrid = ({ data }) => {
  return (
    <StyledPaper>
      <StyledGrid container>
        {data?.map((item, index) => (
          <StyledGridItem item key={index}>
            <StyledLabel variant="body2">{item.label}</StyledLabel>
            <StyledValue variant="body2">{item.value}</StyledValue>
          </StyledGridItem>
        ))}
      </StyledGrid>
    </StyledPaper>
  );
};

function QmsProfitDashboard() {
  const [quotationAmount, setQuotationAmount] = useState(100000);
  const [profitData, setProfitData] = useState(
    calculateProfitAnalysis(quotationAmount)
  );

  const handleFormSubmit = (values) => {
    const newQuotationAmount = parseFloat(values.quotationAmount);
    setQuotationAmount(newQuotationAmount);
    setProfitData(calculateProfitAnalysis(newQuotationAmount));
  };

  const defaultValues = {
    quotationAmount: quotationAmount,
    marketingDiscount: 7,
    profit: 5,
    risk: 2,
    yearFactor: 2,
    feedback: 2,
  };

  return (
    <BaseProductInfoSection
      onUpdate={handleFormSubmit}
      title="利潤管理"
      product={{ defaultValues }}
    >
      <ProfitManagementGrid data={profitData} />

      <BaseProductInfoSection.Drawer title="利潤管理">
        <BaseProductInfoSection.Form
          defaultValues={defaultValues}
          formFields={[
            {
              type: "input",
              name: "quotationAmount",
              label: "實際報價",
              rules: { required: "報價金額是必填的" },
              props: {
                placeholder: "元",
                suffix: "元",
              },
            },
            {
              type: "input",
              name: "marketingDiscount",
              label: "管銷研百分比",
              rules: { required: "管銷研是必填的" },
              props: {
                placeholder: "7 %",
                suffix: "%",
              },
            },
            {
              type: "input",
              name: "profit",
              label: "利潤百分比",
              rules: { required: "利潤是必填的" },
              props: {
                placeholder: "5 %",
                suffix: "%",
              },
            },
            {
              type: "input",
              name: "risk",
              label: "風險百分比",
              rules: { required: "風險是必填的" },
              props: {
                placeholder: "2 %",
                suffix: "%",
              },
            },
            {
              type: "input",
              name: "yearFactor",
              label: "年降百分比",
              rules: { required: "年降是必填的" },
              props: {
                placeholder: "2 %",
                suffix: "%",
              },
            },
            {
              type: "input",
              name: "feedback",
              label: "回饋百分比",
              rules: { required: "回饋是必填的" },
              props: {
                placeholder: "2 %",
                suffix: "%",
              },
            },
          ]}
        />
      </BaseProductInfoSection.Drawer>
    </BaseProductInfoSection>
  );
}

export default QmsProfitDashboard;
