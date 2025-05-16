/**
 * @file StatusForms.jsx
 * @description 狀態表單控制器，根據狀態選擇合適的表單組件
 * @version 2.0.0
 */

import { memo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidationSchema } from "../../../configs/validations/schedule/validationSchema";
import { STATUS_FORM_CONFIG } from "../../../configs/validations/schedule/formConfig";
import { MACHINE_STATUS } from "../../../configs/validations/schedule/constants";
import { prepareFormDateValues } from "../../../utils/schedule/dateUtils";
import OrderCreated from "./OrderCreated";
import Idle from "./Idle";
import Setup from "./Setup";
import Testing from "./Testing";
import Stopped from "./Stopped";
import { CircularProgress, Box } from "@mui/material";

// 導入自定義樣式組件
import { FormSection, SectionTitle } from "../styles/DialogStyles";

/**
 * 獲取狀態表單標題
 * @param {string} status - 狀態代碼
 * @returns {string} 表單標題
 */
function getFormTitle(status) {
  const titleMap = {
    [MACHINE_STATUS.ORDER_CREATED]: "製令單詳細資訊",
    [MACHINE_STATUS.IDLE]: "待機狀態設定",
    [MACHINE_STATUS.SETUP]: "設置狀態設定",
    [MACHINE_STATUS.TESTING]: "測試狀態設定",
    [MACHINE_STATUS.STOPPED]: "停機狀態設定",
  };

  return titleMap[status] || "狀態設定";
}

/**
 * @component StatusController
 * @description 狀態表單控制器，根據狀態動態選擇合適的表單組件
 */
const StatusController = ({
  status,
  item,
  disabled,
  onSubmit,
  mode,
  isSubmitting,
  onClose,
  groups,
}) => {
  // 添加狀態名稱轉換，確保使用正確的狀態名稱
  const normalizedStatus =
    status === "製令單" ? MACHINE_STATUS.ORDER_CREATED : status;

  // 檢查是否有表單配置存在
  const hasConfig = !!STATUS_FORM_CONFIG[normalizedStatus];

  // 如果沒有配置，則使用待機狀態作為默認
  const effectiveStatus = hasConfig ? normalizedStatus : MACHINE_STATUS.IDLE;
  const formConfig = STATUS_FORM_CONFIG[effectiveStatus];

  // 只有一個 useForm 調用，符合 React Hooks 規則
  const { handleSubmit, ...methods } = useForm({
    defaultValues: {
      ...(formConfig?.defaultValues || {}),
      ...item?.status,
      // 確保將可能收到的機台資訊加入默認值
      group: item?.group || "",
      area: item?.area || "",
      // 使用統一的日期準備函數
      ...prepareFormDateValues(item),
    },
    resolver: zodResolver(getValidationSchema(effectiveStatus)),
  });

  // 根據狀態選擇表單組件
  const FormComponent = {
    [MACHINE_STATUS.ORDER_CREATED]: OrderCreated,
    [MACHINE_STATUS.IDLE]: Idle,
    [MACHINE_STATUS.SETUP]: Setup,
    [MACHINE_STATUS.TESTING]: Testing,
    [MACHINE_STATUS.STOPPED]: Stopped,
  }[effectiveStatus];

  // 處理表單提交
  const handleFormSubmit = (data) => {
    console.log("Form submitted:", data);
    onSubmit(data);
  };

  // 如果沒有找到對應組件則使用 Idle 作為默認組件
  const Component = FormComponent || Idle;

  // 如果配置不存在，則記錄錯誤但繼續使用默認配置
  if (!hasConfig) {
    console.error(`狀態 "${status}" 沒有找到表單配置，使用默認配置`);
  }

  return (
    <FormProvider {...methods}>
      <form id="status-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ mb: 3 }}>
          <SectionTitle>
            {hasConfig
              ? getFormTitle(effectiveStatus)
              : `${status} 狀態設定 (使用默認表單)`}
          </SectionTitle>
          <FormSection>
            {isSubmitting ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <CircularProgress size={40} />
              </Box>
            ) : (
              <Component disabled={disabled} item={item} groups={groups} />
            )}
          </FormSection>
        </Box>
      </form>
    </FormProvider>
  );
};

export default memo(StatusController);
