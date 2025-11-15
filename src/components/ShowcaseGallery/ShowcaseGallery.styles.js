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
  padding-bottom: 48px;

  @media (min-width: 900px) {
    padding-top: 80px;
    padding-bottom: 64px;
  }

  @media (min-width: 1200px) {
    padding-top: 96px;
    padding-bottom: 80px;
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
  color: ${colors.accent.primary};
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
  background-color: ${colors.accent.primary};
`

//! =============== 詳情區塊樣式 ===============

export const DetailsSection = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  @media (min-width: 1200px) {
    padding: 0 0 0 32px;
    z-index: 999;
  }
`

export const ProjectTitle = styled(Typography)`
  color: ${colors.accent.primary};
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

export const ProjectDescription = styled(Box)`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  font-size: 0.95rem;
  font-weight: 300;
  margin-bottom: 32px;
  flex-grow: 1;

  @media (min-width: 900px) {
    font-size: 1rem;
  }

  @media (min-width: 1200px) {
    font-size: 1.05rem;
  }
`

//! =============== Markdown 元素樣式 ===============

export const MarkdownStrong = styled.strong`
  color: ${colors.accent.primary};
  font-weight: ${typography.fontWeight.semibold};
`

export const MarkdownParagraph = styled.p`
  margin-bottom: 1em;
  line-height: 1.8;

  &:last-child {
    margin-bottom: 0;
  }
`

export const MarkdownOrderedList = styled.ol`
  margin: 0.5em 0;
  padding-left: 1.5em;
  list-style-type: decimal;

  li {
    margin-bottom: 0.5em;
    line-height: 1.8;

    &:last-child {
      margin-bottom: 0;
    }
  }
`

export const MarkdownUnorderedList = styled.ul`
  margin: 0.5em 0;
  padding-left: 1.5em;
  list-style-type: disc;

  li {
    margin-bottom: 0.5em;
    line-height: 1.8;

    &:last-child {
      margin-bottom: 0;
    }
  }
`

export const MarkdownCode = styled.code`
  font-family: 'Courier New', Courier, monospace;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.9em;
  color: ${colors.accent.primary};
`

export const MarkdownLink = styled.a`
  color: ${colors.accent.primary};
  font-weight: ${typography.fontWeight.semibold};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${colors.accent.primary}40;

  &:hover {
    border-bottom-color: ${colors.accent.primary};
    text-shadow: 0 0 8px ${colors.accent.primary}60;
  }
`

//! =============== 技術棧區塊樣式 ===============

export const TechStackSection = styled(Box)`
  margin-top: auto;
`

export const TechStackTitle = styled(Typography)`
  color: ${colors.accent.primary};
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
  background-color: ${colors.accent.primary}20;
  border: 1px solid ${colors.accent.primary};
  color: ${colors.accent.primary};
  font-weight: ${typography.fontWeight.medium};
  font-size: 0.875rem;
  padding: 8px 12px;

  @media (min-width: 900px) {
    font-size: 0.95rem;
    padding: 12px 16px;
  }

  &:hover {
    background-color: ${colors.accent.primary}30;
    box-shadow: 0 0 20px ${colors.accent.primary}40;
  }

  /* Icon 樣式 */
  .MuiChip-icon {
    margin-left: 8px;
    color: ${colors.accent.primary};

    @media (min-width: 900px) {
      margin-left: 10px;
    }
  }
`

//! =============== 關於區塊樣式 ===============

export const AboutNoteSection = styled(Box)`
  margin-top: 48px;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  border-left: 3px solid ${colors.accent.primary};

  @media (min-width: 900px) {
    margin-top: 64px;
    padding: 32px;
  }

  @media (min-width: 1200px) {
    margin-top: 80px;
  }
`

export const AboutNoteTitle = styled(Typography)`
  color: ${colors.accent.primary};
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

//! =============== 主容器佈局樣式 ===============

export const MainContainer = styled(Box)`
  width: 100%;
  padding: 0 16px;

  @media (min-width: 900px) {
    width: calc(100% - 6rem);
    padding: 0 32px;
  }

  @media (min-width: 1200px) {
    padding: 0 48px;
  }
`

export const EmptyStateContainer = styled(Box)`
  padding: 0 16px;

  @media (min-width: 900px) {
    padding: 0 48px;
  }

  @media (min-width: 1200px) {
    padding: 0 96px;
  }
`

export const ContentGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  position: relative;
  align-items: stretch;

  @media (min-width: 900px) {
    gap: 32px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 3fr 2fr;
    gap: 48px;
  }
`

export const CarouselGridItem = styled(Box)`
  order: 1;
  z-index: 10;
  position: relative;

  @media (min-width: 1200px) {
    order: 1;
  }
`

export const CarouselBox = styled(Box)`
  height: 710px;
  width: 100%;
`

export const DetailsGridItem = styled(Box)`
  order: 3;
  z-index: 1;

  @media (min-width: 1200px) {
    order: 3;
  }
`

