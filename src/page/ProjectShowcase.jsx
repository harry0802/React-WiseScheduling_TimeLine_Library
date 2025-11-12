import React from 'react';
import { PageContainer, Title } from '../styles/SharedStyles';
import styled from 'styled-components';
import ProjectCarousel from '../components/ProjectCarousel';

const IntroSection = styled.div`
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary}15,
    ${props => props.theme.colors.secondary}10
  );
  border-radius: 12px;
  border-left: 4px solid ${props => props.theme.colors.primary};
  clip-path: polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem);

  h2 {
    color: ${props => props.theme.colors.primary};
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 700;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.8;
    margin: 0.5rem 0;

    strong {
      color: ${props => props.theme.colors.text};
    }
  }
`;

const FeatureSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.md};
  clip-path: polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem);

  h3 {
    color: ${props => props.theme.colors.primary};
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .icon {
      font-size: 1.5rem;
    }
  }

  ul {
    margin: 0;
    padding-left: 1.5rem;

    li {
      color: ${props => props.theme.colors.textSecondary};
      line-height: 1.8;
      margin-bottom: 0.75rem;

      strong {
        color: ${props => props.theme.colors.text};
      }
    }
  }
`;

const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;

  .tech-item {
    padding: 1rem 1.5rem;
    background: ${props => props.theme.colors.primary}08;
    border: 2px solid ${props => props.theme.colors.primary}20;
    border-radius: 8px;
    text-align: center;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    clip-path: polygon(0.5rem 0, calc(100% - 0.5rem) 0, 100% 0.5rem, 100% calc(100% - 0.5rem), calc(100% - 0.5rem) 100%, 0.5rem 100%, 0 calc(100% - 0.5rem), 0 0.5rem);
  }
`;

const Divider = styled.hr`
  border: none;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    ${props => props.theme.colors.primary}40,
    transparent
  );
  margin: 3rem 0;
`;

const Note = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: ${props => props.theme.colors.primary}10;
  border-left: 4px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  clip-path: polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem);

  h4 {
    color: ${props => props.theme.colors.primary};
    margin: 0 0 1rem 0;
    font-size: ${props => props.theme.fontSizes.md};
    font-weight: 700;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.8;
    margin: 0.5rem 0;
    font-size: ${props => props.theme.fontSizes.sm};
  }

  code {
    background: ${props => props.theme.colors.cardBackground};
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    color: ${props => props.theme.colors.primary};
    font-size: 0.9em;
  }
`;

const ProjectShowcase = () => {
  // 預設的投影片資料（可以替換成實際的專案截圖）
  const projectSlides = [
    {
      id: 1,
      pic: null, // 請替換為實際圖片路徑，例如：'/images/project-1.png'
      title: '智慧製造排程系統 - 主控台',
      dec: '展示工廠生產線即時狀態監控介面，包含機台狀態、產能分析、工單管理等核心功能。\n\n採用響應式設計，支援多種螢幕尺寸，確保現場人員能在不同裝置上流暢操作。'
    },
    {
      id: 2,
      pic: null, // 請替換為實際圖片路徑
      title: '智慧製造排程系統 - 甘特圖排程',
      dec: '視覺化的生產排程時間軸，支援拖拉式調整、即時更新、狀態追蹤等進階功能。\n\n整合 Vis-timeline 函式庫，提供直觀的排程管理體驗，大幅提升生產調度效率。'
    },
    {
      id: 3,
      pic: null, // 請替換為實際圖片路徑
      title: '智慧製造排程系統 - 數據分析儀表板',
      dec: '提供 OEE 分析、生產進度追蹤、交貨趨勢預測等多維度數據視覺化功能。\n\n運用 Recharts 繪製互動式圖表，協助管理層快速掌握生產狀況並做出決策。'
    }
  ];

  const techStack = [
    'React 18',
    'TypeScript',
    'Redux Toolkit',
    'Styled Components',
    'Material-UI',
    'Vis-timeline',
    'Recharts',
    'React Hook Form',
    'Zod Validation'
  ];

  return (
    <PageContainer>
      <Title>科專_TIIP模具產業高階製造</Title>

      <IntroSection>
        <h2>專案簡介</h2>
        <p>
          <strong>科專_TIIP模具產業高階製造</strong>是一個工業級智慧製造管理系統，
          專為模具產業設計，整合生產排程、即時監控、數據分析等核心功能。
        </p>
        <p>
          本專案採用現代化前端技術棧，注重使用者體驗與系統效能，
          成功協助工廠提升生產效率、優化資源調度，並實現數據驅動的決策管理。
        </p>
      </IntroSection>

      <Divider />

      <ProjectCarousel slides={projectSlides} />

      <Divider />

      <FeatureSection>
        <h3>
          <span className="icon">🎯</span>
          核心功能
        </h3>
        <ul>
          <li>
            <strong>智慧排程系統：</strong>
            支援工單自動排程、機台狀態管理、產能優化分配，提供視覺化甘特圖介面
          </li>
          <li>
            <strong>即時監控中心：</strong>
            整合多區域生產線監控，顯示設備運行狀態、生產進度、異常警報等即時資訊
          </li>
          <li>
            <strong>OEE 分析系統：</strong>
            計算設備綜合效率（OEE），提供設備稼動率、良率、產能等關鍵績效指標
          </li>
          <li>
            <strong>生產進度追蹤：</strong>
            追蹤工單執行進度、實際產量與計劃比較，協助掌握生產節奏
          </li>
          <li>
            <strong>交貨趨勢分析：</strong>
            分析出貨數據趨勢，預測未來產能需求，輔助生產規劃決策
          </li>
          <li>
            <strong>響應式設計：</strong>
            支援桌面、平板、手機等多種裝置，適應不同使用場景
          </li>
        </ul>
      </FeatureSection>

      <FeatureSection>
        <h3>
          <span className="icon">🛠️</span>
          技術棧
        </h3>
        <TechStack>
          {techStack.map((tech, index) => (
            <div key={index} className="tech-item">
              {tech}
            </div>
          ))}
        </TechStack>
      </FeatureSection>

      <FeatureSection>
        <h3>
          <span className="icon">💡</span>
          技術亮點
        </h3>
        <ul>
          <li>
            <strong>獨立架構設計：</strong>
            完整規劃組件結構、狀態管理、API 整合、路由配置，確保系統可維護性
          </li>
          <li>
            <strong>Mock 數據系統：</strong>
            建構完整的 Mock API 支援離線開發與測試，加速開發迭代速度
          </li>
          <li>
            <strong>效能優化：</strong>
            使用 Lazy Loading、React.memo、useMemo 等技術優化渲染效能
          </li>
          <li>
            <strong>TypeScript 導入：</strong>
            提升程式碼品質與可維護性，減少執行時錯誤
          </li>
          <li>
            <strong>主題系統：</strong>
            實作完整的 Design Token 系統，統一視覺風格並支援主題切換
          </li>
        </ul>
      </FeatureSection>

      <Note>
        <h4>📝 如何新增專案截圖</h4>
        <p>
          1. 將專案截圖放置於 <code>public/images/</code> 目錄下
        </p>
        <p>
          2. 在 <code>ProjectShowcase.jsx</code> 中更新 <code>projectSlides</code> 陣列的 <code>pic</code> 屬性
        </p>
        <p>
          3. 範例：<code>pic: &apos;/images/project-1.png&apos;</code>
        </p>
        <p>
          4. 同時更新 <code>title</code> 和 <code>dec</code> 來說明每張截圖的內容
        </p>
      </Note>
    </PageContainer>
  );
};

export default ProjectShowcase;
