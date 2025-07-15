import styled from 'styled-components';
import { flexCenter, commonTheme } from './common';

// 記錄主容器
export const RecordContainer = styled.div`
  width: 100%;
`;

// 記錄內容容器
export const RecordWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
`;

// 記錄頭部
export const RecordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 記錄標題
export const RecordTitle = styled.h3`
  color: ${commonTheme.colors.white};
  font-family: Roboto;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25rem;
  margin: 0;
`;

// 記錄操作區
export const RecordActions = styled.div`
  ${flexCenter}
  gap: 10px;
`;

// 記錄按鈕容器
export const RecordActionButton = styled.div`
  display: flex;
  gap: 10px;
`;

// 記錄區塊
export const RecordSections = styled.section`
  margin-top: 1.187rem;
`;