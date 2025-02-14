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

// 💡 統一生成所有區域機台
export const generateMachineGroups = () => {
  const machines = MACHINE_CONFIG.AREAS.flatMap(createAreaMachines);
  return new DataSet(machines);
};
