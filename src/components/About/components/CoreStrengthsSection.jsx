import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@mui/material'
import { ClippedCreamPaper } from '../styles/ClippedContainer'
import { colors } from '../../../designTokens'

//! =============== 1. 類型定義 ===============

/**
 * @typedef {object} CoreStrength
 * @property {string} title - 優勢標題
 * @property {string} description - 優勢描述
 */

/**
 * @typedef {object} CoreStrengthsSectionProps
 * @property {CoreStrength[]} strengths - 核心優勢列表
 */

//! =============== 2. 主要組件 ===============

/**
 * 核心優勢區塊組件
 *
 * @param {CoreStrengthsSectionProps} props
 */
const CoreStrengthsSection = ({ strengths }) => {
  return (
    <ClippedCreamPaper elevation={2} clipSize="medium">
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: colors.accent.gold,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <span style={{ fontSize: '1.75rem' }}>🎯</span>
        核心優勢
      </Typography>

      <List>
        {strengths.map((strength, index) => (
          <ListItem key={index} sx={{ py: 1 }}>
            <ListItemText
              primary={<strong style={{ color: colors.accent.gold }}>{strength.title}：</strong>}
              secondary={strength.description}
              primaryTypographyProps={{ variant: 'body1' }}
              secondaryTypographyProps={{
                variant: 'body2',
                sx: { display: 'inline', color: colors.text.primary }
              }}
              sx={{ m: 0 }}
            />
          </ListItem>
        ))}
      </List>
    </ClippedCreamPaper>
  )
}

CoreStrengthsSection.displayName = 'CoreStrengthsSection'

export default CoreStrengthsSection
