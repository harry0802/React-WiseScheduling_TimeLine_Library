/**
 * @file MachineStatusManager.jsx
 * @description 機台狀態管理器 - 協調狀態切換、表單處理與資料提交
 * @version 3.0.0
 */

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置,便於統一管理

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

// 導入狀態與常量
import {
  MACHINE_STATUS,
  getStatusDisplay,
} from "../../configs/validations/machine/machineSchemas";

// 導入組件
import { StatusHeader, SliderContainer } from "../../assets/machine.styles";
import StatusSlider from "./StatusSlider";

// 導入表單組件
import IdleForm from "./forms/IdleForm";
import SetupForm from "./forms/SetupForm";
import StoppedForm from "./forms/StoppedForm";
import TestingForm from "./forms/TestingForm";

//! =============== 2. 類型與介面 ===============
//* 定義所有資料結構,幫助理解資料流向

/**
 * @typedef {Object} MachineStatusManagerProps
 * @property {Object} initialData - 初始數據 (包含 status, machineId, productionArea 等)
 * @property {Function} onSubmit - 提交回調函數
 * @property {string|number} [machineId] - 機台ID
 * @property {string} [productionArea] - 生產區域
 * @property {boolean} [autoLoad=false] - 是否自動加載數據
 */

/**
 * @typedef {Object} FormValidationResult
 * @property {boolean} isValid - 表單是否有效
 * @property {Object|null} values - 表單值 (若有效)
 * @property {Object|null} errors - 表單錯誤 (若無效)
 */

//! =============== 3. 核心功能 ===============
//* 主要業務邏輯區,每個功能都配有詳細說明

/**
 * 機台狀態管理器組件 - 協調狀態切換、表單處理與資料提交
 *
 * @function MachineStatusManager
 * @param {MachineStatusManagerProps} props - 組件屬性
 * @param {React.Ref} ref - 轉發的ref，用於暴露內部方法
 * @returns {React.ReactElement} 機台狀態管理器組件
 *
 * @example
 * // 基本用法
 * <MachineStatusManager
 *   initialData={machineData}
 *   onSubmit={handleSubmit}
 *   machineId="M001"
 * />
 *
 * @notes
 * - 使用 ref 存取內部方法 (validate, submit, reset 等)
 * - 狀態變更會自動切換對應的表單組件
 *
 * @commonErrors
 * - 表單驗證失敗: 檢查必填欄位
 * - 提交錯誤: 檢查網絡連接或伺服器回應
 */
const MachineStatusManager = forwardRef((props, ref) => {
  const {
    initialData,
    onSubmit,
    machineId,
    productionArea,
    autoLoad = false,
  } = props;

  //! =============== 狀態管理 ===============
  //* 集中管理組件內部所有狀態
  const [currentStatus, setCurrentStatus] = useState(
    initialData?.status || MACHINE_STATUS.IDLE
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  //! =============== 引用管理 ===============
  //* 管理所有表單的 ref，以便於操作表單
  const formRefs = {
    [MACHINE_STATUS.IDLE]: useRef(null),
    [MACHINE_STATUS.TUNING]: useRef(null),
    [MACHINE_STATUS.TESTING]: useRef(null),
    [MACHINE_STATUS.OFFLINE]: useRef(null),
  };

  /**
   * 當初始數據更新時設置狀態
   */
  useEffect(() => {
    if (initialData?.status) {
      setCurrentStatus(initialData.status);
    }
  }, [initialData]);

  //! =============== 4. 工具函數 ===============
  //* 通用功能區,可被多個模組復用

  /**
   * 獲取當前狀態的表單引用
   *
   * @function getCurrentFormRef
   * @returns {React.RefObject|null} 當前表單引用
   */
  const getCurrentFormRef = () => formRefs[currentStatus] || null;

  /**
   * 處理狀態變更
   *
   * @function handleStatusChange
   * @param {string} newStatus - 新狀態
   */
  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
  };

  /**
   * 驗證表單
   *
   * @async
   * @function validateForm
   * @returns {Promise<FormValidationResult>} 驗證結果
   */
  const validateForm = async () => {
    const formRef = getCurrentFormRef()?.current;

    if (!formRef) {
      return {
        isValid: false,
        values: null,
        errors: { _form: "無法找到對應的表單" },
      };
    }

    try {
      const { isValid, errors } = await formRef.validate();

      if (!isValid) {
        return { isValid: false, values: null, errors };
      }

      const values = formRef.getValues();
      return { isValid: true, values, errors: null };
    } catch (error) {
      console.error("表單驗證錯誤:", error);
      return {
        isValid: false,
        values: null,
        errors: { _form: error.message },
      };
    }
  };

  /**
   * 提交表單
   *
   * @async
   * @function submitForm
   * @returns {Promise<boolean>} 提交結果
   *
   * @notes
   * - 會先進行表單驗證
   * - 驗證通過後添加機台ID並提交
   */
  const submitForm = async () => {
    try {
      setIsSaving(true);
      setErrorMessage("");

      //* ========= 複雜邏輯解釋 =========
      // 步驟 1: 驗證表單數據
      // 步驟 2: 準備提交數據，加入機台ID
      // 步驟 3: 調用父組件的 onSubmit 進行提交

      // 驗證表單
      const { isValid, values, errors } = await validateForm();

      if (!isValid || !values) {
        setErrorMessage("表單驗證失敗");
        console.error("表單錯誤:", errors);
        return false;
      }

      // 添加機台ID（如果有）
      const submitData = {
        ...values,
        machineId: machineId || initialData?.machineId,
      };

      // 提交數據
      await onSubmit(submitData);
      return true;
    } catch (error) {
      setErrorMessage(error.message || "提交失敗");
      console.error("提交錯誤:", error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * 重置表單
   *
   * @function resetForm
   */
  const resetForm = () => {
    const formRef = getCurrentFormRef()?.current;

    if (formRef && typeof formRef.reset === "function") {
      formRef.reset();
    }
  };

  /**
   * 獲取表單值
   *
   * @function getFormValues
   * @returns {Object} 表單值
   */
  const getFormValues = () => {
    const formRef = getCurrentFormRef()?.current;

    if (formRef && typeof formRef.getValues === "function") {
      return formRef.getValues();
    }

    return {};
  };

  /**
   * 設置表單值
   *
   * @function setFormValue
   * @param {string} name - 欄位名稱
   * @param {any} value - 欄位值
   *
   * @todoTODO 實現具體的欄位設置邏輯
   */
  const setFormValue = (name, value) => {
    console.log(`設置欄位 ${name} = ${value}`);
    // 這裡需要實現欄位設置邏輯
  };

  // 暴露方法給父組件
  useImperativeHandle(
    ref,
    () => ({
      // 表單操作
      getFormValues,
      validateForm,
      submit: submitForm,
      reset: resetForm,

      // 狀態操作
      getCurrentStatus: () => currentStatus,
      setFormValue,

      // 狀態資訊
      getErrorMessage: () => errorMessage,
      isLoading: () => isLoading,
      isSaving: () => isSaving,
    }),
    [currentStatus, errorMessage, isLoading, isSaving]
  );

  /**
   * 渲染當前狀態的表單
   *
   * @function renderStatusForm
   * @returns {React.ReactElement} 表單組件
   */
  const renderStatusForm = () => {
    switch (currentStatus) {
      case MACHINE_STATUS.IDLE:
        return (
          <IdleForm
            ref={formRefs[MACHINE_STATUS.IDLE]}
            initialData={initialData}
          />
        );

      case MACHINE_STATUS.TUNING:
      case MACHINE_STATUS.SETUP:
        return (
          <SetupForm
            ref={formRefs[MACHINE_STATUS.TUNING]}
            initialData={initialData}
          />
        );

      case MACHINE_STATUS.TESTING:
        return (
          <TestingForm
            ref={formRefs[MACHINE_STATUS.TESTING]}
            initialData={initialData}
          />
        );

      case MACHINE_STATUS.OFFLINE:
      case MACHINE_STATUS.STOPPED:
        return (
          <StoppedForm
            ref={formRefs[MACHINE_STATUS.OFFLINE]}
            initialData={initialData}
          />
        );

      default:
        console.log(currentStatus);
        return (
          <IdleForm
            ref={formRefs[MACHINE_STATUS.IDLE]}
            initialData={initialData}
          />
        );
    }
  };

  //! =============== 組件渲染 ===============
  return (
    <Box>
      {/* 機台資訊 */}
      <StatusHeader>
        <div>
          <h3>
            {initialData?.productionArea || ""} - {initialData?.machineSN || ""}
          </h3>
          <p>
            稼動時間：
            {initialData?.actualStartDate ??
              initialData?.planStartDate ??
              new Date().toLocaleString()}
          </p>
        </div>
      </StatusHeader>

      {/* 機台狀態選擇器 */}
      <SliderContainer>
        <StatusSlider
          currentStatus={currentStatus}
          onStatusChange={handleStatusChange}
        />
      </SliderContainer>

      {/* 錯誤提示 */}
      {errorMessage && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            color: "red",
            borderRadius: 1,
          }}
        >
          {errorMessage}
        </Box>
      )}

      {/* 載入與儲存提示 */}
      {(isLoading || isSaving) && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            color: "blue",
            borderRadius: 1,
          }}
        >
          {isLoading ? "載入中..." : "儲存中..."}
        </Box>
      )}

      {/* 渲染當前狀態的表單 */}
      {renderStatusForm()}
    </Box>
  );
});

//! =============== 5. PropTypes 驗證 ===============
//* 確保組件接收正確的 props
MachineStatusManager.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  machineId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  productionArea: PropTypes.string,
  autoLoad: PropTypes.bool,
};

MachineStatusManager.defaultProps = {
  initialData: {},
  autoLoad: false,
};

// 設定組件顯示名稱
MachineStatusManager.displayName = "MachineStatusManager";

//! =============== 示例區塊 ===============
/**
 * @example 常見使用場景
 * // 場景 1: 基本使用
 * const machineData = { status: 'IDLE', machineSN: 'M123', productionArea: '區域A' };
 * <MachineStatusManager
 *   initialData={machineData}
 *   onSubmit={handleSubmit}
 * />
 *
 * // 場景 2: 使用 ref 控制
 * const managerRef = useRef(null);
 * // 在需要的時候調用表單提交
 * const handleSave = () => {
 *   if (managerRef.current) {
 *     managerRef.current.submit();
 *   }
 * };
 * <MachineStatusManager
 *   ref={managerRef}
 *   initialData={machineData}
 *   onSubmit={handleSubmit}
 * />
 *
 * // 場景 3: 錯誤處理
 * const handleSubmit = async (data) => {
 *   try {
 *     await api.updateMachineStatus(data);
 *     setSuccess(true);
 *   } catch (error) {
 *     console.error('更新失敗', error);
 *     setError(error.message);
 *   }
 * };
 */

export default MachineStatusManager;
