import React from "react";
import { Link } from "react-router-dom";
import {
  PageContainer,
  Title,
  Paragraph,
  CardGrid,
} from "../styles/SharedStyles";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

const FeatureCard = styled.div`
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadows.md};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }

  h2 {
    margin-top: 0;
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.fontSizes["2xl"]};
    margin-bottom: ${(props) => props.theme.spacing.sm};
  }
`;

const FeatureLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
    text-decoration: none;
  }
`;

// 模擬一個假的 API 調用，用於激活 React Query
const fetchAppInfo = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "時間軸專案",
        version: "1.0.0",
        features: ["時間軸視覺化", "數據滑動器", "查詢功能"],
      });
    }, 500);
  });
};

const Home = () => {
  // 使用 React Query 發起查詢，這將使 DevTools 顯示
  const { data: appInfo, isLoading } = useQuery({
    queryKey: ["appInfo"],
    queryFn: fetchAppInfo,
  });

  if (isLoading) {
    return (
      <PageContainer>
        <p>載入中...</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Title>時間軸專案首頁</Title>
      <Paragraph>
        歡迎來到{appInfo?.name || "時間軸專案"}
        ，這是一個用於展示和管理時間軸數據的應用。
      </Paragraph>

      <CardGrid>
        <FeatureCard>
          <h2>動態時間軸</h2>
          <p>檢視互動式的甘特圖和時間軸視覺化</p>
          <FeatureLink to="/dynamic-timeline">前往動態時間軸</FeatureLink>
        </FeatureCard>

        <FeatureCard>
          <h2>查詢範例</h2>
          <p>了解如何使用查詢功能來過濾和檢索數據</p>
          <FeatureLink to="/query-example">查看查詢範例</FeatureLink>
        </FeatureCard>
        <FeatureCard>
          <h2>製造現場即時監控</h2>
          <p>查看製造現場的即時監控數據</p>
          <FeatureLink to="/isolated/manufacturing-live-monitor">
            前往製造現場即時監控
          </FeatureLink>
        </FeatureCard>
      </CardGrid>
    </PageContainer>
  );
};

export default Home;
