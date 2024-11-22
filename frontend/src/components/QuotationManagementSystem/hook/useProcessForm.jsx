import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { PROCESS_TYPES } from "../config/processTypes";

export function useProcessForm(initialProcess) {
  const [process, setProcess] = useState(initialProcess);

  // 使用可选链和默认值处理
  const initProcessSN = initialProcess?.initialData?.processSN;
  const processOptionId = initialProcess?.initialData?.processOptionId;

  const methods = useForm({
    defaultValues: {
      processCategory: processOptionId || "", // 提供默认空字符串
      processSN: initProcessSN || "",
    },
  });

  const handleFormChange = useCallback((data) => {
    setProcess((prev) => ({ ...prev, ...data }));
  }, []);

  const handleSubmit = useCallback(async (formData) => {
    try {
      console.log("Submitting:", formData);
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
