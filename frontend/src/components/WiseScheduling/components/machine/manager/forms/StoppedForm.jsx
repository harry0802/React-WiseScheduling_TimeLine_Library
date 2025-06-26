/**
 * @file StoppedForm.jsx
 * @description 機台停機狀態表單 - 處理機台停機時的相關信息
 * @version 2.0.0
 */

import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Grid } from "@mui/material";
import { Controller } from "react-hook-form";

// 導入自定義表單處理 Hook
import { useFormHandler } from "../../../../hooks/machine/useFormHandler";

// 導入停機原因選擇器
import ReasonSelector from "../../controls/ReasonSelector";

// 導入驗證 schema
import { offlineSchema } from "../../../../configs/validations/machine/machineSchemas";

// 導入狀態常數
import { MACHINE_STATUS } from "../../../../configs/constants/fieldNames";

/**
 * 機台停機狀態表單
 *
 * @component StoppedForm
 * @param {Object} props - 組件屬性
 * @param {Object} props.initialData - 初始數據
 * @param {Object} ref - 轉發的ref，用於暴露內部方法
 * @returns {React.ReactElement}
 */
const StoppedForm = forwardRef(({ initialData }, ref) => {
  // 獲取默認日期的函數

  const getDefaultValues = () => ({
    reason: initialData?.reason || "",
    planStartDate: initialData?.planStartDate,
    planEndDate: initialData?.planEndDate,
    actualStartDate: initialData?.actualStartDate,
    actualEndDate: initialData?.actualEndDate,
    status: MACHINE_STATUS.OFFLINE,
    id: initialData?.id,
    machineId: initialData?.machineId,
  });

  // 使用自定義表單 Hook
  const { control, errors, isDirty } = useFormHandler({
    initialData,
    getDefaultValues,
    schema: offlineSchema,
    ref,
  });


  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {/* 表單頭部信息 */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            機台停機設定
          </Typography>
        </Grid>

        {/* 停機原因選擇器 */}
        <Grid item xs={12}>
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <ReasonSelector
                value={field.value}
                onChange={field.onChange}
                error={!!errors.reason}
                helperText={errors.reason?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

StoppedForm.propTypes = {
  initialData: PropTypes.object,
};

StoppedForm.defaultProps = {
  initialData: {},
};

// 設定組件顯示名稱
StoppedForm.displayName = "StoppedForm";

export default StoppedForm;
