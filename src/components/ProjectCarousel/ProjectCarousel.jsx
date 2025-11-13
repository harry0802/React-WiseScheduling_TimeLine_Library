import React, {
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle
} from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import {
  CarouselContainer,
  Viewport,
  Container,
  Slide,
  ImageContainer,
  ProgressBarContainer,
  ProgressBarFill,
  DepartmentMarker,
  MarkerLine,
  MarkerLabelGroup,
  MarkerLabel,
  SystemMarker,
  SystemLine,
  SystemLabelGroup,
  SystemLabel
} from './ProjectCarousel.styles'

//! =============== 1. 類型定義 ===============

/**
 * @typedef {object} CarouselSlide
 * @property {number} id - 投影片 ID
 * @property {string | null} pic - 圖片路徑（也支援 image 屬性名）
 * @property {string} [dec] - 描述文字（也支援 description 屬性名）
 * @property {string} [title] - 標題
 */

//! =============== 2. 核心 Hook (useProjectCarousel) ===============
// 💡 關鍵決策:將所有輪播相關的邏輯（初始化、事件監聽、API 暴露）
//    封裝到 Custom Hook 中，讓組件只關心 UI 渲染。

/**
 * 專案輪播的核心邏輯 Hook
 * @param {React.RefObject} externalRef - 用於 useImperativeHandle 的 ref
 * @param {(progress: number) => void} [onProgressChange] - 進度回調
 * @param {(index: number) => void} [onSlideChange] - 索引變化回調
 * @returns {{
 * emblaRef: React.RefObject,
 * progressRef: React.RefObject<HTMLDivElement>
 * }}
 */
function useProjectCarousel(externalRef, onProgressChange, onSlideChange) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: 'y',
      loop: false,
      dragFree: true,
      containScroll: 'trimSnaps',
      skipSnaps: false
    },
    [WheelGesturesPlugin({ forceWheelAxis: 'y' })]
  )

  const progressRef = useRef(null)

  // 暴露 scrollToSlide 方法給父組件
  useImperativeHandle(
    externalRef,
    () => ({
      scrollToSlide: (index) => {
        emblaApi?.scrollTo(index, true) // true = 使用平滑動畫
      }
    }),
    [emblaApi]
  )

  // 🧠 滾動進度處理：直接更新 DOM 避免觸發 React 重渲染，提升性能
  const onScroll = useCallback(() => {
    if (!emblaApi) return
    const progress = emblaApi.scrollProgress()

    if (progressRef.current) {
      progressRef.current.style.height = `${progress * 100}%`
    }

    onProgressChange?.(progress)
  }, [emblaApi, onProgressChange])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()
    onSlideChange?.(newIndex)
  }, [emblaApi, onSlideChange])

  // 綁定事件
  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    onScroll()

    emblaApi.on('select', onSelect)
    emblaApi.on('scroll', onScroll)
    emblaApi.on('settle', onScroll)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('scroll', onScroll)
      emblaApi.off('settle', onScroll)
    }
  }, [emblaApi, onSelect, onScroll])

  return { emblaRef, progressRef }
}

//! =============== 3. 子組件 (CarouselSlides) ===============

/**
 * 投影片渲染組件（純 UI 組件）
 * @param {{ slides: CarouselSlide[] }} props
 */
const CarouselSlides = React.memo(({ slides }) => {
  return (
    <>
      {slides.map((slide, index) => {
        const imageUrl = slide.pic || slide.image || null
        const description = slide.dec || slide.description || null

        return (
          <Slide key={slide.id || index}>
            <ImageContainer>
              {imageUrl ? (
                <img src={imageUrl} alt={description || '專案截圖'} />
              ) : (
                <div className='placeholder'>
                  📸 圖片預留位置
                  <br />
                  <small>請新增專案截圖</small>
                </div>
              )}
            </ImageContainer>
          </Slide>
        )
      })}
    </>
  )
})
CarouselSlides.displayName = 'CarouselSlides'

//! =============== 4. 子組件 (DepartmentMarkerItem) ===============

/**
 * 部門標記項目組件
 * 💡 設計決策：第一個系統合併到部門標記中顯示，避免標記重疊
 *
 * @param {object} props
 * @param {object} props.department - 部門數據
 * @param {number} props.currentSlideIndex - 當前投影片索引
 * @param {Function} props.onMarkerClick - 標記點擊回調
 */
const DepartmentMarkerItem = React.memo(
  ({ department, currentSlideIndex, onMarkerClick }) => {
    const firstSystem = department.systems?.[0]
    const subsequentSystems = department.systems?.slice(1) || []

    if (!firstSystem) return null

    const isDeptActive =
      currentSlideIndex >= department.startIndex &&
      currentSlideIndex < department.startIndex + department.imageCount

    return (
      <React.Fragment>
        <DepartmentMarker
          style={{ top: `${department.percentage}%` }}
          onClick={() => onMarkerClick?.(department.startIndex)}
        >
          <MarkerLine
            className={`marker-line ${isDeptActive ? 'active' : ''}`}
          />
          <MarkerLabelGroup>
            <MarkerLabel
              className={`marker-label ${isDeptActive ? 'active' : ''}`}
            >
              {department.shortTitle}
            </MarkerLabel>
            <SystemLabel
              className={`system-label ${isDeptActive ? 'active' : ''}`}
              style={{
                position: 'relative',
                opacity: 0.8,
                marginLeft: '0.5rem'
              }}
            >
              {firstSystem.name}
            </SystemLabel>
          </MarkerLabelGroup>
        </DepartmentMarker>

        {/* 後續系統標記（無重疊問題） */}
        {subsequentSystems.map((system, sysIndex) => {
          const isSystemActive =
            currentSlideIndex >= system.startIndex &&
            currentSlideIndex < system.startIndex + system.imageCount

          return (
            <SystemMarker
              key={`${department.id}-sys-${sysIndex + 1}`}
              style={{ top: `${system.percentage}%` }}
              onClick={() => onMarkerClick?.(system.startIndex)}
            >
              <SystemLine
                className={`system-line ${isSystemActive ? 'active' : ''}`}
              />
              <SystemLabelGroup>
                <SystemLabel
                  className={`system-label ${isSystemActive ? 'active' : ''}`}
                >
                  {system.name}
                </SystemLabel>
              </SystemLabelGroup>
            </SystemMarker>
          )
        })}
      </React.Fragment>
    )
  }
)
DepartmentMarkerItem.displayName = 'DepartmentMarkerItem'
//! =============== 5. 主要組件 (ProjectCarousel) ===============

/**
 * 專案輪播組件
 * 🎯 支援垂直滾動、滑鼠滾輪操作、進度條顯示
 *
 * @param {object} props
 * @param {CarouselSlide[]} props.slides - 投影片資料陣列
 * @param {(progress: number) => void} [props.onProgressChange] - 滾動進度回調 (0-1)
 * @param {(index: number) => void} [props.onSlideChange] - 投影片切換回調
 * @param {boolean} [props.showProgress=true] - 是否顯示進度條
 * @param {Array} [props.departmentPositions] - 部門位置資訊陣列
 * @param {number} [props.currentSlideIndex] - 當前投影片索引
 * @param {Function} [props.onDepartmentClick] - 部門點擊回調
 */
const ProjectCarousel = React.forwardRef(
  (
    {
      slides = [],
      onProgressChange = null,
      onSlideChange = null,
      showProgress = true,
      departmentPositions = [],
      currentSlideIndex = 0,
      onDepartmentClick = null
    },
    ref
  ) => {
    const { emblaRef, progressRef } = useProjectCarousel(
      ref,
      onProgressChange,
      onSlideChange
    )

    // Guard Clause：提早返回空狀態
    if (!slides || slides.length === 0) {
      return (
        <CarouselContainer>
          <ImageContainer>
            <div className='placeholder'>
              📸 尚無圖片
              <br />
              <small>請在 page 中傳入 slides 陣列</small>
            </div>
          </ImageContainer>
        </CarouselContainer>
      )
    }

    return (
      <CarouselContainer>
        <Viewport ref={emblaRef}>
          <Container>
            <CarouselSlides slides={slides} />
          </Container>
        </Viewport>

        {showProgress && (
          <ProgressBarContainer>
            <ProgressBarFill ref={progressRef} />
            {departmentPositions.map((dept) => (
              <DepartmentMarkerItem
                key={dept.id}
                department={dept}
                currentSlideIndex={currentSlideIndex}
                onMarkerClick={onDepartmentClick}
              />
            ))}
          </ProgressBarContainer>
        )}
      </CarouselContainer>
    )
  }
)

ProjectCarousel.displayName = 'ProjectCarousel'

export default ProjectCarousel

