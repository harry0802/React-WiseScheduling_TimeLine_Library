import { createField, commonFields, commonSections } from "./commonConfigs_v1";
import { machineConfig } from "./machineConfig";

/**
 * 系統架構說明：
 * 1. 常量定義層：定義所有靜態配置和枚舉值
 * 2. 類型定義層：定義表單項的基礎類型和衍生類型
 * 3. 字段定義層：按功能模塊定義各類字段
 * 4. 配置整合層：將所有配置組裝成最終的表單結構
 */

//! =============== 1. 常量定義層 ===============
/**
 * 製程類型定義
 * 使用物件而非枚舉，方便擴展和維護
 */
//  給我所有基本的製程類型
export const BASIC_PROCESS_TYPES = [
  {
    id: 1,
    processCategory: "In-IJ(廠內成型)",
  },
  {
    id: 2,
    processCategory: "Out-IJ(委外成型)",
  },
  {
    id: 3,
    processCategory: "In-BE(廠內後製程)",
  },
  {
    id: 4,
    processCategory: "Out-BE(委外後製程)",
  },
  {
    id: 5,
    processCategory: "In-TS(廠內出貨檢驗)",
  },
];

// 模擬 API 回傳的資料格式
export const PROCESS_TYPES = [
  {
    id: 1,
    processCategory: "In-IJ(廠內成型)",
    processSN: "In-IJ01",
    processName: "廠內-成型-IJ01",
  },
  {
    id: 2,
    processCategory: "In-IJ(廠內成型)",
    processSN: "In-IJ02",
    processName: "廠內-成型-IJ02",
  },
  {
    id: 3,
    processCategory: "Out-IJ(委外成型)",
    processSN: "Out-IJ01",
    processName: "委外-成型-IJ01",
  },
  {
    id: 4,
    processCategory: "Out-IJ(委外成型)",
    processSN: "Out-IJ02",
    processName: "委外-成型-IJ02",
  },
  {
    id: 5,
    processCategory: "In-BE(廠內後製程)",
    processSN: "In-BE01",
    processName: "廠內-後製程-BE01",
  },
  {
    id: 6,
    processCategory: "In-BE(廠內後製程)",
    processSN: "In-BE02",
    processName: "廠內-後製程-BE02",
  },
  {
    id: 7,
    processCategory: "Out-BE(委外後製程)",
    processSN: "Out-BE01",
    processName: "委外-後製程-BE01",
  },
  {
    id: 8,
    processCategory: "Out-BE(委外後製程)",
    processSN: "Out-BE02",
    processName: "委外-後製程-BE02",
  },
  {
    id: 9,
    processCategory: "In-TS(廠內出貨檢驗)",
    processSN: "In-TS01",
    processName: "廠內-出貨檢驗-TS01",
  },
  {
    id: 10,
    processCategory: "In-TS(廠內出貨檢驗)",
    processSN: "In-TS02",
    processName: "廠內-出貨檢驗-TS02",
  },
];

export const PROCESS_TYPE_OPTIONS = PROCESS_TYPES.map(({ id, processSN }) => ({
  value: id,
  label: processSN,
}));

/**
 * 製程子類型配置
 */
const SUBTYPE_CONFIGS = {
  INJECTION: [{ key: "IJ01", value: "IJ01", label: "基礎射出成型" }],
  BACKEND: [
    { key: "BESF", value: "BESF", label: "貼膜" },
    { key: "BEUL", value: "BEUL", label: "超音波(熱熔)" },
  ],
  TEST: [{ key: "TS01", value: "TS01", label: "基礎出貨檢驗" }],
};

/**
 * 各製程類型對應的子類型
 */
export const PROCESS_SUBTYPES = {
  [PROCESS_TYPES[0].id]: SUBTYPE_CONFIGS.INJECTION,
  [PROCESS_TYPES[1].id]: SUBTYPE_CONFIGS.INJECTION,
  [PROCESS_TYPES[2].id]: SUBTYPE_CONFIGS.BACKEND,
  [PROCESS_TYPES[3].id]: SUBTYPE_CONFIGS.BACKEND,
  [PROCESS_TYPES[4].id]: SUBTYPE_CONFIGS.TEST,
};

//! =============== 2. 類型定義層 ===============
class FormItem {
  constructor(type, title) {
    this.type = type;
    this.title = title;
  }
}

class GeneralFormItem extends FormItem {
  constructor(title, fields) {
    super("general", title);
    this.fields = fields;
  }
}

class TodoListFormItem extends FormItem {
  constructor(title, items) {
    super("todolist", title);
    this.items = items;
  }
}

class NestedFormItem extends FormItem {
  constructor(title, items) {
    super("nested", title);
    this.items = items;
  }
}

class FormSection {
  constructor(title, items) {
    this.title = title;
    this.items = items;
  }
}

//! =============== 3. 表單配置整合層 ===============
/**
 * 各製程類型的表單配置
 */
export const FORM_CONFIGURATIONS = {
  [PROCESS_TYPES[0].id]: new FormSection("廠內成型製程", [
    new NestedFormItem("材料相關費用", [
      new GeneralFormItem("材料成本設置", [
        commonSections.materialCostSetting.fields,
      ]),
      new TodoListFormItem("材料成本", commonSections.materialCosts.fields),
    ]),
    new TodoListFormItem("包裝材料費", commonSections.packagingCosts.fields),
    new GeneralFormItem("成型加工費", [
      createField(
        "machineArea",
        "機台區域",
        "select",
        { placeholder: "請選擇機台區域" },
        { required: "請選擇機台區域" },
        machineConfig.areas?.map((area) => ({
          value: area.value,
          label: area.label,
        })),
        6
      ),
      createField(
        "machineId",
        "機台編號",
        "select",
        {
          placeholder: "請選擇機台編號",
          dependsOn: "machineArea",
          getDependentOptions: (machineArea) => {
            return !machineArea
              ? []
              : machineConfig.areas
                  .find((area) => area.value === machineArea)
                  ?.machines?.map((machine) => ({
                    value: machine.value,
                    label: `${machine.label}_$${machine.rate}`,
                  })) || [];
          },
        },
        { required: "請選擇機台編號" },
        [],
        6
      ),
      createField(
        "workHourRatio",
        "工時比例",
        "number",
        { placeholder: "請輸入工時比例", InputProps: { endAdornment: "%" } },
        { required: "工時比例為必填" }
      ),
      createField(
        "defectRate",
        "不良率",
        "number",
        { placeholder: "請輸入不良率", InputProps: { endAdornment: "%" } },
        { required: "不良率為必填" }
      ),
      createField(
        "shallowPackageTime",
        "淺包工時",
        "number",
        { placeholder: "請輸入淺包工時", InputProps: { endAdornment: "秒" } },
        { required: "淺包工時必填" }
      ),
      createField(
        "moldingCycle",
        "成型週期",
        "number",
        { placeholder: "請輸入成型週期", InputProps: { endAdornment: "秒" } },
        { required: "成型週期為必填" }
      ),
      createField(
        "holeCount",
        "穴數",
        "number",
        { placeholder: "請輸入穴數" },
        { required: "穴數為必填" }
      ),
    ]),
  ]),

  [PROCESS_TYPES[1].id]: new FormSection("委外成型製程", [
    new NestedFormItem("材料相關費用", [
      new GeneralFormItem("材料成本設置", [
        commonSections.materialCostSetting.fields,
      ]),
      new TodoListFormItem("材料成本", commonSections.materialCosts.fields),
    ]),
    new TodoListFormItem("包裝材料費", commonSections.packagingCosts.fields),
    new TodoListFormItem(
      "委外加工費",
      commonSections.outsourcedProcessingCosts.fields
    ),
  ]),

  [PROCESS_TYPES[2].id]: new FormSection("廠內後製程", [
    new NestedFormItem("材料相關費用", [
      new GeneralFormItem("材料成本設置", [
        commonSections.materialCostSetting.fields,
      ]),
      new TodoListFormItem("材料成本", commonSections.materialCosts.fields),
    ]),
    new TodoListFormItem("包裝材料費", commonSections.packagingCosts.fields),
    new TodoListFormItem(
      "廠內加工費",
      commonSections.internalProcessingCosts.fields
    ),
  ]),

  [PROCESS_TYPES[3].id]: new FormSection("委外後製程", [
    new NestedFormItem("材料相關費用", [
      new GeneralFormItem("材料成本設置", [
        commonSections.materialCostSetting.fields,
      ]),
      new TodoListFormItem("材料成本", commonSections.materialCosts.fields),
    ]),
    new TodoListFormItem("包裝材料費", commonSections.packagingCosts.fields),
    new TodoListFormItem(
      "委外加工費",
      commonSections.outsourcedProcessingCosts.fields
    ),
  ]),

  [PROCESS_TYPES[4].id]: new FormSection("廠內出貨檢驗", [
    new TodoListFormItem(
      "檢驗費用",
      commonSections.internalProcessingCosts.fields
    ),
  ]),

  TRANSPORTATION: new FormSection("運輸費用與貨運關稅", [
    new TodoListFormItem("運輸費用", commonSections.freightCosts.fields),
    new TodoListFormItem("貨運關稅", commonSections.customsDutyCosts.fields),
  ]),
};

// 1. API 層 - 可以直接用於 RTK Query
export const processApi = {
  getProcessTypes: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return PROCESS_TYPES;
  },

  getProcessSubtypes: async (categoryId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return PROCESS_TYPES.filter((item) => item.id === categoryId);
  },
};

// 2. 選項轉換工具 - 可重用於 RTK
export const processMappers = {
  toTypeOptions: (data) =>
    data.map(({ id, processCategory }) => ({
      value: id,
      label: processCategory,
    })),

  toSubtypeOptions: (data) =>
    data.map((item) => ({
      value: item.processSN,
      label: item.processName,
    })),
};

/**
 * 製程選擇表單配置
 */
export const PROCESS_SELECTION_FORM = [
  {
    title: "製程選擇",
    fields: [
      createField(
        "processCategory",
        "製程類型",
        "select",
        {
          placeholder: "請選擇製程類型",
        },
        { required: "製程類型為必填" },
        [], // options 將由組件提供
        6
      ),
      createField(
        "processSN",
        "製程代號",
        "select",
        {
          placeholder: "請選擇製程代號",
          dependsOn: "processCategory",
        },
        { required: "製程代號為必填" },
        [], // options 將由組件提供
        6
      ),
    ],
  },
];
// 未來遷移到 RTK Query 時：
/*
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { processMappers } from '../../config/processTypes_v1';

export const processApi = createApi({
  reducerPath: 'processApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProcessTypes: builder.query({
      query: () => 'process-types',
      transformResponse: processMappers.toTypeOptions,
    }),
    getProcessSubtypes: builder.query({
      query: (categoryId) => `process-types/${categoryId}/subtypes`,
      transformResponse: processMappers.toSubtypeOptions,
    }),
  }),
});

export const {
  useGetProcessTypesQuery,
  useGetProcessSubtypesQuery,
} = processApi;
*/
/*
createField(
  "processCategory",
  "製程類型",
  "select",
  {
    placeholder: "請選擇製程類型",
    useQuery: useGetProcessTypesQuery,
  },
  { required: "製程類型為必填" },
  [],
  6
),
*/
