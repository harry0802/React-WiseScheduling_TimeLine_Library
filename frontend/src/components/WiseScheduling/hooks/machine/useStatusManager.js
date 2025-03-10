/**
 * @file useStatusManager.js
 * @description 機台狀態表單處理 Hook - 優化版本
 * @version 2.0.0
 */

import { useState, useCallback } from "react";
import { useFormSubmitHandler } from "./useFormSubmitHandler";

/**
 * 處理機台狀態表單的 Hook
 * @function useStatusForm
 * @param {Object} options - Hook 配置選項
 * @param {Object} options.initialData - 初始表單數據
 * @param {Function} options.onSubmit - 提交處理函數
 * @param {number|string} options.machineId - 機台 ID
 * @param {Object} options.formRef - 表單引用對象
 * @returns {Object} 狀態表單控制對象
 */
const useStatusForm = ({ initialData = {}, onSubmit, machineId, formRef }) => {
  // 錯誤訊息狀態
  const [errorMessage, setErrorMessage] = useState("");

  // 成功訊息狀態 - 新增用於顯示狀態轉換成功訊息
  const [successMessage, setSuccessMessage] = useState("");

  // 準備表單數據 - 添加機台ID
  const prepareFormData = useCallback(
    async (values) => {
      // 清除成功訊息，準備新的提交
      setSuccessMessage("");

      // 取出狀態訊息，用於顯示成功提示
      let statusMessage = "";
      if (values._statusMessage) {
        statusMessage = values._statusMessage;
        delete values._statusMessage;
      }

      const result = await onSubmit({
        ...values,
        machineId: machineId || initialData?.machineId,
      });

      // 如果有成功訊息，顯示它
      if (statusMessage) {
        setSuccessMessage(statusMessage);
      }

      return result;
    },
    [onSubmit, machineId, initialData?.machineId]
  );

  // 處理表單錯誤
  const handleValidationError = useCallback((error) => {
    setErrorMessage(error?.message || "表單處理發生錯誤");
    setSuccessMessage(""); // 清除任何成功訊息
  }, []);

  // 處理表單未變更或狀態轉換錯誤
  const handleOperationError = useCallback((error) => {
    setErrorMessage(error?.message || "操作無效");
    setSuccessMessage(""); // 清除任何成功訊息
  }, []);

  // 取得表單處理工具
  const { validateForm, handleSubmit: submitHandler } = useFormSubmitHandler({
    formRef,
    onSubmit: prepareFormData,
    onError: handleValidationError,
    onMistake: handleOperationError,
    initialData, // 傳遞初始數據用於狀態判斷
  });

  // 執行表單提交
  const executeSubmit = useCallback(async () => {
    // 清除先前的訊息
    setErrorMessage("");
    setSuccessMessage("");

    const { success, error, data } = await submitHandler();

    if (!success) {
      setErrorMessage(error?._form || "表單驗證失敗");
      console.error("表單錯誤:", error);
      return false;
    }

    return true;
  }, [submitHandler]);

  // 重置表單
  const clearForm = useCallback(() => {
    if (formRef.current?.reset) {
      formRef.current.reset();
      // 清除錯誤和成功訊息
      setErrorMessage("");
      setSuccessMessage("");
    }
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
    successMessage,
    setSuccessMessage,

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
