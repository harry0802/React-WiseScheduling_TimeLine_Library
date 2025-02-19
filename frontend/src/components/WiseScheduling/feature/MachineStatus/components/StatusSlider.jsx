import React from "react";
import { Slider, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

const StatusSlider = () => {
  const { watch, setValue } = useFormContext();
  const status = watch("timeLineStatus");

  const marks = [
    { value: 0, label: "製立單" },
    { value: 25, label: "待機中" },
    { value: 50, label: "上模與調機" },
    { value: 75, label: "產品試模" },
    { value: 100, label: "機台停機" },
  ];

  const getStatusValue = (status) => {
    const statusMap = {
      製立單: 0,
      待機中: 25,
      上模與調機: 50,
      產品試模: 75,
      機台停機: 100,
    };
    return statusMap[status] ?? 0;
  };

  return (
    <Box sx={{ width: "100%", my: 2 }}>
      <Slider
        value={getStatusValue(status)}
        step={null}
        marks={marks}
        onChange={(_, value) => {
          const newStatus = marks.find((m) => m.value === value)?.label;
          if (newStatus) {
            setValue("timeLineStatus", newStatus, {
              shouldValidate: true,
            });
          }
        }}
      />
    </Box>
  );
};

export default StatusSlider;
