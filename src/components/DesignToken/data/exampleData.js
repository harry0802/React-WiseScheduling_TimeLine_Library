//! =============== 1. 命名範例資料 ===============

export const namingExamples = [
  {
    element: 'button',
    type: 'bg',
    hierarchy: 'primary',
    state: 'default',
    name: 'button-bg-primary-default',
    description: '主按鈕預設底色'
  },
  {
    element: 'button',
    type: 'bg',
    hierarchy: 'primary',
    state: 'hover',
    name: 'button-bg-primary-hover',
    description: '主按鈕hover底色'
  },
  {
    element: 'button',
    type: 'bg',
    hierarchy: 'secondary',
    state: 'disabled',
    name: 'button-bg-secondary-disabled',
    description: '次要按鈕禁用底色'
  },
  {
    element: 'input',
    type: 'border',
    hierarchy: 'primary',
    state: 'focus',
    name: 'input-border-primary-focus',
    description: '輸入框focus主色'
  },
  {
    element: 'card',
    type: 'bg',
    hierarchy: 'weak',
    state: '',
    name: 'card-bg-weak',
    description: '卡片淡化底色'
  },
  {
    element: 'text',
    type: '',
    hierarchy: 'secondary',
    state: '',
    name: 'text-secondary',
    description: '輔助文字色'
  }
]

//! =============== 2. 程式碼範例 ===============

export const scssExample = `$button-bg-primary-default:   #1976d2;
$button-bg-primary-hover:     #115293;
$button-bg-secondary-default: #eeeeee;
$button-bg-secondary-hover:   #cccccc;

$text-primary:      #212121;
$text-secondary:    #757575;
$text-weak:         #bdbdbd;

$input-border-primary-focus:  #1976d2;
$input-border-default:        #cccccc;
$card-bg-default:             #FFFFFF;
$card-bg-weak:                #fafafa;`

export const cssVariablesExample = `:root {
  --color-mist: #EEE;
  --color-fog: #DDD;
  --color-asphalt: #333;
  --color-void: #202020;

  /* Usage specific color variables */
  --card-bg-color: var(--color-mist);
  --card-text-color: var(--color-void);
}

:root[data-theme="dark"] {
  --card-bg-color: var(--color-asphalt);
  --card-text-color: var(--color-fog);
}

.card {
  color: var(--card-text-color);
  background-color: var(--card-bg-color);
}`

export const systemTokenExample = `/* Value-based variables at the global level */
:root {
  /* Colors */
  --system-color-bondiBlue: rgb(0 58 71);
  --system-color-canaryYellow: rgb(255 239 0);
  --system-color-caribbeanGreen: rgb(0 204 153);

  /* Font Sizes */
  --system-fontSize-jumbo: 3.052rem;
  --system-fontSize-large: 1.563rem;
  --system-fontSize-small: 0.8rem;

  /* Font Weights */
  --system-fontWeight-bold: 700;
  --system-fontWeight-medium: 400;
  --system-fontWeight-light: 200;

  /* Durations */
  --system-duration-presto: 60ms;
  --system-duration-allegro: 125ms;
  --system-duration-andante: 500ms;

  /* Elevation */
  --system-boxShadow-slightlyRaised: 0 1px 2px 0 rgb(0 0 0 / 10%);
  --system-boxShadow-floatingBox: 0 0 30px 0 rgb(0 0 0 / 35%);
}`

export const tokenStructureExample = `src/
└── styles/
    ├── tokens/
    │   ├── colors.ts
    │   ├── spacing.ts
    │   ├── font.ts
    │   ├── radius.ts
    │   ├── border.ts
    │   ├── shadow.ts
    │   ├── animation.ts
    │   ├── opacity.ts
    │   ├── zIndex.ts
    │   ├── breakpoints.ts
    │   └── index.ts       # 統一匯出所有 Token
    │
    └── globalStyles.ts    # 用於全域注入 CSS Variables`

export const colorsObjectExample = `export const colors = {
  base: {
    primary: '#1976d2',
    secondary: '#ff4081',
    background: '#ffffff',
    text: '#333333',
  },
  states: {
    error: '#ff4d4f',
    success: '#52c41a',
    warning: '#faad14',
  },
  brand: {
    logoBlue: '#0047ab',
  },
};`

//! =============== 3. Token 分類 ===============

export const tokenCategories = [
  { category: 'colors/', description: '基礎色、狀態色、品牌色' },
  { category: 'spacing/', description: '間距尺寸、欄間距' },
  { category: 'font/', description: '字體大小、字重、字體族群、行高' },
  { category: 'radius/', description: '圓角設定' },
  { category: 'border/', description: '邊框寬度、樣式、顏色' },
  { category: 'shadow/', description: '陰影深度與樣式' },
  { category: 'animation/', description: '動畫時長、緩動函數' },
  { category: 'opacity/', description: '透明度分級' },
  { category: 'zIndex/', description: '圖層順序' },
  { category: 'breakpoints/', description: '響應式斷點設定' }
]

//! =============== 4. Figma → Emotion → MUI 架構專用範例 ===============

// 定義層 (Primitives)：展示 theme.ts
export const figmaThemeExample = `// 📄 src/styles/tokens/common/theme.ts
// 直接對應設計師的 Figma Variables (Primitives)

export const theme = {
  colors: {
    // 品牌色系：勿忘草藍
    myosotis: {
      300: '#8AC0E2',
      600: '#688EA6',
      800: '#4B6677',
    },
    // 輔助色系：暮光綠
    twilight: {
      300: '#90EAD8',
      600: '#00FDCA',
      800: '#01AD8A',
    },
    // 深色模式背景
    lateAtNight: {
      800: '#0C244B',
      900: '#0C1421',
    },
    // ...其他色系 (Green, Red, Orange...)
  },
  // ...Typography, Spacing, Breakpoints
};`

// 語意層 (Semantics)：展示 color.ts
export const semanticColorExample = `// 📄 src/styles/tokens/common/color.ts
import { theme } from './theme';

// 將原始 Figma 變數映射為語意化 Token
export const color = {
  // 品牌主色
  primary: {
    300: theme.colors.myosotis[300],
    600: theme.colors.myosotis[600],
  },
  // 背景層級
  surface: {
    base: theme.colors.lateAtNight[900],
    paper: theme.colors.lateAtNight[800],
  },
  // 功能狀態
  success: {
    main: theme.colors.green[600],
  }
};`

// 注入層 (Emotion)：展示 variables.css.ts 與 GlobalStyles
export const emotionGlobalStylesExample = `// 📄 src/styles/variables.css.ts
import { color } from './tokens/common';

// 自動生成 CSS Variables 字串
const cssVariables = \`:root {
  --color-bg-primary: \${color.primary[600]};
  --color-bg-paper: \${color.surface.paper};
  // ...其他自動生成的變數
}\`;

// 📄 src/styles/globalStyles.tsx
import React from 'react';
import { Global, css } from '@emotion/react';

// 使用 Emotion 的 Global 組件注入 CSS 變數
// 優勢：支援動態換膚，未來可輕鬆替換內容以適應不同商業品牌
export const GlobalStyles: React.FC = () => {
  return (
    <Global
      styles={css\`
        \${cssVariables}
      \`}
    />
  );
};`

// 整合層 (MUI)：展示 App.tsx
export const muiThemeIntegrationExample = `// 📄 src/App.tsx
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/tokens/common/theme';

// 將我們的 Design Token 映射至 MUI 的語意化系統
const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: theme.colors.myosotis[600], // 對應 Figma 變數
      light: theme.colors.myosotis[300],
      dark: theme.colors.myosotis[800],
    },
    secondary: {
      main: theme.colors.twilight[600],
    },
    background: {
      default: theme.colors.lateAtNight[900],
      paper: theme.colors.lateAtNight[800],
    },
    // ...狀態色 (Success, Warning, Error)
  },
  // ...Typography, Breakpoints
});

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <GlobalStyles /> {/* Emotion 注入全域變數 */}
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}`

// 架構圖
export const figmaArchitectureExample = `src/
├── styles/
│   ├── tokens/
│   │   └── common/
│   │       ├── theme.ts       # Figma Primitives (原始數值)
│   │       ├── color.ts       # Semantic Mapping (語意映射)
│   │       └── index.ts
│   │
│   ├── variables.css.ts       # 生成 CSS 變數定義字串
│   └── globalStyles.tsx       # Emotion Global 注入組件
│
└── App.tsx                    # MUI Theme 整合入口`
