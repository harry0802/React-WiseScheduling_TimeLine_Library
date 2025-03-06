/**
 * @file MachineStatusManager.jsx
 * @description 機台狀態管理器 - 簡化版本
 */

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

// 導入狀態與組件
import { MACHINE_STATUS } from "../../../configs/validations/machine/machineSchemas";
import { StatusHeader, SliderContainer } from "../../../assets/machine.styles";
import StatusSlider from "../controls/StatusSlider";
import { convertTimeLineStatus } from "../../../utils/statusConverter";

// 導入表單組件
import IdleForm from "./forms/IdleForm";
import SetupForm from "./forms/SetupForm";
import StoppedForm from "./forms/StoppedForm";
import TestingForm from "./forms/TestingForm";

//! 表單類型映射 - 簡化條件判斷 ✨
const FORM_COMPONENTS = {
  [MACHINE_STATUS.IDLE]: IdleForm,
  [MACHINE_STATUS.TUNING]: SetupForm,
  [MACHINE_STATUS.SETUP]: SetupForm,
  [MACHINE_STATUS.TESTING]: TestingForm,
  [MACHINE_STATUS.OFFLINE]: StoppedForm,
};

/**
 * 機台狀態管理器 - 協調狀態切換與表單處理
 */
const MachineStatusManager = forwardRef((props, ref) => {
  const { initialData = {}, onSubmit, machineId } = props;

  //! 狀態管理 - 只保留核心狀態 🧠
  const [currentStatus, setCurrentStatus] = useState(
    initialData?.status || MACHINE_STATUS.IDLE
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  //! 單一表單引用 - 減少多餘的 ref 創建 💡
  const formRef = useRef(null);

  // 當初始數據更新時設置狀態
  useEffect(() => {
    if (initialData?.status) {
      setCurrentStatus(initialData.status);
    }
  }, [initialData]);

  /**
   * 處理狀態變更 - 簡化判斷邏輯 ✨
   */
  const handleStatusChange = (newStatus) => {
    const originalStatus = convertTimeLineStatus(
      initialData?.status || MACHINE_STATUS.IDLE
    );

    // 簡化為兩條規則:
    if (originalStatus === "IDLE" || newStatus === "IDLE") {
      setErrorMessage("");
      setCurrentStatus(newStatus);
    } else {
      setErrorMessage("非待機狀態的機台只能切換回待機狀態");
    }
  };

  /**
   * 驗證表單 - 直接調用當前表單的驗證方法
   */
  const validateForm = async () => {
    if (!formRef.current) {
      return {
        isValid: false,
        values: null,
        errors: { _form: "無法找到表單" },
      };
    }

    try {
      const { isValid, errors } = await formRef.current.validate();

      if (!isValid) {
        return { isValid: false, values: null, errors };
      }

      const values = formRef.current.getValues();
      return { isValid: true, values, errors: null };
    } catch (error) {
      console.error("表單驗證錯誤:", error);
      return { isValid: false, values: null, errors: { _form: error.message } };
    }
  };

  /**
   * 提交表單 - 整合驗證與提交
   */
  const submitForm = async () => {
    try {
      setIsSaving(true);
      setErrorMessage("");

      const { isValid, values, errors } = await validateForm();

      if (!isValid || !values) {
        setErrorMessage("表單驗證失敗");
        console.error("表單錯誤:", errors);
        return false;
      }

      // 添加機台ID並提交
      await onSubmit({
        ...values,
        machineId: machineId || initialData?.machineId,
      });

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
   */
  const resetForm = () => {
    if (formRef.current?.reset) {
      formRef.current.reset();
    }
  };

  /**
   * 暴露必要方法給父組件 - 保留核心接口
   */
  useImperativeHandle(
    ref,
    () => ({
      // 只保留父組件實際使用的方法
      getValues: () => formRef.current?.getValues?.() || {},
      validate: validateForm,
      submit: submitForm,
      reset: resetForm,
    }),
    [currentStatus, errorMessage, isSaving]
  );

  /**
   * 渲染表單 - 使用映射表簡化代碼 ✨
   */
  const renderForm = () => {
    const FormComponent =
      FORM_COMPONENTS[currentStatus] || FORM_COMPONENTS[MACHINE_STATUS.IDLE];
    return <FormComponent ref={formRef} initialData={initialData} />;
  };

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
            {initialData?.actualStartDate ||
              initialData?.planStartDate ||
              new Date().toLocaleString()}
          </p>
        </div>
      </StatusHeader>

      {/* 狀態選擇器 */}
      <SliderContainer>
        <StatusSlider
          currentStatus={currentStatus}
          originalStatus={initialData?.status || MACHINE_STATUS.IDLE}
          onStatusChange={handleStatusChange}
        />

        {/* 狀態提示 */}
        <Box
          sx={{
            mt: 1,
            p: 1,
            backgroundColor: "rgba(0% 0% 100% / 0.05)",
            color: "rgba(0% 40% 80% / 1)",
            borderRadius: 1,
            fontSize: "0.875rem",
          }}
        >
          {convertTimeLineStatus(initialData?.status || MACHINE_STATUS.IDLE) ===
          "IDLE"
            ? "待機狀態可切換至任何狀態"
            : "非待機狀態只能切換至待機狀態"}
        </Box>
      </SliderContainer>

      {/* 錯誤提示 */}
      {errorMessage && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "rgba(100% 0% 0% / 0.1)",
            color: "rgba(100% 0% 0% / 1)",
            borderRadius: 1,
          }}
        >
          {errorMessage}
        </Box>
      )}

      {/* 保存提示 */}
      {isSaving && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "rgba(0% 0% 100% / 0.1)",
            color: "rgba(0% 0% 100% / 1)",
            borderRadius: 1,
          }}
        >
          儲存中...
        </Box>
      )}

      {/* 表單 */}
      {renderForm()}
    </Box>
  );
});

MachineStatusManager.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  machineId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MachineStatusManager.displayName = "MachineStatusManager";

export default MachineStatusManager;
