/**
 * @file industrialTheme.js
 * @description 工廠管理系統的工業風格主題設定
 * @version 3.0.0 - 工廠老人友善版本
 * @author 資深前端開發團隊
 * @lastModified 2025-06-02
 * 
 * @features
 * - 工廠環境專用配色方案
 * - 老人友善的字體尺寸系統
 * - 高對比度顏色設計
 * - 大尺寸觸控友善設計
 */

// 🏭 工業風格配色方案 - 工廠環境優化
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
      maintenance: "#673AB7", // 紫色
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
  
  // 🎯 統一尺寸設定 - 工廠老人友善大尺寸
  size: {
    height: "56px", // 增加標準高度 - 便於點擊
    borderRadius: "8px", // 增加圓角
    spacing: {
      xs: "6px", // 增加間距
      sm: "12px",
      md: "20px",
      lg: "28px",
      xl: "36px",
    },
    
    // 📏 字體大小系統 - 工廠老人友善
    fontSize: {
      xs: "18px", // 最小字體大小 - 工廠老人友善
      sm: "20px", // 小字體大小
      md: "22px", // 中字體大小
      lg: "26px", // 大字體大小
      xl: "30px", // 超大字體大小
      xxl: "36px", // 最大字體大小

      // 🏭 工廠專用字體大小系統
      factory: {
        // 時間線專用字體
        timeline: {
          axisLarge: "42px", // 時間軸主要刻度 (年份日期超大)
          axisMedium: "32px", // 時間軸次要刻度
          axisSmall: "28px", // 時間軸小刻度
          itemTitle: "22px", // 項目標題
          itemContent: "20px", // 項目內容
          itemMeta: "18px", // 項目細節
          machineLabel: "24px", // 機台標籤
        },
        
        // 按鈕字體
        button: {
          sm: "18px", // 小按鈕
          md: "20px", // 中按鈕
          lg: "24px", // 大按鈕
        },
        
        // 標題字體
        heading: {
          h1: "40px", // 主標題
          h2: "36px", // 副標題
          h3: "32px", // 三級標題
          h4: "28px", // 四級標題
          h5: "24px", // 五級標題
          h6: "20px", // 六級標題
        },
      },
    },
  },
  
  // 🎬 動畫效果 - 簡化
  animation: {
    transition: "all 0.2s ease", // 簡化過渡效果
  },
  
  // 🌟 陰影效果 - 簡化
  shadows: {
    sm: "0 2px 4px rgba(0,0,0,0.1)", // 簡化小陰影
    md: "0 4px 8px rgba(0,0,0,0.1)", // 簡化中陰影
    lg: "0 8px 16px rgba(0,0,0,0.1)", // 簡化大陰影
  },
};

// 🎨 狀態顏色映射函數 - 簡化映射
export function getStatusColor(status) {
  const statusMap = {
    "製令單": industrialTheme.colors.accent.blue,
    "閒置": industrialTheme.colors.status.idle,
    "設置中": industrialTheme.colors.status.setup,
    "生產中": industrialTheme.colors.status.running,
    "停機": industrialTheme.colors.status.stopped,
    "維護中": industrialTheme.colors.status.maintenance,
  };

  return statusMap[status] || industrialTheme.colors.text.primary;
}

// 🏷️ 機台區域顏色函數
export function getAreaColor(area) {
  const areaColors = {
    "A": industrialTheme.colors.accent.blue,
    "B": industrialTheme.colors.accent.green,
    "C": industrialTheme.colors.accent.orange,
    "D": industrialTheme.colors.accent.red,
  };
  
  return areaColors[area] || industrialTheme.colors.primary.main;
}

// 📊 優先級顏色函數
export function getPriorityColor(priority) {
  const priorityColors = {
    "高": industrialTheme.colors.accent.red,
    "中": industrialTheme.colors.accent.orange,
    "低": industrialTheme.colors.status.idle,
  };
  
  return priorityColors[priority] || industrialTheme.colors.text.secondary;
}

export default industrialTheme;
