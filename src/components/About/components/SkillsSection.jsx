import React from 'react'
import { Typography, Grid } from '@mui/material'
import SkillCard from './SkillCard'
import { ClippedGoldContainer } from '../styles/ClippedContainer'
import { colors } from '../../../designTokens'

//! =============== 1. 類型定義 ===============

/**
 * @typedef {object} Skills
 * @property {string[]} languages - 程式語言
 * @property {string[]} frameworks - 框架
 * @property {string[]} libraries - 函式庫
 * @property {string[]} tools - 工具
 */

/**
 * @typedef {object} SkillsSectionProps
 * @property {Skills} skills - 技能資料
 */

//! =============== 2. 主要組件 ===============

/**
 * 技能總覽區塊組件
 *
 * @param {SkillsSectionProps} props
 */
const SkillsSection = ({ skills, title, categories }) => {
  return (
    <ClippedGoldContainer clipSize="mediumLarge" sx={{ mb: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: colors.accent.primary,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 3
        }}
      >
        <span style={{ fontSize: '1.75rem' }}>🛠️</span>
        {title}
      </Typography>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid key={category.key} item xs={12} sm={6} md={3}>
            <SkillCard title={category.title} skills={skills[category.key]} />
          </Grid>
        ))}
      </Grid>
    </ClippedGoldContainer>
  )
}

SkillsSection.displayName = 'SkillsSection'

export default SkillsSection
