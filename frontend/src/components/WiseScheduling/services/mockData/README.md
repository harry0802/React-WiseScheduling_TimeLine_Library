# WiseScheduling Mock Data

這個目錄包含 WiseScheduling 系統的假資料（Mock Data）實現。

## 📁 文件說明

### `machineStatusMockData.js`
生成機台狀態假資料的核心模組。

**主要功能：**
- `generateMachineStatus(machineSN, productionArea, singleOrDoubleColor)` - 生成單一機台狀態
- `generateAreaMachineStatus(area)` - 生成整個區域的機台狀態
- `generateAllMachineStatus()` - 生成所有區域的機台狀態

**資料結構範例：**
```javascript
{
  machine: {
    id: 101,
    machineSN: "A1",
    productionArea: "A",
    singleOrDoubleColor: "雙"
  },
  machineStatusId: 1010,
  machineId: 101,
  status: "RUN",  // RUN, IDLE, TUNING, TESTING, OFFLINE
  planStartDate: "2025-11-05T...",
  planEndDate: "2025-11-10T...",
  actualStartDate: "2025-11-06T...",
  actualEndDate: null,
  machineStatusProduct: "塑膠杯蓋-A型",
  machineStatusReason: null
}
```

### `useMockApi.js`
Mock API 開關和配置。

**設定：**
```javascript
export const USE_MOCK_API = true;  // 啟用/停用假資料
export const MOCK_API_DELAY = 300; // API 延遲時間（毫秒）
```

## 🚀 使用方式

### 1. 啟用假資料

編輯 `useMockApi.js`：
```javascript
export const USE_MOCK_API = true;  // 設為 true 啟用假資料
```

### 2. 停用假資料（使用真實 API）

編輯 `useMockApi.js`：
```javascript
export const USE_MOCK_API = false;  // 設為 false 使用真實 API
```

## 📊 支援的功能

### ✅ 已支援
- ✅ GET - 獲取機台狀態列表 (`getMachineStatus`)
- ✅ POST - 新增機台狀態 (`createMachineStatus`)
- ✅ PUT - 更新機台狀態 (`updateMachineStatus`)
- ✅ DELETE - 刪除機台狀態 (`deleteMachineStatus`)

### 🎯 機台狀態類型
- `RUN` - 生產中
- `IDLE` - 待機中
- `TUNING` - 上模與調機
- `TESTING` - 產品試模
- `OFFLINE` - 機台停機

### 🏭 生產區域
- A 區：10 台機器
- B 區：11 台機器
- C 區：9 台機器
- D 區：9 台機器

## 🔧 自訂假資料

### 修改樣本產品
編輯 `machineStatusMockData.js` 中的 `SAMPLE_PRODUCTS`：
```javascript
const SAMPLE_PRODUCTS = [
  "您的產品名稱-1",
  "您的產品名稱-2",
  // ...
];
```

### 修改停機原因
編輯 `machineStatusMockData.js` 中的 `SAMPLE_REASONS`：
```javascript
const SAMPLE_REASONS = [
  "您的停機原因-1",
  "您的停機原因-2",
  // ...
];
```

### 調整 API 延遲時間
編輯 `useMockApi.js`：
```javascript
export const MOCK_API_DELAY = 500; // 改為 500 毫秒
```

## 🐛 除錯

### 檢查是否使用假資料
在瀏覽器控制台執行：
```javascript
// 查看 Mock API 狀態
console.log('USE_MOCK_API:', window.USE_MOCK_API);
```

### 查看當前假資料
```javascript
// 在 machineStatusApi.js 中匯出 mockDataStore
console.log(mockDataStore);
```

## 📝 注意事項

1. **資料持久性**：假資料儲存在記憶體中，重新整理頁面後會重置
2. **CRUD 操作**：所有 CRUD 操作都會更新記憶體中的資料
3. **真實 API**：當 `USE_MOCK_API = false` 時，需要確保後端 API 正常運作
4. **隨機資料**：每次重新載入頁面，假資料都會隨機生成

## 🎯 開發流程

### 前端開發階段
```javascript
// useMockApi.js
export const USE_MOCK_API = true;
```
使用假資料進行 UI 開發和測試。

### 整合測試階段
```javascript
// useMockApi.js
export const USE_MOCK_API = false;
```
切換到真實 API 進行整合測試。

### 生產環境
```javascript
// useMockApi.js
export const USE_MOCK_API = false;
```
確保生產環境使用真實 API。

## 🤝 貢獻

需要新增更多假資料或功能？請修改以下文件：
- 機台狀態：`machineStatusMockData.js`
- API 設定：`useMockApi.js`
- API 邏輯：`../machine/machineStatusApi.js`
