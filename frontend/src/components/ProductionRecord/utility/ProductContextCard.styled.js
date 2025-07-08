import styled from 'styled-components';
import { commonTheme } from '../styles/common';

// 產品資訊卡片主容器
export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-start;
  padding: 1.875rem 1.4375rem 5.125rem 1.4375rem;
  font-family: Roboto;
  color: ${commonTheme.colors.textPrimary};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  background: ${commonTheme.colors.white};
  border-radius: 4px;
  border: 1px solid ${commonTheme.colors.white};
  background: ${commonTheme.colors.background};
`;

// 卡片標題區域
export const ProductInfoHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;

  :where(h3) {
    font-size: 1.5rem;
  }
`;

// 標題文字容器
export const HeaderTitle = styled.div`
  h3 {
    margin: 0;
    color: inherit;
    font-family: inherit;
    font-weight: inherit;
  }
`;

// 按鈕容器
export const HeaderButton = styled.div`
  display: flex;
  align-items: center;
`;

// 卡片內容文字區域
export const ProductInfoText = styled.div`
  height: 100%;
  font-size: 0.875rem;

  > p:not(:first-child) {
    margin-top: 1.25rem;
    font-weight: 400;
  }
`;