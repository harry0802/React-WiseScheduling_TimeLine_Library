import React from 'react'
import { Typography, Box, Chip } from '@mui/material'
import { CreamPaper } from '../../../components/StyledComponents'
import { colors } from '../../../designTokens'

//! =============== 1. 類型定義 ===============

/**
 * @typedef {object} SkillCardProps
 * @property {string} title - 技能類別標題
 * @property {string[]} skills - 技能列表
 */

//! =============== 2. 主要組件 ===============

/**
 * 技能卡片組件
 * 💡 可重用組件：顯示單一技能類別
 *
 * @param {SkillCardProps} props
 */
const SkillCard = ({ title, skills }) => {
  return (
    <CreamPaper
      elevation={0}
      sx={{
        p: 2,
        height: '100%',
        clipPath:
          'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)'
      }}
    >
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ color: colors.accent.gold, fontWeight: 700 }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {skills.map((skill, index) => (
          <Chip key={index} label={skill} size="small" sx={{ fontWeight: 500 }} />
        ))}
      </Box>
    </CreamPaper>
  )
}

SkillCard.displayName = 'SkillCard'

export default SkillCard
