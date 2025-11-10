/**
 * @file testMockDataValidation.js
 * @description 測試綜合 Mock 資料是否能通過所有驗證層
 * @version 1.0.0
 *
 * 測試流程：
 * 1. 生成各種狀態的 Mock 資料
 * 2. 透過 API Transformer 轉換
 * 3. 通過 Validation Schema 驗證
 * 4. 確認可以正確映射到 vis-data 格式
 */

import { MACHINE_STATUS } from '../../configs/validations/schedule/constants';
import { transformApiToInternalFormat } from '../../utils/schedule/transformers/apiTransformers';
import { validateFormData } from '../../configs/validations/schedule/validationSchema';
import { mapItemToVisDataFormat } from '../../configs/validations/schedule/orderItems';
import { generateTestDataForStatus } from './comprehensiveMockData';

//! =============== 1. 測試工具函數 ===============

/**
 * 測試單一狀態的完整流程
 * @param {string} statusType - 狀態類型
 * @returns {Object} 測試結果
 */
function testStatusDataFlow(statusType) {
  console.log(`\n========== 測試 ${statusType} ==========`);

  try {
    // Step 1: 生成 Mock API 資料
    console.log('Step 1: 生成 Mock API 資料...');
    const mockApiData = generateTestDataForStatus(statusType);
    console.log('✅ Mock API 資料:', mockApiData);

    // Step 2: API 轉換為內部格式
    console.log('\nStep 2: API 轉換為內部格式...');
    const internalData = transformApiToInternalFormat(mockApiData);
    if (!internalData) {
      throw new Error('API 轉換失敗');
    }
    console.log('✅ 內部格式資料:', internalData);

    // Step 3: 驗證資料
    console.log('\nStep 3: 驗證資料...');
    const validationResult = validateFormData(statusType, internalData);
    if (!validationResult.success) {
      console.error('❌ 驗證失敗:', validationResult.errors);
      throw new Error('資料驗證失敗');
    }
    console.log('✅ 驗證通過');

    // Step 4: 映射到 vis-data 格式
    console.log('\nStep 4: 映射到 vis-data 格式...');
    const visData = mapItemToVisDataFormat(internalData);
    console.log('✅ vis-data 格式:', visData);

    // Step 5: 檢查必要欄位
    console.log('\nStep 5: 檢查必要欄位...');
    const requiredFields = ['id', 'group', 'start', 'end', 'timeLineStatus'];
    const missingFields = requiredFields.filter(field => !visData[field]);
    if (missingFields.length > 0) {
      throw new Error(`缺少必要欄位: ${missingFields.join(', ')}`);
    }
    console.log('✅ 必要欄位檢查通過');

    return {
      status: statusType,
      success: true,
      mockData: mockApiData,
      internalData,
      visData,
    };
  } catch (error) {
    console.error(`\n❌ ${statusType} 測試失敗:`, error.message);
    return {
      status: statusType,
      success: false,
      error: error.message,
    };
  }
}

//! =============== 2. 批次測試所有狀態 ===============

/**
 * 測試所有狀態類型
 * @returns {Object} 測試結果摘要
 */
export function testAllStatusTypes() {
  console.log('========================================');
  console.log('開始測試所有狀態類型的資料流程');
  console.log('========================================');

  const statusTypes = [
    MACHINE_STATUS.ORDER_CREATED,
    MACHINE_STATUS.IDLE,
    MACHINE_STATUS.SETUP,
    MACHINE_STATUS.TESTING,
    MACHINE_STATUS.STOPPED,
  ];

  const results = statusTypes.map(testStatusDataFlow);

  // 統計結果
  const summary = {
    total: results.length,
    passed: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    results,
  };

  console.log('\n========================================');
  console.log('測試結果摘要');
  console.log('========================================');
  console.log(`總測試數: ${summary.total}`);
  console.log(`通過: ${summary.passed}`);
  console.log(`失敗: ${summary.failed}`);

  if (summary.failed > 0) {
    console.log('\n失敗的測試:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.status}: ${r.error}`);
    });
  }

  return summary;
}

//! =============== 3. 詳細欄位檢查 ===============

/**
 * 檢查資料欄位完整性
 * @param {string} statusType - 狀態類型
 * @returns {Object} 欄位檢查結果
 */
export function checkDataFieldCompleteness(statusType) {
  console.log(`\n檢查 ${statusType} 的欄位完整性`);

  const mockData = generateTestDataForStatus(statusType);
  const internalData = transformApiToInternalFormat(mockData);

  const checks = {
    status: statusType,
    hasBasicFields: !!(internalData.id && internalData.group && internalData.timeLineStatus),
    hasTimeFields: !!(internalData.start && internalData.end),
    hasPlanTime: !!(internalData.planStartTime && internalData.planEndTime),
  };

  // 製令單特定檢查
  if (statusType === MACHINE_STATUS.ORDER_CREATED) {
    checks.hasOrderInfo = !!internalData.orderInfo;
    checks.hasProductName = !!internalData.orderInfo?.productName;
    checks.hasQuantity = typeof internalData.orderInfo?.quantity === 'number';
    checks.statusIsNull = internalData.status === null;
  }
  // 機台狀態特定檢查
  else {
    checks.hasStatus = !!internalData.status;
    checks.orderInfoIsNull = internalData.orderInfo === null;
  }

  console.log('檢查結果:', checks);
  return checks;
}

//! =============== 4. 時間欄位驗證 ===============

/**
 * 驗證時間欄位的邏輯正確性
 * @param {string} statusType - 狀態類型
 * @returns {Object} 時間驗證結果
 */
export function validateTimeFields(statusType) {
  console.log(`\n驗證 ${statusType} 的時間欄位`);

  const mockData = generateTestDataForStatus(statusType);
  const internalData = transformApiToInternalFormat(mockData);

  const timeChecks = {
    status: statusType,
    startBeforeEnd: new Date(internalData.start) < new Date(internalData.end),
    planStartBeforePlanEnd: new Date(internalData.planStartTime) < new Date(internalData.planEndTime),
    hasValidDates: true,
  };

  // 檢查日期是否有效
  const dateFields = [
    internalData.start,
    internalData.end,
    internalData.planStartTime,
    internalData.planEndTime,
  ];

  timeChecks.hasValidDates = dateFields.every(date => {
    if (!date) return true; // 可選欄位
    const d = new Date(date);
    return !isNaN(d.getTime());
  });

  console.log('時間驗證結果:', timeChecks);
  return timeChecks;
}

//! =============== 5. 主要測試入口 ===============

/**
 * 執行完整測試套件
 */
export function runFullTestSuite() {
  console.log('\n🚀 執行完整測試套件\n');

  // 測試 1: 所有狀態類型的資料流程
  const flowTestResults = testAllStatusTypes();

  // 測試 2: 欄位完整性檢查
  console.log('\n\n========== 欄位完整性檢查 ==========');
  const statusTypes = Object.values(MACHINE_STATUS);
  const fieldResults = statusTypes.map(checkDataFieldCompleteness);

  // 測試 3: 時間欄位驗證
  console.log('\n\n========== 時間欄位驗證 ==========');
  const timeResults = statusTypes.map(validateTimeFields);

  // 綜合報告
  console.log('\n\n========================================');
  console.log('完整測試報告');
  console.log('========================================');

  const allPassed = flowTestResults.passed === flowTestResults.total &&
    fieldResults.every(r => r.hasBasicFields && r.hasTimeFields) &&
    timeResults.every(r => r.startBeforeEnd && r.hasValidDates);

  if (allPassed) {
    console.log('✅ 所有測試通過！');
  } else {
    console.log('❌ 部分測試失敗，請檢查上方詳細輸出');
  }

  return {
    flowTestResults,
    fieldResults,
    timeResults,
    allPassed,
  };
}

// 如果直接執行此文件，運行測試
if (typeof window === 'undefined') {
  // Node.js 環境
  runFullTestSuite();
}

// 預設匯出測試函數
export default runFullTestSuite;
