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
    console.log('[useTimelineData] 原始機台列表:', machineList);
    const convertedList = machineList ? transformData(machineList) : [];
    console.log('[useTimelineData] 轉換後的機台列表:', convertedList);
    const groups = generateMachineGroups(convertedList);
    console.log('[useTimelineData] 生成的 groups:', groups);
    return groups;
  }, [machineList]);

  // ✨ 使用 ref 保存 DataSet，避免重新渲染
  const itemsDataRef = useRef(null);

  // 🧠 初始化 DataSet（只執行一次）
  if (!itemsDataRef.current) {
    itemsDataRef.current = new DataSet([]);
  }

  // 🧠 當排程數據變化時更新 DataSet
  useEffect(() => {
    console.log('[useTimelineData] 排程列表更新:', scheduleList?.length, '筆');

    if (!scheduleList?.length) {
      // 清空 DataSet
      const currentIds = itemsDataRef.current.getIds();
      if (currentIds.length > 0) {
        itemsDataRef.current.remove(currentIds);
      }
      console.log('[useTimelineData] 無排程數據，已清空');
      return;
    }

    try {
      console.log('[useTimelineData] 開始轉換排程數據...');
      const transformed = transformScheduleData(scheduleList);
      console.log('[useTimelineData] 轉換後的數據:', transformed.length, '筆');
      console.log('[useTimelineData] 第一筆轉換後數據:', transformed[0]);

      // 先清空舊數據
      const currentIds = itemsDataRef.current.getIds();
      if (currentIds.length > 0) {
        itemsDataRef.current.remove(currentIds);
      }

      // 添加新數據
      if (transformed.length > 0) {
        itemsDataRef.current.add(transformed);
        console.log('[useTimelineData] 已添加', transformed.length, '筆數據到 DataSet');
      }
    } catch (error) {
      console.error("[useTimelineData] 轉換排程數據失敗:", error);
      console.error("[useTimelineData] 錯誤堆疊:", error.stack);
    }
  }, [scheduleList]);

  return {
    itemsDataRef,
    groups,
  };
};
