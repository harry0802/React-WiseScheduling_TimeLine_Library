import { FullScreenContainer } from '@iimm/data-view-react'
import styled from 'styled-components'
import React, { useState } from 'react'
import DataVHeader from './components/DataVHeader'
import { Outlet, useLocation } from 'react-router-dom'
import FullScreenLayout from '../../layouts/FullScreenLayout'
import { useHeaderNameStore } from './slice/LayoutSlice'
import ErrorBoundary from '../ErrorBoundary'

//! =============== 1. 樣式定義 ===============
//* 主容器：負責整體布局和背景
const Container = styled.div`
  /* 布局定位 */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  /* 盒模型 */
  box-sizing: border-box;
  /* 視覺樣式 */
  background-color: #061639;
`

//* 內容區域：負責卡片的彈性布局
const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: ${(props) => (props.$isEntry ? '0' : '0 1.25rem')};
  box-sizing: border-box;
`

//! =============== 2. 核心功能 ===============
/**
 * @function setupFullScreenMode
 * @description 設置臨時全屏模式，確保在渲染前調整樣式
 * @returns {Function} 清理函數，用於在組件卸載時移除臨時樣式
 */
function setupFullScreenMode() {
  // 創建臨時樣式標籤
  const style = document.createElement('style')

  style.textContent = `
    /* 🧠 只在組件渲染時應用，不影響全局 */
    body.temp-fullscreen-mode {
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
    }
  `
  document.head.appendChild(style)

  // 添加臨時類名
  document.body.classList.add('temp-fullscreen-mode')

  // 返回清理函數
  return () => {
    document.body.classList.remove('temp-fullscreen-mode')
    document.head.removeChild(style)
  }
}

/**
 * @function isEntryPath
 * @description 檢查當前路徑是否為入口頁面或其子路徑
 * @param {string} pathname - 當前路徑
 * @returns {boolean} 如果是入口頁面或其子路徑返回 true，否則返回 false
 */
const isEntryPath = (pathname) => {
  const entryPaths = [
    '/ManufacturingLiveMonitor',
    '/FactoryPerformanceDashboard'
  ]
  // 檢查路徑是否以任一入口路徑開頭
  return entryPaths.some((path) => pathname.startsWith(path))
}

/**
 * @function ManufacturingLiveMonitor
 * @description 製造監控儀表板主組件，顯示各種生產數據
 */
function ManufacturingLiveMonitor() {
  const { headerName } = useHeaderNameStore()
  const location = useLocation()
  const [errorResetKey, setErrorResetKey] = useState(0)

  // 使用 useLayoutEffect 確保在 DOM 渲染前設置全屏模式
  React.useLayoutEffect(() => {
    return setupFullScreenMode()
  }, [])

  // 錯誤重置處理函數
  const handleErrorReset = () => {
    console.log('ManufacturingLiveMonitor 錯誤邊界已重置')
    // 可以在這裡添加額外的重置邏輯，如清理狀態、重新獲取數據等
  }

  return (
    <ErrorBoundary
      resetKey={errorResetKey}
      onReset={handleErrorReset}
    >
      <FullScreenLayout>
        <FullScreenContainer>
          <Container>
            {!isEntryPath(location.pathname) && (
              <DataVHeader title={headerName} />
            )}
            <Main $isEntry={isEntryPath(location.pathname)}>
              <Outlet />
            </Main>
          </Container>
        </FullScreenContainer>
      </FullScreenLayout>
    </ErrorBoundary>
  )
}

export default ManufacturingLiveMonitor

