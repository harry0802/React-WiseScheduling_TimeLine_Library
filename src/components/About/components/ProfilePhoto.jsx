import React, { useState } from 'react'
import { Box } from '@mui/material'
import { colors } from '../../../designTokens'

//! =============== 1. 類型定義 ===============

/**
 * @typedef {object} ProfilePhotoProps
 * @property {string} src - 圖片路徑
 * @property {string} alt - 圖片替代文字
 * @property {number} [size=160] - 圖片尺寸（寬高相同）
 */

//! =============== 2. 主要組件 ===============

/**
 * 個人照片組件
 * 💡 重構決策：使用 React state 管理圖片載入狀態，避免直接操作 DOM
 *
 * @param {ProfilePhotoProps} props
 */
const ProfilePhoto = ({ src, alt, size = 160 }) => {
  const [imageError, setImageError] = useState(false)
  const hasValidSrc = src && src.trim() !== ''

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `4px solid ${colors.accent.gold}`,
        overflow: 'hidden',
        boxShadow: 3,
        background: colors.background.secondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {hasValidSrc && !imageError ? (
        <Box
          component="img"
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
            color: colors.accent.gold
          }}
        >
          👤
        </Box>
      )}
    </Box>
  )
}

ProfilePhoto.displayName = 'ProfilePhoto'

export default ProfilePhoto
