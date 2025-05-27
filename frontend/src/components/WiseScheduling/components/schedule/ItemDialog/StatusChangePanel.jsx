/**
 * @file StatusChangePanel.jsx
 * @description 狀態變更控制面板組件
 * @version 1.0.0
 */

import React from "react";
import { Paper, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { SecondaryButton } from "../styles/DialogStyles";
import { 
  MACHINE_STATUS,
  canShowStatusChangeButton 
} from "../../../configs/validations/schedule/constants";

//! =============== 狀態變更面板組件 ===============
//* 專職處理狀態切換的 UI 面板

/**
 * @component StatusChangePanel
 * @description 狀態變更控制面板
 * @param {string} status - 當前狀態
 * @param {boolean} isSubmitting - 是否正在提交
 * @param {Function} onShowStatusDialog - 顯示狀態切換對話框回調
 * @param {Object} item - 項目數據，用於判斷是否為歷史資料
 */
function StatusChangePanel({ status, isSubmitting, onShowStatusDialog, item }) {
  // 🧠 Push Ifs Up - 使用通用判斷函數決定是否顯示面板
  if (!canShowStatusChangeButton(item)) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        p: 2,
        display: "flex",
        alignItems: "center",
        border: "2px solid #E0E0E0",
        borderRadius: "6px",
        backgroundColor: "#F5F5F5",
      }}
    >
      <SecondaryButton
        onClick={onShowStatusDialog}
        startIcon={<SwapHorizIcon />}
        disabled={isSubmitting}
        sx={{
          mr: 2,
          fontSize: "16px",
        }}
      >
        切換狀態
      </SecondaryButton>
      
      <Typography
        variant="body1"
        color="#424242"
        fontSize="16px"
        fontWeight={500}
      >
        當前狀態: {status}
      </Typography>

      {/* 🔧 狀態轉換提示 */}
      {status !== MACHINE_STATUS.IDLE && (
        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
          注意：當前狀態只能切換回待機狀態
        </Typography>
      )}
    </Paper>
  );
}

export default StatusChangePanel;
