// src/components/Global/table/ProcessTables.js
import React from "react";
import { Typography, Box } from "@mui/material";
import QmsCasTable from "../../Global/table/QmsCasTable";
import { PROCESS_TABLE_CONFIG } from "../config/ProcessTableConfig";
import styled from "styled-components";

//  使用 styled-components 來設定 總成本統計
const TotalCostContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: #ffffff;
  background: #555659;
  border-radius: 4px;
  padding: 20px;
  margin-top: 1.3125rem;
`;

// * 渲染製程表格的 summaryFields
const renderSummaryFields = (formData, summaryFields) => (
  <Box>
    {summaryFields.map((field) => (
      <Typography key={field.key}>
        {field.label}: {formData[field.key] || 0}
        {field.unit}
      </Typography>
    ))}
  </Box>
);

// * 渲染製程表格的每一個 section
const renderSection = (section, formData) => {
  const headers = [
    [{ title: section.sectionTitle, colSpan: section.headers.length }],
    section.headers.map((header) => header.label),
  ];
  let data;
  //  如果有 dataKey 就要去 formData 裡面找 對應到 headers 的 key
  if (section.dataKey) {
    data = formData[section.dataKey]?.map((item) => ({
      cells: section.headers.map((header) => ({
        value: header.calculated
          ? calculateValue(item, header)
          : `${item[header.key] || 0}${header.unit || ""}`,
        align: "right",
      })),
    }));
  } else {
    //  如果沒有 dataKey 就要去 formData 裡面找 對應到 headers 的 key
    data = [
      {
        cells: section.headers.map((header) => ({
          value: header.calculated
            ? calculateValue(formData, header)
            : `${formData[header.key] || 0}${header.unit || ""}`,
          align: "right",
        })),
      },
    ];
  }

  const calculateSubtotal = () => {
    if (!section.calculation || !formData[section.dataKey]) return 0;

    try {
      return section.calculation(formData[section.dataKey]);
    } catch (error) {
      console.error("計算小計時出錯:", error);
      return 0;
    }
  };

  const subtotal = section.showSubtotal && {
    isTotal: true,
    cells: [
      { value: section.subtotalLabel, colSpan: section.headers.length - 1 },
      {
        value: `${calculateSubtotal()} 元`,
        align: "right",
      },
    ],
  };

  return (
    <QmsCasTable
      headers={headers}
      data={[...(data || []), ...(subtotal ? [subtotal] : [])]}
    />
  );
};

// * 計算製程表格的每一個 section 的值
const calculateValue = (item, header) => {
  // 根據不同欄位計算邏輯
  if (header.key === "totalCost") {
    return `${item.workHours * item.unitPrice}元`;
  }
  return `${item[header.key]}${header.unit || ""}`;
};

// * 渲染製程表格
const renderProcessTable = ({ processType, formData }) => {
  const config = PROCESS_TABLE_CONFIG[processType];
  if (!config) return null;

  return (
    <Box>
      {/* 渲染 summaryFields */}
      {renderSummaryFields(formData, config.summaryFields)}
      {/* 渲染每一個 section */}
      {config.sections.map((section, index) => (
        <Box key={index} sx={{ mt: 2 }}>
          {renderSection(section, formData)}
        </Box>
      ))}
      {/* 渲染最後的 subtotal */}
      {config.showFinalSubtotal && (
        <TotalCostContainer>{config.finalSubtotalLabel}</TotalCostContainer>
      )}
    </Box>
  );
};

export default renderProcessTable;
