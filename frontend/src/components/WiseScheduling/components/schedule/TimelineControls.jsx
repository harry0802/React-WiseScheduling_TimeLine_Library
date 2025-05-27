/**
 * @file TimelineControls.jsx - 老人友善版
 * @description 專為工廠老人使用者優化的排程控制組件
 * @version 6.0.0 (Elderly-Friendly Redesign)
 */

import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Typography 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";

// 🎨 老人友善主題 - 優化配色和尺寸
const theme = {
  colors: {
    primary: {
      main: "#1565c0",      // 調整為更深的藍色，提升對比度
      light: "#1976d2",     // 統一藍色系
      dark: "#0d47a1",      // 深藍色
      contrast: "#ffffff",
    },
    accent: {
      blue: "#1976d2",      // 與 primary 協調
      red: "#d32f2f",       // 稍微調暗，降低刺眼感
      orange: "#f57c00",    // 橙色調整
      green: "#388e3c",     // 綠色調整
      grey: "#757575",      // 灰色調整
    },
    background: {
      primary: "transparent",
      hover: "rgba(25, 118, 210, 0.08)",
      active: "rgba(25, 118, 210, 0.12)",
      panel: "rgba(25, 118, 210, 0.04)",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.85)",
      disabled: "rgba(255, 255, 255, 0.6)",
    },
    border: {
      default: "rgba(255, 255, 255, 0.4)", // 提升邊框對比
      active: "#1976d2",
      hover: "rgba(25, 118, 210, 0.8)",
    },
  },
  size: {
    height: "48px",        // 從 36px 增加到 48px
    fontSize: "18px",      // 從 14px 增加到 18px  
    buttonFontSize: "20px", // 按鈕文字更大
    iconSize: "24px",      // 從 18px 增加到 24px
    padding: "0 20px",     // 從 12px 增加到 20px
    borderRadius: "8px",   // 從 4px 增加到 8px
    minWidth: "120px",     // 從 80px 增加到 120px
    gap: "16px",           // 間距加大
  },
};

// 🧠 Context 創建 - 只提供主題
const TimelineStyleContext = createContext(theme);

function useTimelineStyle() {
  return useContext(TimelineStyleContext);
}

// 📏 基礎樣式組件 - 老人友善尺寸
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.size.gap};
  margin-bottom: 20px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: ${props => props.theme.size.gap};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px; // 增加按鈕間距
  flex-wrap: wrap;
  align-items: center;
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; // 圖標和文字間距加大
  height: ${props => props.theme.size.height};
  padding: ${props => props.theme.size.padding};
  border-radius: ${props => props.theme.size.borderRadius};
  font-size: ${props => props.theme.size.buttonFontSize}; // 使用更大的按鈕字體
  min-width: ${props => props.theme.size.minWidth};
  background-color: ${props => props.theme.colors.background.primary};
  border: 2px solid ${props => props.theme.colors.border.default}; // 邊框加粗
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.25s ease-in-out; // 稍微放慢動畫
  font-weight: 600; // 字重加粗
  font-family: "Noto Sans TC", sans-serif;
  line-height: 1.2;

  &:hover {
    background-color: ${props => props.theme.colors.background.hover};
    border-color: ${props => props.theme.colors.border.hover};
    transform: translateY(-2px); // 增加懸浮效果
    box-shadow: 0 4px 8px rgba(0,0,0,0.2); // 添加陰影
  }

  &:active {
    background-color: ${props => props.theme.colors.background.active};
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  svg {
    font-size: ${props => props.theme.size.iconSize};
  }
`;

const Select = styled.select`
  appearance: none;
  height: ${props => props.theme.size.height};
  padding: 0 40px 0 20px; // 增加內距
  color: ${props => props.theme.colors.text.primary};
  background-color: ${props => props.theme.colors.background.primary};
  border: 2px solid ${props => props.theme.colors.border.default};
  border-radius: ${props => props.theme.size.borderRadius};
  font-size: ${props => props.theme.size.fontSize};
  font-family: "Noto Sans TC", sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 20px; // 下拉箭頭加大

  &:hover {
    border-color: ${props => props.theme.colors.border.hover};
    background-color: ${props => props.theme.colors.background.hover};
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.border.active};
    background-color: ${props => props.theme.colors.background.hover};
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2); // 焦點指示加強
  }

  option {
    background-color: ${props => props.theme.colors.primary.main};
    color: ${props => props.theme.colors.text.primary};
    padding: 12px; // 選項內距加大
    font-size: ${props => props.theme.size.fontSize};
  }
`;

const TimeInput = styled.input`
  height: ${props => props.theme.size.height};
  padding: 0 20px;
  border: 2px solid ${props => props.theme.colors.border.default};
  border-radius: ${props => props.theme.size.borderRadius};
  background-color: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.size.fontSize};
  font-family: "Noto Sans TC", sans-serif;
  font-weight: 500;
  transition: all 0.25s ease-in-out;

  &:hover {
    border-color: ${props => props.theme.colors.border.hover};
    background-color: ${props => props.theme.colors.background.hover};
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.border.active};
    background-color: ${props => props.theme.colors.background.hover};
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
    opacity: 0.8;
    width: 20px; // 日期選擇器圖標加大
    height: 20px;

    &:hover {
      opacity: 1;
    }
  }
`;

// 🎛️ MUI Accordion 樣式化
const StyledAccordion = styled(Accordion).withConfig({
  shouldForwardProp: (prop) => prop !== 'customTheme'
})`
  background: ${props => props.customTheme?.colors.background.panel || 'rgba(25, 118, 210, 0.04)'} !important;
  border: 2px solid ${props => props.customTheme?.colors.border.default || 'rgba(255, 255, 255, 0.4)'} !important;
  border-radius: ${props => props.customTheme?.size.borderRadius || '8px'} !important;
  box-shadow: none !important;
  margin: 8px 0 !important;

  &:before {
    display: none;
  }

  &.Mui-expanded {
    border-color: ${props => props.customTheme?.colors.border.active || '#1976d2'} !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
  }
`;

const StyledAccordionSummary = styled(AccordionSummary).withConfig({
  shouldForwardProp: (prop) => prop !== 'customTheme'
})`
  .MuiAccordionSummary-content {
    margin: 16px 0 !important;
    align-items: center;
  }
  
  .MuiAccordionSummary-expandIconWrapper {
    color: ${props => props.customTheme?.colors.text.primary || '#ffffff'} !important;
    
    svg {
      font-size: 28px !important;
    }
  }
  
  &:hover {
    background-color: ${props => props.customTheme?.colors.background.hover || 'rgba(25, 118, 210, 0.08)'} !important;
  }
`;

const StyledAccordionDetails = styled(AccordionDetails).withConfig({
  shouldForwardProp: (prop) => prop !== 'customTheme'
})`
  padding: 20px !important;
`;

// 🚀 主要組件 - Context Provider
function TimelineControls({ children, customTheme }) {
  const mergedTheme = customTheme ? { ...theme, ...customTheme } : theme;
  
  return (
    <TimelineStyleContext.Provider value={mergedTheme}>
      <Container theme={mergedTheme}>
        {children}
      </Container>
    </TimelineStyleContext.Provider>
  );
}

// 🔧 子組件 - 使用者控制功能，Context 提供樣式

// 布局組件
TimelineControls.Row = function TimelineControlsRow({ children, ...props }) {
  const theme = useTimelineStyle();
  return <Row theme={theme} {...props}>{children}</Row>;
};

TimelineControls.ButtonGroup = function TimelineControlsButtonGroup({ children, ...props }) {
  const theme = useTimelineStyle();
  return <ButtonGroup theme={theme} {...props}>{children}</ButtonGroup>;
};

// 基礎按鈕 - 使用者控制所有邏輯
TimelineControls.Button = function TimelineControlsButton({ 
  variant = "default", 
  active = false,
  children, 
  onClick,
  ...props 
}) {
  const theme = useTimelineStyle();
  
  const StyledButton = styled(BaseButton)`
    ${variant === "primary" && `
      background-color: ${theme.colors.accent.blue};
      border-color: ${theme.colors.accent.blue};
      &:hover {
        background-color: ${theme.colors.accent.blue};
        opacity: 0.9;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
    `}
    ${variant === "success" && `
      background-color: ${theme.colors.accent.green};
      border-color: ${theme.colors.accent.green};
      &:hover {
        background-color: ${theme.colors.accent.green};
        opacity: 0.9;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
    `}
    ${variant === "warning" && `
      background-color: ${theme.colors.accent.orange};
      border-color: ${theme.colors.accent.orange};
      &:hover {
        background-color: ${theme.colors.accent.orange};
        opacity: 0.9;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
    `}
    ${variant === "danger" && `
      background-color: ${theme.colors.accent.red};
      border-color: ${theme.colors.accent.red};
      &:hover {
        background-color: ${theme.colors.accent.red};
        opacity: 0.9;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
    `}
    ${active && `
      background-color: ${theme.colors.primary.light};
      border-color: ${theme.colors.primary.light};
      &:hover {
        background-color: ${theme.colors.primary.light};
        opacity: 0.9;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
    `}
  `;
  
  return (
    <StyledButton theme={theme} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

// 時間範圍按鈕 - 使用者控制選項和邏輯
TimelineControls.TimeRangeButton = function TimelineControlsTimeRangeButton({ 
  value, 
  currentValue, 
  onChange, 
  children,
  icon: Icon = CalendarMonthIcon
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

// 區域選擇器 - 使用者控制選項和邏輯
TimelineControls.AreaSelect = function TimelineControlsAreaSelect({ 
  value, 
  onChange, 
  options = [],
  placeholder = "選擇區域"
}) {
  const theme = useTimelineStyle();
  
  return (
    <Select 
      theme={theme}
      value={value} 
      onChange={(e) => onChange?.(e.target.value)}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map(option => (
        <option 
          key={typeof option === 'string' ? option : option.value} 
          value={typeof option === 'string' ? option : option.value}
        >
          {typeof option === 'string' ? option : option.label}
        </option>
      ))}
    </Select>
  );
};

// 操作按鈕 - 使用者控制行為
TimelineControls.AddButton = function TimelineControlsAddButton({ onClick, children = "新增狀態", icon: Icon = AddIcon }) {
  return (
    <TimelineControls.Button variant="primary" onClick={onClick}>
      <Icon />
      {children}
    </TimelineControls.Button>
  );
};

TimelineControls.NowButton = function TimelineControlsNowButton({ onClick, children = "移至現在", icon: Icon = AccessTimeIcon }) {
  return (
    <TimelineControls.Button variant="success" onClick={onClick}>
      <Icon />
      {children}
    </TimelineControls.Button>
  );
};

// 時間輸入 - 使用者控制格式和邏輯
TimelineControls.TimeInput = function TimelineControlsTimeInput({ 
  label, 
  value, 
  onChange, 
  type = "datetime-local" 
}) {
  const theme = useTimelineStyle();
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {label && (
        <span style={{ 
          fontSize: theme.size.fontSize, 
          minWidth: '60px', // 增加標籤寬度
          color: theme.colors.text.primary,
          fontFamily: "Noto Sans TC, sans-serif",
          fontWeight: 500
        }}>
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

// 🎛️ MUI 展開面板 - 替代原本的 Panel
TimelineControls.Panel = function TimelineControlsPanel({ 
  title, 
  expanded = false, // 預設值
  onToggle, 
  icon: Icon = DateRangeIcon,
  children,
  info
}) {
  const theme = useTimelineStyle();
  
  const handleToggle = (event, isExpanded) => {
    console.log('Panel toggle:', { title, isExpanded, currentExpanded: expanded }); // Debug log
    // 確保回調正確執行
    if (onToggle) {
      onToggle(isExpanded);
    }
  };
  
  // 如果沒有 onToggle，使用內部狀態
  const [internalExpanded, setInternalExpanded] = React.useState(expanded);
  
  const isControlled = onToggle !== undefined;
  const actualExpanded = isControlled ? expanded : internalExpanded;
  
  const actualOnChange = isControlled ? handleToggle : (event, isExpanded) => {
    console.log('Internal toggle:', isExpanded);
    setInternalExpanded(isExpanded);
  };
  
  return (
    <StyledAccordion 
      customTheme={theme}
      expanded={actualExpanded}
      onChange={actualOnChange}
      // 強制 MUI 不使用自己的狀態
      disableGutters={false}
    >
      <StyledAccordionSummary 
        customTheme={theme}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icon style={{ 
            fontSize: '28px', // 圖標加大
            color: theme.colors.primary.light 
          }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '20px', // 標題字體加大
              fontWeight: 600,
              color: theme.colors.text.primary,
              fontFamily: '"Noto Sans TC", sans-serif'
            }}
          >
            {title}
          </Typography>
          {info && (
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '16px', // 資訊文字也加大
                opacity: 0.8,
                color: theme.colors.text.secondary,
                fontFamily: '"Noto Sans TC", sans-serif'
              }}
            >
              ({info})
            </Typography>
          )}
        </div>
      </StyledAccordionSummary>
      <StyledAccordionDetails customTheme={theme}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px' 
        }}>
          {children}
        </div>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default TimelineControls;