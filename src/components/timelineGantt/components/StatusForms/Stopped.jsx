import { Grid, TextField } from "@mui/material";
import { useStatusForm } from "../../hooks/useStatusForm";
import { MACHINE_STATUS } from "../../configs/constants";

// components/StatusForms/Stopped.jsx
const Stopped = ({ item, disabled }) => {
  const { register, errors } = useStatusForm(MACHINE_STATUS.STOPPED, item);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          {...register("startTime", { required: "必填欄位" })}
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
          {...register("reason", { required: "必填欄位" })}
          label="停機原因"
          error={!!errors.reason}
          helperText={errors.reason?.message}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default Stopped;
