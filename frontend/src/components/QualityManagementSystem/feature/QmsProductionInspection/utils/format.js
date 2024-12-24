import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TZ } from "../../../../../config/config";

// 設置 dayjs 插件
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 將檢驗數據轉換為 API 所需的格式，並自動處理時間轉換
 * @param {Array} inspectionData - 包含檢驗數據的對象數組
 * @param {string} inspectionType - 檢驗類型
 * @returns {Array} - 轉換後符合 API 格式的數組
 */
export function formatInspectionDataForApi(childLots, inspectionType, inspect) {
  const apiData = childLots.map((childLot) => ({
    productionScheduleId: childLot.id,
    inspectionQuantity: childLot.inspectionQuantity,
    goodQuantity: childLot.goodQuantity,
    inspectionType: inspectionType,
    inspector: inspect,
    inspectionDate: formatDate(childLot.inspectionDate),
    // 添加其他需要的字段
  }));

  console.log("Formatted API data:", apiData);
  return apiData;
}

/**
 * 格式化日期為 API 所需的格式
 * @param {string|Date} date - 要格式化的日期
 * @returns {string} - 格式化後的日期字符串
 */
const formatDate = (date) => {
  return dayjs().tz(TZ).format("YYYY-MM-DD HH:mm:ssZ");
};

// 使用示例：
// const apiData = formatInspectionDataForApi(originalData);
