/**
 * @file DialogTitle.jsx
 * @description 對話框標題組件
 * @version 1.0.0
 */

import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import CustomStatusChip from "../CustomStatusChip";
import { getStatusColor } from "../../styles/industrialTheme";
import { getDialogTitle } from "../../../../utils/schedule/statusHelpers";
import StatusIcon from "./StatusIcon";

//! =============== 對話框標題組件 ===============
//* 專職處理標題顯示邏輯

/**
 * @component DialogTitle
 * @description 顯示對話框標題、狀態標籤和加載狀態
 * @param {string} status - 當前狀態
 * @param {boolean} isSubmitting - 是否正在提交
 * @param {string} mode - 對話框模式
 */
function DialogTitle({ status, isSubmitting, mode }) {
  // 🧠 Push Ifs Up - 在組件層級計算所需資訊
  const statusColor = getStatusColor(status);
  const title = getDialogTitle(isSubmitting, mode);

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
