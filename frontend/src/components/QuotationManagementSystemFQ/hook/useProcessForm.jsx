import { useState, useCallback, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getProcessResolver } from "../utility/formValidationUtils";
import { transformProcessData } from "../utility/processDataTransformer";

export function useProcessForm(initialProcess, onUpdate, onClose) {
  // 1. 狀態管理
  const [process, setProcess] = useState(initialProcess);

  // 2. 表單初始值處理
  const initialValues = useMemo(() => {
    if (!initialProcess) {
      return {
        processCategory: "",
        processSN: "",
        FQMaterialCosts: [],
        FQPackagingCosts: [],
        FQInPostProcessingCosts: [],
        FQOutPostProcessingCosts: [],
        FQInjectionMoldingCosts: [],
      };
    }

    return {
      ...initialProcess,
      ...initialProcess?.FQMaterialCostSetting,
      ...(initialProcess?.FQInjectionMoldingCosts || {}),
      processCategory: initialProcess?.processCategory || "",
      processSN: initialProcess.processSN || "",
      FQMaterialCosts: initialProcess?.FQMaterialCosts || [],
      FQPackagingCosts: initialProcess?.FQPackagingCosts || [],
      FQInPostProcessingCosts: initialProcess?.FQInPostProcessingCosts || [],
      FQOutPostProcessingCosts: initialProcess?.FQOutPostProcessingCosts || [],
      FQInjectionMoldingCosts: initialProcess?.FQInjectionMoldingCosts || [],
    };
  }, [initialProcess]);

  // 3. 表單實例
  const methods = useForm({
    defaultValues: initialValues,
    mode: "onChange",
    resolver: async (data) => {
      const resolver = getProcessResolver(
        data?.processCategory || initialProcess?.processCategory
      );
      return await resolver(data);
    },
  });

  // 添加 useEffect 來監控初始值變化
  useEffect(() => {
    if (initialProcess) {
      methods.reset(initialValues);
    }
  }, [initialProcess, methods.reset]);

  // 4. 表單變更處理
  const handleFormChange = useCallback((data) => {
    setProcess((prev) => {
      return {
        ...prev,
        ...data,
        id: prev?.id,
        factoryQuotationId: prev?.factoryQuotationId,
        processOptionId: prev?.processOptionId,
      };
    });
  }, []);

  // 5. 提交處理
  const handleSubmit = useCallback(
    async (formData) => {
      try {
        // 驗證表單
        const isValid = await methods.trigger();
        if (!isValid) return;

        // 根據製程類型轉換數據
        const transformedFormData = transformProcessData(
          formData.processCategory,
          formData
        );

        // 合併處理數據和轉換後的表單數據
        const submitData = {
          ...process,
          ...transformedFormData,
          // 保留重要ID
          id: process?.id,
          factoryQuotationId: process?.factoryQuotationId,
        };
        onUpdate?.(submitData, onClose);
        return submitData;
      } catch (error) {
        console.error("Submit error:", error);
        throw error;
      }
    },
    [process, methods.trigger, onUpdate]
  );

  // 6. 添加用於調試的方法
  const debugFormState = useCallback(() => {
    return {
      formValues: methods.getValues(),
      formErrors: methods.formState.errors,
      currentProcess: process,
      isDirty: methods.formState.isDirty,
      isSubmitting: methods.formState.isSubmitting,
    };
  }, [methods, process]);

  return {
    process,
    methods,
    handleFormChange,
    handleSubmit: methods.handleSubmit(handleSubmit),
    debugFormState, // 導出調試方法
  };
}
