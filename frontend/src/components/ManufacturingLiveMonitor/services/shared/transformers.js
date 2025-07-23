/**
 * @fileoverview Manufacturing Live Monitor 統一轉換邏輯
 * @description 提供標準化的回應和錯誤處理轉換函數，確保資料格式一致性
 */

/**
 * @description 格式化日期為本地 YYYY-MM-DD 格式
 * @param {string|null|undefined} isoDateString - ISO 8601 格式的日期字串
 * @returns {string} YYYY-MM-DD 格式的日期或空字串
 */
export const formatDateToLocal = (isoDateString) => {
  if (!isoDateString) return "";
  try {
    const date = new Date(isoDateString);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString("sv-SE");
  } catch (error) {
    console.warn("日期格式化錯誤:", error);
    return "";
  }
};

/**
 * @description 格式化 ISO 日期字串為本地時間的 HH:mm 格式
 * @param {string|null|undefined} isoString - ISO 8601 格式的日期字串
 * @returns {string} HH:mm 格式的時間或 "--:--"
 */
export const formatTimeFromISO = (isoString) => {
  if (!isoString) return "--:--";
  try {
    const date = new Date(isoString);
    return isNaN(date.getTime())
      ? "--:--"
      : date.toLocaleTimeString("zh-TW", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
  } catch (error) {
    console.warn("時間格式化錯誤:", error);
    return "--:--";
  }
};

/**
 * @description 格式化時間顯示值
 * @description 將空值或 "0:00:00" 格式化為 "--:--:--"，符合製造業界面慣例
 * @param {string|null|undefined} timeValue - 原始時間值
 * @returns {string} 格式化後的時間顯示值
 */
export const formatTimeDisplay = (timeValue) => {
  if (!timeValue || timeValue === "0:00:00") {
    return "--:--:--";
  }
  return timeValue;
};

/**
 * @description 標準化 API 回應轉換
 * @template T
 * @param {Object} response - API 回應物件
 * @param {T} fallbackValue - 當資料不存在時的預設值
 * @param {Function} [transformer] - 可選的資料轉換函數
 * @returns {T} 轉換後的資料或預設值
 */
export const transformApiResponse = (
  response,
  fallbackValue,
  transformer = null
) => {
  // 檢查回應結構有效性
  if (!response || !response.data) {
    return fallbackValue;
  }

  // 如果有提供轉換函數，則使用轉換函數處理資料
  if (transformer && typeof transformer === "function") {
    try {
      return transformer(response.data);
    } catch (error) {
      console.warn("資料轉換錯誤:", error);
      return fallbackValue;
    }
  }

  return response.data;
};

/**
 * @description 標準化陣列回應轉換
 * @param {Object} response - API 回應物件
 * @param {Function} [itemTransformer] - 可選的單項資料轉換函數
 * @returns {Array} 轉換後的陣列資料
 */
export const transformArrayResponse = (response, itemTransformer = null) => {
  return transformApiResponse(response, [], (data) => {
    if (!Array.isArray(data)) {
      return [];
    }
    if (itemTransformer && typeof itemTransformer === "function") {
      return data.map(itemTransformer);
    }
    return data;
  });
};

/**
 * @description 標準化物件回應轉換
 * @param {Object} response - API 回應物件
 * @param {Object} defaultObject - 預設物件結構
 * @param {Function} [objectTransformer] - 可選的物件轉換函數
 * @returns {Object} 轉換後的物件資料
 */
export const transformObjectResponse = (
  response,
  defaultObject = {},
  objectTransformer = null
) => {
  return transformApiResponse(response, defaultObject, objectTransformer);
};

/**
 * @description 標準化錯誤回應轉換
 * @param {Object} response - 錯誤回應物件
 * @param {string} defaultMessage - 預設錯誤訊息
 * @returns {Object} 標準化的錯誤物件
 */
export const transformErrorResponse = (response, defaultMessage) => ({
  message: response.data?.message || defaultMessage,
  status: response.data?.status || false,
  statusCode: response.status || 500,
});

/**
 * @description 機台累計時間資料轉換器
 * @param {Object} item - 單筆機台時間資料
 * @param {number} index - 資料索引
 * @returns {Object} 轉換後的機台時間資料
 */
export const transformMachineTimeData = (item, index) => ({
  id: item.machineSN || `machine-${index}`,
  machine: item.machineSN,
  productionTime: formatTimeDisplay(item.runTime),
  adjustmentTime: formatTimeDisplay(item.tuningTime),
  downtime: formatTimeDisplay(item.offlineTime),
  testingTime: formatTimeDisplay(item.testingTime),
  waitingTime: formatTimeDisplay(item.idleTime),
  status: item.status || "IDLE",
});

/**
 * @description 逾期工單資料轉換器
 * @param {Object} item - 單筆逾期工單資料
 * @returns {Object} 轉換後的逾期工單資料
 */
export const transformOverdueWorkOrderData = (item) => ({
  orderNumber: String(item.workOrderSN || ""),
  productId: String(item.productSN || ""),
  incompleteQty: Number(item.unfinishedQuantity) || 0,
  machine: String(item.machineSN || ""),
  expiryDate: formatDateToLocal(item.planFinishDate),
});

/**
 * @description 機台離線事件資料轉換器
 * @param {Object} item - 單筆離線事件資料
 * @param {number} index - 資料索引
 * @returns {Object} 轉換後的離線事件資料
 */
export const transformMachineOfflineEventData = (item, index) => ({
  id: String(index),
  time: formatTimeFromISO(item.actualStartDate),
  machine: String(item.machineSN || ""),
  reason: String(item.reason || "未知原因"),
});

/**
 * @description 工單製程資料轉換器
 * @param {Object} item - 單筆工單製程資料
 * @returns {Object} 轉換後的工單製程資料
 */
export const transformWorkOrderProcessData = (item) => ({
  id: item.workOrderSN,
  workOrderDate: formatDateToLocal(item.workOrderDate),
  workOrderSN: item.workOrderSN,
  workOrderQuantity: item.workOrderQuantity,
  productName: item.productName,
  processOne: item.processOne,
  processTwo: item.processTwo,
  planFinishDate: formatDateToLocal(item.planFinishDate),
  status: item.status,
});

/**
 * @description 機台狀態時數統計資料轉換器
 * @param {Object} item - 單筆機台狀態時數資料
 * @returns {Object} 轉換後的機台狀態時數資料
 */
export const transformMachineStatusHoursData = (item) => ({
  ...item,
  id: item.machineSN || `machine-${Math.random().toString(36).substr(2, 9)}`,
});

/**
 * @description 每日 OEE 資料轉換器（含排序）
 * @param {Array} data - 每日 OEE 資料陣列
 * @returns {Array} 按日期排序後的 OEE 資料
 */
export const transformDailyOEEData = (data) => {
  if (!Array.isArray(data)) return [];

  // 按日期排序 (由小到大)
  return data.sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * @description 生產區域資料轉換器
 * @param {Object} response - API 回應
 * @returns {Array} 標準化的生產區域資料
 */
export const transformProductionZoneData = (response) => {
  return transformArrayResponse(response);
};

/**
 * @description 預設的設備稼動統計資料結構
 * @returns {Object} 預設的設備稼動統計資料
 */
export const getDefaultUtilizationStatistics = () => ({
  utilizationTime: "00時00分",
  utilizationRate: 0,
  runCount: 0,
  offlineCount: 0,
});

/**
 * @description 預設的停機因素資料結構
 * @returns {Object} 預設的停機因素資料
 */
export const getDefaultOfflineReasonData = () => ({
  reason: "",
  hours: 0,
});
