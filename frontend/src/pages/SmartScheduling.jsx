import React from "react";
import DynamicTimeline from "../components/WiseScheduling/components/schedule";

/**
 * @component SmartScheduling
 * @description 智慧排程頁面 - 生產排程時間軸管理
 * @returns {JSX.Element} 智慧排程頁面
 *
 * @notes
 * - 提供動態時間線排程功能
 * - 支援多區域生產排程管理
 * - 包含即時數據同步與狀態管理
 * - 響應式時間範圍控制
 */
const SmartScheduling = () => {
  return <DynamicTimeline />;
};

export default SmartScheduling;