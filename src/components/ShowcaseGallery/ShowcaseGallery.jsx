import React, { useState, useCallback, useMemo } from 'react'
import { Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import ReactMarkdown from 'react-markdown'
import { Icon } from '@iconify/react'
import muiTheme from '../../styles/muiTheme'
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
  DetailsGridItem,
  MarkdownStrong,
  MarkdownParagraph,
  MarkdownOrderedList,
  MarkdownUnorderedList,
  MarkdownCode,
  MarkdownLink
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

//! =============== 2. 工具函數 ===============

/**
 * 從項目生成 slides 陣列
 * 💡 提取為純函數，易於測試和理解
 */
function generateSlidesFromItems(items) {
  const allSlides = []

  items.forEach((item) => {
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
}

/**
 * 計算部門位置
 * 💡 提取為純函數，降低 Hook 複雜度
 */
function calculateDepartmentPositions(items, slidesLength) {
  const positions = []
  let currentIndex = 0

  items.forEach((item) => {
    const titleParts = item.title.split('-')
    const shortTitle = titleParts[0].trim()
    const departmentStartIndex = currentIndex
    const systems = []

    if (item.systems && Array.isArray(item.systems)) {
      item.systems.forEach((system) => {
        const systemImageCount = system.images.length
        systems.push({
          name: system.name,
          startIndex: currentIndex,
          imageCount: systemImageCount,
          percentage: slidesLength > 0 ? (currentIndex / slidesLength) * 100 : 0
        })
        currentIndex += systemImageCount
      })
    } else {
      const imageCount = item.images?.length || (item.pic ? 1 : 0)
      currentIndex += imageCount
    }

    const departmentImageCount = currentIndex - departmentStartIndex

    positions.push({
      id: item.id,
      title: item.title,
      shortTitle,
      startIndex: departmentStartIndex,
      imageCount: departmentImageCount,
      percentage:
        slidesLength > 0 ? (departmentStartIndex / slidesLength) * 100 : 0,
      systems
    })
  })

  return positions
}

//! =============== 3. Custom Hooks ===============

/**
 * 展示櫃狀態管理 Hook
 * 💡 重構：拆分為專注的小 Hook，降低認知負荷
 */
function useShowcaseGallery(items) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const slides = useMemo(() => generateSlidesFromItems(items), [items])

  const departmentPositions = useMemo(
    () => calculateDepartmentPositions(items, slides.length),
    [items, slides.length]
  )

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

//! =============== 4. 子組件 ===============

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
 * 💡 添加 memo 優化：避免 currentCategory 變化時不必要的重渲染
 * 💡 使用 ReactMarkdown 渲染 markdown 語法（支援 **bold**、列表等）
 * 💡 支援系統名稱連結點擊跳轉到對應照片
 */
const ItemDetails = React.memo(({ item, carouselRef, departmentPositions }) => {
  // 創建自定義連結組件，處理系統跳轉
  const CustomLink = useCallback(
    ({ href, children, ...props }) => {
      const handleClick = (e) => {
        e.preventDefault()

        // 檢查是否為內部路由連結（格式：#route:/xxx）
        if (href?.startsWith('#route:')) {
          const route = href.replace('#route:', '')
          window.open(route, '_blank', 'noopener,noreferrer')
        }
        // 檢查是否為系統跳轉連結（格式：#system-xxx）
        else if (href?.startsWith('#system-')) {
          const systemName = decodeURIComponent(href.replace('#system-', ''))

          // 在 departmentPositions 中查找對應系統的 startIndex
          const currentDept = departmentPositions.find((dept) => dept.id === item.id)
          if (currentDept?.systems) {
            const targetSystem = currentDept.systems.find((sys) => sys.name === systemName)
            if (targetSystem) {
              carouselRef.current?.scrollToSlide?.(targetSystem.startIndex)
            }
          }
        } else if (href) {
          // 一般連結：在新視窗開啟
          window.open(href, '_blank', 'noopener,noreferrer')
        }
      }

      return (
        <MarkdownLink
          href={href}
          onClick={handleClick}
          {...props}
        >
          {children}
        </MarkdownLink>
      )
    },
    [item.id, departmentPositions, carouselRef]
  )

  return (
    <DetailsSection>
      <ProjectTitle>{item.title}</ProjectTitle>
      <ProjectDescription>
        <ReactMarkdown
          components={{
            strong: MarkdownStrong,
            p: MarkdownParagraph,
            ol: MarkdownOrderedList,
            ul: MarkdownUnorderedList,
            code: MarkdownCode,
            a: CustomLink
          }}
        >
          {item.dec}
        </ReactMarkdown>
      </ProjectDescription>

      {item.techStack && item.techStack.length > 0 && (
        <TechStackSection>
          <TechStackTitle>技術棧</TechStackTitle>
          <TechChipsContainer>
            {item.techStack.map((tech, index) => {
              // 支援 string 或 { name, icon } 格式
              const techName = typeof tech === 'string' ? tech : tech.name
              const techIcon = typeof tech === 'object' ? tech.icon : null

              return (
                <StyledTechChip
                  key={index}
                  label={techName}
                  icon={
                    techIcon ? (
                      <Icon
                        icon={techIcon}
                        width={20}
                      />
                    ) : undefined
                  }
                />
              )
            })}
          </TechChipsContainer>
        </TechStackSection>
      )}
    </DetailsSection>
  )
})
ItemDetails.displayName = 'ItemDetails'

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

//! =============== 5. 主要組件 ===============

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

  const handleDepartmentClick = useCallback((startIndex) => {
    carouselRef.current?.scrollToSlide?.(startIndex)
  }, [])

  // Guard Clause：提早返回空狀態
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
          <GalleryHeader
            title={config.pageTitle}
            subtitle={config.pageSubtitle}
          />

          <ContentGrid>
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

            <DetailsGridItem>
              <ItemDetails
                key={currentCategory.id}
                item={currentCategory}
                carouselRef={carouselRef}
                departmentPositions={departmentPositions}
              />
            </DetailsGridItem>
          </ContentGrid>

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

