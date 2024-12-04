import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    /* Primary Colors */
    --color-primary: #186c98;
    --color-primary-light: #739bb0;
    --color-primary-text: #e1e7f5;
    --color-primary-main: #1890ff;

    /* Text Colors */
    --color-text: #8f8f8f;
    --color-text-secondary: #8f8f8f;
    --color-text-primary: #333333;

    /* Background Colors */
    --color-background-light: #eceaea;
    --color-background-dark: #515357;
    --color-background-alt: #dfdfdf;
    --color-background-thead: #cdcdcd;
    --color-background: #ebecf0;
    --color-background-card: #f1f1f1;

    /* Border Colors */
    --color-border: #e8e8e8;

    /* Button Colors */
    --color-button-primary: #83bf45;
    --color-button-hover: #6fc1ae;
    --color-confirm-button-bg: #186c98;
    --color-click-button-bg: #8bc1e3;
    --color-confirm-button-text: #fff;

    /* Misc Colors */
    --color-danger: #ef4444;
    --color-hover: #6fc1ae;
    --color-active: #8bc1e3;

    /* Breakpoints */
    --breakpoint-xs: 576px;
    --breakpoint-sm: 768px;
    --breakpoint-md: 992px;
    --breakpoint-lg: 1200px;
  }
`;

export default GlobalStyles;
