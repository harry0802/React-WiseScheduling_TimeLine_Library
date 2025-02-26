// useTimelineData.js
import { useRef, useMemo } from "react";
import { generateMachineGroups } from "../../configs/schedule/machineGroups";
import { generateInitialOrders } from "../../configs/schedule/orderItems";

export const useTimelineData = () => {
  // ✨ 使用 ref 保存訂單資料確保響應性
  const itemsDataRef = useRef(null);

  // 💡 緩存機台組避免重複計算
  const groups = useMemo(generateMachineGroups, []);

  // 🧠 僅首次渲染時初始化訂單資料
  if (!itemsDataRef.current) {
    // ✨ 生成初始訂單資料
    const data = generateInitialOrders();
    itemsDataRef.current = data;
  }

  return { itemsDataRef, groups };
};
