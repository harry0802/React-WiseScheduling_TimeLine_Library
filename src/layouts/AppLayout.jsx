import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import ErrorBoundary from '../components/ErrorBoundary'
import JokeWidget from '../components/JokeWidget'

// 使用 styled-components 定義應用程式容器樣式
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Content = styled.div`
  flex: 1;
`

const Footer = styled.footer`
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  padding: ${(props) => props.theme.spacing.md};
  text-align: center;
`

function AppLayout() {
  const location = useLocation()
  // 用於當路由變更時重置錯誤邊界
  const resetKey = location.pathname

  return (
    <AppContainer>
      <Navbar />
      <Content>
        <ErrorBoundary resetKey={resetKey}>
          <Outlet />
        </ErrorBoundary>
      </Content>
      <Footer>
        <p>© {new Date().getFullYear()} 時間軸專案. 保留所有權利.</p>
      </Footer>

      {/* 笑話小工具 */}
      <JokeWidget />
    </AppContainer>
  )
}

export default AppLayout

