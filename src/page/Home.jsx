import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Container, Typography, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import muiTheme from '../styles/muiTheme'
import {
  GoldBorderContainer,
  GoldDivider
} from '../components/StyledComponents'
import { colors } from '../designTokens'
import HexagonGrid from '../components/layout/HexagonGrid'
import HexagonCard from '../components/card/HexagonCard'
import { HOME_FEATURE_CARDS } from '../constants/homeFeatureDefinitions'
import useDocumentTitle from '../hooks/useDocumentTitle'
import LoadingSpinner from '../components/LoadingSpinner'

//! =============== 2. 類型與介面定義 ===============
//* 遵循 JSDoc 指南，統一定義此組件所使用的所有資料結構

/**
 * @typedef {object} AppInfo
 * @property {string} name
 * @property {string} version
 * @property {string[]} features
 */

/**
 * @typedef {object} FeatureCard
 * @property {string} icon
 * @property {string} title - 由 i18n 提供
 * @property {string} description - 由 i18n 提供
 * @property {string} link
 * @property {string} buttonText - 由 i18n 提供
 */

/**
 * @typedef {object} UseHomeDataReturn
 * @property {AppInfo | undefined} appInfo
 * @property {boolean} isLoading
 * @property {FeatureCard[]} featureCards - 所有的功能卡片定義
 */

//! =============== 1. 設定與常量 ===============
//* 包含模擬 API、靜態資料定義

/**
 * ⚡ 靜態資料直接返回，無需模擬 API 延遲
 * @returns {Promise<AppInfo>}
 */
const fetchAppInfo = async () => {
  return {
    name: '時間軸專案',
    version: '1.0.0',
    features: ['時間軸視覺化', '數據滑動器', '查詢功能']
  }
}

/**
 * 功能卡片定義 (已移至 homeFeatureDefinitions.js)
 * @deprecated 使用 HOME_FEATURE_CARDS 代替
 */

//! =============== 3. 核心功能實作 ===============
//* 包含核心的 Custom Hook 與主要的 React 組件

/**
 * 💡 核心邏輯 Hook (遵循現代 React 設計規範)
 * @description 封裝 Home 頁面的所有業務邏輯、狀態管理和數據獲取。
 * @returns {UseHomeDataReturn}
 */
function useHomeData() {
  const { t } = useTranslation('home')

  // 使用 React Query 發起查詢
  const { data: appInfo, isLoading } = useQuery({
    queryKey: ['appInfo'],
    queryFn: fetchAppInfo
  })

  // 將 translation 對應到 feature cards
  const featureCards = HOME_FEATURE_CARDS.map((card, index) => {
    const cardKeys = [
      'about',
      'timeline',
      'moldIndustry',
      'designToken',
      'scheduling',
      'monitoring',
      'pigManagement',
      'contact'
    ]
    const cardKey = cardKeys[index]

    return {
      icon: card.icon,
      title: t(`cards.${cardKey}.title`),
      description: t(`cards.${cardKey}.description`),
      link: card.link,
      buttonText: t(`cards.${cardKey}.button`)
    }
  })

  return {
    appInfo,
    isLoading,
    featureCards
  }
}

/**
 * @description Home 頁面 - 作品集入口 (展示組件)
 * 遵循「專業誠信 AI 協作助手」規範，使用 function 宣告主要組件
 */
function Home() {
  const { t } = useTranslation('home')
  const { isLoading, featureCards } = useHomeData()

  // 設置頁面標題
  useDocumentTitle(t('meta.title'))

  // 🛡️ 早期返回 (Guard Clause)，遵循「自我文檔代碼審查」的線性流程原則
  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <Container
        maxWidth='none'
        sx={{
          pt: 8,
          pb: 20,
          backgroundColor: colors.background.primary,
          minHeight: '100vh'
        }}
      >
        <Box>
          {/* Hero Section */}
          <GoldBorderContainer
            sx={{
              mb: 6,
              position: 'relative',
              clipPath:
                'polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                background: `linear-gradient(135deg, ${colors.accent.primary}40, transparent)`,
                clipPath:
                  'polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)',
                zIndex: -1
              }
            }}
          >
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography
                variant='h2'
                component='h1'
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: colors.accent.primary,
                  mb: 3,
                  letterSpacing: '0.02em',
                  textShadow: `0 2px 8px ${colors.accent.primary}30`
                }}
              >
                {t('hero.title')}
              </Typography>
              <GoldDivider sx={{ width: '100px', height: '3px', mx: 'auto' }} />
              <Typography
                variant='h6'
                sx={{
                  color: colors.text.inverse,
                  lineHeight: 2,
                  maxWidth: 700,
                  mx: 'auto',
                  mt: 3,
                  fontWeight: 400,
                  opacity: 0.95
                }}
              >
                {t('hero.subtitle')}
              </Typography>
            </Box>
          </GoldBorderContainer>

          {/* Hexagonal Cards Grid */}
          <HexagonGrid>
            {featureCards.map((card, index) => (
              <HexagonCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                link={card.link}
              />
            ))}
          </HexagonGrid>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Home

