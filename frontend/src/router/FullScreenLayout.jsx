import React from 'react'
import styled from 'styled-components'

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
`

/**
 * @function FullScreenLayout
 * @description 全屏佈局組件，專注於提供隔離的全屏容器
 * @param {Object} props - 組件屬性
 * @param {React.ReactNode} props.children - 子組件
 * @returns {React.ReactNode} - 佈局組件
 *
 * @notes
 * - 移除了內部的 ErrorBoundary，統一由父組件 ManufacturingLiveMonitor 管理
 * - 保持樣式隔離和全屏布局功能
 * - 簡化組件職責，專注於布局而非錯誤處理
 */
function FullScreenLayout({ children }) {
  return <IsolatedContainer>{children}</IsolatedContainer>
}

export default FullScreenLayout
