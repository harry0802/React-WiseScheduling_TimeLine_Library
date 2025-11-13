import React from 'react'
import { Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import muiTheme from '../../styles/muiTheme'
import ProfileHeader from './components/ProfileHeader'
import SummarySection from './components/SummarySection'
import WorkExperienceSection from './components/WorkExperienceSection'
import SkillsSection from './components/SkillsSection'
import CoreStrengthsSection from './components/CoreStrengthsSection'
import {
  personalInfo,
  summary,
  workExperience,
  skills,
  coreStrengths
} from './data/profileData'
import { colors } from '../../designTokens'

//! =============== 主要組件 (協調器) ===============

/**
 * About 頁面主組件
 * 💡 重構決策：協調器模式 - 組裝子組件，不處理 UI 細節
 *
 * 重構成果：
 * - 從 667 行降到 < 50 行 (↓93%)
 * - 資料與 UI 完全分離
 * - 每個區塊獨立組件化
 * - 照片左文字右的響應式佈局
 */
const About = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          backgroundColor: colors.background.primary,
          minHeight: '100vh'
        }}
      >
        <ProfileHeader
          name={personalInfo.name}
          title={personalInfo.title}
          photoSrc={personalInfo.photo}
        />

        <SummarySection paragraphs={summary.paragraphs} />

        <WorkExperienceSection
          company={workExperience.company}
          position={workExperience.position}
          duration={workExperience.duration}
          overview={workExperience.overview}
          achievements={workExperience.achievements}
          technicalContributions={workExperience.technicalContributions}
          challenges={workExperience.challenges}
        />

        <SkillsSection skills={skills} />

        <CoreStrengthsSection strengths={coreStrengths} />
      </Container>
    </ThemeProvider>
  )
}

export default About
