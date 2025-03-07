/**
 * @file useFormSubmitHandler.jsx
 * @description 表單提交處理 Hook - 統一表單驗證和提交邏輯
 */

import { useCallback } from "react";
import { isIdle } from "../../utils/statusConverter";

// 輔助函數 統一錯誤回應格式
const createErrorResponse = (message, extraProps = {}) => ({
  success: false,
  error: { _form: message },
  ...extraProps,
});

const createSuccessResponse = (data) => ({
  success: true,
  data,
});

const handleFormError = (error, errorHandler) => {
  console.error("表單處理錯誤:", error);

  if (errorHandler) {
    errorHandler(error);
  }

  return createErrorResponse(error?.message || "表單處理發生未知錯誤");
};

function useFormSubmitHandler({
  formRef,
  onSubmit,
  onError,
  requireChanges = false,
  onMistake,
}) {
  const validateForm = useCallback(async () => {
    if (!formRef.current) {
      return {
        isValid: false,
        values: null,
        errors: { _form: "無法找到表單" },
        hasChanges: false,
      };
    }

    try {
      const { isValid, errors, hasChanges } = await formRef.current.validate();
      const { status } = formRef.current.getValues();
      if (!isValid || (!isIdle(status) && !hasChanges)) {
        return { isValid: false, values: null, errors, hasChanges };
      }

      const values = formRef.current.getValues();
      return { isValid: true, values, errors: null, hasChanges };
    } catch (error) {
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

  const handleSubmit = useCallback(async () => {
    try {
      const { isValid, values, errors, hasChanges } = await validateForm();
      if (!isValid) {
        return createErrorResponse(
          errors?._form || (hasChanges ? "表單未發生變更" : "表單驗證失敗"),
          { errors }
        );
      }

      const result = await onSubmit(values);
      return createSuccessResponse(result || values);
    } catch (error) {
      return handleFormError(error, onError);
    }
  }, [validateForm, onSubmit, onError, requireChanges]);

  return {
    validateForm,
    handleSubmit,
  };
}

export { useFormSubmitHandler };
