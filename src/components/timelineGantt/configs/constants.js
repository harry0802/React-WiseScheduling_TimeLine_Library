// constants.js - 配置與常量
export const MACHINE_CONFIG = {
  AREAS: ["A", "B", "C", "D"],
  MACHINES_PER_AREA: 10,
  WORK_START_HOUR: 8,
};

export const MACHINE_STATUS = {
  ORDER_CREATED: "製立單",
  IDLE: "待機中",
  SETUP: "上模與調機",
  TESTING: "產品試模",
  STOPPED: "機台停機",
};

// 💡 每個狀態的基本配置
export const STATUS_CONFIG = {
  [MACHINE_STATUS.ORDER_CREATED]: {
    name: MACHINE_STATUS.ORDER_CREATED,
    description: "新建立的製令單",
    canSwitch: true,
    color: "#2196f3", // 藍色
    className: "status-order",
  },

  [MACHINE_STATUS.IDLE]: {
    name: MACHINE_STATUS.IDLE,
    description: "機台空閒狀態",
    canSwitch: true,
    color: "#9e9e9e", // 灰色
    className: "status-idle",
  },

  [MACHINE_STATUS.SETUP]: {
    name: MACHINE_STATUS.SETUP,
    description: "機台正在進行設定",
    canSwitch: true,
    color: "#ff9800", // 橘色
    className: "status-setup",
  },

  [MACHINE_STATUS.TESTING]: {
    name: MACHINE_STATUS.TESTING,
    description: "進行產品測試",
    canSwitch: true,
    color: "#4caf50", // 綠色
    className: "status-testing",
  },

  [MACHINE_STATUS.STOPPED]: {
    name: MACHINE_STATUS.STOPPED,
    canSwitch: true,
    description: "機台暫停運作",
    color: "#f44336", // 紅色
    className: "status-stopped",
  },
};

// 🧠 定義狀態轉換規則
export const STATUS_TRANSITIONS = {
  // 待機狀態可以切換到所有其他狀態
  [MACHINE_STATUS.IDLE]: {
    allowedTransitions: [
      MACHINE_STATUS.SETUP,
      MACHINE_STATUS.TESTING,
      MACHINE_STATUS.STOPPED,
    ],
  },

  // 其他狀態只能切換回待機
  [MACHINE_STATUS.SETUP]: {
    allowedTransitions: [MACHINE_STATUS.IDLE],
  },

  [MACHINE_STATUS.TESTING]: {
    allowedTransitions: [MACHINE_STATUS.IDLE],
  },

  [MACHINE_STATUS.STOPPED]: {
    allowedTransitions: [MACHINE_STATUS.IDLE],
  },
};

// ✨ 簡化的狀態切換檢查
export const canTransitTo = (currentStatus, targetStatus) => {
  // 製立單不可切換
  if (currentStatus === MACHINE_STATUS.ORDER_CREATED) {
    return false;
  }

  // 檢查允許的轉換
  return (
    STATUS_TRANSITIONS[currentStatus]?.allowedTransitions.includes(
      targetStatus
    ) ?? false
  );
};
