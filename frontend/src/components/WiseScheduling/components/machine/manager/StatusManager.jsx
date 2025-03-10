/**
 * @file MachineStatusManager.jsx
 * @description 機台狀態管理器 - 使用 Hook 重構版本
 * @version 2.0.0
 */

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { Box, Alert, Typography } from "@mui/material";

// 導入狀態與組件
import {
  MACHINE_STATUS,
  convertTimeLineStatus,
} from "../../../configs/constants/fieldNames";
import { StatusHeader, SliderContainer } from "../../../assets/machine.styles";
import StatusSlider from "../controls/StatusSlider";

// 導入自定義 Hook
import useStatusForm from "../../../hooks/machine/useStatusManager";

// 導入表單組件
import IdleForm from "./forms/IdleForm";
import SetupForm from "./forms/SetupForm";
import StoppedForm from "./forms/StoppedForm";
import TestingForm from "./forms/TestingForm";

// 表單類型映射
const FORM_COMPONENTS = {
  [MACHINE_STATUS.IDLE]: IdleForm,
  [MACHINE_STATUS.TUNING]: SetupForm,
  [MACHINE_STATUS.SETUP]: SetupForm,
  [MACHINE_STATUS.TESTING]: TestingForm,
  [MACHINE_STATUS.OFFLINE]: StoppedForm,
};

/**
 * 機台狀態管理器
 */
const MachineStatusManager = forwardRef((props, ref) => {
  const { initialData = {}, onSubmit, machineId } = props;

  // 機台當前狀態
  const [currentStatus, setCurrentStatus] = useState(
    initialData?.status || MACHINE_STATUS.IDLE
  );

  // 表單參考
  const formRef = useRef(null);

  // 使用狀態表單處理邏輯
  const {
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
    formApi,
  } = useStatusForm({
    initialData,
    onSubmit,
    machineId,
    formRef,
  });

  // 當初始數據變更時更新狀態
  useEffect(() => {
    if (initialData?.status) {
      setCurrentStatus(initialData.status);
    }
  }, [initialData]);

  /**
   * 處理機台狀態變更
   */
  const handleStatusChange = (newStatus) => {
    // 清除先前的訊息
    setErrorMessage("");
    setSuccessMessage("");

    // 狀態變更時，避免與表單驗證重複
    // 讓表單提交時再驗證狀態轉換
    setCurrentStatus(newStatus);
  };

  // 向父組件暴露表單操作方法
  useImperativeHandle(ref, () => formApi, [formApi]);

  /**
   * 渲染當前狀態對應的表單
   */
  const renderForm = () => {
    const FormComponent =
      FORM_COMPONENTS[currentStatus] || FORM_COMPONENTS[MACHINE_STATUS.IDLE];
    return <FormComponent ref={formRef} initialData={initialData} />;
  };

  /**
   * 渲染狀態規則提示
   */
  const renderStatusRuleHint = () => {
    const currentNormalizedStatus = convertTimeLineStatus(
      initialData?.status || MACHINE_STATUS.IDLE
    );

    if (currentNormalizedStatus === "IDLE") {
      return "待機狀態可切換至任何狀態";
    } else if (
      ["TUNING", "TESTING", "OFFLINE"].includes(currentNormalizedStatus)
    ) {
      return "非待機狀態只能切換至待機狀態";
    }

    return "";
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
          <Typography variant="body2">{renderStatusRuleHint()}</Typography>
        </Box>
      </SliderContainer>

      {/* 成功提示 */}
      {successMessage && (
        <Alert
          severity="success"
          sx={{ mt: 2, mb: 2 }}
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      )}

      {/* 錯誤提示 */}
      {errorMessage && (
        <Alert
          severity="error"
          sx={{ mt: 2, mb: 2 }}
          onClose={() => setErrorMessage("")}
        >
          {errorMessage}
        </Alert>
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
