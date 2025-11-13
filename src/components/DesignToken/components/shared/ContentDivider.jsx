import React from 'react'
import { Divider } from '@mui/material'

//! =============== 1. Setup & Constants ===============

/**
 * @description 內容分隔線的預設間距配置
 */
const defaultSpacing = { my: 3 }

//! =============== 2. Component Definition ===============

/**
 * @component ContentDivider
 * @description 統一間距的內容分隔線組件
 *
 * @param {Object} [sx] - 額外樣式配置
 *
 * @example
 * <ContentDivider />
 * <ContentDivider sx={{ my: 2 }} /> // 自定義間距
 */
const ContentDivider = ({ sx = {} }) => {
  return <Divider sx={{ ...defaultSpacing, ...sx }} />
}

export default ContentDivider
