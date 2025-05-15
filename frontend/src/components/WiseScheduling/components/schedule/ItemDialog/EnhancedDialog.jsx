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
import {
  handleFormError,
  StatusError,
} from "../../../utils/schedule/errorHandler";
import {
  MACHINE_STATUS,
  canTransitTo,
} from "../../../configs/validations/schedule/constants";
import dayjs from "dayjs";

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
      // 如果當前狀態是製令單，不允許切換
      if (
        currentStatus === MACHINE_STATUS.ORDER_CREATED ||
        currentStatus === "製令單"
      ) {
        throw new StatusError("製令單狀態不能被切換");
      }

      // 新增模式時不需要檢查狀態轉換限制
      if (mode !== "add" && !canTransitTo(currentStatus, newStatus)) {
        throw new StatusError(
          `無法從「${currentStatus}」切換到「${newStatus}」狀態`
        );
      }

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
      console.log("Submitting form data:", formData);

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

      // 檢查時間重疊（除了 OrderCreated 狀態外的其他狀態）
      const isWorkOrder =
        updatedInternalItem.timeLineStatus === "製立單" ||
        updatedInternalItem.timeLineStatus === "製令單";

      if (!isWorkOrder) {
        try {
          let hasOverlap = false;
          const itemStart = dayjs(updatedInternalItem.start);
          const itemEnd = dayjs(updatedInternalItem.end);

          // 首先，如果有全局數據存取方式，則使用它
          if (window.timeline && window.app && window.app.timelineData) {
            // 偵測程式可以先檢查數據存取方式
            console.log("Using global timeline data to check overlap");

            // 使用 DataSet API 取得符合條件的項目
            const existingItems = window.app.timelineData.get({
              filter: function (item) {
                return (
                  item.id !== updatedInternalItem.id &&
                  item.group === updatedInternalItem.group &&
                  item.timeLineStatus !== "製立單" &&
                  item.timeLineStatus !== "製令單"
                );
              },
            });

            hasOverlap = existingItems.some((existingItem) => {
              const existingStart = dayjs(existingItem.start);
              const existingEnd = dayjs(existingItem.end);

              return (
                (itemStart.isBefore(existingEnd) &&
                  itemEnd.isAfter(existingStart)) ||
                itemStart.isSame(existingStart) ||
                itemEnd.isSame(existingEnd)
              );
            });
          } else {
            console.log("Checking overlap using groups data");

            // 如果沒有全局數據，則使用傳入的 groups 參數
            const groupItems = [];

            if (groups && Array.isArray(groups)) {
              const currentGroup = groups.find(
                (g) => g.id === updatedInternalItem.group
              );

              if (currentGroup && currentGroup.items) {
                currentGroup.items
                  .filter(
                    (item) =>
                      item.id !== updatedInternalItem.id &&
                      item.timeLineStatus !== "製立單" &&
                      item.timeLineStatus !== "製令單"
                  )
                  .forEach((item) => groupItems.push(item));
              }

              hasOverlap = groupItems.some((existingItem) => {
                const existingStart = dayjs(existingItem.start);
                const existingEnd = dayjs(existingItem.end);

                return (
                  (itemStart.isBefore(existingEnd) &&
                    itemEnd.isAfter(existingStart)) ||
                  itemStart.isSame(existingStart) ||
                  itemEnd.isSame(existingEnd)
                );
              });
            }
          }

          if (hasOverlap) {
            throw new Error(
              "時間重疊：除了「製令單」/「製立單」外的其他狀態都不允許時間重疊"
            );
          }
        } catch (err) {
          if (err.message.includes("時間重疊")) {
            throw err; // 重新拋出重疊錯誤
          }
          console.error("檢查時間重疊時發生錯誤，繼續執行:", err);
          // 如果檢查失敗，然後允許操作繼續
        }
      }

      // 使用前面引入的 apiTransformers 函數轉換為 API 格式
      // 引入 formUtils
      const { transformInternalToApiFormat } = await import(
        "../../../utils/schedule/transformers/apiTransformers"
      );

      // 生成 API 格式數據
      const updatedApiItem = transformInternalToApiFormat(updatedInternalItem);

      console.log("Updated internal item:", updatedInternalItem);
      console.log("Updated API item:", updatedApiItem);

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

  // 獲取對話框標題和狀態顏色
  const getDialogTitle = () => {
    if (isSubmitting) return "處理中...";
    switch (mode) {
      case "add":
        return "新增狀態";
      case "edit":
        return "編輯狀態";
      default:
        return "檢視狀態";
    }
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

  // 渲染操作菜單
  const renderMenu = () => {
    // 檢查當前狀態是否可以切換
    const isStatusSwitchable =
      currentStatus !== MACHINE_STATUS.ORDER_CREATED &&
      currentStatus !== "製令單";

    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {mode !== "view" && isStatusSwitchable && (
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

        {isStatusSwitchable && <Divider sx={{ my: 1 }} />}

        {mode === "edit" && (
          <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
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
      case "製令單":
        return (
          <Badge color="primary" variant="dot">
            <AccessTimeIcon fontSize="medium" />
          </Badge>
        );
      case "閒置":
        return (
          <Badge color="default" variant="dot">
            <AccessTimeIcon fontSize="medium" />
          </Badge>
        );
      case "設置中":
        return (
          <Badge color="warning" variant="dot">
            <BuildIcon fontSize="medium" />
          </Badge>
        );
      case "停機":
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

  // 判斷是否禁用表單
  const isFormDisabled =
    mode === "view" ||
    isSubmitting ||
    (mode !== "add" &&
      // 有實際結束時間就禁用
      ((item.machineStatusActualEndTime !== null &&
        item.machineStatusActualEndTime !== undefined) ||
        // 訂單狀態是 "On-going" 也禁用
        item.productionScheduleStatus === "On-going" ||
        (item.orderInfo &&
          item.orderInfo.orderStatus.toLowerCase() === "on-going")));

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
              {getDialogTitle()}
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
            <StatusTab label={MACHINE_STATUS.ORDER_CREATED} value={0} />
            <StatusTab label={MACHINE_STATUS.IDLE} value={1} />
            <StatusTab label={MACHINE_STATUS.SETUP} value={2} />
            <StatusTab label={MACHINE_STATUS.TESTING} value={3} />
            <StatusTab label={MACHINE_STATUS.STOPPED} value={4} />
          </StatusTabs>
        )}

        {/* 對話框內容 */}
        <DialogBody dividers>
          {/* 如果不是製令單且模式不是查看模式，則顯示狀態切換按鈕 */}
          {currentStatus !== MACHINE_STATUS.ORDER_CREATED &&
            currentStatus !== "製令單" &&
            mode !== "view" && (
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
              </Paper>
            )}

          <StatusController
            status={currentStatus}
            item={item}
            disabled={isFormDisabled}
            onSubmit={handleSubmit}
            mode={mode}
            isSubmitting={isSubmitting}
            onClose={onClose}
            groups={groups}
          />
        </DialogBody>

        {/* 對話框操作按鈕 */}
        <DialogFooter>
          {mode === "edit" && (
            <DeleteButton
              onClick={handleDeleteClick}
              startIcon={<DeleteIcon />}
              variant="outlined"
              sx={{ mr: "auto" }}
              disabled={isSubmitting}
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
