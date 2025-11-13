import React from 'react'
import { Typography, Divider } from '@mui/material'
import { colors } from '../../../../designTokens'
import { sectionTitleStyle } from '../../styles/sectionStyles'

//! =============== 1. Setup & Constants ===============

//! =============== 2. Component Definition ===============

/**
 * @component SectionTitle
 * @description 區段標題組件，統一標題 + 分隔線組合樣式
 *
 * @param {string} title - 標題文字
 * @param {string} [variant='h5'] - Typography 變體
 * @param {boolean} [showDivider=true] - 是否顯示分隔線
 * @param {Object} [dividerSx] - 分隔線額外樣式
 * @param {Object} [titleSx] - 標題額外樣式
 *
 * @example
 * <SectionTitle title="前言" />
 * <SectionTitle title="什麼是設計系統" showDivider={false} />
 */
const SectionTitle = ({
  title,
  variant = 'h5',
  showDivider = true,
  dividerSx = {},
  titleSx = {}
}) => {
  return (
    <>
      <Typography
        variant={variant}
        gutterBottom
        sx={{ ...sectionTitleStyle, ...titleSx }}
      >
        {title}
      </Typography>
      {showDivider && (
        <Divider
          sx={{ my: 2, borderColor: colors.border.light, ...dividerSx }}
        />
      )}
    </>
  )
}

export default SectionTitle
