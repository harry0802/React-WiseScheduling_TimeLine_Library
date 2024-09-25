import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// 設置 dayjs 插件
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 將檢驗數據轉換為 API 所需的格式，並自動處理時間轉換
 * @param {Array} inspectionData - 包含檢驗數據的對象數組
 * @param {string} inspectionType - 檢驗類型
 * @returns {Array} - 轉換後符合 API 格式的數組
 */
export const formatInspectionDataForApi = (
  inspectionData,
  inspectionType,
  inspect
) => {
  return inspectionData.map((item) => ({
    // id: +item.id,
    productionScheduleId: +item.id,
    inspectionQuantity: +item.inspectionQuantity,
    goodQuantity: +item.goodQuantity,
    inspector: inspect,
    inspectionDate: formatDate(item.inspectionDate),
    inspectionType: inspectionType,
  }));
};

/**
 * 格式化日期為 API 所需的格式
 * @param {string|Date} date - 要格式化的日期
 * @returns {string} - 格式化後的日期字符串
 */
const formatDate = (date) => {
  console.log(date);

  if (!date) {
    // 如果沒有提供日期，使用當前時間
    return dayjs().tz("Asia/Taipei").format("YYYY-MM-DD HH:mm:ssZ");
  }

  return dayjs(date).tz("Asia/Taipei").format("YYYY-MM-DD HH:mm:ssZ");
};

// 使用示例：
// const apiData = formatInspectionDataForApi(originalData);
