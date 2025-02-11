//! =============== 1. 基礎配置 ===============
import styled, { css } from "styled-components";

//* 🧠 核心樣式配置
const timelineTheme = {
  colors: {
    header: "#186c98",
    text: "#ffffff",
    gridMinor: "#00bbc9",
    gridMajor: "#00747c",
    hover: "rgba(25, 118, 210, 0.05)",
    weekend: "rgba(25, 118, 210, 0.08)",
    rowAlternate: "rgba(0, 0, 0, 0.02)",
  },
  spacing: {
    base: "1rem",
    label: "2px 14px",
  },
};

//! =============== 2. 共用樣式 ===============
//* 💡 滾動條樣式
const scrollbarStyles = css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
`;

//* 💡 網格基礎樣式
const gridStyles = css`
  .vis-grid {
    &.vis-minor {
      border-color: rgba(0, 0, 0, 0.05);
      border-left: 1px dashed ${timelineTheme.colors.gridMinor};
    }

    &.vis-major {
      border-left: 2px solid ${timelineTheme.colors.gridMajor};
    }
  }
`;

//! =============== 3. 組件實現 ===============
/**
 * 🧠 Timeline 基礎容器
 * @component BaseTimelineContainer
 */
export const BaseTimelineContainer = styled.div`
  .vis-timeline {
    border: none;
    font-family: "Noto Sans TC", sans-serif;
    padding: ${timelineTheme.spacing.base};
  }

  /* ✨ Header 樣式 */
  .vis-panel.vis-top,
  .vis-time-axis.vis-foreground {
    background-color: ${timelineTheme.colors.header};
  }

  .vis-time-axis .vis-text {
    color: ${timelineTheme.colors.text} !important;
  }

  /* 💡 中心區域滾動 */
  .vis-panel.vis-center {
    ${scrollbarStyles}
  }
`;

/**
 * 🧠 Timeline 網格系統
 * @component TimelineGrid
 */
export const TimelineGrid = styled.div`
  /* ✨ 基礎網格 */
  ${gridStyles}

  /* 💡 行樣式與互動 */
  .vis-panel.vis-center .vis-content {
    .vis-itemset .vis-foreground .vis-group {
      transition: background-color 0.2s ease;

      &:nth-child(odd) {
        background-color: ${timelineTheme.colors.rowAlternate};
      }

      &:hover {
        background-color: ${timelineTheme.colors.hover};
      }
    }
  }

  /* ✨ 週末特殊樣式 */
  .vis-time-axis .vis-grid {
    &.vis-saturday,
    &.vis-sunday {
      background-color: ${timelineTheme.colors.weekend};
    }
  }

  /* 💡 標籤樣式 */
  .vis-labelset .vis-label {
    padding: ${timelineTheme.spacing.label};

    /* ⚠️ 支持動態行顏色 */
    &[data-color] {
      background-color: var(--row-color);
    }
  }
`;
