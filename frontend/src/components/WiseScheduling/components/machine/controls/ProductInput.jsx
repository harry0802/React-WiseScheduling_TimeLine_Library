/**
 * @file ProductInput.jsx
 * @description 產品名稱文本輸入組件，支援獨立使用或作為表單的一部分
 * @version 3.0.1
 */

import React from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import styled from "styled-components";

//! =============== 1. 設定與常量 ===============
//* 共用屬性設定，便於集中管理輸入欄位的配置
const TEXT_FIELD_PROPS = {
  label: "產品名稱",
  variant: "outlined",
  fullWidth: true,
  placeholder: "請輸入產品名稱",
  multiline: true,
  rows: 4,
};

//* 表單欄位名稱常量
const FIELD_NAME = "product";

//! =============== 2. 樣式定義 ===============
/**
 * 輸入容器樣式 - 提供一致的間距 🧠
 */
const InputContainer = styled.div`
  && {
    padding: 2rem 1.5rem 0 1.5rem;
  }
`;

/**
 * 自定義文本輸入框樣式 💡
 * 遵循 BBC 標準的顏色表示法
 */
const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;

  /* 標籤樣式 */
  .MuiInputLabel-root {
    font-size: 1.25rem;
  }

  /* 輸入文字樣式 */
  .MuiInputBase-input {
    font-size: 1.125rem;
  }

  /* 聚焦時的邊框顏色 */
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: rgba(9.4% 42.4% 59.6% / 1); /* #186c98 轉換為 RGBA 百分比 */
  }

  /* 聚焦時的標籤顏色 */
  .MuiFormLabel-root.Mui-focused {
    color: rgba(9.4% 42.4% 59.6% / 1);
  }
`;

//! =============== 3. 工具函數 ===============
/**
 * 從表單上下文或組件屬性中獲取錯誤狀態和訊息 ✨
 *
 * @function getErrorState
 * @param {Object} formContext - react-hook-form 的表單上下文
 * @param {boolean} isMountedInForm - 是否掛載在表單中
 * @param {boolean} propError - 屬性中傳入的錯誤狀態
 * @param {string} propHelperText - 屬性中傳入的錯誤訊息
 * @param {string} fieldName - 表單欄位名稱
 * @returns {Object} 包含錯誤狀態和訊息的物件
 */
const getErrorState = (
  formContext,
  isMountedInForm,
  propError,
  propHelperText,
  fieldName = FIELD_NAME
) => {
  // 使用早期返回減少巢狀層級
  if (!isMountedInForm) {
    return {
      showError: propError,
      errorMessage: propHelperText,
    };
  }

  return {
    showError: !!formContext.formState.errors?.[fieldName],
    errorMessage: formContext.formState.errors?.[fieldName]?.message || "",
  };
};

//! =============== 4. 核心組件 ===============
/**
 * 產品名稱輸入組件
 *
 * @function ProductInput
 * @description 用於輸入產品名稱的文本輸入組件，可獨立使用或整合至 react-hook-form
 */
const ProductInput = ({
  value: propValue = "",
  onChange: propOnChange,
  error: propError = false,
  helperText: propHelperText = "",
  name = FIELD_NAME,
}) => {
  //! =============== 表單整合邏輯 ===============
  //* 檢測是否在表單上下文中使用
  const formContext = useFormContext();
  const isMountedInForm = !!formContext;
  //* 獲取錯誤狀態和訊息
  const { showError, errorMessage } = getErrorState(
    formContext,
    isMountedInForm,
    propError,
    propHelperText,
    name
  );

  //! =============== 渲染邏輯 ===============
  //* 使用早期返回避免深層巢狀 💡
  if (!isMountedInForm) {
    return (
      <InputContainer>
        <StyledTextField
          value={propValue}
          onChange={(e) => propOnChange && propOnChange(e.target.value)}
          {...TEXT_FIELD_PROPS}
          error={showError}
          helperText={errorMessage}
        />
      </InputContainer>
    );
  }

  //* 表單模式：使用 Controller 包裝
  return (
    <Controller
      name={name}
      control={formContext.control}
      render={({ field }) => (
        <TextField
          {...field}
          label="產品名稱"
          variant="outlined"
          fullWidth
          placeholder="請輸入產品名稱"
          error={showError}
          helperText={errorMessage}
          sx={{
            marginBottom: "1rem",
          }}
        />
      )}
    />
  );
};

export default ProductInput;
