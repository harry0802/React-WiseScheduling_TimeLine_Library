import React from 'react'
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material'
import { ClippedCreamPaper } from '../styles/ClippedContainer'
import { GoldBadge } from '../../../components/StyledComponents'
import { colors } from '../../../designTokens'

//! =============== 1. 類型定義 ===============

/**
 * @typedef {object} Achievement
 * @property {string} title - 專案標題
 * @property {string[]} items - 成就項目列表
 */

/**
 * @typedef {object} Contribution
 * @property {string} title - 貢獻標題
 * @property {string} description - 描述
 */

/**
 * @typedef {object} WorkExperienceSectionProps
 * @property {string} company - 公司名稱
 * @property {string} position - 職位
 * @property {string} duration - 任職時長
 * @property {string} overview - 工作概述
 * @property {Achievement[]} achievements - 主要成就
 * @property {Contribution[]} technicalContributions - 技術貢獻
 * @property {Contribution[]} challenges - 挑戰與解決方案
 */

//! =============== 2. 子組件 ===============

/**
 * 成就列表組件
 */
const AchievementsList = React.memo(({ achievements }) => (
  <Box sx={{ my: 2 }}>
    <Typography
      variant="subtitle1"
      gutterBottom
      sx={{
        fontWeight: 600,
        color: colors.accent.gold,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          bgcolor: colors.accent.gold,
          borderRadius: '50%'
        }}
      />
      主要貢獻與成就
    </Typography>

    <Typography variant="body2" sx={{ fontWeight: 600, mt: 1, color: colors.text.primary }}>
      專案開發與優化：
    </Typography>

    <List
      dense
      sx={{
        '& .MuiListItemText-primary': { color: colors.accent.gold },
        '& .MuiListItemText-secondary': { color: colors.text.primary }
      }}
    >
      {achievements.map((achievement, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={achievement.title}
            primaryTypographyProps={{ fontWeight: 600 }}
            secondary={
              <Box component="span">
                {achievement.items.map((item, itemIndex) => (
                  <Typography
                    key={itemIndex}
                    variant="body2"
                    component="span"
                    display="block"
                    sx={{ color: colors.text.primary }}
                  >
                    • {item}
                  </Typography>
                ))}
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  </Box>
))
AchievementsList.displayName = 'AchievementsList'

/**
 * 高亮區塊組件（用於技術貢獻和挑戰）
 */
const HighlightBox = React.memo(({ title, icon, contributions }) => (
  <Box
    sx={{
      my: 2,
      p: 2,
      backgroundColor: colors.background.surfaceAlt,
      border: `2px solid ${colors.border.light}`,
      borderLeft: `4px solid ${colors.accent.gold}`,
      borderRadius: 1
    }}
  >
    <Typography
      variant="subtitle1"
      gutterBottom
      sx={{
        color: colors.accent.gold,
        fontWeight: 700
      }}
    >
      {icon} {title}
    </Typography>

    {contributions.map((contribution, index) => (
      <Typography
        key={index}
        variant="body2"
        sx={{
          color: colors.text.primary,
          mb: index < contributions.length - 1 ? 2 : 0
        }}
      >
        <strong>{contribution.title}：</strong>
        {contribution.description}
      </Typography>
    ))}
  </Box>
))
HighlightBox.displayName = 'HighlightBox'

//! =============== 3. 主要組件 ===============

/**
 * 工作經歷區塊組件
 *
 * @param {WorkExperienceSectionProps} props
 */
const WorkExperienceSection = ({
  company,
  position,
  duration,
  overview,
  achievements,
  technicalContributions,
  challenges
}) => {
  return (
    <ClippedCreamPaper elevation={2} clipSize="medium" sx={{ mb: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: colors.accent.gold,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <span style={{ fontSize: '1.75rem' }}>💼</span>
        工作經歷
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: colors.text.primary, fontWeight: 600 }}
        >
          {company} | {position}
        </Typography>
        <GoldBadge sx={{ mb: 2 }}>{duration}</GoldBadge>

        <Typography variant="body2" sx={{ color: colors.text.primary, mb: 2 }}>
          {overview}
        </Typography>

        <AchievementsList achievements={achievements} />

        <HighlightBox
          title="技術推廣與團隊貢獻"
          icon="🚀"
          contributions={technicalContributions}
        />

        <HighlightBox
          title="挑戰與解決方案"
          icon="⚡"
          contributions={challenges}
        />
      </Box>
    </ClippedCreamPaper>
  )
}

WorkExperienceSection.displayName = 'WorkExperienceSection'

export default WorkExperienceSection
