// useTimelineData.js
import { useRef, useMemo } from "react";
import {
  generateMachineGroups,
  transformData,
} from "../../configs/validations/schedule/machineGroups";
import { generateInitialOrders } from "../../configs/validations/schedule/orderItems";

export const useTimelineData = (machineList) => {
  // ✨ 使用 ref 保存訂單資料確保響應性
  const itemsDataRef = useRef(null);
  const convertMachineList = transformData(machineList);
  console.log("🚀 ~ useTimelineData ~ convertMachineList:", convertMachineList);
  // 💡 緩存機台組避免重複計算
  // 正確的用法
  const groups = useMemo(
    () => generateMachineGroups(convertMachineList),
    [convertMachineList]
  );
  // 🧠 僅首次渲染時初始化訂單資料
  // if (!itemsDataRef.current) {
  // ✨ 生成初始訂單資料
  const data = generateInitialOrders();
  console.log("🚀 ~ useTimelineData ~ data:", data);
  itemsDataRef.current = data;

  return { itemsDataRef, groups };
};
