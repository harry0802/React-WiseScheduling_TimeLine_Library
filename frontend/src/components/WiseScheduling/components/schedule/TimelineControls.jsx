/**
 * @file TimelineControls.jsx - 老人友善版
 * @description 專為工廠老人使用者優化的排程控制組件
 * @version 6.0.0 (Elderly-Friendly Redesign)
 * @author 資深前端開發團隊
 * @lastModified 2025-5-29
 */

import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置,便於統一管理

/**
 * @constant {Object} theme - 老人友善主題配置
 * @description 遵循 BBC 標準的 RGBA 百分比格式，專為視力較弱的老人使用者優化
 */
const theme = {
  colors: {
    primary: {
      main: "rgba(13% 39% 75% / 1)", // #1565c0
      light: "rgba(15% 46% 82% / 1)", // #1976d2
      dark: "rgba(5% 28% 63% / 1)", // #0d47a1
      contrast: "rgba(100% 100% 100% / 1)", // #ffffff
    },
    accent: {
      blue: "rgba(15% 46% 82% / 1)", // #1976d2
      red: "rgba(83% 18% 18% / 1)", // #d32f2f
      orange: "rgba(96% 49% 0% / 1)", // #f57c00
      green: "rgba(22% 56% 24% / 1)", // #388e3c
      grey: "rgba(46% 46% 46% / 1)", // #757575
    },
    background: {
      primary: "transparent",
      hover: "rgba(15% 46% 82% / 0.08)",
      active: "rgba(15% 46% 82% / 0.12)",
      panel: "rgba(15% 46% 82% / 0.04)",
    },
    text: {
      primary: "rgba(100% 100% 100% / 1)",
      secondary: "rgba(100% 100% 100% / 0.85)",
      disabled: "rgba(100% 100% 100% / 0.6)",
    },
    border: {
      default: "rgba(100% 100% 100% / 0.4)",
      active: "rgba(15% 46% 82% / 1)", // #1976d2
      hover: "rgba(15% 46% 82% / 0.8)",
    },
  },
  size: {
    height: "48px",
    fontSize: "18px",
    buttonFontSize: "20px",
    iconSize: "24px",
    padding: "0 20px",
    borderRadius: "8px",
    minWidth: "120px",
    gap: "16px",
  },
};

/**
 * @constant {Object} RESPONSIVE_BREAKPOINTS - 響應式斷點配置
 */
const RESPONSIVE_BREAKPOINTS = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1200px",
};

//! =============== 2. 類型與介面 ===============
//* 定義所有資料結構,幫助理解資料流向

/**
 * @context TimelineStyleContext
 * @description 提供主題配置的 React Context
 */
const TimelineStyleContext = createContext(theme);

/**
 * @hook useTimelineStyle
 * @description 取得當前主題配置的自定義 Hook
 * @returns {Object} 當前主題物件
 */
function useTimelineStyle() {
  return useContext(TimelineStyleContext);
}

//! =============== 3. 核心功能 ===============
//* 主要業務邏輯區,每個功能都配有詳細說明

// 📏 基礎布局組件區 - 遵循 BBC 標準與現代 CSS 架構

/**
 * @component Container
 * @description 主要容器組件，提供基礎布局結構
 */
const Container = styled.div`
  /* 布局定位 */
  display: flex;
  flex-direction: column;
  width: 100%;

  /* 盒模型 */
  margin-bottom: 20px;
  gap: ${(props) => props.theme.size.gap};
`;

/**
 * @component Row
 * @description 水平排列容器，支援響應式換行
 */
const Row = styled.div`
  /* 布局定位 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  /* 盒模型 */
  gap: ${(props) => props.theme.size.gap};

  /* 響應式 */
  @media (max-width: ${RESPONSIVE_BREAKPOINTS.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

/**
 * @component ButtonGroup
 * @description 按鈕群組容器
 */
const ButtonGroup = styled.div`
  /* 布局定位 */
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  /* 盒模型 */
  gap: 12px;
`;

// 🎨 基礎互動組件區

/**
 * @component BaseButton
 * @description 基礎按鈕樣式，遵循老人友善設計原則
 * @notes
 * - 最小點擊區域 48px，符合無障礙設計
 * - 高對比度配色方案
 * - 清晰的懸停回饋
 */
const BaseButton = styled.button`
  /* 布局定位 */
  display: flex;
  align-items: center;
  justify-content: center;

  /* 盒模型 */
  height: ${(props) => props.theme.size.height};
  min-width: ${(props) => props.theme.size.minWidth};
  padding: ${(props) => props.theme.size.padding};
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.border.default};
  border-radius: ${(props) => props.theme.size.borderRadius};
  box-sizing: border-box;
  gap: 8px;

  /* 視覺樣式 */
  background-color: ${(props) => props.theme.colors.background.primary};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: "Noto Sans TC", sans-serif;
  font-size: ${(props) => props.theme.size.buttonFontSize};
  font-weight: 600;
  line-height: 1.2;

  /* CSS3特效 */
  transition-property: all;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;

  /* 其他屬性 */
  cursor: pointer;

  &:hover {
    /* 布局定位 */
    transform: translateY(-2px);

    /* 視覺樣式 */
    background-color: ${(props) => props.theme.colors.background.hover};
    border-color: ${(props) => props.theme.colors.border.hover};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    /* 布局定位 */
    transform: translateY(0);

    /* 視覺樣式 */
    background-color: ${(props) => props.theme.colors.background.active};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    /* 布局定位 */
    transform: none;

    /* 視覺樣式 */
    opacity: 0.6;
    box-shadow: none;

    /* 其他屬性 */
    cursor: not-allowed;
  }

  svg {
    /* 盒模型 */
    font-size: ${(props) => props.theme.size.iconSize};
  }
`;

/**
 * @component Select
 * @description 自定義下拉選單組件
 */
const Select = styled.select`
  /* 布局定位 */
  appearance: none;

  /* 盒模型 */
  height: ${(props) => props.theme.size.height};
  padding-top: 0;
  padding-right: 40px;
  padding-bottom: 0;
  padding-left: 20px;
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.border.default};
  border-radius: ${(props) => props.theme.size.borderRadius};
  box-sizing: border-box;

  /* 視覺樣式 */
  background-color: ${(props) => props.theme.colors.background.primary};
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 20px;
  color: ${(props) => props.theme.colors.text.primary};
  font-family: "Noto Sans TC", sans-serif;
  font-size: ${(props) => props.theme.size.fontSize};
  font-weight: 500;

  /* CSS3特效 */
  transition-property: all;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;

  /* 其他屬性 */
  cursor: pointer;

  &:hover {
    /* 視覺樣式 */
    background-color: ${(props) => props.theme.colors.background.hover};
    border-color: ${(props) => props.theme.colors.border.hover};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    /* 視覺樣式 */
    background-color: ${(props) => props.theme.colors.background.hover};
    border-color: ${(props) => props.theme.colors.border.active};
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);

    /* 其他屬性 */
    outline: none;
  }

  option {
    /* 盒模型 */
    padding: 12px;

    /* 視覺樣式 */
    background-color: ${(props) => props.theme.colors.primary.main};
    color: ${(props) => props.theme.colors.text.primary};
    font-size: ${(props) => props.theme.size.fontSize};
  }
`;

/**
 * @component TimeInput
 * @description 時間輸入欄位組件
 */
const TimeInput = styled.input`
  /* 盒模型 */
  height: ${(props) => props.theme.size.height};
  padding-top: 0;
  padding-right: 20px;
  padding-bottom: 0;
  padding-left: 20px;
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.border.default};
  border-radius: ${(props) => props.theme.size.borderRadius};
  box-sizing: border-box;

  /* 視覺樣式 */
  background-color: ${(props) => props.theme.colors.background.primary};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: "Noto Sans TC", sans-serif;
  font-size: ${(props) => props.theme.size.fontSize};
  font-weight: 500;

  /* CSS3特效 */
  transition-property: all;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;

  &:hover {
    /* 視覺樣式 */
    background-color: ${(props) => props.theme.colors.background.hover};
    border-color: ${(props) => props.theme.colors.border.hover};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    /* 視覺樣式 */
    background-color: ${(props) => props.theme.colors.background.hover};
    border-color: ${(props) => props.theme.colors.border.active};
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);

    /* 其他屬性 */
    outline: none;
  }

  &::-webkit-calendar-picker-indicator {
    /* 盒模型 */
    width: 20px;
    height: 20px;

    /* CSS3特效 */
    filter: invert(1);
    opacity: 0.8;

    /* 其他屬性 */
    cursor: pointer;

    &:hover {
      /* CSS3特效 */
      opacity: 1;
    }
  }
`;

// 🎛️ MUI 整合組件區

//* ========= 複雜邏輯解釋 =========
// MUI Accordion 樣式覆蓋機制說明：
// 步驟 1: 使用 styled() 包裝 MUI 組件
// 步驟 2: 使用 withConfig 避免 DOM 屬性警告
// 步驟 3: 使用 !important 覆蓋 MUI 內建樣式
// 步驟 4: 透過 customTheme prop 傳遞主題資料
// 注意事項：MUI 組件的樣式權重很高，需要謹慎覆蓋

/**
 * @component StyledAccordion
 * @description 客製化的 MUI Accordion 組件
 * @notes 使用 withConfig 避免將 customTheme 傳遞到 DOM
 */
const StyledAccordion = styled(Accordion).withConfig({
  shouldForwardProp: (prop) => prop !== "customTheme",
})`
  /* 盒模型 */
  margin-top: 8px !important;
  margin-right: 0 !important;
  margin-bottom: 8px !important;
  margin-left: 0 !important;
  border-width: 2px !important;
  border-style: solid !important;
  border-color: ${(props) =>
    props.customTheme?.colors.border.default ||
    "rgba(255, 255, 255, 0.4)"} !important;
  border-radius: ${(props) =>
    props.customTheme?.size.borderRadius || "8px"} !important;
  box-shadow: none !important;

  /* 視覺樣式 */
  background: ${(props) =>
    props.customTheme?.colors.background.panel ||
    "rgba(25, 118, 210, 0.04)"} !important;

  &:before {
    /* 布局定位 */
    display: none;
  }

  &.Mui-expanded {
    /* 視覺樣式 */
    border-color: ${(props) =>
      props.customTheme?.colors.border.active || "#1976d2"} !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  }
`;

/**
 * @component StyledAccordionSummary
 * @description 客製化的 MUI AccordionSummary 組件
 */
const StyledAccordionSummary = styled(AccordionSummary).withConfig({
  shouldForwardProp: (prop) => prop !== "customTheme",
})`
  .MuiAccordionSummary-content {
    /* 盒模型 */
    margin-top: 16px !important;
    margin-right: 0 !important;
    margin-bottom: 16px !important;
    margin-left: 0 !important;

    /* 布局定位 */
    align-items: center;
  }

  .MuiAccordionSummary-expandIconWrapper {
    /* 視覺樣式 */
    color: ${(props) =>
      props.customTheme?.colors.text.primary || "#ffffff"} !important;

    svg {
      /* 視覺樣式 */
      font-size: 28px !important;
    }
  }

  &:hover {
    /* 視覺樣式 */
    background-color: ${(props) =>
      props.customTheme?.colors.background.hover ||
      "rgba(25, 118, 210, 0.08)"} !important;
  }
`;

/**
 * @component StyledAccordionDetails
 * @description 客製化的 MUI AccordionDetails 組件
 */
const StyledAccordionDetails = styled(AccordionDetails).withConfig({
  shouldForwardProp: (prop) => prop !== "customTheme",
})`
  /* 盒模型 */
  padding: 20px !important;
`;

// 🎯 控制反轉按鈕組件

/**
 * @component StyledButton
 * @description 支援動態樣式的按鈕組件
 * @notes 允許使用者完全控制按鈕的視覺樣式
 */
const StyledButton = styled(BaseButton)`
  /* 視覺樣式 */
  background-color: ${(props) =>
    props.backgroundColor || props.theme.colors.background.primary};
  border-color: ${(props) =>
    props.borderColor || props.theme.colors.border.default};

  &:hover {
    /* 視覺樣式 */
    background-color: ${(props) =>
      props.hoverBackgroundColor || props.theme.colors.background.hover};
    box-shadow: ${(props) =>
      props.hoverBoxShadow || "0 4px 8px rgba(0, 0, 0, 0.2)"};

    /* CSS3特效 */
    opacity: ${(props) => props.hoverOpacity || 1};
  }
`;

// 🚀 主要組件定義區

/**
 * @function TimelineControls
 * @description 主要的時間軸控制組件，提供 Context Provider 功能
 * @param {Object} props - 組件屬性
 * @param {React.ReactNode} props.children - 子組件
 * @param {Object} props.customTheme - 自定義主題配置
 * @returns {React.Component} TimelineControls 組件
 *
 * @example
 * // 基本使用
 * <TimelineControls>
 *   <TimelineControls.Row>
 *     <TimelineControls.Button>按鈕</TimelineControls.Button>
 *   </TimelineControls.Row>
 * </TimelineControls>
 *
 * @example
 * // 自定義主題
 * <TimelineControls customTheme={{colors: {primary: {main: 'red'}}}}>
 *   {children}
 * </TimelineControls>
 */
function TimelineControls({ children, customTheme }) {
  const mergedTheme = customTheme ? { ...theme, ...customTheme } : theme;

  return (
    <TimelineStyleContext.Provider value={mergedTheme}>
      <Container theme={mergedTheme}>{children}</Container>
    </TimelineStyleContext.Provider>
  );
}

// 🔧 子組件定義區

/**
 * @function TimelineControls.Row
 * @description 水平布局行組件
 */
TimelineControls.Row = function TimelineControlsRow({ children, ...props }) {
  const theme = useTimelineStyle();
  return (
    <Row theme={theme} {...props}>
      {children}
    </Row>
  );
};

/**
 * @function TimelineControls.ButtonGroup
 * @description 按鈕群組組件
 */
TimelineControls.ButtonGroup = function TimelineControlsButtonGroup({
  children,
  ...props
}) {
  const theme = useTimelineStyle();
  return (
    <ButtonGroup theme={theme} {...props}>
      {children}
    </ButtonGroup>
  );
};

/**
 * @function TimelineControls.Button
 * @description 基礎按鈕組件，支援完全的樣式控制反轉
 * @param {string} variant - 按鈕變體 ('default'|'primary'|'success'|'warning'|'danger')
 * @param {boolean} active - 是否為激活狀態
 * @param {Object} styleOverrides - 樣式覆蓋物件
 * @param {Function} getStyles - 自定義樣式計算函數
 *
 * @example
 * // 基本使用
 * <TimelineControls.Button variant="primary">
 *   按鈕文字
 * </TimelineControls.Button>
 *
 * @example
 * // 自定義樣式
 * <TimelineControls.Button
 *   styleOverrides={{backgroundColor: 'red'}}
 *   getStyles={(theme, variant, active) => ({...})}
 * >
 *   自定義按鈕
 * </TimelineControls.Button>
 */
TimelineControls.Button = function TimelineControlsButton({
  variant = "default",
  active = false,
  children,
  onClick,
  styleOverrides = {},
  getStyles,
  ...props
}) {
  const theme = useTimelineStyle();

  // 使用者可以提供完全自定義的樣式邏輯
  const computedStyles = getStyles
    ? getStyles(theme, variant, active)
    : getButtonStyles(theme, variant, active);

  // 使用者可以覆蓋任何樣式
  const finalStyles = { ...computedStyles, ...styleOverrides };

  return (
    <StyledButton theme={theme} onClick={onClick} {...finalStyles} {...props}>
      {children}
    </StyledButton>
  );
};

/**
 * @function TimelineControls.TimeRangeButton
 * @description 時間範圍選擇按鈕
 */
TimelineControls.TimeRangeButton = function TimelineControlsTimeRangeButton({
  value,
  currentValue,
  onChange,
  children,
  icon: Icon = CalendarMonthIcon,
}) {
  return (
    <TimelineControls.Button
      active={value === currentValue}
      onClick={() => onChange?.(value)}
    >
      <Icon />
      {children}
    </TimelineControls.Button>
  );
};

/**
 * @function TimelineControls.Select
 * @description 通用下拉選單組件
 */
TimelineControls.Select = function TimelineControlsSelect({
  value,
  onChange,
  children,
  placeholder,
  ...props
}) {
  const theme = useTimelineStyle();

  return (
    <Select
      theme={theme}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children}
    </Select>
  );
};

/**
 * @function TimelineControls.AreaSelect
 * @description 區域選擇器組件
 * @param {Function} renderOption - 自定義選項渲染函數
 */
TimelineControls.AreaSelect = function TimelineControlsAreaSelect({
  value,
  onChange,
  options = [],
  placeholder = "選擇區域",
  renderOption,
}) {
  return (
    <TimelineControls.Select
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    >
      {options.map((option, index) => {
        // 如果使用者提供了自定義渲染函數，使用它
        if (renderOption) {
          return renderOption(option, index);
        }

        // 預設渲染邏輯
        const optionValue = typeof option === "string" ? option : option.value;
        const optionLabel = typeof option === "string" ? option : option.label;

        return (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        );
      })}
    </TimelineControls.Select>
  );
};

/**
 * @function TimelineControls.AddButton
 * @description 新增按鈕組件
 */
TimelineControls.AddButton = function TimelineControlsAddButton({
  onClick,
  children = "新增狀態",
  icon: Icon = AddIcon,
}) {
  return (
    <TimelineControls.Button variant="primary" onClick={onClick}>
      <Icon />
      {children}
    </TimelineControls.Button>
  );
};

/**
 * @function TimelineControls.NowButton
 * @description 移至現在按鈕組件
 */
TimelineControls.NowButton = function TimelineControlsNowButton({
  onClick,
  children = "移至現在",
  icon: Icon = AccessTimeIcon,
}) {
  return (
    <TimelineControls.Button variant="success" onClick={onClick}>
      <Icon />
      {children}
    </TimelineControls.Button>
  );
};

/**
 * @function TimelineControls.TimeInput
 * @description 時間輸入組件
 * @param {string} label - 輸入欄位標籤
 * @param {string} value - 輸入值
 * @param {Function} onChange - 值變更回調函數
 * @param {string} type - 輸入類型，預設為 'datetime-local'
 *
 * @example
 * // 基本使用
 * <TimelineControls.TimeInput
 *   label="開始時間"
 *   value={startTime}
 *   onChange={setStartTime}
 * />
 */
TimelineControls.TimeInput = function TimelineControlsTimeInput({
  label,
  value,
  onChange,
  type = "datetime-local",
}) {
  const theme = useTimelineStyle();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {label && (
        <span
          style={{
            fontSize: theme.size.fontSize,
            minWidth: "60px", // 增加標籤寬度
            color: theme.colors.text.primary,
            fontFamily: "Noto Sans TC, sans-serif",
            fontWeight: 500,
          }}
        >
          {label}：
        </span>
      )}
      <TimeInput
        theme={theme}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

/**
 * @function TimelineControls.Panel
 * @description MUI 展開面板組件，支援控制反轉模式
 * @param {string} title - 面板標題
 * @param {boolean} expanded - 是否展開（受控模式）
 * @param {Function} onToggle - 展開狀態切換回調
 * @param {React.Component} icon - 標題圖示組件
 * @param {Function} renderHeader - 自定義標題渲染函數
 * @param {Function} renderContent - 自定義內容渲染函數
 *
 * @example
 * // 基本使用（非受控模式）
 * <TimelineControls.Panel title="設定面板">
 *   <div>面板內容</div>
 * </TimelineControls.Panel>
 *
 * @example
 * // 受控模式
 * <TimelineControls.Panel
 *   title="進階設定"
 *   expanded={isExpanded}
 *   onToggle={setIsExpanded}
 *   renderHeader={({title, Icon, theme}) => <CustomHeader />}
 * >
 *   {content}
 * </TimelineControls.Panel>
 *
 * @notes
 * - 支援受控和非受控兩種模式
 * - 提供完整的自定義渲染能力
 * - 遵循無障礙設計原則
 */
TimelineControls.Panel = function TimelineControlsPanel({
  title,
  expanded = false,
  onToggle,
  icon: Icon = DateRangeIcon,
  children,
  info,
  renderHeader,
  renderContent,
}) {
  const theme = useTimelineStyle();

  const handleToggle = (event, isExpanded) => {
    onToggle?.(isExpanded);
  };

  // 內部狀態管理（非受控模式）
  const [internalExpanded, setInternalExpanded] = React.useState(expanded);
  const isControlled = onToggle !== undefined;
  const actualExpanded = isControlled ? expanded : internalExpanded;

  const actualOnChange = isControlled
    ? handleToggle
    : (event, isExpanded) => setInternalExpanded(isExpanded);

  return (
    <StyledAccordion
      customTheme={theme}
      expanded={actualExpanded}
      onChange={actualOnChange}
      disableGutters={false}
    >
      <StyledAccordionSummary
        customTheme={theme}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
      >
        {renderHeader ? (
          renderHeader({ title, info, Icon, theme, expanded: actualExpanded })
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Icon
              style={{
                fontSize: "28px",
                color: theme.colors.primary.light,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                color: theme.colors.text.primary,
                fontFamily: '"Noto Sans TC", sans-serif',
              }}
            >
              {title}
            </Typography>
            {info && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: "16px",
                  opacity: 0.8,
                  color: theme.colors.text.secondary,
                  fontFamily: '"Noto Sans TC", sans-serif',
                }}
              >
                ({info})
              </Typography>
            )}
          </div>
        )}
      </StyledAccordionSummary>
      <StyledAccordionDetails customTheme={theme}>
        {renderContent ? (
          renderContent({ children, theme, expanded: actualExpanded })
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {children}
          </div>
        )}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

//! =============== 4. 工具函數 ===============
//* 通用功能區,可被多個模組復用

//* ========= 複雜邏輯解釋 =========
// 按鈕樣式策略計算邏輯說明：
// 步驟 1: 檢查是否為激活狀態，激活狀態優先使用 primary.light 樣式
// 步驟 2: 根據 variant 參數選擇對應的色彩主題
// 步驟 3: 返回包含背景色、邊框色、懸停效果的完整樣式物件
// 步驟 4: 支援使用者通過 styleOverrides 完全覆蓋任何樣式
// 注意事項：此函數採用純函數設計，便於測試和維護

/**
 * @function getButtonStyles
 * @description 計算按鈕樣式的策略函數
 * @param {Object} theme - 主題物件
 * @param {string} variant - 按鈕變體類型
 * @param {boolean} active - 是否為激活狀態
 * @returns {Object} 樣式物件
 *
 * @example
 * // 基本使用
 * const styles = getButtonStyles(theme, 'primary', false);
 *
 * @example
 * // 激活狀態
 * const activeStyles = getButtonStyles(theme, 'success', true);
 *
 * @commonErrors
 * - 未傳入有效的 theme 物件會導致樣式錯誤
 * - variant 參數不存在時會回退到預設樣式
 */
function getButtonStyles(theme, variant, active) {
  if (active) {
    return {
      backgroundColor: theme.colors.primary.light,
      borderColor: theme.colors.primary.light,
      hoverBackgroundColor: theme.colors.primary.light,
      hoverOpacity: 0.9,
    };
  }

  const variantStyles = {
    primary: {
      backgroundColor: theme.colors.accent.blue,
      borderColor: theme.colors.accent.blue,
      hoverBackgroundColor: theme.colors.accent.blue,
      hoverOpacity: 0.9,
    },
    success: {
      backgroundColor: theme.colors.accent.green,
      borderColor: theme.colors.accent.green,
      hoverBackgroundColor: theme.colors.accent.green,
      hoverOpacity: 0.9,
    },
    warning: {
      backgroundColor: theme.colors.accent.orange,
      borderColor: theme.colors.accent.orange,
      hoverBackgroundColor: theme.colors.accent.orange,
      hoverOpacity: 0.9,
    },
    danger: {
      backgroundColor: theme.colors.accent.red,
      borderColor: theme.colors.accent.red,
      hoverBackgroundColor: theme.colors.accent.red,
      hoverOpacity: 0.9,
    },
  };

  return variantStyles[variant] || {};
}

//! =============== 示例區塊 ===============
/**
 * @example 完整使用範例
 *
 * // 場景 1: 基本時間軸控制面板
 * function MyTimelinePanel() {
 *   const [selectedArea, setSelectedArea] = useState('');
 *   const [timeRange, setTimeRange] = useState('today');
 *
 *   return (
 *     <TimelineControls>
 *       <TimelineControls.Row>
 *         <TimelineControls.ButtonGroup>
 *           <TimelineControls.TimeRangeButton
 *             value="today"
 *             currentValue={timeRange}
 *             onChange={setTimeRange}
 *           >
 *             今天
 *           </TimelineControls.TimeRangeButton>
 *           <TimelineControls.TimeRangeButton
 *             value="week"
 *             currentValue={timeRange}
 *             onChange={setTimeRange}
 *           >
 *             本週
 *           </TimelineControls.TimeRangeButton>
 *         </TimelineControls.ButtonGroup>
 *
 *         <TimelineControls.ButtonGroup>
 *           <TimelineControls.AreaSelect
 *             value={selectedArea}
 *             onChange={setSelectedArea}
 *             options={['區域A', '區域B', '區域C']}
 *           />
 *           <TimelineControls.AddButton onClick={() => console.log('新增')} />
 *         </TimelineControls.ButtonGroup>
 *       </TimelineControls.Row>
 *     </TimelineControls>
 *   );
 * }
 *
 * // 場景 2: 進階自定義樣式
 * function CustomStyledPanel() {
 *   const customTheme = {
 *     colors: {
 *       primary: { main: 'rgba(255, 0, 0, 1)' }
 *     }
 *   };
 *
 *   return (
 *     <TimelineControls customTheme={customTheme}>
 *       <TimelineControls.Button
 *         getStyles={(theme, variant, active) => ({
 *           backgroundColor: active ? 'gold' : 'silver',
 *           borderColor: 'black'
 *         })}
 *       >
 *         自定義按鈕
 *       </TimelineControls.Button>
 *     </TimelineControls>
 *   );
 * }
 *
 * // 場景 3: 展開面板與時間輸入
 * function AdvancedTimePanel() {
 *   const [startTime, setStartTime] = useState('');
 *   const [endTime, setEndTime] = useState('');
 *
 *   return (
 *     <TimelineControls>
 *       <TimelineControls.Panel title="時間設定" info="選擇時間範圍">
 *         <TimelineControls.TimeInput
 *           label="開始"
 *           value={startTime}
 *           onChange={setStartTime}
 *         />
 *         <TimelineControls.TimeInput
 *           label="結束"
 *           value={endTime}
 *           onChange={setEndTime}
 *         />
 *       </TimelineControls.Panel>
 *     </TimelineControls>
 *   );
 * }
 */

export default TimelineControls;
