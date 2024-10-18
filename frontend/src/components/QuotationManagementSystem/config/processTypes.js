// 引入共用的字段和部分定義，以及 createField 函數
import { commonFields, commonSections, createField } from "./commonConfigs";

// 製程類型定義
export const PROCESS_TYPES = {
  APPEARANCE_INSPECTION: {
    key: "APPEARANCE_INSPECTION",
    value: "製程3 廠內外觀整修",
  },
  TRANSPORTATION: {
    key: "TRANSPORTATION",
    value: "製程6 運輸費用",
  },
  INTERNAL_APPEARANCE_REPAIR: {
    key: "INTERNAL_APPEARANCE_REPAIR",
    value: "廠內-外觀修整",
  },
  INTERNAL_SHIPPING_INSPECTION: {
    key: "INTERNAL_SHIPPING_INSPECTION",
    value: "製程5 廠內出貨檢驗",
  },
};

// 製程類型選項
export const PROCESS_TYPE_OPTIONS = Object.values(PROCESS_TYPES).map(
  ({ key, value }) => ({
    value: key,
    label: value,
  })
);

// 修改：製程子類型定義
export const PROCESS_SUBTYPES = {
  [PROCESS_TYPES.APPEARANCE_INSPECTION.key]: [
    { key: "subtype1", value: "子類型1", label: "子類型1" },
    { key: "subtype2", value: "子類型2", label: "子類型2" },
    { key: "subtype3", value: "子類型3", label: "子類型3" },
  ],
  [PROCESS_TYPES.TRANSPORTATION.key]: [
    { key: "land", value: "陸運", label: "陸運" },
    { key: "sea", value: "海運", label: "海運" },
    { key: "air", value: "空運", label: "空運" },
  ],
  [PROCESS_TYPES.INTERNAL_APPEARANCE_REPAIR.key]: [
    { key: "light", value: "輕度修整", label: "輕度修整" },
    { key: "medium", value: "中度修整", label: "中度修整" },
    { key: "heavy", value: "重度修整", label: "重度修整" },
  ],
  [PROCESS_TYPES.INTERNAL_SHIPPING_INSPECTION.key]: [
    { key: "general", value: "一般檢驗", label: "一般檢驗" },
    { key: "strict", value: "嚴格檢驗", label: "嚴格檢驗" },
    { key: "special", value: "特殊檢驗", label: "特殊檢驗" },
  ],
};

// 製程特定配置
const processSpecificConfigs = {
  [PROCESS_TYPES.APPEARANCE_INSPECTION.key]: [
    commonSections.rawMaterialCost,
    commonSections.packagingMaterialCost,
    {
      title: "委外檢查費",
      fields: [
        createField(
          "inspectionFee",
          "單價",
          "number",
          { InputProps: { endAdornment: "元" }, placeholder: "請輸入單價" },
          { required: "單價為必填" }
        ),
      ],
    },
  ],
  [PROCESS_TYPES.TRANSPORTATION.key]: [
    {
      title: "運輸費用",
      fields: [
        createField(
          "transportType",
          "運送",
          "input",
          { placeholder: "請輸入運送方式" },
          { required: "運送方式為必填" }
        ),
        createField(
          "distance",
          "送貨里程(公里)",
          "number",
          {
            InputProps: { endAdornment: "公里" },
            placeholder: "請輸入送貨里程",
          },
          { required: "送貨里程為必填" }
        ),
        createField(
          "time",
          "司機工時",
          "number",
          {
            InputProps: { endAdornment: "小時" },
            placeholder: "請輸入司機工時",
          },
          { required: "司機工時為必填" }
        ),
      ],
    },
    {
      title: "貨運與關稅",
      fields: [
        createField(
          "transportType",
          "貨運",
          "input",
          { placeholder: "請輸入貨運方式" },
          { required: "貨運方式為必填" }
        ),
        createField(
          "distance",
          "運貨費用",
          "number",
          { InputProps: { endAdornment: "元" }, placeholder: "請輸入運貨費用" },
          { required: "運貨費用為必填" }
        ),
        createField(
          "time",
          "關稅",
          "number",
          { InputProps: { endAdornment: "元" }, placeholder: "請輸入關稅" },
          { required: "關稅為必填" }
        ),
      ],
    },
  ],
  [PROCESS_TYPES.INTERNAL_APPEARANCE_REPAIR.key]: [
    commonSections.rawMaterialCost,
    commonSections.packagingMaterialCost,
    {
      title: "廠內檢查費",
      fields: [commonFields.inspectionFee],
    },
  ],
  [PROCESS_TYPES.INTERNAL_SHIPPING_INSPECTION.key]: [
    {
      title: "廠內出貨檢",
      fields: [
        createField(
          "workHours",
          "工時(秒)",
          "number",
          { InputProps: { endAdornment: "秒" }, placeholder: "請輸入工時" },
          { required: "工時為必填" }
        ),
        createField(
          "price",
          "單價",
          "number",
          { InputProps: { endAdornment: "元" }, placeholder: "請輸入單價" },
          { required: "單價為必填" }
        ),
      ],
    },
  ],
};

// 最終導出的表單配置
export const FORM_CONFIGURATIONS = processSpecificConfigs;

// 新增：製程選擇表單配置
export const PROCESS_SELECTION_FORM = [
  {
    title: "製程選擇",
    fields: [
      createField(
        "processType",
        "製程類型",
        "select",
        { placeholder: "請選擇製程類型" },
        { required: "請選擇製程類型" },
        PROCESS_TYPE_OPTIONS
      ),
      createField(
        "processSubtype",
        "製程子類型",
        "select",
        {
          placeholder: "請選擇製程子類型",
          dependsOn: "processType",
          getDependentOptions: (processType) =>
            PROCESS_SUBTYPES[processType] || [],
        },
        { required: "請選擇製程子類型" },
        [] // 初始為空數組
      ),
    ].map((field) => ({ ...field, span: 6 })),
  },
];

// Add a new export for API endpoints
export const API_ENDPOINTS = {
  GET_ALL_PROCESSES: "/processes",
  UPDATE_PROCESS: (type) => `/processes/${type}`,
  DELETE_PROCESS: (type) => `/processes/${type}`,
};
