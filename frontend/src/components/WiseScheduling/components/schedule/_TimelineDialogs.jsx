// /**
//  * @file TimelineDialogs.jsx
//  * @description 時間線相關對話框組件，統一管理所有對話框
//  * @version 2.0.0
//  */

// import React from 'react';
// import ItemDialog from './ItemDialog/index';
// import OperationDialog from './OperationDialog';

// /**
//  * @component TimelineDialogs
//  * @description 統一管理時間線相關的所有對話框，通過 props 獲取狀態
//  */
// const TimelineDialogs = React.memo(({
//   dialogState,
//   isDeleteDialogOpen,
//   onSave,S
//   onDelete,
//   onClose,
//   onCloseDelete,
//   onOpenDelete,
//   groups
// }) => {
//   // 如果沒有選中項目且刪除對話框也沒開啟，則不渲染任何內容
//   if (!dialogState.selectedItem && !isDeleteDialogOpen) {
//     return null;
//   }

//   return (
//     <>
//       {/* 項目編輯對話框 */}
//       {dialogState.selectedItem && (
//         <ItemDialog
//           open={dialogState.isOpen}
//           onClose={onClose}
//           item={dialogState.selectedItem}
//           mode={dialogState.mode}
//           onSave={onSave}
//           onDelete={onOpenDelete}
//           groups={groups}
//         />
//       )}

//       {/* 刪除確認對話框 */}
//       <OperationDialog
//         open={isDeleteDialogOpen}
//         title="刪除確認"
//         content="確定要刪除這個訂單嗎？"
//         onConfirm={onDelete}
//         onCancel={onCloseDelete}
//         confirmText="刪除"
//         cancelText="取消"
//       />
//     </>
//   );
// });

// // 添加 displayName 以便於調試
// TimelineDialogs.displayName = 'TimelineDialogs';

// export default TimelineDialogs;
