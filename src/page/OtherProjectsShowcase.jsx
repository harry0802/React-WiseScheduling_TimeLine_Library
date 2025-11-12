import ShowcaseGallery from '../components/ShowcaseGallery'

//! =============== 其他專案資料配置 ===============

/**
 * 個人專案展示資料
 * 🎯 **[示範]** 展示 ShowcaseGallery 組件的可重用性
 */
const personalProjectData = [
  {
    id: 1,
    pic: null,
    title: '電商網站 - 前端系統',
    dec: '完整的電商購物平台，包含商品瀏覽、購物車、結帳流程等功能。\n\n使用 React 18 和 Next.js 建構，實現伺服器端渲染以提升 SEO 表現。',
    techStack: ['Next.js 14', 'React 18', 'TailwindCSS', 'React Query']
  },
  {
    id: 2,
    pic: null,
    title: '社群媒體平台',
    dec: '即時通訊與社交功能整合的平台，支援貼文發布、按讚留言、好友管理等功能。\n\n採用 WebSocket 技術實現即時訊息推送，提供流暢的社交體驗。',
    techStack: ['React', 'Socket.io', 'Express', 'MongoDB']
  },
  {
    id: 3,
    pic: null,
    title: '任務管理系統',
    dec: '團隊協作的任務管理工具，支援看板視圖、甘特圖、時間追蹤等功能。\n\n整合第三方 API，實現行事曆同步與通知提醒功能。',
    techStack: ['Vue 3', 'Pinia', 'Element Plus', 'Chart.js']
  }
]

/**
 * 展示櫃配置
 */
const showcaseConfig = {
  pageTitle: '個人作品集',
  pageSubtitle: 'Personal Portfolio',
  aboutTitle: '關於這些專案',
  aboutContent: [
    '這些是我在學習與實踐過程中完成的個人專案，涵蓋電商、社交、協作等不同領域。',
    '透過這些專案，我持續精進前端技術能力，探索各種現代化開發工具與最佳實踐。'
  ]
}

//! =============== 主要組件 ===============

/**
 * 其他專案展示頁面
 * 🎯 **[示範]** 只需更換資料配置，就能重用 ShowcaseGallery 組件
 */
const OtherProjectsShowcase = () => {
  return (
    <ShowcaseGallery
      items={personalProjectData}
      config={showcaseConfig}
      showProgress={true}
      showAboutNote={true}
    />
  )
}

export default OtherProjectsShowcase

