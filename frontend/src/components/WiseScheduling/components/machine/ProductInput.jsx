/**
 * @file ProductInput.jsx
 * @description 產品名稱輸入組件
 * @version 2.0.0
 */

import React from "react";
import { FormHelperText, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

// 使用 styled-components 定義樣式化元素
const InputContainer = styled.div`
  padding: 2rem 1.5rem 0 1.5rem;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
  .MuiInputLabel-root {
    font-size: 20px;
  }
  .MuiInputBase-input {
    font-size: 18px;
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #186c98;
  }

  .MuiFormLabel-root.Mui-focused {
    color: #186c98;
  }
`;

/**
 * 產品名稱輸入組件
 * 
 * @component ProductInput
 * @param {Object} props - 組件屬性
 * @param {string} props.value - 輸入值
 * @param {Function} props.onChange - 值變更處理函數
 * @param {boolean} props.error - 是否顯示錯誤
 * @param {string} props.helperText - 錯誤提示文字
 * @returns {React.ReactElement}
 */
function ProductInput({ value: propValue, onChange: propOnChange, error: propError, helperText: propHelperText }) {
  // 嘗試獲取表單上下文
  const formContext = useFormContext();
  const isMountedInForm = !!formContext;
  
  // 決定是否顯示錯誤
  const showError = isMountedInForm 
    ? !!formContext.formState.errors?.product 
    : propError;
    
  const errorMessage = isMountedInForm 
    ? formContext.formState.errors?.product?.message 
    : propHelperText;
  
  // 如果在表單上下文中，使用 Controller 包裝
  if (isMountedInForm) {
    return (
      <InputContainer>
        <Controller
          name="product"
          control={formContext.control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              label="產品名稱"
              variant="outlined"
              fullWidth
              placeholder="請輸入產品名稱"
              error={showError}
              helperText={errorMessage || ""}
              multiline
              rows={4}
            />
          )}
        />
      </InputContainer>
    );
  }
  
  // 獨立模式，使用直接的 props
  return (
    <InputContainer>
      <StyledTextField
        value={propValue}
        onChange={(e) => propOnChange && propOnChange(e.target.value)}
        label="產品名稱"
        variant="outlined"
        fullWidth
        placeholder="請輸入產品名稱"
        error={showError}
        helperText={errorMessage || ""}
        multiline
        rows={4}
      />
    </InputContainer>
  );
}

ProductInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string
};

ProductInput.defaultProps = {
  value: "",
  error: false,
  helperText: ""
};

export default ProductInput;