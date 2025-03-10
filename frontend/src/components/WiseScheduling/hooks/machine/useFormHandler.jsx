/**
 * @file useFormHandler.jsx
 * @description 表單處理 Hook - 統一管理表單邏輯和驗證
 * @version 1.1.0
 */

//! =============== 1. 設定與常量 ===============
//* 依賴引入區塊，保持組織整齊清晰
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

//! =============== 2. 核心功能 ===============
/**
 * @function useFormHandler
 * @description 表單處理 Hook，提供統一的表單管理、驗證和狀態控制
 *
 * @param {Object} options - Hook 配置選項
 * @param {Object} options.initialData - 初始資料物件
 * @param {Function} options.getDefaultValues - 獲取預設值的函數
 * @param {Object} options.schema - Zod 驗證模式
 * @param {Object} options.ref - React useImperativeHandle 引用
 *
 * @returns {Object} 表單控制物件
 *
 * @example
 * // 基本使用方式
 * const formRef = useRef();
 * const { control, errors } = useFormHandler({
 *   initialData: machineData,
 *   getDefaultValues: () => ({ name: '', status: 'inactive' }),
 *   schema: MachineSchema,
 *   ref: formRef
 * });
 *
 * @notes
 * - 表單值發生變化時會自動觸發驗證
 * - 當 initialData 變更時會自動重設表單
 * - 使用 Zod 進行驗證，確保型別安全
 *
 * @commonErrors
 * - 忘記提供 getDefaultValues 函數導致合併錯誤
 * - 沒有正確設置 schema 導致驗證失敗
 */
function useFormHandler({ initialData, getDefaultValues, schema, ref }) {
  //* 儲存原始初始值的引用，用於比較變更
  const initialDataRef = useRef(initialData);

  //* ========= 初始化邏輯 =========
  // // 步驟 1: 計算表單初始值，結合預設值和傳入的初始資料
  // // 步驟 2: 使用 useMemo 避免不必要的重新計算
  // // 步驟 3: 只有當 initialData 或 getDefaultValues 變更時才重新計算
  // const defaultValues = useMemo(() => {
  //   //? 獲取基礎預設值
  //   const defaults = getDefaultValues();

  //   // 合併初始數據和默認值
  //   const merged = { ...defaults };
  //   // 只取初始數據中有效的欄位覆蓋默認值
  //   if (initialData) {
  //     Object.keys(defaults).forEach((key) => {
  //       if (initialData[key] !== undefined && initialData[key] !== null) {
  //         merged[key] = initialData[key];
  //       }
  //     });
  //   }

  //   return merged;
  // }, [initialData, getDefaultValues]);

  const defaults = getDefaultValues();

  //* 使用 React Hook Form 設置表單
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
    mode: "onChange", //! 使用 onChange 模式即時驗證
  });
  //* ========= 表單重置邏輯 =========
  // 步驟 1: 監聽 initialData 變更
  // 步驟 2: 使用深度比較判斷是否真的變更
  // 步驟 3: 變更時重置表單到新的預設值
  useEffect(() => {
    let ignore = false;

    if (!ignore && !isEqual(initialData, initialDataRef.current)) {
      reset(defaults);
      initialDataRef.current = initialData;
    }

    return () => {
      ignore = true;
    };
  }, [initialData, defaults, reset]);

  //! =============== 3. 工具函數 ===============
  //* 直接使用 React Hook Form 提供的 isDirty 狀態來判斷表單是否變更

  /**
   * @function validate
   * @description 驗證表單並返回驗證結果
   * @returns {Object} 包含驗證結果的物件
   */
  const validate = useCallback(async () => {
    const isValid = await trigger();
    return {
      isValid,
      errors: isValid ? null : errors,
      hasChanges: isDirty,
    };
  }, [trigger, errors, isDirty]);

  /**
   * @function resetForm
   * @description 重置表單到預設值
   */
  const resetForm = useCallback(() => {
    reset(defaults);
  }, [reset, defaults]);

  //* ========= 暴露 API 給父組件 =========
  // 使用 useImperativeHandle 提供父組件可控制的方法
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

  //* 返回所有必要的表單控制屬性和方法
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
