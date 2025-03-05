/**
 * @file IdleForm.jsx
 * @description 待機狀態表單 - 處理機台待機時的相關信息
 * @version 2.1.0
 */

import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { Box, Typography, TextField, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

// 導入驗證 schema
import { idleSchema } from "../../../configs/validations/machine/machineSchemas";

// 預設日期計算 - 移動到組件外部確保只計算一次
const getDefaultDates = () => ({
  planStartDate: dayjs().format("YYYY-MM-DDTHH:mm"),
  planEndDate: dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
  actualStartDate: dayjs().format("YYYY-MM-DDTHH:mm"),
});

/**
 * 待機狀態表單
 *
 * @component IdleForm
 * @param {Object} props - 組件屬性
 * @param {Object} props.initialData - 初始數據
 * @param {Object} ref - 轉發的ref，用於暴露內部方法
 * @returns {React.ReactElement}
 */
const IdleForm = forwardRef(({ initialData }, ref) => {
  // 只計算一次初始值
  const defaultValues = useMemo(() => {
    const defaultDates = getDefaultDates();
    return {
      reason: initialData?.reason || "",
      planStartDate: initialData?.planStartDate || defaultDates.planStartDate,
      planEndDate: initialData?.planEndDate || defaultDates.planEndDate,
      actualStartDate:
        initialData?.actualStartDate || defaultDates.actualStartDate,
      status: "IDLE",
    };
  }, [initialData]);

  // ✨ 使用 React Hook Form 管理表單狀態和驗證
  const {
    control,
    formState: { errors },
    reset,
    getValues,
    trigger,
  } = useForm({
    resolver: zodResolver(idleSchema),
    defaultValues,
    mode: "onChange",
  });

  /**
   * 驗證表單並獲取結果
   * @returns {Promise<{isValid: boolean, errors: Object|null}>}
   */
  const validate = useCallback(async () => {
    const isValid = await trigger();
    return {
      isValid,
      errors: isValid ? null : errors,
    };
  }, [trigger, errors]);

  /**
   * 重置表單為初始狀態
   */
  const resetForm = useCallback(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  // 暴露方法給父組件
  useImperativeHandle(
    ref,
    () => ({
      getValues,
      validate,
      reset: resetForm,
    }),
    [getValues, validate, resetForm]
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {/* 表單頭部信息 */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            待機狀態設定
          </Typography>
        </Grid>

        {/* 待機開始時間 */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="planStartDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="預計開始時間"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.planStartDate}
                helperText={errors.planStartDate?.message}
              />
            )}
          />
        </Grid>

        {/* 預計結束時間 */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="planEndDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="預計結束時間"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.planEndDate}
                helperText={errors.planEndDate?.message}
              />
            )}
          />
        </Grid>

        {/* 實際開始時間 */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="actualStartDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="實際開始時間"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.actualStartDate}
                helperText={errors.actualStartDate?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

IdleForm.propTypes = {
  initialData: PropTypes.object,
};

IdleForm.defaultProps = {
  initialData: {},
};

// 設定組件顯示名稱
IdleForm.displayName = "IdleForm";

export default IdleForm;
