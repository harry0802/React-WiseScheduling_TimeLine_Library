// TimelineBase.styles.js
import styled from "styled-components";

/**
 * 🧠 Timeline 基礎容器
 * - 移除預設邊框
 * - 設定字體
 * - 基礎間距
 */
export const BaseTimelineContainer = styled.div`
  /* 基礎重置 */
  .vis-timeline {
    border: none;
    font-family: "Noto Sans TC", sans-serif;
    padding: 1rem;
  }

  /* ✨ 滾動條美化 */
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
`;

/**
 * 💡 網格樣式抽離
 * 可根據不同時間區段客製化
 */
export const TimelineGrid = styled.div`
  .vis-grid {
    &.vis-minor {
      border-color: #f5f5f5;
    }

    &.vis-major {
      border-color: #e0e0e0;
    }
  }
`;
