# 🧪 WiseScheduling 測試指南

## 快速開始

### 1. 啟動應用
```bash
npm run dev
```
訪問：http://localhost:3000/MachineStatusBoard

## 📋 功能測試清單

### ✅ 基本顯示測試

#### 1. 機台列表顯示
- [ ] 可以看到機台卡片網格
- [ ] 每個機台卡片顯示編號（如 A1, A2, B1...）
- [ ] 每個機台卡片顯示狀態文字
- [ ] 不同狀態有不同顏色：
  - 🟢 綠色 = RUN (生產中)
  - ⚪ 灰色 = IDLE (待機中)
  - 🟡 黃色 = TUNING (上模與調機)
  - 🔵 藍色 = TESTING (產品試模)
  - 🔴 紅色 = OFFLINE (機台停機)

#### 2. 區域切換
- [ ] 可以在頁面頂部看到區域選擇器
- [ ] 切換到 A 區：顯示 10 台機器
- [ ] 切換到 B 區：顯示 11 台機器
- [ ] 切換到 C 區：顯示 9 台機器
- [ ] 切換到 D 區：顯示 9 台機器

### ✅ 互動功能測試

#### 3. 點擊機台
- [ ] 點擊非運行狀態的機台（IDLE, TUNING, TESTING, OFFLINE）
- [ ] 應該彈出右側抽屜
- [ ] 抽屜標題顯示「修改機台狀態」
- [ ] 運行中的機台（RUN 狀態）點擊無反應（預期行為）

**檢查控制台日誌：**
```
[StatusDrawer] Selected machine: {...}
[StatusDrawer] Machine ID: 101
[StatusDrawer] Machine SN: A1
```

#### 4. 狀態修改表單
打開抽屜後檢查：
- [ ] 可以看到狀態滑桿或選擇器
- [ ] 可以看到相應的表單欄位：
  - IDLE (待機中): 基本表單
  - TUNING (上模與調機): 包含產品、模具資訊
  - TESTING (產品試模): 測試相關欄位
  - OFFLINE (機台停機): 停機原因欄位
- [ ] 表單欄位可以輸入

#### 5. 提交修改
- [ ] 填寫表單欄位
- [ ] 點擊「提交」或「確認」按鈕
- [ ] 抽屜自動關閉
- [ ] 機台卡片狀態更新（顏色和文字變更）

**檢查控制台日誌：**
```
[Mock API] 更新機台狀態: {...}
```

### ✅ Mock 資料驗證

#### 6. 查看 Mock 資料
打開瀏覽器開發者工具（F12），應該看到：

```
[Mock API] 獲取區域 A 的機台狀態: 10 台機器
[useMachineBoard] Raw machine status: Array(10) [...]
```

#### 7. 資料結構檢查
在控制台執行：
```javascript
// 查看第一台機器的資料
console.log(JSON.stringify(window.mockData?.A?.[0], null, 2));
```

應該看到：
```json
{
  "machine": {
    "id": 101,
    "machineSN": "A1",
    "productionArea": "A",
    "singleOrDoubleColor": "雙"
  },
  "machineStatusId": 1010,
  "status": "RUN",
  "planStartDate": "...",
  "machineStatusProduct": "塑膠杯蓋-A型",
  ...
}
```

## 🐛 常見問題排查

### 問題 1: 機台編號不顯示
**症狀：** 卡片上只有顏色，沒有 A1, B2 等編號

**檢查：**
1. 打開控制台
2. 找到 `[useMachineBoard] Raw machine status` 日誌
3. 查看資料是否有 `machine.machineSN`

**解決：** 如果沒有，請重新載入頁面

### 問題 2: 點擊機台沒反應
**症狀：** 點擊機台卡片，抽屜不出現

**檢查：**
1. 確認點擊的是非 RUN 狀態的機台（RUN 狀態不可點擊）
2. 查看控制台是否有錯誤
3. 檢查是否有 `[StatusDrawer]` 開頭的日誌

**解決：**
- 如果是 RUN 狀態 → 這是正常的，換一台機器試試
- 如果有錯誤 → 截圖給開發人員

### 問題 3: 狀態修改不生效
**症狀：** 提交表單後，機台狀態沒有變化

**檢查：**
1. 控制台是否有 `[Mock API] 更新機台狀態` 日誌
2. 是否有錯誤訊息

**解決：**
```bash
# 確認 Mock API 已啟用
# 檢查 src/components/WiseScheduling/services/mockData/useMockApi.js
export const USE_MOCK_API = true;  // 應該是 true
```

### 問題 4: 500 錯誤
**症狀：** 控制台顯示 `500 (Internal Server Error)`

**解決：**
```javascript
// 1. 確認 Mock API 已啟用
// src/components/WiseScheduling/services/mockData/useMockApi.js
export const USE_MOCK_API = true;

// 2. 清除瀏覽器快取
// 按 Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)

// 3. 重新啟動開發伺服器
npm run dev
```

## 📊 性能測試

### 測試資料量
- A 區：10 台機器
- B 區：11 台機器
- C 區：9 台機器
- D 區：9 台機器
- **總計：39 台機器**

### 預期延遲
- API 調用延遲：~300ms（模擬真實網路）
- 區域切換：應該在 500ms 內完成
- 抽屜開啟：即時（<100ms）

### 如果太慢
可以調整延遲時間：
```javascript
// src/components/WiseScheduling/services/mockData/useMockApi.js
export const MOCK_API_DELAY = 100;  // 改為 100ms
```

## 🎯 完整測試流程

### 基本流程
1. ✅ 啟動應用
2. ✅ 看到機台看板
3. ✅ 確認 A 區顯示 10 台機器
4. ✅ 切換到 B, C, D 區
5. ✅ 點擊一台非運行狀態的機器
6. ✅ 抽屜打開，顯示狀態表單
7. ✅ 修改狀態或填寫資訊
8. ✅ 提交表單
9. ✅ 確認機台卡片更新

### 進階流程
1. ✅ 修改多台機器
2. ✅ 切換區域後再回來，確認修改保留
3. ✅ 重新載入頁面（資料會重置）
4. ✅ 測試不同狀態轉換

## 📝 測試報告範本

```markdown
## 測試日期：YYYY-MM-DD
## 測試人員：XXX

### 基本功能
- [ ] 機台列表顯示正常
- [ ] 區域切換正常
- [ ] 點擊機台打開抽屜
- [ ] 狀態修改功能正常

### 問題記錄
1. 問題描述：
   - 重現步驟：
   - 預期結果：
   - 實際結果：
   - 截圖：

### 建議
-

### 總體評價
- 功能完整度：X/5
- 易用性：X/5
- 效能：X/5
```

## 🔗 相關文件
- [Mock 資料使用指南](./MOCK_DATA_GUIDE.md)
- [資料結構說明](./src/components/WiseScheduling/services/mockData/DATA_STRUCTURE.md)
- [README](./src/components/WiseScheduling/services/mockData/README.md)
