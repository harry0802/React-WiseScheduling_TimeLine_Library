import { getMachinesByArea } from "../../../config/config";
import { createField, commonFields, commonSections } from "./commonConfigs";
import { machineConfig } from "./machineConfig";

// 定義製程類型
export const PROCESS_TYPES = {
  // 添加工廠內製程 - 成型
  FACTORY_INTERNAL_SHAPING: {
    key: "FACTORY_INTERNAL_SHAPING",
    value: "工廠內成型製程",
  },
  //  委外成型
  OUT_SHAPING: {
    key: "OUT_SHAPING",
    value: "委外成型",
  },
  // 添加工廠內製程 - 後製
  FACTORY_INTERNAL_FINISHING: {
    key: "FACTORY_INTERNAL_FINISHING",
    value: "工廠內後製程",
  },

  APPEARANCE_INSPECTION: {
    key: "APPEARANCE_INSPECTION",
    value: "廠內外觀整修",
  },
  INTERNAL_SHIPPING_INSPECTION: {
    key: "INTERNAL_SHIPPING_INSPECTION",
    value: "廠內出貨檢驗",
  },
  TRANSPORTATION: {
    key: "TRANSPORTATION",
    value: "運輸費用",
  },
};

// 製程類型選項
export const PROCESS_TYPE_OPTIONS = Object.values(PROCESS_TYPES).map(
  ({ key, value }) => ({
    value: key,
    label: value,
  })
);

// 製程子類型定義
export const PROCESS_SUBTYPES = {
  // 成型製程
  [PROCESS_TYPES.FACTORY_INTERNAL_SHAPING.key]: [
    { key: "casting", value: "鑄造成型", label: "鑄造成型" },
    { key: "molding", value: "模具成型", label: "模具成型" },
    { key: "extrusion", value: "擠出成型", label: "擠出成型" },
  ],
  // 委外成型
  [PROCESS_TYPES.OUT_SHAPING.key]: [
    { key: "casting", value: "鑄造成型", label: "鑄造成型" },
    { key: "molding", value: "模具成型", label: "模具成型" },
    { key: "extrusion", value: "擠出成型", label: "擠出成型" },
  ],

  // 後製製程
  [PROCESS_TYPES.FACTORY_INTERNAL_FINISHING.key]: [
    { key: "polishing", value: "拋光", label: "拋光" },
    { key: "coating", value: "塗裝", label: "塗裝" },
    { key: "assembly", value: "組裝", label: "組裝" },
  ],

  // 外觀檢查
  [PROCESS_TYPES.APPEARANCE_INSPECTION.key]: [
    { key: "visual", value: "目視檢查", label: "目視檢查" },
    { key: "machine", value: "機器檢查", label: "機器檢查" },
    { key: "detailed", value: "詳細檢查", label: "詳細檢查" },
  ],

  // 運輸
  [PROCESS_TYPES.TRANSPORTATION.key]: [
    { key: "land", value: "陸運", label: "陸運" },
    { key: "sea", value: "海運", label: "海運" },
    { key: "air", value: "空運", label: "空運" },
  ],

  // 廠內出貨檢驗
  [PROCESS_TYPES.INTERNAL_SHIPPING_INSPECTION.key]: [
    { key: "general", value: "一般檢驗", label: "一般檢驗" },
    { key: "strict", value: "嚴格檢驗", label: "嚴格檢驗" },
    { key: "special", value: "特殊檢驗", label: "特殊檢驗" },
  ],
};

// 定義表單項基類
class FormItem {
  constructor(type, title) {
    this.type = type;
    this.title = title;
  }
}

// 定義通用表單項
class GeneralFormItem extends FormItem {
  constructor(title, fields) {
    super("general", title);
    this.fields = fields;
  }
}

// 定義待辦事項表單項
class TodoListFormItem extends FormItem {
  constructor(title, items) {
    super("todolist", title);
    this.items = items;
  }
}

// 定義表單部分
class FormSection {
  constructor(title, items) {
    this.title = title;
    this.items = items;
  }
}
class NestedFormItem {
  constructor(title, items) {
    this.type = "nested";
    this.title = title;
    this.items = items;
  }
}

// 創建表單配置
export const FORM_CONFIGURATIONS = {
  // 工廠內成型製���
  [PROCESS_TYPES.FACTORY_INTERNAL_SHAPING.key]: new FormSection(
    "工廠內成型製程",
    // 1. 原物料嵌套包材  2. 包裝材料  3. 成型加工費
    [
      new NestedFormItem("原物料費用", [
        new GeneralFormItem("工廠內成型製程材料成本", [
          commonSections.rawMaterialCost.fields,
        ]),
        new TodoListFormItem(
          "原物料成本",
          commonSections.packagingMaterialCost.fields
        ),
      ]),
      new TodoListFormItem(
        "包裝材料費",
        commonSections.packagingMaterialCost.fields
      ),
      new GeneralFormItem("成型加工費", [
        // 機台區域選擇
        createField(
          "machineArea",
          "機台區域",
          "select",
          {
            placeholder: "請選擇機台區域",
          },
          { required: "請選擇機台區域" },
          machineConfig.areas?.map((area) => ({
            value: area.value,
            label: area.label,
          })),
          6
        ),

        // 機台編號選擇
        createField(
          "machineId",
          "機台編號",
          "select",
          {
            placeholder: "請選擇機台編號",
            dependsOn: "machineArea",
            getDependentOptions: (machineArea) => {
              console.log("🚀 ~ machineConfig.machines:", machineConfig);

              if (!machineArea || !machineConfig.areas?.length) {
                return [];
              }

              const filteredMachines = machineConfig.areas
                .find((area) => area.value === machineArea)
                ?.machines?.map((machine) => ({
                  value: machine.value,
                  // 金額
                  label: `${machine.label}_$${machine.rate}`,
                }));

              return filteredMachines.length ? filteredMachines : [];
            },
          },
          { required: "請選擇機台編號" },
          [],
          6
        ),

        // 工時比例
        createField(
          "workHourRatio",
          "工時比例",
          "number",
          {
            placeholder: "請輸入工時比例",
            InputProps: { endAdornment: "%" },
          },
          { required: "工時比例為必填" }
        ),

        // 不良率
        createField(
          "defectRate",
          "不良率",
          "number",
          {
            placeholder: "請輸入不良率",
            InputProps: { endAdornment: "%" },
          },
          { required: "不良率為必填" }
        ),

        // 淺包工時
        createField(
          "shallowPackageTime",
          "淺包工時",
          "number",
          {
            placeholder: "請輸入淺包工時",
            dependsOn: "processType",
            InputProps: { endAdornment: "秒" },
          },
          { required: "淺包工時為必填" }
        ),

        // 成型週期
        createField(
          "moldingCycle",
          "成型週期",
          "number",
          {
            placeholder: "請輸入成型週期",
            InputProps: { endAdornment: "秒" },
          },
          { required: "成型週期為必填" }
        ),

        // 穴數
        createField(
          "holeCount",
          "穴數",
          "number",
          { placeholder: "請輸入穴數" },
          { required: "穴數為必填" }
        ),
      ]),
    ]
  ),
  // 添加廠內後製程
  [PROCESS_TYPES.FACTORY_INTERNAL_FINISHING.key]: new FormSection(
    "工廠內後製程",
    // 1. 原物料嵌套包材   2. 包裝材料  3. 廠內檢查費
    [
      new NestedFormItem("原物料費用", [
        new GeneralFormItem("工廠內後製程材料成本", [
          commonSections.rawMaterialCost.fields,
        ]),
        new TodoListFormItem(
          "原物料成本",
          commonSections.packagingMaterialCost.fields
        ),
      ]),
      new TodoListFormItem(
        "包裝材料費",
        commonSections.packagingMaterialCost.fields
      ),
      // 工時 單價
      new GeneralFormItem("廠內檢查費", [
        createField(
          "workHours",
          "工時(秒)",
          "number",
          { InputProps: { endAdornment: "秒" }, placeholder: "請輸入工時" },
          { required: "工時為必填" }
        ),
        commonFields.unitPrice,
      ]),
    ]
  ),

  // 委外成型
  [PROCESS_TYPES.OUT_SHAPING.key]: new FormSection("委外成型", [
    new NestedFormItem("原物料費用", [
      new GeneralFormItem("委外成型不良率", [
        commonSections.rawMaterialCost.fields,
      ]),
      new TodoListFormItem(
        "原物料成本",
        commonSections.packagingMaterialCost.fields
      ),
    ]),

    new TodoListFormItem(
      "包裝材料費",
      commonSections.packagingMaterialCost.fields
    ),

    new GeneralFormItem("委外檢查費", [commonFields.unitPrice]),
  ]),

  [PROCESS_TYPES.APPEARANCE_INSPECTION.key]: new FormSection("外觀檢查", [
    new NestedFormItem("材料成本", [
      new GeneralFormItem("材料成本", [commonSections.rawMaterialCost.fields]),
      new TodoListFormItem(
        "原物料成本",
        commonSections.packagingMaterialCost.fields
      ),
    ]),
    new TodoListFormItem(
      "包裝材料費",
      commonSections.packagingMaterialCost.fields
    ),
    new GeneralFormItem("委外檢查費", [commonFields.unitPrice]),
  ]),

  [PROCESS_TYPES.TRANSPORTATION.key]: new FormSection("運輸", [
    new TodoListFormItem("運輸費用", [
      createField(
        "transportType",
        "運送方式",
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
          placeholder: "請輸入公里數",
        },
        { required: "送貨里程為必填" }
      ),
      createField(
        "time",
        "司機工時",
        "number",
        { InputProps: { endAdornment: "小時" }, placeholder: "請輸入工時" },
        { required: "工時為必填" }
      ),
    ]),
    new TodoListFormItem("貨運與關稅", [
      createField(
        "freightCost",
        "運費",
        "number",
        { InputProps: { endAdornment: "元" }, placeholder: "請輸入運費" },
        { required: "運費為必填" }
      ),
      createField(
        "customsFee",
        "關稅",
        "number",
        { InputProps: { endAdornment: "元" }, placeholder: "請輸入關稅" },
        { required: "關稅為必填" }
      ),
    ]),
  ]),

  [PROCESS_TYPES.INTERNAL_SHIPPING_INSPECTION.key]: new FormSection(
    "廠內出貨檢驗",
    [
      new GeneralFormItem("廠內出貨檢", [
        createField(
          "workHours",
          "工時(秒)",
          "number",
          { InputProps: { endAdornment: "秒" }, placeholder: "請輸入工時" },
          { required: "工時為必填" }
        ),
        commonFields.unitPrice,
      ]),
    ]
  ),
};

// 製程選擇表單
export const PROCESS_SELECTION_FORM = [
  {
    title: "製程選擇",
    fields: [
      createField(
        "processType",
        "製程類型",
        "select",
        { placeholder: "請選擇製程類型1" },
        { required: "請選擇製程類型" },
        PROCESS_TYPE_OPTIONS
      ),
      createField(
        "processSubtype",
        "製程子類型",
        "select",
        {
          placeholder: "請選擇製程子類型1",
        },
        { required: "請選擇製程子類型" },
        [] // 初始為空數組
      ),
    ].map((field) => ({ ...field, span: 6 })),
  },
];
