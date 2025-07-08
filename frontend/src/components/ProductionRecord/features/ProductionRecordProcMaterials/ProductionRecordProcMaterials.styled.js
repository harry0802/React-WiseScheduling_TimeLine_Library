import styled, { createGlobalStyle } from 'styled-components';
import { commonTheme } from '../../styles/common';

// ProcMaterials 專用顏色和變數
const procMaterialsTheme = {
  fontColor: '#8f8f8f',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  borderColor: '#8f8f8f',
  backgroundColorThead: '#cdcdcd',
  backgroundColorEvenRow: '#dfdfdf'
};

// 主要內容網格容器
export const ProcMaterialsContext = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
  gap: 1.25rem;
`;

// 可重複使用的表格樣式
export const ReusableTable = styled.div`
  max-height: 32.5rem;
  overflow: auto;
  cursor: pointer;

  .ant-table-tbody {
    tr:hover > td {
      background: inherit !important;
      color: #000 !important;
    }
  }
`;

// 編輯警告訊息
export const EditWarningMessage = styled.div`
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 10px;
`;

// 編輯警告連結
export const EditWarningLink = styled.span`
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

// Antd Table 全局樣式覆蓋
export const AntdTableGlobalStyles = createGlobalStyle`
  .procMaterials-table {
    width: 100%;
    border: 1px solid ${procMaterialsTheme.borderColor};

    * {
      color: ${procMaterialsTheme.fontColor};
      font-family: ${procMaterialsTheme.fontFamily};
      font-size: ${procMaterialsTheme.fontSize};
      font-style: normal;
      font-weight: 400;
      line-height: ${procMaterialsTheme.lineHeight};
      border-radius: 0;
      border: none;
    }

    .ant-table-thead .ant-table-cell {
      &::before {
        display: none;
      }
      color: ${procMaterialsTheme.fontColor};
      padding: 10px;
      border-radius: 0;
      border-bottom: 1px solid ${procMaterialsTheme.borderColor};
      background: ${procMaterialsTheme.backgroundColorThead};
    }

    .ant-table-tbody {
      :not(:last-child) {
        border-right: 1px solid ${procMaterialsTheme.borderColor};
      }

      .ant-table-row {
        &:not(:last-child) > td {
          border-bottom: 1px solid ${procMaterialsTheme.borderColor};
        }

        &:nth-of-type(odd) {
          background: ${procMaterialsTheme.backgroundColorEvenRow};
        }
      }
    }
  }
`;