import React, { useState, memo, useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchRandomJoke } from "../services/jokeService";

// 常量定義
const ANIMATION_DURATION = "0.3s";
const WIDGET_WIDTH = "300px";

//! =============== 樣式組件 ===============
// 將樣式拆分到自己的文件或集中在組件頂部
const JokeContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: ${WIDGET_WIDTH};
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadows.lg};
  padding: 1rem;
  z-index: 1000;
  transition: transform ${ANIMATION_DURATION} ease,
    opacity ${ANIMATION_DURATION} ease;
  transform: ${(props) =>
    props.$isVisible ? "translateY(0)" : "translateY(120%)"};
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  max-height: 80vh;
  overflow-y: auto;
`;

const JokeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.lightText};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`;

const JokeContent = styled.div`
  padding: 0.5rem 0;
`;

const JokeSetup = styled.p`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const JokePunchline = styled.p`
  color: ${(props) => props.theme.colors.secondary};
  font-weight: bold;
  margin-top: 0.5rem;
`;

const RefreshButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  width: 100%;
  margin-top: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  box-shadow: ${(props) => props.theme.shadows.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }
`;

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.colors.error};
  margin: 0;
  text-align: center;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  .dot {
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin: 0 3px;
    animation: bounce 1.5s infinite ease-in-out;
  }

  .dot:nth-child(1) {
    animation-delay: 0s;
  }
  .dot:nth-child(2) {
    animation-delay: 0.3s;
  }
  .dot:nth-child(3) {
    animation-delay: 0.6s;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

//! =============== 圖標組件 ===============
// 將SVG抽取為獨立組件
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="24"
    height="24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SmileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="24"
    height="24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

//! =============== 子組件 ===============
// 分離加載指示器為獨立組件
const Loader = memo(() => (
  <LoadingIndicator>
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </LoadingIndicator>
));
Loader.displayName = "Loader";

// 分離笑話顯示為獨立組件
const JokeDisplay = memo(({ joke }) => (
  <>
    <JokeSetup>{joke.setup}</JokeSetup>
    <JokePunchline>{joke.punchline}</JokePunchline>
  </>
));
JokeDisplay.displayName = "JokeDisplay";

/**
 * 笑話小工具組件
 * @description 顯示隨機笑話的可切換小工具
 * @returns {JSX.Element} 笑話小工具UI
 */
const JokeWidget = () => {
  // 狀態管理
  const [isVisible, setIsVisible] = useState(false);

  // API查詢
  const {
    data: joke,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["randomJoke"],
    queryFn: fetchRandomJoke,
    enabled: isVisible, // 🧠 只有當小工具可見時才獲取數據
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 分鐘
    onError: (error) => {
      console.error("獲取笑話時出錯:", error);
    }
  });

  // 事件處理
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleRefresh = () => refetch();

  // 計算加載狀態
  const isLoadingContent = isLoading || isFetching;

  // 記憶化按鈕文本
  const buttonText = useMemo(
    () => (isLoadingContent ? "載入中..." : "換個笑話"),
    [isLoadingContent]
  );

  return (
    <>
      {/* 切換按鈕，始終可見 */}
      <ToggleButton
        onClick={toggleVisibility}
        title="笑話小工具"
        aria-label={isVisible ? "關閉笑話小工具" : "開啟笑話小工具"}
      >
        {isVisible ? <CloseIcon /> : <SmileIcon />}
      </ToggleButton>

      {/* 笑話內容容器 */}
      <JokeContainer $isVisible={isVisible}>
        <JokeHeader>
          <h3>每日笑話</h3>
          <CloseButton onClick={toggleVisibility} aria-label="關閉">
            ×
          </CloseButton>
        </JokeHeader>

        <JokeContent>
          {isLoadingContent ? (
            <Loader />
          ) : isError ? (
            <ErrorMessage>無法載入笑話，請稍後再試</ErrorMessage>
          ) : joke ? (
            <JokeDisplay joke={joke} />
          ) : (
            <p>點擊下方按鈕獲取笑話</p>
          )}
        </JokeContent>

        <RefreshButton onClick={handleRefresh} disabled={isLoadingContent}>
          {buttonText}
        </RefreshButton>
      </JokeContainer>
    </>
  );
};

export default JokeWidget;
