/**
 * @file DialogActions.jsx
 * @description 對話框操作按鈕組件
 * @version 1.0.0
 */

import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//! =============== 對話框操作按鈕組件 ===============
//* 專職處理標題欄的操作按鈕

/**
 * @component DialogActions
 * @description 對話框標題欄的操作按鈕（更多選項、關閉）
 * @param {string} mode - 對話框模式
 * @param {Function} onMenuOpen - 開啟選單回調
 * @param {Function} onClose - 關閉對話框回調
 * @param {boolean} isSubmitting - 是否正在提交
 */
function DialogActions({ mode, onMenuOpen, onClose, isSubmitting }) {
  // 🧠 Push Ifs Up - 在頂層決定是否顯示更多操作按鈕
  const showMoreActions = mode !== "view";

  return (
    <Box>
      {/* 🔧 只在非查看模式顯示更多操作 */}
      {showMoreActions && (
        <Tooltip title="更多操作">
          <IconButton
            aria-label="更多操作"
            onClick={onMenuOpen}
            sx={{
              color: "inherit",
              padding: "8px",
            }}
          >
            <MoreVertIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      )}
      
      {/* 🔧 關閉按鈕 */}
      <IconButton
        aria-label="關閉"
        onClick={onClose}
        disabled={isSubmitting}
        sx={{
          color: "inherit",
          padding: "8px",
          ml: 1,
        }}
      >
        <CloseIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
}

export default DialogActions;
