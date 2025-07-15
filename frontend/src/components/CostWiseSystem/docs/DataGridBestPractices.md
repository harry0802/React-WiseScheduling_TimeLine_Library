# MUI DataGrid 伺服器端分頁最佳實踐

## 🎯 核心原則

### 1. **穩定的 Row ID 生成**
```javascript
// ❌ 不穩定的 ID 生成
getRowId={(row) => row.id || row.name}

// ✅ 穩定的 ID 生成（使用後備策略）
getRowId={(row) => row.id || `fallback_${row.index}`}
```

### 2. **資料驗證和預處理**
```javascript
// ✅ 在傳遞給 DataGrid 之前驗證資料
const processedRows = useMemo(() => {
  return rows.map((row, index) => ({
    ...row,
    _stableId: row.id || `row_${index}`,
    _index: index,
  }));
}, [rows]);
```

### 3. **錯誤邊界處理**
```javascript
// ✅ 添加錯誤邊界
if (error) {
  return <ErrorComponent error={error} />;
}

if (rows.length === 0 && totalCount === 0) {
  return <EmptyStateComponent />;
}
```

## 🔧 常見問題解決方案

### 問題 1: "No row with id found" 錯誤
**原因**: Row ID 不穩定或為 null/undefined
**解決方案**:
```javascript
// 使用穩定的 ID 生成策略
getRowId={(row) => row._stableId}

// 清除選擇狀態
rowSelectionModel={[]}
keepNonExistentRowsSelected={false}
```

### 問題 2: 分頁數據不一致
**原因**: API 響應格式不一致
**解決方案**:
```javascript
// 在 RTK Query 中添加強驗證
transformResponse: (response) => {
  const data = Array.isArray(response.data) ? response.data : [];
  return {
    rows: data.map((row, index) => ({
      ...row,
      _stableId: row.id || `row_${index}`,
    })),
    totalCount: response.meta?.total_count || 0,
  };
}
```

### 問題 3: 最後一頁崩潰
**原因**: 分頁超出範圍
**解決方案**:
```javascript
// 監控總數變化並重置分頁
useEffect(() => {
  if (totalCount > 0) {
    const maxPage = Math.ceil(totalCount / pageSize) - 1;
    if (page > maxPage) {
      setPage(Math.max(0, maxPage));
    }
  }
}, [totalCount, pageSize, page]);
```

## 🎛️ 推薦配置

### DataGrid 配置
```javascript
const RECOMMENDED_CONFIG = {
  // 基本設定
  pagination: true,
  paginationMode: "server",
  disableVirtualization: true,
  
  // 選擇狀態管理
  rowSelectionModel: [],
  keepNonExistentRowsSelected: false,
  
  // 性能優化
  columnBuffer: 5,
  rowBuffer: 5,
  
  // 穩定的 ID 生成
  getRowId: (row) => row._stableId,
};
```

### 分頁狀態管理
```javascript
const [page, setPage] = useState(0);
const [pageSize, setPageSize] = useState(10);

const handlePaginationModelChange = useCallback((model) => {
  const newPage = Math.max(0, model.page);
  const newPageSize = Math.max(1, model.pageSize);
  
  if (newPage !== page || newPageSize !== pageSize) {
    setPage(newPage);
    setPageSize(newPageSize);
  }
}, [page, pageSize]);
```

## 🔍 除錯技巧

### 1. **開發模式除錯資訊**
```javascript
{process.env.NODE_ENV === 'development' && (
  <div>
    Debug: Page {page + 1}, Size {pageSize}, Total {totalCount}, 
    Rows {rows.length}
  </div>
)}
```

### 2. **Row ID 驗證**
```javascript
// 驗證所有行是否有有效的 ID
const validateRowIds = (rows) => {
  rows.forEach((row, index) => {
    if (!row._stableId) {
      console.warn(`Row at index ${index} missing stable ID`, row);
    }
  });
};
```

### 3. **API 響應監控**
```javascript
// 在 RTK Query 中添加日誌
transformResponse: (response) => {
  console.log('API Response:', response);
  // 處理響應...
};
```

## 📋 檢查清單

在實施伺服器端分頁前，請確保：

- [ ] 每行都有穩定且唯一的 ID
- [ ] API 響應格式一致
- [ ] 添加了適當的錯誤處理
- [ ] 實施了資料驗證
- [ ] 處理了空資料狀態
- [ ] 測試了最後一頁的行為
- [ ] 添加了適當的載入狀態
- [ ] 清除了不必要的選擇狀態

## ⚠️ 注意事項

1. **避免使用不穩定的 ID**: 不要使用可能變化的欄位作為 Row ID
2. **總是驗證 API 響應**: 確保響應格式符合預期
3. **處理邊界情況**: 空資料、網路錯誤、格式錯誤等
4. **測試分頁邊界**: 特別注意第一頁和最後一頁的行為
5. **保持狀態同步**: 確保 UI 狀態與資料狀態同步

遵循這些最佳實踐可以有效避免 "No row with id found" 等常見錯誤，確保表格在各種情況下都能穩定運行。