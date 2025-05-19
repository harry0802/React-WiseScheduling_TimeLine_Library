/**
 * @file EnhancedDialog.jsx
 * @description 增強型任務對話框組件，提供更好的用戶體驗和視覺設計 - 優化版
 * @version 4.0.0
 */

import React, { useState, useEffect, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BuildIcon from "@mui/icons-material/Build";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  formatToFormDateTime,
  ensureFormDateTime,
} from "../../../utils/schedule/dateUtils";
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
import {
  handleFormError,
  logError,
  createStateTransitionError,
  createValidationError,
} from "../../../utils/schedule/errorHandler";
import { MACHINE_STATUS } from "../../../configs/validations/schedule/constants";

// 導入輔助函數
import {
  isOrderType,
  isOrderOnGoing,
  validateStatusTransition,
  checkTimeOverlap,
  isFormDisabled,
  getDialogTitle,
  getStatusDisplayInfo,
} from "../../../utils/schedule/statusHelpers";

// 使用前面引入的 apiTransformers 函數轉換為 API 格式
import {
  transformInternalToApiFormat,
  transformUpdateStatusToApi,
  transformNewStatusToApi,
} from "../../../utils/schedule/transformers/apiTransformers";

//! =============== 1. 子組件定義 ===============
//* 將原本的 render 函數拆分為獨立組件

/**
 * @component StatusIcon
 * @description 狀態圖標組件
 * @param {string} status - 當前狀態
 */
const StatusIcon = ({ status }) => {
  // 取得狀態顯示資訊
  const statusInfo = getStatusDisplayInfo(status);

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
};

/**
 * @component DialogMenu
 * @description 對話框操作菜單組件
 */
const DialogMenu = ({
  anchorEl,
  onClose,
  mode,
  currentStatus,
  isOrder,
  isOnGoing,
  onShowStatusChange,
  onDelete,
}) => {
  // 檢查當前狀態是否可以切換
  const isStatusSwitchable = currentStatus !== MACHINE_STATUS.ORDER_CREATED;

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {/* 只在編輯模式下顯示狀態切換選項 */}
      {mode === "edit" && isStatusSwitchable && (
        <MenuItem onClick={onShowStatusChange}>
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
              fontSize: "16px", // 增加字體大小
              fontWeight: 500, // 增加字體粗細
            }}
          />
        </MenuItem>
      )}
    </Menu>
  );
};

/**
 * @component StatusChangePanel
 * @description 狀態變更控制面板
 */
const StatusChangePanel = ({ status, isSubmitting, onShowStatusDialog }) => {
  if (status === MACHINE_STATUS.ORDER_CREATED) return null;

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
        當前狀態: {status}
      </Typography>

      {/* 顯示狀態轉換規則提示 */}
      {status !== MACHINE_STATUS.IDLE && (
        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
          注意：當前狀態只能切換回待機狀態
        </Typography>
      )}
    </Paper>
  );
};

/**
 * @component ErrorNotification
 * @description 錯誤通知組件
 */
const ErrorNotification = ({ error, onClose }) => {
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
          fontSize: "16px", // 增加字體大小
          "& .MuiAlert-icon": {
            fontSize: "24px", // 增加圖標大小
          },
        }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};

//! =============== 2. 主對話框組件 ===============
//* 使用函數式與組件式架構

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

  //! =============== 3. 事件處理函數 ===============
  //* 處理用戶交互邏輯，以純函數形式實現

  // 菜單處理
  const handleMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // 清除錯誤
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 顯示錯誤
  const showError = useCallback(
    (err) => {
      const errorMessage = handleFormError(err);
      setError(errorMessage);

      // 記錄詳細錯誤信息到控制台或服務器
      logError(err, {
        context: "EnhancedDialog",
        dialogMode: mode,
        statusType: currentStatus,
        itemId: item?.id,
      });
    },
    [mode, currentStatus, item]
  );

  // 狀態切換處理
  const handleStatusChange = useCallback(
    (newStatus) => {
      try {
        // 清除之前的錯誤
        clearError();

        // 在add模式下，不要檢查相同狀態轉換的限制
        if (mode === "add" && currentStatus === newStatus) {
          setShowStatusDialog(false);
          return;
        }

        validateStatusTransition(currentStatus, newStatus, item, mode);
        setCurrentStatus(newStatus);
        setShowStatusDialog(false);
      } catch (err) {
        showError(err);
      }
    },
    [clearError, showError, currentStatus, item, mode]
  );

  // 表單提交處理
  const handleSubmit = useCallback(
    async (formData) => {
      if (isSubmitting) return;

      try {
        // 清除之前的錯誤並設置提交狀態
        clearError();
        setIsSubmitting(true);

        // 確保表單數據中至少有提供開始時間
        if (!formData.start) {
          console.warn("表單沒有提供開始時間，使用預設值");
          formData.start = ensureFormDateTime(new Date());
        }

        // 構建內部格式的更新項目
        const updatedInternalItem = {
          ...item,
          group: formData.group || item?.group || "", // 確保保留原始 group 值
          area: formData.area || item?.area || "", // 確保保留原始 area 值
          start: formData.start, // 直接使用表單值，已格式化
          end: formData.end,
          timeLineStatus: formData.timeLineStatus || currentStatus,
          status: {
            ...item?.status, // 保留所有原始狀態屬性
            product: formData.product || "",
            reason: formData.reason || "",
            startTime: formData.start, // 直接使用表單值
            endTime: formData.end,
          },
          orderInfo: {
            ...item?.orderInfo, // 保留所有原始訂單屬性
            productName: formData.productName || "",
            process: formData.process || "",
            scheduledStartTime: formData.start, // 直接使用表單值
            scheduledEndTime: formData.end,
            actualStartTime: formData.start,
            actualEndTime: formData.end,
          },
        };

        // 前端強化驗證 1: 狀態轉換驗證
        if (mode !== "add") {
          // 檢查是否只是數據編輯而非狀態變更
          const isDataOnlyEdit =
            item?.timeLineStatus === updatedInternalItem.timeLineStatus;

          try {
            validateStatusTransition(
              item?.timeLineStatus || MACHINE_STATUS.IDLE,
              updatedInternalItem.timeLineStatus,
              item,
              mode,
              isDataOnlyEdit // 添加這個參數標記是否僅編輯數據
            );
          } catch (error) {
            throw createStateTransitionError(error.message, {
              fromStatus: item?.timeLineStatus || MACHINE_STATUS.IDLE,
              toStatus: updatedInternalItem.timeLineStatus,
              itemId: item?.id,
              isDataOnlyEdit,
            });
          }
        }

        // 前端強化驗證 2: 時間重疊檢查
        try {
          checkTimeOverlap(updatedInternalItem, groups);
        } catch (error) {
          throw createValidationError(error.message, {
            field: "timeOverlap",
            item: updatedInternalItem.id,
            group: updatedInternalItem.group,
          });
        }

        // 前端強化驗證 3: 如果從非待機狀態切換到待機狀態，確保有結束時間
        if (
          mode !== "add" &&
          item?.timeLineStatus !== MACHINE_STATUS.IDLE &&
          updatedInternalItem.timeLineStatus === MACHINE_STATUS.IDLE &&
          !updatedInternalItem.end
        ) {
          // 自動設置結束時間為當前時間
          const now = new Date();
          updatedInternalItem.end = ensureFormDateTime(now);
          updatedInternalItem.status.endTime = ensureFormDateTime(now);
        }

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
        showError(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      isSubmitting,
      clearError,
      showError,
      currentStatus,
      item,
      mode,
      groups,
      onSave,
      onClose,
    ]
  );

  // 標籤切換處理
  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  // 顯示狀態切換對話框
  const handleShowStatusDialog = useCallback(() => {
    setShowStatusDialog(true);
    handleMenuClose();
  }, [handleMenuClose]);

  // 處理刪除操作
  const handleDeleteClick = useCallback(() => {
    if (onDelete) {
      onDelete();
    }
    handleMenuClose();
  }, [onDelete, handleMenuClose]);

  //! =============== 4. 輔助功能函數 ===============
  //* 提供視圖層支持的功能函數

  // 如果沒有項目數據則不渲染
  if (!item) return null;

  // 根據狀態獲取顏色
  const statusColor = getStatusColor(currentStatus);

  // 渲染表單禁用狀態
  const formDisabled = isFormDisabled(mode, isSubmitting, item);

  // 項目相關狀態
  const isOrder = isOrderType(item);
  const isOnGoing = isOrderOnGoing(item);

  //! =============== 5. 組件渲染 ===============
  //* 使用組件組合式結構來替代 render 函數

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
              icon={<StatusIcon status={currentStatus} />}
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
              <StatusChangePanel
                status={currentStatus}
                isSubmitting={isSubmitting}
                onShowStatusDialog={handleShowStatusDialog}
              />
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
      <ErrorNotification error={error} onClose={clearError} />

      {/* 操作菜單 */}
      <DialogMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        mode={mode}
        currentStatus={currentStatus}
        isOrder={isOrder}
        isOnGoing={isOnGoing}
        onShowStatusChange={handleShowStatusDialog}
        onDelete={handleDeleteClick}
      />
    </>
  );
};

export default EnhancedDialog;
