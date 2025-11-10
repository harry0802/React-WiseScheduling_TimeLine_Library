// TimelineContainer.js
import styled from "styled-components";

// 核心主題設定保持不變
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

// 整合所有樣式到一個組件中
export const TimelineContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  /* 🎨 科技感漸層背景 */
  background: linear-gradient(
    135deg,
    #0f2027 0%,
    #203a43 25%,
    #2c5364 50%,
    #203a43 75%,
    #0f2027 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;

  /* 添加微妙的網格紋理效果 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    border-radius: 12px;
    pointer-events: none;
    opacity: 0.5;
  }

  /* 漸層動畫 */
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* BaseTimelineContainer 樣式 */
  .vis-timeline {
    border: none;
    font-family: "Noto Sans TC", sans-serif;
    padding: ${timelineTheme.spacing.base};
    background: rgba(255, 255, 255, 0.95);
    border-radius: 8px;
    backdrop-filter: blur(10px);
  }

  /* TimeAxisStyles 樣式 */
  .vis-panel.vis-top,
  .vis-time-axis.vis-foreground {
    background-color: ${timelineTheme.colors.header};
  }

  .vis-time-axis .vis-text {
    color: ${timelineTheme.colors.text} !important;
    padding: 3px 5px;
    font-size: 13px;
  }

  /* 主要刻度樣式 */
  .vis-time-axis .vis-text.vis-major {
    font-weight: bold;
    font-size: 18px;
  }

  /* 次要刻度樣式 */
  .vis-time-axis .vis-text.vis-minor {
    color: rgba(255, 255, 255, 0.8);
  }

  /* 週末樣式 */
  .vis-time-axis .vis-text.vis-saturday,
  .vis-time-axis .vis-text.vis-sunday {
    color: #bbdefb;
    font-weight: bold;
  }

  /* CurrentTimeMarker 樣式 */
  .vis-current-time {
    background-color: #f44336;
    width: 2px;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: -4px;
      width: 10px;
      height: 10px;
      background-color: #f44336;
      border-radius: 50%;
    }
  }

  /* TimelineGrid 網格樣式 */
  .vis-grid.vis-minor {
    border-color: rgba(0, 0, 0, 0.05);
    border-left: 1px dashed ${timelineTheme.colors.gridMinor};
  }

  .vis-grid.vis-major {
    border-left: 2px solid ${timelineTheme.colors.gridMajor};
  }

  /* 滾動條樣式 */
  .vis-panel.vis-center {
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
  }

  /* 行樣式 */
  .vis-panel.vis-center .vis-content .vis-itemset .vis-foreground .vis-group {
    transition: background-color 0.2s ease;

    &:nth-child(odd) {
      background-color: ${timelineTheme.colors.rowAlternate};
    }

    &:hover {
      background-color: ${timelineTheme.colors.hover};
    }
  }

  /* 週末特殊樣式 */
  .vis-time-axis .vis-grid.vis-saturday,
  .vis-time-axis .vis-grid.vis-sunday {
    background-color: ${timelineTheme.colors.weekend};
  }

  /* 標籤樣式 */
  .vis-labelset .vis-label {
    padding: ${timelineTheme.spacing.label};
    min-height: 45px;  /* 🎯 與項目高度保持一致 */
    display: flex;
    align-items: center;  /* 垂直居中對齊 */

    &[data-color] {
      background-color: var(--row-color);
    }
  }

  /* 群組樣式 - 確保與標籤高度一致 */
  .vis-foreground .vis-group {
    min-height: 45px;  /* 🎯 與項目和標籤高度保持一致 */
  }

  /* 項目樣式 (BaseItem) */
  .vis-item {
    min-height: 45px;  /* 🎯 改為 min-height，讓 vis-timeline 控制實際高度 */
    line-height: 1.4;  /* 🔧 改為相對行高，更靈活 */
    border-radius: 4px;
    font-size: 14px;
    padding: 0 8px;
    border-width: 1px;
    transition: color 0.2s ease;

    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &.vis-selected {
      box-shadow: 0 0 0 2px #1976d2;
      z-index: 2;
    }

    /* 項目內容結構 */
    .timeline-item-content {
      padding: 4px 8px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      position: relative;

      .content {
        font-weight: bold;
        font-size: 14px;
        line-height: 1.2;
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .status {
        font-weight: bold;
        line-height: 1.2;
        margin-bottom: 2px;
      }

      .order-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 2px;

        .product-name {
          font-weight: bold;
          font-size: 14px;
          line-height: 1.2;
        }

        .process {
          font-size: 12px;
          line-height: 1.2;
          opacity: 0.9;
        }
      }

      .time {
        font-size: 12px;
        line-height: 1.2;
        opacity: 0.8;
        position: absolute;
        bottom: 6px;
        left: 8px;
      }
    }
  }

  /* 狀態樣式 (StatusStyles) */
  .vis-item.status-producing {
    background-color: #4caf50;
    border-color: #2e7d32;
    color: white;
  }

  .vis-item.status-idle {
    background-color: #9e9e9e;
    border-color: #757575;
    color: white;
  }

  .vis-item.status-setup {
    background-color: #ff9800;
    border-color: #f57c00;
    color: white;
  }

  .vis-item.status-testing {
    background-color: #2196f3;
    border-color: #1976d2;
    color: white;
  }

  .vis-item.status-stopped {
    background-color: #f44336;
    border-color: #d32f2f;
    color: white;
    font-weight: bold;
  }

  /* 進度顯示樣式 (StatusProgress) */
  .vis-item::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: width 0.3s ease;
    width: var(--progress, 0%);
  }
`;

// 為了進一步簡化，添加Paper容器樣式
export const TimelineContent = styled.div`
  width: 100%;
  flex-grow: 1;
  min-height: 600px;
`;
