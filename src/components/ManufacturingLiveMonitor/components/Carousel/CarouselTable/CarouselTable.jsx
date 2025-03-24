// src/components/ProductionTable/ProductionTable.jsx
import React, { useState, useEffect, useMemo } from "react";
import { ScrollBoard } from "@iimm/data-view-react";

import {
  DEFAULT_HEADER,
  DEFAULT_STYLE,
  DEFAULT_COLUMN_WIDTHS,
  DEFAULT_COLUMN_ALIGNS,
  DEFAULT_TABLE_CONFIG,
} from "./config";
import { transformApiData } from "./transformers";
import { createScrollBoardConfig } from "./utils";
import styled from "styled-components";

const TheScrollBoard = styled(ScrollBoard)`
  width: 100%;
  height: 100%;
  .row-item {
    /* height: ; */
  }
`;

// 主元件
const ProductionTable = (props) => {
  const {
    width = "100%",
    height = "220px",
    initialData = [],
    header = DEFAULT_HEADER,
    fieldMapping,
    formatters,
    statusRules,
    defaultStatus = "normal",
    refreshInterval = 0,
    tableStyle = {},
    scrollBoardConfig = {},
    columnWidths = DEFAULT_COLUMN_WIDTHS,
    columnAligns = DEFAULT_COLUMN_ALIGNS,
    dataProcessor,
    onRowClick,
  } = props;

  const [tableConfig, setTableConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 數據轉換選項
  const transformOptions = useMemo(
    () => ({
      header,
      fieldMapping,
      formatters,
      statusRules,
      defaultStatus,
      dataProcessor,
    }),
    [
      header,
      fieldMapping,
      formatters,
      statusRules,
      defaultStatus,
      dataProcessor,
    ]
  );

  // 簡化的數據處理邏輯
  useEffect(() => {
    // 處理資料並設置配置
    const processData = () => {
      try {
        const { header: dataHeader, data: transformedData } = transformApiData(
          initialData,
          transformOptions
        );

        const config = createScrollBoardConfig(dataHeader, transformedData, {
          columnWidths,
          columnAligns,
          scrollBoardConfig,
        });
        setTableConfig(config);
      } catch (error) {
        console.error("數據處理錯誤:", error);
        setTableConfig({
          header,
          data: [["數據處理失敗，請重試"]],
          ...DEFAULT_TABLE_CONFIG,
        });
      } finally {
        setIsLoading(false);
      }
    };

    processData();

    // 定時刷新邏輯
    let timer;
    if (refreshInterval > 0) {
      timer = setInterval(processData, refreshInterval);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [initialData]);

  // 樣式設置
  const combinedStyle = {
    width,
    height,
    ...DEFAULT_STYLE,
    ...tableStyle,
  };
  // 載入狀態
  if (isLoading || !tableConfig) {
    return <div style={combinedStyle}>載入中...</div>;
  }

  // 渲染
  return (
    <TheScrollBoard
      config={tableConfig}
      style={combinedStyle}
      onClick={onRowClick}
    />
  );
};

export default ProductionTable;
