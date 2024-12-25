import React from "react";
import { Paper, IconButton, TableRow, TableBody } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { columns } from "./columns";
import {
  StyledTable,
  StyledTableHead,
  StyledTableCell,
  StyledTableRow,
  StyledHeaderCell,
  HeaderContent,
  headerColors,
  groupMappings,
  StyledTableContainer,
} from "./styles";

//! =============== 1. 常量定義 ===============

/**
 * @component MaintenanceTable
 * @description 維護表格組件，用於展示和編輯維護相關的數據
 *
 * @param {Object} props
 * @param {Object} props.config - 表格配置，包含行數據
 * @param {Function} props.onEditInspector - 編輯檢查員信息的回調
 * @param {Function} props.onEditReinspector - 編輯複查員信息的回調
 * @param {Function} props.onEditApprover - 編輯核准人信息的回調
 * @param {boolean} props.useFixedRows - 是否使用固定行
 * @param {Array} props.fixedItems - 固定行項目配置
 *
 * @example
 * // 基礎使用示例
 * <MaintenanceTable
 *   config={{ rows: [...] }}
 *   onEditInspector={() => {}}
 *   onEditReinspector={() => {}}
 *   onEditApprover={() => {}}
 *   useFixedRows={true}
 *   fixedItems={MAINTENANCE_ITEMS}
 * />
 *
 * @notes
 * - 表格標題顏色根據欄位分組自動分配
 * - 可編輯欄位顯示編輯圖標
 */

//
const MaintenanceTable = ({
  config,
  onEditInspector,
  onEditReinspector,
  onEditApprover,
  useFixedRows = false,
  fixedItems,
}) => {
  //! =============== 2. 輔助函數 ===============
  /**
   * @function getHeaderColor
   * @description 根據欄位名獲取對應的標題顏色
   * @param {string} field - 欄位名稱
   * @returns {string} 顏色代碼
   */
  const getHeaderColor = (field) => {
    return headerColors[groupMappings[field]] || headerColors.maintenance;
  };

  /**
   * @function editableFields
   * @description 可編輯欄位與對應處理函數的映射
   */
  const editableFields = {
    inspectionDate: onEditInspector,
    reinspectionDate: onEditReinspector,
    approvalDate: onEditApprover,
  };

  //! =============== 3. 渲染邏輯 ===============
  //* 渲染表格標題
  const renderHeaders = () => (
    <StyledTableHead>
      <TableRow>
        {columns.map((column, index) => (
          <StyledHeaderCell
            key={index}
            $backgroundColor={getHeaderColor(column.field)}
            $width={column.width}
          >
            <HeaderContent>
              {column.headerName}
              {column.editable && config?.rows?.length > 0 && (
                <IconButton
                  size="medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    editableFields[column.field]?.(config.rows[0]);
                  }}
                  sx={{ color: "#fff", marginLeft: 1 }}
                >
                  <EditIcon fontSize="large" />
                </IconButton>
              )}
            </HeaderContent>
          </StyledHeaderCell>
        ))}
      </TableRow>
    </StyledTableHead>
  );

  //* 渲染表格內容
  const renderBody = () => {
    if (useFixedRows) {
      return (
        <TableBody>
          {fixedItems.map((item, rowIndex) => {
            const matchingRow =
              config?.rows?.find(
                (row) => row.maintenanceCheckItem === item.id
              ) || {};

            return (
              <StyledTableRow key={rowIndex}>
                {columns.map((column, colIndex) => {
                  let cellContent = matchingRow[column.field];
                  if (column.field === "maintenanceCheckItem") {
                    cellContent = item.label;
                  } else if (column.field === "maintenanceMethod") {
                    cellContent = item.method;
                  }

                  return (
                    <StyledTableCell
                      key={`${rowIndex}-${colIndex}`}
                      $field={column.field}
                    >
                      {cellContent}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            );
          })}
        </TableBody>
      );
    }

    return (
      <TableBody>
        {config?.rows?.map((row, rowIndex) => (
          <StyledTableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <StyledTableCell
                key={`${rowIndex}-${colIndex}`}
                $field={column.field}
              >
                {row[column.field]}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        ))}
      </TableBody>
    );
  };

  //! =============== 4. 組件主體 ===============
  return (
    <StyledTableContainer component={Paper}>
      <StyledTable>
        {renderHeaders()}
        {renderBody()}
      </StyledTable>
    </StyledTableContainer>
  );
};

export default MaintenanceTable;
