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
import { idleSchema } from "../../../../configs/validations/machine/machineSchemas";
import { useFormHandler } from "../../../../hooks/machine/useFormHandler";

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
const IdleForm = forwardRef((props, ref) => {
  const { initialData } = props;

  // 使用自定義 hook
  const { defaultValues } = useFormHandler({
    initialData,
    getDefaultValues: getDefaultDates,
    schema: idleSchema,
    ref,
  });

  console.log("initialData", initialData);
  console.log("defaultValues", defaultValues);

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {/* 表單頭部信息 */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            待機狀態設定
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
});

// 設定組件顯示名稱
IdleForm.displayName = "IdleForm";

export default IdleForm;
