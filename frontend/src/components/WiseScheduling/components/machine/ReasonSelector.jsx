/**
 * @file ReasonSelector.jsx
 * @description 停機原因選擇器組件
 * @version 2.0.0
 */

import React from "react";
import {
  Radio,
  FormControlLabel,
  RadioGroup,
  FormHelperText,
  Box,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const SelectorContainer = styled(Box)`
  padding: 2rem 1.5rem 0 1.5rem;
`;

const StyledRadio = styled(Radio)`
  padding: 0.5rem;

  &.Mui-checked {
    color: #186c98;
  }

  & .MuiSvgIcon-root {
    font-size: 1.875rem;
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  margin: 8px 0;
  width: 100%;

  & .MuiFormControlLabel-label {
    font-size: 1.5rem;
    color: #8f8f8f;
    margin-left: 4px;
  }

  &.Mui-checked .MuiFormControlLabel-label {
    color: #186c98;
  }
`;

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

/**
 * 停機原因選擇器組件
 * 
 * @component ReasonSelector
 * @param {Object} props - 組件屬性
 * @param {string} props.value - 當前選擇的原因值
 * @param {Function} props.onChange - 值變更處理函數
 * @param {boolean} props.error - 是否顯示錯誤
 * @param {string} props.helperText - 錯誤提示文字
 * @returns {React.ReactElement}
 */
const ReasonSelector = ({ value: propValue, onChange: propOnChange, error: propError, helperText: propHelperText }) => {
  // 嘗試獲取表單上下文
  const formContext = useFormContext();
  const isMountedInForm = !!formContext;
  
  // 如果在表單上下文中，使用表單的 register 方法
  let formRegister, formErrors;
  if (isMountedInForm) {
    const { register, formState: { errors } } = formContext;
    formRegister = register;
    formErrors = errors;
  }
  
  // 處理獨立模式和表單模式的值變更
  const handleChange = (e) => {
    if (propOnChange) {
      propOnChange(e.target.value);
    }
  };
  
  // 決定是否顯示錯誤
  const showError = isMountedInForm ? !!formErrors?.reason : propError;
  const errorMessage = isMountedInForm ? formErrors?.reason?.message : propHelperText;
  
  return (
    <SelectorContainer>
      <RadioGroup
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px 128px",
          width: "100%",
        }}
        value={propValue}
        onChange={handleChange}
      >
        {STOP_REASONS.map((reason) => (
          <StyledFormControlLabel
            key={reason}
            value={reason}
            control={
              <StyledRadio 
                {...(isMountedInForm ? formRegister("reason") : {})}
              />
            }
            label={reason}
          />
        ))}
      </RadioGroup>
      
      {showError && (
        <FormHelperText error>{errorMessage}</FormHelperText>
      )}
    </SelectorContainer>
  );
};

ReasonSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string
};

ReasonSelector.defaultProps = {
  value: "",
  error: false,
  helperText: ""
};

export default ReasonSelector;