//! =============== 1. 設定與常量 ===============
//* 引入必要的依賴和配置
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  FORM_CONFIGURATIONS,
  PROCESS_SELECTION_FORM,
} from "../../../config/processTypes_v1";
import { useProcessData } from "./useProcessData";
import { getProcessResolver } from "../../../utility/formValidationUtils";

//! =============== 2. 類型與介面 ===============
/**
 * @typedef {Object} ProcessFormProps
 * @property {Object} initialData - 初始表單數據
 * @property {Object} externalMethods - 外部表單方法
 * @property {boolean} visible - 表單可見性
 */

//! =============== 3. 核心功能 ===============
/**
 * @function useProcessForm
 * @description 處理製程表單的自定義 Hook
 * @param {ProcessFormProps} props - Hook 參數
 * @returns {Object} 表單相關方法和狀態
 *
 * @example
 * const { methods, processCategory, loading } = useProcessForm({
 *   initialData: data,
 *   visible: true
 * });
 *
 * @notes
 * - 需要確保 initialData 的結構符合預期
 * - 表單重置時會清空除 processCategory 外的所有欄位
 */
export const useProcessForm = ({ initialData, externalMethods, visible }) => {
  //* --------- 初始值設定 ---------
  const initialValues = useMemo(
    () => ({
      // 基礎欄位
      processCategory: initialData?.processOptionId || "",
      processSN: "",
      activeTab: 0,
      // 動態欄位
      ...initialData,
      ...initialData?.SQMaterialCostSetting,
      ...initialData?.SQInjectionMoldingCosts?.[0],
      // 確保陣列欄位存在
      SQMaterialCosts: initialData?.SQMaterialCosts || [],
      SQPackagingCosts: initialData?.SQPackagingCosts || [],
      SQInPostProcessingCosts: initialData?.SQInPostProcessingCosts || [],
      SQOutPostProcessingCosts: initialData?.SQOutPostProcessingCosts || [],
      SQInjectionMoldingCosts: initialData?.SQInjectionMoldingCosts || [],
    }),
    [initialData]
  );

  //* --------- 表單實例 ---------
  const formInstance = useForm({
    defaultValues: initialValues,
    mode: "onSubmit",
    resolver: async (data) => {
      const category = data.processCategory || initialData?.processCategory;
      if (!category) return { values: data, errors: {} };
      const resolver = getProcessResolver(category);
      return resolver(data);
    },
  });

  const methods = externalMethods || formInstance;
  const { watch, setValue, reset } = methods;
  const processCategory = watch("processCategory");
  const activeTab = watch("activeTab");

  //* --------- 數據獲取與處理 ---------
  const { types, subtypes, loading, isSuccess, error } = useProcessData(
    processCategory || initialData?.processOptionId,
    initialData
  );

  //* --------- 表單配置 ---------
  const currentProcessType = useMemo(() => {
    if (!processCategory || !types || !isSuccess) return null;
    return types.find((type) => type.value === processCategory);
  }, [processCategory, types, isSuccess]);

  const formConfig = useMemo(
    () => FORM_CONFIGURATIONS[currentProcessType?.processCategory] || {},
    [currentProcessType]
  );

  const selectionFields = useMemo(
    () =>
      PROCESS_SELECTION_FORM[0].fields.map((field) => ({
        ...field,
        options:
          field.name === "processSN"
            ? subtypes || []
            : field.name === "processCategory"
            ? types || []
            : field.options,
      })),
    [types, subtypes]
  );

  //* --------- 表單重置處理 ---------
  const handleProcessCategoryChange = useCallback(() => {
    if (!processCategory) return;

    const isInitialCategory = processCategory === initialData?.processOptionId;
    if (!isInitialCategory) {
      const allValues = methods.getValues();
      const resetValues = Object.keys(allValues).reduce(
        (acc, key) => ({
          ...acc,
          [key]: ["processCategory"].includes(key) ? allValues[key] : "",
        }),
        {}
      );

      reset({ ...resetValues, activeTab: 0 });
    } else {
      reset(initialValues);
    }
  }, [processCategory, initialData, methods, reset]);

  useEffect(() => {
    handleProcessCategoryChange();
  }, [handleProcessCategoryChange]);

  //* --------- 子類型初始值處理 ---------
  useEffect(() => {
    const hasSubtypes = Array.isArray(subtypes) && subtypes.length > 0;
    const hasInitialSN = initialData?.processSN;
    const isInitialCategory = processCategory === initialData?.processOptionId;
    const isValidSN = subtypes?.some(
      (opt) => opt.value === initialData?.processSN
    );

    if (hasSubtypes && hasInitialSN && isValidSN && isInitialCategory) {
      setValue("processSN", initialData.processSN);
    }
  }, [subtypes, initialData?.processSN, processCategory, setValue]);

  //* --------- 可見性處理 ---------
  useEffect(() => {
    if (visible) {
      reset(initialValues);
    }
  }, [visible, reset, initialValues]);

  return {
    methods,
    processCategory,
    currentProcessType,
    activeTab: activeTab || 0,
    formConfig,
    selectionFields,
    loading,
    error,
    isSuccess,
    handleTabChange: (_, newValue) => setValue("activeTab", newValue),
  };
};
