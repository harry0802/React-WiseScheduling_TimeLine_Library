import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import ErrorBoundary from '../components/ErrorBoundary';

// 使用 styled-components 定義應用程式容器樣式
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

const Footer = styled.footer`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  padding: ${props => props.theme.spacing.md};
  text-align: center;
`;

function AppLayout() {
  return (
    <AppContainer>
      <Navbar />
      <Content>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Content>
      <Footer>
        <p>© {new Date().getFullYear()} 時間軸專案. 保留所有權利.</p>
      </Footer>
    </AppContainer>
  );
}

export default AppLayout;
