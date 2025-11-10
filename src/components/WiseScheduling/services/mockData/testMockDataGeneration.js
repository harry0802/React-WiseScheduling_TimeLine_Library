// 測試 Mock 資料生成
import { generateScheduleByArea } from './smartScheduleMockData.js';
import { generateAreaMachineStatus } from './machineStatusMockData.js';

console.log('=== 測試機台資料生成 ===');
const machines = generateAreaMachineStatus('A');
console.log('A 區機台數量:', machines.length);
console.log('第一台機器:', machines[0]);

console.log('\n=== 測試排程資料生成 ===');
const schedules = generateScheduleByArea('A');
console.log('A 區排程數量:', schedules.length);
console.log('第一筆排程:', schedules[0]);

console.log('\n=== 檢查必要欄位 ===');
const schedule = schedules[0];
console.log('timeLineStatus:', schedule.timeLineStatus);
console.log('planOnMachineDate:', schedule.planOnMachineDate);
console.log('planFinishDate:', schedule.planFinishDate);
console.log('machineSN:', schedule.machineSN);
