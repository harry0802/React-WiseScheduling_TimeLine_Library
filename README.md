# 🏭 React WiseScheduling Timeline Library

> 工業級智慧製造管理系統 - 整合生產排程、即時監控與資料視覺化的前端解決方案

🔗 **線上展示**: [Cloudflare Pages](https://react-wisescheduling-timeline-library.pages.dev) | [GitHub Pages](https://harry0802.github.io/React-WiseScheduling_TimeLine_Library/)

> ⚠️ **關於依賴套件**: 此專案為作品集展示用途，整合了多個獨立開發專案（智慧排程、即時監控、專案展示等），因此可能存在重複類型的套件依賴。實際生產專案會針對單一功能模組進行依賴優化。

---

## 🎯 專案特色

### 核心功能

#### 智慧排程系統 (WiseScheduling)

- 跨區域（A/B/C）生產排程管理
- 互動式甘特圖拖拽操作
- 機台狀態即時監控（Setup/Running/Paused/Completed）
- 時間範圍切換（小時/天/週/月視圖）

#### 製造現場監控 (ManufacturingLiveMonitor)

- OEE（設備綜合效率）即時儀表板
- 多區域生產數據視覺化
- Recharts 圖表整合

#### 專案展示系統 (ProjectShowcase)

- 垂直輪播（Embla Carousel）
- 六角網格響應式佈局
- Markdown 專案詳情渲染

### 💡 技術亮點

#### 🚀 雙平台 CI/CD 部署

- 從 GitHub Pages 遷移至 Cloudflare Pages，實現全球 CDN 加速
- 保留雙平台兼容性（透過 `build` / `build:gh-pages` 模式切換）
- BrowserRouter 搭配 Cloudflare Pages 原生支援，移除 hash routing

#### 🏭 工業級甘特圖效能

- vis-timeline 7.7.4 處理 1000+ 排程項目
- `useRef` + DataSet API 避免昂貴重渲染
- 流暢拖拽與縮放體驗

#### 🔥 複雜狀態管理架構

- **Redux Toolkit + RTK Query**: 複雜快取、失效策略、樂觀更新
- **TanStack Query (React Query)**: 簡化查詢場景，更好的 DevTools
- 混合策略展現大型應用狀態管理實戰

#### 🧩 分層 Custom Hooks

```text
資料層 (useAreaScheduleData, useAreaMachines)
  ↓
業務邏輯層 (useTimelineData, useTimelineConfig)
  ↓
UI 交互層 (useMoveToNowHandler, useTimelineDialogs)
```

#### 🎨 完整 Design System

- Design Tokens 系統（colors、spacing、typography、effects）
- 8px 基線網格
- Styled-Components + MUI 雙樣式系統

---

## 🚀 核心技術棧

| 類別 | 技術 | 用途 |
|------|------|------|
| **框架** | React 18.3.1 + Vite | Concurrent Features、快速建置 |
| **路由** | React Router v6 | BrowserRouter（乾淨 URL） |
| **狀態管理** | Redux Toolkit + RTK Query | 複雜快取與 API 管理 |
| | TanStack Query (React Query) | 簡化資料獲取場景 |
| **UI 框架** | Material-UI (MUI) | Dialog、Table、DatePicker |
| | Styled Components | CSS-in-JS 主題系統 |
| | Design Tokens | 統一設計語言 |
| **視覺化** | vis-timeline 7.7.4 | 工業級甘特圖／時間軸 |
| | Recharts | 圖表與數據視覺化 |
| **表單** | React Hook Form + Zod | 高效能表單與驗證 |
| **工具庫** | Day.js、Embla Carousel、Iconify | 日期、輪播、圖標 |

---

## 📦 核心模組

### WiseScheduling - 智慧排程系統

**關鍵實作**:

- `useRef` + DataSet API 避免 vis-timeline 重新初始化
- 分層 Hook 架構（資料 → 業務邏輯 → UI 交互）
- 資料轉換管線：`Raw API → transformScheduleData() → DataSet.add() → Display`

**效能優化**:

- 處理 1000+ 排程項目不卡頓
- 避免昂貴重渲染，直接操作 DataSet
- 時間視窗動態計算（`getTimeWindow(range, centerTime)`）

### ManufacturingLiveMonitor - 即時監控

- OEE 儀表板視覺化
- Recharts 整合多區域數據
- 即時生產良率分析

### ProjectShowcase - 作品展示

- Embla Carousel 垂直輪播
- 六角網格響應式佈局
- Markdown 渲染專案詳情

---

## 🏗️ 架構設計

### 分層架構

```text
Entry Layer (main.jsx)
  ↓
Application Layer (BrowserRouter + Redux Store)
  ↓
Layout Layer (AppLayout + ErrorBoundary + Navbar)
  ↓
Page Layer (Home, WiseScheduling, ManufacturingMonitor, ProjectShowcase)
  ↓
Component Layer (Timeline, OEE Dashboard, Carousel)
  ↓
Business Logic Layer (Custom Hooks, RTK Query, Transformers)
  ↓
Foundation Layer (Design Tokens, Styled Components, Utils)
```

### 目錄結構

```text
src/
├── components/
│   ├── WiseScheduling/          # 智慧排程（最複雜模組）
│   │   ├── components/          # Schedule, MachineStatus, Dialogs
│   │   ├── hooks/               # useTimelineData, useMachineStatus
│   │   ├── utils/               # transformers, validators, dateUtils
│   │   ├── services/            # RTK Query API slices
│   │   └── configs/             # constants, validations
│   ├── ManufacturingLiveMonitor/
│   ├── ProjectCarousel/
│   └── ShowcaseGallery/
├── page/                        # 路由頁面
├── hooks/                       # 全局 Hooks
├── store/                       # Redux 配置
├── services/                    # API 基礎配置
├── designTokens/                # Design System
├── layouts/                     # AppLayout + ErrorBoundary
└── styles/                      # 全局樣式
```

### 關鍵設計模式

#### Custom Hooks 分層

```javascript
useAreaScheduleData()      // 資料層
  ↓
useTimelineData()          // 業務邏輯層
  ↓
useMoveToNowHandler()      // UI 交互層
```

#### State Colocation

狀態盡可能靠近使用處，最小化全局狀態

#### Error Boundary

AppLayout 包裝所有路由，路由變更時重置錯誤

---

## 🛠️ 開發指令

```bash
npm run dev              # 開發伺服器 (http://localhost:5173)
npm run build            # 生產建置 (Cloudflare Pages)
npm run build:gh-pages   # GitHub Pages 建置
npm run preview          # 預覽建置結果
npm run lint             # ESLint 檢查
npx cz                   # Commitizen 語義化提交
```

**環境變數**:

- `VITE_API_BASE_URL`: API 基礎 URL（預設 `/api`）

---

## 📝 程式碼品質

- **結構化註解**: `//!` 區分四層結構（Setup → Types → Core → Utilities）
- **JSDoc 文檔**: 函數與組件註解
- **ESLint**: 代碼規範檢查
- **Conventional Commits**: 語義化提交訊息（npx cz）

---

## 🌐 部署策略

### 從 GitHub Pages 遷移至 Cloudflare Pages

**遷移原因**:

- 全球 CDN 加速（降低 TTFB）
- 邊緣運算優化
- Vite + React 自動優化

### 解決的技術挑戰

#### 1. 路徑配置兼容（404 問題）

```javascript
// vite.config.js - 雙平台兼容
export default defineConfig(({ mode }) => {
  const base = mode === 'github-pages'
    ? '/React-WiseScheduling_TimeLine_Library/'  // GitHub Pages 子路徑
    : '/'                                         // Cloudflare Pages 根路徑
  return { base }
})
```

#### 2. 路由策略升級

- **問題**: Hash 路由（`#/path`）不適用於 Cloudflare Pages
- **解決**: 改用 BrowserRouter（`/path`）
- **移除**: GitHub Pages 專用的 SPA 重定向腳本

#### 3. CI/CD 統一

```bash
npm run build           # Cloudflare Pages (預設)
npm run build:gh-pages  # GitHub Pages (保留兼容)
```

### 當前部署配置

- **主要平台**: Cloudflare Pages
- **線上網址**: <https://react-wisescheduling-timeline-library.pages.dev>
- **CI/CD**: GitHub 整合（push 到 `dev`/`main` 自動部署）
- **備援平台**: GitHub Pages

---

## 👨‍💻 作者

Harry Lin

- GitHub: [@harry0802](https://github.com/harry0802)
- Portfolio: <https://react-wisescheduling-timeline-library.pages.dev>

---

## 📄 授權

MIT License

