/**
 * @file DeleteDialogPortal.jsx
 * @description 使用 Portal 渲染的刪除確認對話框，完全獨立的渲染樹
 * @version 1.0.0
 */

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import OperationDialog from "../OperationDialog";
import { DialogManager } from "../DialogManager";

/**
 * @component DeleteDialogPortal
 * @description 使用 Portal 渲染的刪除確認對話框，完全獨立於主渲染樹
 */
function DeleteDialogPortal() {
  // 本地狀態，只在此組件內部使用
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    itemId: null,
  });

  // 監聽對話框狀態變化
  useEffect(() => {
    // 當對話框狀態變化時更新本地狀態
    const unsubscribe = DialogManager.onDeleteDialogChange(setDialogState);

    // 清理函數
    return unsubscribe;
  }, []);

  // 如果對話框沒有打開，則不渲染任何內容
  if (!dialogState.isOpen) {
    return null;
  }

  // 使用 Portal 將對話框渲染到 DOM 的不同位置
  return ReactDOM.createPortal(
    <OperationDialog
      open={dialogState.isOpen}
      title="刪除確認"
      content="確定要刪除這個訂單嗎？"
      onConfirm={() => DialogManager.confirmDelete()}
      onCancel={() => DialogManager.closeDeleteDialog()}
      confirmText="刪除"
      cancelText="取消"
    />,
    document.body // 將對話框直接渲染到 body 元素
  );
}

export default DeleteDialogPortal;
