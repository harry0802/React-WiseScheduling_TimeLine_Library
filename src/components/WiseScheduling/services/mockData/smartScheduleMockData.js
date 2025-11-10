/**
 * @file smartScheduleMockData.js
 * @description 智慧排程（訂單/工單）假資料生成器
 * @version 1.0.0
 */

/**
 * 生成隨機日期
 * @param {number} daysOffset - 距離今天的天數偏移
 * @param {number} hourOffset - 額外的小時偏移
 * @returns {string} ISO 8601 格式的日期字串
 */
const generateDate = (daysOffset = 0, hourOffset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(date.getHours() + hourOffset);
  return date.toISOString();
};

/**
 * 隨機選擇陣列中的元素
 */
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * 生成隨機整數
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
  "醫療器材-J006",
];

/**
 * 客戶名稱範例
 */
const SAMPLE_CUSTOMERS = [
  "科技股份有限公司",
  "製造實業有限公司",
  "精密工業股份有限公司",
  "電子科技有限公司",
  "塑膠工業股份有限公司",
];

/**
 * 訂單狀態
 */
const ORDER_STATUS = {
  PENDING: "PENDING",       // 待生產
  IN_PROGRESS: "IN_PROGRESS", // 生產中
  COMPLETED: "COMPLETED",   // 已完成
  DELAYED: "DELAYED",       // 延遲
};

/**
 * 生成單一排程項目
 * @param {number} id - 排程 ID
 * @param {string} productionArea - 生產區域
 * @param {string} machineSN - 機台編號
 * @param {number} dayOffset - 天數偏移
 * @returns {Object} 排程資料
 */
const generateScheduleItem = (id, productionArea, machineSN, dayOffset) => {
  const startDay = dayOffset;
  const duration = randomInt(1, 5); // 1-5 天的生產時間
  const quantity = randomInt(100, 5000);
  const producedQuantity = randomInt(0, quantity);

  const planOnMachineDate = generateDate(startDay);
  const planOffMachineDate = generateDate(startDay + duration);
  const actualOnMachineDate = startDay <= 0 ? generateDate(startDay) : null;

  return {
    // ===== 必要欄位（API 轉換器需要）=====
    timeLineStatus: "製令單", // 標記為工單/製令單
    productionScheduleId: id,
    productionArea: productionArea,
    machineSN: machineSN,

    // 計劃時間（重要：API 轉換器使用這些欄位）
    planOnMachineDate: planOnMachineDate,
    planFinishDate: planOffMachineDate, // 注意：使用 planFinishDate 而非 planOffMachineDate
    planOffMachineDate: planOffMachineDate, // 保留相容性

    // 實際時間
    actualOnMachineDate: actualOnMachineDate,
    actualFinishDate: null,
    actualOffMachineDate: null,

    // ===== 訂單資訊 =====
    workOrderNumber: `WO-${String(id).padStart(6, '0')}`,
    workOrderSN: `WO-${String(id).padStart(6, '0')}`, // API 相容欄位
    productName: randomChoice(SAMPLE_PRODUCTS),
    productSN: `P-${randomInt(1000, 9999)}`,
    customerName: randomChoice(SAMPLE_CUSTOMERS),
    processName: "射出成型",

    // 數量資訊
    quantity: quantity,
    workOrderQuantity: quantity, // API 相容欄位
    producedQuantity: producedQuantity,
    productionQuantity: producedQuantity, // API 相容欄位
    unit: "pcs",

    // 狀態
    status: startDay <= 0
      ? ORDER_STATUS.IN_PROGRESS
      : ORDER_STATUS.PENDING,
    productionScheduleStatus: startDay <= 0
      ? ORDER_STATUS.IN_PROGRESS
      : ORDER_STATUS.PENDING,

    // 優先級
    priority: randomChoice(["HIGH", "MEDIUM", "LOW"]),

    // 延遲時間
    postponeTime: null,

    // 備註
    notes: randomInt(1, 10) > 7 ? "客戶急單" : "",

    // 時間戳
    createdAt: generateDate(-30),
    updatedAt: generateDate(-1),
  };
};

/**
 * 為每個區域的每台機器生成排程
 * @param {string} area - 生產區域
 * @param {Array} machineSNs - 機台編號列表
 * @returns {Array} 排程資料陣列
 */
const generateAreaSchedule = (area, machineSNs) => {
  const schedules = [];
  let idCounter = 1000 + (area.charCodeAt(0) - 64) * 100; // A=1100, B=1200, C=1300, D=1400

  machineSNs.forEach((machineSN) => {
    // 為每台機器生成 2-4 個工單
    const orderCount = randomInt(2, 4);

    for (let i = 0; i < orderCount; i++) {
      const dayOffset = -7 + (i * 3); // 從 7 天前開始，每個工單間隔 3 天
      schedules.push(
        generateScheduleItem(idCounter++, area, machineSN, dayOffset)
      );
    }
  });

  return schedules;
};

/**
 * 機台配置（與 machineStatusMockData.js 對應）
 */
const MACHINE_CONFIGS = {
  A: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
  B: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11"],
  C: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
  D: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"],
};

/**
 * 生成所有區域的排程資料
 * @returns {Object} 按區域分組的排程資料
 */
export const generateAllSchedules = () => {
  return {
    A: generateAreaSchedule("A", MACHINE_CONFIGS.A),
    B: generateAreaSchedule("B", MACHINE_CONFIGS.B),
    C: generateAreaSchedule("C", MACHINE_CONFIGS.C),
    D: generateAreaSchedule("D", MACHINE_CONFIGS.D),
  };
};

/**
 * 生成指定區域的排程資料
 * @param {string} area - 生產區域
 * @returns {Array} 排程資料陣列
 */
export const generateScheduleByArea = (area) => {
  const machineSNs = MACHINE_CONFIGS[area] || [];
  return generateAreaSchedule(area, machineSNs);
};

/**
 * 根據時間範圍過濾排程
 * @param {Array} schedules - 排程陣列
 * @param {string} startTime - 開始時間 (ISO string)
 * @param {string} endTime - 結束時間 (ISO string)
 * @returns {Array} 過濾後的排程陣列
 */
export const filterSchedulesByTimeRange = (schedules, startTime, endTime) => {
  if (!startTime || !endTime) return schedules;

  const start = new Date(startTime);
  const end = new Date(endTime);

  return schedules.filter(schedule => {
    const scheduleStart = new Date(schedule.planOnMachineDate);
    const scheduleEnd = new Date(schedule.planOffMachineDate);

    // 檢查排程時間是否與查詢範圍有重疊
    return scheduleStart <= end && scheduleEnd >= start;
  });
};

/**
 * 預設匯出：所有區域的假資料
 */
export default generateAllSchedules();
