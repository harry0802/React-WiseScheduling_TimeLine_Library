import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import ErrorBoundary from "../components/ErrorBoundary";

// 隔離容器，限制樣式影響範圍
const IsolatedContainer = styled.div`
  /* 基本設置確保佔滿視口 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000; /* 確保在最上層 */

  /* 重置可能繼承的樣式 */
  margin: 0;
  padding: 0;
  background-color: #fff; /* 或者你想要的背景色 */
  overflow: hidden;

  /* 防止影響其他元素 */
  isolation: isolate;
`;

function FullScreenLayout() {
  return (
    <IsolatedContainer>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </IsolatedContainer>
  );
}

export default FullScreenLayout;
