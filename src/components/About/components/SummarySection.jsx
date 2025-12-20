import React from 'react'
import { Typography } from '@mui/material'
import { ClippedCreamPaper } from '../styles/ClippedContainer'
import { colors } from '../../../designTokens'

//! =============== 1. 類型定義 ===============

/**
 * @typedef {object} SummarySectionProps
 * @property {string[]} paragraphs - 摘要段落陣列
 * @property {string} title - 區塊標題
 */

//! =============== 2. 主要組件 ===============

/**
 * 摘要區塊組件
 *
 * @param {SummarySectionProps} props
 */
const SummarySection = ({ paragraphs, title }) => {
  return (
    <ClippedCreamPaper elevation={2} clipSize="medium" sx={{ mb: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: colors.accent.primary,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <span style={{ fontSize: '1.75rem' }}>💡</span>
        {title}
      </Typography>

      {paragraphs.map((paragraph, index) => (
        <Typography
          key={index}
          variant="body1"
          sx={{
            color: colors.text.primary,
            mb: index < paragraphs.length - 1 ? 2 : 0
          }}
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      ))}
    </ClippedCreamPaper>
  )
}

SummarySection.displayName = 'SummarySection'

export default SummarySection
