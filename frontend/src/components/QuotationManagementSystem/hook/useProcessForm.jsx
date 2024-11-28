import { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { getProcessResolver } from "../utility/formValidationUtils";

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
      // 使用當前表單數據中的 processCategory
      const resolver = getProcessResolver(data.processCategory);
      return resolver(data);
    },
  });

  // 4. 表單變更處理
  const handleFormChange = useCallback((data) => {
    setProcess((prev) => {
      // 確保不會覆蓋已有資料
      return {
        ...prev,
        ...data,
        // 保留 ID 相關欄位
        id: prev?.id,
        salesQuotationId: prev?.salesQuotationId,
        processOptionId: prev?.processOptionId,
      };
    });
  }, []);

  // 5. 提交處理
  const handleSubmit = useCallback(
    async (formData) => {
      console.log("🔥🔥🔥🔥 ~ formData:", formData);
      try {
        // 組合最終提交資料
        const submitData = {
          ...process,
          ...formData,
        };
        // 可以在這裡加入驗證邏輯
        const isValid = await methods.trigger();
        if (!isValid) return;

        return submitData;
      } catch (error) {
        console.error("Submit error:", error);
        throw error;
      }
    },
    [process, methods]
  );

  return {
    process,
    methods,
    handleFormChange,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
}
