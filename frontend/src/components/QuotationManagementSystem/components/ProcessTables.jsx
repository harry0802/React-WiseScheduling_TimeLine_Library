// src/components/Global/table/ProcessTables.js
import React from "react";
import { Typography, Box } from "@mui/material";
import QmsCasTable from "../../Global/table/QmsCasTable";
import { PROCESS_TABLE_CONFIG } from "../config/ProcessTableConfig_V1";
import styled from "styled-components";
import { convertToDisplayPercentage } from "../utility/commonUtils";

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

/**
 * @file ProcessTables.js
 * @description 製程表格組件,用於展示各類製程的成本明細
 */

/**
 * @namespace CostResultHandler
 * @description 成本計算結果的處理工具
 */

// 成本計算結果處理器
const CostResultHandler = {
  /**
   * @function getItemAmount
   * @description 獲取特定項目的金額
   * @param {Object} costSubtotalResult - 成本小計結果
   * @param {string} dataKey - 數據鍵值
   * @param {number} index - 項目索引
   * @returns {number} 項目金額
   */
  getItemAmount(costSubtotalResult, dataKey, index) {
    /*
      {
    materialCostResult: { totalCost: 4.684, amounts: [...] },
    packagingCostResult: { totalCost: 3.85, amounts: [...] },
    postProcessingCostResult: { totalCost: 0.1, amounts: [...] }
    SQOutPostProcessingCosts
    SQInPostProcessingCosts
  }
    */

    const amountMap = {
      // 運費
      SQMaterialCosts: costSubtotalResult?.materialCostResult?.amounts?.[index],
      // 包材費用
      SQPackagingCosts:
        costSubtotalResult?.packagingCostResult?.amounts?.[index],
      // 成型費用
      SQInjectionMoldingCosts: costSubtotalResult?.moldingCostResult,
      // 後製程費用
      SQInPostProcessingCosts:
        costSubtotalResult?.postProcessingCostResult?.amounts?.[index],
      // 委外後製程費用
      SQOutPostProcessingCosts:
        costSubtotalResult?.postProcessingCostResult?.amounts?.[index],
      // 運費
      SQFreights: costSubtotalResult?.transportAmounts?.[index],
      // 關稅
      SQCustomsDuties: costSubtotalResult?.freightAmounts?.[index],
    };

    return amountMap[dataKey] || 0;
  },

  /**
   * @function getSubtotalValue
   * @description 獲取特定成本類型的小計值
   * @param {string} costKey - 成本鍵值 !對應到 costSubtotalResult 中的 key
   * @param {Object} costSubtotalResult - 成本小計結果
   * @returns {number} 小計值
   */
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
      transportCost: transportSubtotal,
      freightCost: freightSubtotal,
      totalCost: totalCost,
      processingCost: postProcessingCostResult?.totalCost,
      inspectionCost: postProcessingCostResult?.totalCost,
    };

    return subtotalMap[costKey] || 0;
  },
};

/**
 * @namespace TableDataHandler
 * @description 表格數據處理工具
 */
const TableDataHandler = {
  /**
   * @function getCellValue
   * @description 處理表格單元格值
   * @param {Object} header - 表頭配置
   * @param {Object} item - 項目數據
   * @param {Object} costSubtotalResult - 成本小計結果
   * @param {string} dataKey - 數據鍵值 !對應到 formData 中的 key
   * @param {number} index - 項目索引
   * @returns {Object} 單元格配置對象
   */
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

  /**
   * @function generateTableData
   * @description 生成表格數據
   * @param {Object} section - 區段配置
   * @param {Object} formData - 表單數據
   * @param {Object} costSubtotalResult - 成本小計結果
   * @returns {Array<Object>} 表格數據陣列
   */
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
          span: section.headers.span,
        },
        {
          value: `${formatAmount(subtotalValue)} 元`,
          align: "right",
        },
      ],
    };
  },
};

/**
 * @component ProcessTable
 * @description 製程表格主組件
 * @param {Object} props
 * @param {string} props.processType - 製程類型
 * @param {Object} props.formData - 表單數據
 * @param {Object} props.costDetail - 成本明細
 */
const ProcessTable = ({ processType, formData, costDetail }) => {
  const config = PROCESS_TABLE_CONFIG[processType];

  const { costDetails, costSubtotal } = costDetail || {};

  const renderSummaryFields = () => {
    if (!config.summaryFields.length) return null;
    return (
      <Box>
        {config.summaryFields.map((field) => (
          <Typography key={field.key}>
            {field.label}:{" "}
            {convertToDisplayPercentage(
              formData?.SQMaterialCostSetting[field.key] || 0
            )}
            {field.unit}
          </Typography>
        ))}
      </Box>
    );
  };

  const renderSection = (section) => {
    const headers = [
      [
        {
          title: section.sectionTitle,
          colSpan: section.headers.length,
        },
      ],
      section.headers.map((header) => header.label),
    ];

    const tableData = TableDataHandler.generateTableData(
      section,
      formData,
      costDetails
    );

    const subtotalRow = TableDataHandler.generateSubtotalRow(
      section,
      costDetails
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
