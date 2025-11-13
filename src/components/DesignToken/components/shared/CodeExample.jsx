import React from 'react'
import { Typography } from '@mui/material'

//! =============== 1. Setup & Constants ===============

/**
 * @description 代碼範例的預設樣式配置
 */
const codeExampleStyle = {
  fontFamily: 'monospace',
  mb: 1
}

//! =============== 2. Component Definition ===============

/**
 * @component CodeExample
 * @description 代碼範例顯示組件，使用等寬字體
 *
 * @param {ReactNode} children - 代碼內容
 * @param {Object} [sx] - 額外樣式
 * @param {string} [variant='body2'] - Typography 變體
 * @param {string} [component='div'] - 渲染的 HTML 元素
 *
 * @example
 * <CodeExample>
 *   • Web (CSS): --color-brand-primary: #FF5733;
 * </CodeExample>
 */
const CodeExample = ({
  children,
  sx = {},
  variant = 'body2',
  component = 'div'
}) => {
  return (
    <Typography
      variant={variant}
      component={component}
      sx={{ ...codeExampleStyle, ...sx }}
    >
      {children}
    </Typography>
  )
}

export default CodeExample
