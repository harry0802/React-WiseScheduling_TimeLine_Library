/**
 * @file useStatusManager.js
 * @description 機台狀態表單處理 Hook - 整合簡化版本
 * @version 3.0.0
 */

import { useState, useCallback, useRef } from "react";
import { isIdle } from "../../configs/constants/fieldNames";
import { validateStatusTransition } from "../../utils/validator/statusValidator";

/**
 * 處理機台狀態表單的 Hook - 簡化整合版本
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

  // 成功訊息狀態
  const [successMessage, setSuccessMessage] = useState("");

  // 保存前一次提交的數據
  const previousSubmit = useRef(null);

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

  // 基本表單驗證函數
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
      const formValues = formRef.current.getValues();
      const { status } = formValues;

      if (!isValid || (!isIdle(status) && !hasChanges)) {
        return { isValid: false, values: null, errors, hasChanges };
      }

      return { isValid: true, values: formValues, errors: null, hasChanges };
    } catch (error) {
      const errorMessage = error?.message || "表單驗證發生未知錯誤";
      console.error("表單驗證錯誤:", error);
      return {
        isValid: false,
        values: null,
        errors: { _form: errorMessage },
        hasChanges: false,
      };
    }
  }, [formRef]);

  // 執行表單提交 - 整合所有邏輯
  const executeSubmit = useCallback(async () => {
    // 清除先前的訊息
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // 步驟1: 執行基本表單驗證
      const { isValid, values, errors, hasChanges } = await validateForm();
      if (!isValid) {
        const errorMsg =
          errors?._form || (!hasChanges ? "表單未發生變更" : "表單驗證失敗");
        setErrorMessage(errorMsg);
        return false;
      }

      // 步驟2: 狀態轉換驗證
      const currentStatus = initialData?.status || "IDLE";
      const targetStatus = values.status;
      const formState = formRef.current?.formState || {};

      const { valid, message, timeInfo } = validateStatusTransition({
        currentStatus,
        targetStatus,
        formData: values,
        prevFormData: previousSubmit.current,
        formState,
      });

      if (!valid) {
        setErrorMessage(message);
        return false;
      }

      // 步驟3: 更新表單數據
      const updatedValues = { ...values };
      if (timeInfo.startTime) {
        updatedValues.actualStartDate = timeInfo.startTime;
      }
      if (timeInfo.endTime) {
        updatedValues.actualEndDate = timeInfo.endTime;
      }
      updatedValues._statusMessage = message;

      // 步驟4: 保存提交記錄
      previousSubmit.current = { ...updatedValues };

      // 步驟5: 執行實際提交
      await prepareFormData(updatedValues);
      return true;
    } catch (error) {
      setErrorMessage(error?.message || "提交失敗");
      console.error("表單提交錯誤:", error);
      return false;
    }
  }, [validateForm, prepareFormData, initialData, formRef]);

  // 重置表單
  const clearForm = useCallback(() => {
    if (formRef.current?.reset) {
      formRef.current.reset();
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [formRef]);

  // 獲取表單數據
  const getFormData = useCallback(
    () => formRef.current?.getValues?.() || {},
    [formRef]
  );

  // 返回統一的 API
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
