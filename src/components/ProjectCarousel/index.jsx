import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Viewport = styled.div`
  overflow: hidden;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.lg};
`;

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 8px;
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
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.fontSizes.lg};
    text-align: center;
    padding: 2rem;
  }
`;

const DescriptionBox = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 8px;
  border-left: 4px solid ${props => props.theme.colors.primary};
  box-shadow: ${props => props.theme.shadows.md};

  h4 {
    color: ${props => props.theme.colors.primary};
    margin: 0 0 1rem 0;
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 600;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.8;
    margin: 0;
    white-space: pre-line;
  }

  .placeholder-text {
    color: ${props => props.theme.colors.textSecondary};
    font-style: italic;
    opacity: 0.7;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.primary};
  background: ${props => props.theme.colors.cardBackground};
  color: ${props => props.theme.colors.primary};
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props =>
    props.$active
      ? props.theme.colors.primary
      : props.theme.colors.primary + '40'
  };
  cursor: pointer;
  padding: 0;
`;

const CurrentSlideIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 6px;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  z-index: 10;
`;

const ProjectCarousel = ({ slides = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

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
  ];

  const displaySlides = slides.length > 0 ? slides : defaultSlides;

  return (
    <CarouselContainer>
      <Viewport ref={emblaRef}>
        <Container>
          {displaySlides.map((slide, index) => {
            // 支援彈性屬性名稱：pic/image 和 dec/description
            const imageUrl = slide.pic || slide.image || null;
            const description = slide.dec || slide.description || null;
            const title = slide.title || `專案截圖 ${index + 1}`;

            return (
              <Slide key={slide.id || index}>
                <ImageContainer>
                  {imageUrl ? (
                    <img src={imageUrl} alt={title} />
                  ) : (
                    <div className="placeholder">
                      📸 圖片預留位置<br/>
                      <small>請新增專案截圖</small>
                    </div>
                  )}
                  <CurrentSlideIndicator>
                    {index + 1} / {displaySlides.length}
                  </CurrentSlideIndicator>
                </ImageContainer>

                <DescriptionBox>
                  <h4>{title}</h4>
                  {description ? (
                    <p>{description}</p>
                  ) : (
                    <p className="placeholder-text">
                      ※ 此處預留給您填寫說明文字
                    </p>
                  )}
                </DescriptionBox>
              </Slide>
            );
          })}
        </Container>
      </Viewport>

      <Controls>
        <Button onClick={scrollPrev} disabled={!canScrollPrev} title="上一張">
          ←
        </Button>

        <Dots>
          {displaySlides.map((_, index) => (
            <Dot
              key={index}
              $active={index === selectedIndex}
              onClick={() => scrollTo(index)}
              title={`前往第 ${index + 1} 張`}
            />
          ))}
        </Dots>

        <Button onClick={scrollNext} disabled={!canScrollNext} title="下一張">
          →
        </Button>
      </Controls>
    </CarouselContainer>
  );
};

export default ProjectCarousel;
