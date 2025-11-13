import React from 'react'
import { Typography, Box, Grid } from '@mui/material'
import ProfilePhoto from './ProfilePhoto'
import { GoldBorderContainer, CreamPaper, GoldDivider } from '../../../components/StyledComponents'
import { colors } from '../../../designTokens'

//! =============== 1. 類型定義 ===============

/**
 * @typedef {object} ProfileHeaderProps
 * @property {string} name - 姓名
 * @property {string} title - 職位
 * @property {string} photoSrc - 照片路徑
 * @property {string} [photoAlt] - 照片替代文字
 */

//! =============== 2. 主要組件 ===============

/**
 * 個人資料標題區塊
 * 💡 重構決策：照片左、文字右的響應式佈局
 *
 * 響應式斷點：
 * - xs (< 900px): 垂直堆疊，照片置中
 * - md (>= 900px): 水平佈局，照片左對齊
 *
 * @param {ProfileHeaderProps} props
 */
const ProfileHeader = ({
  name,
  title,
  photoSrc,
  photoAlt = `${name}的照片`
}) => {
  return (
    <GoldBorderContainer
      sx={{
        mb: 4,
        clipPath:
          'polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)'
      }}
    >
      <CreamPaper elevation={0}>
        <Grid container spacing={3} alignItems="center">
          {/* 左側：照片 */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}
          >
            <ProfilePhoto
              src={photoSrc}
              alt={photoAlt}
              size={160}
            />
          </Grid>

          {/* 右側：基本資訊 */}
          <Grid item xs={12} md={8}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700, color: colors.text.primary }}
              >
                {name}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: colors.text.secondary, fontWeight: 600, mb: 2 }}
              >
                {title}
              </Typography>
              <GoldDivider sx={{ mx: { xs: 'auto', md: 0 } }} />
            </Box>
          </Grid>
        </Grid>
      </CreamPaper>
    </GoldBorderContainer>
  )
}

ProfileHeader.displayName = 'ProfileHeader'

export default ProfileHeader
