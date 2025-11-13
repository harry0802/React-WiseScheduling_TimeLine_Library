//! =============== 1. 個人資訊 ===============

export const personalInfo = {
  name: '林志翰',
  title: '前端工程師',
  photo: '' // 留空將顯示預設 👤 圖示，之後可替換為實際照片路徑
}

//! =============== 2. 摘要 ===============

export const summary = {
  paragraphs: [
    '我是一位充滿熱情、樂於學習的前端工程師，在第一份工作中，我深刻體會到<strong>溝通與團隊合作</strong>是推動專案成功的核心。我享受與 PM、設計師及後端夥伴緊密協作，並在新創的挑戰中，<strong>主動提出解決方案</strong>，在獲得主管支持後，協助團隊導入新技術與優化流程。',
    '目前正在尋找下一個能讓我貢獻所學、持續成長的舞台。'
  ]
}

//! =============== 3. 工作經歷 ===============

export const workExperience = {
  company: '雙肩股份有限公司',
  position: '前端工程師',
  duration: '1年2個月',
  overview:
    '在這段期間，我擔任前端工程師，負責與後端、UI/UX 設計師及產品經理協同開發。我樂於分享與溝通，在團隊的共同努力下，我們負責的專案成為公司唯一順利結案的專案，並獲得技術主管的肯定。',

  achievements: [
    {
      title: '智慧製造專案',
      items: [
        '在時程內接續開發並完成 13 項功能，確保系統順利驗收',
        '優化既有程式碼庫，修復多個Bug，顯著提升系統穩定性',
        '成功將專案由 Webpack 遷移至 Vite，改善了開發環境的啟動與熱更新速度'
      ]
    },
    {
      title: '智慧農業專案',
      items: [
        '接手並規劃新專案架構，包含組件、權限、資料夾結構、API與路由設計',
        '將專案遷移至 Vite，並成功導入 TypeScript，為專案未來的可維護性與穩定性打下良好基礎'
      ]
    }
  ],

  technicalContributions: [
    {
      title: '推動 Design Token 概念',
      description:
        '在協作中觀察到設計與開發流程的潛在痛點，主動向主管提出導入 Design Token 的構想。在獲得認可後，著手研究並協同設計師與主管三方共同擬定出一套符合團隊需求的協作模式，舉辦分享會從前端視角解說實作方式，成功在專案中試行，促進了設計與開發的協作效率。'
    },
    {
      title: '導入 TypeScript',
      description:
        '為了提升專案的長期穩定性，向主管建議在新專案中導入 TypeScript。這個想法獲得支持後，透過自主學習成功將其應用於專案開發中。'
    },
    {
      title: '分享 React 設計模式',
      description:
        '將日常進修所學的 React 設計模式主動撰寫成技術文件並分享至公司內部知識庫，促進團隊的共同成長。'
    }
  ],

  challenges: [
    {
      title: '應對設計資源不足',
      description:
        '在設計資源有限且客戶時程緊迫的挑戰下，主動承擔起部分頁面的設計工作。搜集了大量設計靈感與開源資源，在不侵犯版權的前提下完成頁面，最終獲得客戶認可，並成為產品 Demo 的重要部分。'
    },
    {
      title: '克服商用軟體限制',
      description:
        '為滿足客戶對甘特圖的客製化需求，在公司無預算購買商用方案的情況下，積極研究各種開源方案。最終找到一個高彈性的甘特圖專案，在與 PM 協商並確認可行性後，成功開發出符合驗收標準的功能。'
    }
  ]
}

//! =============== 4. 技能 ===============

export const skills = {
  languages: ['TypeScript', 'JavaScript (ES6+)'],
  frameworks: ['React', 'Vue'],
  libraries: [
    'MUI',
    'Ant Design',
    'Day.js',
    'Styled Components',
    'Emotion',
    'SCSS',
    'Tailwind CSS',
    'Zod',
    'React Hook Form',
    'Zustand',
    'Redux'
  ],
  tools: ['Git', 'npm', 'Obsidian', 'Excalidraw', 'Docker']
}

//! =============== 5. 核心優勢 ===============

export const coreStrengths = [
  {
    title: '獨立開發能力',
    description: '能夠獨立規劃專案架構、接手並完成功能開發，從設計到實作都能掌握'
  },
  {
    title: '突破困難的決心',
    description: '面對資源限制與技術挑戰，主動尋找解決方案並執行落地'
  },
  {
    title: '技術推動者',
    description: '不僅專注於開發，更主動提出技術改進建議並協助團隊導入'
  },
  {
    title: '持續學習',
    description:
      '透過自主學習掌握新技術（如 TypeScript、Design Token），並分享給團隊'
  },
  {
    title: '跨職能協作',
    description: '與 PM、設計師、後端工程師緊密合作，確保專案順利推進'
  }
]
