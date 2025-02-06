// components/StatusForms/Testing.jsx
import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

const Testing = ({ disabled }) => {
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
          {...register("product")}
          label="測試產品"
          error={!!errors.product}
          helperText={errors.product?.message}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default Testing;
