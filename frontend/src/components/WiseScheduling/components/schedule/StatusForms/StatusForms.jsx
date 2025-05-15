/**
 * @file StatusForms.jsx
 * @description 狀態表單控制器，根據狀態選擇合適的表單組件
 * @version 2.0.0
 */

import { memo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidationSchema } from "../../../configs/validations/schedule/validationSchema";
import { STATUS_FORM_CONFIG } from "../../../configs/validations/schedule/formConfig";
import { MACHINE_STATUS } from "../../../configs/validations/schedule/constants";
import OrderCreated from "./OrderCreated";
import Idle from "./Idle";
import Setup from "./Setup";
import Testing from "./Testing";
import Stopped from "./Stopped";
import { CircularProgress, Box } from "@mui/material";

// 導入自定義樣式組件
import { 
  FormSection,
  SectionTitle,
} from "../styles/DialogStyles";

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
  // 獲取狀態對應的表單配置
  const formConfig = STATUS_FORM_CONFIG[status];
  
  // 初始化表單
  const { handleSubmit, ...methods } = useForm({
    defaultValues: {
      ...formConfig.defaultValues,
      ...item?.status,
    },
    resolver: zodResolver(getValidationSchema(status)),
  });

  // 根據狀態選擇表單組件
  const FormComponent = {
    [MACHINE_STATUS.ORDER_CREATED]: OrderCreated,
    [MACHINE_STATUS.IDLE]: Idle,
    [MACHINE_STATUS.SETUP]: Setup,
    [MACHINE_STATUS.TESTING]: Testing,
    [MACHINE_STATUS.STOPPED]: Stopped,
  }[status];

  // 處理表單提交
  const handleFormSubmit = (data) => {
    console.log("Form submitted:", data);
    onSubmit(data);
  };

  // 如果沒有對應組件則不渲染
  if (!FormComponent) return null;

  return (
    <FormProvider {...methods}>
      <form id="status-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ mb: 3 }}>
          <SectionTitle>
            {getFormTitle(status)}
          </SectionTitle>
          <FormSection>
            {isSubmitting ? (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                height: '200px' 
              }}>
                <CircularProgress size={40} />
              </Box>
            ) : (
              <FormComponent 
                disabled={disabled} 
                item={item} 
                groups={groups} 
              />
            )}
          </FormSection>
        </Box>
      </form>
    </FormProvider>
  );
};

/**
 * 根據狀態獲取表單標題
 * @param {string} status - 狀態代碼
 * @returns {string} 表單標題
 */
function getFormTitle(status) {
  const titleMap = {
    [MACHINE_STATUS.ORDER_CREATED]: "製令單詳細資訊",
    [MACHINE_STATUS.IDLE]: "閒置狀態設定",
    [MACHINE_STATUS.SETUP]: "設置狀態設定",
    [MACHINE_STATUS.TESTING]: "測試狀態設定",
    [MACHINE_STATUS.STOPPED]: "停機狀態設定",
  };

  return titleMap[status] || "狀態設定";
}

export default memo(StatusController);
