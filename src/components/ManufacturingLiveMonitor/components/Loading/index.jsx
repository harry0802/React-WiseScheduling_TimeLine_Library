import { Loading } from "@iimm/data-view-react";
import styled from "styled-components";

//! =============== 1. 設定與常量 ===============
//* 容器樣式設定
const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 透明黑色背景 */
  background-color: rgba(0, 0, 0, 0.3);
`;
const LoadingState = styled(Loading)`
  color: #fff;
`;

/**
 * @function LoadingWrapper
 * @description DataV-React Loading 組件的封裝，支援全螢幕顯示
 * @param {Object} props - 組件屬性
 * @param {boolean} props.fullScreen - 是否顯示為全螢幕
 * @returns {React.ReactNode} - 渲染的加載組件
 */
function LoadingWrapper({ children }) {
  // 如果是全螢幕模式，則使用固定定位的容器包裹

  return (
    <FullScreenContainer>
      <LoadingState>{children}</LoadingState>
    </FullScreenContainer>
  );
}

export default LoadingWrapper;
