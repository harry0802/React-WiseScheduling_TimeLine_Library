/**
 * @file StatusForms.jsx
 * @description 狀態表單控制器，根據狀態選擇合適的表單組件
 * @version 3.9.0
 */

import { memo, useState, useCallback, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidationSchema } from "../../../configs/validations/schedule/validationSchema";
import { STATUS_FORM_CONFIG } from "../../../configs/validations/schedule/formConfig";
import {
  MACHINE_STATUS,
  isHistoricalRecord,
} from "../../../configs/validations/schedule/constants";
import { prepareFormDateValues } from "../../../utils/schedule/dateUtils";
import {
  handleFormError,
  FormError,
  ValidationError,
  logError,
} from "../../../utils/schedule/errorHandler";

// 直接導入各種狀態表單組件 - AHA原則：避免過早抽象，保持直接引用
import OrderCreated from "./OrderCreated";
import Idle from "./Idle";
import Setup from "./Setup";
import Testing from "./Testing";
import Stopped from "./Stopped";

// 導入自定義樣式組件
import { FormSection, SectionTitle } from "../styles/DialogStyles";
import { CircularProgress, Box, Alert } from "@mui/material";

//! =============== 1. 表單標題映射 ===============
//* 集中管理表單配置，這是明確的常量映射，保留為直接配置

/**
 * 狀態表單標題映射
 */
const FORM_TITLES = {
  [MACHINE_STATUS.ORDER_CREATED]: "製令單詳細資訊",
  [MACHINE_STATUS.IDLE]: "待機狀態設定",
  [MACHINE_STATUS.SETUP]: "設置狀態設定",
  [MACHINE_STATUS.TESTING]: "測試狀態設定",
  [MACHINE_STATUS.STOPPED]: "停機狀態設定",
};

/**
 * 狀態表單組件映射 - 直接保留在控制器內，不急於創建單獨的映射文件
 */
const FORM_COMPONENTS = {
  [MACHINE_STATUS.ORDER_CREATED]: OrderCreated,
  [MACHINE_STATUS.IDLE]: Idle,
  [MACHINE_STATUS.SETUP]: Setup,
  [MACHINE_STATUS.TESTING]: Testing,
  [MACHINE_STATUS.STOPPED]: Stopped,
};

/**
 * 獲取狀態表單標題
 * @param {string} status - 狀態代碼
 * @returns {string} 表單標題
 */
function getFormTitle(status, hasConfig = true) {
  return hasConfig
    ? FORM_TITLES[status] || "狀態設定"
    : `${status} 狀態設定 (使用默認表單)`;
}

//! =============== 2. 表單控制器 ===============
//* 狀態控制器本身保持完整，不急於提取小函數

/**
 * @component StatusController
 * @description 狀態表單控制器，根據狀態動態選擇合適的表單組件
 */
const StatusController = ({
  status,
  item,
  disabled,
  onSubmit,
  mode = "create", // 默認為創建模式
  isSubmitting,
  onClose,
  groups,
}) => {
  // 本地錯誤狀態管理
  const [formError, setFormError] = useState(null);

  // 檢查是否為歷史紀錄
  const isHistorical = isHistoricalRecord(status, item);

  // 添加狀態名稱標準化處理
  const normalizedStatus =
    status === "製令單" ? MACHINE_STATUS.ORDER_CREATED : status;

  // 檢查是否有表單配置存在
  const hasConfig = !!STATUS_FORM_CONFIG[normalizedStatus];

  // 如果沒有配置，則使用待機狀態作為默認配置
  const effectiveStatus = hasConfig ? normalizedStatus : MACHINE_STATUS.IDLE;
  const formConfig = STATUS_FORM_CONFIG[effectiveStatus];

  // 使用 useForm hook 設置表單
  const methods = useForm({
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
    mode: "onChange",
  });

  // 監聽表單錯誤狀態變化
  const formStateErrors = methods.formState.errors;
  useEffect(() => {
    if (Object.keys(formStateErrors).length > 0) {
      // 錯誤日誌已由 errorHandler 處理，這裡不再重複輸出
    }
  }, [formStateErrors, effectiveStatus]);

  // 選擇適當的表單組件
  const FormComponent =
    FORM_COMPONENTS[effectiveStatus] || FORM_COMPONENTS[MACHINE_STATUS.IDLE];

  // 處理表單提交 - 驗證邏輯主要由各表單內部處理
  const handleFormSubmit = useCallback(
    (data) => {
      setFormError(null);

      try {
        // 確保數據類型一致性
        const processedData = {
          ...data,
          // 手動處理數值型字段
          ...(data.quantity !== undefined && {
            quantity: Number(data.quantity),
          }),
          ...(data.completedQty !== undefined && {
            completedQty: Number(data.completedQty),
          }),
          // 確保添加狀態標識
          timeLineStatus: normalizedStatus,
        };

        console.log(
          `✅ [表單] ${normalizedStatus} 提交前的最終數據:`,
          processedData
        );

        // 提交表單數據
        onSubmit(processedData);
      } catch (error) {
        // 使用統一錯誤處理
        const errorMessage = handleFormError(error);
        setFormError(errorMessage);

        // 記錄錯誤
        logError(error, {
          component: "StatusController",
          status: normalizedStatus,
          formData: JSON.stringify(data).substring(0, 200),
        });

        // 避免繼續提交
        throw error;
      }
    },
    [normalizedStatus, effectiveStatus, onSubmit]
  );

  return (
    <FormProvider {...methods}>
      <form id="status-form" onSubmit={methods.handleSubmit(handleFormSubmit)}>
        {/* 表單錯誤提示 */}
        {formError && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            onClose={() => setFormError(null)}
          >
            {formError}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <SectionTitle>
            {getFormTitle(effectiveStatus, hasConfig)}
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
              <FormComponent
                disabled={disabled || isHistorical}
                item={item}
                groups={groups}
                mode={mode} // 傳遞模式參數到表單組件
              />
            )}
          </FormSection>
        </Box>
      </form>
    </FormProvider>
  );
};

// 使用 memo 優化渲染性能
export default memo(StatusController);
