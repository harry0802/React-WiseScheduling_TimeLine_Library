/**
 * @file ActionButtons.jsx
 * @description 對話框底部操作按鈕組件
 * @version 1.0.0
 */

import React from "react";
import {
  PrimaryButton,
  SecondaryButton,
  DeleteButton,
} from "../../styles/DialogStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import {
  isOrderType,
  isOrderOnGoing,
} from "../../../../utils/schedule/statusHelpers";
import {
  canDeleteItem,
  canEditItem,
  isHistoricalData,
} from "../../../../configs/validations/schedule/constants";

//! =============== 底部操作按鈕組件 ===============
//* 專職處理對話框底部的操作按鈕

/**
 * @component ActionButtons
 * @description 對話框底部的操作按鈕（刪除、取消、確認）
 * @param {string} mode - 對話框模式
 * @param {boolean} isSubmitting - 是否正在提交
 * @param {Function} onClose - 關閉對話框回調
 * @param {Function} onDelete - 刪除項目回調
 * @param {Object} item - 當前項目數據
 */
function ActionButtons({ mode, isSubmitting, onClose, onDelete, item }) {
  // 🧠 Push Ifs Up - 在頂層決定按鈕顯示邏輯，使用統一的判斷函數
  const canDelete = canDeleteItem(item);
  const canEdit = canEditItem(item);
  const isHistorical = isHistoricalData(item);

  const shouldShowDeleteButton =
    mode === "edit" && !isOrderType(item) && !isOrderOnGoing(item);

  const submitButtonText = isSubmitting
    ? "處理中..."
    : canEdit
    ? "確認"
    : "查看";

  return (
    <>
      {/* 🔧 刪除按鈕 - 根據歷史狀態調整 */}
      {shouldShowDeleteButton && (
        <DeleteButton
          onClick={canDelete ? onDelete : undefined}
          startIcon={canDelete ? <DeleteIcon /> : <LockIcon />}
          variant="outlined"
          sx={{ mr: "auto" }}
          disabled={isSubmitting || !canDelete}
        >
          {canDelete ? "刪除" : "已封存"}
        </DeleteButton>
      )}

      {/* 🔧 取消按鈕 */}
      <SecondaryButton onClick={onClose} disabled={isSubmitting}>
        取消
      </SecondaryButton>

      {/* 🔧 確認按鈕 - 歷史資料禁用提交 */}
      <PrimaryButton
        type="submit"
        form="status-form"
        variant="contained"
        disabled={isSubmitting || (isHistorical && mode === "edit")}
      >
        {submitButtonText}
      </PrimaryButton>
    </>
  );
}

export default ActionButtons;
