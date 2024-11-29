import { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { getProcessResolver } from "../utility/formValidationUtils";
import { transformProcessData } from "../utility/processDataTransformer";

export function useProcessForm(initialProcess) {
  // 1. 狀態管理
  const [process, setProcess] = useState(initialProcess);

  // 2. 表單初始值處理
  const initialValues = useMemo(() => {
    if (!initialProcess)
      return {
        processCategory: "",
        processSN: "",
      };

    return {
      processCategory: initialProcess.processOptionId || "",
      processSN: "", // 先給空值,等待選項載入
      // 其他初始值
      ...initialProcess?.SQMaterialCostSetting,
    };
  }, [initialProcess]);

  // 3. 表單實例
  const methods = useForm({
    defaultValues: initialValues,
    mode: "onSubmit",
    resolver: async (data) => {
      console.log("🔥🔥🔥🔥 ~ resolver:", data);
      const resolver = getProcessResolver(data.processCategory);
      console.log("🚀 ~ resolver: ~ resolver:", await resolver(data));
      return await resolver(data);
    },
  });

  // 4. 表單變更處理
  const handleFormChange = useCallback((data) => {
    setProcess((prev) => {
      return {
        ...prev,
        ...data,
        id: prev?.id,
        salesQuotationId: prev?.salesQuotationId,
        processOptionId: prev?.processOptionId,
      };
    });
  }, []);

  // 5. 提交處理
  const handleSubmit = useCallback(
    async (formData) => {
      console.log("🔥🔥🔥🔥 ~ Raw formData:", formData);
      try {
        // 驗證表單
        const isValid = await methods.trigger();
        if (!isValid) return;

        // 根據製程類型轉換數據
        const transformedFormData = transformProcessData(
          formData.processCategory,
          formData
        );

        console.log("🔥🔥🔥🔥 ~ Transformed formData:", transformedFormData);

        // 合併處理數據和轉換後的表單數據
        const submitData = {
          ...process,
          ...transformedFormData,
          // 保留重要ID
          id: process?.id,
          salesQuotationId: process?.salesQuotationId,
          processOptionId: process?.processOptionId,
        };

        console.log("🔥🔥🔥🔥 ~ Final submitData:", submitData);

        return submitData;
      } catch (error) {
        console.error("Submit error:", error);
        throw error;
      }
    },
    [process, methods]
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
