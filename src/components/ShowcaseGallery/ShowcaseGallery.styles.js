import styled from '@emotion/styled'
import { Box, Typography, Chip } from '@mui/material'
import { colors, typography } from '../../designTokens'

//! =============== 主容器樣式 ===============

export const ShowcaseWrapper = styled(Box)`
  background-color: #0a0a0a;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 64px;

  @media (min-width: 900px) {
    padding-top: 80px;
  }

  @media (min-width: 1200px) {
    padding-top: 96px;
  }
`

//! =============== 頁首區塊樣式 ===============

export const HeaderSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 32px;

  @media (min-width: 900px) {
    margin-bottom: 48px;
  }
`

export const TitleText = styled(Typography)`
  color: ${colors.accent.gold};
  font-weight: 300;
  font-size: 2rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 8px;

  @media (min-width: 900px) {
    font-size: 2.25rem;
  }

  @media (min-width: 1200px) {
    font-size: 2.5rem;
  }
`

export const SubtitleText = styled(Typography)`
  color: #ffffff;
  font-family: serif;
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.8;
  font-style: italic;
  margin-bottom: 16px;

  @media (min-width: 900px) {
    font-size: 1.25rem;
  }

  @media (min-width: 1200px) {
    font-size: 1.5rem;
  }
`

export const TitleUnderline = styled(Box)`
  width: 60px;
  height: 2px;
  background-color: ${colors.accent.gold};
`

//! =============== 詳情區塊樣式 ===============

export const DetailsSection = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  @media (min-width: 1200px) {
    padding: 0 32px;
  }
`

export const ProjectTitle = styled(Typography)`
  color: ${colors.accent.gold};
  font-family: serif;
  font-weight: 400;
  font-size: 1.75rem;
  line-height: 1.4;
  margin-bottom: 24px;

  @media (min-width: 900px) {
    font-size: 2rem;
  }

  @media (min-width: 1200px) {
    font-size: 2.25rem;
  }
`

export const ProjectDescription = styled(Typography)`
  color: rgba(255, 255, 255, 0.7);
  line-height: 2;
  font-size: 0.95rem;
  font-weight: 300;
  margin-bottom: 32px;
  white-space: pre-line;
  flex-grow: 1;

  @media (min-width: 900px) {
    font-size: 1rem;
  }

  @media (min-width: 1200px) {
    font-size: 1.05rem;
  }
`

//! =============== 技術棧區塊樣式 ===============

export const TechStackSection = styled(Box)`
  margin-top: auto;
`

export const TechStackTitle = styled(Typography)`
  color: ${colors.accent.gold};
  font-weight: ${typography.fontWeight.semibold};
  font-size: 1.125rem;
  margin-bottom: 16px;
  letter-spacing: 0.05em;

  @media (min-width: 900px) {
    font-size: 1.25rem;
  }
`

export const TechChipsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

export const StyledTechChip = styled(Chip)`
  background-color: ${colors.accent.gold}20;
  border: 1px solid ${colors.accent.gold};
  color: ${colors.accent.gold};
  font-weight: ${typography.fontWeight.medium};
  font-size: 0.875rem;
  padding: 8px 12px;

  @media (min-width: 900px) {
    font-size: 0.95rem;
    padding: 12px 16px;
  }

  &:hover {
    background-color: ${colors.accent.gold}30;
    box-shadow: 0 0 20px ${colors.accent.gold}40;
  }
`

//! =============== 關於區塊樣式 ===============

export const AboutNoteSection = styled(Box)`
  margin-top: 48px;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  border-left: 3px solid ${colors.accent.gold};

  @media (min-width: 900px) {
    margin-top: 64px;
    padding: 32px;
  }

  @media (min-width: 1200px) {
    margin-top: 80px;
  }
`

export const AboutNoteTitle = styled(Typography)`
  color: ${colors.accent.gold};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 16px;
  letter-spacing: 0.05em;
`

export const AboutNoteText = styled(Typography)`
  color: rgba(255, 255, 255, 0.6);
  line-height: 2;
  font-size: 0.9rem;
  font-weight: 300;
  margin-bottom: 16px;

  @media (min-width: 900px) {
    font-size: 0.95rem;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`
