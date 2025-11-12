import React, { useState, useCallback, useMemo } from 'react'
import { Container, Typography, Box, Grid, Chip } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import muiTheme from '../styles/muiTheme'
import { colors, typography } from '../designTokens'
import ProjectCarousel from '../components/ProjectCarousel'

//! =============== 1. 類型與介面定義 ===============

/**
 * @typedef {object} ProjectSlide
 * @property {number} id - 專案 ID
 * @property {string | null} pic - 圖片路徑
 * @property {string} title - 專案標題
 * @property {string} dec - 專案描述 (支援 \n 換行)
 * @property {string[]} techStack - 使用的技術棧
 */

//! =============== 2. 設定與常量 ===============

/**
 * 專案展示資料
 * 🧠 **[效能優化]** 必須移出組件函數外，避免每次渲染都重新宣告此陣列。
 * @type {ProjectSlide[]}
 */
const projectSlides = [
  {
    id: 1,
    pic: null,
    title: '智慧製造排程系統 - 主控台',
    dec: '展示工廠生產線即時狀態監控介面，包含機台狀態、產能分析、工單管理等核心功能。\n\n採用響應式設計，支援多種螢幕尺寸，確保現場人員能在不同裝置上流暢操作。',
    techStack: ['React 18', 'TypeScript', 'Redux Toolkit', 'Material-UI']
  },
  {
    id: 2,
    pic: null,
    title: '智慧製造排程系統 - 甘特圖排程',
    dec: '視覺化的生產排程時間軸，支援拖拉式調整、即時更新、狀態追蹤等進階功能。\n\n整合 Vis-timeline 函式庫，提供直觀的排程管理體驗，大幅提升生產調度效率。',
    techStack: ['Vis-timeline', 'React Hook Form', 'Zod Validation']
  },
  {
    id: 3,
    pic: null,
    title: '智慧製造排程系統 - 數據分析儀表板',
    dec: '提供 OEE 分析、生產進度追蹤、交貨趨勢預測等多維度數據視覺化功能。\n\n運用 Recharts 繪製互動式圖表，協助管理層快速掌握生產狀況並做出決策。',
    techStack: ['Recharts', 'Styled Components', 'Day.js']
  }
]

//! =============== 3. 核心功能實作 (Custom Hook) ===============

/**
 * @typedef {object} UseProjectShowcaseReturn
 * @property {ProjectSlide} currentSlide - 當前顯示的專案
 * @property {(index: number) => void} handleSlideChange - 切換投影片的處理器
 * @property {ProjectSlide[]} slides - 所有的專案資料
 */

/**
 * 💡 **[現代 React]** 遵循 "Custom Hook 優先" 原則，
 * 將所有狀態管理與業務邏輯從 UI 組件中抽離。
 * @returns {UseProjectShowcaseReturn}
 */
function useProjectShowcase() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // 1. 動作 (Actions)
  const handleSlideChange = useCallback((index) => {
    setCurrentSlideIndex(index)
  }, [])

  // 2. 衍生狀態 (Derived State)
  // ✨ **[優化]** 使用 useMemo 確保 'currentSlide' 只在 index 變化時才重新計算
  const currentSlide = useMemo(() => {
    return projectSlides[currentSlideIndex] || projectSlides[0]
  }, [currentSlideIndex])

  // 3. 返回乾淨的 API
  return {
    currentSlide,
    handleSlideChange,
    slides: projectSlides // 將靜態數據也透傳出去
  }
}

//! =============== 4. 輔助/子組件 (Components) ===============

/**
 * 🎨 頁首標題區塊
 * ✨ **[優化]** 這是純靜態組件，使用 React.memo 避免父層重渲染時跟著渲染。
 */
const ProjectPageHeader = React.memo(() => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      mb: { xs: 4, md: 6 }
    }}
  >
    <Typography
      variant='h2'
      component='h1'
      sx={{
        color: colors.accent.gold,
        fontWeight: 300,
        fontSize: { xs: '2rem', md: '2.25rem', lg: '2.5rem' },
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        mb: 1
      }}
    >
      專案展示
    </Typography>
    <Typography
      variant='h5'
      sx={{
        color: '#FFFFFF',
        fontFamily: 'serif',
        fontWeight: 400,
        fontSize: { xs: '1.125rem', md: '1.25rem', lg: '1.5rem' },
        lineHeight: 1.8,
        fontStyle: 'italic',
        mb: 2
      }}
    >
      科專_TIIP模具產業高階製造
    </Typography>
    <Box
      sx={{
        width: '60px',
        height: '2px',
        backgroundColor: colors.accent.gold
      }}
    />
  </Box>
))

ProjectPageHeader.displayName = 'ProjectPageHeader'

/**
 * 🎨 專案詳情區塊 (右側)
 * @param {{ slide: ProjectSlide }} props
 */
const ProjectDetails = ({ slide }) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',

        px: { xs: 2, lg: 4 }
      }}
    >
      {/* Dynamic Project Title */}
      <Typography
        variant='h3'
        sx={{
          color: colors.accent.gold,
          fontFamily: 'serif',
          fontWeight: 400,
          fontSize: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
          lineHeight: 1.4,
          mb: 3
        }}
      >
        {slide.title}
      </Typography>

      {/* Dynamic Description */}
      <Typography
        variant='body1'
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: 2,
          fontSize: { xs: '0.95rem', md: '1rem', lg: '1.05rem' },
          fontWeight: 300,
          mb: 4,
          whiteSpace: 'pre-line',
          flexGrow: 1
        }}
      >
        {slide.dec}
      </Typography>

      {/* Tech Stack Badges */}
      {slide.techStack && slide.techStack.length > 0 && (
        <Box sx={{ mt: 'auto' }}>
          <Typography
            variant='h6'
            sx={{
              color: colors.accent.gold,
              fontWeight: typography.fontWeight.semibold,
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              mb: 2,
              letterSpacing: '0.05em'
            }}
          >
            技術棧
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {slide.techStack.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                sx={{
                  backgroundColor: `${colors.accent.gold}20`,
                  border: `1px solid ${colors.accent.gold}`,
                  color: colors.accent.gold,
                  fontWeight: typography.fontWeight.medium,
                  fontSize: { xs: '0.875rem', md: '0.95rem' },
                  padding: {
                    xs: '0.5rem 0.75rem',
                    md: '0.75rem 1rem'
                  },
                  '&:hover': {
                    backgroundColor: `${colors.accent.gold}30`,
                    boxShadow: `0 0 20px ${colors.accent.gold}40`
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

/**
 * 🎨 底部備註區塊
 * ✨ **[優化]** 同樣為靜態組件，使用 React.memo。
 */
const ProjectAboutNote = React.memo(() => (
  <Box
    sx={{
      mt: { xs: 6, md: 8, lg: 10 },
      p: { xs: 3, md: 4 },
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '4px',
      borderLeft: `3px solid ${colors.accent.gold}`
    }}
  >
    <Typography
      variant='h6'
      sx={{
        color: colors.accent.gold,
        fontWeight: typography.fontWeight.semibold,
        mb: 2,
        letterSpacing: '0.05em'
      }}
    >
      關於此專案展示
    </Typography>
    <Typography
      variant='body2'
      sx={{
        color: 'rgba(255, 255, 255, 0.6)',
        lineHeight: 2,
        fontSize: { xs: '0.9rem', md: '0.95rem' },
        fontWeight: 300,
        mb: 2
      }}
    >
      這是一個工業級智慧製造管理系統，專為模具產業設計，整合生產排程、即時監控、數據分析等核心功能。
    </Typography>
    <Typography
      variant='body2'
      sx={{
        color: 'rgba(255, 255, 255, 0.6)',
        lineHeight: 2,
        fontSize: { xs: '0.9rem', md: '0.95rem' },
        fontWeight: 300
      }}
    >
      本專案採用現代化前端技術棧，注重使用者體驗與系統效能，成功協助工廠提升生產效率、優化資源調度。
    </Typography>
  </Box>
))

ProjectAboutNote.displayName = 'ProjectAboutNote'

//! =============== 5. 主要組件實例 ===============

const ProjectShowcase = () => {
  // 💡 **[設計決策]** 主組件現在極度乾淨。它只做兩件事：
  // 1. 獲取狀態邏輯 (from Hook)
  // 2. 組合 UI (Components)
  const { currentSlide, handleSlideChange, slides } = useProjectShowcase()

  return (
    <ThemeProvider theme={muiTheme}>
      <Box
        sx={{
          backgroundColor: '#0a0a0a',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 8, md: 10, lg: 12 }
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            px: { xs: 2, md: 6, lg: 12 }
          }}
        >
          {/* ✨ [重構] 1. 頁首組件 */}
          <ProjectPageHeader />

          {/* Split-Screen Layout */}
          <Grid
            container
            spacing={{ xs: 3, md: 4, lg: 6 }}
            sx={{
              position: 'relative',
              alignItems: 'stretch'
            }}
          >
            {/* LEFT SECTION - Carousel */}
            <Grid
              item
              xs={12}
              lg={7}
              sx={{
                order: { xs: 1, lg: 1 },
                zIndex: 10,
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  height: { xs: 'auto', md: '500px', lg: '600px' },
                  width: '100%'
                }}
              >
                <ProjectCarousel
                  slides={slides}
                  onSlideChange={handleSlideChange}
                  showProgress={true}
                />
              </Box>
            </Grid>

            {/* RIGHT SECTION - Description */}
            <Grid
              item
              xs={12}
              lg={5}
              sx={{
                order: { xs: 3, lg: 3 },
                zIndex: 1
              }}
            >
              {/* ✨ [重構] 2. 專案詳情組件 */}
              {/* 🧠 傳入 'key' 可以在 slide 切換時觸發 React 重新掛載，
                   這對於觸發 'fade-in' 之類的動畫非常有用。 */}
              <ProjectDetails
                key={currentSlide.id}
                slide={currentSlide}
              />
            </Grid>
          </Grid>

          {/* ✨ [重構] 3. 底部備註組件 */}
          <ProjectAboutNote />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default ProjectShowcase

