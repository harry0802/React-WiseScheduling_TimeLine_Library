// components/StatusForms/Idle.jsx
import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useStatusForm } from "../../../hooks/schedule/useStatusForm";
import {
  FORM_CONFIG,
  VALIDATION_RULES,
} from "../../../configs/validations/schedule/formConfig";
import {
  MACHINE_CONFIG,
  MACHINE_STATUS,
} from "../../../configs/validations/schedule/constants";
import { createAreaMachines } from "../../../configs/validations/schedule/machineGroups";
import { useMemo } from "react";

/**
 * @function Idle
 * @description 閒置狀態的設備表單
 * @param {boolean} disabled - 是否禁用表單
 * @param {Object} item - 表單項目數據
 * @returns {JSX.Element} 渲染的表單組件
 */
const Idle = ({ disabled, item }) => {
  //! =============== 表單邏輯 ===============
  const { register, errors, watch, isFieldError, initialized } = useStatusForm(
    MACHINE_STATUS.IDLE,
    item
  );

  const selectedArea = watch("area");
  const selectedGroup = watch("group");

  //* 根據選擇的區域過濾機台組
  const filteredGroups = useMemo(
    () => (selectedArea ? createAreaMachines(selectedArea) : []),
    [selectedArea]
  );

  //! =============== 渲染邏輯 ===============
  //* 處理載入狀態
  if (!initialized) {
    return <CircularProgress size={24} />;
  }

  //* 沒有項目數據時不渲染
  if (!item) {
    return null;
  }

  //* 機台禁用條件計算
  const isGroupDisabled = disabled || !selectedArea;

  //* 確保必定有預設值或當前值
  const currentGroupValue = selectedGroup || "";

  return (
    <Grid container spacing={3}>
      {/* 機台選擇區塊 */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          機台選擇
        </Typography>

        <Grid container spacing={2}>
          {/* 區域選擇 */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("area", VALIDATION_RULES.area)}
              select
              label="區域"
              error={isFieldError("area")}
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

          {/* 機台編號選擇 */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("group", VALIDATION_RULES.group)}
              select
              label="機台編號"
              error={isFieldError("group")}
              helperText={errors.group?.message}
              disabled={isGroupDisabled}
              value={currentGroupValue}
            >
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.content}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  請先選擇區域
                </MenuItem>
              )}
            </TextField>
          </Grid>
        </Grid>
      </Grid>

      {/* 時間安排區塊 */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          時程安排
        </Typography>
        <Grid container spacing={2}>
          {/* 開始時間 */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("start")}
              {...FORM_CONFIG.timePickerProps}
              label="開始時間"
              error={isFieldError("start")}
              helperText={errors.start?.message}
              disabled={disabled}
            />
          </Grid>

          {/* 結束時間 */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("end")}
              {...FORM_CONFIG.timePickerProps}
              label="結束時間"
              error={isFieldError("end")}
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
