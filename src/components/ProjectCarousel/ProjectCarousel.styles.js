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
  width: auto;
  min-width: 2px;
  z-index: 11;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: ${colors.accent.gold}30;
  }
`

export const ProgressBarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  background-color: ${colors.accent.gold};
  box-shadow: 0 0 20px ${colors.accent.gold}80;
  transition: height 0.1s ease-out;
`

//! =============== 部門標記樣式 ===============

export const DepartmentMarker = styled.div`
  position: absolute;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 12;
  transition: all 0.2s ease;

  &:hover .marker-line {
    width: 14px;
    box-shadow: 0 0 12px ${colors.accent.gold}cc;
  }

  &:hover .marker-label,
  &:hover .marker-system {
    opacity: 1;
  }
`

export const MarkerLine = styled.div`
  width: 8px;
  height: 2px;
  background-color: ${colors.accent.gold};
  opacity: 0.6;
  transition: all 0.2s ease;

  &.active {
    width: 12px;
    height: 3px;
    opacity: 1;
    box-shadow: 0 0 8px ${colors.accent.gold}cc;
  }
`

export const MarkerLabelGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6px;
  gap: 2px;

  @media (max-width: 768px) {
    margin-left: 4px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`

export const MarkerLabel = styled.div`
  font-size: 0.7rem;
  color: ${colors.accent.gold};
  font-weight: 400;
  letter-spacing: 0.05em;
  opacity: 0.6;
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;
  line-height: 1.2;

  &.active {
    font-weight: 600;
    opacity: 1;
    font-size: 0.75rem;
  }

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }
`

export const MarkerSystem = styled.div`
  font-size: 0.55rem;
  color: ${colors.accent.gold};
  font-weight: 300;
  letter-spacing: 0.03em;
  opacity: 0.4;
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;
  line-height: 1.2;

  &.active {
    opacity: 0.6;
    font-size: 0.6rem;
  }

  @media (max-width: 768px) {
    font-size: 0.5rem;
  }

  @media (max-width: 900px) {
    display: none;
  }
`

//! =============== 系統子標記樣式 ===============

export const SystemMarker = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 11;
  transition: all 0.2s ease;

  &:hover .system-line {
    width: 7px;
    box-shadow: 0 0 8px ${colors.accent.gold}99;
  }

  &:hover .system-label {
    opacity: 0.8;
  }
`

export const SystemLine = styled.div`
  width: 5px;
  height: 1px;
  background-color: ${colors.accent.gold};
  opacity: 0.4;
  transition: all 0.2s ease;

  &.active {
    width: 6px;
    height: 1.5px;
    opacity: 0.7;
    box-shadow: 0 0 6px ${colors.accent.gold}99;
  }
`

export const SystemLabelGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4px;
`

export const SystemLabel = styled.div`
  font-size: 0.5rem;
  color: ${colors.accent.gold};
  font-weight: 300;
  letter-spacing: 0.02em;
  opacity: 0.35;
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;
  line-height: 1.2;

  &.active {
    opacity: 0.55;
    font-size: 0.55rem;
    font-weight: 400;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`

