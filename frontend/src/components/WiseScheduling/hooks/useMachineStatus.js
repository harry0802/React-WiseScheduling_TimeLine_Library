/**
 * @file useMachineStatus.js
 * @description 機台狀態管理鉤子，用於處理機台狀態相關邏輯
 * @version 1.0.0
 */

import { useState, useCallback } from "react";
import { MACHINE_STATUS } from "../configs/validations/schedule/constants";

/**
 * @typedef {Object} MachineStatusHook
 * @property {string} currentStatus - 當前機台狀態
 * @property {Object} formData - 表單數據
 * @property {Function} setStatus - 設置機台狀態
 * @property {Function} updateFormData - 更新表單數據
 * @property {Function} resetStatus - 重置機台狀態
 * @property {Function} getFormComponent - 獲取對應狀態的表單組件
 */

/**
 * 機台狀態管理鉤子
 *
 * @function useMachineStatus
 * @param {Object} options - 配置選項
 * @param {string} options.initialStatus - 初始機台狀態
 * @param {Object} options.initialData - 初始表單數據
 * @param {Function} options.onStatusChange - 狀態變更回調
 * @param {Function} options.onDataChange - 數據變更回調
 * @returns {MachineStatusHook} 機台狀態管理對象
 *
 * @example
 * const {
 *   currentStatus,
 *   formData,
 *   setStatus,
 *   updateFormData,
 *   getFormComponent
 * } = useMachineStatus({
 *   initialStatus: MACHINE_STATUS.IDLE,
 *   initialData: {},
 *   onStatusChange: handleStatusChange,
 *   onDataChange: handleDataChange
 * });
 */
const useMachineStatus = ({
  initialStatus = MACHINE_STATUS.IDLE,
  initialData = {},
  onStatusChange,
  onDataChange,
} = {}) => {
  // 狀態管理
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [formData, setFormData] = useState(initialData);

  /**
   * 設置機台狀態
   *
   * @function setStatus
   * @param {string} newStatus - 新的機台狀態
   */
  const setStatus = useCallback(
    (newStatus) => {
      // 保存舊狀態資料
      const oldData = { ...formData };

      setCurrentStatus(newStatus);

      // 通知上層元件
      if (onStatusChange) {
        onStatusChange(newStatus, oldData);
      }
    },
    [formData, onStatusChange]
  );

  /**
   * 更新表單數據
   *
   * @function updateFormData
   * @param {Object} data - 新的表單數據
   */
  const updateFormData = useCallback(
    (data) => {
      setFormData((prevData) => {
        const newData = { ...prevData, ...data };

        // 通知上層元件
        if (onDataChange) {
          onDataChange(newData);
        }

        return newData;
      });
    },
    [onDataChange]
  );

  /**
   * 重置機台狀態
   *
   * @function resetStatus
   */
  const resetStatus = useCallback(() => {
    setCurrentStatus(initialStatus);
    setFormData(initialData);
  }, [initialStatus, initialData]);

  /**
   * 獲取對應狀態的表單組件配置
   *
   * @function getFormComponent
   * @returns {Object} 表單組件配置
   */
  const getFormComponent = useCallback(() => {
    return {
      status: currentStatus,
      formProps: {
        initialData: formData,
        onSubmit: updateFormData,
      },
    };
  }, [currentStatus, formData, updateFormData]);

  return {
    currentStatus,
    formData,
    setStatus,
    updateFormData,
    resetStatus,
    getFormComponent,
  };
};

export default useMachineStatus;
