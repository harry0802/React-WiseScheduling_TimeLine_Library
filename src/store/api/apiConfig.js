/**
 * @file apiConfig.js
 * @description API 基礎配置
 * @version 1.0.0
 */

/**
 * API 基礎 URL
 * @type {string}
 */
export const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * API 超時時間（毫秒）
 * @type {number}
 */
export const API_TIMEOUT = 30000;

/**
 * API 版本
 * @type {string}
 */
export const API_VERSION = 'v1';
