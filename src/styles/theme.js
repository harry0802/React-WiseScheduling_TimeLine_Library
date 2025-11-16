// theme.js
import { createGlobalStyle } from "styled-components";

/**
 * @function createResponsiveTheme
 * @description 創建一個包含響應式排版的主題對象
 * @returns {Object} 完整的主題配置
 */
const createResponsiveTheme = () => {
  //! =============== 1. 設定與常量 ===============
  //* 主題變量定義，包含所有設計系統需要的值
  const theme = {
    colors: {
      primary: "#42a5f5",        // 明亮藍色 - 在深色背景上清晰
      primaryDark: "#1976d2",    // 深藍色 hover
      secondary: "#ff4081",      // 明亮粉紅 - 高對比笑點
      text: "#ffffff",           // 白色文字 - 深色背景用
      lightText: "#b0b0b0",      // 淺灰文字
      background: "#1a1a1a",     // 深色背景
      cardBackground: "#2c2c2c", // 深灰卡片背景
      border: "#404040",         // 深灰邊框
      error: "#ff5252",          // 明亮紅色錯誤
      success: "#69f0ae",        // 明亮綠色成功
      warning: "#ffab40",        // 明亮橙色警告
    },
    fonts: {
      main: '"Free HK Kai", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      headings: '"Free HK Kai", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
      "3xl": "4rem",
    },
    borderRadius: {
      sm: "0.125rem",
      md: "0.25rem",
      lg: "0.5rem",
      xl: "1rem",
      full: "9999px",
    },
    shadows: {
      sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
      md: "0 2px 4px rgba(0, 0, 0, 0.1)",
      lg: "0 5px 15px rgba(0, 0, 0, 0.1)",
      xl: "0 10px 25px rgba(0, 0, 0, 0.1)",
      "2xl": "0 20px 40px rgba(0, 0, 0, 0.1)",
    },
    breakpoints: {
      mobile: "576px",
      tablet: "768px",
      desktop: "992px",
      largeDesktop: "1200px",
      wide: "1440px", // 新增寬螢幕斷點
      ultrawide: "1920px", // 新增超寬螢幕斷點
      tv: "2560px", // 新增電視螢幕斷點
      bigtv: "3440px", // 新增大型電視斷點
      tv50: "4096px", // 新增50吋電視斷點
    },
    // 🧠 基礎字體大小 - 針對 Free HK Kai 調整 (視覺較小,整體放大)
    fontSizes: {
      xs: "0.875rem", // 14px
      sm: "1rem", // 16px
      base: "1.125rem", // 18px
      lg: "1.25rem", // 20px
      xl: "1.5rem", // 24px
      "2xl": "1.75rem", // 28px
      "3xl": "2.125rem", // 34px
      "4xl": "2.5rem", // 40px
      "5xl": "3.25rem", // 52px
      "6xl": "4rem", // 64px
      "7xl": "4.75rem", // 76px
    },
  };

  // 💡 針對不同屏幕尺寸的字體大小定義
  const responsiveFontSizes = {
    // 寬螢幕斷點 (wide): 1440px
    wide: {
      xs: "0.8125rem", // 13px
      sm: "0.9375rem", // 15px
      base: "1.0625rem", // 17px
      lg: "1.1875rem", // 19px
      xl: "1.375rem", // 22px
      "2xl": "1.625rem", // 26px
      "3xl": "2rem", // 32px
      "4xl": "2.5rem", // 40px
      "5xl": "3.25rem", // 52px
      "6xl": "4rem", // 64px
      "7xl": "5rem", // 80px
    },
    // 超寬螢幕斷點 (ultrawide): 1920px
    ultrawide: {
      xs: "0.875rem", // 14px
      sm: "1rem", // 16px
      base: "1.125rem", // 18px
      lg: "1.25rem", // 20px
      xl: "1.5rem", // 24px
      "2xl": "1.75rem", // 28px
      "3xl": "2.25rem", // 36px
      "4xl": "2.75rem", // 44px
      "5xl": "3.5rem", // 56px
      "6xl": "4.5rem", // 72px
      "7xl": "5.5rem", // 88px
    },
    // 電視螢幕斷點 (tv): 2560px
    tv: {
      xs: "1rem", // 16px
      sm: "1.125rem", // 18px
      base: "1.25rem", // 20px
      lg: "1.5rem", // 24px
      xl: "1.75rem", // 28px
      "2xl": "2rem", // 32px
      "3xl": "2.5rem", // 40px
      "4xl": "3rem", // 48px
      "5xl": "4rem", // 64px
      "6xl": "5rem", // 80px
      "7xl": "6rem", // 96px
    },
    // 大型電視螢幕斷點 (bigtv): 3440px
    bigtv: {
      xs: "1.25rem", // 20px
      sm: "1.5rem", // 24px
      base: "1.75rem", // 28px
      lg: "2rem", // 32px
      xl: "2.25rem", // 36px
      "2xl": "2.75rem", // 44px
      "3xl": "3.25rem", // 52px
      "4xl": "4rem", // 64px
      "5xl": "5rem", // 80px
      "6xl": "6rem", // 96px
      "7xl": "7.5rem", // 120px
    },
    // 50吋電視螢幕斷點 (tv50): 4096px+
    tv50: {
      xs: "1.5rem", // 24px
      sm: "1.75rem", // 28px
      base: "2rem", // 32px
      lg: "2.5rem", // 40px
      xl: "3rem", // 48px
      "2xl": "3.5rem", // 56px
      "3xl": "4rem", // 64px
      "4xl": "5rem", // 80px
      "5xl": "6rem", // 96px
      "6xl": "7.5rem", // 120px
      "7xl": "9rem", // 144px
    },
  };

  // ✨ 返回完整主題，包含響應式字體大小信息
  return {
    ...theme,
    responsiveFontSizes,
  };
};

// 導出主題對象
export const theme = createResponsiveTheme();

/**
 * @component GlobalTypography
 * @description 全局排版樣式，使用主題中定義的響應式字體大小
 */
export const GlobalTypography = createGlobalStyle`
  :root {
    /* 基礎字體大小變數 */
    --font-size-xs: ${theme.fontSizes.xs};
    --font-size-sm: ${theme.fontSizes.sm};
    --font-size-base: ${theme.fontSizes.base};
    --font-size-lg: ${theme.fontSizes.lg};
    --font-size-xl: ${theme.fontSizes.xl};
    --font-size-2xl: ${theme.fontSizes["2xl"]};
    --font-size-3xl: ${theme.fontSizes["3xl"]};
    --font-size-4xl: ${theme.fontSizes["4xl"]};
    --font-size-5xl: ${theme.fontSizes["5xl"]};
    --font-size-6xl: ${theme.fontSizes["6xl"]};
    --font-size-7xl: ${theme.fontSizes["7xl"]};
  }

  /* 基礎字體大小類別 */
  .text-xs { font-size: var(--font-size-xs); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-base { font-size: var(--font-size-base); }
  .text-lg { font-size: var(--font-size-lg); }
  .text-xl { font-size: var(--font-size-xl); }
  .text-2xl { font-size: var(--font-size-2xl); }
  .text-3xl { font-size: var(--font-size-3xl); }
  .text-4xl { font-size: var(--font-size-4xl); }
  .text-5xl { font-size: var(--font-size-5xl); }
  .text-6xl { font-size: var(--font-size-6xl); }
  .text-7xl { font-size: var(--font-size-7xl); }

  /* 寬螢幕斷點 (wide): 1440px - 適合寬螢幕桌機 */
  @media (min-width: ${theme.breakpoints.wide}) {
    :root {
      --font-size-xs: ${theme.responsiveFontSizes.wide.xs};
      --font-size-sm: ${theme.responsiveFontSizes.wide.sm};
      --font-size-base: ${theme.responsiveFontSizes.wide.base};
      --font-size-lg: ${theme.responsiveFontSizes.wide.lg};
      --font-size-xl: ${theme.responsiveFontSizes.wide.xl};
      --font-size-2xl: ${theme.responsiveFontSizes.wide["2xl"]};
      --font-size-3xl: ${theme.responsiveFontSizes.wide["3xl"]};
      --font-size-4xl: ${theme.responsiveFontSizes.wide["4xl"]};
      --font-size-5xl: ${theme.responsiveFontSizes.wide["5xl"]};
      --font-size-6xl: ${theme.responsiveFontSizes.wide["6xl"]};
      --font-size-7xl: ${theme.responsiveFontSizes.wide["7xl"]};
    }
  }

  /* 超寬螢幕斷點 (ultrawide): 1920px - 適合超寬螢幕和小型電視 */
  @media (min-width: ${theme.breakpoints.ultrawide}) {
    :root {
      --font-size-xs: ${theme.responsiveFontSizes.ultrawide.xs};
      --font-size-sm: ${theme.responsiveFontSizes.ultrawide.sm};
      --font-size-base: ${theme.responsiveFontSizes.ultrawide.base};
      --font-size-lg: ${theme.responsiveFontSizes.ultrawide.lg};
      --font-size-xl: ${theme.responsiveFontSizes.ultrawide.xl};
      --font-size-2xl: ${theme.responsiveFontSizes.ultrawide["2xl"]};
      --font-size-3xl: ${theme.responsiveFontSizes.ultrawide["3xl"]};
      --font-size-4xl: ${theme.responsiveFontSizes.ultrawide["4xl"]};
      --font-size-5xl: ${theme.responsiveFontSizes.ultrawide["5xl"]};
      --font-size-6xl: ${theme.responsiveFontSizes.ultrawide["6xl"]};
      --font-size-7xl: ${theme.responsiveFontSizes.ultrawide["7xl"]};
    }
  }

  /* 電視螢幕斷點 (tv): 2560px - 適合大型顯示器和中型電視 */
  @media (min-width: ${theme.breakpoints.tv}) {
    :root {
      --font-size-xs: ${theme.responsiveFontSizes.tv.xs};
      --font-size-sm: ${theme.responsiveFontSizes.tv.sm};
      --font-size-base: ${theme.responsiveFontSizes.tv.base};
      --font-size-lg: ${theme.responsiveFontSizes.tv.lg};
      --font-size-xl: ${theme.responsiveFontSizes.tv.xl};
      --font-size-2xl: ${theme.responsiveFontSizes.tv["2xl"]};
      --font-size-3xl: ${theme.responsiveFontSizes.tv["3xl"]};
      --font-size-4xl: ${theme.responsiveFontSizes.tv["4xl"]};
      --font-size-5xl: ${theme.responsiveFontSizes.tv["5xl"]};
      --font-size-6xl: ${theme.responsiveFontSizes.tv["6xl"]};
      --font-size-7xl: ${theme.responsiveFontSizes.tv["7xl"]};
    }
  }

  /* 大型電視螢幕斷點 (bigtv): 3440px - 適合超寬和大型電視 */
  @media (min-width: ${theme.breakpoints.bigtv}) {
    :root {
      --font-size-xs: ${theme.responsiveFontSizes.bigtv.xs};
      --font-size-sm: ${theme.responsiveFontSizes.bigtv.sm};
      --font-size-base: ${theme.responsiveFontSizes.bigtv.base};
      --font-size-lg: ${theme.responsiveFontSizes.bigtv.lg};
      --font-size-xl: ${theme.responsiveFontSizes.bigtv.xl};
      --font-size-2xl: ${theme.responsiveFontSizes.bigtv["2xl"]};
      --font-size-3xl: ${theme.responsiveFontSizes.bigtv["3xl"]};
      --font-size-4xl: ${theme.responsiveFontSizes.bigtv["4xl"]};
      --font-size-5xl: ${theme.responsiveFontSizes.bigtv["5xl"]};
      --font-size-6xl: ${theme.responsiveFontSizes.bigtv["6xl"]};
      --font-size-7xl: ${theme.responsiveFontSizes.bigtv["7xl"]};
    }
  }

  /* 50吋電視螢幕斷點 (tv50): 4096px+ - 適合50吋以上大型電視 */
  @media (min-width: ${theme.breakpoints.tv50}) {
    :root {
      --font-size-xs: ${theme.responsiveFontSizes.tv50.xs};
      --font-size-sm: ${theme.responsiveFontSizes.tv50.sm};
      --font-size-base: ${theme.responsiveFontSizes.tv50.base};
      --font-size-lg: ${theme.responsiveFontSizes.tv50.lg};
      --font-size-xl: ${theme.responsiveFontSizes.tv50.xl};
      --font-size-2xl: ${theme.responsiveFontSizes.tv50["2xl"]};
      --font-size-3xl: ${theme.responsiveFontSizes.tv50["3xl"]};
      --font-size-4xl: ${theme.responsiveFontSizes.tv50["4xl"]};
      --font-size-5xl: ${theme.responsiveFontSizes.tv50["5xl"]};
      --font-size-6xl: ${theme.responsiveFontSizes.tv50["6xl"]};
      --font-size-7xl: ${theme.responsiveFontSizes.tv50["7xl"]};
    }
  }
`;

// 設定全局主題使用指南
/**
 * 使用方法:
 * 1. 在應用根組件引入 GlobalTypography 並渲染
 * 2. 使用 ThemeProvider 包裹應用並傳入 theme
 *
 * 示例:
 * import { ThemeProvider } from 'styled-components';
 * import { theme, GlobalTypography } from './theme';
 *
 * function App() {
 *   return (
 *     <ThemeProvider theme={theme}>
 *       <GlobalTypography />
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 */

export default theme;
