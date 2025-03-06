/**
 * @file SetupForm.jsx
 * @description 上模與調機狀態表單 - 處理機台調機時的相關信息
 * @version 2.0.0
 */

import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Grid } from "@mui/material";
import dayjs from "dayjs";

// 導入自定義表單處理 Hook
import { useFormHandler } from "../../../../hooks/machine/useFormHandler";

// 導入驗證 schema
import { tuningSchema } from "../../../../configs/validations/machine/machineSchemas";

/**
 * 上模與調機狀態表單
 *
 * @component SetupForm
 * @param {Object} props - 組件屬性
 * @param {Object} props.initialData - 初始數據
 * @param {Object} ref - 轉發的ref，用於暴露內部方法
 * @returns {React.ReactElement}
 */
const SetupForm = forwardRef(({ initialData }, ref) => {
  // 獲取默認日期的函數
  const getDefaultValues = () => ({
    planStartDate: dayjs().format("YYYY-MM-DDTHH:mm"),
    planEndDate: dayjs().add(3, "hour").format("YYYY-MM-DDTHH:mm"),
    actualStartDate: dayjs().format("YYYY-MM-DDTHH:mm"),
    status: "TUNING",
  });

  // 使用自定義表單 Hook
  useFormHandler({
    initialData,
    getDefaultValues,
    schema: tuningSchema,
    ref,
  });

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {/* 表單頭部信息 */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            上模與調機設定
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
});

SetupForm.propTypes = {
  initialData: PropTypes.object,
};

SetupForm.defaultProps = {
  initialData: {},
};

// 設定組件顯示名稱
SetupForm.displayName = "SetupForm";

export default SetupForm;
