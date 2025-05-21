// components/StatusForms/TimePickerSection.jsx
import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { FORM_CONFIG } from "../../../configs/validations/schedule/formConfig";

/**
 * @component TimePickerSection
 * @description 時間選擇器區塊 - 這是一個有限的抽象，用於處理所有表單都需要的時間選擇功能
 * AHA 原則：這是唯一一個明確重複出現在所有表單中的部分，所以進行抽象化
 */
const TimePickerSection = ({
  register,
  errors,
  disabled,
  title = "時程安排",
}) => (
  <Grid item xs={12}>
    <Typography variant="subtitle1" color="primary" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          {...register("start")}
          {...FORM_CONFIG.timePickerProps}
          label="開始時間"
          error={!!errors?.start}
          helperText={errors?.start?.message || ""}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          {...register("end")}
          {...FORM_CONFIG.timePickerProps}
          label="結束時間"
          error={!!errors?.end}
          helperText={errors?.end?.message || ""}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  </Grid>
);

export default React.memo(TimePickerSection);
