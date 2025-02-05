// components/StatusForms/Idle.jsx
import { Grid, TextField } from "@mui/material";
import { useStatusForm } from "../../hooks/useStatusForm";
import { MACHINE_STATUS } from "../../configs/constants";

const Idle = ({ item, disabled }) => {
  const { register, errors } = useStatusForm(MACHINE_STATUS.IDLE, item);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          {...register("startTime", { required: "必填欄位" })}
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
          {...register("endTime")}
          type="datetime-local"
          label="結束時間"
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default Idle;
