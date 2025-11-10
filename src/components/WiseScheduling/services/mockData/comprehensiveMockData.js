/**
 * @file comprehensiveMockData.js
 * @description 綜合假資料生成器 - 包含所有狀態類型（製令單 + 機台狀態）
 * @version 1.0.0
 *
 * 資料設計原則：
 * 1. 符合 API 格式 (transformApiToInternalFormat 可以轉換)
 * 2. 通過所有驗證規則 (validationSchema)
 * 3. 包含所有狀態類型：製令單、待機中、上模與調機、產品試模、機台停機
 * 4. 包含計劃時間和實際時間
 */

import dayjs from 'dayjs';
import { MACHINE_STATUS } from '../../configs/validations/schedule/constants';

//! =============== 1. 輔助函數 ===============

/**
 * 生成隨機日期
 * @param {number} daysOffset - 距離今天的天數偏移
 * @param {number} hourOffset - 額外的小時偏移
 * @returns {string} ISO 8601 格式的日期字串
 */
const generateDate = (daysOffset = 0, hourOffset = 0) => {
  return dayjs()
    .add(daysOffset, 'day')
    .add(hourOffset, 'hour')
    .toISOString();
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
 * 生成唯一 ID
 */
let idCounter = 10000;
const generateId = () => idCounter++;

//! =============== 2. 常量定義 ===============

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
 * 停機原因範例
 */
const STOP_REASONS = [
  "設備故障",
  "模具損壞",
  "原料不足",
  "計劃性維護",
  "電力中斷",
  "品質異常",
];

/**
 * 製程名稱
 */
const PROCESS_NAMES = [
  "射出成型",
  "吹塑成型",
  "壓鑄成型",
  "熱壓成型",
];

/**
 * 訂單狀態
 */
const ORDER_STATUSES = [
  "尚未上機",
  "進行中",
  "已完成",
  "暫停",
];

/**
 * 機台配置
 */
const MACHINE_CONFIGS = {
  A: Array.from({ length: 10 }, (_, i) => `A${i + 1}`),
  B: Array.from({ length: 11 }, (_, i) => `B${i + 1}`),
  C: Array.from({ length: 9 }, (_, i) => `C${i + 1}`),
  D: Array.from({ length: 9 }, (_, i) => `D${i + 1}`),
};

//! =============== 3. 製令單資料生成器 ===============

/**
 * 生成製令單資料（API 格式）
 * @param {string} area - 生產區域
 * @param {string} machineSN - 機台編號
 * @param {number} daysOffset - 天數偏移
 * @param {boolean} hasActualTime - 是否包含實際時間（歷史資料）
 * @returns {Object} 製令單 API 格式資料
 */
const generateWorkOrder = (area, machineSN, daysOffset, hasActualTime = false) => {
  const id = generateId();
  const duration = randomInt(8, 48); // 8-48 小時
  const quantity = randomInt(100, 5000);
  const productionQuantity = hasActualTime ? randomInt(50, quantity) : 0;

  // 計劃時間
  const planOnMachineDate = generateDate(daysOffset, randomInt(8, 16));
  const planFinishDate = dayjs(planOnMachineDate).add(duration, 'hour').toISOString();

  // 實際時間（歷史資料才有）
  const actualOnMachineDate = hasActualTime
    ? generateDate(daysOffset, randomInt(8, 16))
    : null;
  const actualFinishDate = hasActualTime && randomInt(1, 10) > 7
    ? dayjs(actualOnMachineDate).add(duration + randomInt(-2, 5), 'hour').toISOString()
    : null;

  // 訂單狀態
  let orderStatus;
  if (!hasActualTime) {
    orderStatus = "尚未上機";
  } else if (actualFinishDate) {
    orderStatus = "已完成";
  } else {
    orderStatus = "進行中";
  }

  return {
    // ===== 基本識別欄位 =====
    timeLineStatus: MACHINE_STATUS.ORDER_CREATED,
    productionScheduleId: id,
    productionArea: area,
    machineSN: machineSN,

    // ===== 計劃時間（必填）=====
    planOnMachineDate,
    planFinishDate,

    // ===== 實際時間（選填，歷史資料才有）=====
    actualOnMachineDate,
    actualFinishDate,

    // ===== 製令單資訊 =====
    workOrderSN: `WO-${String(id).padStart(6, '0')}`,
    productSN: `P-${randomInt(1000, 9999)}`,
    productName: randomChoice(SAMPLE_PRODUCTS),
    processName: randomChoice(PROCESS_NAMES),

    // ===== 數量資訊 =====
    workOrderQuantity: quantity,
    productionQuantity: productionQuantity,

    // ===== 狀態 =====
    productionScheduleStatus: orderStatus,

    // ===== 延遲時間 =====
    postponeTime: hasActualTime && randomInt(1, 10) > 8
      ? dayjs(planFinishDate).add(randomInt(1, 5), 'day').toISOString()
      : null,

    // ===== 時間戳 =====
    createdAt: generateDate(-30),
    updatedAt: generateDate(-1),
  };
};

//! =============== 4. 機台狀態資料生成器 ===============

/**
 * 生成待機中狀態資料（API 格式）
 */
const generateIdleStatus = (area, machineSN, daysOffset, hasActualTime = false) => {
  const id = generateId();
  const duration = randomInt(1, 4); // 1-4 小時

  const planStartTime = generateDate(daysOffset, randomInt(8, 16));
  const planEndTime = dayjs(planStartTime).add(duration, 'hour').toISOString();

  const actualStartTime = hasActualTime ? planStartTime : null;
  const actualEndTime = hasActualTime
    ? dayjs(actualStartTime).add(duration, 'hour').toISOString()
    : null;

  return {
    timeLineStatus: MACHINE_STATUS.IDLE,
    productionArea: area,
    machineSN: machineSN,
    machineStatusId: id,

    // 計劃時間
    machineStatusPlanStartTime: planStartTime,
    machineStatusPlanEndTime: planEndTime,

    // 實際時間
    machineStatusActualStartTime: actualStartTime,
    machineStatusActualEndTime: actualEndTime,

    // 狀態資訊
    machineStatusReason: "",
    machineStatusProduct: "",
  };
};

/**
 * 生成上模與調機狀態資料（API 格式）
 */
const generateSetupStatus = (area, machineSN, daysOffset, hasActualTime = false) => {
  const id = generateId();
  const duration = randomInt(2, 6); // 2-6 小時

  const planStartTime = generateDate(daysOffset, randomInt(8, 16));
  const planEndTime = dayjs(planStartTime).add(duration, 'hour').toISOString();

  const actualStartTime = hasActualTime ? planStartTime : null;
  const actualEndTime = hasActualTime
    ? dayjs(actualStartTime).add(duration, 'hour').toISOString()
    : null;

  return {
    timeLineStatus: MACHINE_STATUS.SETUP,
    productionArea: area,
    machineSN: machineSN,
    machineStatusId: id,

    machineStatusPlanStartTime: planStartTime,
    machineStatusPlanEndTime: planEndTime,

    machineStatusActualStartTime: actualStartTime,
    machineStatusActualEndTime: actualEndTime,

    machineStatusReason: randomChoice(["模具更換", "參數調整", "首件檢驗"]),
    machineStatusProduct: randomChoice(SAMPLE_PRODUCTS),
  };
};

/**
 * 生成產品試模狀態資料（API 格式）
 */
const generateTestingStatus = (area, machineSN, daysOffset, hasActualTime = false) => {
  const id = generateId();
  const duration = randomInt(1, 3); // 1-3 小時

  const planStartTime = generateDate(daysOffset, randomInt(8, 16));
  const planEndTime = dayjs(planStartTime).add(duration, 'hour').toISOString();

  const actualStartTime = hasActualTime ? planStartTime : null;
  const actualEndTime = hasActualTime
    ? dayjs(actualStartTime).add(duration, 'hour').toISOString()
    : null;

  return {
    timeLineStatus: MACHINE_STATUS.TESTING,
    productionArea: area,
    machineSN: machineSN,
    machineStatusId: id,

    machineStatusPlanStartTime: planStartTime,
    machineStatusPlanEndTime: planEndTime,

    machineStatusActualStartTime: actualStartTime,
    machineStatusActualEndTime: actualEndTime,

    machineStatusReason: "",
    machineStatusProduct: randomChoice(SAMPLE_PRODUCTS),
  };
};

/**
 * 生成機台停機狀態資料（API 格式）
 */
const generateStoppedStatus = (area, machineSN, daysOffset, hasActualTime = false) => {
  const id = generateId();
  const duration = randomInt(1, 8); // 1-8 小時

  const planStartTime = generateDate(daysOffset, randomInt(8, 16));
  const planEndTime = dayjs(planStartTime).add(duration, 'hour').toISOString();

  const actualStartTime = hasActualTime ? planStartTime : null;
  const actualEndTime = hasActualTime
    ? dayjs(actualStartTime).add(duration, 'hour').toISOString()
    : null;

  return {
    timeLineStatus: MACHINE_STATUS.STOPPED,
    productionArea: area,
    machineSN: machineSN,
    machineStatusId: id,

    machineStatusPlanStartTime: planStartTime,
    machineStatusPlanEndTime: planEndTime,

    machineStatusActualStartTime: actualStartTime,
    machineStatusActualEndTime: actualEndTime,

    machineStatusReason: randomChoice(STOP_REASONS),
    machineStatusProduct: "",
  };
};

//! =============== 5. 綜合資料生成器 ===============

/**
 * 為單台機器生成混合狀態資料
 * @param {string} area - 生產區域
 * @param {string} machineSN - 機台編號
 * @returns {Array} 包含各種狀態的資料陣列
 */
const generateMachineTimeline = (area, machineSN) => {
  const timeline = [];
  let currentDayOffset = -7; // 從 7 天前開始

  // 生成 8-12 個時間段，混合各種狀態
  const segmentCount = randomInt(8, 12);

  for (let i = 0; i < segmentCount; i++) {
    const isHistorical = currentDayOffset < 0; // 過去的資料為歷史資料
    const statusType = randomInt(1, 100);

    let statusData;

    if (statusType <= 40) {
      // 40% 機率是製令單
      statusData = generateWorkOrder(area, machineSN, currentDayOffset, isHistorical);
    } else if (statusType <= 55) {
      // 15% 機率是待機中
      statusData = generateIdleStatus(area, machineSN, currentDayOffset, isHistorical);
    } else if (statusType <= 70) {
      // 15% 機率是上模與調機
      statusData = generateSetupStatus(area, machineSN, currentDayOffset, isHistorical);
    } else if (statusType <= 85) {
      // 15% 機率是產品試模
      statusData = generateTestingStatus(area, machineSN, currentDayOffset, isHistorical);
    } else {
      // 15% 機率是機台停機
      statusData = generateStoppedStatus(area, machineSN, currentDayOffset, isHistorical);
    }

    timeline.push(statusData);
    currentDayOffset += randomInt(1, 2); // 隨機推進 1-2 天
  }

  return timeline;
};

/**
 * 生成指定區域的所有資料
 * @param {string} area - 生產區域
 * @returns {Array} 該區域所有機台的資料
 */
export const generateAreaComprehensiveData = (area) => {
  const machines = MACHINE_CONFIGS[area] || [];
  const allData = [];

  machines.forEach(machineSN => {
    const machineData = generateMachineTimeline(area, machineSN);
    allData.push(...machineData);
  });

  return allData;
};

/**
 * 生成所有區域的資料
 * @returns {Object} 按區域分組的資料
 */
export const generateAllComprehensiveData = () => {
  return {
    A: generateAreaComprehensiveData('A'),
    B: generateAreaComprehensiveData('B'),
    C: generateAreaComprehensiveData('C'),
    D: generateAreaComprehensiveData('D'),
  };
};

/**
 * 根據時間範圍過濾資料
 * @param {Array} data - 資料陣列
 * @param {string} startTime - 開始時間 (ISO string)
 * @param {string} endTime - 結束時間 (ISO string)
 * @returns {Array} 過濾後的資料陣列
 */
export const filterDataByTimeRange = (data, startTime, endTime) => {
  if (!startTime || !endTime) return data;

  const start = dayjs(startTime);
  const end = dayjs(endTime);

  return data.filter(item => {
    let itemStart, itemEnd;

    // 製令單
    if (item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED) {
      itemStart = dayjs(item.actualOnMachineDate || item.planOnMachineDate);
      itemEnd = dayjs(item.actualFinishDate || item.planFinishDate);
    }
    // 機台狀態
    else {
      itemStart = dayjs(item.machineStatusActualStartTime || item.machineStatusPlanStartTime);
      itemEnd = dayjs(item.machineStatusActualEndTime || item.machineStatusPlanEndTime);
    }

    // 檢查時間範圍是否有重疊
    return itemStart.isBefore(end) && itemEnd.isAfter(start);
  });
};

//! =============== 6. 測試資料生成器 ===============

/**
 * 生成特定狀態的測試資料（用於驗證）
 * @param {string} statusType - 狀態類型
 * @returns {Object} 該狀態的測試資料
 */
export const generateTestDataForStatus = (statusType) => {
  const area = 'A';
  const machineSN = 'A1';
  const daysOffset = 0;

  switch (statusType) {
    case MACHINE_STATUS.ORDER_CREATED:
      return generateWorkOrder(area, machineSN, daysOffset, false);
    case MACHINE_STATUS.IDLE:
      return generateIdleStatus(area, machineSN, daysOffset, false);
    case MACHINE_STATUS.SETUP:
      return generateSetupStatus(area, machineSN, daysOffset, false);
    case MACHINE_STATUS.TESTING:
      return generateTestingStatus(area, machineSN, daysOffset, false);
    case MACHINE_STATUS.STOPPED:
      return generateStoppedStatus(area, machineSN, daysOffset, false);
    default:
      return null;
  }
};

/**
 * 預設匯出：所有區域的綜合資料
 */
export default generateAllComprehensiveData();
