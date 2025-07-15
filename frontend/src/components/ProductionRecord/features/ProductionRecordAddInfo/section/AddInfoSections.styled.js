import styled from "styled-components";
import { commonTheme } from "../../../styles/common";

// 產品抽屜資訊容器
export const ProductDrawerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${commonTheme.colors.textPrimary};
  font-family: Roboto;
`;

// 資訊項目
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 3.875rem;
  gap: 1rem;
  font-family: Inter;
  line-height: 1.0625rem;

  &:not(:first-child) {
    margin-top: 1rem;
  }

  > span {
    font-size: 1.25rem;
    color: ${commonTheme.colors.textPrimary};
    font-weight: 500;
  }

  > p {
    font-size: 1rem;
    color: ${commonTheme.colors.textPrimary};
    margin: 0;
    line-height: 1.2;
  }
`;

// 產品資訊文字區域（繼承自 ProductContextCard.styled.js）
export const ProductInfoText = styled.div`
  height: 100%;
  font-size: 0.875rem;
  color: ${commonTheme.colors.textPrimary};

  > p:not(:first-child) {
    margin-top: 1.25rem;
    font-weight: 400;
  }

  > p {
    margin: 0;
    line-height: 1.4;
  }
`;
