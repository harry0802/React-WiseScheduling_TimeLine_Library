// components/ItemDialog/index.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import { canTransitTo, MACHINE_STATUS } from "../../configs/constants";
import StatusController from "../StatusForms/StatusForms";
import StatusChangeDialog from "./StatusChangeDialog";
import { handleFormError, StatusError } from "../../utils/errorHandler";
import { Snackbar, Alert } from "@mui/material";
import { CircularProgress } from "@mui/material";

const ItemDialog = ({
  open,
  onClose,
  item,
  mode = "view", // view, edit, add
  onSave,
}) => {
  // 🧠 狀態管理
  const [currentStatus, setCurrentStatus] = useState(
    item?.timeLineStatus || MACHINE_STATUS.IDLE
  );
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 💡 處理狀態切換
  const handleStatusChange = (newStatus) => {
    try {
      if (!canTransitTo(currentStatus, newStatus)) {
        throw new StatusError("無法切換到此狀態");
      }
      setCurrentStatus(newStatus);
      setShowStatusDialog(false);
    } catch (err) {
      setError(handleFormError(err));
    }
  };

  // ✨ 處理表單提交
  const handleSubmit = async (formData) => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const updatedItem = {
        ...item,
        ...formData,
        status: currentStatus,
      };

      await onSave(updatedItem);
      onClose();
    } catch (err) {
      setError(handleFormError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <>
      <Dialog
        open={open}
        onClose={isSubmitting ? undefined : onClose}
        maxWidth="md"
        fullWidth
        disableEscapeKeyDown={isSubmitting}
      >
        <DialogTitle>
          {getDialogTitle()}
          {isSubmitting && <CircularProgress size={20} sx={{ ml: 1 }} />}
        </DialogTitle>

        <DialogContent>
          {/* 只在新增和編輯模式顯示狀態切換按鈕 */}
          {mode !== "view" && canTransitTo(currentStatus) && (
            <Button
              onClick={() => setShowStatusDialog(true)}
              sx={{ mb: 2 }}
              disabled={isSubmitting}
            >
              切換狀態
            </Button>
          )}
          <StatusController
            status={currentStatus}
            item={item}
            disabled={mode === "view" || isSubmitting}
            onSubmit={handleSubmit}
            onCancel={isSubmitting ? undefined : onClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            取消
          </Button>
          {mode !== "view" && (
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              確認
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* 狀態切換對話框 */}
      <StatusChangeDialog
        open={showStatusDialog}
        onClose={() => setShowStatusDialog(false)}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
        disabled={isSubmitting}
      />
      {/* 錯誤提示 */}
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
