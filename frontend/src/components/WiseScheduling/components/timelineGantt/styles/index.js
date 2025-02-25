/*
src/
  styles/
    timeline/
      TimelineBase.styles.js     # 基礎元件樣式
      TimelineItem.styles.js     # 項目樣式
      TimelineAxis.styles.js     # 時間軸樣式
      TimelineStatus.styles.js   # 狀態相關樣式
      TimelineContainer.js       # 整合後的容器樣式
      index.js                   # 導出統一介面
*/
// 新導出整合後的容器樣式
export { TimelineContainer, TimelineContent } from "./TimelineContainer";

// 原有導出，保留以便兼容
export { BaseTimelineContainer, TimelineGrid } from "./TimelineBase.styles";
export { BaseItem, StatusStyles } from "./TimelineItem.styles";
export { TimeAxisStyles, CurrentTimeMarker } from "./TimelineAxis.styles";
export {
  StatusBase,
  StatusProgress,
  StatusLabel,
} from "./TimelineStatus.styles";
