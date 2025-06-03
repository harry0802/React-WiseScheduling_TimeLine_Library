/**
 * @file industrialTheme.js
 * @description 定義工廠管理系統的工業風格主題 - 優化版
 * @version 2.0.0
 */

import { createGlobalStyle } from "styled-components";

// 🎨 全域時間線樣式 - 替代 simpleFactoryFonts.css
export const TimelineGlobalStyles = createGlobalStyle`
  :root {
    --factory-font-family: "Noto Sans TC", "Microsoft JhengHei", "PingFang TC", sans-serif;
    --factory-transition: all 0.2s ease;
  }

  /* 🏭 時間軸樣式 - 工廠老人友善超大字體 */
  .vis-time-axis .vis-text.vis-major {
    font-size: 42px;        /* 從 36px 再提升到 42px - 年份日期超大 */
    font-weight: 800;       
    padding: 12px 20px;     /* 增加更多內距 */
    transition: var(--factory-transition);
  }

  .vis-time-axis .vis-text.vis-minor {
    font-size: 32px;        /* 從 28px 提升到 32px */
    font-weight: 700;       
    padding: 10px 16px;     /* 增加更多內距 */
    transition: var(--factory-transition);
  }

  .vis-time-axis .vis-text {
    font-size: 28px;        /* 從 24px 提升到 28px */
    font-weight: 600;       
    padding: 10px 16px;     /* 增加更多內距 */
    font-family: var(--factory-font-family);
  }

  /* 🏷️ 機台標籤 - 最重要，需要最大字體 */
  .vis-labelset .vis-label {
    font-size: 24px;        /* 從 18px 提升到 24px */
    font-weight: 700;       /* 從 600 增加到 700 */
    padding: 12px 16px;     /* 增加內距 */
    line-height: 1.5;       /* 增加行高 */
  }

  .vis-labelset .vis-label:hover {
    background-color: rgba(24, 108, 152, 0.05);
  }

  /* 📦 時間線項目 - 增大以便老人閱讀 */
  .vis-item {
    font-size: 20px;        /* 從 16px 提升到 20px */
    min-height: 56px;       /* 從 48px 提升到 56px */
    height: auto;
    line-height: 1.4;       /* 增加行高 */
    border-width: 2px;      /* 從 1.5px 增加到 2px */
    border-radius: 8px;     /* 從 6px 增加到 8px */
    transition: var(--factory-transition);
    font-family: var(--factory-font-family);
  }

  .vis-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);  /* 增強陰影 */
  }

  .vis-item.vis-selected {
    border-width: 3px;      /* 從 2px 增加到 3px */
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.3);  /* 增強選中效果 */
  }

  /* 📝 內容文字 - 工廠環境大字體 */
  .vis-item .vis-item-content,
  .vis-item-content,
  .vis-item .timeline-item-content .content {
    font-size: 20px;        /* 從 16px 提升到 20px */
    font-weight: 600;
    line-height: 1.4;       /* 增加行高 */
  }

  .vis-item .timeline-item-content .status {
    font-size: 18px;        /* 從 14px 提升到 18px */
    font-weight: 600;       /* 從 500 增加到 600 */
  }

  .vis-item .timeline-item-content .order-info .product-name {
    font-size: 22px;        /* 從 16px 提升到 22px */
    font-weight: 700;
  }

  .vis-item .timeline-item-content .time,
  .vis-item .timeline-item-content .process,
  .vis-item .timeline-item-content .order-info .process {
    font-size: 16px;        /* 從 13px 提升到 16px */
    font-weight: 500;       /* 從 400 增加到 500 */
    opacity: 0.9;           /* 從 0.8 提升到 0.9 */
  }

  /* 🎯 項目類型 - 統一大字體 */
  .vis-item.vis-box,
  .vis-item.vis-point,
  .vis-item.vis-range {
    font-size: 20px;        /* 從 16px 提升到 20px */
    min-height: 56px;       /* 從 48px 提升到 56px */
  }

  .vis-item.vis-background {
    font-size: 18px;        /* 從 14px 提升到 18px */
    opacity: 0.8;           /* 從 0.7 提升到 0.8 */
  }

  /* 🔄 基礎設定 - 工廠友善字體 */
  .vis-timeline {
    font-family: var(--factory-font-family);
    font-size: 18px;        /* 從 14px 提升到 18px */
  }

  /* 📱 響應式 - 保持超大字體在不同螢幕 */
  @media (max-width: 1024px) {
    .vis-time-axis .vis-text.vis-major {
      font-size: 36px;      /* 從 32px 提升到 36px - 年份日期 */
      padding: 10px 16px;   /* 調整內距 */
    }

    .vis-time-axis .vis-text.vis-minor {
      font-size: 30px;      /* 從 26px 提升到 30px */
      padding: 8px 12px;    /* 調整內距 */
    }

    .vis-time-axis .vis-text {
      font-size: 26px;      /* 從 22px 提升到 26px */
      padding: 8px 12px;    /* 調整內距 */
    }

    .vis-labelset .vis-label {
      font-size: 22px;      /* 保持 22px */
      padding: 10px 14px;   /* 調整內距 */
    }

    .vis-item {
      font-size: 18px;      /* 保持 18px */
      min-height: 52px;     /* 保持 52px */
    }
  }

  @media (max-width: 768px) {
    .vis-time-axis .vis-text.vis-major {
      font-size: 32px;      /* 從 28px 提升到 32px - 手機版年份 */
      padding: 8px 12px;    /* 調整內距 */
    }

    .vis-time-axis .vis-text.vis-minor {
      font-size: 26px;      /* 從 22px 提升到 26px */
      padding: 6px 10px;    /* 調整內距 */
    }

    .vis-time-axis .vis-text {
      font-size: 24px;      /* 從 20px 提升到 24px */
      padding: 6px 10px;    /* 調整內距 */
    }

    .vis-labelset .vis-label {
      font-size: 20px;      /* 保持 20px */
      padding: 8px 12px;    /* 調整內距 */
    }

    .vis-item {
      font-size: 16px;      /* 保持 16px */
      min-height: 48px;     /* 保持 48px */
    }
  }
`;

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
  // 統一尺寸設定 - 工廠老人友善大尺寸
  size: {
    height: "56px" /* 增加標準高度 - 便於點擊 */,
    borderRadius: "8px" /* 增加圓角 */,
    spacing: {
      xs: "6px" /* 增加間距 */,
      sm: "12px",
      md: "20px",
      lg: "28px",
      xl: "36px",
    },
    fontSize: {
      xs: "18px" /* 最小字體大小 - 工廠老人友善 */,
      sm: "20px" /* 小字體大小 */,
      md: "22px" /* 中字體大小 */,
      lg: "26px" /* 大字體大小 */,
      xl: "30px" /* 超大字體大小 */,
      xxl: "36px" /* 最大字體大小 */,

      // 🏭 工廠專用字體大小 - 老人友善超大字體版本
      factory: {
        timeline: {
          axisLarge: "42px" /* 時間軸主要刻度 (年份日期超大) */,
          axisMedium: "32px" /* 時間軸次要刻度 */,
          axisSmall: "28px" /* 時間軸小刻度 */,
          itemTitle: "22px" /* 項目標題 */,
          itemContent: "20px" /* 項目內容 */,
          itemMeta: "18px" /* 項目細節 */,
          machineLabel: "24px" /* 機台標籤 */,
        },
        button: {
          sm: "18px" /* 小按鈕 */,
          md: "20px" /* 中按鈕 */,
          lg: "24px" /* 大按鈕 */,
        },
        heading: {
          h1: "40px" /* 主標題 */,
          h2: "36px" /* 副標題 */,
          h3: "32px" /* 三級標題 */,
          h4: "28px" /* 四級標題 */,
          h5: "24px" /* 五級標題 */,
          h6: "20px" /* 六級標題 */,
        },
      },
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
    製令單: "#1976D2", // 藍色
    閒置: "#757575", // 灰色
    設置中: "#FF9800", // 橙色
    生產中: "#4CAF50", // 綠色
    停機: "#F44336", // 紅色
    維護中: "#673AB7", // 紫色
  };

  return statusMap[status] || "#212121"; // 默認近黑色
};

export default industrialTheme;
