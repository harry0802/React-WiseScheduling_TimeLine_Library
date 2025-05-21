// components/StatusForms/Idle.jsx
import React, { useMemo } from "react";
import { Grid, MenuItem, TextField, Typography, CircularProgress } from "@mui/material";
import { useStatusForm } from "../../../hooks/schedule/useStatusForm";
import {
  VALIDATION_RULES,
} from "../../../configs/validations/schedule/formConfig";
import {
  MACHINE_CONFIG,
  MACHINE_STATUS,
} from "../../../configs/validations/schedule/constants";
import { createAreaMachines } from "../../../configs/validations/schedule/machineGroups";
import TimePickerSection from "./TimePickerSection";

/**
 * @function Idle
 * @description 閒置狀態的設備表單
 * @param {boolean} disabled - 是否禁用表單
 * @param {Object} item - 表單項目數據
 * @param {string} status - 表單目前狀態
 * @param {string} mode - 表單模式: 'create' 或 'edit'
 * @returns {JSX.Element} 渲染的表單組件
 */
const Idle = ({ disabled, item, status, mode = 'create' }) => {
  //! =============== 表單邏輯 ===============
  const { register, errors, watch, isFieldError, initialized } = useStatusForm(
    MACHINE_STATUS.IDLE,
    item
  );

  const selectedArea = watch("area");
  const selectedGroup = watch("group");

  // 確定是否為編輯模式 (通過傳入的 mode 參數判斷)
  const isEditMode = mode === 'edit';

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

  //* 機台和區域在編輯模式下禁用，在新增模式下啟用
  const isAreaDisabled = disabled || isEditMode;
  const isGroupDisabled = disabled || !selectedArea || isEditMode;

  //* 確保必定有預設值或當前值
  const currentGroupValue = selectedGroup || "";

  // 區域和機台禁用時的幫助文本
  const getMachineHelperText = () => {
    if (isEditMode) {
      return "編輯現有事件時不可變更機台";
    }
    if (!selectedArea) {
      return "請先選擇區域";
    }
    return errors.group?.message || "";
  };

  const getAreaHelperText = () => {
    if (isEditMode) {
      return "編輯現有事件時不可變更區域";
    }
    return errors.area?.message || "";
  };

  return (
    <Grid container spacing={3}>
      {/* 機台選擇區塊 - 特定於此表單，保持獨立 */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          機台選擇{isEditMode ? " (編輯模式下不可變更)" : ""}
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
              helperText={getAreaHelperText()}
              disabled={isAreaDisabled}
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
              helperText={getMachineHelperText()}
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

      {/* 使用抽象的時間選擇器部分 - 唯一確定在所有表單中重複的部分 */}
      <TimePickerSection 
        register={register} 
        errors={errors} 
        disabled={disabled}
      />
    </Grid>
  );
};

export default Idle;
