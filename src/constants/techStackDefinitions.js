/**
 * 技術棧定義常量
 * 統一管理所有專案使用的技術棧及其 icon
 *
 * @typedef {Object} TechStackItem
 * @property {string} name - 技術名稱
 * @property {string} icon - Iconify icon 名稱
 */

/**
 * 技術棧定義集合
 * @type {Object.<string, TechStackItem>}
 */
export const TECH_DEFINITIONS = {
  // ==================== Frontend Frameworks ====================
  REACT_18: { name: 'React 18', icon: 'skill-icons:react-dark' },
  REACT_18_3: { name: 'React 18.3.1', icon: 'skill-icons:react-dark' },

  // ==================== State Management ====================
  REDUX_TOOLKIT: { name: 'Redux Toolkit', icon: 'skill-icons:redux' },
  RTK_QUERY: { name: 'Redux Toolkit (RTK Query)', icon: 'skill-icons:redux' },
  ZUSTAND: { name: 'Zustand', icon: 'devicon:zustand' },
  TANSTACK_QUERY: { name: 'TanStack Query', icon: 'logos:react-query-icon' },

  // ==================== UI Libraries ====================
  MATERIAL_UI: { name: 'Material-UI', icon: 'skill-icons:materialui-dark' },
  MUI: { name: 'MUI', icon: 'skill-icons:materialui-dark' },
  STYLED_COMPONENTS: {
    name: 'Styled Components',
    icon: 'skill-icons:styledcomponents'
  },
  ANTD: { name: 'Ant Design', icon: 'logos:ant-design' },

  // ==================== Form & Validation ====================
  REACT_HOOK_FORM: {
    name: 'React Hook Form',
    icon: 'simple-icons:reacthookform'
  },
  ZOD: { name: 'Zod Validation', icon: 'logos:typescript-icon' },

  // ==================== Data Visualization ====================
  VIS_TIMELINE: { name: 'Vis-timeline (客製化)', icon: 'mdi:chart-gantt' },
  RECHARTS: { name: 'Recharts', icon: 'simple-icons:chartdotjs' },
  ECHARTS: { name: 'ECharts', icon: 'simple-icons:apacheecharts' },
  DATA_VIEW_REACT: {
    name: '@iimm/data-view-react',
    icon: 'mdi:view-dashboard'
  },

  // ==================== Date & Time ====================
  DAYJS: { name: 'Day.js', icon: 'logos:javascript' },
  DATE_FNS: { name: 'date-fns', icon: 'logos:javascript' },
  MOMENT: { name: 'Moment.js', icon: 'logos:javascript' },

  // ==================== Routing ====================
  REACT_ROUTER: { name: 'React Router (巢狀路由)', icon: 'logos:react-router' },
  REACT_ROUTER_V6: { name: 'React Router v6', icon: 'logos:react-router' },

  // ==================== DevOps & Deployment ====================
  DOCKER: { name: 'Docker', icon: 'skill-icons:docker' },
  NGINX: { name: 'Nginx', icon: 'skill-icons:nginx' },
  VITE: { name: 'Vite', icon: 'skill-icons:vite-dark' },
  GITHUB_PAGES: { name: 'GitHub Pages', icon: 'skill-icons:github-dark' },

  // ==================== Code Quality ====================
  ESLINT: { name: 'ESLint', icon: 'skill-icons:eslint' },
  PRETTIER: { name: 'Prettier', icon: 'skill-icons:prettier-dark' },
  COMMITIZEN: { name: 'Commitizen', icon: 'mdi:git' },

  // ==================== Design System ====================
  DESIGN_TOKENS: { name: 'Design Tokens', icon: 'mdi:palette' },
  LIGHTHOUSE_CI: { name: 'Lighthouse CI', icon: 'logos:lighthouse' },

  // ==================== Error Handling ====================
  REACT_ERROR_BOUNDARY: {
    name: 'react-error-boundary',
    icon: 'mdi:alert-circle'
  },

  // ==================== Carousel ====================
  EMBLA_CAROUSEL: { name: 'embla-carousel-react', icon: 'mdi:view-carousel' },

  // ==================== Markdown ====================
  REACT_MARKDOWN: { name: 'react-markdown', icon: 'mdi:language-markdown' }
}

