/**
 * @file TestingForm.jsx
 * @description 產品試模狀態表單 - 處理機台試模時的相關信息
 * @version 2.0.0
 */

import React, { forwardRef, useImperativeHandle, useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Typography, TextField, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dayjs from "dayjs";

// 導入產品輸入組件
import ProductInput from "../ProductInput";

// 🧠 定義表單驗證模式
const testingFormSchema = z.object({
  product: z.string().optional(),
  planStartDate: z.string().optional(),
  planEndDate: z.string().optional(),
  actualStartDate: z.string().optional(),
  note: z.string().optional()
});

/**
 * 產品試模狀態表單
 * 
 * @component TestingForm
 * @param {Object} props - 組件屬性
 * @param {Object} props.initialData - 初始數據
 * @param {Object} ref - 轉發的ref，用於暴露內部方法
 * @returns {React.ReactElement}
 */
const TestingForm = forwardRef(({ initialData }, ref) => {
  // 預先計算預設日期值，避免重複計算
  const defaultDates = useMemo(() => ({
    planStartDate: dayjs().format("YYYY-MM-DDTHH:mm"),
    planEndDate: dayjs().add(4, 'hour').format("YYYY-MM-DDTHH:mm"),
    actualStartDate: dayjs().format("YYYY-MM-DDTHH:mm")
  }), []);
  
  // 本地狀態，用於控制與非表單綁定的組件
  const [formState, setFormState] = useState({
    product: initialData?.product || ""
  });
  
  // ✨ 使用 React Hook Form 管理表單狀態和驗證
  const {
    control,
    formState: { errors },
    reset,
    getValues,
    trigger,
    setValue
  } = useForm({
    resolver: zodResolver(testingFormSchema),
    defaultValues: {
      product: initialData?.product || "",
      planStartDate: initialData?.planStartDate || defaultDates.planStartDate,
      planEndDate: initialData?.planEndDate || defaultDates.planEndDate,
      actualStartDate: initialData?.actualStartDate || defaultDates.actualStartDate,
      note: initialData?.note || ""
    }
  });
  
  // 當初始數據更新時重置表單
  useEffect(() => {
    if (initialData) {
      reset({
        product: initialData.product || "",
        planStartDate: initialData.planStartDate || defaultDates.planStartDate,
        planEndDate: initialData.planEndDate || defaultDates.planEndDate,
        actualStartDate: initialData.actualStartDate || defaultDates.actualStartDate,
        note: initialData.note || ""
      });
      
      setFormState({
        product: initialData.product || ""
      });
    }
  }, [initialData, reset, defaultDates]);
  
  // 處理產品變更
  const handleProductChange = useCallback((value) => {
    setFormState(prev => ({ ...prev, product: value }));
    setValue("product", value);
  }, [setValue]);
  
  /**
   * 驗證表單並獲取結果
   * @returns {Promise<{isValid: boolean, errors: Object|null}>}
   */
  const validate = useCallback(async () => {
    const isValid = await trigger();
    return {
      isValid,
      errors: isValid ? null : errors
    };
  }, [trigger, errors]);
  
  /**
   * 重置表單為初始狀態
   */
  const resetForm = useCallback(() => {
    reset({
      product: initialData?.product || "",
      planStartDate: initialData?.planStartDate || defaultDates.planStartDate,
      planEndDate: initialData?.planEndDate || defaultDates.planEndDate,
      actualStartDate: initialData?.actualStartDate || defaultDates.actualStartDate,
      note: initialData?.note || ""
    });
    
    setFormState({
      product: initialData?.product || ""
    });
  }, [initialData, reset, defaultDates]);
  
  // 暴露方法給父組件
  useImperativeHandle(ref, () => ({
    getValues,
    validate,
    reset: resetForm,
  }), [getValues, validate, resetForm]);
  
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {/* 表單頭部信息 */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            產品試模設定
          </Typography>
        </Grid>
        
        {/* 試模開始時間 */}
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
        
        {/* 產品輸入 */}
        <Grid item xs={12}>
          <ProductInput 
            value={formState.product}
            onChange={handleProductChange}
            error={!!errors.product}
            helperText={errors.product?.message}
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

TestingForm.propTypes = {
  initialData: PropTypes.object
};

TestingForm.defaultProps = {
  initialData: {}
};

// 設定組件顯示名稱
TestingForm.displayName = "TestingForm";

export default TestingForm;