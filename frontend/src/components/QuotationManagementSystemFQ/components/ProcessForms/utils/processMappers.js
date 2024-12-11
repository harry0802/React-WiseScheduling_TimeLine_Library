export const processMappers = {
  processTypes: {
    toOptions: (data) => {
      return data?.map(({ id, processName, processCategory, category }) => ({
        value: category, // 保持 value 為 id
        label: category,
        // 保存額外資料
        processCategory: category,
        // 或者保存整個原始資料
        raw: { id, processName, processCategory },
      }));
    },

    toSubtypeOptions: (data) =>
      data.map(({ id, processSN, processName, processCategory }) => ({
        value: id,
        label: processSN,
        // 保存需要的資料
        id,
        processCategory,
        processName,
      })),
  },
};
