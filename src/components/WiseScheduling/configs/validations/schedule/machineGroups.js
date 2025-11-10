// machineGroups.js
import { DataSet } from "vis-data";
import { MACHINE_CONFIG } from "./constants";

// 🧠 生成單個機台資料
const createMachine = (area, number) => ({
  id: `${area}${number}`,
  content: `${area}${number}`,
  area,
});

// ✨ 生成指定區域的所有機台
export const createAreaMachines = (area) => {
  return Array.from({ length: MACHINE_CONFIG.MACHINES_PER_AREA }, (_, i) =>
    createMachine(area, i + 1)
  );
};

/**
 * @function transformData
 * @description 將機器資料陣列從原始格式轉換為目標格式
 * @param {Array<Object>} dataArray - 原始資料物件陣列
 * @returns {Array<Object>} - 轉換後的資料格式陣列
 */
export function transformData(dataArray) {
  // 🧠 確保輸入是陣列
  if (!Array.isArray(dataArray)) return;

  // ✨ 使用 map 方法轉換每個物件
  return dataArray.map((item) => {
    // 解構原始資料
    const { id, productionArea, machineSN } = item;

    // 返回新格式
    return {
      id: machineSN,
      content: machineSN, // 將機器序號作為內容
      area: productionArea, // 將生產區域代碼作為區域
      originalId: id, // 保留原始 ID 為參考
    };
  });
}

// 💡 統一生成所有區域機台
export const generateMachineGroups = (group) => {
  if (!group) return;

  return new DataSet(group);
};
// export const generateMachineGroups = () => {
//   const machines = MACHINE_CONFIG.AREAS.flatMap(createAreaMachines);
//   return new DataSet(machines);
// };
