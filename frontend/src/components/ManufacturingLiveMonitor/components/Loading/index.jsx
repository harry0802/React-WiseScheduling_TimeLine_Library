import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

//! =============== 1. 動畫定義 ===============
//* 定義組件所需的關鍵幀動畫
const rotateSpinner = keyframes`
  0% {
    transform: rotateX(0) rotateY(0);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
`;

const pulseOpacity = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`;

const pulseText = keyframes`
  0%, 100% {
    opacity: 0.9;
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 25px rgba(69, 156, 255, 0.7);
  }
`;

const typeText = keyframes`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 0.6;
  }
`;

//! =============== 2. 樣式組件 ===============
//* 基礎布局層
const LoadingContainer = styled.div`
  /* 布局定位 */
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  /* 盒模型 */
  /* width: 100vw; */
  /* height: 100vh; */
  margin: 0;
  padding: 0;
  min-height: 400px;

  /* 視覺樣式 */
  background: rgba(4% 6% 10% / 0.95);

  /* 其他屬性 */
  overflow: hidden;
  isolation: isolate;
`;

const LoadingContent = styled.div`
  /* 布局定位 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  /* 盒模型 */
  padding: 2rem;
`;

//* 動效處理層
const Spinner = styled.div`
  /* 布局定位 */
  position: relative;

  /* 盒模型 */
  width: 80px;
  height: 80px;
  margin-bottom: 2rem;

  /* CSS3特效 */
  transform-style: preserve-3d;
  perspective: 500px;
  animation: ${rotateSpinner} 10s linear infinite;

  /* 響應式層 */
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-bottom: 1.5rem;
  }
`;

//* 狀態邏輯層
const Circle = styled.div`
  /* 布局定位 */
  position: absolute;
  top: 0;
  left: 0;

  /* 盒模型 */
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid transparent;

  /* CSS3特效 */
  animation: ${pulseOpacity} 2s ease-in-out infinite;

  /* 根據索引不同應用不同樣式 */
  &:nth-child(1) {
    border-top-color: #4fc3f7;
    animation-delay: 0s;
    transform: rotateX(0deg) rotateY(0deg);
  }

  &:nth-child(2) {
    border-right-color: #2196f3;
    animation-delay: 0.5s;
    transform: rotateX(90deg) rotateY(0deg);
  }

  &:nth-child(3) {
    border-bottom-color: #1976d2;
    animation-delay: 1s;
    transform: rotateX(0deg) rotateY(90deg);
  }

  &:nth-child(4) {
    border-left-color: #0d47a1;
    animation-delay: 1.5s;
    transform: rotateX(45deg) rotateY(45deg);
  }
`;

const LoadingText = styled.div`
  /* 視覺樣式 */
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(100% 100% 100% / 0.9);
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
  text-shadow: 0 0 20px rgba(69, 156, 255, 0.5);

  /* CSS3特效 */
  animation: ${pulseText} 2s ease-in-out infinite;

  /* 響應式層 */
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const InfoText = styled.div`
  /* 視覺樣式 */
  font-size: 0.9rem;
  color: rgba(100% 100% 100% / 0.6);
  letter-spacing: 0.02em;

  /* CSS3特效 */
  animation: ${typeText} 3s steps(40, end) 1;
`;

/**
 * @function LoadingWrapper
 * @description 科技感的載入中組件，顯示在子頁面載入時
 * @param {Object} props - 組件屬性
 * @param {Node} props.children - 載入文字或內容
 * @returns {JSX.Element} 渲染的載入組件
 */
function LoadingWrapper({ children = "載入中..." }) {
  return (
    <LoadingContainer>
      <LoadingContent>
        <Spinner>
          <Circle />
          <Circle />
          <Circle />
          <Circle />
        </Spinner>
        {children && <LoadingText>{children}</LoadingText>}
        <InfoText>正在建立安全連接...</InfoText>
      </LoadingContent>
    </LoadingContainer>
  );
}

export default LoadingWrapper;
