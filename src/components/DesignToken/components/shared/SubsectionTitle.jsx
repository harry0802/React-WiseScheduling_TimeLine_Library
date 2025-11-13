import React from 'react'
import { Typography } from '@mui/material'

//! =============== 1. Setup & Constants ===============

/**
 * @description 子標題的預設樣式配置
 */
const defaultSubsectionStyle = {
  fontWeight: 600
}

//! =============== 2. Component Definition ===============

/**
 * @component SubsectionTitle
 * @description 子標題組件，統一 h6 標題樣式
 *
 * @param {string} title - 子標題文字
 * @param {string} [variant='h6'] - Typography 變體
 * @param {number} [fontWeight=600] - 字體粗細
 * @param {Object} [sx] - 額外樣式
 *
 * @example
 * <SubsectionTitle title="1. 結構公式" />
 * <SubsectionTitle title="用法範例與說明" variant="h5" />
 */
const SubsectionTitle = ({
  title,
  variant = 'h6',
  fontWeight = 600,
  sx = {}
}) => {
  return (
    <Typography
      variant={variant}
      gutterBottom
      sx={{ ...defaultSubsectionStyle, fontWeight, ...sx }}
    >
      {title}
    </Typography>
  )
}

export default SubsectionTitle
