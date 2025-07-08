import styled from "styled-components";
import { Button } from "antd";

// 刪除按鈕樣式
export const DeleteButton = styled(Button)`
  background-color: #eb0004 !important;
  color: #fff !important;
  border: none;
  transition: background-color 0.3s, transform 0.1s;
  filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.25));

  &:hover:not(:disabled) {
    background-color: #e8686a !important;
    color: white !important;
  }

  &:active:not(:disabled) {
    background-color: #be090c !important;
    color: white !important;
  }
`;

// 危險文字樣式
export const DangerText = styled.div`
  font-weight: 800;
  color: #ef4444;
`;

// Drawer 資訊區域
export const DrawerInfo = styled.div`
  /* 基本容器樣式，如果需要的話可以添加 */
`;

// 資訊項目樣式
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 3.875rem;
  gap: 9px;
  font-family: Inter;
  line-height: 1.0625rem;

  &:not(:first-child) {
    margin-top: 1.25rem;
  }

  > span {
    font-size: 0.875rem;
  }
`;
