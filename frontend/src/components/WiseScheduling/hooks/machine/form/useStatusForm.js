/**
 * 機台狀態表單處理 Hook
 */
import { useState, useCallback } from "react";
import { useFormSubmitHandler } from "../../../hooks/machine/useFormSubmitHandler";

/**
 * 處理機台狀態表單的 Hook
 */
const useStatusForm = ({ initialData = {}, onSubmit, machineId, formRef }) => {
  // 錯誤訊息狀態
  const [errorMessage, setErrorMessage] = useState("");

  // 準備表單數據 - 添加機台ID
  const prepareFormData = useCallback(
    async (values) => {
      return onSubmit({
        ...values,
        machineId: machineId || initialData?.machineId,
      });
    },
    [onSubmit, machineId, initialData?.machineId]
  );

  // 處理表單錯誤
  const handleValidationError = useCallback((error) => {
    setErrorMessage(error?.message || "表單處理發生錯誤");
  }, []);

  // 處理表單未變更
  const handleNoChanges = useCallback((error) => {
    setErrorMessage(error?.message || "表單未發生變更");
  }, []);

  // 取得表單處理工具
  const { validateForm, handleSubmit: submitHandler } = useFormSubmitHandler({
    formRef,
    onSubmit: prepareFormData,
    onError: handleValidationError,
    onMistake: handleNoChanges,
  });

  // 供父組件使用的函數

  // 執行表單提交
  const executeSubmit = useCallback(async () => {
    setErrorMessage("");
    const { success, error } = await submitHandler();
    console.log("🚀 ~ executeSubmit ~ success:", success);

    if (!success) {
      setErrorMessage(error?._form || "表單驗證失敗");
      console.error("表單錯誤:", error);
      return false;
    }
    return true;
  }, [submitHandler]);

  // 重置表單
  const clearForm = useCallback(() => {
    if (formRef.current?.reset) formRef.current.reset();
  }, [formRef]);

  // 獲取表單數據
  const getFormData = useCallback(
    () => formRef.current?.getValues?.() || {},
    [formRef]
  );

  // 返回可用的 API 和狀態
  return {
    // 狀態
    errorMessage,
    setErrorMessage,

    // 對外 API
    formApi: {
      getValues: getFormData,
      validate: validateForm,
      submit: executeSubmit,
      reset: clearForm,
    },
  };
};

export default useStatusForm;
