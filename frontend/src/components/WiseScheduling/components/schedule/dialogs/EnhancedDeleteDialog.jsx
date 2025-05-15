/**
 * @file EnhancedDeleteDialog.jsx
 * @description 增強的刪除確認對話框
 * @version 1.0.0
 */

import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';

// 導入樣式組件
import {
  IndustrialDialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  PrimaryButton,
  SecondaryButton,
} from '../styles/DialogStyles';
import { industrialTheme } from '../styles/industrialTheme';

/**
 * @component EnhancedDeleteDialog
 * @description 增強的刪除確認對話框
 */
const EnhancedDeleteDialog = ({
  open,
  title = "刪除確認",
  content = "確定要刪除這個項目嗎？",
  onConfirm,
  onCancel,
  confirmText = "刪除",
  cancelText = "取消",
}) => {
  return (
    <IndustrialDialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      aria-labelledby="delete-dialog-title"
    >
      {/* 對話框標題 */}
      <DialogHeader 
        id="delete-dialog-title"
        sx={{ backgroundColor: industrialTheme.colors.accent.red }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {title}
        </Box>
        <IconButton 
          aria-label="關閉" 
          onClick={onCancel}
          sx={{ color: industrialTheme.colors.text.contrast }}
        >
          <CloseIcon />
        </IconButton>
      </DialogHeader>

      {/* 對話框內容 */}
      <DialogBody>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: 'rgba(244, 67, 54, 0.08)',
            borderRadius: industrialTheme.size.borderRadius,
            padding: 2,
            marginBottom: 2
          }}
        >
          <WarningIcon 
            sx={{ 
              fontSize: 40, 
              color: industrialTheme.colors.accent.red,
              marginRight: 2
            }} 
          />
          <Typography variant="body1">
            {content}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="textSecondary">
          此操作不可撤銷，刪除後的數據無法復原。
        </Typography>
      </DialogBody>

      {/* 對話框操作按鈕 */}
      <DialogFooter>
        <SecondaryButton 
          onClick={onCancel}
          sx={{ mr: 1 }}
        >
          {cancelText}
        </SecondaryButton>
        <PrimaryButton
          onClick={onConfirm}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{ 
            backgroundColor: industrialTheme.colors.accent.red,
            '&:hover': {
              backgroundColor: industrialTheme.colors.accent.red,
              opacity: 0.9
            }
          }}
        >
          {confirmText}
        </PrimaryButton>
      </DialogFooter>
    </IndustrialDialog>
  );
};

export default EnhancedDeleteDialog;
