import { styled } from '@mui/material/styles'
import { CreamPaper, GoldBorderContainer } from '../../../components/StyledComponents'
import { effects } from '../../../designTokens'

//! =============== 1. 可重用樣式組件 ===============

/**
 * 帶有切角效果的 CreamPaper 容器
 * 💡 DRY 原則：消除重複的 clipPath 程式碼
 *
 * @param {('xsmall'|'small'|'medium'|'large')} clipSize - 切角尺寸
 */
export const ClippedCreamPaper = styled(CreamPaper, {
  shouldForwardProp: (prop) => prop !== 'clipSize'
})(({ clipSize = 'medium' }) => {
  const clipPathMap = {
    xsmall: effects.clipPath.cornerXSmall,
    small: effects.clipPath.cornerSmall,
    medium: effects.clipPath.corner,
    mediumLarge: effects.clipPath.cornerMedium,
    large: effects.clipPath.cornerLarge
  }

  return {
    clipPath: clipPathMap[clipSize] || clipPathMap.medium
  }
})

/**
 * 帶有切角效果的 GoldBorderContainer 容器
 * 💡 DRY 原則：消除重複的 clipPath 程式碼
 *
 * @param {('xsmall'|'small'|'medium'|'large')} clipSize - 切角尺寸
 */
export const ClippedGoldContainer = styled(GoldBorderContainer, {
  shouldForwardProp: (prop) => prop !== 'clipSize'
})(({ clipSize = 'medium' }) => {
  const clipPathMap = {
    xsmall: effects.clipPath.cornerXSmall,
    small: effects.clipPath.cornerSmall,
    medium: effects.clipPath.corner,
    mediumLarge: effects.clipPath.cornerMedium,
    large: effects.clipPath.cornerLarge
  }

  return {
    clipPath: clipPathMap[clipSize] || clipPathMap.medium
  }
})
