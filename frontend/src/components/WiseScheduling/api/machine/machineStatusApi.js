/**
 * @file machineStatusApi.js
 * @description 機台狀態 API 服務模組，處理機台狀態相關的 API 請求
 * @version 1.0.0
 */

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置,便於統一管理

/**
 * @constant API_BASE_URL
 * @description API 基礎路徑
 * @type {string}
 */
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * @constant API_ENDPOINTS
 * @description API 端點定義
 * @type {Object}
 */
const API_ENDPOINTS = {
  MACHINE_STATUS: `${API_BASE_URL}/machineStatus`,
  MACHINE_STATUS_OPTIONS: `${API_BASE_URL}/option/machineStatus`,
};

//! =============== 2. 核心功能 ===============
//* 主要業務邏輯區,每個功能都配有詳細說明

/**
 * @function fetchMachineStatusByArea
 * @description 取得某一區域全部機台的狀態
 * @param {string} productionArea - 生產區域
 * @returns {Promise<Array>} - 機台狀態陣列
 * 
 * @example
 * // 取得 A 區機台狀態
 * const machineStatuses = await fetchMachineStatusByArea('A');
 */
export const fetchMachineStatusByArea = async (productionArea) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.MACHINE_STATUS}/?productionArea=${productionArea}`);
    
    if (!response.ok) {
      throw new Error(`網路錯誤 (${response.status}): ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('取得機台狀態失敗:', error);
    throw error;
  }
};

/**
 * @function createMachineStatus
 * @description 新增單一機台狀態
 * @param {Object} machineStatus - 機台狀態資料
 * @returns {Promise<Object>} - 新增後的機台狀態
 * 
 * @example
 * // 新增機台狀態
 * const newStatus = await createMachineStatus({
 *   machineId: 1,
 *   planStartDate: "2025-02-25T00:00:00.000+08:00",
 *   planEndDate: "2025-02-25T00:00:00.000+08:00",
 *   status: "上模與調機",
 *   reason: "停機原因",
 *   product: "產品名稱"
 * });
 */
export const createMachineStatus = async (machineStatus) => {
  try {
    const response = await fetch(API_ENDPOINTS.MACHINE_STATUS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(machineStatus),
    });
    
    if (!response.ok) {
      throw new Error(`網路錯誤 (${response.status}): ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('新增機台狀態失敗:', error);
    throw error;
  }
};

/**
 * @function updateMachineStatus
 * @description 更新單一機台狀態
 * @param {Object} machineStatus - 機台狀態資料
 * @returns {Promise<Object>} - 更新後的機台狀態
 * 
 * @example
 * // 更新機台狀態
 * const updatedStatus = await updateMachineStatus({
 *   id: 1,
 *   planStartDate: "2025-02-25T00:00:00.000+08:00",
 *   planEndDate: "2025-02-25T00:00:00.000+08:00",
 *   actualStartDate: "2025-02-25T00:00:00.000+08:00",
 *   actualEndDate: "2025-02-25T00:00:00.000+08:00",
 *   status: "產品試模",
 *   reason: "停機原因",
 *   product: "產品名稱"
 * });
 */
export const updateMachineStatus = async (machineStatus) => {
  try {
    const response = await fetch(API_ENDPOINTS.MACHINE_STATUS, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(machineStatus),
    });
    
    if (!response.ok) {
      throw new Error(`網路錯誤 (${response.status}): ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('更新機台狀態失敗:', error);
    throw error;
  }
};

/**
 * @function deleteMachineStatus
 * @description 刪除單一機台狀態
 * @param {number|string} id - 機台狀態 ID
 * @returns {Promise<Object>} - 刪除結果
 * 
 * @example
 * // 刪除機台狀態
 * const result = await deleteMachineStatus(1);
 */
export const deleteMachineStatus = async (id) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.MACHINE_STATUS}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`網路錯誤 (${response.status}): ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('刪除機台狀態失敗:', error);
    throw error;
  }
};

/**
 * @function fetchMachineStatusOptions
 * @description 取得機台狀態選項
 * @returns {Promise<Array>} - 機台狀態選項陣列
 * 
 * @example
 * // 取得機台狀態選項
 * const statusOptions = await fetchMachineStatusOptions();
 */
export const fetchMachineStatusOptions = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.MACHINE_STATUS_OPTIONS);
    
    if (!response.ok) {
      throw new Error(`網路錯誤 (${response.status}): ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('取得機台狀態選項失敗:', error);
    throw error;
  }
};

//! =============== 3. 工具函數 ===============
//* 通用功能區,可被多個模組復用

/**
 * @function processMachineStatusData
 * @description 處理機台狀態資料，轉換日期格式等
 * @param {Object} data - 原始機台狀態資料
 * @returns {Object} - 處理後的機台狀態資料
 */
export const processMachineStatusData = (data) => {
  if (!data) return null;
  
  // 處理日期格式
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toISOString();
  };
  
  return {
    ...data,
    planStartDate: formatDate(data.planStartDate),
    planEndDate: formatDate(data.planEndDate),
    actualStartDate: formatDate(data.actualStartDate),
    actualEndDate: formatDate(data.actualEndDate),
  };
};

export default {
  fetchMachineStatusByArea,
  createMachineStatus,
  updateMachineStatus,
  deleteMachineStatus,
  fetchMachineStatusOptions,
  processMachineStatusData
};
