/**
 * @file StatusIcon.jsx
 * @description 狀態圖標組件
 * @version 1.0.0
 */

import React from "react";
import { Badge } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BuildIcon from "@mui/icons-material/Build";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { MACHINE_STATUS } from "../../../../configs/validations/schedule/constants";

//! =============== 狀態圖標組件 ===============
//* 根據狀態顯示對應的圖標

/**
 * @component StatusIcon
 * @description 根據機台狀態顯示對應的圖標和徽章
 * @param {string} status - 機台狀態
 */
function StatusIcon({ status }) {
  // 🧠 Push Ifs Up - 使用 switch 在頂層決定圖標
  switch (status) {
    case MACHINE_STATUS.ORDER_CREATED:
      return (
        <Badge color="primary" variant="dot">
          <AccessTimeIcon fontSize="medium" />
        </Badge>
      );
      
    case MACHINE_STATUS.IDLE:
      return (
        <Badge color="default" variant="dot">
          <AccessTimeIcon fontSize="medium" />
        </Badge>
      );
      
    case MACHINE_STATUS.SETUP:
      return (
        <Badge color="warning" variant="dot">
          <BuildIcon fontSize="medium" />
        </Badge>
      );
      
    case MACHINE_STATUS.STOPPED:
      return (
        <Badge color="error" variant="dot">
          <WarningIcon fontSize="medium" />
        </Badge>
      );
      
    default:
      return (
        <Badge color="success" variant="dot">
          <CheckCircleIcon fontSize="medium" />
        </Badge>
      );
  }
}

export default StatusIcon;
