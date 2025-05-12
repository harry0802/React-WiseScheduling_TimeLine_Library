/**
 * @file useTimelineData.js
 * @description 處理時間線數據的自定義 Hook
 * @version 2.0.0
 */

import { useRef, useMemo, useEffect } from "react";
import {
  generateMachineGroups,
  transformData,
} from "../../configs/validations/schedule/machineGroups";
import {
  generateInitialOrders,
  transformScheduleData,
} from "../../configs/validations/schedule/orderItems";

/**
 * @function useTimelineData
 * @description 處理時間線數據的自定義 Hook，整合機台數據和排程數據
 * @param {Array} machineList - 機台列表數據
 * @param {Array} scheduleList - 排程數據
 * @returns {Object} 時間線數據和分組
 */
export const useTimelineData = (machineList, scheduleList = null) => {
  // ✨ 使用 ref 保存訂單資料確保響應性
  const itemsDataRef = useRef(null);

  // 💡 轉換機台列表數據
  const convertMachineList = useMemo(() => {
    return transformData(machineList);
  }, [machineList]);

  // 💡 緩存機台組避免重複計算
  const groups = useMemo(() => {
    return generateMachineGroups(convertMachineList);
  }, [convertMachineList]);

  // 🧠 初始化訂單資料
  useEffect(() => {
    if (!itemsDataRef.current) {
      // 如果還沒有初始化，則先使用默認數據
      const initialData = generateInitialOrders();
      itemsDataRef.current = initialData;
    }

    // 如果有排程數據，則更新訂單資料
    if (scheduleList && Array.isArray(scheduleList)) {
      const transformedSchedules = transformScheduleData(scheduleList);

      // 更新現有數據
      if (transformedSchedules.length > 0 && itemsDataRef.current) {
        // 先移除所有現有數據
        const currentIds = itemsDataRef.current.getIds();
        if (currentIds.length > 0) {
          itemsDataRef.current.remove(currentIds);
        }

        // 添加轉換後的排程數據
        itemsDataRef.current.add(transformedSchedules);
      }
    }
  }, [scheduleList, groups]);

  return { itemsDataRef, groups };
};
