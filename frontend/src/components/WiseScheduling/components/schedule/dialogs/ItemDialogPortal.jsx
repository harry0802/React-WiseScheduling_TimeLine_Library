/**
 * @file ItemDialogPortal.jsx
 * @description 使用 Portal 渲染的項目對話框，完全獨立的渲染樹
 * @version 2.0.0 - 函數式重構
 */

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ItemDialog from "../ItemDialog/index";
import { 
  onItemDialogChange, 
  saveItem, 
  closeItemDialog, 
  openDeleteDialog 
} from "../DialogManager";

/**
 * @component ItemDialogPortal
 * @description 使用 Portal 渲染的項目對話框，完全獨立於主渲染樹
 */
function ItemDialogPortal() {
  // 本地狀態，只在此組件內部使用
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    mode: "view",
    item: null,
    groups: [],
  });

  // 監聽對話框狀態變化
  useEffect(() => {
    // 當對話框狀態變化時更新本地狀態
    const unsubscribe = onItemDialogChange(setDialogState);

    // 清理函數
    return unsubscribe;
  }, []);

  // 處理保存
  const handleSave = (item) => {
    saveItem(item);
    closeItemDialog();
  };

  // 處理打開刪除對話框
  const handleOpenDelete = () => {
    if (dialogState.item?.id) {
      openDeleteDialog(dialogState.item.id);
    }
  };

  // 如果沒有項目或對話框沒有打開，則不渲染任何內容
  if (!dialogState.isOpen || !dialogState.item) {
    return null;
  }

  // 使用 Portal 將對話框渲染到 DOM 的不同位置
  return ReactDOM.createPortal(
    <ItemDialog
      open={dialogState.isOpen}
      onClose={() => closeItemDialog()}
      item={dialogState.item}
      mode={dialogState.mode}
      onSave={handleSave}
      onDelete={handleOpenDelete}
      groups={dialogState.groups}
    />,
    document.body // 將對話框直接渲染到 body 元素
  );
}

export default ItemDialogPortal;
