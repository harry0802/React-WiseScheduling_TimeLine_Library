import React from 'react'
import { Box, Typography } from '@mui/material'
import { colors } from '../../../../designTokens'
import { quoteBoxStyle } from '../../styles/sectionStyles'

//! =============== 1. Setup & Constants ===============

//! =============== 2. Component Definition ===============

/**
 * @component QuoteBox
 * @description 引用框組件，統一引用文字樣式和外觀
 *
 * @param {ReactNode} children - 引用內容
 * @param {string} [variant='body2'] - Typography 變體
 * @param {Object} [boxSx] - Box 額外樣式
 * @param {Object} [typographySx] - Typography 額外樣式
 *
 * @example
 * <QuoteBox>
 *   這是一段引用文字
 * </QuoteBox>
 *
 * @example
 * <QuoteBox variant="body1">
 *   較大的引用文字
 * </QuoteBox>
 */
const QuoteBox = ({
  children,
  variant = 'body2',
  boxSx = {},
  typographySx = {}
}) => {
  return (
    <Box sx={{ ...quoteBoxStyle, ...boxSx }}>
      <Typography
        variant={variant}
        sx={{ color: colors.text.primary, ...typographySx }}
      >
        {children}
      </Typography>
    </Box>
  )
}

export default QuoteBox
