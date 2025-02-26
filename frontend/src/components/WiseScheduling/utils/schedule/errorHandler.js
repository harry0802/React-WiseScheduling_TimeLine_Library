// utils/errorHandler.js
export const handleFormError = (error) => {
  // Zod 驗證錯誤
  if (error.name === "ZodError") {
    return error.errors[0]?.message || "表單驗證錯誤";
  }

  // 狀態切換錯誤
  if (error.name === "StatusError") {
    return error.message;
  }

  // 其他錯誤
  return "操作失敗，請稍後再試";
};

// 自定義狀態錯誤
export class StatusError extends Error {
  constructor(message) {
    super(message);
    this.name = "StatusError";
  }
}
