import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ErrorContainer = styled.div`
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadows.md};
`;

const ErrorTitle = styled.h2`
  color: ${(props) => props.theme.colors.error};
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  margin-bottom: 1.5rem;
`;

const RetryButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  margin-right: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background-color: #2a6265;
    text-decoration: none;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("組件錯誤:", error);
    console.error("錯誤資訊:", errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>組件發生錯誤</ErrorTitle>
          <ErrorMessage>
            {this.state.error?.message || "頁面載入時發生了問題。"}
          </ErrorMessage>
          <div>
            <RetryButton onClick={this.handleRetry}>重新嘗試</RetryButton>
            <HomeLink to="/">返回首頁</HomeLink>
          </div>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
