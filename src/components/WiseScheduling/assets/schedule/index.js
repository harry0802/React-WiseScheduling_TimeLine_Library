/*
src/
  assets/
    schedule/
      TimelineBase.styles.js     # 基礎元件樣式
      TimelineItem.styles.js     # 項目樣式
      TimelineAxis.styles.js     # 時間軸樣式
      TimelineStatus.styles.js   # 狀態相關樣式
      TimelineContainer.js       # 整合後的容器樣式
      TimelineGlobalStyles.js    # 時間線全域樣式
      industrialTheme.js         # 工業風格主題
      index.js                   # 導出統一介面
*/

// 🎨 主題與全域樣式
export { default as industrialTheme, getStatusColor, getAreaColor, getPriorityColor } from "./industrialTheme";
export { TimelineGlobalStyles } from "./TimelineGlobalStyles";

// 🏗️ 容器與佈局組件
export { TimelineContainer, TimelineContent } from "./TimelineContainer";

// 📦 基礎樣式組件 - 保留以便兼容
export { BaseTimelineContainer, TimelineGrid } from "./TimelineBase.styles";
export { BaseItem, StatusStyles } from "./TimelineItem.styles";
export { TimeAxisStyles, CurrentTimeMarker } from "./TimelineAxis.styles";
export {
  StatusBase,
  StatusProgress,
  StatusLabel,
} from "./TimelineStatus.styles";
