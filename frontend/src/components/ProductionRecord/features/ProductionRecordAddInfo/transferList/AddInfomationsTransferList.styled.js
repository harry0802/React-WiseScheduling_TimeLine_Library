import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import { commonTheme } from '../../../styles/common';

// 傳輸清單主容器
export const TransferListContainer = styled(Grid)`
  width: 100%;
  padding: 0;
  margin: 0;
  margin-top: 21px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .MuiGrid-item {
    width: 100%;
  }

  .MuiPaper-elevation {
    width: 100% !important;
    border: 1px solid ${commonTheme.colors.border};
    border-radius: 4px;
  }

  .MuiList-dense {
    width: 100%;
    max-height: 11.375rem;
  }
`;