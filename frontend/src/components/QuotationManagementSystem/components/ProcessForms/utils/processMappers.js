import {
  BASIC_PROCESS_TYPES,
  PROCESS_TYPES,
} from "../../../config/processTypes_v1";

export const processMappers = {
  processTypes: {
    toOptions: (data) =>
      data.map(({ id, processCategory }) => ({
        value: id,
        label: processCategory,
      })),

    toSubtypeOptions: (data) =>
      data.map((item) => ({
        value: item.processSN,
        label: item.processName,
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
      const category = BASIC_PROCESS_TYPES.find(
        (basic) => basic.id === categoryId
      );
      return type.processCategory === category?.processCategory;
    });
  },
};
