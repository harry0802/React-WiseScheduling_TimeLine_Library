import { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import styled from 'styled-components'

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Viewport = styled.div`
  overflow: hidden;
  height: 100%;
  position: relative;
  padding-right: 3rem;
  z-index: 1;
`

const Container = styled.div`
  height: 100%;
  /* embla automatically injects display: flex - don't add it manually */
`

const Slide = styled.div`
  flex: 0 0 100%;
  min-height: 0;
  position: relative;
  height: 100%;
`

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: ${(props) => props.theme.fontSizes.lg};
    text-align: center;
    padding: 2rem;
  }
`

const ProgressBarContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background-color: rgba(212, 175, 55, 0.3);
  z-index: 11;
`

const ProgressBarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #d4af37;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
  transition: height 0.1s ease-out;
`

const ProjectCarousel = ({
  slides = [],
  onProgressChange = null, // Callback for scroll progress (0-1)
  onSlideChange = null, // Callback for slide index change
  showProgress = true // Whether to show the built-in progress bar
}) => {
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

  const onScroll = useCallback(() => {
    if (!emblaApi) return
    const progress = emblaApi.scrollProgress()

    // Update progress bar directly via DOM (instant, no React re-render)
    if (progressRef.current) {
      progressRef.current.style.height = `${progress * 100}%`
    }

    // Notify parent component of progress change
    if (onProgressChange) {
      onProgressChange(progress)
    }
  }, [emblaApi, onProgressChange])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()

    // Notify parent component of slide change
    if (onSlideChange) {
      onSlideChange(newIndex)
    }
  }, [emblaApi, onSlideChange])

  useEffect(() => {
    if (!emblaApi) return

    // Initial calls
    onSelect()
    onScroll()

    // Listen to necessary events only
    emblaApi.on('select', onSelect)
    emblaApi.on('scroll', onScroll) // Triggered by WheelGestures, dragging, etc.
    emblaApi.on('settle', onScroll) // Ensures final accurate value after scroll ends

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('scroll', onScroll)
      emblaApi.off('settle', onScroll)
    }
  }, [emblaApi, onSelect, onScroll])

  // 如果沒有提供 slides，使用預設的佔位內容
  const defaultSlides = [
    {
      id: 1,
      pic: null,
      dec: '此處預留給您新增專案截圖\n\n請將圖片路徑加入 slides 資料中，並撰寫對應的說明文字。',
      title: '專案截圖 1'
    },
    {
      id: 2,
      pic: null,
      dec: '此處預留給您新增專案截圖\n\n請將圖片路徑加入 slides 資料中，並撰寫對應的說明文字。',
      title: '專案截圖 2'
    },
    {
      id: 3,
      pic: null,
      dec: '此處預留給您新增專案截圖\n\n請將圖片路徑加入 slides 資料中，並撰寫對應的說明文字。',
      title: '專案截圖 3'
    }
  ]

  const displaySlides = slides.length > 0 ? slides : defaultSlides

  return (
    <CarouselContainer>
      <Viewport ref={emblaRef}>
        <Container>
          {displaySlides.map((slide, index) => {
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

      {/* Native Embla Progress Bar */}
      {showProgress && (
        <ProgressBarContainer>
          <ProgressBarFill ref={progressRef} />
        </ProgressBarContainer>
      )}
    </CarouselContainer>
  )
}

export default ProjectCarousel

