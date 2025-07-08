import styled from "styled-components";
import { commonTheme } from "../styles/common";

// 群組表單主容器（使用 ProductForm.styles.js 的 FormContainer）
export const GroupFormContainer = styled.div`
  border: 1px solid ${commonTheme.colors.border};
  border-radius: 4px;
  background: ${commonTheme.colors.white};
  font-size: 18px;
  color: ${commonTheme.colors.border};
  overflow: hidden;
  grid-column: 0;
  margin-top: 1.3125rem;

  /* Ant Design Form 樣式覆蓋 */
  && .ant-row {
    display: flex;
    flex-direction: column;
  }

  && .ant-space {
    gap: 0;
    width: 100%;

    &-item {
      width: 100%;
    }
  }

  && .ant-form-item-label {
    align-self: flex-start;
    label {
      color: ${commonTheme.colors.border};
      height: 1.0625rem;
    }
  }
`;

// 表單項目容器
export const GroupFormItem = styled.div`
  position: relative;
  height: max(250px);
  overflow-y: auto;
`;

// 表單內容區域
export const GroupFormContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  border-bottom: 1px solid ${commonTheme.colors.border};
`;

// 表單輸入框容器
export const GroupFormInput = styled.div`
  padding: 8px 10px 0.875rem;
  flex: 1;

  && input {
    width: 100%;
    border: none;
    color: ${commonTheme.colors.border};

    &:not(:first-child) {
      border-bottom: 1px solid ${commonTheme.colors.border};
    }
  }

  && .ant-form-item-label {
    align-self: flex-start;

    label {
      color: ${commonTheme.colors.border};
      height: 1.0625rem;
    }
  }
`;

// 移除按鈕
export const GroupFormRemoveButton = styled.div`
  margin-right: 12px;
  width: 35px !important;
  height: 35px !important;
  stroke-width: 1;
  color: ${commonTheme.colors.buttonPrimary};
  stroke: ${commonTheme.colors.buttonPrimary};
  cursor: pointer;
  border: none;
  background: transparent;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${commonTheme.colors.buttonHover};
    stroke: ${commonTheme.colors.buttonHover};
  }

  &:active {
    color: ${commonTheme.colors.buttonActive};
    stroke: ${commonTheme.colors.buttonActive};
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

// 新增按鈕區域
export const GroupFormAddition = styled.div`
  position: sticky;
  z-index: 1;
  text-align: center;
  bottom: 0;
  margin-bottom: 0;
  background: ${commonTheme.colors.white};
  padding-bottom: 5px;

  && .ant-btn {
    display: inline-flex;
    align-items: center;
    height: auto;
    font-size: 18px;
    color: ${commonTheme.colors.border};
    font-weight: 400;
    border: none;
    background: transparent;
  }
`;
