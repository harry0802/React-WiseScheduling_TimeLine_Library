import { useForm } from "react-hook-form";
import {
  FORM_CONFIGURATIONS,
  PROCESS_SELECTION_FORM,
  PROCESS_SUBTYPES,
} from "../../../config/processTypes_v1";
import React from "react";

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
  /**
   * 初始化表單方法
   * 優先使用外部傳入的方法，否則創建新的表單實例
   */
  const methods =
    externalMethods ||
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useForm({
      defaultValues: initialData || { processCategory: "", processSN: "" },
    });

  // 解構常用的表單方法
  const { watch, setValue, reset } = methods;

  /**
   * 監聽關鍵表單值
   * processCategory: 製程類別
   * activeTab: 當前激活的頁籤
   */
  const processCategory = watch("processCategory");
  const activeTab = watch("activeTab") || 0;

  /**
   * 根據當前製程類別獲取表單配置
   * @type {Object}
   */
  const formConfig = React.useMemo(
    () => FORM_CONFIGURATIONS[processCategory] || {},
    [processCategory]
  );

  /**
   * 根據製程類別獲取對應的子類型選項
   * @type {Array}
   */
  const processSubtypeOptions = React.useMemo(
    () => PROCESS_SUBTYPES[processCategory] || [],
    [processCategory]
  );

  /**
   * 構建選擇欄位配置
   * 動態更新製程子類型(processSN)的選項
   * @type {Array}
   */
  const selectionFields = React.useMemo(() => {
    return PROCESS_SELECTION_FORM[0].fields.map((field) => ({
      ...field,
      options:
        field.name === "processSN" ? processSubtypeOptions : field.options,
    }));
  }, [processSubtypeOptions]);

  /**
   * 處理製程類型變更
   * 1. 如果選擇的類型與初始數據相同，恢復初始數據
   * 2. 如果選擇新類型，重置表單至初始狀態
   */
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
    methods, // 表單方法集合
    processCategory, // 當前製程類別
    activeTab, // 當前激活頁籤
    formConfig, // 表單配置
    selectionFields, // 選擇欄位配置
    handleTabChange: (_, newValue) => setValue("activeTab", newValue), // 頁籤切換處理器
  };
};
