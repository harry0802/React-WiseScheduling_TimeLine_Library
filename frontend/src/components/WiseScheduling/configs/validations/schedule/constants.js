// constants.js

// 🧠 基礎配置
export const MACHINE_CONFIG = {
  AREAS: ["A", "B", "C", "D"],
  MACHINES_PER_AREA: 10,
  WORK_START_HOUR: 8,
};

// 💡 狀態定義
export const MACHINE_STATUS = {
  ORDER_CREATED: "製令單", // 由「製令單」修改為「製令單」
  IDLE: "待機中",
  // 其他狀態暫時保留但不使用
  SETUP: "上模與調機",
  TESTING: "產品試模",
  STOPPED: "機台停機",
};

// ✨ 狀態配置與轉換規則整合
export const STATUS_CONFIG = {
  // 製令單配置
  [MACHINE_STATUS.ORDER_CREATED]: {
    name: MACHINE_STATUS.ORDER_CREATED,
    description: "製令單模式",
    color: "#4caf50",
    className: "status-producing",
    canSwitch: false,
    canDelete: false,
    allowedTransitions: [],
  },

  // 不需要額外的「製令單」配置，因為 ORDER_CREATED 已經定義為「製令單」

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
    // 新增：檢查是否為歷史紀錄的函數
    checkHistorical: (item) => {
      // 只有當有實際開始時間時才算歷史紀錄
      return !!(item?.actualStartTime || item?.status?.actualStartTime);
    },
  },

  [MACHINE_STATUS.SETUP]: {
    name: MACHINE_STATUS.SETUP,
    description: "機台正在進行設定",
    color: "#ff9800",
    className: "status-setup",
    canSwitch: true,
    canDelete: true,
    allowedTransitions: [MACHINE_STATUS.IDLE], // 只能切換到待機狀態
  },

  [MACHINE_STATUS.TESTING]: {
    name: MACHINE_STATUS.TESTING,
    description: "進行產品測試",
    color: "#2196f3",
    className: "status-testing",
    canSwitch: true,
    canDelete: true,
    allowedTransitions: [MACHINE_STATUS.IDLE], // 只能切換到待機狀態
  },

  [MACHINE_STATUS.STOPPED]: {
    name: MACHINE_STATUS.STOPPED,
    description: "機台暫停運作",
    color: "#f44336",
    className: "status-stopped",
    canSwitch: true,
    canDelete: true,
    allowedTransitions: [MACHINE_STATUS.IDLE], // 只能切換到待機狀態
  },
};

// 🧠 狀態操作函數
/**
 * 檢查當前狀態是否可以切換到指定狀態
 * @param {string} currentStatus - 當前狀態
 * @param {string} targetStatus - 目標狀態
 * @returns {boolean} 是否允許切換
 */
export const canTransitTo = (currentStatus, targetStatus) => {
  // 如果當前狀態是製令單，不允許切換
  if (currentStatus === MACHINE_STATUS.ORDER_CREATED) {
    return false;
  }

  const config = STATUS_CONFIG[currentStatus];

  // 如果狀態不能切換或配置不存在，返回 false
  if (!config || !config.canSwitch) {
    return false;
  }

  // 檢查目標狀態是否在允許的轉換列表中
  return config.allowedTransitions.includes(targetStatus);
};

// 新增檢查函數
export const isHistoricalRecord = (status, item) => {
  const config = STATUS_CONFIG[status];
  if (config?.checkHistorical) {
    return config.checkHistorical(item);
  }
  return false;
};

// ✨ 新增的輔助函數
export const canDeleteStatus = (status, item = null) => {
  // 如果是歷史紀錄，不能刪除
  if (item && isHistoricalRecord(status, item)) {
    return false;
  }
  return STATUS_CONFIG[status]?.canDelete ?? false;
};

export const canEditStatus = (status, item = null) => {
  // 如果是歷史紀錄，不能編輯
  if (item && isHistoricalRecord(status, item)) {
    return false;
  }
  return STATUS_CONFIG[status]?.canSwitch ?? false;
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
