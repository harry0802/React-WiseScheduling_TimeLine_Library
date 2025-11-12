import React, { useCallback, useEffect, useRef, useImperativeHandle } from 'react'
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
  MarkerLabel
} from './ProjectCarousel.styles'

//! =============== 類型定義 ===============

/**
 * @typedef {object} CarouselSlide
 * @property {number} id - 投影片 ID
 * @property {string | null} pic - 圖片路徑（也支援 image 屬性名）
 * @property {string} [dec] - 描述文字（也支援 description 屬性名）
 * @property {string} [title] - 標題
 */

//! =============== 主要組件 ===============

/**
 * 專案輪播組件
 * 🎯 支援垂直滾動、滑鼠滾輪操作、進度條顯示
 *
 * @param {object} props
 * @param {CarouselSlide[]} props.slides - 投影片資料陣列（從 page 傳入）
 * @param {(progress: number) => void} [props.onProgressChange] - 滾動進度回調 (0-1)
 * @param {(index: number) => void} [props.onSlideChange] - 投影片切換回調
 * @param {boolean} [props.showProgress=true] - 是否顯示內建進度條
 * @param {Array} [props.departmentPositions] - 部門位置資訊陣列
 * @param {number} [props.currentSlideIndex] - 當前投影片索引
 * @param {Function} [props.onDepartmentClick] - 部門點擊回調
 */
const ProjectCarousel = React.forwardRef(({
  slides = [],
  onProgressChange = null,
  onSlideChange = null,
  showProgress = true,
  departmentPositions = [],
  currentSlideIndex = 0,
  onDepartmentClick = null
}, ref) => {
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
  useImperativeHandle(ref, () => ({
    scrollToSlide: (index) => {
      if (emblaApi) {
        emblaApi.scrollTo(index, true) // true = 使用平滑動畫
      }
    }
  }), [emblaApi])

  // 滾動進度處理
  const onScroll = useCallback(() => {
    if (!emblaApi) return
    const progress = emblaApi.scrollProgress()

    // 直接更新 DOM（即時更新，不觸發 React 重渲染）
    if (progressRef.current) {
      progressRef.current.style.height = `${progress * 100}%`
    }

    // 通知父組件進度變化
    if (onProgressChange) {
      onProgressChange(progress)
    }
  }, [emblaApi, onProgressChange])

  // 投影片選擇處理
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()

    // 通知父組件投影片切換
    if (onSlideChange) {
      onSlideChange(newIndex)
    }
  }, [emblaApi, onSlideChange])

  useEffect(() => {
    if (!emblaApi) return

    // 初始化調用
    onSelect()
    onScroll()

    // 監聽事件
    emblaApi.on('select', onSelect)
    emblaApi.on('scroll', onScroll)
    emblaApi.on('settle', onScroll)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('scroll', onScroll)
      emblaApi.off('settle', onScroll)
    }
  }, [emblaApi, onSelect, onScroll])

  // 如果沒有提供 slides，顯示空狀態
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
          {slides.map((slide, index) => {
            // 支援彈性屬性名稱：pic/image 和 dec/description
            const imageUrl = slide.pic || slide.image || null
            const description = slide.dec || slide.description || null

            return (
              <Slide key={slide.id || index}>
                <ImageContainer>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={description || '專案截圖'}
                    />
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
        </Container>
      </Viewport>

      {/* 內建進度條 */}
      {showProgress && (
        <ProgressBarContainer>
          <ProgressBarFill ref={progressRef} />

          {/* 部門刻度標記 */}
          {departmentPositions.map((dept) => {
            const isActive = currentSlideIndex >= dept.startIndex &&
                           currentSlideIndex < dept.startIndex + dept.imageCount

            return (
              <DepartmentMarker
                key={dept.id}
                style={{ top: `${dept.percentage}%` }}
                onClick={() => onDepartmentClick?.(dept.startIndex)}
              >
                <MarkerLine className={`marker-line ${isActive ? 'active' : ''}`} />
                <MarkerLabel className={`marker-label ${isActive ? 'active' : ''}`}>
                  {dept.shortTitle}
                </MarkerLabel>
              </DepartmentMarker>
            )
          })}
        </ProgressBarContainer>
      )}
    </CarouselContainer>
  )
})

ProjectCarousel.displayName = 'ProjectCarousel'

export default ProjectCarousel

