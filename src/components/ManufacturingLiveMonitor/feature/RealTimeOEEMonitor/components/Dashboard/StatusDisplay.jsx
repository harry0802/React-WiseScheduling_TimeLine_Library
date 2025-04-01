// StatusDisplay.jsx
import "react";
import { DigitalFlop } from "@iimm/data-view-react";
import styled from "styled-components";
import "prop-types";

// 生產表單元件

// 狀態與顏色映射
const STATUS_COLORS = {
  NORMAL: "#80ff80", // 正常生產-綠色
  TESTING: "#80e5ff", // 試機狀態-藍色
  SWITCHING: "#ffdd00", // 轉換狀態-黃色
  PAUSED: "#cccccc", // 閒置狀態-灰色
  ABNORMAL: "#ff6666", // 異常狀態-紅色
};

// 狀態名稱映射
const STATUS_NAMES = {
  NORMAL: "正常生產",
  TESTING: "試機狀態",
  SWITCHING: "轉換狀態",
  PAUSED: "閒置狀態",
  ABNORMAL: "異常狀態",
};

const StatusPanelContainer = styled.div`
  && {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    /* margin: 0.5rem; */
  }
`;

const StatusTitle = styled.div`
  color: ${(props) => props.color};
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

/**
 * 生產狀態面板元件 - 使用 DataV DigitalFlop 實現翻牌效果
 */
function StatusDisplay({ status, count, hours }) {
  const color = STATUS_COLORS[status] || STATUS_COLORS.NORMAL;
  const statusName = STATUS_NAMES[status] || STATUS_NAMES.NORMAL;

  return (
    <>
      <StatusPanelContainer>
        <StatusTitle color={color}>{statusName}</StatusTitle>
        <div
          style={{
            display: "flex",
          }}
        >
          <DigitalFlop
            config={{
              number: [Number(count), Number(hours)],
              content: "{nt}台 {nt}時",
              style: {
                fontSize: 48,
                fill: color,
              },

              textAlign: "center",
              animationCurve: "easeOutCubic",
              animationFrame: 50,
            }}
            style={{ width: "300px", height: "48px" }}
          />
        </div>
      </StatusPanelContainer>
    </>
  );
}

export default StatusDisplay;
