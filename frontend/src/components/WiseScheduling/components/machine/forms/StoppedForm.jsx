/**
 * @file StoppedForm.jsx
 * @description 機台停機狀態表單 - 處理機台停機時的相關信息
 * @version 2.0.0
 */

import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { Box, Typography, TextField, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dayjs from "dayjs";

// 導入停機原因選擇器
import ReasonSelector from "../ReasonSelector";

// 🧠 定義表單驗證模式
const stoppedFormSchema = z.object({
  reason: z.string().optional(),
  planStartDate: z.string().optional(),
  planEndDate: z.string().optional(),
  actualStartDate: z.string().optional(),
  note: z.string().optional(),
});

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
  // 預先計算預設日期值，避免重複計算
  const defaultDates = useMemo(
    () => ({
      planStartDate: dayjs().format("YYYY-MM-DDTHH:mm"),
      planEndDate: dayjs().add(2, "hour").format("YYYY-MM-DDTHH:mm"),
      actualStartDate: dayjs().format("YYYY-MM-DDTHH:mm"),
    }),
    []
  );

  // 本地狀態，用於控制與非表單綁定的組件
  const [formState, setFormState] = useState({
    reason: initialData?.reason || "",
  });

  // ✨ 使用 React Hook Form 管理表單狀態和驗證
  const {
    control,
    formState: { errors },
    reset,
    getValues,
    trigger,
    setValue,
  } = useForm({
    resolver: zodResolver(stoppedFormSchema),
    defaultValues: {
      reason: initialData?.reason || "",
      planStartDate: initialData?.planStartDate || defaultDates.planStartDate,
      planEndDate: initialData?.planEndDate || defaultDates.planEndDate,
      actualStartDate:
        initialData?.actualStartDate || defaultDates.actualStartDate,
      note: initialData?.note || "",
    },
  });

  // 當初始數據更新時重置表單
  useEffect(() => {
    if (initialData) {
      reset({
        reason: initialData.reason || "",
        planStartDate: initialData.planStartDate || defaultDates.planStartDate,
        planEndDate: initialData.planEndDate || defaultDates.planEndDate,
        actualStartDate:
          initialData.actualStartDate || defaultDates.actualStartDate,
        note: initialData.note || "",
      });

      setFormState({
        reason: initialData.reason || "",
      });
    }
  }, [initialData, reset, defaultDates]);

  // 處理原因變更
  const handleReasonChange = useCallback(
    (value) => {
      setFormState((prev) => ({ ...prev, reason: value }));
      setValue("reason", value);
    },
    [setValue]
  );

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
    reset({
      reason: initialData?.reason || "",
      planStartDate: initialData?.planStartDate || defaultDates.planStartDate,
      planEndDate: initialData?.planEndDate || defaultDates.planEndDate,
      actualStartDate:
        initialData?.actualStartDate || defaultDates.actualStartDate,
      note: initialData?.note || "",
    });

    setFormState({
      reason: initialData?.reason || "",
    });
  }, [initialData, reset, defaultDates]);

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
            機台停機設定
          </Typography>
        </Grid>

        {/* 停機開始時間 */}
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

        {/* 停機原因選擇器 */}
        <Grid item xs={12}>
          <ReasonSelector
            value={formState.reason}
            onChange={handleReasonChange}
            error={!!errors.reason}
            helperText={errors.reason?.message}
          />
        </Grid>

        {/* 備註 */}
        <Grid item xs={12}>
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="備註說明"
                fullWidth
                multiline
                rows={3}
                error={!!errors.note}
                helperText={errors.note?.message}
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
