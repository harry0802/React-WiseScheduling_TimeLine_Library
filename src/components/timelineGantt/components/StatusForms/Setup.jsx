// components/StatusForms/Setup.jsx
import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

const Setup = ({ disabled }) => {
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
          label="開始時間"
          error={!!errors.startTime}
          helperText={errors.startTime?.message}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          {...register("setupInfo")}
          label="調機說明"
          multiline
          rows={2}
          error={!!errors.setupInfo}
          helperText={errors.setupInfo?.message}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default Setup;
