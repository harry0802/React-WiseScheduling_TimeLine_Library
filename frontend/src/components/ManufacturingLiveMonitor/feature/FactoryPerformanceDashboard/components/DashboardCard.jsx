// DashboardCard.jsx
import React, { createContext, useContext, useMemo } from "react";
import styled, { css } from "styled-components";

//! =============== 1. 設定與常量 ===============
//* 🧠 狀態配置常量 - 集中管理所有視覺相關屬性
// 修改 DashboardCard.jsx 中的 STATUS_CONFIG
//* 🧠 狀態配置常量 - 集中管理所有視覺相關屬性
const STATUS_CONFIG = {
  success: {
    bgColor: "rgba(19, 70, 58, 0.85)", // 深綠色 + 透明度
    statusDot: "#4ade80", // 鮮明的綠色指示燈
    statusText: "正常運行",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    lightColor: "#6ee7b7", // 淺綠色
    darkColor: "#a7f3d0", // 明亮的淺綠色
  },
  testing: {
    bgColor: "rgba(22, 78, 99, 0.85)", // 深藍色 + 透明度
    statusDot: "#38bdf8", // 鮮明的藍色指示燈
    statusText: "試模中",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    lightColor: "#7dd3fc", // 淺藍色
    darkColor: "#bae6fd", // 明亮的淺藍色
  },
  adjusting: {
    bgColor: "rgba(99, 84, 0, 0.85)", // 深浅色黃 + 透明度
    statusDot: "#eab308", // 鮮明的黃色指示燈
    statusText: "調機中",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    lightColor: "#facc15", // 金黃色
    darkColor: "#fef08a", // 淺黃色
  },
  warning: {
    bgColor: "rgba(78, 53, 22, 0.85)", // 深橙色 + 透明度
    statusDot: "#f97316", // 鮮明的橙色指示燈
    statusText: "需注意",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    lightColor: "#fdba74", // 淺橙色
    darkColor: "#fed7aa", // 明亮的淺橙色
  },
  danger: {
    bgColor: "rgba(120, 37, 46, 0.85)", // 深紅色 + 透明度
    statusDot: "#f87171", // 鮮明的紅色指示燈
    statusText: "異常狀態",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    lightColor: "#fca5a5", // 淺紅色
    darkColor: "#fee2e2", // 明亮的淺紅色
  },
  inactive: {
    bgColor: "rgba(55, 65, 81, 0.75)", // 深灰色 + 透明度
    statusDot: "#9ca3af", // 淺灰色指示燈
    statusText: "未啟用",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    lightColor: "#d1d5db", // 中灰色
    darkColor: "#e5e7eb", // 淺灰色
  },
};
//* 💡 通用陰影效果 - 抽象重複的樣式定義
const SHADOWS = {
  main: "0 10px 20px rgba(0, 0, 0, 0.4), 0 6px 6px rgba(0, 0, 0, 0.3)",
  hover: "0 15px 25px rgba(0, 0, 0, 0.4), 0 10px 10px rgba(0, 0, 0, 0.2)",
  inner:
    "inset 0 4px 8px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(0, 0, 0, 0.2)",
  text: "1px 1px 2px rgba(0, 0, 0, 0.6)",
};

//! =============== 2. 工具函數 ===============
//* 此區塊保留用於未來的工具函數擴展

//! =============== 3. Context 定義 ===============
//* 建立卡片元件的 Context
const CardContext = createContext();

//! =============== 4. Styled Components ===============
//* 基礎卡片容器
const CardContainer = styled.div`
  border-radius: 20px;
  background: ${(props) =>
    STATUS_CONFIG[props.$status]?.bgColor || STATUS_CONFIG.inactive.bgColor};
  box-shadow: ${SHADOWS.main};
  transition: all 0.3s ease;
  padding: 1.5rem;
  width: 100%;
  max-width: 300px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.15);

  &:hover {
    box-shadow: ${SHADOWS.hover};
    transform: translateY(-5px);
  }
`;

//* 頂部區域排版
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

//* ID 和狀態區域
const IdStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

//* 設備 ID 樣式
const EquipmentId = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-shadow: ${(props) =>
    STATUS_CONFIG[props.$status]?.textShadow ||
    STATUS_CONFIG.inactive.textShadow};
  letter-spacing: -0.02em;
`;

//* 狀態指示器容器
const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.75rem;
`;

//* 狀態指示點
const StatusDot = styled.span`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) =>
    STATUS_CONFIG[props.$status]?.statusDot ||
    STATUS_CONFIG.inactive.statusDot};
  margin-right: 0.5rem;
  box-shadow: 0 0 5px
    ${(props) =>
      STATUS_CONFIG[props.$status]?.statusDot ||
      STATUS_CONFIG.inactive.statusDot};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: inherit;
    opacity: 0.4;
    filter: blur(4px);
    z-index: -1;
  }
`;

//* 狀態文字
const StatusText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: ${(props) =>
    STATUS_CONFIG[props.$status]?.textShadow ||
    STATUS_CONFIG.inactive.textShadow};
  letter-spacing: 0.02em;
`;

//* 型號標籤
const ModelBadge = styled.div`
  font-size: 1rem;
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  letter-spacing: 0.05em;
`;

//* 數據區域
const StatsContainer = styled.div`
  border-radius: 10px;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(2px);
  box-shadow: ${SHADOWS.inner};
  display: flex;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

//* 共用的統計項目樣式
const StatItem = styled.div`
  width: 50%;
  text-align: center;
  padding: ${(props) => (props.$isLeft ? "0 0.75rem 0 0" : "0 0 0 0.75rem")};
  ${(props) =>
    !props.$isLeft &&
    css`
      border-left: 1px solid rgba(255, 255, 255, 0.2);
    `}
`;

//* 統計標題
const StatLabel = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
`;

//* 統計數值容器
const StatValueContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

//* 統計數值
const StatValue = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => {
    if (!props.$isActive) return STATUS_CONFIG.inactive.lightColor;
    return props.$type === "goodRate"
      ? STATUS_CONFIG[props.$status]?.lightColor
      : STATUS_CONFIG[props.$status]?.darkColor;
  }};
  text-shadow: ${SHADOWS.text};
  position: relative;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: ${(props) => {
      if (!props.$isActive) return "transparent";
      const color =
        props.$type === "goodRate"
          ? STATUS_CONFIG[props.$status]?.lightColor
          : STATUS_CONFIG[props.$status]?.darkColor;
      return color ? `${color}22` : "transparent"; // 22 is alpha in hex (13%)
    }};
    filter: blur(8px);
    opacity: 0.6;
    z-index: -1;
    border-radius: 8px;
  }
`;

//* 統計單位
const StatUnit = styled.span`
  margin-left: 0.25rem;
  font-size: 1rem;
  color: ${(props) => {
    if (!props.$isActive) return STATUS_CONFIG.inactive.lightColor;
    return props.$type === "goodRate"
      ? STATUS_CONFIG[props.$status]?.lightColor
      : STATUS_CONFIG[props.$status]?.darkColor;
  }};
  text-shadow: ${SHADOWS.text};
  opacity: 0.8;
  font-weight: 500;
  align-self: flex-start;
  margin-top: 0.5rem;
`;

//! =============== 5. Compound Component 實現 ===============
/**
 * @function DashboardCard
 * @description 設備監控卡片的主元件，使用 Compound Component 模式
 * @param {Object} props - 元件屬性
 * @param {string} props.status - 設備狀態 (success/warning/danger/inactive)
 * @param {React.ReactNode} props.children - 子元件
 * @example
 * <DashboardCard status="success">
 *   <DashboardCard.Header id="A1" model="BT-244297" />
 *   <DashboardCard.Stats goodRate={66} completionRate={30} />
 * </DashboardCard>
 */
function DashboardCard({ status = "inactive", children }) {
  // ✨ 驗證狀態值是否有效
  const validStatus = Object.keys(STATUS_CONFIG).includes(status)
    ? status
    : "inactive";

  // 🚀 使用 useMemo 優化 Context 值，避免不必要的重新渲染
  const contextValue = useMemo(
    () => ({
      status: validStatus,
      isActive: validStatus !== "inactive",
    }),
    [validStatus]
  );

  return (
    <CardContext.Provider value={contextValue}>
      <CardContainer $status={validStatus}>{children}</CardContainer>
    </CardContext.Provider>
  );
}

/**
 * @function Header
 * @description 卡片頂部區域，包含設備 ID、狀態指示和型號
 * @param {Object} props - 元件屬性
 * @param {string} props.id - 設備 ID
 * @param {string} props.model - 設備型號
 */
function Header({ id, model, statusText }) {
  const { status } = useContext(CardContext);

  return (
    <HeaderContainer>
      <IdStatusContainer>
        <EquipmentId $status={status}>{id}</EquipmentId>
        <StatusContainer>
          <StatusDot $status={status} />
          <StatusText $status={status}>
            {statusText ||
              STATUS_CONFIG[status]?.statusText ||
              STATUS_CONFIG.inactive.statusText}
          </StatusText>
        </StatusContainer>
      </IdStatusContainer>

      <ModelBadge $status={status}>
        {model !== "--" ? model : "無數據"}
      </ModelBadge>
    </HeaderContainer>
  );
}

/**
 * @function Stats
 * @description 卡片數據區域，顯示良率和完成率
 * @param {Object} props - 元件屬性
 * @param {number} props.goodRate - 良率百分比
 * @param {number} props.completionRate - 完成率百分比
 */
function Stats({ goodRate = 0, completionRate = 0 }) {
  const { status, isActive } = useContext(CardContext);

  return (
    <StatsContainer $status={status}>
      <StatItem $isLeft={true}>
        <StatLabel>良率</StatLabel>
        <StatValueContainer>
          <StatValue $isActive={isActive} $status={status} $type="goodRate">
            {goodRate}
          </StatValue>
          <StatUnit $isActive={isActive} $status={status} $type="goodRate">
            %
          </StatUnit>
        </StatValueContainer>
      </StatItem>

      <StatItem $isLeft={false}>
        <StatLabel>完成率</StatLabel>
        <StatValueContainer>
          <StatValue
            $isActive={isActive}
            $status={status}
            $type="completionRate"
          >
            {completionRate}
          </StatValue>
          <StatUnit
            $isActive={isActive}
            $status={status}
            $type="completionRate"
          >
            %
          </StatUnit>
        </StatValueContainer>
      </StatItem>
    </StatsContainer>
  );
}

//! =============== 6. 組合元件 ===============
// 將子元件附加到主元件上
DashboardCard.Header = Header;
DashboardCard.Stats = Stats;

// 設定 displayName 以便於調試
DashboardCard.displayName = "DashboardCard";
Header.displayName = "DashboardCard.Header";
Stats.displayName = "DashboardCard.Stats";

export default DashboardCard;
