import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
`;

const ErrorTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.error};
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    text-decoration: none;
  }
`;

function ErrorPage() {
  const error = useRouteError();
  // 安全地記錄錯誤，避免因null/undefined引起的stack讀取錯誤
  console.error("路由錯誤:", error ? (typeof error === 'object' ? error : { message: String(error) }) : "未知錯誤");
  
  return (
    <ErrorContainer>
      <ErrorTitle>啊喔！</ErrorTitle>
      <ErrorMessage>
        抱歉，發生了一些錯誤。
        {error?.status === 404 ? " 找不到您請求的頁面。" : " 請稍後再試。"}
      </ErrorMessage>
      <ErrorMessage>
        <i>{error?.statusText || error?.message || "未知錯誤"}</i>
      </ErrorMessage>
      <HomeLink to="/">返回首頁</HomeLink>
    </ErrorContainer>
  );
}

export default ErrorPage;
