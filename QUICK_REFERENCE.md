# 🚀 WiseScheduling 快速參考

## 立即開始

```bash
npm run dev
# 訪問 http://localhost:3000/MachineStatusBoard
```

## 📌 核心文件位置

```
frontend/
├── MOCK_DATA_GUIDE.md          # Mock 資料完整指南
├── TESTING_GUIDE.md            # 測試步驟清單
├── QUICK_REFERENCE.md          # 本文件
│
└── src/components/WiseScheduling/
    ├── components/
    │   └── machine/
    │       ├── board/
    │       │   ├── MachineBoard.jsx        # 主看板組件
    │       │   └── components/
    │       │       └── MachineCard.jsx     # 機台卡片
    │       └── manager/
    │           └── StatusManager.jsx       # 狀態管理器
    │
    ├── hooks/
    │   └── machine/
    │       └── useMachineBoard.js          # 看板業務邏輯
    │
    └── services/
        ├── machine/
        │   └── machineStatusApi.js         # API 定義
        │
        └── mockData/
            ├── useMockApi.js               # ⭐ Mock 開關
            ├── machineStatusMockData.js    # 假資料生成器
            ├── README.md                   # 詳細文檔
            └── DATA_STRUCTURE.md           # 資料結構說明
```

## ⚡ 常用命令

### 啟用/停用 Mock 資料
```javascript
// src/components/WiseScheduling/services/mockData/useMockApi.js
export const USE_MOCK_API = true;   // 使用假資料
export const USE_MOCK_API = false;  // 使用真實 API
```

### 調整 API 延遲
```javascript
// src/components/WiseScheduling/services/mockData/useMockApi.js
export const MOCK_API_DELAY = 300;  // 毫秒
```

### 除錯模式
打開瀏覽器控制台（F12），會看到：
```
[Mock API] 獲取區域 A 的機台狀態: 10 台機器
[useMachineBoard] Raw machine status: [...]
[StatusDrawer] Selected machine: {...}
```

## 🎨 機台狀態

| 狀態碼 | 中文名稱 | 顏色 | 可點擊 |
|--------|---------|------|--------|
| RUN | 生產中 | 🟢 綠色 | ❌ |
| IDLE | 待機中 | ⚪ 灰色 | ✅ |
| TUNING | 上模與調機 | 🟡 黃色 | ✅ |
| TESTING | 產品試模 | 🔵 藍色 | ✅ |
| OFFLINE | 機台停機 | 🔴 紅色 | ✅ |

## 📊 機台配置

| 區域 | 機台數量 | 機台編號 |
|------|---------|---------|
| A 區 | 10 台 | A1-A10 |
| B 區 | 11 台 | B1-B11 |
| C 區 | 9 台 | C1-C9 |
| D 區 | 9 台 | D1-D9 |
| **總計** | **39 台** | |

## 🔧 常見問題速查

### Q: 看不到機台編號？
```bash
# 1. 重新載入頁面 (Ctrl+Shift+R)
# 2. 檢查控制台是否有錯誤
# 3. 確認 Mock API 已啟用
```

### Q: 點擊機台沒反應？
```
✅ 運行中 (RUN) 的機台不可點擊（預期行為）
✅ 試試點擊其他狀態的機台
```

### Q: 出現 500 錯誤？
```javascript
// 檢查 useMockApi.js
export const USE_MOCK_API = true;  // 必須是 true

// 然後重新載入頁面
```

### Q: 修改狀態不生效？
```
1. 檢查控制台是否有 [Mock API] 更新日誌
2. 確認 Mock API 已啟用
3. 檢查 RTK Query 是否有錯誤
```

## 💡 開發提示

### 查看完整資料結構
```javascript
// 在瀏覽器控制台執行
console.log(JSON.stringify(machineData, null, 2));
```

### 資料訪問模式
```javascript
// ❌ 錯誤
machineData.machineSN

// ✅ 正確（在 useMachineBoard 處理後）
machineData.machine.machine.machineSN

// ✅ 安全訪問
machineData.machine?.machine?.machineSN || 'N/A'
```

### 測試 CRUD 操作
```javascript
// Mock API 支援：
✅ GET    - 獲取機台列表
✅ POST   - 新增機台狀態
✅ PUT    - 更新機台狀態
✅ DELETE - 刪除機台狀態（重置為 IDLE）
```

## 📚 文檔導航

| 需求 | 查看文件 |
|------|---------|
| 快速啟動 | 本文件 |
| Mock 資料詳細說明 | [MOCK_DATA_GUIDE.md](./MOCK_DATA_GUIDE.md) |
| 測試步驟 | [TESTING_GUIDE.md](./TESTING_GUIDE.md) |
| 資料結構 | [DATA_STRUCTURE.md](./src/components/WiseScheduling/services/mockData/DATA_STRUCTURE.md) |
| Mock API 使用 | [README.md](./src/components/WiseScheduling/services/mockData/README.md) |

## 🎯 核心流程

### 用戶操作流程
```
1. 查看機台看板
   ↓
2. 選擇區域 (A/B/C/D)
   ↓
3. 點擊機台卡片
   ↓
4. 抽屜打開，顯示狀態表單
   ↓
5. 修改狀態/填寫資訊
   ↓
6. 提交表單
   ↓
7. 機台卡片即時更新
```

### 資料流程
```
Mock Data Store
   ↓
getMachineStatus (API)
   ↓
useMachineBoard (Hook)
   ↓
processedMachines
   ↓
MachineCard (Display)
   ↓
[User Click]
   ↓
StatusManager (Edit)
   ↓
updateMachineStatus (API)
   ↓
Mock Data Store (Updated)
   ↓
RTK Query Invalidation
   ↓
UI Re-render
```

## 🚨 緊急修復

### 完全重置
```bash
# 1. 停止開發伺服器 (Ctrl+C)

# 2. 清除快取
rm -rf node_modules/.vite

# 3. 重新啟動
npm run dev

# 4. 強制重新載入瀏覽器 (Ctrl+Shift+R)
```

### Mock API 不生效
```javascript
// 1. 檢查文件
cat src/components/WiseScheduling/services/mockData/useMockApi.js

// 2. 確認輸出
export const USE_MOCK_API = true;

// 3. 如果是 false，改為 true
// 4. 重新載入頁面
```

## ✨ 功能特點

- ✅ 完全離線運作（不需要後端）
- ✅ 即時資料更新
- ✅ 真實的 CRUD 操作
- ✅ 39 台機器的完整資料
- ✅ 5 種機台狀態
- ✅ 真實的產品名稱和原因
- ✅ 模擬 API 延遲（300ms）
- ✅ 支援區域切換
- ✅ 響應式設計

## 📞 需要幫助？

1. **查看控制台日誌** - 有詳細的除錯訊息
2. **閱讀文檔** - 參考上方文檔導航
3. **檢查 Git 記錄** - `git log --oneline`
4. **查看測試指南** - [TESTING_GUIDE.md](./TESTING_GUIDE.md)

---

**最後更新：** 2025-11-08
**版本：** wisescheduling-only 分支
**Mock 資料：** ✅ 已啟用
