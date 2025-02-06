// components/StatusForms/Idle.jsx
import { Grid, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FORM_CONFIG } from "../../configs/formConfig";

const Idle = ({ disabled, item }) => {
  console.log("🚀 ~ Idle ~ item:", item);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  console.log("🚀 ~ Idle ~ errors:", item.status.startTime);

  return (
    <Grid container spacing={3}>
      {/* 時間組 */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          時程安排
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("startTime")}
              {...FORM_CONFIG.timePickerProps}
              label="開始時間"
              error={!!errors.startTime}
              helperText={errors.startTime?.message}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("endTime")}
              {...FORM_CONFIG.timePickerProps}
              label="結束時間"
              error={!!errors.endTime}
              helperText={errors.endTime?.message}
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Idle;
