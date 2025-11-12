import React, { useState, useCallback, useMemo } from 'react'
import { Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import muiTheme from '../../styles/muiTheme'
import { colors, typography } from '../../designTokens'
import ProjectCarousel from '../ProjectCarousel'
import {
  ShowcaseWrapper,
  HeaderSection,
  TitleText,
  SubtitleText,
  TitleUnderline,
  DetailsSection,
  ProjectTitle,
  ProjectDescription,
  TechStackSection,
  TechStackTitle,
  TechChipsContainer,
  StyledTechChip,
  AboutNoteSection,
  AboutNoteTitle,
  AboutNoteText,
  MainContainer,
  EmptyStateContainer,
  ContentGrid,
  CarouselGridItem,
  CarouselBox,
  DetailsGridItem
} from './ShowcaseGallery.styles'

//! =============== 1. 類型與介面定義 ===============

/**
 * @typedef {object} ShowcaseItem
 * @property {number} id - 項目 ID
 * @property {string | null} pic - 圖片路徑
 * @property {string} title - 項目標題
 * @property {string} dec - 項目描述 (支援 \n 換行)
 * @property {string[]} techStack - 使用的技術棧
 */

/**
 * @typedef {object} ShowcaseConfig
 * @property {string} pageTitle - 頁面主標題
 * @property {string} pageSubtitle - 頁面副標題
 * @property {string} aboutTitle - 關於區塊標題
 * @property {string[]} aboutContent - 關於區塊內容（陣列形式，每個元素為一段）
 */

//! =============== 2. Custom Hook ===============

/**
 * 展示櫃狀態管理 Hook
 * @param {ShowcaseItem[]} items - 展示項目陣列（每個項目可包含 images 陣列）
 */
function useShowcaseGallery(items) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // 將 items 中的 images 陣列展開成單一 slides 陣列
  // 每個 slide 包含圖片路徑和所屬類別資訊
  const slides = useMemo(() => {
    const allSlides = []
    items.forEach((item) => {
      // 支援新格式 (systems) 和舊格式 (images/pic)
      if (item.systems && Array.isArray(item.systems)) {
        // 新格式：包含 systems 陣列
        item.systems.forEach((system, sysIndex) => {
          system.images.forEach((imagePath, imgIndex) => {
            allSlides.push({
              id: `${item.id}-${sysIndex}-${imgIndex}`,
              pic: imagePath,
              categoryId: item.id,
              categoryTitle: item.title,
              categoryDec: item.dec,
              categoryTechStack: item.techStack,
              systemName: system.name
            })
          })
        })
      } else {
        // 舊格式：直接使用 images 或 pic
        const imageList = item.images || (item.pic ? [item.pic] : [])
        imageList.forEach((imagePath, imgIndex) => {
          allSlides.push({
            id: `${item.id}-${imgIndex}`,
            pic: imagePath,
            categoryId: item.id,
            categoryTitle: item.title,
            categoryDec: item.dec,
            categoryTechStack: item.techStack
          })
        })
      }
    })
    return allSlides
  }, [items])

  // 計算每個部門和系統在進度條上的位置
  const departmentPositions = useMemo(() => {
    const positions = []
    let currentIndex = 0

    items.forEach((item) => {
      // 提取部門簡稱
      const titleParts = item.title.split('-')
      const shortTitle = titleParts[0].trim()

      const departmentStartIndex = currentIndex
      const systems = []

      // 處理系統位置
      if (item.systems && Array.isArray(item.systems)) {
        item.systems.forEach((system) => {
          const systemImageCount = system.images.length
          systems.push({
            name: system.name,
            startIndex: currentIndex,
            imageCount: systemImageCount,
            percentage: slides.length > 0 ? (currentIndex / slides.length) * 100 : 0
          })
          currentIndex += systemImageCount
        })
      } else {
        // 舊格式
        const imageCount = item.images?.length || (item.pic ? 1 : 0)
        currentIndex += imageCount
      }

      const departmentImageCount = currentIndex - departmentStartIndex

      positions.push({
        id: item.id,
        title: item.title,
        shortTitle: shortTitle,
        startIndex: departmentStartIndex,
        imageCount: departmentImageCount,
        percentage: slides.length > 0 ? (departmentStartIndex / slides.length) * 100 : 0,
        systems: systems
      })
    })

    return positions
  }, [items, slides.length])

  // 根據當前 slide 的 categoryId 找到對應的類別資訊
  const currentCategory = useMemo(() => {
    const currentSlide = slides[currentSlideIndex]
    if (!currentSlide) return items[0]

    return items.find((item) => item.id === currentSlide.categoryId) || items[0]
  }, [currentSlideIndex, slides, items])

  const handleSlideChange = useCallback((index) => {
    setCurrentSlideIndex(index)
  }, [])

  return {
    currentCategory,
    handleSlideChange,
    slides,
    departmentPositions,
    currentSlideIndex
  }
}

//! =============== 3. 子組件 ===============

/**
 * 頁首標題區塊
 */
const GalleryHeader = React.memo(({ title, subtitle }) => (
  <HeaderSection>
    <TitleText>{title}</TitleText>
    <SubtitleText>{subtitle}</SubtitleText>
    <TitleUnderline />
  </HeaderSection>
))

GalleryHeader.displayName = 'GalleryHeader'

/**
 * 項目詳情區塊
 */
const ItemDetails = ({ item }) => {
  return (
    <DetailsSection>
      {/* 項目標題 */}
      <ProjectTitle>{item.title}</ProjectTitle>

      {/* 項目描述 */}
      <ProjectDescription>{item.dec}</ProjectDescription>

      {/* 技術棧標籤 */}
      {item.techStack && item.techStack.length > 0 && (
        <TechStackSection>
          <TechStackTitle>技術棧</TechStackTitle>
          <TechChipsContainer>
            {item.techStack.map((tech, index) => (
              <StyledTechChip
                key={index}
                label={tech}
              />
            ))}
          </TechChipsContainer>
        </TechStackSection>
      )}
    </DetailsSection>
  )
}

/**
 * 關於備註區塊
 */
const AboutNote = React.memo(({ title, content }) => (
  <AboutNoteSection>
    <AboutNoteTitle>{title}</AboutNoteTitle>
    {content.map((paragraph, index) => (
      <AboutNoteText key={index}>{paragraph}</AboutNoteText>
    ))}
  </AboutNoteSection>
))

AboutNote.displayName = 'AboutNote'

//! =============== 4. 主要組件 ===============

/**
 * 通用展示櫃組件
 * @param {object} props
 * @param {ShowcaseItem[]} props.items - 展示項目陣列
 * @param {ShowcaseConfig} props.config - 展示櫃配置
 * @param {boolean} [props.showProgress=true] - 是否顯示輪播進度條
 * @param {boolean} [props.showAboutNote=true] - 是否顯示關於區塊
 */
const ShowcaseGallery = ({
  items = [],
  config = {
    pageTitle: '展示櫃',
    pageSubtitle: '作品展示',
    aboutTitle: '關於此展示',
    aboutContent: ['這是一個展示櫃組件。']
  },
  showProgress = true,
  showAboutNote = true
}) => {
  const carouselRef = React.useRef(null)

  const {
    currentCategory,
    handleSlideChange,
    slides,
    departmentPositions,
    currentSlideIndex
  } = useShowcaseGallery(items)

  // 處理部門點擊跳轉
  const handleDepartmentClick = useCallback((startIndex) => {
    if (carouselRef.current?.scrollToSlide) {
      carouselRef.current.scrollToSlide(startIndex)
    }
  }, [])

  // 驗證是否有項目
  if (!items || items.length === 0) {
    return (
      <ThemeProvider theme={muiTheme}>
        <ShowcaseWrapper>
          <EmptyStateContainer>
            <Typography
              variant='h4'
              color='white'
            >
              沒有可展示的項目
            </Typography>
          </EmptyStateContainer>
        </ShowcaseWrapper>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <ShowcaseWrapper>
        <MainContainer>
          {/* 頁首標題 */}
          <GalleryHeader
            title={config.pageTitle}
            subtitle={config.pageSubtitle}
          />

          {/* 分屏佈局：左側輪播 + 右側詳情 */}
          <ContentGrid>
            {/* 左側 - 輪播區 */}
            <CarouselGridItem>
              <CarouselBox>
                <ProjectCarousel
                  ref={carouselRef}
                  slides={slides}
                  onSlideChange={handleSlideChange}
                  showProgress={showProgress}
                  departmentPositions={departmentPositions}
                  currentSlideIndex={currentSlideIndex}
                  onDepartmentClick={handleDepartmentClick}
                />
              </CarouselBox>
            </CarouselGridItem>

            {/* 右側 - 詳情區 */}
            <DetailsGridItem>
              <ItemDetails
                key={currentCategory.id}
                item={currentCategory}
              />
            </DetailsGridItem>
          </ContentGrid>

          {/* 底部關於區塊 */}
          {showAboutNote && (
            <AboutNote
              title={config.aboutTitle}
              content={config.aboutContent}
            />
          )}
        </MainContainer>
      </ShowcaseWrapper>
    </ThemeProvider>
  )
}

export default ShowcaseGallery

