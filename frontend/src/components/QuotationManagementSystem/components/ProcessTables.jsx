// src/components/Global/table/ProcessTables.js
import React from "react";
import { Typography, Box } from "@mui/material";
import QmsCasTable from "../../Global/table/QmsCasTable";
import { PROCESS_TABLE_CONFIG } from "../config/ProcessTableConfig_V1";
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

// 處理金額顯示的工具函數
const formatAmount = (amount) => `${(amount || 0).toFixed(3)}`;

// 成本計算結果處理器
const CostResultHandler = {
  // 獲取項目金額
  getItemAmount(costSubtotalResult, dataKey, index) {
    const amountMap = {
      todoItems_運輸費用: costSubtotalResult?.transportAmounts?.[index],
      todoItems_貨運與關稅: costSubtotalResult?.freightAmounts?.[index],
      todoItems_原物料成本:
        costSubtotalResult?.materialCostResult?.amounts?.[index],
      todoItems_包裝材料費:
        costSubtotalResult?.packagingCostResult?.amounts?.[index],
    };
    return amountMap[dataKey] || 0;
  },

  // 獲取小計值
  getSubtotalValue(costKey, costSubtotalResult) {
    if (!costSubtotalResult) return 0;

    const {
      materialCostResult,
      packagingCostResult,
      postProcessingCostResult,
      transportSubtotal,
      freightSubtotal,
      totalCost,
    } = costSubtotalResult;
    const subtotalMap = {
      materialCost: materialCostResult?.totalCost,
      packagingCost: packagingCostResult?.totalCost,
      moldingCost: postProcessingCostResult,
      transportCost: transportSubtotal,
      freightCost: freightSubtotal,
      totalCost: totalCost,
    };

    return subtotalMap[costKey] || 0;
  },
};

// 表格數據處理器
const TableDataHandler = {
  // 處理單元格值
  getCellValue(header, item, costSubtotalResult, dataKey, index) {
    if (header.key === "amount") {
      const amount = CostResultHandler.getItemAmount(
        costSubtotalResult,
        dataKey,
        index
      );
      return {
        value: `${formatAmount(amount)}${header.unit || ""}`,
        align: "right",
      };
    }

    return {
      value: `${item[header.key] || 0}${header.unit || ""}`,
      align: "right",
    };
  },

  // 生成表格數據
  generateTableData(section, formData, costSubtotalResult) {
    if (!section.dataKey) {
      return [
        {
          cells: section.headers.map((header) => {
            // 如果是 amount 欄位，使用 costKey 獲取對應的金額
            if (header.key === "amount") {
              const amount = CostResultHandler.getSubtotalValue(
                section.costKey,
                costSubtotalResult
              );
              return {
                value: `${formatAmount(amount)}${header.unit || ""}`,
                align: "right",
              };
            }
            return {
              value: `${formData[header.key] || 0}${header.unit || ""}`,
              align: "right",
            };
          }),
        },
      ];
    }

    const items = formData[section.dataKey] || [];
    return items.map((item, index) => ({
      cells: section.headers.map((header) =>
        this.getCellValue(
          header,
          item,
          costSubtotalResult,
          section.dataKey,
          index
        )
      ),
    }));
  },

  // 生成小計行
  generateSubtotalRow(section, costSubtotalResult) {
    if (!section.showSubtotal) return null;
    const subtotalValue = CostResultHandler.getSubtotalValue(
      section.costKey,
      costSubtotalResult
    );
    return {
      isTotal: true,
      cells: [
        {
          value: section.subtotalLabel,
          colSpan: section.headers.length - 1,
        },
        {
          value: `${formatAmount(subtotalValue)} 元`,
          align: "right",
        },
      ],
    };
  },
};

// * 主要組件
const ProcessTable = ({ processType, formData, costDetail }) => {
  console.log("🚀 ~ ProcessTable ~ formData:", formData);
  const config = PROCESS_TABLE_CONFIG[processType];
  if (!config) return null;

  const { costSubtotalResult, costSubtotal } = costDetail || {};

  const renderSummaryFields = () => (
    <Box>
      {config.summaryFields.map((field) => (
        <Typography key={field.key}>
          {field.label}: {formData[field.key] || 0}
          {field.unit}
        </Typography>
      ))}
    </Box>
  );

  const renderSection = (section) => {
    const headers = [
      [{ title: section.sectionTitle, colSpan: section.headers.length }],
      section.headers.map((header) => header.label),
    ];

    const tableData = TableDataHandler.generateTableData(
      section,
      formData,
      costSubtotalResult
    );

    const subtotalRow = TableDataHandler.generateSubtotalRow(
      section,
      costSubtotalResult
    );

    return (
      <QmsCasTable
        headers={headers}
        data={[...tableData, ...(subtotalRow ? [subtotalRow] : [])]}
      />
    );
  };

  return (
    <Box>
      {renderSummaryFields()}

      {config.sections.map((section, index) => (
        <Box key={index} sx={{ mt: 2 }}>
          {renderSection(section)}
        </Box>
      ))}

      {config.showFinalSubtotal && (
        <TotalCostContainer>
          <span>{config.finalSubtotalLabel}</span>
          <span>{formatAmount(costSubtotal)} 元</span>
        </TotalCostContainer>
      )}
    </Box>
  );
};

export default ProcessTable;
