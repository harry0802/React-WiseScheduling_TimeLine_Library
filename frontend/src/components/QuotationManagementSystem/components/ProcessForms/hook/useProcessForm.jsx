import { useForm } from "react-hook-form";
import {
  FORM_CONFIGURATIONS,
  PROCESS_SELECTION_FORM,
} from "../../../config/processTypes_v1";
import React from "react";
import { useProcessData } from "./useProcessData";

/**
 * 製程表單 Hook
 * 處理製程相關表單的狀態管理和邏輯
 *
 * @param {Object} params - Hook參數
 * @param {Object} params.initialData - 初始表單數據
 * @param {Object} params.externalMethods - 外部表單方法(選用)
 * @returns {Object} 表單相關的狀態和方法
 */
export const useProcessForm = ({ initialData, externalMethods }) => {
  const { types, subtypes, loading, error } = useProcessData();

  const methods =
    externalMethods ||
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useForm({
      defaultValues: initialData || { processCategory: "", processSN: "" },
    });

  const { watch, setValue, reset } = methods;
  const processCategory = watch("processCategory");
  const activeTab = watch("activeTab") || 0;

  const formConfig = React.useMemo(
    () => FORM_CONFIGURATIONS[processCategory] || {},
    [processCategory]
  );

  const selectionFields = React.useMemo(() => {
    return PROCESS_SELECTION_FORM[0].fields.map((field) => ({
      ...field,
      options:
        field.name === "processSN"
          ? subtypes
          : field.name === "processCategory"
          ? types
          : field.options,
    }));
  }, [types, subtypes]);

  React.useEffect(() => {
    if (!processCategory) return;

    if (processCategory === initialData?.processCategory) {
      reset(initialData);
    } else {
      reset({
        processCategory,
        processSN: "",
        activeTab: 0,
      });
    }
  }, [processCategory, initialData, reset]);

  return {
    methods,
    processCategory,
    activeTab,
    formConfig,
    selectionFields,
    loading,
    error,
    handleTabChange: (_, newValue) => setValue("activeTab", newValue),
  };
};
