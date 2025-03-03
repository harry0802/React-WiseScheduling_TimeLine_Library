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

const ReasonSelector = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <SelectorContainer>
      <RadioGroup
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px 128px ",
          width: "100%",
        }}
      >
        {STOP_REASONS.map((reason) => (
          <StyledFormControlLabel
            key={reason}
            value={reason}
            control={<StyledRadio {...register("reason")} />}
            label={reason}
          />
        ))}
      </RadioGroup>
      {errors.reason && (
        <FormHelperText error>{errors.reason.message}</FormHelperText>
      )}
    </SelectorContainer>
  );
};

export default ReasonSelector;
