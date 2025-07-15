/**
 * @fileoverview 每日生產進度監控組件
 * @description 顯示當日生產任務進度，包含生產狀態標示和詳細數據表格
 * @version 2.0.0
 * @author Manufacturing Live Monitor Team
 * @since 2024-06-24
 */

import React, { memo } from "react";

// 業務組件導入
import DailyProductionDashboard from "../components/Dashboard/DailyProductionDashboard";
import DashBordrdMark from "../../../components/Marks/DashBordrdMark";
import { BaseCard } from "../../../components/DashboardCard";

// 樣式組件導入
import { BorderBox } from "../../../styles/Content";
import { FlexFlow } from "../../../styles/Dataflow";

// 配置常量導入
import { STATUS_COLORS, STATUS_NAMES } from "../../../configs/Color";

/**
 * 生產狀態標示數據配置
 * @constant {Array<Object>} PRODUCTION_STATUS_INDICATORS
 * @description 定義生產狀態的標示數據，用於顯示不同狀態的標記
 */
const PRODUCTION_STATUS_INDICATORS = [
  {
    status: STATUS_NAMES.NORMAL,
    color: STATUS_COLORS.NORMAL,
    description: "生產進度正常",
  },
  {
    status: STATUS_NAMES.WARNING,
    color: STATUS_COLORS.WARNING,
    description: "需要關注的生產狀態",
  },
  {
    status: STATUS_NAMES.EXPIRED,
    color: STATUS_COLORS.EXPIRED,
    description: "超期需要立即處理",
  },
];

/**
 * 每日生產進度監控組件
 * @component DailyProduction
 * @description
 * 主要功能：
 * 1. 顯示當日生產任務的整體進度
 * 2. 提供生產狀態的視覺化標示
 * 3. 整合詳細的生產數據儀表板
 *
 * @param {Object} props - 組件屬性
 * @param {string} [props.title="本日生產進度"] - 卡片標題
 * @param {boolean} [props.showStatusIndicators=true] - 是否顯示狀態標示
 * @returns {React.ReactElement} 渲染的每日生產進度組件
 */
const DailyProduction = memo(function DailyProduction({
  title = "本日生產進度",
  showStatusIndicators = true,
}) {
  return (
    <BorderBox>
      <BaseCard>
        <BaseCard.Header>
          <FlexFlow>
            <BaseCard.Title>{title}</BaseCard.Title>
            {showStatusIndicators && (
              <DashBordrdMark data={PRODUCTION_STATUS_INDICATORS} />
            )}
          </FlexFlow>
        </BaseCard.Header>
        <BaseCard.Content>
          <DailyProductionDashboard />
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  );
});

export default DailyProduction;
