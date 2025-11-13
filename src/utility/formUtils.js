import dayjs from "dayjs";

//  將初始表單值格式化
// values: 原始的數據對象
// fields: 包含表單欄位定義的數組
// 該函數會遍歷每個數據，根據欄位的類型來處理數據的格式，特別是處理日期格式
export function formatInitialValues(values, fields) {
  if (!values) return {};
  // loop values 的每個鍵值對 使用 objects 轉換 value
  return Object.entries(values).reduce((acc, [key, value]) => {
    // 查找對應的表單欄位配置
    const field = fields.find((f) => f.name === key);
    acc[key] = field?.type === "date" && value ? dayjs(value) : value;
    // 將結果累加到 acc 對象中
    return acc;
  }, {});
}

// 將提交的表單值進行格式化
// values: 要提交的數據對象
// 該函數會將日期類型的 dayjs 對象轉換為指定的日期格式字符串 (YYYY-MM-DD)
export function formatSubmitValues(values) {
  return Object.entries(values).reduce((acc, [key, value]) => {
    acc[key] = dayjs.isDayjs(value) ? value.format("YYYY-MM-DD") : value;
    return acc;
  }, {});
}
