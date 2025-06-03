/**
 * @file useFormHandler.jsx
 * @description 表單處理 Hook - 簡化版本
 * @version 2.0.0
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
 * 表單處理 Hook - 簡化版本
 * @function useFormHandler
 * @param {Object} options - Hook 配置選項
 * @param {Object} options.initialData - 初始資料物件
 * @param {Function} options.getDefaultValues - 獲取預設值的函數
 * @param {Object} options.schema - Zod 驗證模式
 * @param {Object} options.ref - React useImperativeHandle 引用
 * @returns {Object} 表單控制物件
 */
function useFormHandler({ initialData, getDefaultValues, schema, ref }) {
  const initialDataRef = useRef(initialData);
  const defaults = getDefaultValues();

  // 使用 React Hook Form 設置表單
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
    defaultValues: defaults,
    mode: "onChange",
  });

  // 當 initialData 變更時重置表單
  useEffect(() => {
    if (!isEqual(initialData, initialDataRef.current)) {
      reset(defaults);
      initialDataRef.current = initialData;
    }
  }, [initialData, defaults, reset]);

  // 表單驗證
  const validate = useCallback(async () => {
    const isValid = await trigger();
    return {
      isValid,
      errors: isValid ? null : errors,
      hasChanges: isDirty,
    };
  }, [trigger, errors, isDirty]);

  // 重置表單
  const resetForm = useCallback(() => {
    reset(defaults);
  }, [reset, defaults]);

  // 暴露 API 給父組件
  useImperativeHandle(
    ref,
    () => ({
      getValues,
      validate,
      reset: resetForm,
      setValue,
      isFormDirty: isDirty,
    }),
    [getValues, validate, resetForm, setValue, isDirty]
  );

  return {
    control,
    errors,
    reset: resetForm,
    getValues,
    validate,
    setValue,
    watch,
    defaults,
    isDirty,
    touchedFields,
    dirtyFields,
  };
}

export { useFormHandler };
