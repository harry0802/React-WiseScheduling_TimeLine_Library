/**
 * @file ErrorNotification.jsx
 * @description 錯誤通知組件
 * @version 1.0.0
 */

import React from "react";
import { Snackbar, Alert } from "@mui/material";

//! =============== 錯誤通知組件 ===============
//* 專職處理錯誤訊息顯示

/**
 * @component ErrorNotification
 * @description 顯示錯誤通知的 Snackbar 組件
 * @param {string|null} error - 錯誤訊息
 * @param {Function} onClose - 關閉通知回調
 */
function ErrorNotification({ error, onClose }) {
  return (
    <Snackbar
      open={!!error}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity="error"
        onClose={onClose}
        sx={{
          fontSize: "16px",
          "& .MuiAlert-icon": {
            fontSize: "24px",
          },
        }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
}

export default ErrorNotification;
