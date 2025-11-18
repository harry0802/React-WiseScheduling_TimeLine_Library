# Harry's Frontend Engineering Portfolio - 前端工程師作品集

> 整合智慧製造排程、即時監控與資料視覺化的工業級前端解決方案

🔗 **線上展示**: <https://react-wisescheduling-timeline-library.pages.dev>

---

## 💡 核心亮點

🔥 **4 種狀態管理方案並存整合**
→ Redux Toolkit、RTK Query、React Query、Zustand 混合使用，展示複雜狀態管理架構能力

🏭 **工業級甘特圖實作**
→ vis-timeline 處理 1000+ 排程項目，使用 `useRef` + DataSet API 避免重渲染，實現流暢拖拽體驗

🎨 **完整 Design Tokens 系統**
→ 8px 基線網格 + 主題化 + 統一色彩系統，可維護性與一致性兼具

⚡ **多層次效能優化**
→ Code Splitting、Lazy Loading、useRef 避免昂貴重渲染、Memoization 策略

📊 **複雜資料視覺化**
→ OEE 監控儀表板、Recharts 圖表整合、即時資料更新、多區域生產監控

🧩 **分層 Custom Hooks 架構**
→ 資料層 → 業務邏輯層 → UI 交互層，清晰的關注點分離

---

## 🚀 核心技術棧

### 前端框架與工具

- **React 18.3.1** - Hooks、Concurrent Features
- **Vite** - 快速開發伺服器與構建工具
- **React Router v6** - Browser 路由（現代化 URL 結構）

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

### 系統架構圖

```mermaid
graph TB
    subgraph "Entry Layer"
        A[main.jsx]
    end

    subgraph "Application Layer"
        B[App Router<br/>HashRouter]
        C[Redux Store<br/>RTK + React Query]
    end

    subgraph "Layout Layer"
        D[AppLayout + ErrorBoundary]
        E[Navbar + Drawer]
    end

    subgraph "Page Layer"
        F1[Home]
        F2[WiseScheduling<br/>智慧排程]
        F3[ManufacturingMonitor<br/>即時監控]
        F4[ProjectShowcase<br/>專案展示]
    end

    subgraph "Component Layer"
        G1[Timeline Component<br/>vis-timeline]
        G2[OEE Dashboard<br/>Recharts]
        G3[Carousel<br/>Embla]
    end

    subgraph "Business Logic Layer"
        H1[Custom Hooks<br/>useTimelineData]
        H2[RTK Query API<br/>scheduleApi]
        H3[Data Transformers<br/>apiTransformers]
    end

    subgraph "Foundation Layer"
        I1[Design Tokens<br/>colors, spacing]
        I2[Styled Components<br/>Theme Provider]
        I3[Utils & Validators]
    end

    A --> B
    A --> C
    B --> D
    D --> E
    D --> F1 & F2 & F3 & F4
    F2 --> G1
    F3 --> G2
    F4 --> G3
    G1 & G2 & G3 --> H1 & H2 & H3
    H1 & H2 & H3 --> I1 & I2 & I3

    style F2 fill:#1593EB,color:#fff
    style G1 fill:#1593EB,color:#fff
    style H1 fill:#1593EB,color:#fff
```

### 目錄結構

```text
src/
├── components/                    # 可複用組件
│   ├── WiseScheduling/           # 🏭 智慧排程系統（最複雜模組）
│   │   ├── components/           #   - Schedule, MachineStatus, Dialogs
│   │   ├── hooks/                #   - useTimelineData, useMachineStatus
│   │   ├── utils/                #   - transformers, validators, dateUtils
│   │   ├── services/             #   - RTK Query API slices
│   │   └── configs/              #   - constants, validations
│   ├── ManufacturingLiveMonitor/ # 📊 即時監控儀表板
│   ├── ProjectCarousel/          # 🎠 垂直輪播組件
│   ├── ShowcaseGallery/          # 🎨 專案展示畫廊
│   ├── Navbar/                   # 🧭 響應式導航列
│   └── HamburgerMenu/            # 🍔 動畫漢堡選單
├── page/                         # 路由頁面組件
│   ├── Home.jsx                  # 首頁
│   ├── Timeline.jsx              # 時間軸展示
│   ├── ProjectShowcase.jsx       # 專案集錦
│   └── About.jsx                 # 關於頁面
├── hooks/                        # 全局自訂 Hooks
│   ├── useNavbarSelector.js      # Navbar 選擇器動畫
│   └── usePageTitle.js           # 動態頁面標題
├── store/                        # Redux 配置
│   └── store.js                  # Redux Toolkit store
├── services/                     # API 服務基礎配置
│   └── apiSlice.js               # RTK Query base
├── designTokens/                 # 🎨 Design System Tokens
│   ├── colors.js                 # 色彩系統
│   ├── spacing.js                # 8px 基線網格
│   ├── typography.js             # 字體階層
│   └── effects.js                # 陰影、過渡效果
├── layouts/                      # 佈局組件
│   └── AppLayout.jsx             # Error Boundary + Navbar
├── styles/                       # 全局樣式
│   └── SharedStyles.js           # 響應式斷點、mixins
└── constants/                    # 常量配置
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

- **平台**: Cloudflare Pages
- **CI/CD**: GitHub 整合自動部署
- **Base Path**: `/` (根路徑)

---

## 👨‍💻 作者

(Harry Lin)

- GitHub: [@harry0802](https://github.com/harry0802)
- Portfolio: [線上作品集](https://react-wisescheduling-timeline-library.pages.dev)

---

