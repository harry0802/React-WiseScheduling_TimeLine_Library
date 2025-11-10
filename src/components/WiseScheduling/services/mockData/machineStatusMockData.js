/**
 * @file machineStatusMockData.js
 * @description WiseScheduling 機台狀態假資料
 * @version 1.0.0
 */

import { MACHINE_STATUS } from "../../configs/constants/fieldNames";

/**
 * 生成隨機日期
 * @param {number} daysOffset - 距離今天的天數偏移（負數為過去，正數為未來）
 * @returns {string} ISO 8601 格式的日期字串
 */
const generateDate = (daysOffset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString();
};

/**
 * 隨機選擇陣列中的元素
 * @param {Array} arr - 陣列
 * @returns {*} 隨機選中的元素
 */
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * 生成隨機機台狀態
 * @returns {string} 機台狀態代碼
 */
const randomStatus = () => {
  const statuses = [
    MACHINE_STATUS.RUN,
    MACHINE_STATUS.IDLE,
    MACHINE_STATUS.TUNING,
    MACHINE_STATUS.TESTING,
    MACHINE_STATUS.OFFLINE,
  ];
  return randomChoice(statuses);
};

/**
 * 產品名稱範例
 */
const SAMPLE_PRODUCTS = [
  "塑膠杯蓋-A型",
  "汽車零件-B123",
  "電子外殼-C456",
  "玩具配件-D789",
  "容器本體-E001",
  "包裝盒-F002",
  "面板框架-G003",
  "手機外殼-H004",
  "工具握把-I005",
  null, // 有些機台可能沒有在生產
];

/**
 * 停機原因範例
 */
const SAMPLE_REASONS = [
  "定期保養",
  "模具更換",
  "設備故障",
  "材料短缺",
  "品質調整",
  "計劃性停機",
  null, // 正常運行無原因
];

/**
 * 生成單一機台狀態資料
 * @param {string} machineSN - 機台編號（如 "A1", "B2"）
 * @param {string} productionArea - 生產區域（A, B, C, D）
 * @param {string} singleOrDoubleColor - 機台類型（單色/雙色）
 * @returns {Object} 機台狀態資料
 */
export const generateMachineStatus = (
  machineSN,
  productionArea,
  singleOrDoubleColor = "單"
) => {
  const status = randomStatus();
  const isRunning = status === MACHINE_STATUS.RUN;
  const isOffline = status === MACHINE_STATUS.OFFLINE;

  // 生成機台 ID（使用 machineSN 的數字部分）
  const machineNumber = machineSN.replace(/[A-Z]/g, "");
  const areaCode = productionArea.charCodeAt(0) - 64; // A=1, B=2, C=3, D=4
  const machineId = areaCode * 100 + parseInt(machineNumber);

  return {
    machine: {
      id: machineId,
      machineSN,
      productionArea,
      singleOrDoubleColor,
    },
    machineStatusId: machineId * 10 + Math.floor(Math.random() * 1000),
    machineId,
    status,
    planStartDate: generateDate(-2),
    planEndDate: generateDate(3),
    actualStartDate: generateDate(-1),
    actualEndDate: isRunning ? null : generateDate(0),
    machineStatusProduct: isRunning || status === MACHINE_STATUS.TUNING
      ? randomChoice(SAMPLE_PRODUCTS.filter(p => p !== null))
      : null,
    machineStatusReason: isOffline || status === MACHINE_STATUS.TUNING
      ? randomChoice(SAMPLE_REASONS.filter(r => r !== null))
      : null,
  };
};

/**
 * 生成整個生產區域的機台狀態資料
 * @param {string} area - 生產區域（A, B, C, D）
 * @returns {Array} 機台狀態資料陣列
 */
export const generateAreaMachineStatus = (area) => {
  const machineConfigs = {
    A: [
      { sn: "A1", color: "雙" },
      { sn: "A2", color: "單" },
      { sn: "A3", color: "單" },
      { sn: "A4", color: "單" },
      { sn: "A5", color: "單" },
      { sn: "A6", color: "單" },
      { sn: "A7", color: "單" },
      { sn: "A8", color: "單" },
      { sn: "A9", color: "單" },
      { sn: "A10", color: "單" },
    ],
    B: [
      { sn: "B1", color: "單" },
      { sn: "B2", color: "雙" },
      { sn: "B3", color: "雙" },
      { sn: "B4", color: "雙" },
      { sn: "B5", color: "雙" },
      { sn: "B6", color: "雙" },
      { sn: "B7", color: "雙" },
      { sn: "B8", color: "雙" },
      { sn: "B9", color: "雙" },
      { sn: "B10", color: "雙" },
      { sn: "B11", color: "單" },
    ],
    C: [
      { sn: "C1", color: "雙" },
      { sn: "C2", color: "單" },
      { sn: "C3", color: "單" },
      { sn: "C4", color: "單" },
      { sn: "C5", color: "單" },
      { sn: "C6", color: "單" },
      { sn: "C7", color: "單" },
      { sn: "C8", color: "單" },
      { sn: "C9", color: "單" },
    ],
    D: [
      { sn: "D1", color: "單" },
      { sn: "D2", color: "單" },
      { sn: "D3", color: "單" },
      { sn: "D4", color: "單" },
      { sn: "D5", color: "單" },
      { sn: "D6", color: "單" },
      { sn: "D7", color: "單" },
      { sn: "D8", color: "單" },
      { sn: "D9", color: "單" },
    ],
  };

  const machines = machineConfigs[area] || [];
  return machines.map((machine) =>
    generateMachineStatus(machine.sn, area, machine.color)
  );
};

/**
 * 生成所有區域的機台狀態資料
 * @returns {Object} 按區域分組的機台狀態資料
 */
export const generateAllMachineStatus = () => {
  return {
    A: generateAreaMachineStatus("A"),
    B: generateAreaMachineStatus("B"),
    C: generateAreaMachineStatus("C"),
    D: generateAreaMachineStatus("D"),
  };
};

/**
 * 預設匯出：所有區域的假資料
 */
export default generateAllMachineStatus();
