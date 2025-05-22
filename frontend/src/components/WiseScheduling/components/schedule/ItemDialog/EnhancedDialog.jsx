/**
 * @file EnhancedDialog.jsx
 * @description 增強型任務對話框組件 - 現代化重構版
 * @version 5.0.0
 */

import React, { useState, useCallback, useId } from "react";
import { StatusTabs, StatusTab } from "../styles/DialogStyles";

// 🦉 導入 Custom Hook
import useEnhancedDialog from "./hooks/useEnhancedDialog";

// 🐻 導入組合子組件
import {
  DialogTitle,
  DialogActions,
  ActionButtons,
  ErrorNotification,
} from "./components";

// 🔧 導入現有組件（暫時保留）
import StatusChangePanel from "./StatusChangePanel";
import DialogMenu from "./DialogMenu";

// 🚀 導入樣式和其他依賴
import {
  IndustrialDialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "../styles/DialogStyles";
import StatusController from "../StatusForms/StatusForms";
import StatusChangeDialog from "./StatusChangeDialog";
import { MACHINE_STATUS } from "../../../configs/validations/schedule/constants";
import {
  isOrderType,
  isOrderOnGoing,
  isFormDisabled,
} from "../../../utils/schedule/statusHelpers";

//! =============== 現代化主組件 ===============
//* 使用 Custom Hook + 組合組件模式

/**
 * @component EnhancedDialog
 * @description 現代化的增強版任務對話框
 * @param {boolean} open - 對話框開啟狀態
 * @param {Function} onClose - 關閉對話框回調
 * @param {Object} item - 當前項目數據
 * @param {string} mode - 對話框模式 (view, edit, add)
 * @param {Function} onSave - 保存回調
 * @param {Function} onDelete - 刪除回調
 * @param {Array} groups - 群組數據
 */
function EnhancedDialog({
  open,
  onClose,
  item,
  mode = "view",
  onSave,
  onDelete,
  groups,
}) {
  // 🦉 使用 Custom Hook 管理所有業務邏輯
  const dialog = useEnhancedDialog(item, mode, {
    onSave,
    onClose,
    groups,
  });

  // 🔧 UI 狀態管理 - 只管理 UI 相關狀態
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  
  // 🚀 使用 useId 生成唯一 ID
  const dialogId = useId();

  //! =============== UI 事件處理 ===============
  //* 只處理 UI 相關的事件，業務邏輯交給 Hook

  const handleMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  const handleShowStatusDialog = useCallback(() => {
    setShowStatusDialog(true);
    handleMenuClose();
  }, [handleMenuClose]);

  const handleStatusChange = useCallback(
    (newStatus) => {
      dialog.handleStatusChange(newStatus);
      setShowStatusDialog(false);
    },
    [dialog]
  );

  const handleDeleteClick = useCallback(() => {
    onDelete?.();
    handleMenuClose();
  }, [onDelete, handleMenuClose]);

  //! =============== 渲染邏輯 ===============
  //* Push Ifs Up - 在頂層決定渲染條件

  if (!item) return null;

  // 🧠 決定條件渲染的邏輯
  const shouldShowStatusPanel =
    dialog.currentStatus !== MACHINE_STATUS.ORDER_CREATED && mode === "edit";

  const shouldShowStatusTabs = mode === "add";

  const formDisabled = isFormDisabled(mode, dialog.isSubmitting, item);
  const isOrder = isOrderType(item);
  const isOnGoing = isOrderOnGoing(item);

  //! =============== 組件渲染 ===============
  //* 使用組合組件模式，保持主組件簡潔

  return (
    <>
      <IndustrialDialog
        open={open}
        onClose={dialog.isSubmitting ? undefined : onClose}
        maxWidth="md"
        fullWidth
        disableEscapeKeyDown={dialog.isSubmitting}
        keepMounted={false}
        aria-labelledby={dialogId}
      >
        {/* 🐻 對話框標題 - 使用組合組件 */}
        <DialogHeader id={dialogId}>
          <DialogTitle
            status={dialog.currentStatus}
            isSubmitting={dialog.isSubmitting}
            mode={mode}
          />
          <DialogActions
            mode={mode}
            onMenuOpen={handleMenuOpen}
            onClose={onClose}
            isSubmitting={dialog.isSubmitting}
          />
        </DialogHeader>

        {/* 🔧 狀態頁籤 - 條件渲染 */}
        {shouldShowStatusTabs && (
          <StatusTabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="狀態頁籤"
            variant="scrollable"
            scrollButtons="auto"
          >
            <StatusTab label={MACHINE_STATUS.IDLE} value={0} />
          </StatusTabs>
        )}

        {/* 🐻 對話框內容 */}
        <DialogBody dividers>
          {/* 🔧 狀態切換面板 - 條件渲染 */}
          {shouldShowStatusPanel && (
            <StatusChangePanel
              status={dialog.currentStatus}
              isSubmitting={dialog.isSubmitting}
              onShowStatusDialog={handleShowStatusDialog}
            />
          )}

          {/* 🚀 狀態控制器 - 核心表單 */}
          <StatusController
            status={dialog.currentStatus}
            item={item}
            disabled={formDisabled}
            onSubmit={dialog.handleSubmit}
            mode={mode}
            isSubmitting={dialog.isSubmitting}
            onClose={onClose}
            groups={groups}
          />
        </DialogBody>

        {/* 🐻 對話框底部按鈕 - 使用組合組件 */}
        <DialogFooter>
          <ActionButtons
            mode={mode}
            isSubmitting={dialog.isSubmitting}
            onClose={onClose}
            onDelete={handleDeleteClick}
            item={item}
          />
        </DialogFooter>
      </IndustrialDialog>

      {/* 🚀 狀態變更對話框 */}
      <StatusChangeDialog
        open={showStatusDialog}
        onClose={() => setShowStatusDialog(false)}
        currentStatus={dialog.currentStatus}
        onStatusChange={handleStatusChange}
        disabled={dialog.isSubmitting}
        mode={mode}
      />

      {/* 🐻 錯誤通知 - 使用組合組件 */}
      <ErrorNotification error={dialog.error} onClose={dialog.clearError} />

      {/* 🔧 操作菜單 - 暫時保留原組件 */}
      <DialogMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        mode={mode}
        currentStatus={dialog.currentStatus}
        isOrder={isOrder}
        isOnGoing={isOnGoing}
        onShowStatusChange={handleShowStatusDialog}
        onDelete={handleDeleteClick}
      />
    </>
  );
}

export default EnhancedDialog;
