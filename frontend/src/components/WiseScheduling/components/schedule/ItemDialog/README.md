# EnhancedDialog 重構說明

## 🚀 重構概述

本次重構將原本 300+ 行的複雜組件重構為現代 React 架構，遵循以下設計原則：

- ✅ **Custom Hook 優先** - 業務邏輯完全封裝在 Hook 中
- ✅ **組合組件模式** - UI 組件職責單一且可復用
- ✅ **Push Ifs Up 原則** - 條件判斷在頂層統一處理
- ✅ **認知負荷控制** - 每個函數不超過 30 行，職責明確

## 📁 文件結構

```
ItemDialog/
├── EnhancedDialog.jsx          # 主組件 (80 行) 
├── hooks/
│   └── useEnhancedDialog.js    # 業務邏輯 Hook (200 行)
├── components/                 # 子組件目錄
│   ├── DialogTitle.jsx         # 標題組件 (30 行)
│   ├── DialogActions.jsx       # 標題操作組件 (25 行)
│   ├── ActionButtons.jsx       # 底部按鈕組件 (35 行)
│   ├── StatusIcon.jsx          # 狀態圖標組件 (30 行)
│   ├── ErrorNotification.jsx   # 錯誤通知組件 (20 行)
│   └── index.js               # 統一導出
├── StatusChangePanel.jsx       # 狀態切換面板 (40 行)
├── DialogMenu.jsx             # 操作菜單 (50 行)
├── __tests__/                 # 測試文件
│   └── useEnhancedDialog.test.js
└── README.md                  # 本文件
```

## 🎯 重構效益

| 指標 | 重構前 | 重構後 | 改善 |
|------|--------|--------|------|
| **主組件行數** | 300+ 行 | 80 行 | ↓ 73% |
| **最大函數行數** | 100+ 行 | 25 行 | ↓ 75% |
| **函數職責** | 多重職責 | 單一職責 | ✅ |
| **測試難度** | 困難 | 容易 | ✅ |
| **認知負荷** | 高 | 低 | ✅ |

## 🔧 使用方式

### 基本使用 (API 保持不變)

```jsx
import EnhancedDialog from './ItemDialog';

function MyComponent() {
  return (
    <EnhancedDialog
      open={isOpen}
      onClose={handleClose}
      item={currentItem}
      mode="edit"
      onSave={handleSave}
      onDelete={handleDelete}
      groups={groups}
    />
  );
}
```

### Hook 單獨使用

```jsx
import useEnhancedDialog from './ItemDialog/hooks/useEnhancedDialog';

function CustomDialog({ item, mode }) {
  const dialog = useEnhancedDialog(item, mode, {
    onSave: handleSave,
    onClose: handleClose,
    groups: [],
  });

  return (
    <div>
      <p>狀態: {dialog.currentStatus}</p>
      <button 
        onClick={() => dialog.handleStatusChange('SETUP')}
        disabled={dialog.isSubmitting}
      >
        切換到設置狀態
      </button>
      {dialog.error && <div>錯誤: {dialog.error}</div>}
    </div>
  );
}
```

## 📊 核心改進

### 1. 業務邏輯封裝 🦉

**重構前**: 業務邏輯散布在組件各處
```jsx
// 100+ 行的 handleSubmit 函數
const handleSubmit = async (formData) => {
  // 驗證邏輯
  // 轉換邏輯  
  // API 調用
  // 錯誤處理
  // ... 所有邏輯混在一起
};
```

**重構後**: 邏輯分層且可測試
```jsx
// Hook 中的純函數
const validateFormData = useCallback((formData) => { /* 驗證 */ }, []);
const transformFormData = useCallback((formData) => { /* 轉換 */ }, []);
const processNewItem = useCallback(async (item) => { /* 處理新項目 */ }, []);
const processExistingItem = useCallback(async (item) => { /* 處理現有項目 */ }, []);
```

### 2. Push Ifs Up 原則 🧠

**重構前**: 條件判斷散布各處
```jsx
// 組件內多處條件判斷
{currentStatus !== MACHINE_STATUS.ORDER_CREATED && mode === "edit" && (
  <StatusChangePanel />
)}
```

**重構後**: 條件集中管理
```jsx
// 在頂層決定渲染邏輯
const shouldShowStatusPanel = 
  dialog.currentStatus !== MACHINE_STATUS.ORDER_CREATED && mode === "edit";

return (
  <>
    {shouldShowStatusPanel && <StatusChangePanel />}
  </>
);
```

### 3. 組合組件模式 🐻

**重構前**: 巨大的 JSX 區塊
```jsx
<DialogHeader>
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Typography variant="h6">
      {getDialogTitle(isSubmitting, mode)}
    </Typography>
    {isSubmitting && <CircularProgress />}
    <CustomStatusChip />
  </Box>
  <Box>
    <IconButton onClick={handleMenuOpen}>
      <MoreVertIcon />
    </IconButton>
    <IconButton onClick={onClose}>
      <CloseIcon />
    </IconButton>
  </Box>
</DialogHeader>
```

**重構後**: 組合組件清晰表達意圖
```jsx
<DialogHeader>
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
```

## 🧪 測試策略

### Hook 測試 (容易)
```jsx
test('應該正確處理狀態切換', () => {
  const { result } = renderHook(() => 
    useEnhancedDialog(mockItem, 'edit', mockOptions)
  );

  act(() => {
    result.current.handleStatusChange(MACHINE_STATUS.SETUP);
  });

  expect(result.current.currentStatus).toBe(MACHINE_STATUS.SETUP);
});
```

### 組件測試 (簡單)
```jsx
test('應該顯示正確的標題', () => {
  render(
    <DialogTitle 
      status="IDLE" 
      isSubmitting={false} 
      mode="edit" 
    />
  );
  
  expect(screen.getByText(/編輯/)).toBeInTheDocument();
});
```

## ⚡ 性能優化

### 1. 減少重新渲染
- 使用 `useCallback` 包裝所有事件處理函數
- `useMemo` 優化複雜計算
- 組件拆分減少不必要的重渲染

### 2. 代碼分割
- Hook 可以獨立使用，支持按需加載
- 子組件可以單獨重用

## 🔄 遷移指南

### 向後兼容
- 公共 API 保持不變
- 現有調用代碼無需修改

### 逐步遷移建議
1. **第一階段**: 部署新版本，驗證功能正常
2. **第二階段**: 如果有自定義需求，可以直接使用 Hook
3. **第三階段**: 復用子組件到其他對話框

## 🚨 注意事項

### 不要做的事
- ❌ 不要在 Hook 外部修改 `currentStatus`
- ❌ 不要繞過 Hook 直接調用 API
- ❌ 不要在子組件中處理業務邏輯

### 推薦做法
- ✅ 所有業務邏輯都通過 Hook 處理
- ✅ 子組件只負責 UI 展示
- ✅ 使用 TypeScript 加強類型安全

## 📚 學習資料

- [現代 React 組件設計模式](../../../../../docs/modern-react-patterns.md)
- [Custom Hook 最佳實踐](../../../../../docs/custom-hooks-guide.md)
- [組合組件模式詳解](../../../../../docs/compound-components.md)

---

**重構完成！** 🎉 現在你有一個更容易維護、測試和擴展的現代 React 組件了。
