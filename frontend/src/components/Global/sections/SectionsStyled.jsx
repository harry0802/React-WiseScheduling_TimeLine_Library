import styled from "styled-components";

// 樣式組件
export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-start;
  color: var(--palette-text-primary);
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  border-radius: 4px;
  width: 100%;
`;

export const ProductInfoText = styled.div`
  height: 100%;
  font-size: 0.875rem;

  > p:not(:first-child) {
    margin-top: 1.25rem;
  }
`;
