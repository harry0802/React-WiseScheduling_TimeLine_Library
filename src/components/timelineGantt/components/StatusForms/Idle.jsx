// components/StatusForms/Idle.jsx
import { Grid, TextField, Typography } from "@mui/material";
import { useStatusForm } from "../../hooks/useStatusForm";
import { FORM_CONFIG } from "../../configs/formConfig";
import { MACHINE_STATUS } from "../../configs/constants";

const Idle = ({ disabled, item }) => {
  const { register, errors } = useStatusForm(MACHINE_STATUS.IDLE, item);
  console.log("🚀 ~ Idle ~ errors:", errors);

  if (!item?.status) {
    return null;
  }

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
              {...register("start")}
              {...FORM_CONFIG.timePickerProps}
              label="開始時間"
              error={!!errors.start}
              helperText={errors.start?.message}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("end")}
              {...FORM_CONFIG.timePickerProps}
              label="結束時間"
              error={!!errors.end}
              helperText={errors.end?.message}
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Idle;
