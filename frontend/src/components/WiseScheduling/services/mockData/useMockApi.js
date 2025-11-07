/**
 * @file useMockApi.js
 * @description Mock API 開關和配置
 * @version 1.0.0
 */

/**
 * 是否啟用 Mock API
 * @type {boolean}
 * 設為 true 時使用假資料，false 時使用真實 API
 */
export const USE_MOCK_API = true;

/**
 * Mock API 延遲時間（毫秒）
 * @type {number}
 * 模擬網路延遲
 */
export const MOCK_API_DELAY = 300;

/**
 * 模擬 API 延遲
 * @param {number} ms - 延遲時間（毫秒）
 * @returns {Promise} Promise 對象
 */
export const delay = (ms = MOCK_API_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, ms));
