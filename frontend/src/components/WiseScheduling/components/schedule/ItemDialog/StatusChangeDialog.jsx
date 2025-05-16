/**
 * @file StatusChangeDialog.jsx
 * @description 改進的狀態切換對話框，提供更直觀的狀態選擇體驗 - 優化版
 * @version 2.0.0
 */

import React from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Tooltip,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TimerIcon from "@mui/icons-material/Timer";
import BuildIcon from "@mui/icons-material/Build";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ErrorIcon from "@mui/icons-material/Error";
import DescriptionIcon from "@mui/icons-material/Description";

// 導入樣式組件
import {
  IndustrialDialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  SecondaryButton,
} from "../styles/DialogStyles";
import { styled } from "@mui/material/styles";
import { industrialTheme } from "../styles/industrialTheme";
import {
  MACHINE_STATUS,
  canTransitTo,
} from "../../../configs/validations/schedule/constants";
import { validateStatusTransition } from "../../../utils/schedule/statusHelpers";

// 狀態卡片樣式 - 簡化並增加邊框粗細
const StatusCard = styled(Box)(({ active, disabled, statusColor }) => ({
  padding: "24px 16px", // 增加內間距
  borderRadius: "6px", // 增加圓角
  border: `2px solid ${
    active ? statusColor : disabled ? "#E0E0E0" : "#9E9E9E"
  }`, // 增加邊框粗細和對比度
  backgroundColor: active
    ? `${statusColor}08` // 降低透明度，只有8%
    : "#FFFFFF", // 使用白色背景
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.7 : 1, // 增加禁用狀態的不透明度
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "140px", // 增加高度
  textAlign: "center",
  boxShadow: active ? "0 2px 8px rgba(0,0,0,0.1)" : "none", // 簡化陰影
  "&:hover": {
    boxShadow: disabled ? "none" : "0 4px 8px rgba(0,0,0,0.1)", // 簡化懸停陰影
    transform: disabled ? "none" : "translateY(-2px)", // 保留輕微上移效果
    backgroundColor: active
      ? `${statusColor}12` // 懸停時僅12%透明度
      : "#F5F5F5", // 懸停時使用淺灰色背景
    borderColor: disabled ? "#E0E0E0" : active ? statusColor : "#616161", // 懸停時深化邊框
  },
}));

// 狀態圖標樣式 - 增加大小
const StatusIcon = styled(Box)(({ statusColor }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: statusColor,
  marginBottom: "16px", // 增加下間距
  "& .MuiSvgIcon-root": {
    fontSize: "3rem", // 增加圖標大小
  },
}));

// 狀態選項配置 - 簡化
const STATUS_OPTIONS = [
  {
    value: MACHINE_STATUS.IDLE,
    label: "待機中",
    description: "機台待命狀態",
    icon: <TimerIcon />,
    color: "#757575", // 灰色
  },
  {
    value: MACHINE_STATUS.SETUP,
    label: "設置中",
    description: "機台設置與調整",
    icon: <BuildIcon />,
    color: "#FF9800", // 橙色
  },
  {
    value: MACHINE_STATUS.TESTING,
    label: "產品試模",
    description: "進行產品測試",
    icon: <CheckCircleIcon />,
    color: "#4CAF50", // 綠色
  },
  {
    value: MACHINE_STATUS.STOPPED,
    label: "機台停機",
    description: "機台暫停運作",
    icon: <PauseCircleIcon />,
    color: "#F44336", // 紅色
  },
];

/**
 * @component StatusChangeDialog
 * @description 改進的狀態切換對話框
 */
const StatusChangeDialog = ({
  open,
  onClose,
  currentStatus,
  onStatusChange,
  disabled,
  mode,
}) => {
  // 檢查狀態是否可用
  const canChangeStatus = (targetStatus) => {
    try {
      // 如果當前狀態等於目標狀態，那麼始終允許選擇（稍後會在handleStatusChange進行進一步驗證）
      if (currentStatus === targetStatus) {
        return true;
      }

      // 使用輔助函數進行狀態轉換驗證
      validateStatusTransition(currentStatus, targetStatus, null, mode);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <IndustrialDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      aria-labelledby="status-change-dialog-title"
    >
      {/* 對話框標題 */}
      <DialogHeader id="status-change-dialog-title">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          變更機台狀態
          {disabled && <CircularProgress size={24} sx={{ ml: 2 }} />}
        </Box>
        <Box>
          <Tooltip title="關閉">
            <span>
              <CloseIcon
                onClick={onClose}
                sx={{
                  cursor: "pointer",
                  fontSize: "24px", // 增加圖標大小
                }}
              />
            </span>
          </Tooltip>
        </Box>
      </DialogHeader>

      {/* 對話框內容 */}
      <DialogBody>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 500,
            color: "#212121", // 增加對比度
            fontSize: "18px", // 增加字體大小
          }}
        >
          請選擇要切換的狀態：
        </Typography>

        <Divider sx={{ mb: 3, borderWidth: "1px" }} />

        <Grid container spacing={3}>
          {STATUS_OPTIONS
            // 移除過濾條件，顯示所有狀態選項
            .map((status) => {
              const isActive = currentStatus === status.value;
              const isDisabled = disabled || !canChangeStatus(status.value);

              return (
                <Grid item xs={12} sm={6} key={status.value}>
                  <Box sx={{ position: "relative" }}>
                    <StatusCard
                      active={isActive}
                      disabled={isDisabled}
                      statusColor={status.color}
                      onClick={() => {
                        if (!isDisabled && !isActive) {
                          onStatusChange(status.value);
                        }
                      }}
                    >
                      <StatusIcon statusColor={status.color}>
                        {status.icon}
                      </StatusIcon>
                      <Typography
                        variant="h6"
                        fontWeight={600} // 增加字體粗細
                        color={isActive ? status.color : "#212121"} // 增加對比度
                        fontSize="18px" // 增加字體大小
                        sx={{ mb: 1 }} // 增加下間距
                      >
                        {status.label}
                      </Typography>
                      <Typography
                        variant="body1" // 使用更大的文字變體
                        color="#616161" // 增加對比度
                        fontSize="16px" // 增加字體大小
                      >
                        {status.description}
                      </Typography>

                      {/* 禁用狀態指示 */}
                      {isDisabled && !isActive && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(255,255,255,0.7)",
                            borderRadius: "6px",
                            border: "2px solid #E0E0E0",
                          }}
                        >
                          <Typography
                            color="#616161"
                            fontSize="16px"
                            fontWeight={500}
                          >
                            無法切換到此狀態
                          </Typography>
                        </Box>
                      )}
                    </StatusCard>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </DialogBody>

      {/* 對話框操作按鈕 */}
      <DialogFooter>
        <SecondaryButton
          onClick={onClose}
          sx={{ fontSize: "16px" }} // 增加字體大小
        >
          關閉
        </SecondaryButton>
      </DialogFooter>
    </IndustrialDialog>
  );
};

export default StatusChangeDialog;
