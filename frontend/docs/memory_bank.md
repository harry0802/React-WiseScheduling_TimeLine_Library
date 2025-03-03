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

### 全局側邊欄組件 (Sidebar)

側邊欄組件是應用程序的主要導航界面，採用了結構化的代碼組織和詳細的文檔註釋風格：

1. **代碼結構分區**：

   ```jsx
   //! =============== 1. 設定與常量 ===============
   //* 這個區塊包含所有專案配置，便於統一管理

   //! =============== 2. 類型與介面 ===============
   //* 定義所有資料結構，幫助理解資料流向

   //! =============== 3. 核心功能 ===============
   //* 主要業務邏輯區，每個功能都配有詳細說明

   //! =============== 4. 工具函數 ===============
   //* 通用功能區，可被多個模組復用

   //! =============== 5. 樣式組件 ===============
   //* 樣式相關的組件定義
   ```

2. **JSDoc 風格註釋**：

   - 每個常量、函數和組件都有詳細的 JSDoc 註釋
   - 包含描述、參數、返回值和使用示例
   - 添加了 `@notes` 標籤提供額外上下文

3. **常量管理**：

   ```jsx
   const MENU_ITEMS = [
     {
       key: "production",
       icon: <ScheduleOutlined />,
       label: "生管部門",
       children: [
         {
           key: "ProductionSchedulePage",
           label: "計畫排程表",
         },
         // 其他子項目...
       ],
     },
     // 其他主要類別...
   ];

   // 排除側邊欄顯示的頁面路徑
   const EXCLUDED_PAGES = [
     "/",
     "/MachineSelectPage",
     "/ProductionReportPage",
     // 其他排除頁面...
   ];
   ```

4. **路徑處理工具函數**：

   ```jsx
   const normalizePath = (path) =>
     path.replace(PATH_PATTERNS.TRAILING_SLASHES, "");

   const isRootPath = (path) => normalizePath(path) === PATH_PATTERNS.ROOT;

   const isPathMatch = (currentPath, targetPath) => {
     const normalized = normalizePath(currentPath);
     return (
       normalized === targetPath || normalized.startsWith(`${targetPath}/`)
     );
   };

   const shouldHideSidebar = (pathname) => {
     if (isRootPath(pathname)) {
       return true;
     }
     return EXCLUDED_PAGES.some((path) => isPathMatch(pathname, path));
   };
   ```

5. **樣式組件設計**：

   - 使用 styled-components 創建自定義樣式
   - 每個樣式組件都有詳細的註釋說明
   - 樣式代碼按照布局定位、盒模型、視覺樣式等分類組織

6. **組件功能**：
   - 支持折疊/展開側邊欄
   - 根據當前路徑自動選中對應菜單項
   - 在特定頁面自動隱藏側邊欄
   - 使用 React Router 進行頁面導航

這種代碼組織和註釋風格提高了代碼的可讀性和可維護性，為團隊協作提供了清晰的文檔。

### WiseScheduling 服務層實現 (2025-02-27)

完成了 WiseScheduling 模組的服務層 (services) 實現，基於 RTK Query 開發了機台狀態相關 API：

1. **API 結構設計**：

   - 創建核心 `apiSlice.js` 文件，設置 API 基礎配置，包括正確的 API 端口 (5000)
   - 建立 `endpoints` 目錄，包含特定功能的 API 實現
   - 實現 `machineStatusApi.js` 和 `optionApi.js` 兩個主要 API 端點

2. **主要功能實現**：

   - **機台狀態 API**：

     ```js
     // 獲取某一區全部機台，以及機台狀態
     getMachineStatus: builder.query({
       query: (productionArea) => `machineStatus/?productionArea=${productionArea}`,
       providesTags: ["MachineStatus"],
     }),

     // 新增單一機台的狀態
     createMachineStatus: builder.mutation({
       query: (statusData) => ({
         url: "machineStatus/",
         method: "POST",
         body: statusData,
       }),
       invalidatesTags: ["MachineStatus"],
     }),

     // 修改單一機台的狀態
     updateMachineStatus: builder.mutation({
       query: (statusData) => ({
         url: "machineStatus/",
         method: "PUT",
         body: statusData,
       }),
       invalidatesTags: ["MachineStatus"],
     }),

     // 刪除單一機台的狀態
     deleteMachineStatus: builder.mutation({
       query: (id) => ({
         url: `machineStatus/${id}`,
         method: "DELETE",
       }),
       invalidatesTags: ["MachineStatus"],
     }),
     ```

   - **選項 API**：
     ```js
     // 獲取機台狀態選項
     getMachineStatusOptions: builder.query({
       query: () => "option/machineStatus",
       providesTags: ["Option"],
     }),
     ```

3. **統一導出**：

   - 創建 `index.js` 統一導出所有 API hooks，方便在組件中使用：
     ```js
     export {
       // 機台狀態 API hooks
       useGetMachineStatusQuery,
       useCreateMachineStatusMutation,
       useUpdateMachineStatusMutation,
       useDeleteMachineStatusMutation,

       // 選項 API hooks
       useGetMachineStatusOptionsQuery,
     };
     ```

4. **數據模型**：
   - 機台狀態包含 ID、機台 ID、生產區域、機台 SN、計劃時間、實際時間、狀態、原因和產品等屬性
   - 機台狀態選項包含 ID、名稱和架構標識符
   - 狀態分類包括生產中(RUN)、待機中(IDLE)、上模與調機(TUNING)、產品試模(TESTING)和機台停機(OFFLINE)

這套 API 設計遵循了專案的 RTK Query 實現模式，確保了與其他模組的一致性，並提供了完整的 CRUD 操作支持。

# 專案記憶庫 - FlaskPlastic Frontend

## 目錄與檔案結構

### 根目錄結構

```
frontend/
├── docs/                    # 專案文檔
├── public/                  # 靜態資源
├── src/                     # 核心源代碼
│   ├── assets/              # 資源文件 (圖片、圖標等)
│   ├── components/          # 可重用組件
│   │   ├── WiseScheduling/  # 智能排程系統
│   │   ├── Global/          # 全局共用組件
│   │   ├── Login/           # 登錄相關組件
│   │   ├── MachineSelect/   # 機台選擇組件
│   │   ├── ProductionSchedule/ # 生產排程組件
│   │   ├── ProductionRecord/   # 生產記錄組件
│   │   ├── QualityManagementSystem/ # 品質管理系統
│   │   ├── QuotationManagementSystem/ # 報價管理系統
│   │   └── ...              # 其他功能模塊
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

### 智能排程系統 (WiseScheduling) 組件結構

```
components/WiseScheduling/
├── components/              # 子組件
│   ├── machine/             # 機台狀態相關組件
│   │   ├── MachineStatus.jsx       # 機台狀態組件
│   │   ├── MachineStatusBoard.jsx  # 機台狀態看板
│   │   ├── ReasonSelector.jsx      # 原因選擇器
│   │   └── StatusSlider.jsx        # 狀態滑塊
│   ├── schedule/            # 排程相關組件
│   │   ├── index.jsx               # 時間軸甘特圖主組件
│   │   ├── ItemDialog.jsx          # 項目詳細信息對話框
│   │   ├── ItemDialog/             # 項目對話框子組件
│   │   │   ├── StatusChangeDialog.jsx  # 狀態變更對話框
│   │   │   └── index.jsx           # 項目對話框主組件
│   │   ├── OperationDialog.jsx     # 操作確認對話框
│   │   ├── StatusForms/            # 狀態表單組件
│   │   ├── TimelineContent.jsx     # 時間軸內容模板
│   │   └── TimelineControls.jsx    # 時間軸控制器
│   └── common/              # 通用組件
├── assets/                  # 資源文件
│   └── schedule/            # 排程相關樣式
│       ├── index.js               # 樣式導出
│       ├── TimelineContainer.js   # 整合後的容器樣式
│       ├── TimelineAxis.styles.js # 時間軸樣式
│       ├── TimelineBase.styles.js # 基礎容器樣式
│       ├── TimelineItem.styles.js # 項目樣式
│       └── TimelineStatus.styles.js # 狀態樣式
├── configs/                 # 配置文件
│   ├── schedule/            # 排程相關配置
│   │   ├── constants.js           # 常量定義
│   │   ├── formConfig.js          # 表單配置
│   │   ├── machineGroups.js       # 機台分組配置
│   │   ├── orderItems.js          # 訂單項配置
│   │   ├── validationSchema.js    # 驗證模式
│   │   └── timeline/              # 時間軸特定配置
│   │       ├── timelineConfigs.js     # 時間軸樣式配置
│   │       ├── timelineLocale.js      # 本地化配置
│   │       └── timelineOptions.js     # 時間軸選項
│   └── status.schema.js     # 狀態模式定義
├── hooks/                   # 自定義 Hooks
│   ├── schedule/            # 排程相關 Hooks
│   │   ├── useStatusForm.js       # 狀態表單 Hook
│   │   ├── useTimelineData.js     # 時間軸數據 Hook
│   │   └── useTimelineOperations.js # 時間軸操作 Hook
│   └── machine/             # 機台相關 Hooks
├── utils/                   # 工具函數
│   ├── schedule/            # 排程相關工具
│   │   ├── dateUtils.js           # 日期工具
│   │   ├── errorHandler.js        # 錯誤處理
│   │   └── formUtils.js           # 表單工具
│   └── statusConverter.js   # 狀態轉換工具
├── api/                     # API 相關
├── lib/                     # 自定義庫
├── mock/                    # 模擬數據
├── services/                # 服務
│   ├── apiSlice.js          # API 基礎配置
│   ├── endpoints/           # API 端點定義
│   │   ├── machineStatusApi.js   # 機台狀態 API
│   │   └── optionApi.js          # 選項 API
│   └── index.js             # API 導出
├── states/                  # 狀態管理
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

### 數據可視化

| 套件名稱        | 版本   | 主要用途            |
| --------------- | ------ | ------------------- |
| chart.js        | ^4.4.0 | 圖表繪製            |
| react-chartjs-2 | ^5.2.0 | React Chart.js 集成 |
| echarts         | ^5.4.3 | 大型數據可視化庫    |
| react-echarts   | ^0.1.1 | React ECharts 集成  |
| vis-timeline    | ^7.7.3 | 時間軸可視化        |
| vis-data        | ^7.1.9 | 可視化數據處理      |

## 核心功能模組詳解

### 時間軸甘特圖組件 (TimelineGantt)

智能排程系統的核心組件，基於 vis-timeline 實現，用於顯示和管理生產排程。

#### 主要功能

- 時間軸可視化生產訂單
- 支持拖拽調整訂單時間和位置
- 多種時間範圍視圖 (小時、天、週、月)
- 訂單詳情查看與編輯
- 狀態顏色差異化顯示

#### 核心文件

- `schedule/index.jsx`: 主組件
- `hooks/schedule/useTimelineData.js`: 數據處理 Hook
- `hooks/schedule/useTimelineOperations.js`: 操作處理 Hook
- `configs/schedule/constants.js`: 常量定義

#### 數據流程

1. 通過 `useTimelineData` Hook 獲取機台和訂單數據
2. 使用 `useTimelineOperations` Hook 處理用戶操作
3. 渲染 Timeline 組件並綁定事件處理
4. 通過對話框管理訂單編輯

#### 最新優化

1. **DOM 結構平面化**:

   - 將原本多層嵌套的樣式組件系統簡化為單一層級
   - 創建了 `TimelineContainer.js` 整合所有樣式規則
   - 保留原有組件以保持向後兼容性

2. **日期拖移功能優化**:

   - 移除了日期範圍限制，允許自由拖動到任何日期
   - 修改了 `getTimeWindow` 函數，擴大視圖範圍
   - 設置 `snap: null` 確保拖動時不會強制對齊

3. **性能優化**:
   - 減少 DOM 渲染層級，提高渲染效率
   - 使用 `useCallback` 和 `useMemo` 減少不必要的重渲染
   - 優化事件處理邏輯，減少不必要的狀態更新

### 機台狀態看板 (MachineStatusBoard)

顯示所有機台的當前狀態和生產情況。

#### 主要功能

- 機台狀態實時顯示
- 狀態分類和過濾
- 快速狀態切換

#### 核心文件

- `machine/MachineStatusBoard.jsx`: 主組件
- `machine/MachineStatus.jsx`: 單個機台狀態組件
- `machine/StatusSlider.jsx`: 狀態切換滑塊

#### 狀態管理

使用機台狀態常量定義：

```js
export const MACHINE_STATUS = {
  ORDER_CREATED: "製立單",
  IDLE: "待機中",
  SETUP: "上模與調機",
  TESTING: "產品試模",
  STOPPED: "機台停機",
};
```

每個狀態都有對應的配置，包括顏色、可切換性和允許的轉換狀態：

```js
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
  [MACHINE_STATUS.IDLE]: {
    name: MACHINE_STATUS.IDLE,
    description: "機台空閒狀態",
    color: "#9e9e9e",
    className: "status-idle",
    canSwitch: true,
    canDelete: true,
    allowedTransitions: [
      MACHINE_STATUS.SETUP,
      MACHINE_STATUS.TESTING,
      MACHINE_STATUS.STOPPED,
    ],
  },
  // ... 其他狀態配置
};
```

狀態操作輔助函數：

```js
// 檢查狀態是否可以切換
export const canTransitTo = (currentStatus) => {
  const config = STATUS_CONFIG[currentStatus];
  if (!config || !config.canSwitch) {
    return false;
  }
  return true;
};

// 獲取狀態顏色
export const getStatusColor = (status) => {
  return STATUS_CONFIG[status]?.color ?? "#000000";
};

// 獲取狀態CSS類名
export const getStatusClass = (status) => {
  return STATUS_CONFIG[status]?.className ?? "";
};
```

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

## 最近更新與優化

### 機台狀態 API 服務實現 (2025-02-27)

1. **API 結構創建**:

   - 創建了機台狀態相關 API，包括獲取、新增、修改和刪除功能
   - 實現了機台狀態選項 API，用於獲取狀態選項列表
   - 使用 RTK Query 進行數據獲取和緩存管理

2. **服務層組織**:

   - 按照專案標準設計了 services 目錄結構
   - 創建了正確的 API 端點連接到後端服務（端口 5000）
   - 使用標籤系統確保數據更新時正確刷新

3. **狀態映射**:
   - 建立了中英文狀態對應關係
   - 完整支持所有機台狀態類型：生產中、待機中、上模與調機、產品試模和機台停機

### TimelineGantt 組件優化 (2024-02-26)

1. **DOM 結構平面化**:

   - 創建了 `TimelineContainer.js` 整合所有樣式
   - 將原本 7 層嵌套的 DOM 結構簡化為 1 層
   - 保留原有組件以保持向後兼容性

2. **日期處理優化**:

   - 更新了 `dateUtils.js` 中的時間視窗計算
   - 擴大了各時間範圍的視圖範圍
   - 優化了日期格式化和解析函數

3. **操作邏輯優化**:
   - 重構了 `useTimelineOperations.js` 中的事件處理邏輯
   - 優化了項目保存和刪除的錯誤處理
   - 添加了更詳細的日誌記錄

### 機台狀態看板優化 (2024-02-25)

1. **UI 改進**:

   - 更新了 `MachineStatus.jsx` 的視覺設計
   - 優化了 `MachineStatusBoard.jsx` 的佈局
   - 改進了狀態顯示的顏色和圖標

2. **功能增強**:
   - 添加了更多狀態過濾選項
   - 優化了狀態切換的用戶體驗
   - 增加了更詳細的機台信息顯示

## 待辦事項與未來計劃

1. **後端集成**:

   - 實現與後端 API 的完整集成
   - 添加實時數據更新功能
   - 實現數據持久化

2. **性能優化**:

   - 進一步優化大量數據的渲染性能
   - 實現虛擬滾動以處理大量機台和訂單
   - 減少不必要的重渲染

3. **功能擴展**:

   - 添加更多甘特圖交互功能
   - 實現更豐富的報表和統計功能
   - 添加更多自定義視圖選項

4. **代碼質量提升**:
   - 添加單元測試和集成測試
   - 統一狀態管理方案
   - 完善錯誤處理和日誌記錄
