export const transformApiToForm = (apiData, type) => {
  if (!apiData?.data) return null;

  // 取得第一筆資料作為基礎資訊
  const baseData = apiData.data[0];

  // 根據不同類型返回不同資料結構
  switch (type) {
    case "inspector":
      return {
        checkItems: apiData.data.reduce((acc, item) => {
          acc[item.maintenanceItem] = item.inspectionResult;
          return acc;
        }, {}),
        personnel: baseData.inspector,
        date: baseData.inspectionDate,
      };

    case "reinspector":
      return {
        checkItems: apiData.data.reduce((acc, item) => {
          acc[item.maintenanceItem] = item.reinspectionResult;
          return acc;
        }, {}),
        personnel: baseData.reinspector,
        date: baseData.reinspectionDate,
      };

    case "approver":
      return {
        checkItems: apiData.data.reduce((acc, item) => {
          acc[item.maintenanceItem] = item.approvalResult;
          return acc;
        }, {}),
        personnel: baseData.approver,
        date: baseData.approvalDate,
      };

    default:
      return null;
  }
};

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
