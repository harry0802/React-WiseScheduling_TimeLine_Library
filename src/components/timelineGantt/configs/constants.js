// constants.js - 配置與常量
export const MACHINE_CONFIG = {
  AREAS: ["A", "B", "C", "D"],
  MACHINES_PER_AREA: 10,
  WORK_START_HOUR: 8,
};

export const MACHINE_STATUS = {
  PRODUCING: "生產中",
  IDLE: "待機中",
  SETUP: "上模與調機",
  TESTING: "產品試模",
  STOPPED: "機台停機",
};
