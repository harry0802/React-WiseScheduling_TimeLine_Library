/**
 * @file TimelineGlobalStyles.js
 * @description 時間線全域樣式 - 工廠老人友善大字體版本
 * @version 3.0.0 - 超大字體工廠環境優化
 * @author 資深前端開發團隊
 * @lastModified 2025-06-02
 *
 * @features
 * - 工廠環境超大字體設計
 * - 老人友善的視覺對比度
 * - 響應式字體適配
 * - 高觸控友善度設計
 */

import { createGlobalStyle } from "styled-components";

// 🎨 時間線全域樣式 - 替代 simpleFactoryFonts.css
export const TimelineGlobalStyles = createGlobalStyle`
  :root {
    --factory-font-family: "Noto Sans TC", "Microsoft JhengHei", "PingFang TC", sans-serif;
    --factory-transition: all 0.2s ease;
  }

  /* 🏭 時間軸樣式 - 工廠老人友善超大字體 */
  .vis-time-axis .vis-text.vis-major {
    font-size: 42px !important;        /* 年份日期超大 - 工廠環境 */
    font-weight: 800;       /* 超粗體 */
    padding: 12px 20px;     /* 大內距 */
    transition: var(--factory-transition);
  }

  .vis-time-axis .vis-text.vis-minor {
    font-size: 32px;        /* 時間標籤大字體 */
    font-weight: 700;       /* 粗體 */
    padding: 10px 16px;     /* 適中內距 */
    transition: var(--factory-transition);
  }

  .vis-time-axis .vis-text {
    font-size: 28px;        /* 一般時間軸文字 */
    font-weight: 600;       /* 半粗體 */
    padding: 10px 16px;     /* 適中內距 */
    font-family: var(--factory-font-family);
  }

  /* 🏷️ 機台標籤 - 最重要，需要最大字體 */
  .vis-labelset .vis-label {
    font-size: 24px;        /* 機台名稱大字體 */
    font-weight: 700;       /* 粗體 */
    padding: 12px 16px;     /* 大內距 */
    line-height: 1.5;       /* 寬鬆行高 */
  }

  .vis-labelset .vis-label:hover {
    background-color: rgba(24, 108, 152, 0.05);
  }

  /* 📦 時間線項目 - 增大以便老人閱讀 */
  .vis-item {
    font-size: 20px;        /* 項目基礎字體 */
    min-height: 56px;       /* 大高度 */
    height: auto;
    line-height: 1.4;       /* 適中行高 */
    border-width: 2px;      /* 粗邊框 */
    border-radius: 8px;     /* 圓角 */
    transition: var(--factory-transition);
    font-family: var(--factory-font-family);
  }

  .vis-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);  /* 增強陰影 */
  }

  .vis-item.vis-selected {
    border-width: 3px;      /* 超粗選中邊框 */
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.3);  /* 選中光環 */
  }

  /* 📝 內容文字 - 工廠環境大字體 */
  .vis-item .vis-item-content,
  .vis-item-content,
  .vis-item .timeline-item-content .content {
    font-size: 20px;        /* 內容文字大字體 */
    font-weight: 600;       /* 半粗體 */
    line-height: 1.4;       /* 適中行高 */
  }

  .vis-item .timeline-item-content .status {
    font-size: 18px;        /* 狀態文字 */
    font-weight: 600;       /* 半粗體 */
  }

  .vis-item .timeline-item-content .order-info .product-name {
    font-size: 22px;        /* 產品名稱突出 */
    font-weight: 700;       /* 粗體 */
  }

  .vis-item .timeline-item-content .time,
  .vis-item .timeline-item-content .process,
  .vis-item .timeline-item-content .order-info .process {
    font-size: 16px;        /* 細節資訊 */
    font-weight: 500;       /* 中等字重 */
    opacity: 0.9;           /* 高可見度 */
  }

  /* 🎯 項目類型 - 統一大字體 */
  .vis-item.vis-box,
  .vis-item.vis-point,
  .vis-item.vis-range {
    font-size: 20px;        /* 統一項目字體 */
    min-height: 56px;       /* 統一高度 */
  }

  .vis-item.vis-background {
    font-size: 18px;        /* 背景項目 */
    opacity: 0.8;           /* 適度透明 */
  }

  /* 🔄 基礎設定 - 工廠友善字體 */
  .vis-timeline {
    font-family: var(--factory-font-family);
    font-size: 18px;        /* 基礎大字體 */
  }

  /* 📱 響應式 - 保持超大字體在不同螢幕 */
  @media (max-width: 1024px) {
    .vis-time-axis .vis-text.vis-major {
      font-size: 36px;      /* 平板版年份 */
      padding: 10px 16px;   
    }

    .vis-time-axis .vis-text.vis-minor {
      font-size: 30px;      /* 平板版時間 */
      padding: 8px 12px;    
    }

    .vis-time-axis .vis-text {
      font-size: 26px;      /* 平板版一般文字 */
      padding: 8px 12px;    
    }

    .vis-labelset .vis-label {
      font-size: 22px;      /* 平板版機台標籤 */
      padding: 10px 14px;   
    }

    .vis-item {
      font-size: 18px;      /* 平板版項目 */
      min-height: 52px;     
    }
  }

  @media (max-width: 768px) {
    .vis-time-axis .vis-text.vis-major {
      font-size: 32px;      /* 手機版年份 */
      padding: 8px 12px;    
    }

    .vis-time-axis .vis-text.vis-minor {
      font-size: 26px;      /* 手機版時間 */
      padding: 6px 10px;    
    }

    .vis-time-axis .vis-text {
      font-size: 24px;      /* 手機版一般文字 */
      padding: 6px 10px;    
    }

    .vis-labelset .vis-label {
      font-size: 20px;      /* 手機版機台標籤 */
      padding: 8px 12px;    
    }

    .vis-item {
      font-size: 16px;      /* 手機版項目 */
      min-height: 48px;     
    }
  }
`;

export default TimelineGlobalStyles;
