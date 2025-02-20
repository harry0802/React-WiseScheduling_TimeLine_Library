import React from "react";
import {
  Radio,
  FormControlLabel,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

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
    <div style={{ padding: "0 16px" }}>
      <RadioGroup
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "8px",
          width: "100%",
          "& .MuiFormControlLabel-root": {
            marginRight: 0,
            marginLeft: 0,
          },
        }}
      >
        {STOP_REASONS.map((reason) => (
          <FormControlLabel
            key={reason}
            value={reason}
            control={<Radio {...register("status.reason")} />}
            label={reason}
            sx={{
              margin: "4px 0",
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
              },
            }}
          />
        ))}
      </RadioGroup>
      {errors.status?.reason && (
        <FormHelperText error>{errors.status.reason.message}</FormHelperText>
      )}
    </div>
  );
};

export default ReasonSelector;
