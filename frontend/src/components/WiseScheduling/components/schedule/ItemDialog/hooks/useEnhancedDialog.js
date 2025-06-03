/**
 * @file useEnhancedDialog.js
 * @description EnhancedDialog 的業務邏輯 Hook
 * @version 1.0.0
 */

import { useState, useEffect, useCallback } from "react";
import { ensureFormDateTime } from "../../../../utils/schedule/dateUtils";
import {
  handleFormError,
  logError,
  createStateTransitionError,
  createValidationError,
} from "../../../../utils/schedule/errorHandler";
import { MACHINE_STATUS } from "../../../../configs/validations/schedule/constants";
import {
  validateStatusTransition,
  checkTimeOverlap,
} from "../../../../utils/schedule/statusHelpers";
import {
  transformUpdateStatusToApi,
  transformNewStatusToApi,
} from "../../../../utils/schedule/transformers/apiTransformers";

//! =============== 1. 業務邏輯 Hook ===============
//* 將所有複雜的業務邏輯封裝在 Custom Hook 中

/**
 * @hook useEnhancedDialog
 * @description 管理 EnhancedDialog 的所有業務邏輯
 * @param {Object} item - 當前項目數據
 * @param {string} mode - 對話框模式 (view, edit, add)
 * @param {Object} options - 配置選項
 * @returns {Object} 業務邏輯狀態和方法
 */
function useEnhancedDialog(item, mode, options = {}) {
  const { onSave, onClose, groups } = options;

  // 🦉 核心狀態管理
  const [currentStatus, setCurrentStatus] = useState(
    item?.timeLineStatus || MACHINE_STATUS.IDLE
  );
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔧 同步項目狀態
  useEffect(() => {
    if (item?.timeLineStatus) {
      setCurrentStatus(item.timeLineStatus);
    }
  }, [item]);

  //! =============== 2. 錯誤處理函數 ===============
  //* 純函數處理錯誤邏輯

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const showError = useCallback(
    (err) => {
      const errorMessage = handleFormError(err);
      setError(errorMessage);

      logError(err, {
        context: "EnhancedDialog",
        dialogMode: mode,
        statusType: currentStatus,
        itemId: item?.id,
      });
    },
    [mode, currentStatus, item]
  );

  //! =============== 3. 驗證函數 ===============
  //* 將驗證邏輯拆分為專門的純函數

  const validateFormData = useCallback((formData) => {
    if (!formData.start) {
      formData.start = ensureFormDateTime(new Date());
    }
  }, []);

  const validateStateTransition = useCallback(
    (updatedItem) => {
      if (mode === "add") return;

      const isDataOnlyEdit =
        item?.timeLineStatus === updatedItem.timeLineStatus;

      try {
        validateStatusTransition(
          item?.timeLineStatus || MACHINE_STATUS.IDLE,
          updatedItem.timeLineStatus,
          item,
          mode,
          isDataOnlyEdit
        );
      } catch (error) {
        throw createStateTransitionError(error.message, {
          fromStatus: item?.timeLineStatus || MACHINE_STATUS.IDLE,
          toStatus: updatedItem.timeLineStatus,
          itemId: item?.id,
          isDataOnlyEdit,
        });
      }
    },
    [item, mode]
  );

  const validateTimeOverlap = useCallback(
    (updatedItem) => {
      try {
        checkTimeOverlap(updatedItem, groups);
      } catch (error) {
        throw createValidationError(error.message, {
          field: "timeOverlap",
          item: updatedItem.id,
          group: updatedItem.group,
        });
      }
    },
    [groups]
  );

  //! =============== 4. 數據轉換函數 ===============
  //* 純函數處理數據轉換

  const transformFormData = useCallback(
    (formData) => {
      // 檢查當前狀態是否為製令單
      const isWorkOrder = currentStatus === MACHINE_STATUS.ORDER_CREATED;

      // 基礎物件結構
      const transformedData = {
        ...item,
        id: item?.id || "", // 保留原始ID
        group: formData.group || item?.group || "",
        area: formData.area || item?.area || "",
        machineId: formData.machineId || item?.machineId || null,
        start: formData.start,
        end: isWorkOrder ? item?.end : formData.end,
        timeLineStatus: formData.timeLineStatus || currentStatus,
        content: formData.content || item?.content || currentStatus,
      };

      if (isWorkOrder) {
        // 製令單 - 更新orderInfo
        transformedData.orderInfo = {
          ...item?.orderInfo,
          productName: formData.productName || "",
          process: formData.process ?? 0,
          scheduledStartTime: formData.start,
          scheduledEndTime: item?.orderInfo?.scheduledEndTime || formData.end,
          actualStartTime:
            item?.actualEndTime ?? item?.orderInfo?.actualStartTime ?? null,
          actualEndTime:
            item?.actualEndTime ?? item?.orderInfo?.actualEndTime ?? null,
        };

        // 機台狀態數據清空
        transformedData.status = {};
      } else {
        // 機台狀態 - 更新status
        transformedData.status = {
          ...item?.status,
          product: formData.product || "",
          reason: formData.reason || "",
          startTime: formData.start,
          endTime: formData.end,
        };

        // 製令單數據清空
        transformedData.orderInfo = {};
      }
      return transformedData;
    },
    [item, currentStatus]
  );

  const ensureEndTimeForIdleTransition = useCallback(
    (updatedItem) => {
      const needsEndTime =
        mode !== "add" &&
        item?.timeLineStatus !== MACHINE_STATUS.IDLE &&
        updatedItem.timeLineStatus === MACHINE_STATUS.IDLE &&
        !updatedItem.end;

      if (needsEndTime) {
        const now = new Date();
        updatedItem.end = ensureFormDateTime(now);
        updatedItem.status.endTime = ensureFormDateTime(now);
      }

      return updatedItem;
    },
    [mode, item]
  );

  //! =============== 5. API 處理函數 ===============
  //* Push Ifs Up - 在頂層決定 API 處理路徑

  const processNewItem = useCallback(
    async (internalItem) => {
      const apiItem = transformNewStatusToApi(internalItem, false);
      await onSave?.({ internal: internalItem, api: apiItem });
    },
    [onSave]
  );

  const processExistingItem = useCallback(
    async (internalItem) => {
      const apiItem = transformUpdateStatusToApi(internalItem, item, false);
      await onSave?.({ internal: internalItem, api: apiItem });
    },
    [onSave, item]
  );

  //! =============== 6. 主要提交處理 ===============
  //* 使用組合函數簡化複雜邏輯

  const handleSubmit = useCallback(
    async (formData) => {
      if (isSubmitting) return;

      try {
        clearError();
        setIsSubmitting(true);

        // 🧠 Step 1: 驗證表單數據
        validateFormData(formData);

        // 🧠 Step 2: 轉換數據格式
        let updatedItem = transformFormData(formData);
        // 🧠 Step 3: 驗證業務規則
        validateStateTransition(updatedItem);
        validateTimeOverlap(updatedItem);

        // 🧠 Step 4: 處理特殊情況
        updatedItem = ensureEndTimeForIdleTransition(updatedItem);
        // 🧠 Step 5: Push Ifs Up - 根據模式選擇處理路徑
        if (mode === "add") {
          await processNewItem(updatedItem);
        } else {
          await processExistingItem(updatedItem);
        }

        onClose?.();
      } catch (err) {
        showError(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      isSubmitting,
      clearError,
      showError,
      validateFormData,
      transformFormData,
      validateStateTransition,
      validateTimeOverlap,
      ensureEndTimeForIdleTransition,
      processNewItem,
      processExistingItem,
      onClose,
      mode,
    ]
  );

  //! =============== 7. 狀態切換處理 ===============
  //* 簡化的狀態切換邏輯

  const handleStatusChange = useCallback(
    (newStatus) => {
      try {
        clearError();

        // 🧠 Push Ifs Up - 提前返回特殊情況
        if (mode === "add" && currentStatus === newStatus) {
          return;
        }

        validateStatusTransition(currentStatus, newStatus, item, mode);
        setCurrentStatus(newStatus);
      } catch (err) {
        showError(err);
      }
    },
    [clearError, showError, currentStatus, item, mode]
  );

  //! =============== 8. 返回公共 API ===============
  //* 提供乾淨的 API 給組件使用

  return {
    // 狀態
    currentStatus,
    error,
    isSubmitting,

    // 狀態操作
    setCurrentStatus,
    clearError,

    // 業務操作
    handleSubmit,
    handleStatusChange,
  };
}

export default useEnhancedDialog;
