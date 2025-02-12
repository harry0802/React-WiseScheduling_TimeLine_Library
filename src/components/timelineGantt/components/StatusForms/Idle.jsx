// components/StatusForms/Idle.jsx
import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useStatusForm } from "../../hooks/useStatusForm";
import { FORM_CONFIG, VALIDATION_RULES } from "../../configs/formConfig";
import { MACHINE_CONFIG, MACHINE_STATUS } from "../../configs/constants";
import { createAreaMachines } from "../../configs/machineGroups";
import { useMemo } from "react";

const Idle = ({ disabled, item }) => {
  console.log("🚀 ~ Idle ~ item:", item);
  const { register, errors, watch, initialized } = useStatusForm(
    MACHINE_STATUS.IDLE,
    item
  );
  const selectedArea = watch("area");
  console.log(watch("group"));

  const filteredGroups = useMemo(
    () => (selectedArea ? createAreaMachines(selectedArea) : []),
    [selectedArea]
  );

  if (!initialized) {
    return <CircularProgress />; // 或其他 loading 狀態
  }

  if (!item) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {/* 機台選擇 */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          機台選擇
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("area", VALIDATION_RULES.area)}
              select
              label="區域"
              error={!!errors.area}
              helperText={errors.area?.message}
              disabled={disabled}
              value={selectedArea || ""}
            >
              {MACHINE_CONFIG.AREAS.map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("group", VALIDATION_RULES.group)}
              select
              label="機台編號"
              error={!!errors.group}
              helperText={errors.group?.message}
              disabled={disabled || !item?.area}
              value={watch("group") || filteredGroups[0]?.id || ""}
            >
              {filteredGroups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.content}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Grid>

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
