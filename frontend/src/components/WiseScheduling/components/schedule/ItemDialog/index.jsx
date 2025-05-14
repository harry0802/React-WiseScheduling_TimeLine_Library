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
import {
  canTransitTo,
  MACHINE_STATUS,
} from "../../../configs/validations/schedule/constants";
import StatusController from "../StatusForms/StatusForms";
import StatusChangeDialog from "./StatusChangeDialog";
import {
  handleFormError,
  StatusError,
} from "../../../utils/schedule/errorHandler";
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
      const isWorkOrder = updatedInternalItem.timeLineStatus === "製立單" || 
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
                      (item.timeLineStatus !== "製立單" && 
                       item.timeLineStatus !== "製令單")
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
      const { transformInternalToApiFormat } = await import('../../../utils/schedule/transformers/apiTransformers');
      
      // 生成 API 格式數據
      const updatedApiItem = transformInternalToApiFormat(updatedInternalItem);
      
      console.log("Updated internal item:", updatedInternalItem);
      console.log("Updated API item:", updatedApiItem);
      
      // 返回包含兩種格式的對象
      await onSave({
        internal: updatedInternalItem,
        api: updatedApiItem
      });
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
