import styled from 'styled-components';
import { commonTheme } from './common';

// 產品內容主容器
export const ProductContentContainer = styled.div`
  width: 100%;
`;

// 麵包屑導航
export const ProductContentBreadcrumb = styled.div`
  font-family: Roboto;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  color: ${commonTheme.colors.white};
  line-height: 1.25rem;
`;

// 產品內容區塊
export const ProductContentSections = styled.div`
  & > div {
    margin-top: 1.25rem;
  }
`;

// 產品資訊容器
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
  background: ${commonTheme.colors.background};
  border-radius: 4px;
  border: 1px solid ${commonTheme.colors.white};
`;

// 產品資訊頭部
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

// 產品資訊文字
export const ProductInfoText = styled.div`
  height: 100%;
  font-size: 0.875rem;

  & > p:not(:first-child) {
    margin-top: 1.25rem;
    font-weight: 400;
  }
`;

// 資訊項目
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 3.875rem;
  gap: 9px;
  font-family: Inter;
  line-height: 1.0625rem;

  &:not(:first-child) {
    margin-top: 1.25rem;
  }

  > span {
    font-size: 0.875rem;
  }
`;