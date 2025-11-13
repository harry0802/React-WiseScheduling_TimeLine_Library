import React from 'react'
import { Link as MuiLink } from '@mui/material'
import { colors } from '../../../../designTokens'

//! =============== 1. Setup & Constants ===============

/**
 * @description 外部連結的預設樣式配置
 */
const defaultLinkStyle = {
  color: colors.accent.gold,
  fontWeight: 600,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}

//! =============== 2. Component Definition ===============

/**
 * @component ExternalLink
 * @description 外部連結組件，統一樣式和安全屬性
 *
 * @param {string} href - 連結 URL
 * @param {ReactNode} children - 連結文字
 * @param {Object} [sx] - 額外樣式
 *
 * @example
 * <ExternalLink href="https://example.com">
 *   → 查看文章
 * </ExternalLink>
 */
const ExternalLink = ({ href, children, sx = {} }) => {
  return (
    <MuiLink
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      sx={{ ...defaultLinkStyle, ...sx }}
    >
      {children}
    </MuiLink>
  )
}

export default ExternalLink
