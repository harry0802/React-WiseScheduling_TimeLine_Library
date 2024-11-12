import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Grid, Typography, Paper } from "@mui/material";
import BaseProductInfoSection from "../../Global/sections/BaseProductInfoSection";
import { calculateProfit } from "../hook/useProcessComputations";

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

// 利潤管理展示組件
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
  const [percentages, setPercentages] = useState({
    marketingDiscount: 7,
    profit: 5,
    risk: 2,
    yearFactor: 2,
    feedback: 2,
  });

  const calculateProfitManagement = useCallback(
    (amount) => {
      const subtotalWithoutMarketing = amount;

      const marketingDiscount =
        subtotalWithoutMarketing * (percentages.marketingDiscount / 100);
      const profit = subtotalWithoutMarketing * (percentages.profit / 100);
      const risk = subtotalWithoutMarketing * (percentages.risk / 100);
      const yearFactor =
        subtotalWithoutMarketing * (percentages.yearFactor / 100);
      const taxCost = subtotalWithoutMarketing * 0.05; // 稅率保持 5%
      const feedback = subtotalWithoutMarketing * (percentages.feedback / 100);

      const subtotalWithCosts =
        subtotalWithoutMarketing +
        profit +
        risk +
        yearFactor +
        taxCost +
        feedback;

      const grossProfitMargin =
        ((subtotalWithoutMarketing - subtotalWithCosts) /
          subtotalWithoutMarketing) *
        100;

      // calculateProfit

      return [
        {
          key: "quotationAmount",
          label: "報價金額",
          value: `${amount.toFixed(2)} 元`,
        },
        {
          key: "marketingDiscount",
          label: `管銷研(${percentages.marketingDiscount}%)`,
          value: `${marketingDiscount.toFixed(2)} 元`,
        },
        {
          key: "profit",
          label: `利潤(${percentages.profit}%)`,
          value: `${profit.toFixed(2)} 元`,
        },
        {
          key: "risk",
          label: `風險(${percentages.risk}%)`,
          value: `${risk.toFixed(2)} 元`,
        },
        {
          key: "yearFactor",
          label: `年降(${percentages.yearFactor}%)`,
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
        {
          key: "feedback",
          label: `回饋(${percentages.feedback}%)`,
          value: `${feedback.toFixed(2)} 元`,
        },
        {
          key: "grossProfitMargin",
          label: "毛利率",
          value: `${grossProfitMargin.toFixed(2)}%`,
        },
      ];
    },
    [percentages]
  );

  const [profitData, setProfitData] = useState(
    calculateProfitManagement(quotationAmount)
  );

  const handleFormSubmit = (values) => {
    const newQuotationAmount = parseFloat(values.quotationAmount);
    setQuotationAmount(newQuotationAmount);

    setPercentages({
      marketingDiscount: parseFloat(values.marketingDiscount),
      profit: parseFloat(values.profit),
      risk: parseFloat(values.risk),
      yearFactor: parseFloat(values.yearFactor),
      feedback: parseFloat(values.feedback),
    });

    setProfitData(calculateProfitManagement(newQuotationAmount));
  };

  useEffect(() => {
    setProfitData(calculateProfitManagement(quotationAmount));
  }, [calculateProfitManagement, quotationAmount]);

  const defaultValues = {
    quotationAmount,
    ...percentages,
  };

  return (
    <BaseProductInfoSection
      onUpdate={handleFormSubmit}
      title="利潤管理"
      product={defaultValues}
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
