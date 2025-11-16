import styled from '@emotion/styled'
import { colors } from '../../designTokens'

//! =============== Carousel 容器樣式 ===============

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* 💡 修正：恢復為 visible，讓桌面版標籤能正常顯示 */
  overflow: visible;
  padding-right: 3rem; /* 桌面端的標籤空間 */

  /* 🎯 響應式：平板（900px）以下，標籤隱藏，縮小 padding */
  @media (max-width: 900px) {
    padding-right: 1.5rem; /* 只留下進度條和線條的空間 */
  }
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
    object-fit: fill;
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
  right: 48px;
  top: 0;
  height: 100%;
  width: auto;
  min-width: 2px;
  z-index: 11;

  @media (max-width: 1199px) {
    right: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15),
      rgba(21, 147, 235, 0.2),
      rgba(255, 255, 255, 0.15)
    );
  }
`

export const ProgressBarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    ${colors.accent.primaryLight},
    ${colors.accent.primary},
    ${colors.accent.primaryLight}
  );
  box-shadow:
    0 0 16px ${colors.accent.primary}ff,
    0 0 32px ${colors.accent.primary}99,
    0 0 48px ${colors.accent.primary}66;
  transition: height 0.1s ease-out;
`

//! =============== 共用標記樣式 ===============

// 基礎標記樣式（DRY 原則：提取共用樣式）
const BaseMarker = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
`

//! =============== 部門標記樣式 ===============

export const DepartmentMarker = styled(BaseMarker)`
  transform: translateY(-50%);
  z-index: 12;

  &:hover .marker-line {
    width: 14px;
    box-shadow:
      0 0 8px ${colors.accent.primaryLight}ff,
      0 0 16px ${colors.accent.primary}cc;
  }

  &:hover .marker-label,
  &:hover .marker-system {
    opacity: 1;
    color: ${colors.text.inverse};
  }
`

export const MarkerLine = styled.div`
  width: 8px;
  height: 2px;
  background: linear-gradient(
    to right,
    ${colors.accent.primary},
    ${colors.accent.primaryLight}
  );
  opacity: 0.8;
  transition: all 0.2s ease;

  &.active {
    width: 12px;
    height: 3px;
    opacity: 1;
    background: ${colors.accent.primaryLight};
    box-shadow:
      0 0 8px ${colors.accent.primaryLight}ff,
      0 0 16px ${colors.accent.primary}cc;
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

  /* 🎯 響應式：在 900px 以下統一隱藏文字標籤 */
  @media (max-width: 900px) {
    display: none;
  }
`

export const MarkerLabel = styled.div`
  font-size: 0.7rem;
  color: ${colors.text.inverseSecondary};
  font-weight: 400;
  letter-spacing: 0.05em;
  opacity: 0.85;
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;
  line-height: 1.2;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);

  &.active {
    font-weight: 600;
    opacity: 1;
    font-size: 0.75rem;
    color: ${colors.text.inverse};
    text-shadow:
      0 0 8px ${colors.accent.primaryLight}99,
      0 2px 4px rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }
`

export const MarkerSystem = styled.div`
  font-size: 0.55rem;
  color: ${colors.accent.primary};
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
`

//! =============== 系統子標記樣式 ===============

export const SystemMarker = styled(BaseMarker)`
  z-index: 11;

  &:hover .system-line {
    width: 7px;
    box-shadow:
      0 0 6px ${colors.accent.primaryLight}cc,
      0 0 12px ${colors.accent.primary}66;
  }

  &:hover .system-label {
    opacity: 0.9;
    color: ${colors.text.inverseSecondary};
  }
`

export const SystemLine = styled.div`
  width: 5px;
  height: 1px;
  background: linear-gradient(
    to right,
    ${colors.accent.primary}99,
    ${colors.accent.primaryLight}99
  );
  opacity: 0.6;
  transition: all 0.2s ease;

  &.active {
    width: 6px;
    height: 1.5px;
    opacity: 0.9;
    background: ${colors.accent.primaryLight};
    box-shadow:
      0 0 6px ${colors.accent.primaryLight}cc,
      0 0 12px ${colors.accent.primary}66;
  }
`

export const SystemLabelGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4px;

  /* 🎯 響應式：在 900px 以下統一隱藏文字標籤 */
  @media (max-width: 900px) {
    display: none;
  }
`

export const SystemLabel = styled.div`
  font-size: 0.5rem;
  color: ${colors.accent.primary};
  font-weight: 300;
  letter-spacing: 0.02em;
  opacity: 0.5;
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;
  line-height: 1.2;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

  &.active {
    opacity: 0.95;
    font-size: 0.75rem;
    font-weight: 400;
    color: ${colors.text.inverse};
    text-shadow:
      0 0 6px ${colors.accent.primaryLight}66,
      0 2px 4px rgba(0, 0, 0, 0.7);
  }
`

