# 🎭 Mock 資料使用指南

## 問題已修復 ✅

之前遇到的 `500 (Internal Server Error)` 問題已經解決！現在 Mock API 可以正常運作了。

## 📍 當前狀態

- ✅ **Mock API 已啟用**
- ✅ **已修復 API 調用邏輯**
- ✅ **完整的假資料系統**
- ✅ **支援所有 CRUD 操作**

## 🚀 立即開始

### 1. 啟動開發伺服器

```bash
npm run dev
```

### 2. 訪問機台看板

打開瀏覽器訪問：
```
http://localhost:3000/MachineStatusBoard
```

### 3. 查看控制台日誌

打開瀏覽器開發者工具（F12），你應該會看到：
```
[Mock API] 獲取區域 A 的機台狀態: 10 台機器
```

## 📊 假資料內容

### 機台配置
- **A 區**：10 台機器（1 台雙色，9 台單色）
- **B 區**：11 台機器（9 台雙色，2 台單色）
- **C 區**：9 台機器（1 台雙色，8 台單色）
- **D 區**：9 台機器（全部單色）

### 機台狀態
- 🟢 **RUN** (生產中) - 綠色
- ⚪ **IDLE** (待機中) - 灰色
- 🟡 **TUNING** (上模與調機) - 黃色
- 🔵 **TESTING** (產品試模) - 藍色
- 🔴 **OFFLINE** (機台停機) - 紅色

### 假資料特點
- ✨ 每次重新載入都會生成新的隨機狀態
- 📦 包含真實的產品名稱（如"塑膠杯蓋-A型"）
- 🔧 包含停機原因（如"定期保養"、"模具更換"）
- 📅 包含計劃和實際的開始/結束時間

## 🔧 配置檔案位置

### Mock API 開關
```
src/components/WiseScheduling/services/mockData/useMockApi.js
```

```javascript
export const USE_MOCK_API = true;  // ← 改這裡
export const MOCK_API_DELAY = 300; // API 延遲（毫秒）
```

### 假資料生成器
```
src/components/WiseScheduling/services/mockData/machineStatusMockData.js
```

### API 邏輯
```
src/components/WiseScheduling/services/machine/machineStatusApi.js
```

## 🎯 切換到真實 API

當後端準備好時：

1. 編輯 `useMockApi.js`：
```javascript
export const USE_MOCK_API = false;  // 停用假資料
```

2. 重新載入頁面

## 🐛 除錯方式

### 查看 Mock 資料是否啟用
打開瀏覽器控制台，執行：
```javascript
// 查看當前設定
console.log('Mock API:', window.USE_MOCK_API);
```

### 查看 Mock 資料內容
控制台會顯示：
```
[Mock API] 獲取區域 A 的機台狀態: 10 台機器
[Mock API] 更新機台狀態: {...}
[Mock API] 新增機台狀態: {...}
[Mock API] 刪除機台狀態 ID: 123
```

### 如果還是看到錯誤

1. **清除快取**：按 `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac)
2. **檢查控制台**：是否有 `[Mock API]` 開頭的日誌？
3. **確認檔案**：確認 `useMockApi.js` 中 `USE_MOCK_API = true`

## 📚 相關文件

詳細文檔請參考：
```
src/components/WiseScheduling/services/mockData/README.md
```

## ✨ 功能測試

### 可以測試的功能
1. ✅ 查看所有區域的機台狀態
2. ✅ 切換不同區域（A, B, C, D）
3. ✅ 點擊機台卡片查看詳細資訊
4. ✅ 修改機台狀態
5. ✅ 查看不同狀態的顏色標示

### 資料特性
- 🔄 CRUD 操作會更新記憶體中的資料
- 💾 資料在頁面重新載入後會重置
- ⚡ 模擬 300ms 的 API 延遲

## 🎉 完成！

現在你已經有一個完整可用的 WiseScheduling 系統，使用假資料進行開發和測試！

有任何問題嗎？檢查控制台日誌，應該會有 `[Mock API]` 開頭的除錯訊息。
