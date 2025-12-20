import { useTranslation } from 'react-i18next'
import ShowcaseGallery from '../components/ShowcaseGallery'
import { TECH_DEFINITIONS } from '../constants/techStackDefinitions'
import useDocumentTitle from '../hooks/useDocumentTitle'

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
// 原本的靜態資料已移至 i18n translation 檔案 (public/locales/*/project.json)

//! =============== 3. Core Functionality ===============

/**
 * Custom Hook: 從 i18n 載入專案資料
 * @returns {object} TIIP_PROJECT_DATA 和 SHOWCASE_CONFIG
 */
const useProjectData = () => {
  const { t } = useTranslation('project')

  // 從 i18n 載入 4 個專案資料
  const projects = t('projects', { returnObjects: true })

  // 將 translation 資料轉換為組件需要的格式
  const TIIP_PROJECT_DATA = [
    {
      id: projects.production.id,
      title: projects.production.title,
      dec: projects.production.description,
      techStack: [
        TECH_DEFINITIONS.REACT_18,
        TECH_DEFINITIONS.RTK_QUERY,
        TECH_DEFINITIONS.VIS_TIMELINE,
        TECH_DEFINITIONS.MATERIAL_UI,
        TECH_DEFINITIONS.REACT_HOOK_FORM,
        TECH_DEFINITIONS.ZOD,
        TECH_DEFINITIONS.ZUSTAND,
        TECH_DEFINITIONS.I18N,
        TECH_DEFINITIONS.DOCKER,
        TECH_DEFINITIONS.NGINX
      ],
      systems: [
        {
          name: projects.production.systems.schedule,
          images: ['images/tiip/tiip-010-production-schedule.webp']
        },
        {
          name: projects.production.systems.quote,
          images: [
            'images/tiip/tiip-011-internal-quote-0.webp',
            'images/tiip/tiip-012-internal-quote-1.webp',
            'images/tiip/tiip-014-internal-quote-2.webp'
          ]
        },
        {
          name: projects.production.systems.bom,
          images: [
            'images/tiip/tiip-016-product-bom-1.webp',
            'images/tiip/tiip-017-product-bom-2.webp',
            'images/tiip/tiip-021-product-bom-3.webp'
          ]
        },
        {
          name: projects.production.systems.costAnalysis,
          images: ['images/tiip/tiip-022-cost-analysis.webp']
        },
        {
          name: projects.production.systems.smartSchedule,
          images: [
            'images/tiip/tiip-023-smart-schedule-1.webp',
            'images/tiip/tiip-024-smart-schedule-2.webp',
            'images/tiip/tiip-026-smart-schedule-3.webp',
            'images/tiip/tiip-027-smart-schedule-4.webp',
            'images/tiip/tiip-028-smart-schedule-5.webp',
            'images/tiip/tiip-029-smart-schedule-6.webp',
            'images/tiip/tiip-030-smart-schedule-7.webp',
            'images/tiip/tiip-032-smart-schedule-8.webp',
            'images/tiip/tiip-033-smart-schedule-9.webp'
          ]
        }
      ]
    },
    {
      id: projects.qualityControl.id,
      title: projects.qualityControl.title,
      dec: projects.qualityControl.description,
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
          name: projects.qualityControl.systems.inspection,
          images: [
            'images/tiip/tiip-034-qc-inspection-1.webp',
            'images/tiip/tiip-035-qc-inspection-2.webp',
            'images/tiip/tiip-036-qc-inspection-3.webp',
            'images/tiip/tiip-037-qc-inspection-4.webp'
          ]
        }
      ]
    },
    {
      id: projects.sales.id,
      title: projects.sales.title,
      dec: projects.sales.description,
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
          name: projects.sales.systems.quote,
          images: [
            'images/tiip/tiip-038-sales-quote-1.webp',
            'images/tiip/tiip-039-sales-quote-2.webp',
            'images/tiip/tiip-040-sales-quote-3.webp',
            'images/tiip/tiip-041-sales-quote-4.webp',
            'images/tiip/tiip-042-sales-quote-5.webp',
            'images/tiip/tiip-043-sales-quote-6.webp',
            'images/tiip/tiip-044-sales-quote-7.webp'
          ]
        }
      ]
    },
    {
      id: projects.manufacturing.id,
      title: projects.manufacturing.title,
      dec: projects.manufacturing.description,
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
          name: projects.manufacturing.systems.machineMaintenance,
          images: ['images/tiip/tiip-045-machine-maintenance.webp']
        },
        {
          name: projects.manufacturing.systems.moldMaintenance,
          images: ['images/tiip/tiip-047-mold-maintenance.webp']
        },
        {
          name: projects.manufacturing.systems.dispatch,
          images: [
            'images/tiip/tiip-048-dispatch-1.webp',
            'images/tiip/tiip-049-dispatch-2.webp',
            'images/tiip/tiip-050-dispatch-3.webp'
          ]
        },
        {
          name: projects.manufacturing.systems.machineStatus,
          images: [
            'images/tiip/tiip-053-machine-status-1.webp',
            'images/tiip/tiip-054-machine-status-2.webp',
            'images/tiip/tiip-055-machine-status-3.webp',
            'images/tiip/tiip-056-machine-status-4.webp'
          ]
        },
        {
          name: projects.manufacturing.systems.comprehensiveMaintenance,
          images: ['images/tiip/tiip-058-comprehensive-maintenance.webp']
        },
        {
          name: projects.manufacturing.systems.performanceDashboard,
          images: [
            'images/tiip/tiip-059-performance-dashboard.webp',
            'images/tiip/tiip-060-performance-dashboard-2.webp'
          ]
        },
        {
          name: projects.manufacturing.systems.productionTracking,
          images: ['images/tiip/tiip-061-production-tracking.webp']
        },
        {
          name: projects.manufacturing.systems.equipmentUtilization,
          images: ['images/tiip/tiip-062-equipment-utilization.webp']
        }
      ]
    }
  ]

  const meta = t('meta', { returnObjects: true })
  const about = t('about', { returnObjects: true })

  const SHOWCASE_CONFIG = {
    pageTitle: meta.title,
    pageSubtitle: meta.subtitle,
    aboutTitle: about.title,
    aboutContent: about.content
  }

  return { TIIP_PROJECT_DATA, SHOWCASE_CONFIG }
}

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
  const { t } = useTranslation('project')
  const { TIIP_PROJECT_DATA, SHOWCASE_CONFIG } = useProjectData()

  // 設置頁面標題
  useDocumentTitle(t('meta.documentTitle'))

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

