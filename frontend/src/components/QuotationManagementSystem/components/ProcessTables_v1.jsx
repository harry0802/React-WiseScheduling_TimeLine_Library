import React from "react";
import { Typography, Box } from "@mui/material";
import QmsCasTable from "../../Global/table/QmsCasTable";
import { PROCESS_TYPES, PROCESS_TYPE_OPTIONS } from "../config/processTypes_v1";
import styled from "styled-components";

/**
 * 樣式定義
 */
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

/**
 * 工具函數
 */
const utils = {
  formatAmount: (amount) => (amount || 0).toFixed(3),

  getProcessInfo: (processCategory, processSN) => {
    const options = PROCESS_TYPE_OPTIONS[processCategory] || [];
    return options.find((opt) => opt.value === processSN) || {};
  },
};

/**
 * 成本計算結果處理器
 */
const CostHandler = {
  // 取得成本項目金額
  getItemAmount(costs = {}, type, index) {
    const amountMap = {
      materialCosts: costs.materialCostResult?.amounts?.[index] || 0,
      packagingCosts: costs.packagingCostResult?.amounts?.[index] || 0,
      injectionMoldingCosts:
        costs.injectionMoldingResult?.amounts?.[index] || 0,
      inPostProcessingCosts:
        costs.inPostProcessingResult?.amounts?.[index] || 0,
      outPostProcessingCosts:
        costs.outPostProcessingResult?.amounts?.[index] || 0,
    };
    return amountMap[type] || 0;
  },

  // 取得小計金額
  getSubtotalAmount(costs = {}, type) {
    const subtotalMap = {
      materialCosts: costs.materialCostResult?.totalCost,
      packagingCosts: costs.packagingCostResult?.totalCost,
      injectionMoldingCosts: costs.injectionMoldingResult?.totalCost,
      inPostProcessingCosts: costs.inPostProcessingResult?.totalCost,
      outPostProcessingCosts: costs.outPostProcessingResult?.totalCost,
    };
    return subtotalMap[type] || 0;
  },
};

/**
 * 表格資料處理器
 */
const TableHandler = {
  // 處理基本資訊
  getBasicInfo(formData) {
    const { processCategory, processSN } = formData;
    const processInfo = utils.getProcessInfo(processCategory, processSN);
    console.log("🔥🔥🔥🔥 ~ getBasicInfo ~ processInfo:", processInfo);
    return [
      { label: "製程類別", value: processCategory },
      { label: "製程編號", value: processSN },
      { label: "製程名稱", value: processInfo.name },
    ];
  },

  // 處理成本表格資料
  getCostTableData(type, formData, costs) {
    const items = formData[type] || [];
    const headers = this.getHeaders(type);

    return items.map((item, index) => ({
      cells: headers.map((header) => {
        if (header.key === "amount") {
          return {
            value: `${utils.formatAmount(
              CostHandler.getItemAmount(costs, type, index)
            )}${header.unit || ""}`,
            align: "right",
          };
        }

        return {
          value: `${item[header.key] || 0}${header.unit || ""}`,
          align: header.align || "left",
        };
      }),
    }));
  },

  // 取得表格標頭
  getHeaders(type) {
    const commonHeaders = [
      { key: "amount", label: "金額", unit: "元", align: "right" },
    ];

    const headerMap = {
      materialCosts: [
        { key: "materialSN", label: "物料編號" },
        { key: "materialName", label: "物料名稱" },
        { key: "weight", label: "重量", unit: "g", align: "right" },
        { key: "unitPrice", label: "單價", unit: "元", align: "right" },
        ...commonHeaders,
      ],
      packagingCosts: [
        { key: "materialSN", label: "物料編號" },
        { key: "materialName", label: "物料名稱" },
        { key: "quantity", label: "數量", unit: "件", align: "right" },
        { key: "unitPrice", label: "單價", unit: "元", align: "right" },
        ...commonHeaders,
      ],
      injectionMoldingCosts: [
        { key: "workHoursRatio", label: "工時比例", unit: "%", align: "right" },
        { key: "cycleTime", label: "成型週期", unit: "秒", align: "right" },
        { key: "moldCavity", label: "模具穴數", unit: "個", align: "right" },
        { key: "unitPrice", label: "單價", unit: "元/小時", align: "right" },
        ...commonHeaders,
      ],
      inPostProcessingCosts: [
        { key: "workSecond", label: "工時", unit: "秒", align: "right" },
        { key: "unitPrice", label: "單價", unit: "元/秒", align: "right" },
        ...commonHeaders,
      ],
      outPostProcessingCosts: [
        { key: "unitPrice", label: "單價", unit: "元", align: "right" },
        ...commonHeaders,
      ],
    };

    return headerMap[type] || [];
  },

  // 生成小計行
  getSubtotalRow(type, costs) {
    const subtotal = CostHandler.getSubtotalAmount(costs, type);
    const headers = this.getHeaders(type);

    return {
      isTotal: true,
      cells: [
        { value: "小計", colSpan: headers.length - 1 },
        { value: `${utils.formatAmount(subtotal)} 元`, align: "right" },
      ],
    };
  },
};

/**
 * ProcessTable 組件
 */
const ProcessTable = ({ formData, costDetail }) => {
  const { costSubtotalResult: costs, costSubtotal } = costDetail || {};
  console.log("🚀 ~ ProcessTable ~ costDetail:", costDetail);
  const { sections = {} } = formData;

  // 渲染基本資訊
  const renderBasicInfo = () => {
    const basicInfo = TableHandler.getBasicInfo(formData);
    return (
      <Box>
        {basicInfo.map(({ label, value }) => (
          <Typography key={label}>
            {label}: {value}
          </Typography>
        ))}
      </Box>
    );
  };

  // 渲染成本表格
  const renderCostTable = (type, title) => {
    if (!formData[type]?.length) return null;

    const headers = TableHandler.getHeaders(type);
    const tableHeaders = [
      [{ title, colSpan: headers.length }],
      headers.map((h) => h.label),
    ];

    const tableData = [
      ...TableHandler.getCostTableData(type, formData, costs),
      TableHandler.getSubtotalRow(type, costs),
    ];

    return (
      <Box sx={{ mt: 2 }}>
        <QmsCasTable headers={tableHeaders} data={tableData} />
      </Box>
    );
  };

  return (
    <Box>
      {renderBasicInfo()}

      {Object.entries(sections).map(([type, section]) =>
        renderCostTable(type, section.title)
      )}

      <TotalCostContainer>
        <span>總成本</span>
        <span>{utils.formatAmount(costSubtotal)} 元</span>
      </TotalCostContainer>
    </Box>
  );
};

export default ProcessTable;
