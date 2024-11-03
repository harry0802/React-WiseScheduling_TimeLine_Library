// src/config/ProcessTableConfig.js
export const PROCESS_TABLE_CONFIG = {
  FACTORY_INTERNAL_SHAPING: {
    title: "工廠內成型製程費用",
    headers: [
      [
        "機台區域",
        "機台編號",
        "工時比例",
        "不良率",
        "淺包工時",
        "成型週期",
        "穴數",
      ],
    ],
    dataKeys: [
      "machineArea",
      "machineId",
      "workHourRatio",
      "defectRate",
      "shallowPackageTime",
      "moldingCycle",
      "holeCount",
    ],
    unitMap: {
      workHourRatio: "%",
      defectRate: "%",
      shallowPackageTime: "秒",
      moldingCycle: "秒",
    },
  },
  FACTORY_INTERNAL_FINISHING: {
    title: "工廠內後製程費用",
    headers: [["工時", "單價", "金額"]],
    dataKeys: ["workHours", "unitPrice", "totalCost"],
    unitMap: { workHours: "秒", unitPrice: "元" },
    calculation: ({ workHours, unitPrice }) => workHours * unitPrice,
  },
  // 更多製程...
};
