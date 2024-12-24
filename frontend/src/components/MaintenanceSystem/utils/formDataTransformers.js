// 將表單資料轉換為 API 格式
export const transformFormToApi = (formData, type, originalData) => {
  const baseData = {
    machineId: originalData.machineId,
    year: originalData.year,
    week: originalData.week,
  };

  // 將 checkItems 展開成個別欄位
  const checkItemsData = Object.entries(formData.checkItems).reduce(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {}
  );

  // 根據不同類型加入不同的人員和日期資訊
  const personnelData = {
    [type]: formData.personnel,
    [`${type}Date`]: formData.date,
  };

  return {
    ...baseData,
    ...checkItemsData,
    ...personnelData,
  };
};
