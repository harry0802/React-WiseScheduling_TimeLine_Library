// Design Token - Colors
// 日式高級餐廳風格配色系統

export const colors = {
  // 背景色彩
  background: {
    primary: '#1a1a1a',       // 主要深色背景
    secondary: '#2c2c2c',     // 次要深色背景
    surface: '#f5f3f0',       // 米白色卡片表面
    surfaceAlt: '#ede8e3',    // 替代米白色
  },

  // 強調色彩
  accent: {
    gold: '#d4af37',          // 金色 - 主要強調色
    goldHover: '#c19a2e',     // 金色 hover 狀態
    goldLight: '#e8d7a0',     // 淺金色
  },

  // 邊框色彩
  border: {
    gold: '#d4af37',          // 金色外框
    light: '#d4d4d4',         // 淡灰色內框
    medium: '#b0b0b0',        // 中灰色
    dark: '#5a5a5a',          // 深灰色
  },

  // 文字色彩
  text: {
    primary: '#2c2c2c',       // 深色文字（淺色背景用）
    secondary: '#5a5a5a',     // 次要深色文字
    tertiary: '#8a8a8a',      // 三級深色文字
    inverse: '#f5f5f5',       // 淺色文字（深色背景用）
    inverseSecondary: '#e0e0e0', // 次要淺色文字
    gold: '#d4af37',          // 金色標題/強調文字
  },

  // 功能色彩
  functional: {
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
  }
};

export default colors;
