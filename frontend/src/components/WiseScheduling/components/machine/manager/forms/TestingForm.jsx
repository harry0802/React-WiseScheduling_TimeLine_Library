/**
 * @file TestingForm.jsx
 * @description 產品試模狀態表單 - 處理機台試模時的相關信息
 * @version 2.0.0
 */

import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Grid } from "@mui/material";
import { FormProvider } from "react-hook-form";

// 導入自定義表單處理 Hook
import { useFormHandler } from "../../../../hooks/machine/useFormHandler";

// 導入產品輸入組件
import ProductInput from "../../controls/ProductInput";

// 導入驗證 schema
import { testingSchema } from "../../../../configs/validations/machine/machineSchemas";

// 導入狀態常數
import { MACHINE_STATUS } from "../../../../configs/constants/fieldNames";

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
  // 獲取默認日期的函數
  const getDefaultValues = () => ({
    product: initialData?.product || "",
    planStartDate: initialData?.planStartDate,
    planEndDate: initialData?.planEndDate,
    actualStartDate: initialData?.actualStartDate,
    actualEndDate: initialData?.actualEndDate,
    status: MACHINE_STATUS.TESTING,
    id: initialData?.id,
    machineId: initialData?.machineId,
  });

  // 使用自定義表單 Hook
  const { formMethods } = useFormHandler({
    initialData,
    getDefaultValues,
    schema: testingSchema,
    ref,
  });

  return (
    <FormProvider {...formMethods}>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {/* 表單頭部信息 */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              產品試模設定
            </Typography>
          </Grid>
          {/* 產品輸入 */}
          <Grid item xs={12}>
            <ProductInput name="product" />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
});

TestingForm.propTypes = {
  initialData: PropTypes.object,
};

TestingForm.defaultProps = {
  initialData: {},
};

// 設定組件顯示名稱
TestingForm.displayName = "TestingForm";

export default TestingForm;
