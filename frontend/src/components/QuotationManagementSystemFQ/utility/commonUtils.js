export const convertToPercentage = (value) => {
  const numValue = +value;
  // 已經是小於1的小數,直接返回
  if (numValue < 1) return parseFloat(numValue.toFixed(3));
  // 否則視為百分比轉小數
  return parseFloat((numValue / 100).toFixed(3));
};

// 轉換百分比
export const convertToDisplayPercentage = (value) => {
  if (!value && value !== 0) return 0;
  const numValue = +value;
  // 已經是大於1的值,直接返回
  if (numValue >= 1) return parseFloat(numValue.toFixed(3));
  // 否則轉為百分比
  return parseFloat((numValue * 100).toFixed(3));
};
// 轉換報價單回傳的數據
export const transformResponse = (response) => {
  if (!response?.data) return response;
  const data = response.data;
  return {
    ...response,
    data: {
      ...data,
      overheadRnd: convertToDisplayPercentage(data.overheadRnd),
      profit: convertToDisplayPercentage(data.profit),
      risk: convertToDisplayPercentage(data.risk),
      annualDiscount: convertToDisplayPercentage(data.annualDiscount),
      rebate: convertToDisplayPercentage(data.rebate),
      processes: data.processes?.map((process) => ({
        ...process,
        FQMaterialCostSetting: {
          ...process?.FQMaterialCostSetting,
          estimatedDefectRate: convertToDisplayPercentage(
            process?.FQMaterialCostSetting?.estimatedDefectRate
          ),
          estimatedMaterialFluctuation: convertToDisplayPercentage(
            process?.FQMaterialCostSetting?.estimatedMaterialFluctuation
          ),
        },
        FQInjectionMoldingCosts: process?.FQInjectionMoldingCosts?.map(
          (cost) => ({
            ...cost,
            workHoursRatio: convertToDisplayPercentage(cost?.workHoursRatio),
            defectiveRate: convertToDisplayPercentage(cost?.defectiveRate),
          })
        ),
      })),
    },
  };
};
