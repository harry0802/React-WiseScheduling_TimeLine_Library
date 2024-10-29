const {
  createField,
  commonFields,
  commonSections,
} = require("./commonConfigs");

// 定義製程類型
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

// 製程子類型定義
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
  [PROCESS_TYPES.APPEARANCE_INSPECTION.key]: new FormSection("外觀檢查", [
    new NestedFormItem("材料成本", [
      new GeneralFormItem("材料成本", [commonSections.rawMaterialCost.fields]),
      new TodoListFormItem(
        "材料成本",
        commonSections.packagingMaterialCost.fields
      ),
    ]),
    new TodoListFormItem(
      "包裝材料成本",
      commonSections.packagingMaterialCost.fields
    ),
    new GeneralFormItem("委外檢查費", [
      createField(
        "unitPrice",
        "單價",
        "number",
        { InputProps: { endAdornment: "元" }, placeholder: "請輸入單價" },
        { required: "單價為必填" }
      ),
    ]),
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

  [PROCESS_TYPES.INTERNAL_APPEARANCE_REPAIR.key]: new FormSection(
    "廠內外觀修整",
    [
      new NestedFormItem("原物料費用", [
        new GeneralFormItem("原物料費用材料成本", [
          commonSections.rawMaterialCost.fields,
        ]),
        new TodoListFormItem(
          "原物料費用包裝材料成本",
          commonSections.packagingMaterialCost.fields
        ),
      ]),

      new TodoListFormItem(
        "包裝材料成本",
        commonSections.packagingMaterialCost.fields
      ),
      new GeneralFormItem("廠內檢查費", [commonFields.inspectionFee]),
    ]
  ),

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
        createField(
          "unitPrice",
          "單價",
          "number",
          { InputProps: { endAdornment: "元" }, placeholder: "請輸入單價" },
          { required: "單價為必填" }
        ),
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
