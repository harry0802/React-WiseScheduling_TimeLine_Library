/**
 * @file DialogTitle.jsx
 * @description 對話框標題組件
 * @version 1.0.0
 */

import React from "react";
import { Box, Typography, CircularProgress, Chip } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import CustomStatusChip from "../CustomStatusChip";
import { getStatusColor } from "../../../../assets/schedule/industrialTheme";
import { getDialogTitle } from "../../../../utils/schedule/statusHelpers";
import { isHistoricalData } from "../../../../configs/validations/schedule/constants";
import StatusIcon from "./StatusIcon";

//! =============== 對話框標題組件 ===============
//* 專職處理標題顯示邏輯

/**
 * @component DialogTitle
 * @description 顯示對話框標題、狀態標籤和加載狀態
 * @param {string} status - 當前狀態
 * @param {boolean} isSubmitting - 是否正在提交
 * @param {string} mode - 對話框模式
 * @param {Object} item - 項目數據，用於判斷是否為歷史資料
 */
function DialogTitle({ status, isSubmitting, mode, item }) {
  // 🧠 Push Ifs Up - 在組件層級計算所需資訊
  const statusColor = getStatusColor(status);
  const title = getDialogTitle(isSubmitting, mode);
  const isHistorical = isHistoricalData(item);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="h6"
        component="span"
        sx={{ fontWeight: 600, fontSize: "18px" }}
      >
        {title}
      </Typography>
      
      {/* 🔧 只在需要時顯示加載指示器 */}
      {isSubmitting && (
        <CircularProgress size={24} sx={{ ml: 2 }} color="inherit" />
      )}
      
      {/* 🧠 歷史資料標籤 */}
      {isHistorical && (
        <Chip
          icon={<HistoryIcon />}
          label="歷史資料"
          size="small"
          color="warning"
          variant="outlined"
          sx={{ 
            ml: 2,
            fontSize: "12px",
            fontWeight: 500,
          }}
        />
      )}
      
      {/* 🔧 狀態標籤 */}
      <CustomStatusChip
        label={status}
        color={statusColor}
        icon={<StatusIcon status={status} />}
      />
    </Box>
  );
}

export default DialogTitle;
