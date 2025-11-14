import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Container, Typography, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import muiTheme from '../styles/muiTheme'
import {
  GoldBorderContainer,
  GoldDivider
} from '../components/StyledComponents'
import { colors } from '../designTokens'
import HexagonGrid from '../components/layout/HexagonGrid'
import HexagonCard from '../components/card/HexagonCard'

//! =============== 2. 類型與介面定義 ===============
//* 遵循 JSDoc 指南，統一定義此組件所使用的所有資料結構

/**
 * @typedef {object} AppInfo
 * @property {string} name
 * @property {string} version
 * @property {string[]} features
 */

/**
 * @typedef {object} PigModule
 * @property {string} icon
 * @property {string} title
 * @property {string} description
 * @property {string} link
 * @property {string} buttonText
 */

/**
 * @typedef {Object<string, PigModule>} PigSystemModules
 */

/**
 * @typedef {object} FeatureCard
 * @property {string} icon
 * @property {string} title
 * @property {string} description
 * @property {string} link
 * @property {string} buttonText
 */

/**
 * @typedef {object} UseHomeDataReturn
 * @property {AppInfo | undefined} appInfo
 * @property {boolean} isLoading
 * @property {string} pigSystemModule - 當前選中的模組 key
 * @property {React.Dispatch<React.SetStateAction<string>>} setPigSystemModule - 設置模組的函數
 * @property {PigModule} currentPigModule - 當前選中的模組物件
 * @property {PigSystemModules} pigSystemModules - 所有的模組定義
 * @property {FeatureCard[]} featureCards - 所有的功能卡片定義
 */

//! =============== 1. 設定與常量 ===============
//* 包含模擬 API、靜態資料定義

/**
 * 模擬一個假的 API 調用，用於激活 React Query
 * @returns {Promise<AppInfo>}
 */
const fetchAppInfo = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: '時間軸專案',
        version: '1.0.0',
        features: ['時間軸視覺化', '數據滑動器', '查詢功能']
      })
    }, 500)
  })
}

/**
 * 養豬場管理系統模組
 * @type {PigSystemModules}
 */
const pigSystemModules = {
  inventory: {
    icon: '🐷',
    title: '豬舍庫存管理',
    description: '養豬場智慧管理系統 - 豬舍庫存即時追蹤與數據分析',
    link: '/pig-house-inventory',
    buttonText: '查看庫存'
  },
  breeding: {
    icon: '🐖',
    title: '種豬繁殖記錄',
    description: '母豬繁殖週期管理與配種記錄追蹤系統',
    link: '/sow-breeding-records',
    buttonText: '查看記錄'
  },
  culling: {
    icon: '🐗',
    title: '公豬淘汰管理',
    description: '公豬淘汰流程管理與決策支援系統',
    link: '/culling-boar',
    buttonText: '管理淘汰'
  },
  genotype: {
    icon: '🧬',
    title: '公豬基因型管理',
    description: '公豬基因型數據管理與品種改良追蹤',
    link: '/boargenotype',
    buttonText: '查看基因型'
  }
}

/**
 * 功能卡片定義
 * @type {FeatureCard[]}
 */
const featureCards = [
  {
    icon: '👨‍💻',
    title: '關於我',
    description: '前端工程師，專注於 React 生態系統與工業級系統開發',
    link: '/about',
    buttonText: '查看履歷'
  },
  {
    icon: '📅',
    title: '開發歷程',
    description: '專案開發時程與技術演進歷程',
    link: '/timeline',
    buttonText: '查看開發歷程'
  },
  {
    icon: '🤖',
    title: '智慧排程系統',
    description: '工業級生產排程管理，支援多區域即時調度與狀態追蹤',
    link: '/wise-scheduling',
    buttonText: '進入智慧排程'
  },
  {
    icon: '📊',
    title: '專案作品展示',
    description: '科專_TIIP模具產業高階製造系統展示',
    link: '/project-showcase',
    buttonText: '查看專案詳情'
  },
  {
    icon: '🏭',
    title: '製造監控中心',
    description: '多功能生產監控儀表板，包含 OEE 分析、進度追蹤等',
    link: '/ManufacturingLiveMonitor',
    buttonText: '進入監控中心'
  },
  {
    icon: '🎨',
    title: 'Design Token 推動',
    description: '設計系統規範化，推動設計與開發協作效率提升',
    link: '/design-token',
    buttonText: '查看 Design Token'
  },
  {
    icon: '📬',
    title: '聯絡方式',
    description: '歡迎聯繫討論專案合作或技術交流',
    link: '/contact',
    buttonText: '聯絡我'
  }
]

//! =============== 3. 核心功能實作 ===============
//* 包含核心的 Custom Hook 與主要的 React 組件

/**
 * 💡 核心邏輯 Hook (遵循現代 React 設計規範)
 * @description 封裝 Home 頁面的所有業務邏輯、狀態管理和數據獲取。
 * @returns {UseHomeDataReturn}
 */
function useHomeData() {
  const [pigSystemModule, setPigSystemModule] = useState('inventory')

  // 使用 React Query 發起查詢
  const { data: appInfo, isLoading } = useQuery({
    queryKey: ['appInfo'],
    queryFn: fetchAppInfo
  })

  // 🧠 派生狀態 (Derived State)
  // 避免將可計算的狀態額外存入 state，直接在 render 前計算
  const currentPigModule = pigSystemModules[pigSystemModule]

  return {
    appInfo,
    isLoading,
    pigSystemModule,
    setPigSystemModule,
    currentPigModule,
    pigSystemModules, // 將常量透傳給組件
    featureCards // 將常量透傳給組件
  }
}

/**
 * @description Home 頁面 - 作品集入口 (展示組件)
 * 遵循「專業誠信 AI 協作助手」規範，使用 function 宣告主要組件
 */
function Home() {
  const {
    isLoading,
    pigSystemModule,
    setPigSystemModule,
    currentPigModule,
    pigSystemModules,
    featureCards
  } = useHomeData()

  // 🛡️ 早期返回 (Guard Clause)，遵循「自我文檔代碼審查」的線性流程原則
  if (isLoading) {
    return (
      <ThemeProvider theme={muiTheme}>
        <Container
          sx={{
            width: '100%',
            py: 4,
            backgroundColor: colors.background.primary,
            minHeight: '100vh'
          }}
        >
          <Typography sx={{ color: colors.text.inverse }}>載入中...</Typography>
        </Container>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <Container
        maxWidth='none'
        sx={{
          py: 6,
          backgroundColor: colors.background.primary,
          minHeight: '100vh'
        }}
      >
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
              background: `linear-gradient(135deg, ${colors.accent.gold}40, transparent)`,
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
                color: colors.accent.gold,
                mb: 3,
                letterSpacing: '0.02em',
                textShadow: `0 2px 8px ${colors.accent.gold}30`
              }}
            >
              林志翰 - 前端工程師作品集
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
              歡迎來到我的個人作品集！這裡展示了我在智慧製造領域的專案經驗，
              包含生產排程系統、即時監控儀表板等工業級應用開發。
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

          {/* 養豬場管理系統卡片 - 使用當前選中的模組 */}
          <HexagonCard
            icon={currentPigModule.icon}
            title={currentPigModule.title}
            description={currentPigModule.description}
            link={currentPigModule.link}
          />
        </HexagonGrid>

        {/* 養豬場模組切換器 (放在網格下方) */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
            mb: 2
          }}
        >
          <Box
            sx={{
              background: colors.background.secondary,
              padding: 2,
              borderRadius: 2,
              border: `1px solid ${colors.accent.gold}40`
            }}
          >
            <Typography
              sx={{
                color: colors.text.inverse,
                fontSize: '0.9rem',
                mb: 1,
                textAlign: 'center'
              }}
            >
              切換養豬場管理模組：
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              {Object.entries(pigSystemModules).map(([key, module]) => (
                <Box
                  key={key}
                  onClick={() => setPigSystemModule(key)}
                  sx={{
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: 1,
                    border: `1px solid ${colors.accent.gold}60`,
                    background:
                      pigSystemModule === key
                        ? colors.accent.gold
                        : `${colors.background.secondary}`,
                    color:
                      pigSystemModule === key
                        ? colors.background.primary
                        : colors.text.inverse,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 8px ${colors.accent.gold}30`
                    }
                  }}
                >
                  <Box
                    component='span'
                    sx={{ fontSize: '1.5rem', mr: 0.5 }}
                  >
                    {module.icon}
                  </Box>
                  <Box
                    component='span'
                    sx={{ fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    {module.title}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Home

