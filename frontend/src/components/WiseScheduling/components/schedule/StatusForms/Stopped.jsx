// components/StatusForms/Stopped.jsx
import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { useStatusForm } from "../../../hooks/schedule/useStatusForm";
import { MACHINE_STATUS } from "../../../configs/validations/schedule/constants";
import TimePickerSection from "./TimePickerSection";

/**
 * @function Stopped
 * @description 停機狀態的設備表單
 * @param {boolean} disabled - 是否禁用表單
 * @param {Object} item - 表單項目數據
 * @returns {JSX.Element} 渲染的表單組件
 */
const Stopped = ({ disabled, item }) => {
  // 使用狀態表單鉤子
  const { register, errors, watch, initialized } = useStatusForm(
    MACHINE_STATUS.STOPPED,
    item
  );

  // 停機原因選項
  const STOP_REASONS = [
    "機台故障",
    "人員不足",
    "等待物料",
    "機台保養",
    "塑料未乾",
    "模具維修",
    "換模換線",
    "異常停機"
    // "其他原因" - 暫時不啟用其他原因選項
  ];

  // 如果選擇了"其他原因"，則需要輸入具體說明
  const selectedReason = watch("reason");
  // 暫時不使用"其他原因"邏輯
  // const isOtherReason = selectedReason === "其他原因";

  // 優化下拉選單的表單驗證邏輯
  const validateReason = (value) => {
    // 基本驗證：必須選擇一個原因
    if (!value) return "請選擇停機原因";
    
    // 確保選擇的值在允許的選項中
    if (!STOP_REASONS.includes(value)) return "請選擇有效的停機原因";
    
    // 其他原因的驗證邏輯 - 暫時注釋掉
    /*
    if (value === "其他原因") {
      const otherReasonText = watch("otherReasonText");
      if (!otherReasonText || otherReasonText.length < 2) {
        return "其他原因說明至少需要2個字";
      }
    }
    */
    
    return true;
  };

  return (
    <Grid container spacing={2}>
      {/* 使用抽象的時間選擇器部分 */}
      <TimePickerSection 
        register={register} 
        errors={errors} 
        disabled={disabled}
      />

      {/* 停機原因 - 下拉選單 */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          {...register("reason", {
            required: "請選擇停機原因",
            validate: validateReason
          })}
          select
          label="停機原因"
          error={!!errors.reason}
          helperText={errors.reason?.message || ""}
          required
          disabled={disabled}
          value={selectedReason || ""}
        >
          <MenuItem value="" disabled>請選擇停機原因</MenuItem>
          {STOP_REASONS.map((reason) => (
            <MenuItem key={reason} value={reason}>
              {reason}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* 如果選擇"其他原因"，顯示輸入欄位 - 暫時注釋掉 */}
      {/*
      {isOtherReason && (
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            {...register("otherReasonText", {
              required: "請輸入具體原因",
              minLength: {
                value: 2,
                message: "說明至少需要2個字"
              }
            })}
            label="請說明具體原因"
            error={!!errors.otherReasonText}
            helperText={errors.otherReasonText?.message || "至少輸入2個字"}
            required
            disabled={disabled}
          />
        </Grid>
      )}
      */}
    </Grid>
  );
};

export default Stopped;
