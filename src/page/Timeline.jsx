import React from 'react';
import { PageContainer, Title } from '../styles/SharedStyles';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  position: relative;
  margin: 2rem 0;
  padding-left: 2rem;
  border-left: 2px solid ${props => props.theme.colors.primary};
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows.md};
  
  &:before {
    content: '';
    position: absolute;
    left: -2.5rem;
    top: 1.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.primary};
  }
  
  h3 {
    margin-top: 0;
    color: ${props => props.theme.colors.text};
  }
`;

const Timeline = () => {
  const timelineData = [
    { date: '2023年12月', event: '專案啟動', description: '團隊組建，確定專案目標和技術棧選擇。' },
    { date: '2024年1月', event: '需求分析完成', description: '完成用戶需求收集和系統功能規格設計。' },
    { date: '2024年2月', event: '設計與原型', description: '完成UI/UX設計和交互原型。' },
    { date: '2024年3月', event: '初版發布', description: '發布第一個可用版本，開始接收用戶反饋。' },
    { date: '2024年4月', event: '功能擴展', description: '根據用戶反饋增加新功能，優化用戶體驗。' },
  ];

  return (
    <PageContainer>
      <Title>時間軸</Title>
      <TimelineContainer>
        {timelineData.map((item, index) => (
          <TimelineItem key={index}>
            <h3>{item.date} - {item.event}</h3>
            <p>{item.description}</p>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </PageContainer>
  );
};

export default Timeline;
