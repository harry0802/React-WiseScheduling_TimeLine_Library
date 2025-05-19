/**
 * @file errorHandler.js
 * @description 統一錯誤處理系統 - 純函數式風格實現
 * @version 3.0.0
 */

import dayjs from "dayjs";
import { z } from "zod";

//! =============== 1. 錯誤類型定義 ===============
//* 定義應用中可能出現的各種錯誤類型，便於分類處理

/**
 * 錯誤類型枚舉
 */
export const ErrorType = {
  /** API 相關錯誤 */
  API: "API_ERROR",
  /** 資料驗證錯誤 */
  VALIDATION: "VALIDATION_ERROR",
  /** 業務邏輯錯誤 */
  BUSINESS: "BUSINESS_ERROR",
  /** 表單處理錯誤 */
  FORM: "FORM_ERROR",
  /** 狀態轉換錯誤 */
  STATE_TRANSITION: "STATE_TRANSITION_ERROR",
  /** 日期時間錯誤 */
  DATE_TIME: "DATE_TIME_ERROR",
  /** 權限錯誤 */
  PERMISSION: "PERMISSION_ERROR",
  /** 未知錯誤 */
  UNKNOWN: "UNKNOWN_ERROR",
};

/**
 * 錯誤嚴重程度枚舉
 */
export const ErrorSeverity = {
  /** 嚴重錯誤 - 中斷操作 */
  CRITICAL: "CRITICAL",
  /** 錯誤 - 操作失敗但系統可繼續運行 */
  ERROR: "ERROR",
  /** 警告 - 可能有問題但不影響主要功能 */
  WARNING: "WARNING",
  /** 提示 - 輕微問題或建議 */
  INFO: "INFO",
};

//! =============== 2. 錯誤處理工廠函數 ===============
//* 使用工廠函數創建結構化錯誤對象，完全採用函數式風格

/**
 * @function createError
 * @description 創建標準化錯誤對象
 * @param {string} message - 錯誤訊息
 * @param {Object} options - 錯誤選項
 * @returns {Object} 標準化錯誤對象
 */
export const createError = (message, options = {}) => {
  const {
    type = ErrorType.UNKNOWN,
    severity = ErrorSeverity.ERROR,
    details = {},
    name = "AppError",
    cause = null,
  } = options;

  // 創建基礎錯誤對象
  const error = {
    message,
    name,
    type,
    severity,
    details,
    timestamp: dayjs().format(),
    cause,
    toUserMessage: () => message,
    toLogFormat: () => ({
      timestamp: error.timestamp,
      type: error.type,
      severity: error.severity,
      message: error.message,
      details: error.details,
      stack: new Error(message).stack,
    }),
  };

  return error;
};

/**
 * @function createValidationError
 * @description 創建驗證錯誤
 * @param {string} message - 錯誤訊息
 * @param {Object} details - 詳細信息
 * @returns {Object} 驗證錯誤對象
 */
export const createValidationError = (message, details = {}) => {
  return createError(message, {
    type: ErrorType.VALIDATION,
    severity: ErrorSeverity.ERROR,
    details,
    name: "ValidationError",
  });
};

/**
 * @function createFormError
 * @description 創建表單錯誤
 * @param {string} message - 錯誤訊息
 * @param {Object} details - 詳細信息
 * @returns {Object} 表單錯誤對象
 */
export const createFormError = (message, details = {}) => {
  return createError(message, {
    type: ErrorType.FORM,
    severity: ErrorSeverity.ERROR,
    details,
    name: "FormError",
  });
};

/**
 * @function createStateTransitionError
 * @description 創建狀態轉換錯誤
 * @param {string} message - 錯誤訊息
 * @param {Object} details - 詳細信息
 * @returns {Object} 狀態轉換錯誤對象
 */
export const createStateTransitionError = (message, details = {}) => {
  return createError(message, {
    type: ErrorType.STATE_TRANSITION,
    severity: ErrorSeverity.ERROR,
    details,
    name: "StateTransitionError",
  });
};

/**
 * @function createDateTimeError
 * @description 創建日期時間錯誤
 * @param {string} message - 錯誤訊息
 * @param {Object} details - 詳細信息
 * @returns {Object} 日期時間錯誤對象
 */
export const createDateTimeError = (message, details = {}) => {
  return createError(message, {
    type: ErrorType.DATE_TIME,
    severity: ErrorSeverity.ERROR,
    details,
    name: "DateTimeError",
  });
};

/**
 * @function createApiError
 * @description 創建API錯誤
 * @param {string} message - 錯誤訊息
 * @param {Object} details - 詳細信息
 * @returns {Object} API錯誤對象
 */
export const createApiError = (message, details = {}) => {
  return createError(message, {
    type: ErrorType.API,
    severity: ErrorSeverity.ERROR,
    details,
    name: "ApiError",
  });
};

//! =============== 3. 錯誤處理函數 ===============
//* 提供統一錯誤處理功能

/**
 * @function isAppError
 * @description 檢查是否為應用錯誤
 * @param {any} error - 要檢查的對象
 * @returns {boolean} 是否為應用錯誤
 */
export const isAppError = (error) => {
  return error && 
    typeof error === 'object' && 
    typeof error.toUserMessage === 'function' && 
    typeof error.type === 'string';
};

/**
 * @function isValidationError
 * @description 檢查是否為驗證錯誤
 * @param {any} error - 要檢查的對象
 * @returns {boolean} 是否為驗證錯誤
 */
export const isValidationError = (error) => {
  return isAppError(error) && error.type === ErrorType.VALIDATION;
};

/**
 * @function isStateTransitionError
 * @description 檢查是否為狀態轉換錯誤
 * @param {any} error - 要檢查的對象
 * @returns {boolean} 是否為狀態轉換錯誤
 */
export const isStateTransitionError = (error) => {
  return isAppError(error) && error.type === ErrorType.STATE_TRANSITION;
};

/**
 * @function handleFormError
 * @description 處理表單錯誤，統一格式化為用戶友好的訊息
 * @param {Error|Object} error - 錯誤對象
 * @returns {string} 用戶友好的錯誤訊息
 */
export const handleFormError = (error) => {
  // 應用自定義錯誤
  if (isAppError(error)) {
    return error.toUserMessage();
  }
  
  // Zod 驗證錯誤
  if (error.name === "ZodError") {
    // 提取第一個驗證錯誤（最常見的情況）
    const firstError = error.errors?.[0];
    if (firstError) {
      // 格式化路徑，如 "data.user.name" 變成 "使用者名稱"
      const path = firstError.path
        .map(segment => {
          // 這裡可以添加欄位名稱映射
          const fieldNameMap = {
            'start': '開始時間',
            'end': '結束時間',
            'group': '機台編號',
            'area': '區域',
            'reason': '原因',
            'product': '產品',
            // 可擴展更多欄位映射
          };
          return fieldNameMap[segment] || segment;
        })
        .join(' > ');
      
      // 如果有路徑，加入到訊息中
      if (path) {
        return `${path}: ${firstError.message}`;
      }
      return firstError.message;
    }
    return "表單驗證失敗";
  }
  
  // 非預期的錯誤，登記到日誌
  console.error("未處理的錯誤類型:", error);
  return "操作失敗，請稍後再試";
};

/**
 * @function createErrorLogger
 * @description 創建錯誤日誌記錄器
 * @param {Object} options - 配置選項
 * @returns {Function} 錯誤日誌函數
 */
export const createErrorLogger = (options = {}) => {
  const defaultOptions = {
    logLevel: "error",
    includeStackTrace: true,
    shouldLogToConsole: true,
    shouldLogToServer: false,
    serverEndpoint: "/api/logs",
  };
  
  const config = { ...defaultOptions, ...options };
  
  /**
   * 記錄錯誤到控制台和/或伺服器
   * @param {Error|Object} error - 錯誤對象 
   * @param {Object} context - 錯誤上下文
   */
  return (error, context = {}) => {
    // 標準化錯誤對象
    const standardError = isAppError(error)
      ? error 
      : createError(error?.message || "未知錯誤", {
          type: ErrorType.UNKNOWN,
          severity: ErrorSeverity.ERROR,
          details: { originalError: error },
          cause: error
        });
    
    // 記錄到控制台
    if (config.shouldLogToConsole) {
      const logData = standardError.toLogFormat();
      
      // 添加上下文
      const logEntry = {
        ...logData,
        context: {
          ...context,
          timestamp: new Date().toISOString(),
          appVersion: process.env.REACT_APP_VERSION || "未知",
        }
      };
      
      // 根據不同的嚴重程度使用不同的日誌函數
      switch (standardError.severity) {
        case ErrorSeverity.CRITICAL:
        case ErrorSeverity.ERROR:
          console.error("錯誤:", logEntry);
          break;
        case ErrorSeverity.WARNING:
          console.warn("警告:", logEntry);
          break;
        case ErrorSeverity.INFO:
        default:
          console.info("提示:", logEntry);
          break;
      }
    }
    
    // 記錄到伺服器 (可擴展實現)
    if (config.shouldLogToServer) {
      // 實作伺服器日誌記錄邏輯
      // 例如使用 fetch 發送到後端 API
    }
    
    // 返回標準化的錯誤，以便調用者可以進一步處理
    return standardError;
  };
};

// 導出一個默認配置的錯誤日誌記錄器實例
export const logError = createErrorLogger();

/**
 * @function formatZodErrors
 * @description 格式化 Zod 驗證錯誤為易讀結構
 * @param {Error} error - Zod 錯誤對象
 * @returns {Object} 格式化的錯誤信息
 */
export const formatZodErrors = (error) => {
  if (error.name !== "ZodError") return { _errors: [error.message] };
  
  // 將 Zod 錯誤轉換為易於消費的格式
  const formattedErrors = {};
  
  error.errors.forEach(err => {
    const path = err.path.join('.');
    if (!formattedErrors[path]) {
      formattedErrors[path] = [];
    }
    formattedErrors[path].push(err.message);
  });
  
  return formattedErrors;
};

/**
 * @function throwError
 * @description 抛出錯誤輔助函數，使錯誤處理更加函數式
 * @param {Function} errorCreator - 創建錯誤的函數
 * @param {string} message - 錯誤訊息
 * @param {Object} details - 錯誤詳情
 * @throws {Error} 抛出標準錯誤對象
 */
export const throwError = (errorCreator, message, details = {}) => {
  const error = errorCreator(message, details);
  throw error;
};

// 對於向後兼容性，提供舊名稱的別名
// 讓舊代碼中的 throw new StateTransitionError() 可以修改為 throw createStateTransitionError()
export const StateTransitionError = createStateTransitionError;
export const ValidationError = createValidationError;
export const FormError = createFormError;
export const DateTimeError = createDateTimeError;
export const ApiError = createApiError;
export const StatusError = createStateTransitionError; // 舊名稱別名
