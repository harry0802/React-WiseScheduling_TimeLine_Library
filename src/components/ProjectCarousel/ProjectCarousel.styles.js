import styled from '@emotion/styled'
import { colors } from '../../designTokens'

//! =============== Carousel 容器樣式 ===============

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
  padding-right: 3rem;
`

export const Viewport = styled.div`
  overflow: hidden;
  height: 100%;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  -webkit-clip-path: polygon(
    2rem 0,
    calc(100% - 2rem) 0,
    100% 2rem,
    100% calc(100% - 2rem),
    calc(100% - 2rem) 100%,
    2rem 100%,
    0 calc(100% - 2rem),
    0 2rem
  );
  clip-path: polygon(
    2rem 0,
    calc(100% - 2rem) 0,
    100% 2rem,
    100% calc(100% - 2rem),
    calc(100% - 2rem) 100%,
    2rem 100%,
    0 calc(100% - 2rem),
    0 2rem
  );
`

export const Container = styled.div`
  height: 100%;
  /* embla automatically injects display: flex - don't add it manually */
`

export const Slide = styled.div`
  flex: 0 0 100%;
  min-height: 0;
  position: relative;
  height: 100%;
`

//! =============== 圖片容器樣式 ===============

export const ImageContainer = styled.div`
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
    object-fit: contain;
    /* aspect-ratio: 21/9; */
  }

  .placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.25rem;
    text-align: center;
    padding: 2rem;

    small {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.3);
    }
  }
`

//! =============== 進度條樣式 ===============

export const ProgressBarContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background-color: ${colors.accent.gold}30;
  z-index: 11;
`

export const ProgressBarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${colors.accent.gold};
  box-shadow: 0 0 20px ${colors.accent.gold}80;
  transition: height 0.1s ease-out;
`

