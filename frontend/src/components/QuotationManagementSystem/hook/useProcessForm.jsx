import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";

export function useProcessForm(initialProcess) {
  const [process, setProcess] = useState(initialProcess);
  const methods = useForm({
    defaultValues: initialProcess,
  });

  const handleFormChange = useCallback((data) => {
    console.log("🚀 ~ handleFormChange ~ data:", data);
    setProcess((prev) => ({ ...prev, ...data }));
  }, []);

  const handleSubmit = useCallback(async (formData) => {
    try {
      // 實現提交邏輯
      console.log("Submitting:", formData);

      // 這裡可以加入 API 調用
      return formData;
    } catch (error) {
      console.error("Submit error:", error);
      throw error;
    }
  }, []);

  return {
    process,
    methods,
    handleFormChange,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
}
