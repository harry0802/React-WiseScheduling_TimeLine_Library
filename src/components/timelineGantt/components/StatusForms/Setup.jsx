// components/StatusForms/Setup.jsx
import { Grid, TextField } from "@mui/material";
import { useStatusForm } from "../../hooks/useStatusForm";

// 🧠 上模與調機狀態表單
const Setup = ({ item, disabled }) => {
  const { register, errors } = useStatusForm("SETUP", item);

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
          {...register("setupInfo")}
          label="調機說明"
          multiline
          rows={2}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default Setup;
