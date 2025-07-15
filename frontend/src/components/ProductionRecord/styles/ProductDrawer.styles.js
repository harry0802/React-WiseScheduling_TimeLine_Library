import styled from 'styled-components';
import { commonTheme } from './common';

// Drawer 主容器（需要配合 Antd Drawer 使用）
export const ProductDrawerContainer = styled.div`
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
  height: 100%;
`;

// Drawer 頭部
export const ProductDrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

// Drawer 主體
export const ProductDrawerBody = styled.div`
  margin-top: 3.125rem;
  padding: 0 1rem;
  flex: 1;
  overflow-y: auto;
`;

// Drawer 底部
export const ProductDrawerFooter = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  padding: 2.625rem 2.5rem 1.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 1.875rem;
  z-index: 2;
  background: #ebecf0;
`;

// Drawer 底部按鈕
export const DrawerButton = styled.button`
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
`;

// Drawer 取消按鈕
export const DrawerCancelButton = styled(DrawerButton)`
  color: ${commonTheme.colors.textPrimary};
  background: unset;
  text-decoration-line: underline;
  text-decoration-color: transparent;
  transition: all 0.2s;

  &:hover {
    text-decoration-color: currentColor;
  }
`;

// Drawer 確認按鈕
export const DrawerConfirmButton = styled(DrawerButton)`
  color: #e1e7f5;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: ${commonTheme.colors.primary};
`;

// Antd Drawer 體樣式覆蓋
export const drawerBodyOverrides = `
  .ant-drawer-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 0;
  }
`;