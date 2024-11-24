import { useForm } from "react-hook-form";
import {
  FORM_CONFIGURATIONS,
  PROCESS_SELECTION_FORM,
} from "../../../config/processTypes_v1";
import React, { useEffect, useMemo } from "react";
import { useProcessData } from "./useProcessData";

export const useProcessForm = ({ initialData, externalMethods, visible }) => {
  // 設定表單初始值
  const initialValues = useMemo(() => {
    if (!initialData)
      return {
        processCategory: "",
        processSN: "",
      };

    return {
      ...initialData,
      ...initialData?.SQMaterialCostSetting, // 其他初始值
      ...initialData?.SQInjectionMoldingCosts?.[0],
      processCategory: initialData.processOptionId || "",
      processSN: "", // 等待選項載入
    };
  }, [initialData]);

  // 初始化 useForm 方法
  const methods =
    externalMethods ||
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useForm({
      defaultValues: {
        processCategory: initialData?.processCategory || "",
        processSN: "", // 初始為空，等待驗證
        activeTab: 0,
      },
    });

  const { watch, setValue, reset } = methods;
  const processCategory = watch("processCategory");
  const activeTab = watch("activeTab");

  // 獲取製程相關數據
  const { types, subtypes, loading, error } = useProcessData(
    processCategory || initialData?.processOptionId,
    initialData
  );

  // 動態生成表單配置
  const currentProcessType = useMemo(() => {
    if (!processCategory || !types) return null;
    return types.find((type) => type.value === processCategory);
  }, [processCategory, types]);

  const formConfig = useMemo(
    () => FORM_CONFIGURATIONS[currentProcessType?.processCategory] || {},
    [currentProcessType]
  );

  const selectionFields = useMemo(() => {
    return PROCESS_SELECTION_FORM[0].fields.map((field) => ({
      ...field,
      options:
        field.name === "processSN"
          ? subtypes || []
          : field.name === "processCategory"
          ? types || []
          : field.options,
    }));
  }, [types, subtypes]);

  // 表單值清空與重置
  useEffect(() => {
    if (!processCategory || !initialData) return;

    const isInitialCategory = processCategory === initialData?.processOptionId;

    if (!isInitialCategory) {
      const allValues = methods.getValues();
      const resetValues = Object.keys(allValues).reduce((acc, key) => {
        acc[key] = ["processCategory"].includes(key) ? allValues[key] : ""; // 清空其他字段

        return acc;
      }, {});

      reset({ ...resetValues, activeTab: 0 });
    }
    if (isInitialCategory) {
      reset(initialValues);
    }
  }, [processCategory, initialData, methods, reset]);

  // 子類型初始值設定
  useEffect(() => {
    const hasSubtypes = Array.isArray(subtypes) && subtypes.length > 0;
    const hasInitialSN = initialData?.processSN;
    const isInitialCategory = processCategory === initialData?.processOptionId;

    if (!hasSubtypes || !hasInitialSN) return;

    const isValidSN = subtypes.some(
      (opt) => opt.value === initialData?.processSN
    );
    if (isValidSN && isInitialCategory) {
      setValue("processSN", initialData?.processSN);
    }
  }, [subtypes, initialData?.processSN, setValue]);

  // 表單顯示時重置初始值
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
    handleTabChange: (_, newValue) => setValue("activeTab", newValue),
  };
};
