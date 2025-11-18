// Design Token - Typography
// 字體系統

export const typography = {
  // 字體家族
  fontFamily: {
    primary:
      '"Free HK Kai", "Noto Serif TC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    secondary:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    monospace: '"Courier New", Courier, monospace',
    kai: '"Free HK Kai", "Noto Serif TC", serif', // Free HK Kai 優先，Noto Serif TC 後備
    edix: '"EDIX", serif'
  },

  // 字重
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },

  // 字號 (針對 Free HK Kai 調整,視覺較小所以放大)
  fontSize: {
    xs: '0.875rem', // 14px
    sm: '1rem', // 16px
    base: '1.125rem', // 18px
    lg: '1.25rem', // 20px
    xl: '1.5rem', // 24px
    '2xl': '1.75rem', // 28px
    '3xl': '2.125rem', // 34px
    '4xl': '2.5rem', // 40px
    '5xl': '3.25rem' // 52px
  },

  // 行高
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
    loose: 2
  }
}

export default typography

