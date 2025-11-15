import ShowcaseGallery from '../components/ShowcaseGallery'
import { TECH_DEFINITIONS } from '../constants/techStackDefinitions'

//! =============== 1. Setup & Constants ===============

/**
 * @typedef {Object} ProjectItem
 * @property {number} id - 專案唯一識別碼
 * @property {string} title - 專案標題
 * @property {string} dec - 專案詳細描述 (支援 Markdown)
 * @property {string[]} techStack - 技術棧列表
 * @property {ProjectSystem[]} systems - 子系統列表
 */

/**
 * @typedef {Object} ProjectSystem
 * @property {string} name - 子系統名稱
 * @property {string[]} images - 子系統圖片路徑列表
 */

/**
 * @typedef {Object} ShowcaseConfiguration
 * @property {string} pageTitle - 頁面主標題
 * @property {string} pageSubtitle - 頁面副標題
 * @property {string} aboutTitle - 關於區塊標題
 * @property {string[]} aboutContent - 關於區塊內容段落
 */

//! =============== 2. Types & Interfaces ===============

/**
 * TIIP 專案展示資料配置
 * 🎯 設計原則：
 * - 強調具體貢獻與技術挑戰
 * - 提供可量化成果數據
 * - 適用於技術面試展示
 *
 * @type {ProjectItem[]}
 */
const TIIP_PROJECT_DATA = [
  {
    id: 1,
    title: '生管部門 - 生產管理系統',
    dec:
      '我擔任此專案的前端工程師，負責將複雜的生產管理流程視覺化，管理全廠 **39 台射出成型機** 的生產排程與成本分析。\n\n' +
      '**我的核心貢獻**：\n' +
      '1. **[智慧排程系統](#system-智慧排程)**：客製化開源 `vis-timeline` 甘特圖，實作 **840+ 行工業級程式碼**，支援 4 個生產區域的即時排程管理。使用 `useRef` 避免重複渲染、`useMemo` 優化數據處理，並實現視圖中心保持機制。\n' +
      '2. **[廠內報價系統](#system-廠內報價系統)**：主導複雜表單開發，使用 **React Hook Form + Zod** 處理多工序成本計算（成型/後製程/檢驗）。將計算邏輯模組化到獨立 Hook，用 Zustand 管理表單狀態，確保即時公式運算的準確性。\n' +
      '3. **UI/UX 設計與實作**：因設計資源有限，我主動承接「[智慧成本分析表](#system-智慧成本分析表)」與「[智慧排程](#system-智慧排程)」的介面設計，全程參與客戶需求訪談，確保功能符合實際操作需求。\n' +
      '4. **ERP 資料整合**：與後端協作串接凌越 ERP 的訂單、模具與料號資料，使用 RTK Query 管理 API 狀態與自動緩存。\n\n' +
      '🔗 **[看作品 - 智慧排程系統](http://localhost:5173/React-WiseScheduling_TimeLine_Library/#/wise-scheduling)**',
    techStack: [
      TECH_DEFINITIONS.REACT_18,
      TECH_DEFINITIONS.RTK_QUERY,
      TECH_DEFINITIONS.VIS_TIMELINE,
      TECH_DEFINITIONS.MATERIAL_UI,
      TECH_DEFINITIONS.REACT_HOOK_FORM,
      TECH_DEFINITIONS.ZOD,
      TECH_DEFINITIONS.ZUSTAND,
      TECH_DEFINITIONS.DOCKER,
      TECH_DEFINITIONS.NGINX
    ],
    systems: [
      {
        name: '計畫排程表',
        images: ['images/tiip/tiip-010-production-schedule.png']
      },
      {
        name: '廠內報價系統',
        images: [
          'images/tiip/tiip-011-internal-quote-0.png',
          'images/tiip/tiip-012-internal-quote-1.png',
          'images/tiip/tiip-014-internal-quote-2.png'
        ]
      },
      {
        name: '產品履歷BOM表',
        images: [
          'images/tiip/tiip-016-product-bom-1.png',
          'images/tiip/tiip-017-product-bom-2.png',
          'images/tiip/tiip-021-product-bom-3.png'
        ]
      },
      {
        name: '智慧成本分析表',
        images: ['images/tiip/tiip-022-cost-analysis.png']
      },
      {
        name: '智慧排程',
        images: [
          'images/tiip/tiip-023-smart-schedule-1.png',
          'images/tiip/tiip-024-smart-schedule-2.png',
          'images/tiip/tiip-026-smart-schedule-3.png',
          'images/tiip/tiip-027-smart-schedule-4.png',
          'images/tiip/tiip-028-smart-schedule-5.png',
          'images/tiip/tiip-029-smart-schedule-6.png',
          'images/tiip/tiip-030-smart-schedule-7.png',
          'images/tiip/tiip-032-smart-schedule-8.png',
          'images/tiip/tiip-033-smart-schedule-9.png'
        ]
      }
    ]
  },
  {
    id: 2,
    title: '品管部門 - 品質檢驗系統',
    dec:
      '開發品管部門的**無紙化檢驗系統**，確保檢驗數據的完整性與可追溯性。\n\n' +
      '**技術實作重點**：\n' +
      '1. **雙重身份驗證架構**：實作品管人員與產線班長的分權驗證流程，使用 React Router 的巢狀路由設計 (`/:machineSN/:userType/dashboard`)，確保所有檢驗紀錄可精確追溯到操作者。\n' +
      '2. **動態表單系統**：使用 **React Hook Form + Zod** 開發支援「首件」、「末件」、「IPQC 巡檢」的動態表單，即時回傳檢驗數據，建立完整的數位品質履歷。\n' +
      '3. **分層架構設計**：將業務邏輯 (domain)、UI (components)、狀態管理 (hooks) 分層，提高程式碼可維護性。',
    techStack: [
      TECH_DEFINITIONS.REACT_HOOK_FORM,
      TECH_DEFINITIONS.ZOD,
      TECH_DEFINITIONS.MATERIAL_UI,
      TECH_DEFINITIONS.RTK_QUERY,
      TECH_DEFINITIONS.DAYJS,
      TECH_DEFINITIONS.REACT_ROUTER,
      TECH_DEFINITIONS.DOCKER
    ],
    systems: [
      {
        name: '即時品檢系統',
        images: [
          'images/tiip/tiip-034-qc-inspection-1.png',
          'images/tiip/tiip-035-qc-inspection-2.png',
          'images/tiip/tiip-036-qc-inspection-3.png',
          'images/tiip/tiip-037-qc-inspection-4.png'
        ]
      }
    ]
  },
  {
    id: 3,
    title: '業務部門 - 業務報價系統',
    dec:
      '開發面向客戶的專業報價系統，整合客戶管理、訂單追蹤、報價歷史查詢等功能。\n\n' +
      '**技術特點**：\n' +
      '1. **與廠內報價系統共享架構**：複用相同的組件庫（ProcessCostAnalysis、ProcessForms、ProfitDashboard），但透過獨立的服務層 (salesServices vs factoryServices) 區分業務邏輯。業務系統重視利潤展示，廠內系統重視製程細節。\n' +
      '2. **統一計算邏輯**：使用 `ComputationUtilsV1.js` 確保前後端計算一致性，搭配 **Zod** 驗證資料正確性。\n' +
      '3. **直覺操作介面**：使用 Material-UI + styled-components 建立一致的設計系統，協助業務團隊快速生成報價單，縮短客戶回應時間。',
    techStack: [
      TECH_DEFINITIONS.REACT_18,
      TECH_DEFINITIONS.MATERIAL_UI,
      TECH_DEFINITIONS.STYLED_COMPONENTS,
      TECH_DEFINITIONS.ZOD,
      TECH_DEFINITIONS.RTK_QUERY,
      TECH_DEFINITIONS.DAYJS,
      TECH_DEFINITIONS.DOCKER,
      TECH_DEFINITIONS.NGINX
    ],
    systems: [
      {
        name: '業務報價系統',
        images: [
          'images/tiip/tiip-038-sales-quote-1.png',
          'images/tiip/tiip-039-sales-quote-2.png',
          'images/tiip/tiip-040-sales-quote-3.png',
          'images/tiip/tiip-041-sales-quote-4.png',
          'images/tiip/tiip-042-sales-quote-5.png',
          'images/tiip/tiip-043-sales-quote-6.png',
          'images/tiip/tiip-044-sales-quote-7.png'
        ]
      }
    ]
  },
  {
    id: 4,
    title: '成型部門 - 生產執行系統',
    dec:
      '開發現場人員的完整生產執行工具，涵蓋設備保養、機台狀態監控、績效儀表板、即時生產追蹤與全廠稼動率分析。\n\n' +
      '**核心技術實作**：\n' +
      '1. **機台狀態管理（三層驗證架構）**：\n' +
      '   - UI 層：StatusSlider 提供前端即時驗證\n' +
      '   - Business 層：useStatusManager Hook 處理業務邏輯\n' +
      '   - Validator 層：statusValidator 確保狀態轉換規則（RUN/IDLE/TUNING/TESTING/OFFLINE）\n' +
      '   使用 `forwardRef` 和 `useImperativeHandle` 讓父組件控制表單提交時機。\n' +
      '2. **[全廠績效儀表板](#system-廠區績效儀表板)**：**完全自主設計與開發**，在公司無任何設計資源的情況下，我獨立完成 UI/UX 設計、技術選型與實作。自行研究並選用開源套件 `@iimm/data-view-react` + **ECharts**，整合 **5 大子系統**（[廠區績效儀表板](#system-廠區績效儀表板)、即時 OEE、[即時生產進度追蹤](#system-即時生產進度追蹤)、交貨趨勢、OEE 洞察）建立全屏數據視覺化。DEMO 後獲得老闆與客戶高度肯定。實作臨時樣式機制，組件卸載時自動清理，避免影響其他頁面。\n' +
      '3. **[保養系統](#system-機台保養表)**：使用 Zustand 管理頭部參數狀態，RTK Query 處理 API，實作統一抽屜狀態管理與三級審核流程（檢查員/復檢員/核准者）。另有[模具保養表](#system-模具保養表)與[施工養護綜合保養](#system-施工養護綜合保養)系統。\n' +
      '4. **生產追蹤**：包含[派工系統](#system-派工系統)與[機台狀態操作與保養紀錄](#system-機台狀態操作與保養紀錄)，使用多層 Context Provider 架構管理複雜狀態（ProductionRecordProvider、ProcMaterialsProvider 等），搭配 Redux Slice 細分功能狀態。\n\n' +
      '🔗 **[看作品 - 全廠績效儀表板](http://localhost:5173/React-WiseScheduling_TimeLine_Library/#/ManufacturingLiveMonitor)**',
    techStack: [
      TECH_DEFINITIONS.REACT_18,
      TECH_DEFINITIONS.RTK_QUERY,
      TECH_DEFINITIONS.ECHARTS,
      TECH_DEFINITIONS.DATA_VIEW_REACT,
      TECH_DEFINITIONS.MATERIAL_UI,
      TECH_DEFINITIONS.ZOD,
      TECH_DEFINITIONS.ZUSTAND,
      TECH_DEFINITIONS.DAYJS,
      TECH_DEFINITIONS.NGINX
    ],
    systems: [
      {
        name: '機台保養表',
        images: ['images/tiip/tiip-045-machine-maintenance.png']
      },
      {
        name: '模具保養表',
        images: ['images/tiip/tiip-047-mold-maintenance.png']
      },
      {
        name: '派工系統',
        images: [
          'images/tiip/tiip-048-dispatch-1.png',
          'images/tiip/tiip-049-dispatch-2.png',
          'images/tiip/tiip-050-dispatch-3.png'
        ]
      },
      {
        name: '機台狀態操作與保養紀錄',
        images: [
          'images/tiip/tiip-053-machine-status-1.png',
          'images/tiip/tiip-054-machine-status-2.png',
          'images/tiip/tiip-055-machine-status-3.png',
          'images/tiip/tiip-056-machine-status-4.png'
        ]
      },
      {
        name: '施工養護綜合保養',
        images: ['images/tiip/tiip-058-comprehensive-maintenance.png']
      },
      {
        name: '廠區績效儀表板',
        images: [
          'images/tiip/tiip-059-performance-dashboard.png',
          'images/tiip/tiip-060-performance-dashboard-2.png'
        ]
      },
      {
        name: '即時生產進度追蹤',
        images: ['images/tiip/tiip-061-production-tracking.png']
      },
      {
        name: '全廠設備稼動率',
        images: ['images/tiip/tiip-062-equipment-utilization.png']
      }
    ]
  }
]
/**
 * 展示櫃配置
 * @type {ShowcaseConfiguration}
 */
const SHOWCASE_CONFIG = {
  pageTitle: '專案展示',
  pageSubtitle: '科專_TIIP模具產業高階製造',
  aboutTitle: '關於此專案展示',
  aboutContent: [] // 當前版本禁用 About Note
}

//! =============== 3. Core Functionality ===============

/**
 * TIIP 專案展示頁面組件
 *
 * @description
 * 展示 TIIP 科專計畫中的核心技術成果，包括：
 * - 生產管理系統 (智慧排程 + 即時監控)
 * - 品質檢驗系統 (無紙化檢驗 + 雙重驗證)
 * - 業務報價系統 (客戶管理 + 訂單追蹤)
 * - 生產執行系統 (機台狀態 + 績效儀表板)
 *
 * @component
 * @returns {React.ReactElement} 專案展示頁面
 *
 * @example
 * // 在路由中使用
 * <Route path="/project-showcase" element={<ProjectShowcase />} />
 */
const ProjectShowcase = () => {
  return (
    <ShowcaseGallery
      items={TIIP_PROJECT_DATA}
      config={SHOWCASE_CONFIG}
      showProgress={true}
      showAboutNote={false}
    />
  )
}

//! =============== 4. Utility Functions ===============
// (當前版本無需額外工具函數)

export default ProjectShowcase

