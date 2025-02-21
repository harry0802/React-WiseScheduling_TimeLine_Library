import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "@emotion/styled";
import { Slider, Box } from "@mui/material";

const STATUS_MAP = {
  產品試模: 0,
  機台停機: 33,
  上模與調機: 66,
  待機中: 100,
};

const MARKS = [
  { value: 0, label: "產品試模" },
  { value: 33, label: "機台停機" },
  { value: 66, label: "上模與調機" },
  { value: 100, label: "待機中" },
];

const StyledSlider = styled(Slider)`
  .MuiSlider-markLabel {
    font-size: 24px;
    font-weight: 600;
    font-family: Roboto;

    &[data-index="0"] {
      color: #00b0f0;
    }
    &[data-index="1"] {
      color: #ff0000;
    }
    &[data-index="2"] {
      color: #ffc000;
    }
    &[data-index="3"] {
      color: #808080;
    }
  }

  .MuiSlider-rail {
    background: #41596d;
    border: 1px solid #2b4255;
    border-radius: 4px;
  }

  .MuiSlider-mark {
    background: #8f8f8f;
    width: 6px;
    height: 6px;
    border-radius: 4px;
  }

  .MuiSlider-track {
    background: #41596d;
    border-radius: 4px;
    border: none;
  }

  .MuiSlider-thumb {
    width: 32px;
    height: 32px;
    background: #186c98;
    border: 3px solid #fff;
    border-radius: 32.5px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    &:hover,
    &.Mui-focusVisible {
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }
  }
`;

const SliderContainer = styled(Box)`
  && {
    width: calc(100% - 32px);
    margin: 16px auto;
  }
`;

const StatusSlider = () => {
  const { watch, setValue } = useFormContext();
  const status = watch("timeLineStatus");

  const handleChange = (_, value) => {
    const newStatus = MARKS.find((m) => m.value === value)?.label;
    if (newStatus) {
      setValue("timeLineStatus", newStatus, { shouldValidate: true });
    }
  };

  return (
    <SliderContainer>
      <StyledSlider
        value={STATUS_MAP[status] ?? 0}
        step={null}
        marks={MARKS}
        onChange={handleChange}
      />
    </SliderContainer>
  );
};

export default StatusSlider;
