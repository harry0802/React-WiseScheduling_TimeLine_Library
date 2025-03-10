import {
  MACHINE_STATUS,
  getStatusDisplay,
  getStatusCode,
} from "../../configs/constants/fieldNames";
import { isEqual } from "lodash";

/**
 * 狀態機配置 - 使用英文狀態代碼作為內部邏輯處理依據
 */
const MachineStates = {
  // 狀態類型分組：定義起始狀態集合
  START: [
    MACHINE_STATUS.TUNING, // "TUNING" 上模與調機
    MACHINE_STATUS.OFFLINE, // "OFFLINE" 機台停機
    MACHINE_STATUS.TESTING, // "TESTING" 產品試模
  ],
  // 終點狀態：定義結束狀態
  END: MACHINE_STATUS.IDLE, // "IDLE" 待機中

  // 不允許重複提交的狀態：某些狀態禁止在相同狀態下重複提交
  NO_RESUBMIT: [MACHINE_STATUS.TUNING, MACHINE_STATUS.IDLE],

  // 狀態別名映射：提供擴展性，可以添加狀態的別名
  ALIASES: {},
};

/**
 * 狀態驗證器 - 使用命名空間模式組織相關函數和邏輯
 */
const StatusValidator = {
  /**
   * 狀態標準化 - 確保使用英文狀態代碼進行邏輯處理
   * 無論輸入中文名稱還是英文代碼，都轉換為統一的英文代碼
   */
  normalize(status) {
    // 默認處理：空狀態視為待機狀態
    if (!status) return MachineStates.END;

    // 中文轉英文：如果輸入是中文狀態名稱，轉換為英文狀態代碼
    const statusCode = getStatusCode(status);

    // 別名處理：如果有別名映射，使用標準名稱
    return MachineStates.ALIASES[statusCode] || statusCode;
  },

  /**
   * 狀態類型檢查 - 判斷是否為起始狀態
   * 基於標準化後的狀態代碼進行判斷
   */
  isStartStatus(status) {
    const normalizedStatus = this.normalize(status);
    return MachineStates.START.includes(normalizedStatus);
  },

  /**
   * 狀態類型檢查 - 判斷是否為終點狀態
   * 基於標準化後的狀態代碼進行判斷
   */
  isEndStatus(status) {
    const normalizedStatus = this.normalize(status);
    return normalizedStatus === MachineStates.END;
  },

  /**
   * 重複提交規則 - 判斷狀態是否允許重複提交
   * 上模與調機和待機中狀態不允許重複提交
   */
  allowsResubmit(status) {
    const normalizedStatus = this.normalize(status);
    return !MachineStates.NO_RESUBMIT.includes(normalizedStatus);
  },

  /**
   * 表單變更檢查 - 判斷表單內容是否有變化
   * 重複提交時需要確認內容是否有變更
   */
  hasDataChanged(newData, oldData, formState = {}) {
    // 優先使用 react-hook-form 的 isDirty 標誌
    if (formState.isDirty !== undefined) return formState.isDirty;
    // 如果沒有舊數據，視為有變化
    if (!oldData) return true;
    // 使用 lodash 的深度比較判斷變化
    return !isEqual(newData, oldData);
  },

  /**
   * 產生驗證結果 - 統一結果返回格式
   * 包含驗證結果、消息和時間信息
   */
  createResult(isValid, message, timeInfo = {}) {
    return { valid: isValid, message, timeInfo };
  },

  /**
   * 生成時間信息 - 根據狀態轉換記錄時間點
   * 實現工作開始和結束時間的自動記錄
   */
  generateTimeInfo(fromStatus, toStatus) {
    const timeInfo = {};

    // 從待機到任何狀態：記錄開始時間
    if (this.isEndStatus(fromStatus)) {
      timeInfo.startTime = new Date().toISOString();
    }

    // 從起始狀態到待機：記錄結束時間
    if (this.isStartStatus(fromStatus) && this.isEndStatus(toStatus)) {
      timeInfo.endTime = new Date().toISOString();
    }

    return timeInfo;
  },

  /**
   * 專用轉換處理函數 - 處理相同狀態重複提交的邏輯
   * 包含重複提交限制和內容變更檢查
   */
  handleSameStateResubmit(status, formData, prevFormData, formState) {
    const normalizedStatus = this.normalize(status);

    // 規則1: 某些狀態禁止重複提交
    if (!this.allowsResubmit(normalizedStatus)) {
      return this.createResult(
        false,
        `不允許重複提交「${getStatusDisplay(normalizedStatus)}」狀態`
      );
    }

    // 規則2: 允許重複提交但必須有內容變更
    if (this.hasDataChanged(formData, prevFormData, formState)) {
      return this.createResult(
        true,
        `「${getStatusDisplay(normalizedStatus)}」狀態內容已更新`
      );
    }

    // 規則3: 無內容變更不允許重複提交
    return this.createResult(
      false,
      `表單內容未變更，無法重複提交「${getStatusDisplay(
        normalizedStatus
      )}」狀態`
    );
  },

  /**
   * 主要驗證函數 - 實現狀態轉換的核心業務規則
   * 處理各種狀態轉換情境並生成相應結果
   */
  validateTransition({
    currentStatus,
    targetStatus,
    formData,
    prevFormData,
    formState = {},
  }) {
    // 標準化狀態代碼，確保一致性
    const current = this.normalize(currentStatus);
    const target = this.normalize(targetStatus);

    // 規則1: 相同狀態重複提交驗證
    if (current === target) {
      return this.handleSameStateResubmit(
        target,
        formData,
        prevFormData,
        formState
      );
    }

    // 規則2: 從待機到任何狀態 - 新開始工作
    if (this.isEndStatus(current)) {
      const timeInfo = { startTime: new Date().toISOString() };
      return this.createResult(
        true,
        `成功從「${getStatusDisplay(current)}」轉換至「${getStatusDisplay(
          target
        )}」`,
        timeInfo
      );
    }

    // 規則3: 從起始狀態到待機 - 完成工作
    if (this.isStartStatus(current) && this.isEndStatus(target)) {
      const timeInfo = { endTime: new Date().toISOString() };
      return this.createResult(
        true,
        `成功從「${getStatusDisplay(current)}」轉換至「${getStatusDisplay(
          target
        )}」`,
        timeInfo
      );
    }

    // 規則4: 從起始狀態到另一個起始狀態 (禁止) - 必須先回到待機
    if (this.isStartStatus(current) && this.isStartStatus(target)) {
      return this.createResult(
        false,
        `不允許從「${getStatusDisplay(current)}」直接轉換到「${getStatusDisplay(
          target
        )}」，必須先回到待機狀態`
      );
    }

    // 規則5: 其他未定義的轉換 - 默認視為無效
    return this.createResult(
      false,
      `無效的狀態轉換: 從「${getStatusDisplay(current)}」到「${getStatusDisplay(
        target
      )}」`
    );
  },
};

// 導出函數 - 綁定this上下文確保方法正常運行
export const validateStatusTransition =
  StatusValidator.validateTransition.bind(StatusValidator);
export const getStatusTimeInfo =
  StatusValidator.generateTimeInfo.bind(StatusValidator);

// 默認導出
export default {
  validateStatusTransition,
  getStatusTimeInfo,
};
