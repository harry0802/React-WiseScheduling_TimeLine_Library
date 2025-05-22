/**
 * @file ActionButtons.jsx
 * @description 對話框底部操作按鈕組件
 * @version 1.0.0
 */

import React from "react";
import { PrimaryButton, SecondaryButton, DeleteButton } from "../../styles/DialogStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import { isOrderType, isOrderOnGoing } from "../../../../utils/schedule/statusHelpers";

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
  // 🧠 Push Ifs Up - 在頂層決定按鈕顯示邏輯
  const shouldShowDeleteButton = 
    mode === "edit" && 
    !isOrderType(item) && 
    !isOrderOnGoing(item);

  const isViewMode = mode === "view";
  const submitButtonText = isSubmitting ? "處理中..." : "確認";

  return (
    <>
      {/* 🔧 刪除按鈕 - 只在符合條件時顯示 */}
      {shouldShowDeleteButton && (
        <DeleteButton
          onClick={onDelete}
          startIcon={<DeleteIcon />}
          variant="outlined"
          sx={{ mr: "auto" }}
          disabled={isSubmitting}
        >
          刪除
        </DeleteButton>
      )}
      
      {/* 🔧 取消按鈕 */}
      <SecondaryButton onClick={onClose} disabled={isSubmitting}>
        取消
      </SecondaryButton>
      
      {/* 🔧 確認按鈕 */}
      <PrimaryButton
        type="submit"
        form="status-form"
        variant="contained"
        disabled={isSubmitting || isViewMode}
      >
        {submitButtonText}
      </PrimaryButton>
    </>
  );
}

export default ActionButtons;
