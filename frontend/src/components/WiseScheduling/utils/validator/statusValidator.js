//! =============== 1. 設定與常量 ===============
//* 導入必要的依賴和常量定義

import { isEqual } from "lodash";
import {
  getStatusCode,
  getStatusDisplay,
  MACHINE_STATUS,
} from "../../configs/constants/fieldNames";

/**
 * 🧠 狀態機配置 - 使用英文狀態代碼作為內部邏輯處理依據
 * 集中定義所有業務規則，便於全局管理
 */
const MachineStates = {
  // 狀態類型分組：定義起始狀態集合
  START: [
    MACHINE_STATUS.TUNING, // 上模與調機
    MACHINE_STATUS.OFFLINE, // 機台停機
    MACHINE_STATUS.TESTING, // 產品試模
  ],

  // 終點狀態：定義結束狀態
  END: MACHINE_STATUS.IDLE, // 待機中

  // 不允許重複提交的狀態
  NO_RESUBMIT: [MACHINE_STATUS.TUNING, MACHINE_STATUS.IDLE],
};

//! =============== 2. 核心功能 ===============

/**
 * 狀態標準化 - 確保使用統一的英文狀態代碼
 * @param {string} status - 輸入狀態(可能是中文或英文代碼)
 * @returns {string} - 標準化後的狀態代碼
 */
const normalizeStatus = (status) => {
  // 空狀態視為待機狀態
  if (!status) return MachineStates.END;

  // 如果輸入是中文狀態名稱，轉換為英文狀態代碼
  return getStatusCode(status);
};

/**
 * 狀態類型檢查 - 判斷是否為起始狀態
 * @param {string} status - 狀態代碼或名稱
 * @returns {boolean} - 是否為起始狀態
 */
const isStartStatus = (status) => {
  const normalizedStatus = normalizeStatus(status);
  return MachineStates.START.includes(normalizedStatus);
};

/**
 * 狀態類型檢查 - 判斷是否為終點狀態
 * @param {string} status - 狀態代碼或名稱
 * @returns {boolean} - 是否為終點狀態
 */
const isEndStatus = (status) => {
  const normalizedStatus = normalizeStatus(status);
  return normalizedStatus === MachineStates.END;
};

/**
 * 重複提交規則 - 判斷狀態是否允許重複提交
 * @param {string} status - 狀態代碼或名稱
 * @returns {boolean} - 是否允許重複提交
 */
const allowsResubmit = (status) => {
  const normalizedStatus = normalizeStatus(status);
  return !MachineStates.NO_RESUBMIT.includes(normalizedStatus);
};

//! =============== 3. 工具函數 ===============

/**
 * 表單變更檢查 - 判斷表單內容是否有變化
 *
 * @param {Object} newData - 新的表單數據
 * @param {Object} oldData - 舊的表單數據
 * @param {Object} formState - react-hook-form 的表單狀態
 * @returns {boolean} - 是否有數據變更
 *
 * @example
 * // 使用 react-hook-form 的 formState
 * const hasChanged = hasDataChanged(data, prevData, formState);
 *
 * // 直接比較兩個數據對象
 * const hasChanged = hasDataChanged(newData, oldData);
 */
const hasDataChanged = (newData, oldData, formState = {}) => {
  // 🧠 優先使用 react-hook-form 的 isDirty 標誌
  if (formState.isDirty !== undefined) return formState.isDirty;

  // 如果沒有舊數據，視為有變化
  if (!oldData) return true;

  // 使用 lodash 的深度比較判斷變化
  return !isEqual(newData, oldData);
};

/**
 * 產生驗證結果 - 統一結果返回格式
 *
 * @param {boolean} isValid - 驗證是否通過
 * @param {string} message - 驗證結果訊息
 * @param {Object} timeInfo - 時間相關信息
 * @returns {Object} - 格式化的驗證結果
 */
const createResult = (isValid, message, timeInfo = {}) => {
  return { valid: isValid, message, timeInfo };
};

/**
 * 生成時間信息 - 根據狀態轉換記錄時間點
 *
 * @param {string} fromStatus - 起始狀態
 * @param {string} toStatus - 目標狀態
 * @returns {Object} - 包含開始或結束時間的對象
 */
const generateTimeInfo = (fromStatus, toStatus) => {
  const timeInfo = {};

  // 從待機到任何狀態：記錄開始時間
  if (isEndStatus(fromStatus)) {
    timeInfo.startTime = new Date().toISOString();
  }

  // 從起始狀態到待機：記錄結束時間
  if (isStartStatus(fromStatus) && isEndStatus(toStatus)) {
    timeInfo.endTime = new Date().toISOString();
  }

  return timeInfo;
};

//! =============== 4. 狀態轉換規則處理 ===============

/**
 * 處理相同狀態重複提交的邏輯
 *
 * @param {string} status - 狀態代碼或名稱
 * @param {Object} formData - 新的表單數據
 * @param {Object} prevFormData - 舊的表單數據
 * @param {Object} formState - 表單狀態對象
 * @returns {Object} - 驗證結果
 */
const handleSameStateResubmit = (status, formData, prevFormData, formState) => {
  const normalizedStatus = normalizeStatus(status);
  const statusDisplay = getStatusDisplay(normalizedStatus);

  // 💡 規則1: 某些狀態禁止重複提交
  if (!allowsResubmit(normalizedStatus)) {
    return createResult(false, `不允許重複提交「${statusDisplay}」狀態`);
  }

  // 💡 規則2: 允許重複提交但必須有內容變更
  if (hasDataChanged(formData, prevFormData, formState)) {
    return createResult(true, `「${statusDisplay}」狀態內容已更新`);
  }

  // 💡 規則3: 無內容變更不允許重複提交
  return createResult(
    false,
    `表單內容未變更，無法重複提交「${statusDisplay}」狀態`
  );
};

/**
 * 主要驗證函數 - 實現狀態轉換的核心業務規則
 * ✨ 使用早期返回模式減少嵌套
 *
 * @param {Object} params - 驗證參數
 * @param {string} params.currentStatus - 當前狀態
 * @param {string} params.targetStatus - 目標狀態
 * @param {Object} params.formData - 新的表單數據
 * @param {Object} params.prevFormData - 舊的表單數據
 * @param {Object} params.formState - 表單狀態
 * @returns {Object} - 驗證結果
 *
 * @example
 * // 基本用法
 * const result = validateStatusTransition({
 *   currentStatus: 'OFFLINE',
 *   targetStatus: 'IDLE',
 *   formData: newData,
 *   prevFormData: oldData
 * });
 *
 * // 使用 react-hook-form
 * const result = validateStatusTransition({
 *   currentStatus: 'TUNING',
 *   targetStatus: 'TUNING',
 *   formData: data,
 *   prevFormData: prevData,
 *   formState: formState
 * });
 */
const validateStatusTransition = ({
  currentStatus,
  targetStatus,
  formData,
  prevFormData,
  formState = {},
}) => {
  // 標準化狀態代碼，確保一致性
  const current = normalizeStatus(currentStatus);
  const target = normalizeStatus(targetStatus);

  // 規則1: 相同狀態重複提交驗證
  if (current === target) {
    return handleSameStateResubmit(target, formData, prevFormData, formState);
  }

  // 規則2: 從待機到任何狀態 - 新開始工作
  if (isEndStatus(current)) {
    const timeInfo = { startTime: new Date().toISOString() };
    return createResult(
      true,
      `成功從「${getStatusDisplay(current)}」轉換至「${getStatusDisplay(
        target
      )}」`,
      timeInfo
    );
  }

  // 規則3: 從起始狀態到待機 - 完成工作
  if (isStartStatus(current) && isEndStatus(target)) {
    const timeInfo = { endTime: new Date().toISOString() };
    return createResult(
      true,
      `成功從「${getStatusDisplay(current)}」轉換至「${getStatusDisplay(
        target
      )}」`,
      timeInfo
    );
  }

  // 規則4: 從起始狀態到另一個起始狀態 (禁止) - 必須先回到待機
  if (isStartStatus(current) && isStartStatus(target)) {
    return createResult(
      false,
      `不允許從「${getStatusDisplay(current)}」直接轉換到「${getStatusDisplay(
        target
      )}」，必須先回到待機狀態`
    );
  }

  // 規則5: 其他未定義的轉換 - 默認視為無效
  return createResult(
    false,
    `無效的狀態轉換: 從「${getStatusDisplay(current)}」到「${getStatusDisplay(
      target
    )}」`
  );
};

// 導出所有需要的函數
export const getStatusTimeInfo = generateTimeInfo;
export { validateStatusTransition };

// 默認導出主要函數
export default validateStatusTransition;
