// Design Token - Colors
// 現代簡約配色系統

export const colors = {
  // 背景色彩
  background: {
    primary: '#010D15',       // 主要深色背景
    secondary: '#000000',     // 次要深色背景
    surface: '#FFFFFF',       // 白色卡片表面
    surfaceAlt: '#EFEFEF',    // 淺灰色替代背景
  },

  // 強調色彩
  accent: {
    primary: '#1593EB',       // 藍色 - 主要強調色
    primaryHover: '#0d7acc',  // 藍色 hover 狀態
    primaryLight: '#6fb9f0',  // 淺藍色
  },

  // 邊框色彩
  border: {
    primary: '#1593EB',       // 藍色外框
    light: '#E0EBF0',         // 淡藍灰色內框
    medium: '#EFEFEF',        // 淺灰色
    dark: '#010D15',          // 深色
  },

  // 文字色彩
  text: {
    primary: '#000000',       // 深色文字（淺色背景用）
    secondary: '#010D15',     // 次要深色文字
    tertiary: '#6a6a6a',      // 三級深色文字
    inverse: '#FFFFFF',       // 淺色文字（深色背景用）
    inverseSecondary: '#E0EBF0', // 次要淺色文字
    accent: '#1593EB',        // 藍色標題/強調文字
  },

  // 功能色彩
  functional: {
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#1593EB',
  }
};

export default colors;
