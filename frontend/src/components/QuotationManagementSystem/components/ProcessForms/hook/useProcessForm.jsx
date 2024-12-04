//! =============== 1. 設定與常量 ===============
//* 引入必要的依賴
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  FORM_CONFIGURATIONS,
  PROCESS_SELECTION_FORM,
} from "../../../config/processTypes_v1";
import { useProcessData } from "./useProcessData";
import { getProcessResolver } from "../../../utility/formValidationUtils";

//* 常量定義
const PRESERVED_FIELDS = ["processCategory"];
const DEFAULT_ACTIVE_TAB = 0;

//! =============== 2. 類型與介面 ===============
/**
 * @typedef {Object} ProcessFormProps
 * @property {Object} initialData - 初始表單數據
 * @property {Object} externalMethods - 外部傳入的表單方法
 * @property {boolean} visible - 表單可見性控制
 */

/**
 * @typedef {Object} ProcessFormReturn
 * @property {Object} methods - 表單方法集合
 * @property {string} processCategory - 當前製程類別
 * @property {Object} currentProcessType - 當前製程類型詳情
 * @property {number} activeTab - 當前活動頁籤
 * @property {Object} formConfig - 表單配置
 * @property {Array} selectionFields - 選擇欄位配置
 * @property {boolean} loading - 載入狀態
 * @property {Object} error - 錯誤信息
 * @property {boolean} isSuccess - 成功狀態
 * @property {Function} handleTabChange - 頁籤切換處理函數
 */

//! =============== 3. 核心功能 ===============
/**
 * @function useProcessForm
 * @description 處理製程表單的自定義 Hook，統一管理表單狀態與邏輯
 * @param {ProcessFormProps} props - Hook 參數
 * @returns {ProcessFormReturn} 表單相關方法和狀態
 *
 * @example
 * const { methods, processCategory, loading } = useProcessForm({
 *   initialData: data,
 *   visible: true
 * });
 *
 * @notes
 * - initialData 需要包含完整的表單數據結構
 * - 切換 processCategory 時會重置大部分欄位
 * - 表單驗證使用動態 resolver
 *
 * @commonErrors
 * - 初始數據結構不完整導致表單異常
 * - processCategory 切換時未正確重置相關欄位
 */
export const useProcessForm = ({ initialData, externalMethods, visible }) => {
  //* ========= 初始值設定 =========
  const initialValues = useMemo(
    () => ({
      ...initialData,
      ...initialData?.SQMaterialCostSetting,
      ...initialData?.SQInjectionMoldingCosts?.[0],
      processCategory: initialData?.processCategory || "",
      processSN: initialData?.processSN || "",
      activeTab: DEFAULT_ACTIVE_TAB,
      SQMaterialCosts: initialData?.SQMaterialCosts || [],
      SQPackagingCosts: initialData?.SQPackagingCosts || [],
      SQInPostProcessingCosts: initialData?.SQInPostProcessingCosts || [],
      SQOutPostProcessingCosts: initialData?.SQOutPostProcessingCosts || [],
      SQInjectionMoldingCosts: initialData?.SQInjectionMoldingCosts || [],
    }),
    [initialData]
  );

  //* ========= 表單實例創建 =========
  const formInstance = useForm({
    defaultValues: initialValues,
    mode: "onSubmit",
    resolver: async (data) => {
      const category = data?.processCategory || initialData?.processCategory;
      if (!category) return { values: data, errors: {} };
      const resolver = getProcessResolver(category);
      return resolver(data);
    },
  });
  const methods = externalMethods || formInstance;
  const { watch, setValue, reset } = methods;
  const processCategory = watch("processCategory");
  const activeTab = watch("activeTab");

  //* ========= 數據處理邏輯 =========
  const { types, subtypes, loading, isSuccess, error } = useProcessData(
    processCategory || initialData?.processOptionId,
    initialData
  );

  //* ========= 表單配置處理 =========
  const currentProcessType = useMemo(() => {
    if (!processCategory || !types) return null;
    return types.find((type) => type.value === processCategory);
  }, [processCategory, types, initialData?.processOptionId]);

  const formConfig = useMemo(
    () => FORM_CONFIGURATIONS[currentProcessType?.processCategory] || {},
    [currentProcessType]
  );
  const selectionFields = useMemo(
    () =>
      PROCESS_SELECTION_FORM[0].fields.map((field) => ({
        ...field,
        options: getFieldOptions(field.name, { types, subtypes }),
      })),
    [types, subtypes]
  );

  //* ========= 表單重置邏輯 =========
  const handleProcessCategoryChange = useCallback(() => {
    if (!processCategory) return;

    const isInitialCategory = processCategory === initialData?.processCategory;
    if (!isInitialCategory) {
      const allValues = methods.getValues();
      const resetValues = createResetValues(allValues, PRESERVED_FIELDS);
      reset({ ...resetValues, activeTab: DEFAULT_ACTIVE_TAB });
    } else {
      reset(initialValues);
    }
  }, [processCategory, initialData?.processOptionId, methods.getValues, reset]);

  //* ========= 生命週期處理 =========
  useEffect(() => {
    handleProcessCategoryChange();
  }, [handleProcessCategoryChange]);

  useEffect(() => {
    handleSubtypeInitialization({
      subtypes,
      initialData,
      processCategory,
      setValue,
    });
  }, [subtypes, processCategory, setValue]);

  useEffect(() => {
    if (visible) {
      reset(initialValues);
    }
  }, [visible, reset, initialValues]);

  return {
    methods,
    processCategory,
    currentProcessType,
    activeTab: activeTab || DEFAULT_ACTIVE_TAB,
    formConfig,
    selectionFields,
    loading,
    error,
    isSuccess,
    handleTabChange: (_, newValue) => setValue("activeTab", newValue),
  };
};

//! =============== 4. 工具函數 ===============
/**
 * @function getFieldOptions
 * @description 根據欄位名稱獲取對應的選項列表
 */
const getFieldOptions = (fieldName, { types, subtypes }) => {
  switch (fieldName) {
    case "processSN":
      return subtypes || [];
    case "processCategory":
      return types || [];
    default:
      return [];
  }
};

/**
 * @function createResetValues
 * @description 創建重置後的表單值，保留指定欄位的值
 */
const createResetValues = (allValues, preservedFields) =>
  Object.keys(allValues).reduce(
    (acc, key) => ({
      ...acc,
      [key]: preservedFields.includes(key) ? allValues[key] : "",
    }),
    {}
  );

/**
 * @function handleSubtypeInitialization
 * @description 處理子類型的初始值設定
 */
const handleSubtypeInitialization = ({
  subtypes,
  initialData,
  processCategory,
  setValue,
}) => {
  const hasSubtypes = Array.isArray(subtypes) && subtypes.length > 0;
  const hasInitialSN = initialData?.processSN;

  const isInitialCategory = processCategory === initialData?.processCategory;
  const isValidSN = subtypes?.some(
    (opt) => opt.processSN === initialData?.processSN
  );
  if (hasSubtypes && hasInitialSN && isValidSN && isInitialCategory) {
    setValue("processSN", initialData.processSN);
  }
};
