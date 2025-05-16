/**
 * @file EnhancedDialog.jsx
 * @description 增強型任務對話框組件，提供更好的用戶體驗和視覺設計 - 優化版
 * @version 2.0.0
 */

import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BuildIcon from "@mui/icons-material/Build";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Badge,
  Tooltip,
  Snackbar,
  Alert,
  Box,
  Typography,
  Paper,
} from "@mui/material";

// 導入自定義狀態標籤
import CustomStatusChip from "./CustomStatusChip";

// 導入樣式組件
import {
  IndustrialDialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  PrimaryButton,
  SecondaryButton,
  DeleteButton,
  StatusTabs,
  StatusTab,
  FormSection,
} from "../styles/DialogStyles";

// 導入顏色主題和工具
import { getStatusColor } from "../styles/industrialTheme";
import StatusController from "../StatusForms/StatusForms";
import StatusChangeDialog from "./StatusChangeDialog";
import { handleFormError } from "../../../utils/schedule/errorHandler";
import { MACHINE_STATUS } from "../../../configs/validations/schedule/constants";

// 導入輔助函數
import {
  isOrderType,
  isOrderOnGoing,
  validateStatusTransition,
  checkTimeOverlap,
  isFormDisabled,
  getDialogTitle,
} from "../../../utils/schedule/statusHelpers";

/**
 * @component EnhancedDialog
 * @description 增強版任務對話框，提供更好的用戶體驗
 */
const EnhancedDialog = ({
  open,
  onClose,
  item,
  mode = "view", // view, edit, add
  onSave,
  onDelete,
  groups,
}) => {
  // 基礎狀態管理
  const [currentStatus, setCurrentStatus] = useState(
    item?.timeLineStatus || MACHINE_STATUS.IDLE
  );
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  // 設置初始狀態
  useEffect(() => {
    if (item?.timeLineStatus) {
      setCurrentStatus(item.timeLineStatus);
    }
  }, [item]);

  // 菜單處理
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 狀態切換處理
  const handleStatusChange = (newStatus) => {
    try {
      // 在add模式下，不要檢查相同狀態轉換的限制
      if (mode === "add" && currentStatus === newStatus) {
        setShowStatusDialog(false);
        return;
      }

      validateStatusTransition(currentStatus, newStatus, item, mode);
      setCurrentStatus(newStatus);
      setShowStatusDialog(false);
    } catch (err) {
      setError(handleFormError(err));
    }
  };

  // 表單提交處理
  const handleSubmit = async (formData) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // 構建內部格式的更新項目
      const updatedInternalItem = {
        ...item,
        group: formData.group || "",
        area: formData.area || "",
        start: formData.start || null,
        end: formData.end || null,
        timeLineStatus: formData.timeLineStatus || currentStatus,
        status: {
          ...item.status,
          product: formData.product || "",
          reason: formData.reason || "",
          startTime: formData.start || null,
          endTime: formData.end || null,
        },
        orderInfo: {
          ...item.orderInfo,
          productName: formData.productName || "",
          process: formData.process || "",
          scheduledStartTime: formData.start || null,
          scheduledEndTime: formData.end || null,
          actualStartTime: formData.start || null,
          actualEndTime: formData.end || null,
        },
      };

      // 前端強化驗證 1: 狀態轉換驗證
      if (mode !== "add") {
        // 檢查是否只是數據編輯而非狀態變更
        const isDataOnlyEdit =
          item?.timeLineStatus === updatedInternalItem.timeLineStatus;
        validateStatusTransition(
          item?.timeLineStatus || MACHINE_STATUS.IDLE,
          updatedInternalItem.timeLineStatus,
          item,
          mode,
          isDataOnlyEdit // 添加這個參數標記是否僅編輯數據
        );
      }

      // 前端強化驗證 2: 時間重疊檢查
      checkTimeOverlap(updatedInternalItem, groups);

      // 前端強化驗證 3: 如果從非待機狀態切換到待機狀態，確保有結束時間
      if (
        mode !== "add" &&
        item?.timeLineStatus !== MACHINE_STATUS.IDLE &&
        updatedInternalItem.timeLineStatus === MACHINE_STATUS.IDLE &&
        !updatedInternalItem.end
      ) {
        // 自動設置結束時間為當前時間
        updatedInternalItem.end = new Date();
        updatedInternalItem.status.endTime = new Date();
      }

      // 使用前面引入的 apiTransformers 函數轉換為 API 格式
      const {
        transformInternalToApiFormat,
        transformUpdateStatusToApi,
        transformNewStatusToApi,
      } = await import("../../../utils/schedule/transformers/apiTransformers");

      // 生成 API 格式數據
      let updatedApiItem;
      if (mode === "add") {
        // 使用新增狀態轉換函數，包含完整性驗證
        updatedApiItem = transformNewStatusToApi(updatedInternalItem, false);
      } else {
        // 使用更新狀態轉換函數，包含狀態轉換和完整性驗證
        updatedApiItem = transformUpdateStatusToApi(
          updatedInternalItem,
          item,
          false
        );
      }

      // 返回包含兩種格式的對象
      await onSave({
        internal: updatedInternalItem,
        api: updatedApiItem,
      });
      onClose();
    } catch (err) {
      console.error("Submit error:", err);
      setError(handleFormError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // 標籤切換處理
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // 顯示狀態切換對話框
  const handleShowStatusDialog = () => {
    setShowStatusDialog(true);
    handleMenuClose();
  };

  // 處理刪除操作
  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete();
    }
    handleMenuClose();
  };

  if (!item) return null;

  // 根據狀態獲取顏色
  const statusColor = getStatusColor(currentStatus);

  // 渲染表單禁用狀態
  const formDisabled = isFormDisabled(mode, isSubmitting, item);

  // 渲染操作菜單
  const renderMenu = () => {
    // 檢查當前狀態是否可以切換
    const isStatusSwitchable = currentStatus !== MACHINE_STATUS.ORDER_CREATED;

    // 是否為製令單類型
    const isOrder = isOrderType(item);

    // 是否為on-going狀態
    const isOnGoing = isOrderOnGoing(item);

    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* 只在編輯模式下顯示狀態切換選項 */}
        {mode === "edit" && isStatusSwitchable && (
          <MenuItem onClick={handleShowStatusDialog}>
            <ListItemIcon>
              <SwapHorizIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="變更狀態"
              primaryTypographyProps={{
                fontSize: "16px", // 增加字體大小
                fontWeight: 500, // 增加字體粗細
              }}
            />
          </MenuItem>
        )}

        {isStatusSwitchable && mode === "edit" && <Divider sx={{ my: 1 }} />}

        {/* 只有非製令單類型的項目才顯示刪除選項，on-going狀態的項目禁用刪除 */}
        {mode === "edit" && !isOrder && (
          <MenuItem
            onClick={handleDeleteClick}
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
                fontSize: "16px", // 增加字體大小
                fontWeight: 500, // 增加字體粗細
              }}
            />
          </MenuItem>
        )}
      </Menu>
    );
  };

  // 根據狀態渲染適當的圖標
  const renderStatusIcon = () => {
    switch (currentStatus) {
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
  };

  return (
    <>
      <IndustrialDialog
        open={open}
        onClose={isSubmitting ? undefined : onClose}
        maxWidth="md"
        fullWidth
        disableEscapeKeyDown={isSubmitting}
        keepMounted={false}
        aria-labelledby="enhanced-dialog-title"
      >
        {/* 對話框標題 */}
        <DialogHeader id="enhanced-dialog-title">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: 600, fontSize: "18px" }}
            >
              {getDialogTitle(isSubmitting, mode)}
            </Typography>
            {isSubmitting && (
              <CircularProgress size={24} sx={{ ml: 2 }} color="inherit" />
            )}
            <CustomStatusChip
              label={currentStatus}
              color={statusColor}
              icon={renderStatusIcon()}
            />
          </Box>
          <Box>
            {mode !== "view" && (
              <Tooltip title="更多操作">
                <IconButton
                  aria-label="更多操作"
                  onClick={handleMenuOpen}
                  sx={{
                    color: "inherit",
                    padding: "8px", // 增加點擊區域
                  }}
                >
                  <MoreVertIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            )}
            <IconButton
              aria-label="關閉"
              onClick={onClose}
              disabled={isSubmitting}
              sx={{
                color: "inherit",
                padding: "8px", // 增加點擊區域
                ml: 1,
              }}
            >
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Box>
        </DialogHeader>

        {/* 狀態頁籤 - 僅在新增模式時顯示 */}
        {mode === "add" && (
          <StatusTabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="狀態頁籤"
            variant="scrollable"
            scrollButtons="auto"
          >
            <StatusTab label={MACHINE_STATUS.IDLE} value={0} />
            {/* <StatusTab label={MACHINE_STATUS.SETUP} value={2} />
            <StatusTab label={MACHINE_STATUS.TESTING} value={3} />
            <StatusTab label={MACHINE_STATUS.STOPPED} value={4} /> */}
          </StatusTabs>
        )}

        {/* 對話框內容 */}
        <DialogBody dividers>
          {/* 如果不是製令單且模式是編輯模式，則顯示狀態切換按鈕 (不在add模式顯示) */}
          {currentStatus !== MACHINE_STATUS.ORDER_CREATED &&
            mode === "edit" && (
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
                  onClick={handleShowStatusDialog}
                  startIcon={<SwapHorizIcon />}
                  disabled={isSubmitting}
                  sx={{
                    mr: 2,
                    fontSize: "16px", // 增加字體大小
                  }}
                >
                  切換狀態
                </SecondaryButton>
                <Typography
                  variant="body1"
                  color="#424242"
                  fontSize="16px" // 增加字體大小
                  fontWeight={500} // 增加字體粗細
                >
                  當前狀態: {currentStatus}
                </Typography>

                {/* 顯示狀態轉換規則提示 */}
                {currentStatus !== MACHINE_STATUS.IDLE && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 2 }}
                  >
                    注意：當前狀態只能切換回待機狀態
                  </Typography>
                )}
              </Paper>
            )}

          <StatusController
            status={currentStatus}
            item={item}
            disabled={formDisabled}
            onSubmit={handleSubmit}
            mode={mode}
            isSubmitting={isSubmitting}
            onClose={onClose}
            groups={groups}
          />
        </DialogBody>

        {/* 對話框操作按鈕 */}
        <DialogFooter>
          {/* 製令單不顯示刪除按鈕，on-going狀態禁用刪除按鈕 */}
          {mode === "edit" && !isOrderType(item) && (
            <DeleteButton
              onClick={handleDeleteClick}
              startIcon={<DeleteIcon />}
              variant="outlined"
              sx={{ mr: "auto" }}
              disabled={isSubmitting || isOrderOnGoing(item)}
            >
              刪除
            </DeleteButton>
          )}
          <SecondaryButton onClick={onClose} disabled={isSubmitting}>
            取消
          </SecondaryButton>
          <PrimaryButton
            type="submit"
            form="status-form"
            variant="contained"
            disabled={isSubmitting || mode === "view"}
          >
            {isSubmitting ? "處理中..." : "確認"}
          </PrimaryButton>
        </DialogFooter>
      </IndustrialDialog>

      {/* 狀態變更對話框 */}
      <StatusChangeDialog
        open={showStatusDialog}
        onClose={() => setShowStatusDialog(false)}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
        disabled={isSubmitting}
        mode={mode}
      />

      {/* 錯誤提示 */}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(null)}
      >
        <Alert
          severity="error"
          sx={{
            fontSize: "16px", // 增加字體大小
            "& .MuiAlert-icon": {
              fontSize: "24px", // 增加圖標大小
            },
          }}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* 操作菜單 */}
      {renderMenu()}
    </>
  );
};

export default EnhancedDialog;
