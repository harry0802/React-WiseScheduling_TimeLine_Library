/**
 * @file useTimelineData.js
 * @description 處理時間線數據的自定義 Hook
 * @version 2.1.0
 */

import { useRef, useMemo, useEffect, useState } from "react";
import {
  generateMachineGroups,
  transformData,
} from "../../configs/validations/schedule/machineGroups";
import {
  generateInitialOrders,
  transformScheduleData,
} from "../../configs/validations/schedule/orderItems";
import { DataSet } from "vis-data";
// export const useTimelineData = (machineList, scheduleList = null) => {
//   // 💡 機台組生成
//   const groups = useMemo(() => {
//     const convertedList = machineList ? transformData(machineList) : [];
//     return generateMachineGroups(convertedList);
//   }, [machineList]);

//   // ✨ DataSet 狀態管理
//   const [dataSet] = useState(() => generateInitialOrders());

//   // 🧠 處理排程數據更新
//   useEffect(() => {
//     if (!scheduleList?.length) return;

//     try {
//       const transformed = transformScheduleData(scheduleList);
//       if (transformed.length) {
//         dataSet.remove(dataSet.getIds());
//         dataSet.add(transformed);
//       }
//     } catch (error) {
//       console.error("排程數據更新失敗:", error);
//     }
//   }, [scheduleList, dataSet]);

//   return {
//     itemsDataRef: { current: dataSet },
//     groups,
//   };
// };
export const useTimelineData = (machineList, scheduleList = null) => {
  const groups = useMemo(() => {
    const convertedList = machineList ? transformData(machineList) : [];
    return generateMachineGroups(convertedList);
  }, [machineList]);

  const itemsData = useMemo(() => {
    const transformed = scheduleList?.length
      ? transformScheduleData(scheduleList)
      : [];
    return new DataSet(transformed);
  }, [scheduleList]);

  return {
    itemsDataRef: { current: itemsData },
    groups,
  };
};
