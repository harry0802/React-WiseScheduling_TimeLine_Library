// components/StatusForms/Testing.jsx
import { Grid, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FORM_CONFIG } from "../../configs/formConfig";
import { useStatusForm } from "../../hooks/useStatusForm";
import { MACHINE_STATUS } from "../../configs/constants";

const Testing = ({ disabled, item }) => {
  const { register, errors, watch, control, initialized } = useStatusForm(
    MACHINE_STATUS.TESTING,
    item
  );

  return (
    <Grid container spacing={1}>
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
