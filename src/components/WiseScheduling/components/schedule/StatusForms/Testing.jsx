// components/StatusForms/Testing.jsx
import React from "react";
import { Grid, TextField } from "@mui/material";
import { useStatusForm } from "../../../hooks/schedule/useStatusForm";
import { MACHINE_STATUS } from "../../../configs/validations/schedule/constants";
import TimePickerSection from "./TimePickerSection";

/**
 * @function Testing
 * @description 測試狀態的設備表單
 * @param {boolean} disabled - 是否禁用表單
 * @param {Object} item - 表單項目數據
 * @returns {JSX.Element} 渲染的表單組件
 */
const Testing = ({ disabled, item }) => {
  // 使用狀態表單鉤子
  const { register, errors, initialized } = useStatusForm(
    MACHINE_STATUS.TESTING,
    item
  );

  // 移除產品必填驗證，因為產品不一定需要

  return (
    <Grid container spacing={1}>
      {/* 使用抽象的時間選擇器部分 */}
      <TimePickerSection 
        register={register} 
        errors={errors} 
        disabled={disabled}
      />

      {/* 產品欄位 - 特定於此表單，但不再是必填 */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          {...register("product")}
          label="測試產品"
          error={!!errors.product}
          helperText={errors.product?.message || ""}
          disabled={disabled}
          // 移除 required 屬性
        />
      </Grid>
    </Grid>
  );
};

export default Testing;
