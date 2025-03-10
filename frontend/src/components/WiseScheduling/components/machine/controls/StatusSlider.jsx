/**
 * @file StatusSlider.jsx
 * @description 機台狀態選擇滑塊組件，用於視覺化選擇機台狀態
 * @version 3.0.1
 */

//! =============== 1. 引入與常量 ===============
//* 這個區塊包含所有引入和常量定義,便於統一管理

import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import styled from "@emotion/styled";
import { Slider, Box } from "@mui/material";
import PropTypes from "prop-types";

import {
  SLIDER_MARKS,
  convertTimeLineStatus,
  getChineseStatus,
  // 只導入實際使用的常量
  STATE_IDLE,
  SLIDER_VALUE_MAP,
  getStatusFromSliderValue,
  STATUS_NAME_MAP
} from "../../../configs/constants/fieldNames";

//! =============== 2. 類型與介面 ===============
//* 定義所有資料結構,幫助理解資料流向

/**
 * @typedef {Object} StatusSliderProps
 * @property {string} currentStatus - 當前選中的狀態
 * @property {string} originalStatus - 原始狀態
 * @property {(newStatus: string) => void} onStatusChange - 狀態變更處理函數
 */

//! =============== 3. 核心常量 ===============
//* 主要業務邏輯區,每個功能都配有詳細說明

/**
 * 狀態值到滑塊值的映射表 🧠
 *
 * @type {Record<string, number>}
 */
const STATUS_TO_SLIDER_VALUE = {
  // 简化映射，直接使用滑块对应值
  TESTING: 0,
  OFFLINE: 33,
  TUNING: 66,
  IDLE: 100,
  // 默認值
  DEFAULT: 100,
};

/**
 * 狀態對應的顏色配置 💡
 */
const STATUS_COLORS = {
  testing: "rgba(0% 69% 94.1% / 1)", // #00b0f0
  offline: "rgba(100% 0% 0% / 1)", // #ff0000
  tuning: "rgba(100% 75.3% 0% / 1)", // #ffc000
  idle: "rgba(50.2% 50.2% 50.2% / 1)", // #808080
};

//! =============== 4. 樣式組件 ===============
//* 所有樣式相關的組件定義

/**
 * 自定義滑塊樣式 💡
 * 根據不同狀態顯示不同顏色
 */
const StyledSlider = styled(Slider)`
  .MuiSlider-markLabel {
    font-size: 1.5rem;
    font-weight: 600;
    font-family: Roboto;

    &[data-index="0"] {
      color: ${STATUS_COLORS.testing};
    }
    &[data-index="1"] {
      color: ${STATUS_COLORS.offline};
    }
    &[data-index="2"] {
      color: ${STATUS_COLORS.tuning};
    }
    &[data-index="3"] {
      color: ${STATUS_COLORS.idle};
    }
  }

  .MuiSlider-rail {
    background: rgba(25.5% 35% 42.7% / 1); /* #41596d */
    border: 1px solid rgba(16.9% 25.9% 33.3% / 1); /* #2b4255 */
    border-radius: 4px;
  }

  .MuiSlider-mark {
    background: rgba(56.1% 56.1% 56.1% / 1); /* #8f8f8f */
    width: 6px;
    height: 6px;
    border-radius: 4px;
  }

  .MuiSlider-track {
    background: rgba(25.5% 35% 42.7% / 1); /* #41596d */
    border-radius: 4px;
    border: none;
  }

  .MuiSlider-thumb {
    width: 2rem;
    height: 2rem;
    background: rgba(9.4% 42.4% 59.6% / 1); /* #186c98 */
    border: 3px solid rgba(100% 100% 100% / 1); /* #fff */
    border-radius: 32.5px;
    box-shadow: 0px 4px 4px 0px rgba(0% 0% 0% / 0.25);

    &:hover,
    &.Mui-focusVisible {
      box-shadow: 0px 4px 4px 0px rgba(0% 0% 0% / 0.25);
    }
  }
`;

/**
 * 滑塊容器樣式 ✨
 * 提供固定邊距的滑塊容器
 */
const SliderContainer = styled(Box)`
  && {
    width: calc(100% - 2rem);
    margin: 1rem auto;
  }
`;

//! =============== 5. 工具函數 ===============
//* 通用功能區,可被多個模組復用

/**
 * 從當前狀態取得滑塊值 ✨
 *
 * @function getSliderValueFromStatus
 * @param {string} status - 當前狀態
 * @returns {number} - 對應的滑塊值
 */
const getSliderValueFromStatus = (status) => {
  // 直接從映射表中獲取
  if (STATUS_TO_SLIDER_VALUE[status] !== undefined) {
    return STATUS_TO_SLIDER_VALUE[status];
  }

  // 尋找中文狀態的映射
  const chineseStatus = getChineseStatus(status);
  if (STATUS_TO_SLIDER_VALUE[chineseStatus] !== undefined) {
    return STATUS_TO_SLIDER_VALUE[chineseStatus];
  }

  // 查找標記中的匹配
  const mark = SLIDER_MARKS.find(
    (m) => m.label === status || m.label === chineseStatus
  );

  return mark ? mark.value : STATUS_TO_SLIDER_VALUE.DEFAULT;
};

//! =============== 6. 主要組件 ===============
//* 組件主體實現

/**
 * 機台狀態選擇滑塊組件
 *
 * @function StatusSlider
 * @param {StatusSliderProps} props - 組件屬性
 * @returns {React.ReactElement} 狀態選擇滑塊
 */
const StatusSlider = ({ currentStatus, originalStatus, onStatusChange }) => {
  //! ========= 本地狀態與引用 =========

  // 用於記錄上一次的狀態，避免不必要的更新
  const prevStatusRef = useRef(currentStatus);
  // 用於判斷是否用戶手動變更狀態
  const userChangedRef = useRef(false);

  // 檢查是否在 FormContext 內運行
  const formContext = useFormContext();
  const isMountedInForm = !!formContext;

  // 初始化滑塊值
  const [sliderValue, setSliderValue] = useState(() =>
    getSliderValueFromStatus(currentStatus)
  );

  //! ========= 副作用 =========

  /**
   * 當 currentStatus 改變時，更新滑塊值 🧠
   * 避免在用户手動更改時重複更新
   */
  useEffect(() => {
    // 如果非用户操作且狀態確實改變了，才更新滑塊值
    if (prevStatusRef.current !== currentStatus && !userChangedRef.current) {
      setSliderValue(getSliderValueFromStatus(currentStatus));
      prevStatusRef.current = currentStatus;
    }

    // 重置用户變更標記
    userChangedRef.current = false;
  }, [currentStatus]);

  //! ========= 事件處理 =========

  /**
   * 設置表單值的輔助函數 ✨
   */
  const setValue = (name, value, options) => {
    if (isMountedInForm) {
      formContext.setValue(name, value, options);
    }
  };

  /**
   * 處理狀態轉換限制的檢查 💡
   *
   * @param {string} originalEnglishStatus - 原始API狀態
   * @param {string} newStatus - 新選擇的狀態
   * @returns {boolean} - 是否允許轉換
   */
  const isStatusChangeAllowed = (originalEnglishStatus, newStatus) => {
    // 若原始狀態是待機，可切換到任何狀態
    if (originalEnglishStatus === "IDLE") {
      return true;
    }

    // 若原始狀態不是待機，則只能切換回待機
    return newStatus === "IDLE";
  };

  /**
   * 處理滑塊變更事件 🧠
   *
   * @function handleChange
   * @param {Event} _ - 事件對象（未使用）
   * @param {number} value - 滑塊值
   */
  const handleChange = (_, value) => {
    // 設置用户變更標記
    userChangedRef.current = true;

    // 根據滑塊值查找對應的狀態
    const newStatus = SLIDER_MARKS.find((m) => m.value === value)?.label;
    const englishStatus = getStatusFromSliderValue(value);

    // 將原始中文狀態轉換為英文狀態代碼
    const originalEnglishStatus = convertTimeLineStatus(originalStatus);

    // 檢查狀態轉換是否允許
    if (!isStatusChangeAllowed(originalEnglishStatus, englishStatus)) {
      // 狀態轉換不允許，還原到之前的值
      setSliderValue(getSliderValueFromStatus(prevStatusRef.current));
      console.warn("非待機狀態只能切換回待機狀態");
      return;
    }

    // 設置內部滑塊值
    setSliderValue(value);

    if (newStatus) {
      // 如果在表單上下文中，更新表單值
      if (isMountedInForm) {
        const formOptions = {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        };

        // 更新狀態值
        setValue("status", newStatus, formOptions);
        // 更新顯示值
        setValue("statusDisplay", newStatus, formOptions);
      }

      // 更新上一次的狀態
      prevStatusRef.current = englishStatus;

      // 調用父組件的狀態變更函數
      onStatusChange(englishStatus);
    }
  };

  //! ========= 渲染 =========

  return (
    <SliderContainer>
      <StyledSlider
        value={sliderValue}
        step={null}
        marks={SLIDER_MARKS}
        onChange={handleChange}
      />
    </SliderContainer>
  );
};

export default StatusSlider;
