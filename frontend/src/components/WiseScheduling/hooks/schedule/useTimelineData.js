/**
 * @file useTimelineData.js
 * @description 處理時間線數據的自定義 Hook
 * @version 2.1.0
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

  // 🧠 追蹤上次處理的 scheduleList，用於比較是否需要更新
  const lastScheduleListRef = useRef(null);

  // 💡 轉換機台列表數據
  const convertMachineList = useMemo(() => {
    return machineList ? transformData(machineList) : [];
  }, [machineList]);

  // 💡 緩存機台組避免重複計算
  const groups = useMemo(() => {
    return generateMachineGroups(convertMachineList);
  }, [convertMachineList]);

  // 🧠 初始化訂單資料 - 只在 itemsDataRef 未初始化時執行
  useEffect(() => {
    try {
      if (!itemsDataRef.current) {
        // 如果還沒有初始化，則先使用默認數據
        const initialData = generateInitialOrders();
        itemsDataRef.current = initialData;
      }
    } catch (error) {
      console.error("初始化訂單資料失敗:", error);
    }
  }, []);

  // 🧠 更新排程數據 - 只依賴 scheduleList
  useEffect(() => {
    try {
      // 如果沒有初始化過資料，則不執行更新
      if (!itemsDataRef.current) return;

      // 如果排程數據為空，不執行更新
      if (
        !scheduleList ||
        !Array.isArray(scheduleList) ||
        scheduleList.length === 0
      )
        return;

      // 檢查是否與上次處理的資料相同 (淺比較)
      if (lastScheduleListRef.current === scheduleList) return;

      // 更新參考，記錄這次處理的資料
      lastScheduleListRef.current = scheduleList;

      // 轉換排程數據
      const transformedSchedules = transformScheduleData(scheduleList);

      // 如果沒有資料需要更新，直接返回
      if (!transformedSchedules.length) return;

      // 更新策略：先移除舊資料，再添加新資料
      try {
        // 先移除所有現有數據
        const currentIds = itemsDataRef.current.getIds();
        if (currentIds.length > 0) {
          itemsDataRef.current.remove(currentIds);
        }

        // 添加轉換後的排程數據
        itemsDataRef.current.add(transformedSchedules);
      } catch (error) {
        console.error("更新時間線資料失敗:", error);

        // 如果更新失敗，嘗試重新初始化
        try {
          const initialData = generateInitialOrders();
          itemsDataRef.current = initialData;
          itemsDataRef.current.add(transformedSchedules);
        } catch (reinitError) {
          console.error("重新初始化時間線資料失敗:", reinitError);
        }
      }
    } catch (error) {
      console.error("處理排程數據時發生錯誤:", error);
    }
  }, [scheduleList]); // 只依賴 scheduleList

  return { itemsDataRef, groups };
};
