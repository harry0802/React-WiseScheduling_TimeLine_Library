//! =============== 1. 設定與常量 ===============
//* 引入必要的 UI 組件
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

//* 引入自定義組件和工具
import { canTransitTo, MACHINE_STATUS } from "../../configs/constants";
import StatusController from "../StatusForms/StatusForms";
import StatusChangeDialog from "./StatusChangeDialog";
import { handleFormError, StatusError } from "../../utils/errorHandler";
import dayjs from "dayjs";

//! =============== 2. 類型與介面 ===============
//* 組件屬性定義
/**
 * @typedef {Object} ItemDialogProps
 * @property {boolean} open - 對話框是否開啟
 * @property {Function} onClose - 關閉對話框的回調
 * @property {Object} item - 要顯示的項目數據
 * @property {'view'|'edit'|'add'} mode - 對話框模式
 * @property {Function} onSave - 保存數據的回調
 */

//! =============== 3. 核心功能 ===============
const ItemDialog = ({
  open,
  onClose,
  item,
  mode = "view", // view, edit, add
  onSave,
  groups,
}) => {
  //* 基礎狀態管理
  const [currentStatus, setCurrentStatus] = useState(
    item?.timeLineStatus || MACHINE_STATUS.IDLE
  );
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //* 狀態切換處理
  const handleStatusChange = (newStatus) => {
    try {
      // 新增模式時不需要檢查狀態轉換限制
      if (mode !== "add" && !canTransitTo(currentStatus, newStatus)) {
        throw new StatusError("無法切換到此狀態");
      }
      setCurrentStatus(newStatus);
      setShowStatusDialog(false);
    } catch (err) {
      setError(handleFormError(err));
    }
  };

  //* 表單提交處理
  const handleSubmit = async (formData) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      console.log("Submitting form data:", formData);

      const updatedItem = {
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

      console.log("Updated item:", updatedItem);
      await onSave(updatedItem);
      onClose();
    } catch (err) {
      console.error("Submit error:", err);
      setError(handleFormError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  //! =============== 4. 工具函數 ===============
  //* 獲取對話框標題
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

  if (!item) return null;

  //* 渲染區塊
  return (
    <>
      <Dialog
        open={open}
        onClose={isSubmitting ? undefined : onClose}
        maxWidth="md"
        fullWidth
        disableEscapeKeyDown={isSubmitting}
        keepMounted={false}
        aria-labelledby="item-dialog-title"
      >
        <DialogTitle id="item-dialog-title">
          {getDialogTitle()}
          {isSubmitting && <CircularProgress size={20} sx={{ ml: 1 }} />}
        </DialogTitle>

        <DialogContent>
          <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
            {mode !== "add" &&
            currentStatus !== MACHINE_STATUS.ORDER_CREATED ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowStatusDialog(true)}
                  disabled={isSubmitting || mode === "view"}
                  startIcon={<SwapHorizIcon />}
                >
                  {currentStatus}
                </Button>
              </>
            ) : (
              <Typography variant="subtitle1">
                當前狀態：{currentStatus}
              </Typography>
            )}
          </Box>
          <StatusController
            status={currentStatus}
            item={item}
            // disabled={mode === "view" || isSubmitting}
            onSubmit={handleSubmit}
            mode={mode}
            isSubmitting={isSubmitting}
            onClose={onClose}
            groups={groups}
            // 過去的項目不允許修改 , add 模式自由
            disabled={
              mode === "view" ||
              isSubmitting ||
              (mode !== "add" &&
                (item.start < dayjs() ||
                  item.orderInfo.scheduledStartTime < dayjs()))
            }
          />
        </DialogContent>
      </Dialog>

      <StatusChangeDialog
        open={showStatusDialog}
        onClose={() => setShowStatusDialog(false)}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
        disabled={isSubmitting}
        mode={mode}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(null)}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};

export default ItemDialog;
