import styled from 'styled-components';

// 基本頁面容器
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

// 標題元素
export const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
`;

export const Subtitle = styled.h2`
  color: #444;
  margin-bottom: 1rem;
`;

// 文字元素
export const Paragraph = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #333;
`;

// 卡片和容器
export const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

// 按鈕和操作元素
export const Button = styled.button`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #61dafb;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #21a6c9;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// 表單元素
export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: #61dafb;
    box-shadow: 0 0 0 2px rgba(97, 218, 251, 0.2);
  }
`;

// 自適應布局輔助元素
export const Flex = styled.div`
  display: flex;
  gap: ${props => props.gap || '1rem'};
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  
  @media (max-width: 768px) {
    flex-direction: ${props => props.mobileDirection || props.direction || 'column'};
  }
`;

// 佈局斷點
export const screenSizes = {
  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
  largeDesktop: '1200px'
};

export const mediaQueries = {
  mobile: `@media (max-width: ${screenSizes.mobile})`,
  tablet: `@media (max-width: ${screenSizes.tablet})`,
  desktop: `@media (max-width: ${screenSizes.desktop})`,
  largeDesktop: `@media (max-width: ${screenSizes.largeDesktop})`,
  notMobile: `@media (min-width: ${screenSizes.mobile})`
};
