import styled, { css } from 'styled-components';
import { buttonBase, hoverActiveStates, commonTheme } from './common';

// 基礎按鈕樣式
export const BaseButton = styled.button`
  ${buttonBase}
`;

// 主要按鈕樣式
export const PrimaryButton = styled.button`
  background-color: ${commonTheme.colors.buttonPrimary} !important;
  border: none;
  color: ${commonTheme.colors.white} !important;
  transition: background-color 0.3s, transform 0.1s;
  filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  border-radius: 5px;
  font-family: Roboto;

  ${hoverActiveStates(commonTheme.colors.buttonHover, commonTheme.colors.buttonActive)}
`;

// 取消按鈕樣式
export const CancelButton = styled.button`
  color: ${commonTheme.colors.buttonCancel};
  background: unset;
  border: none;
  cursor: pointer;
  font-family: Roboto;
  text-decoration-line: underline;
  text-decoration-color: transparent;
  transition: all 0.2s;

  &:hover {
    color: ${commonTheme.colors.buttonHover};
    text-decoration-color: currentColor;
  }

  &:active {
    color: ${commonTheme.colors.buttonActive};
  }
`;

// 刪除按鈕樣式
export const DeleteButton = styled.button`
  background-color: ${commonTheme.colors.buttonDelete} !important;
  color: ${commonTheme.colors.white} !important;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-family: Roboto;
  transition: background-color 0.3s;

  ${hoverActiveStates(commonTheme.colors.buttonDeleteHover, commonTheme.colors.buttonDeleteActive)}
`;

// Antd 按鈕覆蓋樣式（用於需要覆蓋 Antd 預設樣式的地方）
export const antdButtonOverrides = css`
  &.ant-btn-default {
    ${buttonBase}
  }

  &.c-btn-primars {
    background-color: ${commonTheme.colors.buttonPrimary} !important;
    border: none;
    color: ${commonTheme.colors.white} !important;
    transition: background-color 0.3s, transform 0.1s;
    filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.25));

    ${hoverActiveStates(commonTheme.colors.buttonHover, commonTheme.colors.buttonActive)}

    &.c-btn-primars--cancel {
      color: ${commonTheme.colors.buttonCancel};
      background: unset;
      &:hover {
        color: ${commonTheme.colors.buttonHover};
        text-decoration: underline;
      }
      &:active {
        color: ${commonTheme.colors.buttonActive};
      }
    }

    &.c-btn-primars--delete {
      background-color: ${commonTheme.colors.buttonDelete} !important;
      color: ${commonTheme.colors.white} !important;
      ${hoverActiveStates(commonTheme.colors.buttonDeleteHover, commonTheme.colors.buttonDeleteActive)}
    }
  }
`;