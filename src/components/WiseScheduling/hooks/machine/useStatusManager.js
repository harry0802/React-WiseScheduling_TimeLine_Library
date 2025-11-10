/**
 * @file useStatusManager.js
 * @description 機台狀態表單處理 Hook - 優化重構版本
 * @version 4.0.0 - 符合 CLAUDE.md 標準
 */

import { useState, useCallback, useRef } from "react";
import { validateStatusTransition } from "../../utils/validator/statusValidator";

// =====================================
// 🔧 設定常量與配置
// =====================================
const ERROR_MESSAGES = {
  FORM_NOT_FOUND: "無法找到表單",
  NO_CHANGES: "表單未發生變更",
  VALIDATION_FAILED: "表單驗證失敗",
  SUBMIT_FAILED: "提交失敗",
  UNKNOWN_ERROR: "發生未知錯誤",
};

const INITIAL_STATE = {
  errorMessage: "",
  successMessage: "",
};

/**
 * =====================================
 * 🚀 核心功能函數
 * =====================================
 */

/**
 * 處理機台狀態表單的 Hook - 重構優化版本
 * @function useStatusForm
 * @param {Object} options - Hook 配置選項
 * @param {Object} options.initialData - 初始表單數據
 * @param {Function} options.onSubmit - 提交處理函數
 * @param {number|string} options.machineId - 機台 ID
 * @param {Object} options.formRef - 表單引用對象
 * @returns {Object} 狀態表單控制對象
 */
const useStatusForm = ({ initialData = {}, onSubmit, machineId, formRef }) => {
  // =====================================
  // 📝 狀態管理
  // =====================================
  const [errorMessage, setErrorMessage] = useState(INITIAL_STATE.errorMessage);
  const [successMessage, setSuccessMessage] = useState(
    INITIAL_STATE.successMessage
  );
  const previousSubmit = useRef(null);

  // 當前狀態和機台 ID - 簡化版本
  const currentStatus = initialData?.status || "IDLE";
  const resolvedMachineId = machineId || initialData?.machineId;

  /**
   * 清除訊息狀態
   * @description 重置所有訊息狀態
   */
  const clearMessages = () => {
    setErrorMessage(INITIAL_STATE.errorMessage);
    setSuccessMessage(INITIAL_STATE.successMessage);
  };

  /**
   * 驗證表單數據 - 簡化版本
   * @description 執行基本表單驗證和變更檢查
   * @returns {Promise<Object>} 驗證結果
   */
  const validateFormData = async () => {
    if (!formRef.current) {
      return {
        isValid: false,
        errors: { _form: ERROR_MESSAGES.FORM_NOT_FOUND },
        values: null,
        hasChanges: false,
      };
    }

    try {
      const { isValid, errors, hasChanges } = await formRef.current.validate();
      const formValues = formRef.current.getValues();
      const { status } = formValues;

      // Push Ifs Up: 集中條件判斷
      if (!isValid) {
        return { isValid: false, errors, values: null, hasChanges };
      }

      if (currentStatus === status && !hasChanges) {
        return {
          isValid: false,
          errors: { _form: ERROR_MESSAGES.NO_CHANGES },
          values: null,
          hasChanges,
        };
      }

      return { isValid: true, errors: null, values: formValues, hasChanges };
    } catch (error) {
      const errorMessage = error?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
      console.error("表單驗證錯誤:", error);
      return {
        isValid: false,
        errors: { _form: errorMessage },
        values: null,
        hasChanges: false,
      };
    }
  };

  /**
   * 處理狀態轉換和數據準備
   * @description 執行業務邏輯驗證並準備提交數據
   * @param {Object} values - 表單值
   * @returns {Object} 處理結果
   */
  const processSubmission = (values) => {
    const targetStatus = values.status;
    const formState = formRef.current?.formState || {};

    // 執行狀態轉換驗證
    const transitionResult = validateStatusTransition({
      currentStatus,
      targetStatus,
      formData: values,
      prevFormData: previousSubmit.current,
      formState,
    });

    if (!transitionResult.valid) {
      return { success: false, message: transitionResult.message };
    }

    // 準備提交數據 - 簡化版本
    const updatedValues = { ...values };

    // 添加時間資訊
    if (transitionResult.timeInfo.startTime) {
      updatedValues.actualStartDate = transitionResult.timeInfo.startTime;
    }
    if (transitionResult.timeInfo.endTime) {
      updatedValues.actualEndDate = transitionResult.timeInfo.endTime;
    }
    updatedValues._statusMessage = transitionResult.message;

    return {
      success: true,
      data: updatedValues,
      message: transitionResult.message,
    };
  };

  /**
   * 執行表單提交 - 簡化流程
   * @description 整合驗證、處理和提交邏輯
   * @returns {Promise<boolean>} 提交是否成功
   */
  const executeSubmit = useCallback(async () => {
    clearMessages();

    try {
      // 步驟1: 驗證表單
      const validationResult = await validateFormData();
      if (!validationResult.isValid) {
        const errorMsg =
          validationResult.errors?._form || ERROR_MESSAGES.VALIDATION_FAILED;
        setErrorMessage(errorMsg);
        return false;
      }

      // 步驟2: 處理狀態轉換
      const processResult = processSubmission(validationResult.values);
      if (!processResult.success) {
        setErrorMessage(processResult.message);
        return false;
      }

      // 步驟3: 執行提交
      previousSubmit.current = { ...processResult.data };
      await onSubmit({
        ...processResult.data,
        machineId: resolvedMachineId,
      });

      // 顯示成功訊息
      if (processResult.message) {
        setSuccessMessage(processResult.message);
      }

      return true;
    } catch (error) {
      const errorMessage = error?.message || ERROR_MESSAGES.SUBMIT_FAILED;
      setErrorMessage(errorMessage);
      console.error("表單提交錯誤:", error);
      return false;
    }
  }, [onSubmit, resolvedMachineId, validateFormData, processSubmission]);

  /**
   * =====================================
   * 🛠️ 工具函數與輔助方法
   * =====================================
   */

  /**
   * 重置表單
   * @description 清除表單數據和訊息
   */
  const clearForm = useCallback(() => {
    if (formRef.current?.reset) {
      formRef.current.reset();
      clearMessages();
    }
  }, [formRef]);

  /**
   * 獲取表單數據
   * @description 取得當前表單值
   * @returns {Object} 表單數據
   */
  const getFormData = useCallback(
    () => formRef.current?.getValues?.() || {},
    [formRef]
  );

  /**
   * 驗證表單
   * @description 執行表單驗證
   * @returns {Promise<Object>} 驗證結果
   */
  const validateForm = useCallback(async () => {
    const result = await validateFormData();
    return result;
  }, [validateFormData]);

  // 📊 只對返回的 API 進行記憶化 - 符合 React 最佳實踐
  const formApi = useCallback(
    () => ({
      getValues: getFormData,
      validate: validateForm,
      submit: executeSubmit,
      reset: clearForm,
    }),
    [getFormData, validateForm, executeSubmit, clearForm]
  );

  // 返回簡化的 API
  return {
    // 狀態
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,

    // 對外 API
    formApi: formApi(),
  };
};

export default useStatusForm;
