import React from "react";
import { FormHelperText, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";

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

function ProductInput() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <InputContainer>
      <Controller
        name="product"
        control={control}
        render={({ field }) => (
          <StyledTextField
            {...field}
            label="產品名稱"
            variant="outlined"
            fullWidth
            placeholder="請輸入產品名稱"
            error={!!errors.product}
            helperText={errors.product?.message || ""}
            multiline
            rows={4}
          />
        )}
      />
    </InputContainer>
  );
}

export default ProductInput;
