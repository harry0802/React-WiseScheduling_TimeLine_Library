import { PROCESS_TYPES } from "../../../../../assets/QuotationManagementSystem copy/config/processTypes_v1";

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

export const processService = {
  getProcessTypes: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return PROCESS_TYPES;
  },

  getProcessSubtypes: async (categoryId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return PROCESS_TYPES.filter((type) => {
      const category = PROCESS_TYPES.find((basic) => basic.id === categoryId);
      return type.processCategory === category?.processCategory;
    });
  },
};
