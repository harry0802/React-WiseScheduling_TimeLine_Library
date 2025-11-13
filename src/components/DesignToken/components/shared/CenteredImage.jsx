import React from 'react'
import { Box } from '@mui/material'

//! =============== 1. Setup & Constants ===============

/**
 * @description 居中圖片組件的預設樣式配置
 */
const containerStyle = {
  mt: 3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
  borderRadius: 2,
  boxShadow: 2
}

//! =============== 2. Component Definition ===============

/**
 * @component CenteredImage
 * @description 居中顯示的圖片組件，統一管理圖片展示樣式
 *
 * @param {string} src - 圖片來源路徑
 * @param {string} alt - 圖片替代文字
 * @param {Object} [containerSx] - 容器額外樣式
 * @param {Object} [imageSx] - 圖片額外樣式
 *
 * @example
 * <CenteredImage
 *   src={`${import.meta.env.BASE_URL}images/example.png`}
 *   alt="範例圖片"
 * />
 */
const CenteredImage = ({ src, alt, containerSx = {}, imageSx = {} }) => {
  return (
    <Box sx={{ ...containerStyle, ...containerSx }}>
      <Box
        component='img'
        src={src}
        alt={alt}
        sx={{ ...imageStyle, ...imageSx }}
      />
    </Box>
  )
}

export default CenteredImage
