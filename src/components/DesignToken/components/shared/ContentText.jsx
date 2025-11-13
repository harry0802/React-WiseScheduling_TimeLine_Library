import React from 'react'
import { Typography } from '@mui/material'
import { colors } from '../../../../designTokens'

//! =============== 1. Setup & Constants ===============

/**
 * @description 內容文字的預設顏色配置
 */
const defaultTextColor = colors.text.primary

//! =============== 2. Component Definition ===============

/**
 * @component ContentText
 * @description 統一樣式的內容文字組件，自動應用主要文字顏色
 *
 * @param {string} [variant='body1'] - Typography 變體
 * @param {boolean} [paragraph=false] - 是否為段落
 * @param {Object} [sx] - 額外樣式
 * @param {ReactNode} children - 子元素內容
 * @param {Object} [props] - 其他 Typography props
 *
 * @example
 * <ContentText variant="body1" paragraph>
 *   這是內容文字
 * </ContentText>
 */
const ContentText = ({
  variant = 'body1',
  paragraph = false,
  sx = {},
  children,
  ...props
}) => {
  return (
    <Typography
      variant={variant}
      paragraph={paragraph}
      sx={{ color: defaultTextColor, ...sx }}
      {...props}
    >
      {children}
    </Typography>
  )
}

export default ContentText
