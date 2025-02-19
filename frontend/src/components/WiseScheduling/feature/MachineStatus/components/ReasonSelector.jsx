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
    <div>
      <RadioGroup>
        {STOP_REASONS.map((reason) => (
          <FormControlLabel
            key={reason}
            value={reason}
            control={<Radio {...register("status.reason")} />}
            label={reason}
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
