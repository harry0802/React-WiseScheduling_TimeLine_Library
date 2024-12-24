//* Material-UI 表格組件的樣式化定義

import styled from "styled-components";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

//! =============== 1. 設定與常量 ===============
//* 定義表格相關的顏色常量和群組映射

/**
 * @constant {Object} headerColors
 * @description 定義表格標題列的背景顏色映射
 */
export const headerColors = {
  maintenance: "#186C98", // 維護相關欄位
  result: "#C88400", // 結果相關欄位
  review: "#186C98", // 審查相關欄位
  approve: "#18983C", // 核准相關欄位
};

/**
 * @constant {Object} groupMappings
 * @description 定義欄位與群組的對應關係
 */
export const groupMappings = {
  maintenanceCheckItem: "maintenance",
  maintenanceMethod: "maintenance",
  inspectionResult: "result",
  inspector: "result",
  inspectionDate: "result",
  reinspectionResult: "review",
  reinspector: "review",
  reinspectionDate: "review",
  approver: "approve",
  approvalDate: "approve",
  approveResult: "approve",
};

/**
 * @constant {Object} cellColors
 * @description 定義表格單元格的淺色背景顏色
 */
export const cellColors = {
  maintenance: "rgba(24, 108, 152, 0.1)", // #186C98 的淺色版
  result: "rgba(200, 132, 0, 0.1)", // #C88400 的淺色版
  review: "rgba(24, 108, 152, 0.1)", // #186C98 的淺色版
  approve: "rgba(24, 152, 60, 0.1)", // #18983C 的淺色版
};

//! =============== 2. 樣式組件 ===============

/**
 * @component StyledTableContainer
 * @description 自定義表格容器組件
 * @notes
 * - 設定最大寬度和捲動行為
 * - 統一字體大小和邊框樣式
 */
export const StyledTableContainer = styled(TableContainer)`
  && {
    margin-top: 16px;
    max-width: 100%;
    overflow-x: auto;
    font-size: 20px;
    border: 1px solid rgba(224, 224, 224, 1);
  }
`;

/**
 * @component StyledTable
 * @description 基礎表格組件
 */
export const StyledTable = styled(Table)`
  min-width: 800px;
`;

/**
 * @component StyledTableHead
 * @description 表格標題列組件
 */
export const StyledTableHead = styled(TableHead)`
  && {
    height: 40px;
    max-height: 40px;
    font-size: 20px;

    .MuiTableRow-head {
      height: 40px;
      max-height: 40px;
    }

    .MuiTableCell-head {
      height: 40px;
      max-height: 40px;
      padding-top: 0;
      padding-bottom: 0;
      line-height: 40px;
    }
  }
`;

/**
 * @component StyledTableCell
 * @description 通用表格單元格組件
 * @param {boolean} $isHeader - 是否為標題單元格
 */
export const StyledTableCell = styled(TableCell)`
  && {
    padding: 12px;
    position: relative;
    background-color: ${(props) => {
      if (!props.$field) return "inherit";
      const group = groupMappings[props.$field];
      return props ? cellColors[group] : "inherit";
    }};
    color: ${(props) => (props.$isHeader ? "white" : "#8F8F8F")};
    border: 1px solid rgba(224, 224, 224, 1);
    font-weight: ${(props) => (props.$isHeader ? "bold" : 400)};
    font-size: 1.125rem;
  }
`;

/**
 * @component StyledTableRow
 * @description 表格行組件，包含隔行變色和懸停效果
 */
export const StyledTableRow = styled(TableRow)`
  && {
    height: 3.125rem;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

/**
 * @component StyledHeaderCell
 * @description 自定義標題單元格組件
 * @param {number} $width - 單元格寬度
 * @param {string} $backgroundColor - 背景顏色
 */
export const StyledHeaderCell = styled(StyledTableCell)`
  && {
    width: ${(props) => props.$width}px;
    min-width: ${(props) => props.$width}px;
    font-size: 20px;
    color: #fff;
    font-weight: 400;
    position: relative;
    background-color: ${(props) => props.$backgroundColor || "#186C98"};
  }
`;

/**
 * @component HeaderContent
 * @description 標題內容器組件
 */
export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
