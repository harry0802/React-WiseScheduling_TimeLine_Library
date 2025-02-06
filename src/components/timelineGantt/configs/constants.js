// constants.js

// 🧠 基礎配置
export const MACHINE_CONFIG = {
  AREAS: ["A", "B", "C", "D"],
  MACHINES_PER_AREA: 10,
  WORK_START_HOUR: 8,
};

// 💡 狀態定義
export const MACHINE_STATUS = {
  ORDER_CREATED: "製立單",
  IDLE: "待機中",
  SETUP: "上模與調機",
  TESTING: "產品試模",
  STOPPED: "機台停機",
};

// ✨ 狀態配置與轉換規則整合
export const STATUS_CONFIG = {
  [MACHINE_STATUS.ORDER_CREATED]: {
    name: MACHINE_STATUS.ORDER_CREATED,
    description: "新建立的製令單",
    color: "#2196f3",
    className: "status-order",
    canSwitch: false,
    canDelete: false,
    allowedTransitions: [],
  },

  [MACHINE_STATUS.IDLE]: {
    name: MACHINE_STATUS.IDLE,
    description: "機台空閒狀態",
    color: "#9e9e9e",
    className: "status-idle",
    canSwitch: true,
    canDelete: true,
    allowedTransitions: [
      MACHINE_STATUS.SETUP,
      MACHINE_STATUS.TESTING,
      MACHINE_STATUS.STOPPED,
    ],
  },

  [MACHINE_STATUS.SETUP]: {
    name: MACHINE_STATUS.SETUP,
    description: "機台正在進行設定",
    color: "#ff9800",
    className: "status-setup",
    canSwitch: true,
    canDelete: true,
    allowedTransitions: [MACHINE_STATUS.IDLE],
  },

  [MACHINE_STATUS.TESTING]: {
    name: MACHINE_STATUS.TESTING,
    description: "進行產品測試",
    color: "#4caf50",
    className: "status-testing",
    canSwitch: true,
    canDelete: true,
    allowedTransitions: [MACHINE_STATUS.IDLE],
  },

  [MACHINE_STATUS.STOPPED]: {
    name: MACHINE_STATUS.STOPPED,
    description: "機台暫停運作",
    color: "#f44336",
    className: "status-stopped",
    canSwitch: true,
    canDelete: true,
    allowedTransitions: [MACHINE_STATUS.IDLE],
  },
};

// 🧠 狀態操作函數
export const canTransitTo = (currentStatus, targetStatus) => {
  const config = STATUS_CONFIG[currentStatus];

  // 如果狀態不能切換或配置不存在，返回 false
  if (!config || !config.canSwitch) {
    return false;
  }

  return config.allowedTransitions.includes(targetStatus);
};

// ✨ 新增的輔助函數
export const canDeleteStatus = (status) => {
  return STATUS_CONFIG[status]?.canDelete ?? false;
};

export const getStatusName = (status) => {
  return STATUS_CONFIG[status]?.name ?? status;
};

export const getStatusColor = (status) => {
  return STATUS_CONFIG[status]?.color ?? "#000000";
};

export const getStatusClass = (status) => {
  return STATUS_CONFIG[status]?.className ?? "";
};

export const getAvailableTransitions = (status) => {
  return STATUS_CONFIG[status]?.allowedTransitions ?? [];
};
