import styled from "styled-components";
import { Select, Input, Space } from "antd";
import { commonTheme } from "../styles/common";

// 搜尋容器
export const SearchContainer = styled(Space)`
  /* width: 100%; */
`;

// 緊湊組合容器
export const SearchCompact = styled(Space.Compact)`
  display: flex;
  align-items: center;
`;

// 樣式化 Select
export const StyledSelect = styled(Select)`
  width: 135px;

  .ant-select-selector {
    border-color: ${commonTheme.colors.border} !important;
    background-color: ${commonTheme.colors.white} !important;

    &:hover {
      border-color: ${commonTheme.colors.hoverPrimary} !important;
    }
  }

  &.ant-select-focused .ant-select-selector {
    border-color: ${commonTheme.colors.buttonActive} !important;
    box-shadow: 0 0 0 2px rgba(139, 193, 227, 0.2) !important;
  }

  .ant-select-selection-item {
    color: ${commonTheme.colors.textPrimary} !important;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
  }

  .ant-select-arrow {
    color: ${commonTheme.colors.textPrimary} !important;
  }
`;

// 樣式化 Input
export const StyledInput = styled(Input)`
  width: 320px;

  &.ant-input-affix-wrapper {
    border-color: ${commonTheme.colors.border} !important;
    background-color: ${commonTheme.colors.white} !important;

    &:hover {
      border-color: ${commonTheme.colors.hoverPrimary} !important;
    }

    &:focus,
    &.ant-input-affix-wrapper-focused {
      border-color: ${commonTheme.colors.buttonActive} !important;
      box-shadow: 0 0 0 2px rgba(139, 193, 227, 0.2) !important;
    }
  }

  input {
    color: ${commonTheme.colors.textPrimary} !important;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;

    &::placeholder {
      color: ${commonTheme.colors.border} !important;
    }
  }

  .ant-input-suffix {
    color: ${commonTheme.colors.textPrimary} !important;
  }
`;
