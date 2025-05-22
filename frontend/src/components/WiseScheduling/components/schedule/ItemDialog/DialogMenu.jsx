/**
 * @file DialogMenu.jsx
 * @description 對話框操作菜單組件
 * @version 1.0.0
 */

import React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { MACHINE_STATUS } from "../../../configs/validations/schedule/constants";

//! =============== 對話框菜單組件 ===============
//* 專職處理對話框的操作菜單

/**
 * @component DialogMenu
 * @description 對話框操作菜單組件
 * @param {HTMLElement} anchorEl - 菜單錨點元素
 * @param {Function} onClose - 關閉菜單回調
 * @param {string} mode - 對話框模式
 * @param {string} currentStatus - 當前狀態
 * @param {boolean} isOrder - 是否為訂單類型
 * @param {boolean} isOnGoing - 是否正在進行中
 * @param {Function} onShowStatusChange - 顯示狀態切換回調
 * @param {Function} onDelete - 刪除操作回調
 */
function DialogMenu({
  anchorEl,
  onClose,
  mode,
  currentStatus,
  isOrder,
  isOnGoing,
  onShowStatusChange,
  onDelete,
}) {
  // 🧠 Push Ifs Up - 在頂層決定菜單項目顯示邏輯
  const isStatusSwitchable = currentStatus !== MACHINE_STATUS.ORDER_CREATED;
  const isEditMode = mode === "edit";
  const shouldShowStatusChange = isEditMode && isStatusSwitchable;
  const shouldShowDelete = isEditMode && !isOrder;
  const shouldShowDivider = shouldShowStatusChange && shouldShowDelete;

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {/* 🔧 狀態切換選項 */}
      {shouldShowStatusChange && (
        <MenuItem onClick={onShowStatusChange}>
          <ListItemIcon>
            <SwapHorizIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="變更狀態"
            primaryTypographyProps={{
              fontSize: "16px",
              fontWeight: 500,
            }}
          />
        </MenuItem>
      )}

      {/* 🔧 分隔線 */}
      {shouldShowDivider && <Divider sx={{ my: 1 }} />}

      {/* 🔧 刪除選項 */}
      {shouldShowDelete && (
        <MenuItem
          onClick={onDelete}
          sx={{ color: "error.main" }}
          disabled={isOnGoing}
        >
          <ListItemIcon>
            <DeleteIcon
              fontSize="small"
              color={isOnGoing ? "disabled" : "error"}
            />
          </ListItemIcon>
          <ListItemText
            primary="刪除項目"
            primaryTypographyProps={{
              fontSize: "16px",
              fontWeight: 500,
            }}
          />
        </MenuItem>
      )}
    </Menu>
  );
}

export default DialogMenu;
