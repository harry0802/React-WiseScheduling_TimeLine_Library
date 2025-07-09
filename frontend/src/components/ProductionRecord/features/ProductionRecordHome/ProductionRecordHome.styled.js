import styled from "styled-components";
import { Pagination } from "antd";
import { commonTheme } from "../../styles/common";

// 記錄首頁容器
export const RecordHomeContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;

// 記錄首頁內容區域
export const RecordHomeContent = styled.div`
  max-width: 100cqw;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.25rem;
`;

// 分頁器樣式化組件
export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin: 5.5rem auto 1rem auto;

  .ant-pagination-item {
    display: flex;
    align-self: center;
    justify-self: center;
    min-width: unset;
    width: 2.25rem;
    height: 2.25rem;
    padding: 0px 6px;
    align-items: center;
    justify-content: center;
    color: ${commonTheme.colors.textPrimary};
    border-radius: 50%;
    border: none;
    line-height: unset;

    &.ant-pagination-item-active {
      background: #f39838;
      color: ${commonTheme.colors.white};
    }

    & a {
      text-align: center;
      color: currentColor;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 600;
      font-size: 1.125rem;
    }
  }

  .anticon-right,
  .anticon-left,
  .ant-pagination-item-ellipsis {
    color: ${commonTheme.colors.textPrimary} !important;
    stroke-width: 5;
  }
`;
