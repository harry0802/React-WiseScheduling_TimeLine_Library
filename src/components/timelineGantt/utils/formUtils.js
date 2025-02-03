// utils/formUtils.js

import dayjs from "dayjs";
import { FORM_CONFIG } from "../configs/formConfig";

// 💡 將表單邏輯抽離出來
export const formUtils = {
  // 初始化表單數據
  initializeFormData(item) {
    if (!item) return FORM_CONFIG.defaultValues;

    return {
      content: item.content,
      start: dayjs(item.start).format("YYYY-MM-DD HH:mm"),
      end: dayjs(item.end).format("YYYY-MM-DD HH:mm"),
      group: item.group,
    };
  },

  // 創建更新後的數據
  createUpdatedItem(formData, originalItem) {
    return {
      ...originalItem,
      ...formData,
      start: dayjs(formData.start).toDate(),
      end: dayjs(formData.end).toDate(),
      className: originalItem.className || "custom-item",
    };
  },

  // ✨ 計算結束時間
  calculateEndTime(startTime) {
    return dayjs(startTime).add(1, "hour").format("YYYY-MM-DDTHH:mm");
  },
};
