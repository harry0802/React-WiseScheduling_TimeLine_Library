/**
 * @file testMockData.js
 * @description 測試 Mock 資料生成是否正確
 * @usage node testMockData.js
 */

import { generateAreaMachineStatus, generateAllMachineStatus } from './machineStatusMockData.js';

console.log('=== Testing Mock Data Generation ===\n');

// 測試單一區域
console.log('1. Testing Area A:');
const areaAData = generateAreaMachineStatus('A');
console.log(`   - Total machines: ${areaAData.length}`);
console.log(`   - First machine:`, JSON.stringify(areaAData[0], null, 2));

// 測試所有區域
console.log('\n2. Testing All Areas:');
const allData = generateAllMachineStatus();
Object.keys(allData).forEach(area => {
  console.log(`   - Area ${area}: ${allData[area].length} machines`);
});

// 驗證資料結構
console.log('\n3. Validating Data Structure:');
const sampleMachine = areaAData[0];
const requiredFields = [
  'machine',
  'machineStatusId',
  'machineId',
  'status',
  'planStartDate',
  'planEndDate',
  'actualStartDate',
];

const hasAllFields = requiredFields.every(field => field in sampleMachine);
console.log(`   - Has all required fields: ${hasAllFields ? '✓' : '✗'}`);

// 檢查狀態值
const validStatuses = ['RUN', 'IDLE', 'TUNING', 'TESTING', 'OFFLINE'];
const allStatusesValid = areaAData.every(m => validStatuses.includes(m.status));
console.log(`   - All statuses are valid: ${allStatusesValid ? '✓' : '✗'}`);

console.log('\n=== Test Complete ===');
