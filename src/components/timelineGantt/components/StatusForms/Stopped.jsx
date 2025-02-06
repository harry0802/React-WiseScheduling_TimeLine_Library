// components/StatusForms/Stopped.jsx
import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

const Stopped = ({ disabled }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          {...register("startTime")}
          type="datetime-local"
          label="停機時間"
          error={!!errors.startTime}
          helperText={errors.startTime?.message}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
        />
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
