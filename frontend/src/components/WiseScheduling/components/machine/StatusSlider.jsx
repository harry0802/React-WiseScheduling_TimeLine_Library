import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "@emotion/styled";
import { Slider, Box } from "@mui/material";
import {
  SLIDER_VALUE_MAP,
  SLIDER_MARKS,
  convertTimeLineStatus,
  getChineseStatus,
  STATE_OLD_TESTING,
  STATE_OLD_OFFLINE,
  STATE_OLD_TUNING,
  STATE_OLD_IDLE,
  STATE_TESTING,
  STATE_OFFLINE,
  STATE_TUNING,
  STATE_IDLE,
} from "../../utils/statusConverter";

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

/**
 * 機台狀態選擇器
 *
 * 注意：
 * 1. 狀態定義來自 utils/statusConverter.js
 * 2. 內部使用英文狀態碼 (TESTING, OFFLINE 等)
 * 3. 用戶界面顯示中文狀態 (產品試模, 機台停機 等)
 * 4. 表單需要同時保存 status(英文) 和 statusDisplay(中文) 兩個字段
 */
const StatusSlider = () => {
  const { watch, setValue } = useFormContext();
  const status = watch("status");
  console.log("🚀 ~ StatusSlider ~ status:", status);

  const handleChange = (_, value) => {
    const newStatus = SLIDER_MARKS.find((m) => m.value === value)?.label;
    if (newStatus) {
      // 設置中文狀態顯示，但在內部存儲英文狀態
      const englishStatus = convertTimeLineStatus(newStatus);
      setValue("status", englishStatus, {
        shouldValidate: true,
      });
      setValue("statusDisplay", newStatus, { shouldValidate: false });
    }
  };

  // 根據狀態碼獲取適用的滑塊值
  const getSliderValue = (statusCode) => {
    const chineseStatus = getChineseStatus(statusCode);

    // 加入映射個案處理，確保舊新狀態都能正確映射到滑塊值
    if (
      chineseStatus === STATE_OLD_TESTING ||
      chineseStatus === STATE_TESTING
    ) {
      return 0;
    } else if (
      chineseStatus === STATE_OLD_OFFLINE ||
      chineseStatus === STATE_OFFLINE
    ) {
      return 33;
    } else if (
      chineseStatus === STATE_OLD_TUNING ||
      chineseStatus === STATE_TUNING
    ) {
      return 66;
    } else if (
      chineseStatus === STATE_OLD_IDLE ||
      chineseStatus === STATE_IDLE
    ) {
      return 100;
    }

    return 0; // 默認值
  };

  return (
    <SliderContainer>
      <StyledSlider
        value={getSliderValue(status)}
        step={null}
        marks={SLIDER_MARKS}
        onChange={handleChange}
      />
    </SliderContainer>
  );
};

export default StatusSlider;
