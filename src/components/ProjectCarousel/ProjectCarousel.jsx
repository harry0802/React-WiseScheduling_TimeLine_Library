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

  // 滾動進度處理
  const onScroll = useCallback(() => {
    if (!emblaApi) return
    const progress = emblaApi.scrollProgress()

    // 🧠 直接更新 DOM（即時更新，不觸發 React 重渲染）
    if (progressRef.current) {
      progressRef.current.style.height = `${progress * 100}%`
    }

    // 通知父組件進度變化
    onProgressChange?.(progress)
  }, [emblaApi, onProgressChange])

  // 投影片選擇處理
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()

    // 通知父組件投影片切換
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
// ✨ 優化：將投影片渲染邏輯獨立出來，使其成為一個純粹的 UI 組件。

/**
 * @param {{ slides: CarouselSlide[] }} props
 */
const CarouselSlides = React.memo(({ slides }) => {
  return (
    <>
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
    </>
  )
})
CarouselSlides.displayName = 'CarouselSlides'

//! =============== 4. 子組件 (ProgressBarMarkers) ===============
// ✨ 優化：將複雜的「標記」渲染邏輯獨立出來。

/**
 * @param {object} props
 * @param {Array} props.departmentPositions
 * @param {number} props.currentSlideIndex
 * @param {Function} props.onMarkerClick
 */
const ProgressBarMarkers = React.memo(
  ({ departmentPositions, currentSlideIndex, onMarkerClick }) => {
    return (
      <>
        {departmentPositions.map((dept) => (
          <DepartmentMarkerItem
            key={dept.id}
            department={dept}
            currentSlideIndex={currentSlideIndex}
            onMarkerClick={onMarkerClick}
          />
        ))}
      </>
    )
  }
)
ProgressBarMarkers.displayName = 'ProgressBarMarkers'

//! =============== 5. 子組件 (DepartmentMarkerItem) ===============
// ✨ 優化：將「單一部門及其所有系統」的渲染和邏輯計算（活躍、重疊）
//    封裝到最小單位，大幅降低主組件的認知負荷。

/**
 * @param {object} props
 * @param {object} props.department
 * @param {number} props.currentSlideIndex
 * @param {Function} props.onMarkerClick
 */
const DepartmentMarkerItem = React.memo(
  ({ department, currentSlideIndex, onMarkerClick }) => {
    // 💡 1. 抓取第一個系統和「後續」的系統
    const firstSystem = department.systems?.[0]
    const subsequentSystems = department.systems.slice(1) // 從索引 1 開始抓取

    // 如果這個部門沒有系統（理論上不該發生），則不渲染
    if (!firstSystem) {
      return null
    }

    // 💡 2. 部門標記的「活躍」狀態，現在由「整個部門」的範圍決定
    const isDeptActive =
      currentSlideIndex >= department.startIndex &&
      currentSlideIndex < department.startIndex + department.imageCount

    return (
      <React.Fragment>
        {/* 部門標記 (合併了第一個系統) */}
        <DepartmentMarker
          style={{ top: `${department.percentage}%` }}
          onClick={() => onMarkerClick?.(department.startIndex)}
        >
          <MarkerLine
            className={`marker-line ${isDeptActive ? 'active' : ''}`}
          />
          <MarkerLabelGroup>
            {/* 顯示部門名稱 */}
            <MarkerLabel
              className={`marker-label ${isDeptActive ? 'active' : ''}`}
            >
              {department.shortTitle}
            </MarkerLabel>

            {/* 💡 3. 直接在下方顯示「第一個系統」的名稱 */}
            <SystemLabel
              className={`system-label ${isDeptActive ? 'active' : ''}`}
              style={{
                position: 'relative', // 覆蓋掉原本的 absolute
                opacity: 0.8, // 讓它看起來像副標題
                marginLeft: '0.5rem' // 稍微縮排
                // 您可能需要根據 .styles 檔案微調樣式
              }}
            >
              {firstSystem.name}
            </SystemLabel>
          </MarkerLabelGroup>
        </DepartmentMarker>

        {/* 💡 4. 系統子標記 (只渲染「後續」的系統) */}
        {subsequentSystems.map((system, sysIndex) => {
          const isSystemActive =
            currentSlideIndex >= system.startIndex &&
            currentSlideIndex < system.startIndex + system.imageCount

          // 🧠 關鍵：
          // 因為我們跳過了第一個系統，
          // 這裡的 system.percentage 絕對不會和 department.percentage 相同。
          // 所以「不再需要」isNearDepartment 和 adjustedTop 的重疊計算！

          return (
            <SystemMarker
              key={`${department.id}-sys-${sysIndex + 1}`} // +1 保持 key 的獨特性
              style={{ top: `${system.percentage}%` }} // 直接使用 percentage
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
//! =============== 6. 主要組件 (ProjectCarousel) ===============
// ✨ 優化：主組件現在非常乾淨，只負責「組合」和「傳遞 props」。
//    其職責是：1. 呼叫 Hook。 2. 處理空狀態。 3. 組合子組件。

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
    // 1. 呼叫 Hook
    const { emblaRef, progressRef } = useProjectCarousel(
      ref,
      onProgressChange,
      onSlideChange
    )

    // 2. 處理空狀態 (Guard Clause，提早返回)
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

    // 3. 組合子組件
    return (
      <CarouselContainer>
        <Viewport ref={emblaRef}>
          <Container>
            <CarouselSlides slides={slides} />
          </Container>
        </Viewport>

        {/* 內建進度條 */}
        {showProgress && (
          <ProgressBarContainer>
            <ProgressBarFill ref={progressRef} />
            <ProgressBarMarkers
              departmentPositions={departmentPositions}
              currentSlideIndex={currentSlideIndex}
              onMarkerClick={onDepartmentClick}
            />
          </ProgressBarContainer>
        )}
      </CarouselContainer>
    )
  }
)

ProjectCarousel.displayName = 'ProjectCarousel'

export default ProjectCarousel

