import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* 使用更直覺的盒模型 */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* 移除預設邊距 */
  * {
    margin: 0;
  }

  /* 基本樣式 */
  html {
    background-color: #1a1a1a;
  }

  body {
    font-family: ${(props) => props.theme.fonts.main};
    background-color: #1a1a1a;
    color: #f5f5f5;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  #root {
    background-color: #1a1a1a;
    min-height: 100vh;
  }

  /* 改進媒體元素預設值 */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  /* 統一表單元素的字體 */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* 避免文字溢出 */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  /* 改進行換行 */
  p {
    text-wrap: pretty;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-wrap: balance;
  }

  /* 創建根堆疊上下文 */
  #root,
  #__next {
    isolation: isolate;
  }

  /* 應用程式容器 */
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* 內容區域 */
  .content {
    flex: 1;
  }

  /* 鏈接樣式 */
  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* 自適應設計 */
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    .page-container {
      padding: 0 1rem;
    }
  }
`

export default GlobalStyles

