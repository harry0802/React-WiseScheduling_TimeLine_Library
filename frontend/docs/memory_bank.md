### TimelineGantt DOM 結構平面化優化

完成了 TimelineGantt 組件的 DOM 結構平面化優化，將原本多層嵌套的樣式組件系統簡化：

1. **樣式整合**：

   - 創建了 `TimelineContainer.js` 將原本分散在多個樣式文件中的規則整合
   - 保留所有必要的選擇器和樣式屬性，確保功能一致性
   - 微調部分樣式以提高一致性和效能

2. **DOM 結構簡化**：

   - 將原本 7 層嵌套的 DOM 結構簡化為 1 層
   - 移除了多餘的容器元素，渲染效率提高
   - 保持相同的功能和視覺效果

3. **代碼可讀性提升**：
   - 簡化的 JSX 結構更易於閱讀和理解
   - 樣式組件雜用更直觀，降低了維護成本
   - 原有組件保持可寬容性，但標記為已棄用

這項優化大幅降低了 DOM 的複雜度，增加了渲染效率，同時使代碼更易維護。# 專案記憶庫 - FlaskPlastic Frontend

## 目錄與檔案結構

### 根目錄結構

```
frontend/
├── docs/                    # 專案文檔
├── public/                  # 靜態資源
├── src/                     # 核心源代碼
│   ├── assets/              # 資源文件 (圖片、圖標等)
│   ├── components/          # 可重用組件
│   ├── config/              # 項目配置
│   ├── hooks/               # 自定義 React Hooks
│   ├── i18n/                # 國際化相關
│   ├── layout/              # 頁面佈局組件
│   ├── pages/               # 頁面級組件
│   ├── router/              # 路由配置
│   ├── services/            # API 服務
│   ├── store/               # Redux 狀態管理
│   ├── styles/              # 全局樣式
│   ├── utils/               # 工具函數
│   ├── utility/             # 通用工具
│   ├── App.js               # 舊的主應用入口 (目前未使用)
│   ├── App.scss             # 主應用樣式
│   ├── App-V1.js            # 當前主應用入口
│   └── index.js             # 應用初始化入口
├── .gitignore               # Git 忽略文件
├── Dockerfile               # Docker 配置
├── package.json             # 依賴配置
└── nginx.conf               # Nginx 配置
```

### 關鍵組件結構

#### WiseScheduling 組件結構 (智能排程系統)

```
components/WiseScheduling/
├── components/
│   ├── machine/             # 機台狀態相關組件
│   │   └── MachineStatusBoard.jsx  # 機台狀態看板
│   └── timelineGantt/       # 時間軸甘特圖組件
│       ├── components/      # 子組件
│       │   ├── ItemDialog.jsx        # 項目詳細信息對話框
│       │   ├── OperationDialog.jsx   # 操作確認對話框
│       │   ├── TimelineControls.jsx  # 時間軸控制器
│       │   └── TimelineContent.jsx   # 時間軸內容模板
│       ├── configs/         # 配置
│       │   ├── constants.js          # 常量定義
│       │   ├── formConfig.js         # 表單配置
│       │   ├── machineGroups.js      # 機台分組配置
│       │   ├── orderItems.js         # 訂單項配置
│       │   └── timeline/            # 時間軸特定配置
│       │       ├── timelineConfigs.js    # 時間軸樣式配置
│       │       ├── timelineLocale.js     # 本地化配置
│       │       └── timelineOptions.js    # 時間軸選項
│       ├── hooks/           # 自定義 Hooks
│       │   ├── useStatusForm.js      # 狀態表單 Hook
│       │   ├── useTimelineData.js    # 時間軸數據 Hook
│       │   └── useTimelineOperations.js # 時間軸操作 Hook
│       ├── styles/          # 樣式組件
│       │   ├── TimelineAxis.styles.js     # 時間軸樣式
│       │   ├── TimelineBase.styles.js     # 基礎容器樣式
│       │   ├── TimelineItem.styles.js     # 項目樣式
│       │   ├── TimelineStatus.styles.js   # 狀態樣式
│       │   └── index.js               # 樣式導出
│       ├── utils/           # 工具函數
│       │   ├── dateUtils.js           # 日期工具
│       │   └── formUtils.js           # 表單工具
│       └── index.jsx        # 時間軸甘特圖主組件
├── api/                     # API 相關
├── assets/                  # 資源文件
├── configs/                 # 整體配置
├── hooks/                   # 模組 Hooks
├── lib/                     # 自定義庫
├── mock/                    # 模擬數據
├── services/                # 服務
├── states/                  # 狀態管理
├── utils/                   # 工具
└── index.jsx                # 主組件入口
```

## 套件相依性分析

### 核心框架和庫

| 套件名稱         | 版本    | 主要用途         |
| ---------------- | ------- | ---------------- |
| react            | ^18.2.0 | 前端 UI 庫       |
| react-dom        | ^18.2.0 | React DOM 渲染   |
| react-router-dom | ^6.10.0 | 路由管理         |
| @reduxjs/toolkit | ^1.9.4  | Redux 狀態管理   |
| react-redux      | ^8.0.5  | React Redux 綁定 |
| zustand          | ^4.5.2  | 輕量級狀態管理   |

### UI 框架和組件

| 套件名稱            | 版本    | 主要用途               |
| ------------------- | ------- | ---------------------- |
| @mui/material       | ^5.15.4 | Material UI 組件庫     |
| @mui/icons-material | ^5.15.4 | Material UI 圖標       |
| @mui/x-data-grid    | ^6.6.0  | 數據表格組件           |
| @mui/x-date-pickers | ^6.18.7 | 日期選擇器組件         |
| antd                | ^5.14.0 | Ant Design 組件庫      |
| @ant-design/icons   | ^4.0.0  | Ant Design 圖標        |
| styled-components   | ^5.3.11 | CSS-in-JS 樣式解決方案 |

### 日期和時間處理

| 套件名稱 | 版本     | 主要用途         |
| -------- | -------- | ---------------- |
| dayjs    | ^1.11.10 | 輕量級日期處理庫 |
| moment   | ^2.29.4  | 日期時間處理     |

### 表單處理

| 套件名稱            | 版本    | 主要用途                |
| ------------------- | ------- | ----------------------- |
| react-hook-form     | ^7.53.0 | 表單處理和驗證          |
| @hookform/resolvers | ^3.1.1  | 表單驗證解析器          |
| yup                 | ^1.2.0  | 表單驗證架構            |
| zod                 | ^3.23.8 | TypeScript 優先的驗證庫 |

### 數據可視化

| 套件名稱        | 版本   | 主要用途            |
| --------------- | ------ | ------------------- |
| chart.js        | ^4.4.0 | 圖表繪製            |
| react-chartjs-2 | ^5.2.0 | React Chart.js 集成 |
| echarts         | ^5.4.3 | 大型數據可視化庫    |
| react-echarts   | ^0.1.1 | React ECharts 集成  |
| vis-timeline    | ^7.7.3 | 時間軸可視化        |
| vis-data        | ^7.1.9 | 可視化數據處理      |

### 國際化

| 套件名稱                         | 版本    | 主要用途         |
| -------------------------------- | ------- | ---------------- |
| i18next                          | ^22.5.0 | 國際化框架       |
| react-i18next                    | ^12.3.1 | React 國際化綁定 |
| i18next-browser-languagedetector | ^7.2.1  | 瀏覽器語言檢測   |

### 其他工具庫

| 套件名稱   | 版本    | 主要用途              |
| ---------- | ------- | --------------------- |
| classnames | ^2.3.2  | CSS 類名處理          |
| exceljs    | ^4.4.0  | Excel 文件處理        |
| file-saver | ^2.0.5  | 文件保存功能          |
| js-cookie  | ^3.0.5  | Cookie 操作           |
| xlsx       | ^0.18.5 | Excel 文件解析        |
| react-use  | ^17.5.1 | React 常用 Hooks 集合 |

### 開發工具

| 套件名稱        | 版本    | 主要用途     |
| --------------- | ------- | ------------ |
| sass            | ^1.62.0 | CSS 預處理器 |
| msw             | ^1.2.1  | API 模擬     |
| @faker-js/faker | ^7.6.0  | 假數據生成   |

## 核心功能模組詳解

### 路由系統

使用 React Router v6 進行路由管理，通過 `useRoutes` Hook 實現動態路由配置。路由配置位於 `src/router/routeConfig.js`，使用懶加載方式優化性能。

**主要特點**:

- 使用配置式路由定義
- 組件懶加載
- 嵌套路由支持
- 支持路由參數

### 狀態管理

項目同時使用 Redux 和 Zustand 管理狀態：

- Redux (Redux Toolkit) 用於全局狀態管理
- Zustand 用於某些組件和功能的局部狀態

### 時間軸甘特圖組件 (TimelineGantt)

智能排程系統的核心組件，基於 vis-timeline 實現，用於顯示和管理生產排程。

**主要功能**:

- 時間軸可視化生產訂單
- 支持拖拽調整訂單時間和位置
- 多種時間範圍視圖 (小時、天、週、月)
- 訂單詳情查看與編輯
- 狀態顏色差異化顯示

**核心文件**:

- `timelineGantt/index.jsx`: 主組件
- `timelineGantt/hooks/useTimelineData.js`: 數據處理 Hook
- `timelineGantt/hooks/useTimelineOperations.js`: 操作處理 Hook
- `timelineGantt/configs/constants.js`: 常量定義

**數據流程**:

1. 通過 `useTimelineData` Hook 獲取機台和訂單數據
2. 使用 `useTimelineOperations` Hook 處理用戶操作
3. 渲染 Timeline 組件並綁定事件處理
4. 通過對話框管理訂單編輯

### 機台狀態看板 (MachineStatusBoard)

顯示所有機台的當前狀態和生產情況。

**主要功能**:

- 機台狀態實時顯示
- 狀態分類和過濾
- 快速狀態切換

### 國際化 (i18n)

使用 i18next 實現多語言支持，主要支持中文和英文。

**主要特點**:

- 語言檢測與切換
- 資源文件分離
- 翻譯註入組件

## 開發規範指南

### 代碼風格與組織

1. **文件結構**:

   - 每個功能模組有自己的資料夾
   - 組件按照功能分類
   - 共享組件放在 components 文件夾下
   - 頁面級組件放在 pages 文件夾下

2. **命名慣例**:

   - 組件使用 PascalCase (如 `MachineStatusBoard`)
   - 函數和變量使用 camelCase (如 `handleChange`)
   - 常量使用大寫下劃線 (如 `MACHINE_STATUS`)
   - 文件名與組件名保持一致

3. **代碼組織**:

   ```jsx
   //! =============== 1. 設定與常量 ===============
   // 導入語句和常量定義

   //! =============== 2. 類型與介面 ===============
   // 類型定義

   //! =============== 3. 核心功能 ===============
   // 主要組件和業務邏輯

   //! =============== 4. 輔助函數 ===============
   // 工具函數和輔助方法
   ```

### React 最佳實踐

1. **Hooks 使用**:

   - 使用自定義 Hooks 抽取複雜邏輯
   - 遵循 Hooks 使用規則
   - 使用 useCallback 和 useMemo 優化性能

2. **組件設計**:

   - 組件功能單一
   - 使用 Props 傳遞數據和回調
   - 使用 children 和組合模式

3. **性能優化**:
   - 組件分割和代碼分割
   - 使用 memo 減少不必要的渲染
   - 使用懶加載加載組件

### 樣式規範

1. 主要使用 styled-components 定義樣式
2. 使用 MUI 的 sx 屬性進行局部樣式調整
3. 全局樣式放在 .scss 文件中
4. 使用主題變量確保一致性

### 錯誤處理與穩健性

1. **基本錯誤處理**:
   - 使用 try/catch 處理可能的錯誤
   - 優雅降級和錯誤邊界處理
   - 提供清晰的錯誤信息

2. **数据處理穩健性**:
   - 在處理 API 回應時添加默認值邏輯
   - 使用可選鏈接運算符 (`?.`)來避免存取空值屬性
   - 為表單元素和展示元素提供默認值
   - 對資料模型進行添加防護，確保必要屬性存在

3. **用戶互動容錯**:
   - 在拖拉和黨擬互動之前進行有效性檢查
   - 對不預期的狀態切換添加確認提示
   - 提供可撼攻性強的表單驗證

## 時間軸甘特圖實現細節

### 初始化過程

```jsx
// 1. 獲取數據
const { itemsDataRef, groups } = useTimelineData();

// 2. 初始化時間軸
const initTimeline = useCallback(() => {
  if (!containerRef.current || !itemsDataRef.current || !groups) return;

  const options = {
    ...getTimelineOptions(),
    template: createItemTemplate,
  };

  // 初始化或更新時間軸
  if (!timelineRef.current) {
    containerRef.current.innerHTML = "";
    timelineRef.current = new Timeline(
      containerRef.current,
      itemsDataRef.current,
      groups,
      options
    );
  } else {
    timelineRef.current.setOptions(options);
    timelineRef.current.setData({
      items: itemsDataRef.current,
      groups,
    });
  }
}, [groups, getTimelineOptions]);
```

### 數據結構

```typescript
// 時間軸項目
interface TimelineItem {
  id: string | number;
  group: string; // 機台ID
  area: string; // 區域
  timeLineStatus: string; // 狀態
  status: {
    startTime: Date;
    endTime: Date | null;
    reason: string;
    product: string;
  };
  orderInfo: {
    scheduledStartTime: Date;
    scheduledEndTime: Date;
    actualStartTime: Date | null;
    actualEndTime: Date | null;
    productId: string;
    productName: string;
    quantity: number;
    completedQty: number;
    process: string;
    orderStatus: string;
  };
  start: Date; // 顯示開始時間
  end: Date; // 顯示結束時間
  className: string; // CSS 類名
  content: string; // 顯示內容
}
```

### 操作處理

主要通過 `useTimelineOperations` Hook 處理用戶操作：

- `handleSaveItem`: 保存更新的項目
- `handleDeleteItem`: 刪除項目
- `handleAddItem`: 添加新項目
- `handleMoveToNow`: 移動到當前時間

### 狀態管理

使用機台狀態常量定義：

```js
export const MACHINE_STATUS = {
  ORDER_CREATED: "製立單",
  IDLE: "待機中",
  SETUP: "上模與調機",
  TESTING: "產品試模",
  STOPPED: "機台停機",
};

export const STATUS_CONFIG = {
  [MACHINE_STATUS.ORDER_CREATED]: {
    name: MACHINE_STATUS.ORDER_CREATED,
    description: "製立單模式",
    color: "#4caf50",
    className: "status-producing",
    canSwitch: false,
    canDelete: false,
    allowedTransitions: [],
  },
  // ...其他狀態配置
};
```

### 日期處理

使用 dayjs 進行日期處理和格式化：

```js
export const getTimeWindow = (range, centerTime = dayjs()) => {
  const now = centerTime;
  const WORK_START_HOUR = 8;

  const windows = {
    hour: {
      start: now.subtract(1, "hour"),
      end: now.add(1, "hour"),
    },
    day: {
      start: now.startOf("day").hour(WORK_START_HOUR),
      end: now.endOf("day").startOf("hour"),
    },
    week: {
      start: now.startOf("week").hour(WORK_START_HOUR),
      end: now.endOf("week").startOf("hour"),
    },
    month: {
      start: now.startOf("month").hour(WORK_START_HOUR),
      end: now.endOf("month").startOf("hour"),
    },
  };

  return windows[range] || windows.day;
};
```

## 路由與頁面配置

### 主要頁面與路由

專案使用 React Router v6 進行路由管理，路由配置主要位於 `src/router/routeConfig.js`。主要路由包括：

| 路由路徑                           | 頁面組件                       | 功能說明                 |
| ---------------------------------- | ------------------------------ | ------------------------ |
| /                                  | LoginPage                      | 登入頁面                 |
| /ProductionSchedulePage            | ProductionSchedulePage         | 生產排程頁面             |
| /WiseSchedulingPage                | WiseSchedulingPage             | 智能排程系統             |
| /TimelineGanttPage                 | TimelineGanttPage              | 時間軸甘特圖獨立頁面     |
| /ProductionRecordPage/\*           | ProductionRecordPage           | 生產記錄（含子路由）     |
| /QualityManagementSystem/\*        | QualityAssuranceSystemPage     | 品質管理系統（含子路由） |
| /SalesQuotationManagementSystem/\* | SalesQuotationManagementSystem | 銷售報價系統（含子路由） |
| /MachineMaintenance                | MachineMaintenancePage         | 機台維護                 |
| /MoldMaintenance                   | MoldMaintenancePage            | 模具維護                 |

### 路由配置與懶加載

所有頁面組件都通過懶加載方式導入，減少初始加載時間：

```jsx
// lazyComponents.js 示例
export const WiseSchedulingPage = lazyImport(() =>
  import("../pages/WiseSchedulingPage")
);

export const TimelineGanttPage = lazyImport(() =>
  import("../pages/TimelineGanttPage")
);
```

```jsx
// routeConfig.js 示例
{
  path: "WiseSchedulingPage",
  element: (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponents.WiseSchedulingPage />
    </React.Suspense>
  ),
},
{
  path: "TimelineGanttPage",
  element: (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponents.TimelineGanttPage />
    </React.Suspense>
  ),
},
```

### 頁面整合

WiseSchedulingPage 頁面使用選項卡 UI 將 MachineStatusBoard 和 DynamicTimeline 組件進行整合：

```jsx
// WiseSchedulingPage.jsx
const WiseSchedulingPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="機台狀態看板" />
          <Tab label="排程時間軸" />
        </Tabs>
      </Paper>

      {activeTab === 0 && <WiseSchedulingIndex />}
      {activeTab === 1 && <DynamicTimeline />}
    </Box>
  );
};
```

同時，TimelineGanttPage 提供了獨立的路由入口，使用戶可以直接訪問時間軸甘特圖。

## 最近整合與更新

### TimelineGantt 組件整合

最近完成了 TimelineGantt 組件的整合，主要涉及以下工作：

1. **代碼重構與優化**：

   - 將所有 import 語句移至文件頂部，避免 ESLint 警告
   - 優化 import 順序，確保組件加載順序正確
   - 修復樣式和常量定義問題

2. **路由配置更新**：

   - 添加 TimelineGanttPage 作為獨立頁面
   - 更新 WiseSchedulingPage 使用選項卡整合機台看板和時間軸視圖
   - 設置懶加載提高性能

3. **組件職責優化**：

   - 將 WiseSchedulingIndex 組件恢復到只負責 MachineStatusBoard 的渲染
   - 在頁面級別實現選項卡邏輯，避免組件層級過度複雜

4. **依賴管理**：
   - 添加 vis-timeline 和 vis-data 依賴
   - 添加 styled-components 依賴支持樣式定義

### TimelineGantt 日期拖移功能優化

完成了甘特圖日期拖移限制的移除，使用戶可以自由拖動項目到任何日期：

1. **移除日期限制**：

   - 在 `timelineConfigs.js` 中移除各時間範圍的 `min` 和 `max` 限制
   - 在 `getTimelineOptions` 函數中明確設置 `min` 和 `max` 為 `undefined`
   - 增加 `zoomMax` 參數以允許更大範圍的視圖

2. **時間視窗調整**：

   - 修改 `getTimeWindow` 函數，從基於 `startOf/endOf` 的視圖改為線性視圖
   - 擴大初始視圖範圍，例如日視圖從單日變為前後各三天
   - 保留初始視圖建議但不限制用戶實際操作範圍

3. **拖動行為優化**：
   - 設置 `snap: null` 確保拖動時不會強制對齊到特定時間點
   - 在 `onMove` 回調中直接接受所有移動，取消原有的限制邏輯

### 已知問題與待辦事項

1. **ESLint 警告處理**：

   - 解決了 import 順序的 ESLint 警告
   - 後續可考慮添加.eslintrc 配置進一步規範代碼風格

2. **樣式整合**：

   - TimelineGantt 組件使用 styled-components
   - 需要確保與現有的 MUI 和 SCSS 樣式系統無衝突

3. **後端集成**：
   - 目前使用模擬數據，後續需要與後端 API 集成
   - 實現數據持久化和實時更新

## 注意事項與維護建議

### 潛在問題

1. **依賴衝突**: moment.js 和 dayjs 同時使用可能導致混淆和不一致
2. **狀態管理混合**: 同時使用 Redux 和 Zustand 可能導致狀態管理混亂
3. **樣式系統混合**: 同時使用 styled-components, MUI sx, 和 .scss 文件可能導致樣式衝突

### 優化建議

1. **遷移至單一日期庫**: 建議完全遷移到 dayjs，逐步移除 moment.js
2. **統一狀態管理**: 為新功能選擇一種狀態管理方案
3. **組件庫統一**: 盡量統一使用 MUI 或 Ant Design，而非混合使用
4. **添加單元測試**: 增加測試覆蓋率，尤其是關鍵業務邏輯
5. **性能優化**: 使用 React.memo, useMemo 和 useCallback 減少不必要的渲染

### 擴展計劃

1. **數據持久化**: 實現數據持久化和後端集成
2. **更豐富的甘特圖功能**: 添加更多互動功能和視圖選項
3. **報表生成**: 添加報表導出功能
4. **移動響應式設計**: 優化移動設備體驗
5. **多用戶協作**: 添加實時協作功能
