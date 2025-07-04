/**
 * @file test_apiTransformers.js
 * @description 資料完整性測試 - 驗證 apiTransformers 修改後的行為
 * @version 1.0.0
 * @created 2025-01-04
 */

import { transformApiToInternalFormat } from "./apiTransformers.js";

/**
 * 測試用例：驗證新的時間處理邏輯
 */
function testTimeLogicChanges() {
  console.log("🧪 開始測試 apiTransformers 時間邏輯修改...\n");

  // 測試案例 1: 正常的計劃時間資料
  const testCase1 = {
    timeLineStatus: "製令單",
    machineSN: "A1",
    productionArea: "A",
    planOnMachineDate: "2025-01-05T08:00:00Z",
    planFinishDate: "2025-01-05T16:00:00Z",
    actualOnMachineDate: "2025-01-05T09:00:00Z", // 實際時間 (應該被忽略)
    actualFinishDate: "2025-01-05T17:00:00Z", // 實際時間 (應該被忽略)
    productName: "測試產品A",
    workOrderSN: "WO-001",
  };

  // 測試案例 2: planFinishDate 為空的情況
  const testCase2 = {
    timeLineStatus: "製令單",
    machineSN: "A2",
    productionArea: "A",
    planOnMachineDate: "2025-01-05T08:00:00Z",
    planFinishDate: null, // 測試後備邏輯
    actualOnMachineDate: "2025-01-05T09:00:00Z",
    actualFinishDate: "2025-01-05T17:00:00Z",
    productName: "測試產品B",
    workOrderSN: "WO-002",
  };

  // 測試案例 3: planOnMachineDate 為空的情況 (錯誤案例)
  const testCase3 = {
    timeLineStatus: "製令單",
    machineSN: "A3",
    productionArea: "A",
    planOnMachineDate: null, // 可能導致 Invalid Date
    planFinishDate: "2025-01-05T16:00:00Z",
    actualOnMachineDate: "2025-01-05T09:00:00Z",
    actualFinishDate: "2025-01-05T17:00:00Z",
    productName: "測試產品C",
    workOrderSN: "WO-003",
  };

  const testCases = [
    { name: "正常計劃時間", data: testCase1 },
    { name: "planFinishDate 為空", data: testCase2 },
    { name: "planOnMachineDate 為空", data: testCase3 },
  ];

  testCases.forEach((testCase, index) => {
    console.log(`\n📋 測試案例 ${index + 1}: ${testCase.name}`);
    console.log("輸入資料:", {
      planOnMachineDate: testCase.data.planOnMachineDate,
      planFinishDate: testCase.data.planFinishDate,
      actualOnMachineDate: testCase.data.actualOnMachineDate,
      actualFinishDate: testCase.data.actualFinishDate,
    });

    try {
      const result = transformApiToInternalFormat(testCase.data);

      if (result) {
        console.log("✅ 轉換成功");
        console.log("輸出時間:", {
          start: result.start,
          end: result.end,
          scheduledStartTime: result.orderInfo?.scheduledStartTime,
          scheduledEndTime: result.orderInfo?.scheduledEndTime,
          actualStartTime: result.orderInfo?.actualStartTime,
          actualEndTime: result.orderInfo?.actualEndTime,
        });

        // 驗證時間有效性
        const isStartValid =
          result.start && !isNaN(new Date(result.start).getTime());
        const isEndValid = result.end && !isNaN(new Date(result.end).getTime());

        console.log("🔍 時間有效性檢查:");
        console.log(`  - 開始時間: ${isStartValid ? "✅ 有效" : "❌ 無效"}`);
        console.log(`  - 結束時間: ${isEndValid ? "✅ 有效" : "❌ 無效"}`);

        if (isStartValid && isEndValid) {
          const duration =
            new Date(result.end).getTime() - new Date(result.start).getTime();
          console.log(`  - 持續時間: ${duration / (1000 * 60 * 60)} 小時`);
        }
      } else {
        console.log("❌ 轉換失敗: 返回 null");
      }
    } catch (error) {
      console.log("❌ 轉換出錯:", error.message);
    }
  });

  console.log("\n🎯 測試總結:");
  console.log("1. 檢查是否正確使用計劃時間而非實際時間");
  console.log("2. 驗證後備邏輯是否正常工作");
  console.log("3. 確認空值處理不會導致 Invalid Date");
}

// 執行測試 (在開發環境中可以取消註解)
// testTimeLogicChanges();

export { testTimeLogicChanges };
