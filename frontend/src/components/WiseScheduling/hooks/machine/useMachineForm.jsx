/**
 * @file useMachineForm.jsx
 * @description 機台表單處理 Hook - 統一管理表單邏輯和驗證
 * @version 1.0.0
 */

import {
  useCallback,
  useMemo,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";

/**
 * 機台表單處理 Hook
 *
 * @param {Object} options - Hook 配置選項
 * @param {Object} options.initialData - 初始數據
 * @param {Function} options.getDefaultValues - 獲取默認值的函數
 * @param {Object} options.schema - Zod 驗證模式
 * @param {Object} options.ref - React useImperativeHandle 引用
 * @returns {Object} 表單控制物件
 */
export function useFormHandler({ initialData, getDefaultValues, schema, ref }) {
  // 儲存原始初始值的引用，用於比較
  const initialDataRef = useRef(initialData);

  // 計算初始值
  const defaultValues = useMemo(() => {
    const defaults = getDefaultValues();

    // 合併初始數據和默認值
    const merged = { ...defaults };

    // 只取初始數據中有效的欄位覆蓋默認值
    if (initialData) {
      Object.keys(defaults).forEach((key) => {
        if (initialData[key] !== undefined && initialData[key] !== null) {
          merged[key] = initialData[key];
        }
      });
    }

    return merged;
  }, [initialData, getDefaultValues]);

  // 使用 React Hook Form
  const {
    control,
    formState: { errors, isDirty, touchedFields, dirtyFields },
    reset,
    getValues,
    setValue,
    trigger,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  // 當初始數據更新時重置表單
  useEffect(() => {
    if (!isEqual(initialData, initialDataRef.current)) {
      reset(defaultValues);
      initialDataRef.current = initialData;
    }
  }, [initialData, defaultValues, reset]);

  // 監控整個表單的值
  const formValues = watch();

  /**
   * 檢查表單值是否有改變
   * @returns {boolean} 表單是否有變更
   */
  const hasChanged = useCallback(() => {
    const currentValues = getValues();

    // 建立一個基準值來比較（可能是初始數據或默認值）
    const baseValues = initialData || getDefaultValues();

    // 檢查每個欄位是否有變化
    for (const key in currentValues) {
      // 特殊處理日期型資料 (如果需要)
      if (baseValues[key] !== currentValues[key]) {
        return true;
      }
    }

    return isDirty;
  }, [getValues, initialData, getDefaultValues, isDirty]);

  // 驗證表單
  const validate = useCallback(async () => {
    const isValid = await trigger();
    return {
      isValid,
      errors: isValid ? null : errors,
      hasChanges: hasChanged(),
    };
  }, [trigger, errors, hasChanged]);

  // 重置表單
  const resetForm = useCallback(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  // 暴露方法給父組件
  useImperativeHandle(
    ref,
    () => ({
      getValues,
      validate,
      reset: resetForm,
      setValue,
      hasChanged,
      isFormDirty: isDirty,
    }),
    [getValues, validate, resetForm, setValue, hasChanged, isDirty]
  );

  return {
    control,
    errors,
    reset: resetForm,
    getValues,
    validate,
    setValue,
    watch,
    defaultValues,
    isDirty,
    touchedFields,
    dirtyFields,
    hasChanged,
  };
}
