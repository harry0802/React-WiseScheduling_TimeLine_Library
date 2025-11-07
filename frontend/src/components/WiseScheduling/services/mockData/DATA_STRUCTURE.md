# Mock 資料結構說明

## 機台狀態資料結構

### API 回傳格式

```javascript
[
  {
    // 機台基本資訊（嵌套物件）
    machine: {
      id: 101,                    // 機台 ID
      machineSN: "A1",            // 機台編號
      productionArea: "A",        // 生產區域
      singleOrDoubleColor: "雙"   // 機台類型
    },

    // 狀態資訊（頂層）
    machineStatusId: 1010,        // 狀態記錄 ID
    machineId: 101,               // 機台 ID（冗餘欄位）
    status: "RUN",                // 機台狀態（英文代碼）

    // 時間資訊
    planStartDate: "2025-11-05T...",     // 計劃開始時間
    planEndDate: "2025-11-10T...",       // 計劃結束時間
    actualStartDate: "2025-11-06T...",   // 實際開始時間
    actualEndDate: null,                  // 實際結束時間（運行中為 null）

    // 生產資訊
    machineStatusProduct: "塑膠杯蓋-A型",  // 生產產品
    machineStatusReason: null              // 停機原因（運行中為 null）
  },
  // ... 更多機台
]
```

## 狀態代碼

### 英文代碼（API 使用）
- `RUN` - 生產中
- `IDLE` - 待機中
- `TUNING` - 上模與調機
- `TESTING` - 產品試模
- `OFFLINE` - 機台停機

### 中文名稱（顯示使用）
- "生產中"
- "待機中"
- "上模與調機"
- "產品試模"
- "機台停機"

## 資料訪問範例

### 訪問機台編號
```javascript
// ❌ 錯誤
machineData.machineSN

// ✅ 正確
machineData.machine.machineSN
```

### 訪問狀態
```javascript
// ✅ 直接訪問
machineData.status  // "RUN", "IDLE", etc.
```

### 訪問產品資訊
```javascript
// ✅ 直接訪問
machineData.machineStatusProduct  // "塑膠杯蓋-A型" 或 null
machineData.machineStatusReason   // "定期保養" 或 null
```

## useMachineBoard 的資料轉換

### 輸入（來自 API）
```javascript
{
  machine: { id: 101, machineSN: "A1", ... },
  status: "RUN",
  ...
}
```

### 輸出（processedMachines）
```javascript
{
  machine: {                    // 整個原始物件
    machine: { ... },
    status: "RUN",
    ...
  },
  englishStatus: "RUN",         // 狀態代碼
  statusText: "生產中",          // 中文狀態名稱
  isClickable: false,           // 是否可點擊
  showIcon: false               // 是否顯示圖示
}
```

### 訪問處理後的資料
```javascript
// ❌ 錯誤
processedMachine.machine.machineSN

// ✅ 正確
processedMachine.machine.machine.machineSN
```

## 常見問題

### Q: 為什麼有兩層 `machine`？
A: 因為 `useMachineBoard` 將整個原始物件包裝成 `machine` 屬性，而原始物件本身也有 `machine` 屬性。

### Q: 如何避免 `undefined` 錯誤？
A: 使用可選鏈操作符：
```javascript
machineData?.machine?.machineSN || ''
```

### Q: 為什麼需要過濾資料？
A: 確保所有資料都有必需的 `machine` 屬性：
```javascript
machineStatus.filter(item => item && item.machine)
```

## 除錯技巧

### 檢查資料結構
```javascript
console.log('[Debug] Machine data:', machineData);
console.log('[Debug] Machine SN:', machineData?.machine?.machineSN);
```

### 在瀏覽器控制台
```javascript
// 查看第一筆資料的完整結構
console.log(JSON.stringify(machineStatus[0], null, 2));
```

## 修改建議

如果你想簡化資料結構，可以在 `useMachineBoard` 中扁平化：

```javascript
const processedData = machineStatus.map((item) => ({
  ...item.machine,      // 展開 machine 物件
  ...item,              // 展開其他屬性
  machineSN: item.machine.machineSN,  // 確保有 machineSN
  englishStatus: item.status,
  // ...
}));
```

這樣就可以直接訪問 `machine.machineSN` 而不需要兩層。
