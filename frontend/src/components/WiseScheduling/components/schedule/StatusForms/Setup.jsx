// components/StatusForms/Setup.jsx
import React from "react";
import { CircularProgress, Grid, TextField } from "@mui/material";
import { useStatusForm } from "../../../hooks/schedule/useStatusForm";
import { MACHINE_STATUS } from "../../../configs/validations/schedule/constants";
import TimePickerSection from "./TimePickerSection";

/**
 * @function Setup
 * @description 設置狀態的設備表單
 * @param {boolean} disabled - 是否禁用表單
 * @param {Object} item - 表單項目數據
 * @returns {JSX.Element} 渲染的表單組件
 */
const Setup = ({ disabled, item }) => {
  console.log("🚀 ~ Setup ~ item:", item);
  
  // 使用狀態表單鉤子
  const { register, errors, initialized } = useStatusForm(
    MACHINE_STATUS.SETUP,
    item
  );

  // 處理載入狀態
  if (!item || !initialized) {
    return <CircularProgress />; 
  }

  return (
    <Grid container spacing={2}>
      {/* 使用抽象的時間選擇器部分 */}
      <TimePickerSection 
        register={register} 
        errors={errors} 
        disabled={disabled}
      />

      {/* 調機說明 - 特定於此表單，保持獨立 */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          {...register("reason")}
          label="調機說明"
          multiline
          rows={2}
          error={!!errors.reason}
          helperText={errors.reason?.message}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default Setup;
