import styled, { css } from "styled-components";
import { commonTheme } from "./common";

// 通用表單容器
export const FormContainer = styled.div`
  border: 1px solid ${commonTheme.colors.border};
  border-radius: 4px;
  background: ${commonTheme.colors.white};
  font-size: 18px;
  color: ${commonTheme.colors.border};
  overflow: hidden;
  grid-column: 0;
  margin-top: 1.3125rem;
`;

// 表單項目
export const FormItem = styled.div`
  position: relative;
  height: max(250px);
  overflow-y: auto;
`;

// 表單內容
export const FormContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  border-bottom: 1px solid ${commonTheme.colors.border};
`;

// 表單輸入框
export const FormInput = styled.div`
  padding: 8px 10px 0.875rem;
  margin-bottom: 0;

  input {
    width: 100%;
    border: none;
    color: ${commonTheme.colors.border};

    &:not(:first-child) {
      border-bottom: 1px solid ${commonTheme.colors.border};
    }
  }
`;

// 移除按鈕
export const RemoveButton = styled.button`
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

  &:hover {
    color: ${commonTheme.colors.buttonHover};
    stroke: ${commonTheme.colors.buttonHover};
  }

  &:active {
    color: ${commonTheme.colors.buttonActive};
    stroke: ${commonTheme.colors.buttonActive};
  }
`;

// 新增按鈕區域
export const AdditionSection = styled.div`
  position: sticky;
  z-index: 1;
  text-align: center;
  bottom: 0;
  margin-bottom: 0;
  background: ${commonTheme.colors.white};
  padding-bottom: 5px;

  .ant-btn {
    display: inline-flex;
    align-items: center;
    height: auto;
    font-size: 18px;
    color: ${commonTheme.colors.border};
    font-weight: 400;
  }
`;

// MUI 表單控件樣式
export const MuiFormControlContainer = styled.div`
  width: 100%;
  color: ${commonTheme.colors.textPrimary};
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  font-size: 0.875rem;

  &:not(:last-child) {
    margin-bottom: 21px;
  }

  & > label {
    font-size: inherit;
    color: currentColor;
  }

  & .MuiInputBase-root {
    color: currentColor;
    font-size: inherit;

    input {
      padding: 1.0625rem 0.5625rem;
    }
  }

  /* MUI 表單控件交互樣式 */
  .MuiFormControl-root {
    transition: all 0.3s;

    &:hover {
      .MuiFormLabel-root,
      .MuiOutlinedInput-root,
      fieldset {
        color: #4f9ab1;
        border-color: #4f9ab1 !important;
      }
    }

    .Mui-focused {
      color: ${commonTheme.colors.buttonActive} !important;

      .MuiOutlinedInput-root,
      .MuiFormLabel-root,
      label,
      fieldset {
        color: ${commonTheme.colors.buttonActive} !important;
        border-color: ${commonTheme.colors.buttonActive} !important;
      }
    }
  }
`;

// Antd 表單項目樣式覆蓋
export const antdFormOverrides = css`
  .ant-row {
    display: flex;
    flex-direction: column;
  }

  .ant-space {
    gap: 0;

    &-item:has(.groupForm__input) {
      width: 100%;
    }
  }

  .ant-form-item-label {
    align-self: flex-start;

    label {
      color: ${commonTheme.colors.border};
      height: 1.0625rem;
    }
  }
`;
