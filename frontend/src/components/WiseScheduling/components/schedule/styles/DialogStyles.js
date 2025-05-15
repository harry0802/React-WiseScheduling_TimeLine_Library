/**
 * @file DialogStyles.js
 * @description 工廠管理系統的對話框樣式組件 - 優化版
 * @version 2.0.0
 */

import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { industrialTheme } from "./industrialTheme";

// 工業風格的對話框 - 增加邊框和簡化陰影
export const IndustrialDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "6px", // 增大圓角
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)", // 簡化陰影
    border: `2px solid ${industrialTheme.colors.border.medium}`, // 添加邊框
    overflow: "hidden",
    maxWidth: "900px",
    width: "90%",
  },
}));

// 對話框標題 - 增加字體大小和內間距
export const DialogHeader = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: industrialTheme.colors.primary.main,
  color: industrialTheme.colors.primary.contrast,
  padding: `16px 24px`, // 使用固定數值增加可讀性
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "18px", // 增加字體大小
  fontWeight: 600, // 增加字體粗細
  "& .MuiIconButton-root": {
    color: "inherit",
    padding: "8px", // 增加按鈕點擊區域
    marginLeft: "8px", // 增加按鈕間距
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)", // 增加懸停對比度
    },
  },
}));

// 狀態指示器 - 增加尺寸和可見性
export const StatusChip = styled(Chip)(({ color }) => ({
  backgroundColor: color || industrialTheme.colors.status.idle,
  color: "#FFFFFF", // 固定白色以增加對比度
  fontWeight: 600, // 加粗
  height: "32px", // 增加高度
  fontSize: "14px", // 增加字體大小
  marginLeft: "16px",
  "& .MuiChip-label": {
    padding: "0 12px", // 增加內間距
  },
  "& .MuiChip-icon": {
    fontSize: "18px", // 增加圖標大小
    marginRight: "6px", // 增加圖標右間距
  },
}));

// 對話框內容 - 增加內間距和改進背景色
export const DialogBody = styled(DialogContent)(({ theme }) => ({
  padding: "24px", // 增加內間距
  backgroundColor: "#FFFFFF", // 使用純白色以增加對比度
}));

// 對話框操作按鈕 - 增加內間距和改進邊框
export const DialogFooter = styled(DialogActions)(({ theme }) => ({
  padding: "16px 24px", // 增加內間距
  borderTop: `2px solid #E0E0E0`, // 使用更明顯的分隔線
  backgroundColor: "#F5F5F5", // 使用淺灰色背景
}));

// 主要按鈕 - 增加尺寸和對比度
export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1976D2", // 使用標準藍色
  color: "#FFFFFF", // 白色文字
  padding: "10px 24px", // 增加內間距
  fontSize: "16px", // 增加字體大小
  fontWeight: 500, // 調整字體粗細
  height: "48px", // 固定高度
  boxShadow: "none", // 移除陰影
  "&:hover": {
    backgroundColor: "#1565C0", // 懸停時變暗
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)", // 懸停時添加簡單陰影
  },
}));

// 次要按鈕 - 增加尺寸和邊框可見性
export const SecondaryButton = styled(Button)(({ theme }) => ({
  color: "#424242", // 深灰色文字以增加對比度
  padding: "10px 24px", // 增加內間距
  fontSize: "16px", // 增加字體大小
  height: "48px", // 固定高度
  border: "2px solid #9E9E9E", // 增加邊框粗細和對比度
  "&:hover": {
    backgroundColor: "#EEEEEE", // 懸停時使用淺灰色背景
    borderColor: "#757575", // 懸停時邊框變深
  },
}));

// 刪除按鈕 - 增加警示性和可見性
export const DeleteButton = styled(Button)(({ theme }) => ({
  color: "#F44336", // 紅色文字
  padding: "10px 24px", // 增加內間距
  fontSize: "16px", // 增加字體大小
  height: "48px", // 固定高度
  border: "2px solid #F44336", // 增加邊框粗細
  "&:hover": {
    backgroundColor: "rgba(244, 67, 54, 0.1)", // 懸停時使用淺紅色背景
    borderColor: "#D32F2F", // 懸停時邊框變深
  },
}));

// 分段標題 - 增加可見性和區分度
export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px", // 增加字體大小
  fontWeight: 600, // 加粗
  color: "#1E3A5F", // 使用深藍色
  marginBottom: "16px", // 增加下間距
  paddingBottom: "8px", // 增加內間距
  borderBottom: `2px solid #1E3A5F`, // 使用更明顯的下邊框
}));

// 表單區塊 - 增加邊框和間距
export const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: "32px", // 增加下間距
  padding: "20px", // 增加內間距
  backgroundColor: "#FFFFFF", // 白色背景
  borderRadius: "6px", // 增大圓角
  border: `2px solid #E0E0E0`, // 增加邊框可見性
}));

// 狀態切換頁籤 - 增加尺寸和可見性
export const StatusTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: "#F5F5F5", // 使用淺灰色背景
  borderBottom: `2px solid #E0E0E0`, // 使用更明顯的下邊框
  "& .MuiTab-root": {
    minHeight: "56px", // 增加高度
    fontSize: "16px", // 增加字體大小
    fontWeight: 500, // 調整字體粗細
    padding: "0 24px", // 增加內間距
  },
  "& .Mui-selected": {
    color: "#1976D2", // 選中項使用藍色
    fontWeight: 600, // 選中項加粗
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#1976D2", // 選中指示條使用藍色
    height: "4px", // 增加指示條高度
  },
}));

// 狀態頁籤 - 增加可見性
export const StatusTab = styled(Tab)(({ theme }) => ({
  textTransform: "none", // 保持原始文字大小寫
  fontSize: "16px", // 增加字體大小
  padding: "12px 24px", // 增加內間距
  "&.Mui-selected": {
    backgroundColor: "rgba(25, 118, 210, 0.08)", // 選中項使用淺藍色背景
  },
}));

// 資訊卡片 - 增加邊框和內間距
export const InfoCard = styled(Paper)(({ theme }) => ({
  padding: "20px", // 增加內間距
  backgroundColor: "#FFFFFF", // 白色背景
  borderRadius: "6px", // 增大圓角
  boxShadow: "none", // 移除陰影
  border: `2px solid #E0E0E0`, // 添加邊框
  margin: "16px 0", // 調整外間距
}));

// 資訊項目 - 增加間距
export const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: "12px", // 增加下間距
  "&:last-child": {
    marginBottom: 0,
  },
}));

// 資訊項目標籤 - 增加字體大小和對比度
export const InfoLabel = styled(Typography)(({ theme }) => ({
  width: "140px", // 增加寬度
  flexShrink: 0,
  color: "#616161", // 深灰色以增加對比度
  fontSize: "16px", // 增加字體大小
  fontWeight: 500, // 調整字體粗細
}));

// 資訊項目值 - 增加字體大小和對比度
export const InfoValue = styled(Typography)(({ theme }) => ({
  flex: 1,
  fontWeight: 500, // 調整字體粗細
  fontSize: "16px", // 增加字體大小
  color: "#212121", // 近黑色以增加對比度
}));

export default {
  IndustrialDialog,
  DialogHeader,
  StatusChip,
  DialogBody,
  DialogFooter,
  PrimaryButton,
  SecondaryButton,
  DeleteButton,
  SectionTitle,
  FormSection,
  StatusTabs,
  StatusTab,
  InfoCard,
  InfoItem,
  InfoLabel,
  InfoValue,
};