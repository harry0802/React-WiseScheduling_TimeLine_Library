/**
 * Home 頁面功能卡片定義
 * 統一管理所有功能卡片的資訊及其 icon
 *
 * @typedef {Object} FeatureCard
 * @property {string} icon - Iconify icon 名稱
 * @property {string} title - 卡片標題
 * @property {string} description - 卡片描述
 * @property {string} link - 連結路徑
 * @property {string} buttonText - 按鈕文字
 */

/**
 * 首頁功能卡片定義集合
 * @type {FeatureCard[]}
 */
export const HOME_FEATURE_CARDS = [
  {
    icon: 'streamline-stickies-color:baby',
    title: '關於我',
    description: '前端工程師,專注於 React 生態系統與工業級系統開發',
    link: '/about',
    buttonText: '查看履歷'
  },
  {
    icon: 'streamline-ultimate-color:module-four',
    title: '開發歷程',
    description: '專案開發時程與技術演進歷程',
    link: '/timeline',
    buttonText: '查看開發歷程'
  },
  {
    icon: 'streamline-emojis:factory',
    title: '模具產業系統',
    description: '科專_TIIP模具產業高階製造系統展示',
    link: '/project-showcase',
    buttonText: '查看專案詳情'
  },
  {
    icon: 'skill-icons:figma-light',
    title: 'Design Token 推動',
    description: '設計系統規範化,推動設計與開發協作效率提升',
    link: '/design-token',
    buttonText: '查看 Design Token'
  },
  {
    icon: 'streamline-ultimate-color:calendar-1',
    title: '智慧排程系統',
    description: '工業級生產排程管理,支援多區域即時調度與狀態追蹤',
    link: '/wise-scheduling',
    buttonText: '進入智慧排程'
  },
  {
    icon: 'streamline-ultimate-color:monitor-graph-line',
    title: '製造監控中心',
    description: '多功能生產監控儀表板,包含 OEE 分析、進度追蹤等',
    link: '/ManufacturingLiveMonitor',
    buttonText: '進入監控中心'
  },
  {
    icon: 'fluent-emoji-flat:pig',
    title: '養豬場管理系統',
    description: '豬隻飼養管理系統,追蹤豬舍庫存與飼養記錄',
    link: '/pig-house-inventory',
    buttonText: '進入管理系統'
  },
  {
    icon: 'flat-color-icons:business-contact',
    title: '聯絡方式',
    description: '歡迎聯繫討論專案合作或技術交流',
    link: '/contact',
    buttonText: '聯絡我'
  }
]

