/**
 * @file CustomStatusChip.jsx
 * @description 自定義的狀態標籤組件，避免直接使用 MUI Chip 組件可能出現的主題問題 - 優化版
 * @version 2.0.0
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// 自定義標籤容器 - 增加視覺可見性
const ChipContainer = styled(Box)(({ bgColor }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  height: '32px', // 增加高度
  padding: '0 16px', // 增加水平內間距
  borderRadius: '16px',
  backgroundColor: bgColor || "#757575", // 使用具體的顏色值
  marginLeft: '16px',
  border: '1px solid rgba(255, 255, 255, 0.3)', // 添加邊框增加可見性
}));

// 標籤文字 - 增加文字大小和粗細
const ChipLabel = styled(Typography)({
  color: '#FFFFFF', // 使用純白色增加對比度
  fontSize: '0.85rem', // 增加字體大小
  fontWeight: 600, // 增加字體粗細
  lineHeight: 1.5,
  marginLeft: '4px',
  marginRight: '4px',
});

// 圖標容器 - 增加圖標大小
const IconContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FFFFFF', // 使用純白色增加對比度
  marginRight: '8px', // 增加右間距
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem', // 增加圖標大小
  },
});

/**
 * @component CustomStatusChip
 * @description 自定義的狀態標籤組件
 */
const CustomStatusChip = ({ label, color, icon }) => {
  return (
    <ChipContainer bgColor={color}>
      {icon && <IconContainer>{icon}</IconContainer>}
      <ChipLabel>{label}</ChipLabel>
    </ChipContainer>
  );
};

export default CustomStatusChip;