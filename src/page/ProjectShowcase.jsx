import ShowcaseGallery from '../components/ShowcaseGallery'

//! =============== 專案資料配置 ===============

/**
 * TIIP 專案展示資料
 * 🧠 **[效能優化]** 必須移出組件函數外，避免每次渲染都重新宣告此陣列。
 * 📊 **[資料結構]** 按照工廠部門分類，每個部門包含多張系統截圖
 */
const tiipProjectData = [
  {
    id: 1,
    images: [
      'images/tiip/tiip-010-production-schedule.png',
      'images/tiip/tiip-011-internal-quote-0.png',
      'images/tiip/tiip-012-internal-quote-1.png',
      'images/tiip/tiip-014-internal-quote-2.png',
      'images/tiip/tiip-016-product-bom-1.png',
      'images/tiip/tiip-017-product-bom-2.png',
      'images/tiip/tiip-021-product-bom-3.png',
      'images/tiip/tiip-022-cost-analysis.png',
      'images/tiip/tiip-023-smart-schedule-1.png',
      'images/tiip/tiip-024-smart-schedule-2.png',
      'images/tiip/tiip-026-smart-schedule-3.png',
      'images/tiip/tiip-027-smart-schedule-4.png',
      'images/tiip/tiip-028-smart-schedule-5.png',
      'images/tiip/tiip-029-smart-schedule-6.png',
      'images/tiip/tiip-030-smart-schedule-7.png',
      'images/tiip/tiip-032-smart-schedule-8.png',
      'images/tiip/tiip-033-smart-schedule-9.png'
    ],
    title: '生管部門 - 生產管理系統',
    dec: '整合計畫排程表、廠內報價系統、產品履歷BOM表、智慧成本分析與智慧排程等核心功能。\n\n提供完整的生產管理解決方案，從接單報價到排程執行，實現生產流程數位化與智慧化管理。',
    techStack: ['React 18', 'TypeScript', 'Redux Toolkit', 'Vis-timeline', 'Material-UI']
  },
  {
    id: 2,
    images: [
      'images/tiip/tiip-034-qc-inspection-1.png',
      'images/tiip/tiip-035-qc-inspection-2.png',
      'images/tiip/tiip-036-qc-inspection-3.png',
      'images/tiip/tiip-037-qc-inspection-4.png'
    ],
    title: '品管部門 - 品質檢驗系統',
    dec: '即時品檢系統，支援多點檢驗、數據記錄、品質追蹤等功能。\n\n確保產品品質符合標準，提供完整的品質履歷追溯機制，協助工廠建立嚴謹的品質管理流程。',
    techStack: ['React Hook Form', 'Zod Validation', 'Recharts', 'Day.js']
  },
  {
    id: 3,
    images: [
      'images/tiip/tiip-038-sales-quote-1.png',
      'images/tiip/tiip-039-sales-quote-2.png',
      'images/tiip/tiip-040-sales-quote-3.png',
      'images/tiip/tiip-041-sales-quote-4.png',
      'images/tiip/tiip-042-sales-quote-5.png',
      'images/tiip/tiip-043-sales-quote-6.png',
      'images/tiip/tiip-044-sales-quote-7.png'
    ],
    title: '業務部門 - 業務報價系統',
    dec: '快速生成專業報價單，整合客戶管理、訂單追蹤、報價歷史查詢等功能。\n\n提供直觀的操作介面，協助業務團隊提升報價效率，縮短客戶回應時間，增強市場競爭力。',
    techStack: ['React 18', 'Material-UI', 'Styled Components']
  },
  {
    id: 4,
    images: [
      'images/tiip/tiip-045-machine-maintenance.png',
      'images/tiip/tiip-047-mold-maintenance.png',
      'images/tiip/tiip-048-dispatch-1.png',
      'images/tiip/tiip-049-dispatch-2.png',
      'images/tiip/tiip-050-dispatch-3.png',
      'images/tiip/tiip-053-machine-status-1.png',
      'images/tiip/tiip-054-machine-status-2.png',
      'images/tiip/tiip-055-machine-status-3.png',
      'images/tiip/tiip-056-machine-status-4.png',
      'images/tiip/tiip-058-comprehensive-maintenance.png',
      'images/tiip/tiip-059-performance-dashboard.png',
      'images/tiip/tiip-060-performance-dashboard-2.png',
      'images/tiip/tiip-061-production-tracking.png',
      'images/tiip/tiip-062-equipment-utilization.png'
    ],
    title: '成型部門 - 生產執行系統',
    dec: '包含機台保養表、模具管理、派工系統、機台狀態監控、績效儀表板、即時生產追蹤與全廠設備稼動率分析。\n\n提供現場人員完整的生產執行工具，從設備保養到生產追蹤，全面提升現場管理效率與設備利用率。',
    techStack: ['React 18', 'Redux Toolkit', 'Recharts', 'Material-UI', 'Day.js']
  }
]

/**
 * 展示櫃配置
 */
const showcaseConfig = {
  pageTitle: '專案展示',
  pageSubtitle: '科專_TIIP模具產業高階製造',
  aboutTitle: '關於此專案展示',
  aboutContent: [
    '這是一個工業級智慧製造管理系統，專為模具產業設計，整合生產排程、即時監控、數據分析等核心功能。',
    '本專案採用現代化前端技術棧，注重使用者體驗與系統效能，成功協助工廠提升生產效率、優化資源調度。'
  ]
}

//! =============== 主要組件 ===============

/**
 * TIIP 專案展示頁面
 * 💡 **[重構]** 現在只需要配置資料並傳入通用組件即可
 */
const ProjectShowcase = () => {
  return (
    <ShowcaseGallery
      items={tiipProjectData}
      config={showcaseConfig}
      showProgress={true}
      showAboutNote={true}
    />
  )
}

export default ProjectShowcase

