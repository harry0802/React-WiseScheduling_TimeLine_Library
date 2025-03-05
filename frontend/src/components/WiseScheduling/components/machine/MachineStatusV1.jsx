// components/WiseScheduling/components/machine/MachineStatus.jsx
import React, { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { MACHINE_STATUS } from "../../configs/validations/schedule/constants";
import StatusSlider from "./StatusSlider";

// 導入各狀態表單元件
import IdleForm from "./forms/IdleForm";
import SetupForm from "./forms/SetupForm";
import TestingForm from "./forms/TestingForm";
import StoppedForm from "./forms/StoppedForm";

const MachineStatus = ({
  machineId,
  initialStatus = MACHINE_STATUS.IDLE,
  initialData = {},
  onStatusChange,
  onSubmit,
}) => {
  const [currentStatus, setCurrentStatus] = useState(initialStatus.status);
  const [formData, setFormData] = useState(initialData);

  // 狀態切換處理
  const handleStatusChange = (newStatus) => {
    // 保存舊狀態資料
    const oldData = { ...formData };

    setCurrentStatus(newStatus);

    // 通知上層元件
    if (onStatusChange) {
      onStatusChange(newStatus, oldData);
    }
  };

  // 表單提交處理
  const handleFormSubmit = (data) => {
    setFormData(data);

    if (onSubmit) {
      onSubmit(data);
    }
  };

  // 根據狀態動態渲染對應的表單元件
  const renderStatusForm = () => {
    const formProps = {
      machineId,
      onSubmit: handleFormSubmit,
      initialData: formData,
    };

    switch (currentStatus) {
      case MACHINE_STATUS.IDLE:
        return <IdleForm {...formProps} />;
      case MACHINE_STATUS.SETUP:
        return <SetupForm {...formProps} />;
      case MACHINE_STATUS.TESTING:
        return <TestingForm {...formProps} />;
      case MACHINE_STATUS.STOPPED:
        return <StoppedForm {...formProps} />;
      default:
        return <IdleForm {...formProps} />;
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        機台狀態: {machineId}
      </Typography>

      <StatusSlider
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
      />

      <Box sx={{ mt: 3 }}>{renderStatusForm()}</Box>
    </Paper>
  );
};

export default MachineStatus;
