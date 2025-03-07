/**
 * @file ReasonSelector.jsx
 * @description 停機原因選擇器組件，支援獨立使用或作為表單的一部分
 * @version 3.0.0
 */

import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import {
  Radio,
  FormControlLabel,
  RadioGroup,
  FormHelperText,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

//! =============== 1. 設定與常量 ===============
//* 停機原因選項列表，集中管理便於後續擴充
const STOP_REASONS = [
  "機台故障",
  "人員不足",
  "等待物料",
  "機台保養",
  "塑料未乾",
  "模具維修",
  "換模換線",
  "異常停機",
];

//! =============== 2. 樣式定義 ===============
//* 使用 styled-components 並符合 BEM 命名規範

/**
 * 選擇器容器樣式
 * @type {import('@emotion/styled').StyledComponent}
 */
const SelectorContainer = styled(Box)`
  padding: 2rem 1.5rem 0 1.5rem;
`;

/**
 * 自定義單選按鈕樣式
 * @type {import('@emotion/styled').StyledComponent}
 */
const StyledRadio = styled(Radio)`
  padding: 0.5rem;

  &.Mui-checked {
    color: #186c98;
  }

  & .MuiSvgIcon-root {
    font-size: 1.875rem;
  }
`;

/**
 * 選項標籤樣式
 * @type {import('@emotion/styled').StyledComponent}
 */
const StyledFormControlLabel = styled(FormControlLabel)`
  margin: 0.5rem 0;
  width: 100%;

  && .MuiFormControlLabel-label {
    font-size: 1.5rem;
    color: #8f8f8f;
    margin-left: 4px;
  }
`;

/**
 * 選項群組樣式
 * @type {import('@emotion/styled').StyledComponent}
 */
const StyledRadioGroup = styled(RadioGroup)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 8rem;
  width: 100%;
  & .MuiFormControlLabel-root {
    &:nth-child(odd) {
      justify-content: flex-end;
    }
  }
`;

//! =============== 3. 核心組件 ===============
/**
 * 停機原因選擇器組件
 *
 * @function ReasonSelector
 * @description 用於選擇機器停機原因的單選組件，可獨立使用或整合至 react-hook-form
 *
 * @param {Object} props - 組件屬性
 * @param {string} [props.value] - 當前選擇的原因值
 * @param {Function} [props.onChange] - 值變更處理函數
 * @param {boolean} [props.error] - 是否顯示錯誤
 * @param {string} [props.helperText] - 錯誤提示文字
 * @param {string} [props.name="reason"] - 表單欄位名稱
 *
 * @returns {React.ReactElement} 停機原因選擇器組件
 *
 * @example
 * // 基礎使用示例
 * const [reason, setReason] = useState('');
 * <ReasonSelector value={reason} onChange={setReason} />
 *
 * @example
 * // 在 react-hook-form 中使用
 * <FormProvider {...methods}>
 *   <ReasonSelector />
 * </FormProvider>
 *
 * @notes
 * - 當在表單中使用時，會自動連接到 react-hook-form 的上下文
 * - 支援表單驗證錯誤顯示
 *
 * @commonErrors
 * - 未提供 onChange 處理函數但使用於非表單環境
 * - 表單錯誤訊息未正確配置
 */
const ReasonSelector = ({
  value: propValue,
  onChange: propOnChange,
  error: propError,
  helperText: propHelperText,
  name = "reason",
}) => {
  //! =============== 表單整合邏輯 ===============
  //* 檢測是否在表單上下文中使用
  const formContext = useFormContext();
  const isMountedInForm = !!formContext;

  //* 獲取表單相關屬性和方法
  let formRegister, formErrors;
  if (isMountedInForm) {
    const {
      register,
      formState: { errors },
    } = formContext;
    formRegister = register;
    formErrors = errors;
  }

  //! =============== 事件處理 ===============
  /**
   * 處理選項變更事件
   * @param {React.ChangeEvent<HTMLInputElement>} e - 變更事件對象
   */
  const handleChange = (e) => {
    if (propOnChange) {
      propOnChange(e.target.value);
    }
  };

  //! =============== 錯誤處理 ===============
  //* 決定是否顯示錯誤及錯誤訊息
  const showError = isMountedInForm ? !!formErrors?.[name] : propError;
  const errorMessage = isMountedInForm
    ? formErrors?.[name]?.message
    : propHelperText;

  //! =============== 渲染組件 ===============
  return (
    <SelectorContainer>
      <StyledRadioGroup value={propValue} onChange={handleChange}>
        {STOP_REASONS.map((reason) => (
          <StyledFormControlLabel
            key={reason}
            value={reason}
            control={
              <StyledRadio {...(isMountedInForm ? formRegister(name) : {})} />
            }
            label={reason}
          />
        ))}
      </StyledRadioGroup>

      {showError && <FormHelperText error>{errorMessage}</FormHelperText>}
    </SelectorContainer>
  );
};

//! =============== 4. PropTypes 定義 ===============
//* 明確定義組件屬性類型，幫助開發者理解如何使用
ReasonSelector.propTypes = {
  /** 當前選擇的原因值 */
  value: PropTypes.string,
  /** 值變更處理函數 */
  onChange: PropTypes.func,
  /** 是否顯示錯誤 */
  error: PropTypes.bool,
  /** 錯誤提示文字 */
  helperText: PropTypes.string,
  /** 表單欄位名稱 */
  name: PropTypes.string,
};

export default ReasonSelector;
