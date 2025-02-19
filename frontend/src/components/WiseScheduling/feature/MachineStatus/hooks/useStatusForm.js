import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { statusSchema } from "../schemas/status.schema";

// 🧠 狀態表單 Hook
export const useStatusForm = (initialData) => {
  console.log("🚀 ~ useStatusForm ~ initialData:", initialData);
  const form = useForm({
    resolver: zodResolver(statusSchema),
    defaultValues: initialData,
  });

  // ⚠️ 驗證狀態
  const validateStatus = (data) => {
    if (data.timeLineStatus === "機台停機" && !data.status.reason) {
      return "停機狀態必須填寫原因";
    }
    return true;
  };

  return {
    form,
    validateStatus,
  };
};
