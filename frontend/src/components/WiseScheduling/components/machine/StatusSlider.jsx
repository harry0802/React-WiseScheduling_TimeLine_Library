/**
 * @file StatusSlider.jsx
 * @description 機台狀態選擇滑塊組件，用於視覺化選擇機台狀態
 * @version 1.0.0
 */

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置,便於統一管理
import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "@emotion/styled";
import { Slider, Box } from "@mui/material";

// 狀態常量和轉換工具
import {
  SLIDER_MARKS,
  convertTimeLineStatus,
  getChineseStatus,

  // 中文狀態常量
  STATE_OLD_TESTING,
  STATE_OLD_OFFLINE,
  STATE_OLD_TUNING,
  STATE_OLD_IDLE,
  STATE_TESTING,
  STATE_OFFLINE,
  STATE_TUNING,
  STATE_IDLE,
} from "../../utils/statusConverter";

//! =============== 2. 類型與介面 ===============
//* 定義所有資料結構,幫助理解資料流向
/**
 * @typedef {Object} SliderMark
 * @property {number} value - 滑塊位置值
 * @property {string} label - 顯示標籤
 */

//! =============== 3. 樣式組件 ===============
//* 使用 emotion 定義組件樣式
/**
 * @component StyledSlider
 * @description 自定義滑塊樣式
 */
const StyledSlider = styled(Slider)`
  .MuiSlider-markLabel {
    font-size: 24px;
    font-weight: 600;
    font-family: Roboto;

    &[data-index="0"] {
      color: #00b0f0; /* 試模狀態顏色 */
    }
    &[data-index="1"] {
      color: #ff0000; /* 異常狀態顏色 */
    }
    &[data-index="2"] {
      color: #ffc000; /* 調機狀態顏色 */
    }
    &[data-index="3"] {
      color: #808080; /* 待機狀態顏色 */
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

/**
 * @component SliderContainer
 * @description 滑塊容器樣式
 */
const SliderContainer = styled(Box)`
  && {
    width: calc(100% - 32px);
    margin: 16px auto;
  }
`;

//! =============== 4. 核心功能 ===============
/**
 * @function StatusSlider
 * @description 機台狀態選擇滑塊組件
 * @returns {React.ReactElement} 狀態選擇滑塊
 *
 * @notes
 * - 狀態定義來自 utils/statusConverter.js
 * - 內部使用英文狀態碼 (TESTING, OFFLINE 等)
 * - 用戶界面顯示中文狀態 (產品試模, 機台停機 等)
 * - 表單需要同時保存 status(英文) 和 statusDisplay(中文) 兩個字段
 */
const StatusSlider = () => {
  //* --------- 狀態管理 ---------
  const { watch, setValue } = useFormContext();
  const status = watch("status");

  //* --------- 事件處理 ---------
  /**
   * @function handleChange
   * @description 處理滑塊變更事件
   * @param {Event} _ - 事件對象（未使用）
   * @param {number} value - 滑塊值
   */
  const handleChange = (_, value) => {
    // 根據滑塊值查找對應的狀態標記
    const newStatus = SLIDER_MARKS.find((m) => m.value === value)?.label;

    if (newStatus) {
      // 設置中文狀態顯示，但在內部存儲英文狀態
      const englishStatus = convertTimeLineStatus(newStatus);

      // 更新狀態值（英文）- 需要驗證
      setValue("status", englishStatus, {
        shouldValidate: true,
      });

      // 更新顯示值（中文）- 不需要驗證
      setValue("statusDisplay", newStatus, {
        shouldValidate: false,
      });
    }
  };

  //* --------- 工具函數 ---------
  /**
   * @function getSliderValue
   * @description 根據狀態碼獲取適用的滑塊值
   * @param {string} statusCode - 英文狀態碼
   * @returns {number} 滑塊位置值
   */
  const getSliderValue = (statusCode) => {
    // 先將英文狀態轉換為中文
    const chineseStatus = getChineseStatus(statusCode);

    //! 狀態對應滑塊值映射
    // 測試狀態
    if (
      chineseStatus === STATE_OLD_TESTING ||
      chineseStatus === STATE_TESTING
    ) {
      return 0;
    }
    // 異常狀態
    else if (
      chineseStatus === STATE_OLD_OFFLINE ||
      chineseStatus === STATE_OFFLINE
    ) {
      return 33;
    }
    // 調機狀態
    else if (
      chineseStatus === STATE_OLD_TUNING ||
      chineseStatus === STATE_TUNING
    ) {
      return 66;
    }
    // 待機狀態
    else if (chineseStatus === STATE_OLD_IDLE || chineseStatus === STATE_IDLE) {
      return 100;
    }

    // 默認值：測試狀態
    return 0;
  };

  //* --------- 渲染滑塊 ---------
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
