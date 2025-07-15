/**
 * @version 2.2.1
 * @date 2025-07-15
 * @author 🎯 專業誠信 AI 協作助手
 * @description 收據/生產排程表格元件，已重構為現代 React 架構，並包含功能完整的自訂工具列與分頁器 (含錯誤修正)。
 */
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  GridToolbar,
  gridClasses,
  gridPageSelector,
  gridPageSizeSelector,
  gridRowCountSelector,
  useGridApiContext,
  useGridSelector,
  useGridRootProps, // 修正後的 import
} from "@mui/x-data-grid";
import {
  IconButton,
  Tooltip,
  Box,
  Pagination,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import {
  localeText as localeTextSetup,
  ProductionTableColumns as ReceiptColumns,
} from "./ReceipConfig";
import { StyledBox, StyledDataGrid, theme } from "./ReceipStyle";

//! =============== 1. 設定與常量 ===============

/**
 * 🧠 表格核心配置，集中管理以利維護。
 * @type {object}
 */
const TABLE_CONFIG = {
  base: {
    disableSelectionOnClick: true,
    density: "standard",
    columnBuffer: 5,
    columnThreshold: 3,
    rowBuffer: 5,
    rowThreshold: 3,
    disableVirtualization: true,
  },
  toolbar: {
    slots: {
      toolbar: GridToolbar,
      pagination: CustomPagination, // 合併自訂工具列與分頁器
    },
    slotProps: {
      toolbar: {
        showQuickFilter: true,
        quickFilterProps: {
          debounceMs: 500,
          variant: "outlined",
          multisearch: "true",
        },
      },
    },
  },
  pagination: {
    pagination: true,
    paginationMode: "server",
    pageSizeOptions: [10, 25, 50, 100],
  },
  selection: {
    rowSelectionModel: [],
    keepNonExistentRowsSelected: false,
  },
};

//! =============== 2. 類型與介面定義 ===============

/**
 * @typedef {object} RowData - 行數據的基本結構
 * @property {string} [productionScheduleId] - 生產排程 ID (父表格)
 * @property {string} [logTime] - 日誌時間 (子表格)
 * @property {number} _rowIndex - 原始索引
 */

/**
 * @typedef {RowData & { _stableId: string }} ProcessedRowData - 處理後的行數據
 */

/**
 * @typedef {object} ReceiptTableProps - ReceiptTable 元件的 props
 * @property {boolean} isParent - 是否為父表格
 * @property {RowData[]} [rows=[]] - 原始行數據
 * @property {boolean} [loading=false] - 是否處於加載狀態
 * @property {number} [totalCount=0] - 總行數 (用於伺服器分頁)
 * @property {number} [page=0] - 當前頁碼
 * @property {number} [pageSize=10] - 每頁行數
 * @property {(model: { page: number; pageSize: number }) => void} onPaginationModelChange - 分頁模型變更時的回調
 */

//! =============== 3. 工具函數區 ===============

/**
 * ✨ 生成穩定且唯一的行 ID，避免因數據不完整導致的 key 衝突。
 * @param {RowData} row - 行數據
 * @param {boolean} isParent - 是否為父表格
 * @returns {string} 穩定的行 ID
 */
function getStableRowId(row, isParent) {
  if (isParent) {
    return row.productionScheduleId || `parent_row_${row._rowIndex}`;
  }
  return row.logTime || `child_row_${row._rowIndex}`;
}

/**
 * 🛡️ 驗證並預處理行數據，確保每行都有穩定 ID 和原始索引。
 * @param {RowData[]} rows - 原始行數據
 * @param {boolean} isParent - 是否為父表格
 * @returns {ProcessedRowData[]} 經過驗證和處理的行數據
 */
function validateAndProcessRows(rows, isParent) {
  if (!Array.isArray(rows)) {
    console.warn("ReceiptTable: `rows` is not an array, using empty array.");
    return [];
  }

  return rows.map((row, index) => {
    const validRow = row && typeof row === "object" ? row : {};
    const rowWithIndex = { ...validRow, _rowIndex: index };

    return {
      ...rowWithIndex,
      _stableId: getStableRowId(rowWithIndex, isParent),
    };
  });
}

//! =============== 4. 核心功能實作 (Custom Hook) ===============

/**
 * 💡 核心邏輯 Hook，封裝了所有與表格相關的資料處理、事件處理和狀態衍生。
 * @param {object} params
 * @param {boolean} params.isParent - 是否為父表格
 * @param {RowData[]} params.rows - 原始行數據
 */
function useReceiptTable({ isParent, rows }) {
  const navigate = useNavigate();

  const processedRows = useMemo(
    () => validateAndProcessRows(rows, isParent),
    [rows, isParent]
  );

  const handleViewSubBatch = useCallback(
    (row) => {
      const scheduleId = row.productionScheduleId;
      if (!scheduleId) {
        console.warn(
          "ReceiptTable: Missing productionScheduleId for navigation",
          row
        );
        return;
      }
      navigate(`subBatch/${scheduleId}`);
    },
    [navigate]
  );

  const columns = useMemo(() => {
    if (!isParent) {
      return ReceiptColumns;
    }
    const actionColumn = {
      field: "viewSubBatch",
      headerName: "操作",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title="查看子批">
          <IconButton
            size="small"
            onClick={() => handleViewSubBatch(params.row)}
            disabled={!params.row.productionScheduleId}
          >
            <Visibility sx={{ color: theme.colors.text.secondary }} />
          </IconButton>
        </Tooltip>
      ),
    };
    return [actionColumn, ...ReceiptColumns];
  }, [isParent, handleViewSubBatch]);

  const getRowId = useCallback((row) => row._stableId, []);

  return { processedRows, columns, getRowId };
}

//! =============== 5. UI 元件實作 ===============

/**
 * ✨ 全功能自訂分頁元件
 * 提供「選擇每頁筆數」、「顯示範圍」與「頁碼跳轉」功能
 */
function CustomPagination() {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const rowCount = useGridSelector(apiRef, gridRowCountSelector);
  const pageSizeOptions = rootProps.pageSizeOptions || [];
  const totalPages = Math.ceil(rowCount / pageSize);

  const handlePageChange = useCallback(
    (event, newPage) => {
      apiRef.current.setPage(newPage - 1);
    },
    [apiRef]
  );

  const handlePageSizeChange = useCallback(
    (event) => {
      const newPageSize = Number(event.target.value);
      apiRef.current.setPageSize(newPageSize);
    },
    [apiRef]
  );

  if (rowCount === 0) {
    return (
      <Box sx={{ width: "100%", textAlign: "center", padding: "16px" }}>
        <Typography variant="body2" color="text.secondary">
          暫無資料
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "8px 16px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <FormControl sx={{ minWidth: 80 }} size="small">
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            variant="outlined"
          >
            {pageSizeOptions.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          {`顯示第 ${page * pageSize + 1} - ${Math.min(
            (page + 1) * pageSize,
            rowCount
          )} 筆，共 ${rowCount} 筆`}
        </Typography>
      </Box>

      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        count={totalPages}
        page={page + 1}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
      />
    </Box>
  );
}

/**
 * ReceiptTable 元件本身，現在是一個純粹的展示元件。
 * @param {ReceiptTableProps} props
 */
const ReceiptTable = ({
  isParent,
  rows = [],
  loading = false,
  totalCount = 0,
  page = 0,
  pageSize = 10,
  onPaginationModelChange,
}) => {
  const { processedRows, columns, getRowId } = useReceiptTable({
    isParent,
    rows,
  });

  const dataGridSx = useMemo(
    () => ({
      [`& .${gridClasses.cell}`]: { py: 1 },
      "& .MuiDataGrid-columnHeaders": {
        position: "sticky",
        left: 0,
        zIndex: 1,
        width: "100% !important",
      },
      "& .MuiDataGrid-virtualScroller": {
        "& .MuiDataGrid-row": {
          width: "100% !important",
        },
      },
      "& .MuiDataGrid-main": {
        overflow: "hidden",
      },
      scrollbarWidth: "thin",
      "&::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
      },
    }),
    []
  );

  return (
    <StyledBox>
      <StyledDataGrid
        {...TABLE_CONFIG.base}
        {...TABLE_CONFIG.toolbar}
        {...TABLE_CONFIG.pagination}
        {...TABLE_CONFIG.selection}
        rows={processedRows}
        columns={columns}
        loading={loading}
        rowCount={totalCount}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={onPaginationModelChange}
        getRowId={getRowId}
        sx={dataGridSx}
        localeText={localeTextSetup}
      />
    </StyledBox>
  );
};

export default ReceiptTable;
