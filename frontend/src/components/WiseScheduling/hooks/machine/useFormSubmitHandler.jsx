/**
 * @file useFormSubmitHandler.jsx
 * @description 表單提交處理 Hook - 統一表單驗證和提交邏輯
 * @version 2.0.0
 */

import { useCallback, useRef } from "react";
import { isIdle } from "../../configs/constants/fieldNames";
import { validateStatusTransition } from "../../utils/validator/statusValidator";

// 回應格式化 - 統一錯誤回應結構
const createErrorResponse = (message, extraProps = {}) => ({
  success: false,
  error: { _form: message },
  ...extraProps,
});

// 回應格式化 - 統一成功回應結構
const createSuccessResponse = (data) => ({
  success: true,
  data,
});

// 錯誤處理輔助函數 - 集中處理錯誤並格式化回應
const handleFormError = (error, errorHandler) => {
  console.error("表單處理錯誤:", error);

  if (errorHandler) {
    errorHandler(error);
  }

  return createErrorResponse(error?.message || "表單處理發生未知錯誤");
};

/**
 * 表單提交處理 Hook
 * @function useFormSubmitHandler
 * @param {Object} options - Hook 配置選項
 * @param {Object} options.formRef - 表單引用對象
 * @param {Function} options.onSubmit - 提交處理函數
 * @param {Function} options.onError - 錯誤處理函數
 * @param {boolean} options.requireChanges - 是否要求表單有變更
 * @param {Function} options.onMistake - 使用者操作錯誤處理函數
 * @param {Object} options.initialData - 初始表單數據
 * @returns {Object} 表單提交控制對象
 */
function useFormSubmitHandler({
  formRef,
  onSubmit,
  onError,
  requireChanges = false,
  onMistake,
  initialData = {},
}) {
  // 保存前一次提交的數據，用於檢測重複提交
  // 這與 StatusValidator 中的重複提交檢測邏輯配合使用
  const previousSubmit = useRef(null);

  // 基本表單驗證函數 - 驗證表單內容合法性
  const validateForm = useCallback(async () => {
    // 檢查表單引用是否有效
    if (!formRef.current) {
      return {
        isValid: false,
        values: null,
        errors: { _form: "無法找到表單" },
        hasChanges: false,
      };
    }

    try {
      // 使用表單庫進行基礎驗證
      const { isValid, errors, hasChanges } = await formRef.current.validate();
      const formValues = formRef.current.getValues();
      const { status } = formValues;

      // 檢查表單是否有效，非空閒狀態且沒有變更時視為無效
      if (!isValid || (!isIdle(status) && !hasChanges)) {
        return { isValid: false, values: null, errors, hasChanges };
      }

      return { isValid: true, values: formValues, errors: null, hasChanges };
    } catch (error) {
      // 處理驗證過程中的錯誤
      const errorMessage = error?.message || "表單驗證發生未知錯誤";
      console.error("表單驗證錯誤:", error);

      if (onError) {
        onError(error);
      }

      return {
        isValid: false,
        values: null,
        errors: { _form: errorMessage },
        hasChanges: false,
      };
    }
  }, [formRef, onError]);

  // 表單提交處理函數 - 包含狀態驗證和時間記錄邏輯
  const handleSubmit = useCallback(async () => {
    try {
      // 步驟1: 執行基本表單驗證
      const { isValid, values, errors, hasChanges } = await validateForm();
      if (!isValid) {
        return createErrorResponse(
          errors?._form || (hasChanges ? "表單未發生變更" : "表單驗證失敗"),
          { errors }
        );
      }

      // 步驟2: 準備狀態驗證所需參數
      const currentStatus = initialData?.status || "IDLE";
      const targetStatus = values.status;
      console.log("🚀 ~ handleSubmit ~ targetStatus:", targetStatus);

      // 獲取 react-hook-form 的表單狀態，用於檢測變更
      const formState = formRef.current?.formState || {};
      console.log("🚀 ~ handleSubmit ~ currentStatus:", currentStatus);

      // 步驟3: 調用狀態驗證器驗證狀態轉換
      // 這裡是與 StatusValidator 集成的關鍵部分
      const { valid, message, timeInfo } = validateStatusTransition({
        currentStatus,
        targetStatus,
        formData: values,
        prevFormData: previousSubmit.current,
        formState,
      });

      // 處理狀態驗證失敗的情況
      if (!valid) {
        // 通知用戶操作錯誤
        if (onMistake) {
          onMistake({ message });
        }
        return createErrorResponse(message);
      }

      // 步驟4: 利用狀態驗證器返回的時間信息更新表單數據
      // 這是時間記錄功能的自動化實現
      const updatedValues = { ...values };
      if (timeInfo.startTime)
        updatedValues.actualStartDate = timeInfo.startTime;
      if (timeInfo.endTime) updatedValues.actualEndDate = timeInfo.endTime;

      // 添加狀態訊息以供顯示
      updatedValues._statusMessage = message;

      // 步驟5: 保存當前提交用於下次重複提交比較
      previousSubmit.current = { ...updatedValues };

      // 步驟6: 執行實際提交
      const result = await onSubmit(updatedValues);
      return createSuccessResponse(result || updatedValues);
    } catch (error) {
      return handleFormError(error, onError);
    }
  }, [
    validateForm,
    onSubmit,
    onError,
    requireChanges,
    initialData,
    onMistake,
    formRef,
  ]);

  // 返回表單控制函數
  return {
    validateForm,
    handleSubmit,
  };
}

export { useFormSubmitHandler };
