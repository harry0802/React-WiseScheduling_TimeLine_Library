/**
 * Home 頁面功能卡片定義
 * 統一管理所有功能卡片的 icon 和 link
 * 文字內容由 i18n translation 提供
 *
 * @typedef {Object} FeatureCard
 * @property {string} icon - Iconify icon 名稱
 * @property {string} link - 連結路徑
 */

/**
 * 首頁功能卡片定義集合
 * 文字由 public/locales/{lang}/home.json 的 cards 區段提供
 * @type {FeatureCard[]}
 */
export const HOME_FEATURE_CARDS = [
  {
    icon: 'streamline-stickies-color:baby',
    link: '/about'
  },
  {
    icon: 'streamline-ultimate-color:module-four',
    link: '/timeline'
  },
  {
    icon: 'streamline-emojis:factory',
    link: '/project-showcase'
  },
  {
    icon: 'skill-icons:figma-light',
    link: '/design-token'
  },
  {
    icon: 'streamline-ultimate-color:calendar-1',
    link: '/wise-scheduling'
  },
  {
    icon: 'streamline-ultimate-color:monitor-graph-line',
    link: '/ManufacturingLiveMonitor'
  },
  {
    icon: 'fluent-emoji-flat:pig',
    link: '/pig-house-inventory'
  },
  {
    icon: 'flat-color-icons:business-contact',
    link: '/contact'
  }
]

