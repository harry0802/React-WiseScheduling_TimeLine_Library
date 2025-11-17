# Harry's Portfolio - 前端工程師作品集

> 一個展示智慧製造管理系統開發能力的作品集網站

🔗 **線上展示**: <https://harry0802.github.io/React-WiseScheduling_TimeLine_Library>

---

## 🚀 核心技術棧

### 前端框架與工具

- **React 18.3.1** - Hooks、Concurrent Features
- **Vite** - 快速開發伺服器與構建工具
- **React Router v6** - Hash 路由（適配 GitHub Pages）

### 狀態管理

- **Redux Toolkit** - 全局狀態管理
- **RTK Query** - API 資料獲取與快取
- **TanStack Query (React Query)** - 伺服器狀態管理
- **Zustand** - 輕量級狀態管理

### UI 框架與樣式

- **Material-UI (MUI)** - 複雜 UI 組件（Dialog、Table、DatePicker）
- **Ant Design** - 部分進階組件(專案合併兼容)
- **Styled Components** - CSS-in-JS 主題系統
- **Design Tokens** - 統一設計語言（顏色、間距、字體）

### 資料視覺化

- **vis-timeline** - 工業級甘特圖／時間軸
- **Recharts** - 圖表視覺化
- **vis-data DataSet** - 響應式資料結構

### 表單與驗證

- **React Hook Form** - 高效能表單管理
- **Zod** - TypeScript-first 結構驗證

### 其他核心庫

- **Day.js** - 日期時間處理
- **Embla Carousel** - 輪播組件
- **Iconify** - 圖標系統
- **React Markdown** - Markdown 渲染

---

## 📦 專案展示

### 1. 智慧排程系統（WiseScheduling）

**技術重點**: vis-timeline、RTK Query、Custom Hooks、複雜狀態管理

**功能**:

- 多區域生產排程管理
- 拖拽式甘特圖操作
- 機台狀態即時監控
- 工單調度與歷史記錄
- 時間範圍動態切換（小時/天/週/月）

**核心實作**:

- 使用 `useRef` 避免 vis-timeline 重新初始化
- 自訂 Hook 分層架構（資料層 → 業務邏輯層 → UI 交互層）
- DataSet API 直接更新避免 React 重渲染

### 2. 製造現場即時監控（ManufacturingLiveMonitor）

**技術重點**: Recharts、OEE 計算、即時資料更新

**功能**:

- OEE（設備綜合效率）儀表板
- 多區域生產監控
- 即時數據視覺化
- 生產良率分析

### 3. 專案展示系統（ProjectShowcase）

**技術重點**: Embla Carousel、六角網格佈局、動態路由

**功能**:

- 垂直輪播展示專案
- 響應式六角形卡片網格
- Markdown 專案詳情渲染
- 技術標籤分類

### 4. Design Token 系統

**技術重點**: Design System、主題化、可維護性

**實作**:

- 統一色彩系統（primary、accent、functional colors）
- 8px 基線網格間距系統
- 字體階層與排版規範
- 邊框、陰影、過渡效果標準化

---

## 🏗️ 架構設計

### 目錄結構

```text
src/
├── components/          # 可複用組件
│   ├── WiseScheduling/ # 智慧排程系統（最複雜模組）
│   ├── ManufacturingLiveMonitor/
│   └── ...
├── page/               # 路由頁面組件
├── hooks/              # 自訂 Hooks
├── store/              # Redux 配置
├── services/           # API 服務
├── designTokens/       # 設計系統 Tokens
├── layouts/            # 佈局組件
└── constants/          # 常量配置
```

### 關鍵設計模式

#### 1. Custom Hooks 分層

```javascript
// 資料層
useAreaScheduleData(area, startTime, endTime)

// 業務邏輯層
useTimelineData(machines, schedules)
useTimelineConfig(items, timeRange)

// UI 交互層
useMoveToNowHandler(timelineRef)
```

#### 2. Compound Components

複雜組件拆分為子組件，保持單一職責

#### 3. Render Props & HOC

- Error Boundary 包裝路由
- Layout 層級共享邏輯

#### 4. State Colocation

狀態盡可能靠近使用處，全局狀態最小化

#### 5. Data Transformation Pipeline

```text
Raw API Data
  → transformScheduleData()
  → vis-timeline Format
  → DataSet.add()
  → Display
```

---

## 🎨 UI/UX 特色

- **響應式設計**: 完整支援桌面、平板、手機
- **暗色主題**: 專業工業風格配色
- **動畫過渡**: Smooth CSS transitions
- **無障礙**: ARIA labels、鍵盤導航
- **效能優化**: Code splitting、Lazy loading

---

## 🛠️ 開發工具

```bash
# 開發
npm run dev

# 構建
npm run build

# 預覽構建結果
npm run preview

# Lint 檢查
npm run lint

# Conventional Commits
npx cz
```

---

## 📝 代碼品質

- **JSDoc 文檔**: 完整的函數與組件註解
- **四層結構註解**: Setup → Types → Core → Utilities
- **ESLint**: 代碼規範檢查
- **Conventional Commits**: 語義化提交訊息
- **Self-Documenting Code**: 清晰的命名與結構

---

## 🌐 部署

- **平台**: GitHub Pages
- **CI/CD**: 手動部署到 `gh-pages` 分支
- **Base Path**: `/React-WiseScheduling_TimeLine_Library/`

---

## 👨‍💻 作者

(Harry Lin)

- GitHub: [@harry0802](https://github.com/harry0802)
- Portfolio: [線上作品集](https://harry0802.github.io/React-WiseScheduling_TimeLine_Library)

---

