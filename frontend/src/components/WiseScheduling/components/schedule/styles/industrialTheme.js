/**
 * @file industrialTheme.js
 * @description 定義工廠管理系統的工業風格主題 - 優化版
 * @version 2.0.0
 */

// 工業風格的配色方案 - 簡化並增加對比度
export const industrialTheme = {
  colors: {
    // 主色系 - 簡化為基本的藍色系
    primary: {
      main: "#1E3A5F", // 深蔚藍色主色
      light: "#1976D2", // 標準藍色
      dark: "#0D47A1", // 深藍色
      contrast: "#FFFFFF", // 純白色對比色
    },
    // 強調色 - 減少變體，增加對比度
    accent: {
      blue: "#1976D2", // 標準藍色
      red: "#F44336", // 標準紅色
      green: "#4CAF50", // 標準綠色
      orange: "#FF9800", // 標準橙色
    },
    // 狀態色彩 - 簡化並增加對比度
    status: {
      idle: "#757575", // 灰色 - 更深更明顯
      running: "#4CAF50", // 標準綠色
      setup: "#FF9800", // 標準橙色
      stopped: "#F44336", // 標準紅色
    },
    // 背景色 - 簡化為基本的灰度系
    background: {
      primary: "#FFFFFF", // 純白色
      secondary: "#F5F5F5", // 淺灰色
      panel: "#EEEEEE", // 較深的淺灰色
      hover: "#E0E0E0", // 灰色懸停背景
    },
    // 文字色 - 增加對比度
    text: {
      primary: "#212121", // 近黑色
      secondary: "#616161", // 中灰色
      disabled: "#9E9E9E", // 較深的灰色
      contrast: "#FFFFFF", // 純白色
    },
    // 邊框色 - 簡化並增加可見性
    border: {
      light: "#E0E0E0", // 淺灰色
      medium: "#9E9E9E", // 中灰色
      dark: "#616161", // 深灰色
      active: "#1976D2", // 藍色活動邊框
    },
  },
  // 統一尺寸設定 - 增加尺寸
  size: {
    height: "48px", // 增加標準高度
    borderRadius: "6px", // 增加圓角
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
    },
    fontSize: {
      xs: "14px", // 增加最小字體大小
      sm: "16px", // 增加小字體大小
      md: "18px", // 增加中字體大小
      lg: "20px", // 增加大字體大小
      xl: "24px", // 增加超大字體大小
      xxl: "28px", // 增加最大字體大小
    },
  },
  // 動畫效果 - 簡化
  animation: {
    transition: "all 0.2s ease", // 簡化過渡效果
  },
  // 陰影效果 - 簡化
  shadows: {
    sm: "0 2px 4px rgba(0,0,0,0.1)", // 簡化小陰影
    md: "0 4px 8px rgba(0,0,0,0.1)", // 簡化中陰影
    lg: "0 8px 16px rgba(0,0,0,0.1)", // 簡化大陰影
  },
};

// 根據狀態獲取顏色 - 簡化映射
export const getStatusColor = (status) => {
  const statusMap = {
    "製令單": "#1976D2", // 藍色
    "閒置": "#757575", // 灰色
    "設置中": "#FF9800", // 橙色
    "生產中": "#4CAF50", // 綠色
    "停機": "#F44336", // 紅色
    "維護中": "#673AB7", // 紫色
  };

  return statusMap[status] || "#212121"; // 默認近黑色
};

export default industrialTheme;