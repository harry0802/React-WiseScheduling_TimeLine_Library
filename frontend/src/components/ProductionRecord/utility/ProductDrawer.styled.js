import styled from 'styled-components';
import { Drawer } from 'antd';
import { commonTheme } from '../styles/common';

// 樣式化的 Drawer 組件
export const StyledDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper > .ant-drawer-content {
    color: ${commonTheme.colors.textPrimary};
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
    border-radius: 10px 0px 0px 10px;
    background: #ebecf0;
    box-shadow: -4px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding-bottom: 6.625rem !important;
  }

  .ant-drawer-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
`;

// Drawer 標題區域
export const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: inherit;
  color: inherit;
  font-family: inherit;
`;

// Drawer 內容區域
export const DrawerBody = styled.div`
  margin-top: 3.125rem;
  flex: 1;
`;

// Drawer 底部按鈕區域
export const DrawerFooter = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  padding-top: 2.625rem;
  padding-bottom: 1.5rem;
  padding-right: 2.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 1.875rem;
  z-index: 2;
  background: #ebecf0;

  button {
    width: 5rem;
    height: 2.5rem;
    padding: 0.5625rem 1.375rem 0.625rem 1.375rem;
    justify-content: center;
    align-items: center;
    border: none;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 1.875rem;
    cursor: pointer;
  }
`;

// 取消按鈕
export const CancelButton = styled.button`
  color: ${commonTheme.colors.textPrimary};
  background: unset;
  text-decoration-line: underline;
  text-decoration-color: transparent;
  transition: all 0.2s;

  &:hover {
    text-decoration-color: currentColor;
  }
`;

// 確認按鈕
export const ConfirmButton = styled.button`
  color: #e1e7f5;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: #186c98;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #155a80;
  }

  &:active:not(:disabled) {
    background: #124865;
  }
`;