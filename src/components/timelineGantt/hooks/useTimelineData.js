// useTimelineData.js
import { useRef, useMemo } from "react";
import { generateMachineGroups } from "../configs/machineGroups";
import { generateInitialOrders } from "../configs/orderItems";

export const useTimelineData = () => {
  // ✨ 使用 ref 保存訂單資料確保響應性
  const itemsDataRef = useRef(null);

  // 💡 緩存機台組避免重複計算
  const groups = useMemo(generateMachineGroups, []);

  // 🧠 僅首次渲染時初始化訂單資料
  if (!itemsDataRef.current) {
    itemsDataRef.current = generateInitialOrders();
  }

  return { itemsDataRef, groups };
};
