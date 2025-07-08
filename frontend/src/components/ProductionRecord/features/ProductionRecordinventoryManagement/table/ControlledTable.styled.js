import styled, { createGlobalStyle } from 'styled-components';
import { commonTheme } from '../../../styles/common';

// 受控表格主容器
export const ControlledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

// 表格內容區域
export const ControlledTableContent = styled.div`
  position: relative;
`;

// 表格操作按鈕區域
export const ControlledTableActions = styled.div`
  bottom: 58px;
  right: 0;
  position: absolute;

  > button {
    width: auto;
    padding: 5px 16px;
    border-radius: 15px;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background: #4270b8;
    color: ${commonTheme.colors.white};
    border: none;
    cursor: pointer;
    font-family: Roboto;

    &:hover {
      background: #355a94;
    }

    &:active {
      background: #2d4c7e;
    }
  }
`;

// ControlledTable Antd 全局樣式覆蓋
export const ControlledTableGlobalStyles = createGlobalStyle`
  .controlled-table-wrapper {
    * {
      border-radius: unset;
    }

    .ant-table-thead {
      th.ant-table-cell {
        border-top: 1px solid #8f8f8f;
        border-bottom: 1px solid #8f8f8f;
        color: #fff;
        background: #186c98;
        border-radius: unset !important;

        &::before {
          display: none;
        }

        &:first-child {
          border-left: 1px solid #8f8f8f;
        }

        &:last-child {
          border-right: 1px solid #8f8f8f;
        }
      }
    }

    .ant-table-pagination {
      justify-content: center;
      color: #8f8f8f;
      margin-top: 88px;

      a {
        color: currentColor;
      }

      .ant-pagination-item-active {
        color: #fff;
        border: unset;
        background: #f39838;
        border-radius: 50%;

        a {
          color: currentColor;
        }
      }

      .ant-pagination-options .ant-select .ant-select-selector {
        border-radius: 4px;
      }
    }
  }
`;