import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";

export function useProcessForm(initialProcess) {
  const [process, setProcess] = useState(initialProcess);
  const methods = useForm({
    defaultValues: initialProcess,
  });

  const handleFormChange = useCallback((data) => {
    setProcess((prev) => ({ ...prev, ...data }));
  }, []);

  const handleSubmit = useCallback(async (data) => {
    // 實現提交邏輯
    console.log("Submitting:", data);
  }, []);

  return {
    process,
    methods,
    handleFormChange,
    handleSubmit,
  };
}
