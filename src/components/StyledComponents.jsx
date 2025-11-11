// Styled Components using Emotion + MUI
// 日式高級餐廳風格組件庫

import { styled } from '@mui/material/styles';
import { Box, Paper, Button } from '@mui/material';
import { colors, borders, effects, spacing } from '../designTokens';

// ================== 容器組件 ==================

/**
 * 金色外框容器
 * 用於主要內容區域，提供金色邊框裝飾
 */
export const GoldBorderContainer = styled(Box)(({ theme }) => ({
  border: borders.style.outerGold,
  borderRadius: borders.radius.medium,
  padding: spacing.lg,
  backgroundColor: colors.background.primary,
  marginBottom: spacing.component,
}));

/**
 * 金色外框容器 - 粗邊框版本
 */
export const GoldBorderContainerThick = styled(Box)(({ theme }) => ({
  border: borders.style.outerGoldThick,
  borderRadius: borders.radius.large,
  padding: spacing.xl,
  backgroundColor: colors.background.primary,
  marginBottom: spacing.component,
}));

// ================== 卡片組件 ==================

/**
 * 米白色卡片
 * 用於內容區塊，提供淺色背景和淡灰色邊框
 */
export const CreamPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: colors.background.surface,
  border: borders.style.innerLight,
  borderRadius: borders.radius.small,
  padding: spacing.lg,
  color: colors.text.primary,
  boxShadow: effects.shadows.small,
  transition: effects.transitions.normal,

  '&:hover': {
    boxShadow: effects.shadows.medium,
  }
}));

/**
 * 米白色卡片 - 漸層背景版本
 */
export const CreamPaperGradient = styled(Paper)(({ theme }) => ({
  background: effects.gradients.creamSurface,
  border: borders.style.innerLight,
  borderRadius: borders.radius.small,
  padding: spacing.lg,
  color: colors.text.primary,
  boxShadow: effects.shadows.small,
  transition: effects.transitions.normal,

  '&:hover': {
    boxShadow: effects.shadows.medium,
  }
}));

/**
 * 金色左邊框卡片
 * 用於強調區塊，左側帶有金色邊框
 */
export const GoldLeftBorderPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: colors.background.surface,
  borderLeft: borders.style.leftGold,
  borderRadius: borders.radius.small,
  padding: spacing.lg,
  color: colors.text.primary,
  boxShadow: effects.shadows.small,
}));

/**
 * 深色卡片 - 用於特殊區域
 */
export const DarkPaper = styled(Paper)(({ theme }) => ({
  background: effects.gradients.darkBackground,
  border: borders.style.innerMedium,
  borderRadius: borders.radius.small,
  padding: spacing.lg,
  color: colors.text.inverse,
  boxShadow: effects.shadows.medium,
}));

// ================== 按鈕組件 ==================

/**
 * 切角按鈕
 * 使用 clip-path 創建特殊的切角效果
 */
export const CornerButton = styled(Button)(({ theme }) => ({
  backgroundColor: colors.background.surface,
  color: colors.text.primary,
  clipPath: effects.clipPath.corner,
  padding: `${spacing.md} ${spacing.xl}`,
  fontWeight: typography.fontWeight.semibold,
  textTransform: 'none',
  border: borders.style.innerLight,
  boxShadow: effects.shadows.small,
  transition: effects.transitions.normal,
  position: 'relative',

  '&:hover': {
    backgroundColor: colors.accent.gold,
    color: colors.text.inverse,
    boxShadow: effects.shadows.goldGlowHover,
    transform: 'translateY(-2px)',
  },

  '&::after': {
    content: '"→"',
    marginLeft: spacing.inline,
    fontWeight: typography.fontWeight.bold,
  }
}));

/**
 * 金色按鈕
 * 金色背景的主要行動按鈕
 */
export const GoldButton = styled(Button)(({ theme }) => ({
  background: effects.gradients.goldAccent,
  color: colors.text.inverse,
  padding: `${spacing.md} ${spacing.xl}`,
  fontWeight: typography.fontWeight.semibold,
  textTransform: 'none',
  borderRadius: borders.radius.small,
  boxShadow: effects.shadows.goldGlow,
  transition: effects.transitions.normal,

  '&:hover': {
    background: colors.accent.goldHover,
    boxShadow: effects.shadows.goldGlowHover,
    transform: 'scale(1.05)',
  }
}));

/**
 * 輪廓按鈕 - 金色邊框
 */
export const OutlineButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: colors.accent.gold,
  border: `${borders.width.regular} solid ${colors.accent.gold}`,
  padding: `${spacing.md} ${spacing.xl}`,
  fontWeight: typography.fontWeight.semibold,
  textTransform: 'none',
  borderRadius: borders.radius.small,
  transition: effects.transitions.normal,

  '&:hover': {
    backgroundColor: colors.accent.gold,
    color: colors.text.inverse,
    borderColor: colors.accent.goldHover,
  }
}));

// ================== 分隔線組件 ==================

/**
 * 金色分隔線
 */
export const GoldDivider = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '4px',
  backgroundColor: colors.accent.gold,
  margin: `${spacing.md} auto`,
  borderRadius: borders.radius.small,
}));

/**
 * 金色分隔線 - 左對齊
 */
export const GoldDividerLeft = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '4px',
  backgroundColor: colors.accent.gold,
  margin: `${spacing.md} 0`,
  borderRadius: borders.radius.small,
}));

// ================== 徽章/標籤組件 ==================

/**
 * 金色徽章
 */
export const GoldBadge = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: colors.accent.gold,
  color: colors.text.inverse,
  padding: `${spacing.xs} ${spacing.md}`,
  borderRadius: borders.radius.small,
  fontWeight: typography.fontWeight.semibold,
  fontSize: typography.fontSize.sm,
}));

// 補充 typography import
import { typography } from '../designTokens';

export default {
  GoldBorderContainer,
  GoldBorderContainerThick,
  CreamPaper,
  CreamPaperGradient,
  GoldLeftBorderPaper,
  DarkPaper,
  CornerButton,
  GoldButton,
  OutlineButton,
  GoldDivider,
  GoldDividerLeft,
  GoldBadge,
};
