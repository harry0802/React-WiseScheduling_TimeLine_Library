// components/StatusForms/TimePickerSection.jsx
import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { FORM_CONFIG } from "../../../configs/validations/schedule/formConfig";

/**
 * @component TimePickerSection
 * @description 時間選擇器區塊 - 提供預計時間與實際時間的四個獨立欄位
 * 包含：planStartTime, planEndTime, actualStartTime, actualEndTime
 * AHA 原則：這是唯一一個明確重複出現在所有表單中的部分，所以進行抽象化
 */
const TimePickerSection = ({
  register,
  errors,
  disabled,
  title = "時程安排",
}) => (
  <>
    <Grid item xs={12}>
      <Typography variant="subtitle1" color="primary" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            {...register("planStartTime")}
            {...FORM_CONFIG.timePickerProps}
            label="預計開始時間"
            error={!!errors?.planStartTime}
            helperText={errors?.planStartTime?.message || ""}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            {...register("planEndTime")}
            {...FORM_CONFIG.timePickerProps}
            label="預計結束時間"
            error={!!errors?.planEndTime}
            helperText={errors?.planEndTime?.message || ""}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            {...register("actualStartTime")}
            {...FORM_CONFIG.timePickerProps}
            label="實際開始時間"
            error={!!errors?.actualStartTime}
            helperText={errors?.actualStartTime?.message || ""}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            {...register("actualEndTime")}
            {...FORM_CONFIG.timePickerProps}
            label="實際結束時間"
            error={!!errors?.actualEndTime}
            helperText={errors?.actualEndTime?.message || ""}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Grid>
  </>
);

export default React.memo(TimePickerSection);
