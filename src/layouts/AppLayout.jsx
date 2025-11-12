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
  background-color: #1a1a1a;
`

const Content = styled.div`
  flex: 1;
  background-color: #1a1a1a;
`

const Footer = styled.footer`
  background-color: #2c2c2c;
  color: #f5f5f5;
  padding: ${(props) => props.theme.spacing.md};
  text-align: center;
  border-top: 1px solid #d4af37;
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

