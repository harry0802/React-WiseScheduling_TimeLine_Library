/**
 * @file MachineStatusManager.jsx
 * @description 機台狀態管理器 - 使用 Hook 重構版本
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

// 導入自定義 Hook
import useStatusForm from "../../../hooks/machine/form/useStatusForm";

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
  const { errorMessage, setErrorMessage, formApi } = useStatusForm({
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
    const originalStatus = convertTimeLineStatus(
      initialData?.status || MACHINE_STATUS.IDLE
    );

    // 狀態切換規則:
    if (originalStatus === "IDLE" || newStatus === "IDLE") {
      setErrorMessage("");
      setCurrentStatus(newStatus);
    } else {
      setErrorMessage("非待機狀態的機台只能切換回待機狀態");
    }
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
