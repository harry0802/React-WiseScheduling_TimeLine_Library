import styled from 'styled-components';
import { commonTheme } from './common';

// 通知主容器
export const NotificationContainer = styled.div`
  background: rgba(238, 238, 238, 0.9);
  padding: 1.5rem 1.4375rem 1.5625rem 1.125rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

// 通知圖示
export const NotificationIcon = styled.div`
  width: 2.5rem;
  height: 1.9375rem;
`;

// Antd 通知樣式覆蓋（作為 CSS 字串，用於全域樣式注入）
export const antdNotificationOverrides = `
  .notificationStyle {
    background: rgba(238, 238, 238, 0.9);
    padding: 1.5rem 1.4375rem 1.5625rem 1.125rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
  }

  .notificationStyle .ant-notification-notice-message {
    color: ${commonTheme.colors.textPrimary} !important;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .notificationStyle__icon {
    width: 2.5rem;
    height: 1.9375rem;
  }
`;