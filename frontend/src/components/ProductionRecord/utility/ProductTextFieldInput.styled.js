import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { commonTheme } from '../styles/common';

// 樣式化的 TextField 組件
export const StyledTextField = styled(TextField)`
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