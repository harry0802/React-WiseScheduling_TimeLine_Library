// components/StatusForms/Setup.jsx
import { CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FORM_CONFIG } from "../../../configs/validations/schedule/formConfig";
import { useStatusForm } from "../../../hooks/schedule/useStatusForm";
import { MACHINE_STATUS } from "../../../configs/validations/schedule/constants";

const Setup = ({ disabled, item }) => {
  console.log("🚀 ~ Setup ~ item:", item);
  const { register, errors, watch, control, initialized } = useStatusForm(
    MACHINE_STATUS.SETUP,
    item
  );

  if (!item || !initialized) {
    return <CircularProgress />; // 或其他 loading 狀態
  }

  return (
    <Grid container spacing={2}>
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

      <Grid item xs={12} sm={6}>
        <Typography
          variant="subtitle1"
          color="primary"
          gutterBottom
        ></Typography>
        <TextField
          fullWidth
          {...register("reason")}
          label="調機說明"
          multiline
          rows={2}
          error={!!errors.reason}
          helperText={errors.reason?.message}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default Setup;
