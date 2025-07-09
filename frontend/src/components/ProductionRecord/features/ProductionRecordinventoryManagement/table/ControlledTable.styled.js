import styled, { createGlobalStyle } from "styled-components";
import { commonTheme } from "../../../styles/common";

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
    &&{
      * {
        border-radius: unset;
      }

      .ant-table-thead {
        th.ant-table-cell {
          border-top: 1px solid #8f8f8f ;
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

      .ant-table-tbody {
        tr.ant-table-row {
          td.ant-table-cell {
            border-bottom: 1px solid #8f8f8f;
            
            &:first-child {
              border-left: 1px solid #8f8f8f;
            }

            &:last-child {
              border-right: 1px solid #8f8f8f;
            }
          }

          &:hover {
            td.ant-table-cell {
              background: rgba(24, 108, 152, 0.1);
            }
          }
        }
      }

      .ant-table-selection-column {
        .ant-checkbox-wrapper {
          .ant-checkbox {
            .ant-checkbox-inner {
              border-color: #8f8f8f;
            }
            
            &.ant-checkbox-checked {
              .ant-checkbox-inner {
                background-color: #186c98;
                border-color: #186c98;
              }
            }
          }
        }
      }

 .ant-pagination-item{
  background: none;
 }

      .ant-table-pagination {
        justify-content: center;
        color: #8f8f8f;
        margin-top: 88px;
        background-color: none;

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
  }
`;
