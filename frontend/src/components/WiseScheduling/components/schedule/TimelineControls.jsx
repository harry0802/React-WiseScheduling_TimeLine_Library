import React, { useState } from "react";
import styled from "styled-components";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TIME_RANGES } from "../../configs/validations/schedule/timeline/timelineConfigs";
import { MACHINE_CONFIG } from "../../configs/validations/schedule/constants";

/**
 * 工廠系統風格的配色方案
 */
const theme = {
  colors: {
    // 主色系 - 深藍色系
    primary: {
      main: "#1B2A47", // 深藍主色
      light: "#2E3E5C", // 亮深藍
      dark: "#0F172A", // 暗深藍
      contrast: "#FFFFFF", // 文字對比色
    },
    // 強調色 - 高對比醒目色系
    accent: {
      blue: "#007AFF", // 亮藍色 - 主操作按鈕
      red: "#FF3B30", // 警告紅 - 錯誤/警告按鈕
      orange: "#FF9500", // 橙色 - 待處理/警示
      green: "#34C759", // 綠色 - 成功/確認
      yellow: "#FFCC00", // 黃色 - 注意/提醒
    },
    // 背景色
    background: {
      primary: "transparent", // 主背景
      hover: "rgba(255, 255, 255, 0.1)", // 懸停背景
      active: "rgba(255, 255, 255, 0.2)", // 激活背景
    },
    // 文字色
    text: {
      primary: "#FFFFFF", // 主要文字
      secondary: "rgba(255, 255, 255, 0.8)", // 次要文字
      disabled: "rgba(255, 255, 255, 0.5)", // 禁用文字
    },
    // 邊框色
    border: {
      default: "rgba(255, 255, 255, 0.7)", // 默認邊框
      active: "#FFFFFF", // 激活邊框
    },
  },
};

// 統一尺寸設定
const SIZE = {
  height: "36px",
  fontSize: "14px",
  iconSize: "20px",
  padding: "0 12px",
  borderRadius: "4px",
  minWidth: "90px",
};

// 控制容器
const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// 按鈕組容器
const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

// 基礎按鈕樣式
const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: ${SIZE.height};
  padding: ${SIZE.padding};
  border-radius: ${SIZE.borderRadius};
  font-size: ${SIZE.fontSize};
  min-width: ${SIZE.minWidth};
  background-color: ${theme.colors.background.primary};
  border: 1px solid ${theme.colors.border.default};
  color: ${theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 500;

  &:hover {
    background-color: ${theme.colors.background.hover};
    border-color: ${theme.colors.border.active};
  }

  &:active {
    background-color: ${theme.colors.background.active};
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: ${SIZE.iconSize};
  }
`;

// 時間範圍按鈕
const TimeRangeButton = styled(BaseButton)`
  background-color: ${(props) =>
    props.active ? theme.colors.accent.blue : theme.colors.background.primary};
  border-color: ${(props) =>
    props.active ? theme.colors.accent.blue : theme.colors.border.default};

  &:hover {
    background-color: ${(props) =>
      props.active ? theme.colors.accent.blue : theme.colors.background.hover};
    opacity: ${(props) => (props.active ? 0.9 : 1)};
  }
`;

// 新增按鈕
const AddButton = styled(BaseButton)`
  background-color: ${theme.colors.accent.blue};
  border-color: ${theme.colors.accent.blue};

  &:hover {
    opacity: 0.9;
    background-color: ${theme.colors.accent.blue};
    border-color: ${theme.colors.accent.blue};
  }
`;

// 現在按鈕
const NowButton = styled(BaseButton)`
  background-color: ${theme.colors.accent.green};
  border-color: ${theme.colors.accent.green};

  &:hover {
    opacity: 0.9;
    background-color: ${theme.colors.accent.green};
    border-color: ${theme.colors.accent.green};
  }
`;

// 選擇器容器
const SelectContainer = styled.div`
  position: relative;
  min-width: 100px;
  height: ${SIZE.height};
`;

// 區域選擇器
const Select = styled.select`
  appearance: none;
  width: 100%;
  height: ${SIZE.height};
  padding: 0 28px 0 12px;
  color: ${theme.colors.text.primary};
  background-color: ${theme.colors.background.primary};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${SIZE.borderRadius};
  font-size: ${SIZE.fontSize};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:hover {
    background-color: ${theme.colors.background.hover};
    border-color: ${theme.colors.border.active};
  }

  &:focus {
    border-color: ${theme.colors.border.active};
  }

  option {
    background-color: #1a2a42; // 深藍色下拉背景
    color: ${theme.colors.text.primary};
    padding: 8px;
  }
`;

// 選擇器箭頭
const SelectArrow = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid ${theme.colors.text.primary};
  pointer-events: none;
`;

/**
 * 時間線控制組件，提供時間範圍切換、地區選擇和基本操作按鈕
 */
const TimelineControls = ({
  timeRange,
  onTimeRangeChange,
  onAddItem,
  onMoveToNow,
  areaOptions,
  onAreaChange,
}) => {
  // 處理地區變更
  const handleAreaChange = (event) => {
    const area = event.target.value;
    onAreaChange(area);
  };

  return (
    <ControlsContainer>
      {/* 時間範圍選擇按鈕組 */}
      <ButtonGroup>
        {Object.entries(TIME_RANGES).map(([key, { label }]) => (
          <TimeRangeButton
            key={key}
            active={timeRange === key}
            onClick={() => onTimeRangeChange(key)}
          >
            <CalendarMonthIcon />
            {label}
          </TimeRangeButton>
        ))}
      </ButtonGroup>

      {/* 操作控制區 */}
      <ButtonGroup>
        {/* 地區選擇 */}
        <SelectContainer>
          <Select value={areaOptions} onChange={handleAreaChange}>
            <option value="" disabled>
              區域
            </option>
            {MACHINE_CONFIG.AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </Select>
          <SelectArrow />
        </SelectContainer>

        {/* 操作按鈕 */}
        <AddButton onClick={() => onAddItem(areaOptions || null)}>
          <AddIcon />
          新增
        </AddButton>
        <NowButton onClick={onMoveToNow}>
          <AccessTimeIcon />
          現在
        </NowButton>
      </ButtonGroup>
    </ControlsContainer>
  );
};

export default TimelineControls;
