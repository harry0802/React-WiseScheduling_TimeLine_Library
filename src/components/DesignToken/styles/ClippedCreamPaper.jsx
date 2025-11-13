import React from 'react'
import { CreamPaper } from '../../StyledComponents'

//! =============== 1. 類型定義 ===============

/**
 * @typedef {object} ClippedCreamPaperProps
 * @property {'small'|'medium'|'large'} [size='medium'] - 切角尺寸
 * @property {React.ReactNode} children - 子元素
 */

//! =============== 2. 主要組件 ===============

/**
 * 帶有切角效果的 CreamPaper 容器
 * 💡 DRY 原則：消除 DesignToken 頁面中 7 處重複的 clipPath 程式碼
 *
 * @param {ClippedCreamPaperProps} props
 */
const ClippedCreamPaper = ({ children, size = 'medium', ...props }) => {
  const clipPaths = {
    small:
      'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)',
    medium:
      'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)',
    large:
      'polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)'
  }

  return (
    <CreamPaper
      elevation={2}
      sx={{
        mb: 3,
        clipPath: clipPaths[size],
        ...props.sx
      }}
      {...props}
    >
      {children}
    </CreamPaper>
  )
}

ClippedCreamPaper.displayName = 'ClippedCreamPaper'

export default ClippedCreamPaper

