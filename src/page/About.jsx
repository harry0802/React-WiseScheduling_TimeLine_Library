import React from "react";
import { PageContainer, Title, Paragraph, Card } from "../styles/SharedStyles";

const About = () => {
  return (
    <PageContainer>
      <Title>關於我們</Title>
      <Card>
        <Paragraph>
          這是一個時間軸專案，用於展示重要事件和進度。我們的目標是提供一個直觀、易於使用的介面，
          幫助用戶更好地理解和管理時間相關的數據。
        </Paragraph>
        <Paragraph>
          這個專案使用了現代前端技術，包括 React、Styled Components 和 React
          Router 等。
          它為用戶提供了多種數據視覺化選項，如時間軸、甘特圖和數據圖表等。
        </Paragraph>
      </Card>
    </PageContainer>
  );
};

export default About;
