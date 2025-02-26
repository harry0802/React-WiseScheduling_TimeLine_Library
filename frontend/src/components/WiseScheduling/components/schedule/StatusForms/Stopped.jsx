// components/StatusForms/Stopped.jsx
import { Grid, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FORM_CONFIG } from "../../../configs/schedule/formConfig";
import { MACHINE_STATUS } from "../../../configs/schedule/constants";
import { useStatusForm } from "../../../hooks/schedule/useStatusForm";

const Stopped = ({ disabled, item }) => {
  const { register, errors, watch, control, initialized } = useStatusForm(
    MACHINE_STATUS.STOPPED,
    item
  );

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
        <TextField
          fullWidth
          {...register("reason")}
          label="停機原因"
          error={!!errors.reason}
          helperText={errors.reason?.message}
          required
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default Stopped;
