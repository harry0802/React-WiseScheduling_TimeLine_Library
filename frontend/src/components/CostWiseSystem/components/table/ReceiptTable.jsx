import React, { useCallback, useMemo } from "react";
import { GridToolbar, gridClasses } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  localeText as localeTextSetup,
  ProductionTableColumns as ReceiptColumns,
} from "./ReceipConfig";
import { StyledBox, StyledDataGrid, theme } from "./ReceipStyle";

// 🧠 表格配置
const TABLE_CONFIG = {
  base: {
    disableSelectionOnClick: true,
    disableExportButton: true,
    density: "standard",
    columnBuffer: 5,
    columnThreshold: 3,
    rowBuffer: 5,
    rowThreshold: 3,
  },
  toolbar: {
    slots: { toolbar: GridToolbar },
    slotProps: {
      toolbar: {
        showQuickFilter: true,
        quickFilterProps: {
          debounceMs: 500,
          variant: "outlined",
          // 啟用多欄位搜尋
          multiSearch: true,
          // 可選: 設定搜尋分隔符
          quickFilterParser: (searchInput) => {
            return searchInput.split(",").map((value) => value.trim());
          },
        },
        printOptions: { disableToolbarButton: true },
        csvOptions: { disableToolbarButton: true },
      },
    },
  },
};

const ReceiptTable = ({
  isParent,
  rows = [],
  loading = false,
  totalCount = 0,
  page = 0,
  pageSize = 10,
  onPaginationModelChange,
}) => {
  const navigate = useNavigate();

  // ✨ 查看子批次處理
  const handleViewSubBatch = useCallback(
    (row) => {
      navigate(`subBatch/${row.productionScheduleId}`);
    },
    [navigate]
  );

  // 💡 使用 useMemo 優化列配置
  const columns = useMemo(() => {
    const baseColumns = [...ReceiptColumns];

    if (!isParent) return baseColumns;

    return [
      {
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
            >
              <Visibility sx={{ color: theme.colors.text.secondary }} />
            </IconButton>
          </Tooltip>
        ),
      },
      ...baseColumns,
    ];
  }, [isParent, handleViewSubBatch]);

  return (
    <StyledBox>
      <StyledDataGrid
        {...TABLE_CONFIG.base}
        {...TABLE_CONFIG.toolbar}
        getRowId={(row) => row.productionScheduleId}
        rows={rows}
        columns={columns}
        loading={loading}
        rowCount={totalCount}
        pagination
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[10, 25, 50, 100]}
        sx={{
          [`& .${gridClasses.cell}`]: { py: 1 },
        }}
        localeText={localeTextSetup}
      />
    </StyledBox>
  );
};

export default ReceiptTable;
