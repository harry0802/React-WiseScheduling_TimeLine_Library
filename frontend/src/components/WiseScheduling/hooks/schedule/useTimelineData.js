/**
 * @file useTimelineData.js
 * @description 處理時間線數據的自定義 Hook
 * @version 3.1.0 - 使用 ref 避免重新渲染，直接使用真實 API 資料
 */

import { useRef, useMemo, useEffect } from "react";
import { DataSet } from "vis-data";
import {
  generateMachineGroups,
  transformData,
} from "../../configs/validations/schedule/machineGroups";
import { transformScheduleData } from "../../configs/validations/schedule/orderItems";

/**
 * @function useTimelineData
 * @description 處理時間線數據的自定義 Hook，整合機台數據和排程數據
 * @param {Array} machineList - 機台列表數據
 * @param {Array} scheduleList - 排程數據
 * @returns {Object} 時間線數據和分組
 */
export const useTimelineData = (machineList, scheduleList = null) => {
  // 💡 轉換機台列表數據並生成分組
  const groups = useMemo(() => {
    const convertedList = machineList ? transformData(machineList) : [];
    return generateMachineGroups(convertedList);
  }, [machineList]);

  // ✨ 使用 ref 保存 DataSet，避免重新渲染
  const itemsDataRef = useRef(null);

  // 🧠 初始化 DataSet（只執行一次）
  if (!itemsDataRef.current) {
    itemsDataRef.current = new DataSet([]);
  }

  // 🧠 當排程數據變化時更新 DataSet
  useEffect(() => {
    if (!scheduleList?.length) {
      // 清空 DataSet
      const currentIds = itemsDataRef.current.getIds();
      if (currentIds.length > 0) {
        itemsDataRef.current.remove(currentIds);
      }
      return;
    }

    try {
      const transformed = transformScheduleData(scheduleList);

      // 先清空舊數據
      const currentIds = itemsDataRef.current.getIds();
      if (currentIds.length > 0) {
        itemsDataRef.current.remove(currentIds);
      }

      // 添加新數據
      if (transformed.length > 0) {
        itemsDataRef.current.add(transformed);
      }
    } catch (error) {
      console.error("轉換排程數據失敗:", error);
    }
  }, [scheduleList]);

  return {
    itemsDataRef,
    groups,
  };
};
