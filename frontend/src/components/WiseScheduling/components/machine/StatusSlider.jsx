/**
 * @file StatusSlider.jsx
 * @description 機台狀態選擇滑塊組件，用於視覺化選擇機台狀態
 * @version 3.0.0
 */

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置,便於統一管理

import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import styled from "@emotion/styled";
import { Slider, Box } from "@mui/material";
import PropTypes from "prop-types";

import {
  SLIDER_MARKS,
  convertTimeLineStatus,
  getChineseStatus,
  // 狀態常量
  STATE_TESTING,
  STATE_OFFLINE,
  STATE_TUNING,
  STATE_IDLE,
  STATE_OLD_TESTING,
  STATE_OLD_OFFLINE,
  STATE_OLD_TUNING,
  STATE_OLD_IDLE,
} from "../../utils/statusConverter";

//! =============== 2. 類型與介面 ===============
//* 定義所有資料結構,幫助理解資料流向

/**
 * @typedef {Object} StatusSliderProps
 * @property {string} currentStatus - 當前選中的狀態
 * @property {(newStatus: string) => void} onStatusChange - 狀態變更處理函數
 */

//! =============== 3. 核心常量 ===============
//* 主要業務邏輯區,每個功能都配有詳細說明

/**
 * 狀態值到滑塊值的映射表
 * @type {Record<string, number>}
 */
const STATUS_TO_SLIDER_VALUE = {
  // 中文新舊狀態到滑塊值映射
  [STATE_TESTING]: 0,
  [STATE_OLD_TESTING]: 0,
  [STATE_OFFLINE]: 33,
  [STATE_OLD_OFFLINE]: 33,
  [STATE_TUNING]: 66,
  [STATE_OLD_TUNING]: 66,
  [STATE_IDLE]: 100,
  [STATE_OLD_IDLE]: 100,
  // 默認值
  DEFAULT: 100,
};

/**
 * @type {Object} 狀態對應的顏色配置
 */
const STATUS_COLORS = {
  testing: "#00b0f0", // 試模狀態顏色
  offline: "#ff0000", // 異常狀態顏色
  tuning: "#ffc000", // 調機狀態顏色
  idle: "#808080", // 待機狀態顏色
};

//! =============== 4. 樣式組件 ===============
//* 所有樣式相關的組件定義

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

//! =============== 5. 工具函數 ===============
//* 通用功能區,可被多個模組復用

/**
 * 從當前狀態取得滑塊值
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
 * @function StatusSlider
 * @description 機台狀態選擇滑塊組件
 * @param {StatusSliderProps} props - 組件屬性
 * @returns {React.ReactElement} 狀態選擇滑塊
 */
const StatusSlider = ({ currentStatus, onStatusChange }) => {
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

  //* 當 currentStatus 改變時，更新滑塊值
  //* 避免在用户手動更改時重複更新
  useEffect(() => {
    if (prevStatusRef.current !== currentStatus && !userChangedRef.current) {
      setSliderValue(getSliderValueFromStatus(currentStatus));
      prevStatusRef.current = currentStatus;
    }
    // 重置用户變更標記
    userChangedRef.current = false;
  }, [currentStatus]);

  //! ========= 事件處理 =========

  /**
   * 設置表單值的輔助函數
   * @function setValue
   * @param {string} name - 字段名稱
   * @param {any} value - 字段值
   * @param {Object} options - 設置選項
   */
  const setValue = (name, value, options) => {
    if (isMountedInForm) {
      formContext.setValue(name, value, options);
    }
  };

  /**
   * 處理滑塊變更事件
   * @function handleChange
   * @param {Event} _ - 事件對象（未使用）
   * @param {number} value - 滑塊值
   */
  const handleChange = (_, value) => {
    // 設置用户變更標記
    userChangedRef.current = true;

    // 設置內部滑塊值
    setSliderValue(value);

    // 根據滑塊值查找對應的狀態標記
    const newStatus = SLIDER_MARKS.find((m) => m.value === value)?.label;

    if (newStatus) {
      // 如果在表單上下文中，更新表單值
      if (isMountedInForm) {
        // 更新狀態值
        setValue("status", newStatus, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });

        // 更新顯示值
        setValue("statusDisplay", newStatus, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      }

      // 更新上一次的狀態
      prevStatusRef.current = newStatus;

      // 調用父組件的狀態變更函數
      onStatusChange(newStatus);
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

//! ========= PropTypes 定義 =========

StatusSlider.propTypes = {
  currentStatus: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default StatusSlider;
