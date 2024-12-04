import { createField, commonFields, commonSections } from "./commonConfigs";
import { machineConfig } from "./machineConfig";

/**
 * 系統架構說明：
 * 1. 常量定義層：定義所有靜態配置和枚舉值
 * 2. 類型定義層：定義表單項的基礎類型和衍生類型
 * 3. 字段定義層：按功能模塊定義各類字段
 * 4. 配置整合層：將所有配置組裝成最終的表單結構
 */

//! =============== 1. 常量定義層 ===============
// *製程類型定義
/**
 * 製程類型定義
 * 使用物件而非枚舉，方便擴展和維護
 * key: 用於系統內部識別
 * value: 用於界面顯示
 */

// In-IJ(廠內成型)
// Out-IJ(委外成型)
// In-BE(廠內後製程)
// Out-BE(委外後製程)
// In-TS(廠內出貨檢驗)
export const PROCESS_TYPES = {
  FACTORY_INTERNAL_SHAPING: {
    key: "FACTORY_INTERNAL_SHAPING",
    value: "In-IJ(廠內成型)",
  },
  OUTSOURCED_SHAPING: {
    key: "OUTSOURCED_SHAPING",
    value: "Out-IJ(委外成型)",
  },
  FACTORY_INTERNAL_FINISHING: {
    key: "FACTORY_INTERNAL_FINISHING",
    value: "In-BE(廠內後製程)",
  },
  OUTSOURCED_FINISHING: {
    key: "OUTSOURCED_FINISHING",
    value: "Out-BE(委外後製程)",
  },
  FACTORY_INTERNAL_SHIPPING_INSPECTION: {
    key: "FACTORY_INTERNAL_SHIPPING_INSPECTION",
    value: "In-TS(廠內出貨檢驗)",
  },
  TRANSPORTATION: {
    key: "TRANSPORTATION",
    value: "運輸費用",
  },
};

// *製程類型選項
export const PROCESS_TYPE_OPTIONS = Object.values(PROCESS_TYPES).map(
  ({ key, value }) => ({
    value: key,
    label: value,
  })
);

// *製程子類型定義
/**
 * 製程子類型配置
 * 按主類型分組，便於管理和查找
 */
const SUBTYPE_CONFIGS = {
  SHAPING: [
    { key: "casting", value: "鑄造成型", label: "鑄造成型" },
    { key: "molding", value: "模具成型", label: "模具成型" },
    { key: "extrusion", value: "擠出成型", label: "擠出成型" },
  ],
  FINISHING: [
    { key: "polishing", value: "拋光", label: "拋光" },
    { key: "coating", value: "塗裝", label: "塗裝" },
    { key: "assembly", value: "組裝", label: "組裝" },
  ],
  INSPECTION: [
    { key: "visual", value: "目視檢查", label: "目視檢查" },
    { key: "machine", value: "機器檢查", label: "機器檢查" },
    { key: "detailed", value: "詳細檢查", label: "詳細檢查" },
  ],
  TRANSPORTATION: [
    { key: "land", value: "陸運", label: "陸運" },
    { key: "sea", value: "海運", label: "海運" },
    { key: "air", value: "空運", label: "空運" },
  ],
  SHIPPING_INSPECTION: [
    { key: "general", value: "一般檢驗", label: "一般檢驗" },
    { key: "strict", value: "嚴格檢驗", label: "嚴格檢驗" },
    { key: "special", value: "特殊檢驗", label: "特殊檢驗" },
  ],
};

// 製程子類型對應關係
export const PROCESS_SUBTYPES = {
  [PROCESS_TYPES.FACTORY_INTERNAL_SHAPING.key]: SUBTYPE_CONFIGS.SHAPING,
  [PROCESS_TYPES.OUTSOURCED_SHAPING.key]: SUBTYPE_CONFIGS.SHAPING,
  [PROCESS_TYPES.FACTORY_INTERNAL_FINISHING.key]: SUBTYPE_CONFIGS.FINISHING,
  [PROCESS_TYPES.OUTSOURCED_FINISHING.key]: SUBTYPE_CONFIGS.FINISHING,
  [PROCESS_TYPES.FACTORY_INTERNAL_SHIPPING_INSPECTION.key]:
    SUBTYPE_CONFIGS.SHIPPING_INSPECTION,
  [PROCESS_TYPES.TRANSPORTATION.key]: SUBTYPE_CONFIGS.TRANSPORTATION,
};
//! =============== 2. 類型定義層 ===============
/**
 * 表單項基類
 * 定義所有表單項的共同特性
 */
class FormItem {
  constructor(type, title) {
    this.type = type;
    this.title = title;
  }
}

/**
 * 表單項類型
 * GeneralFormItem: 一般表單項，包含普通字段
 * TodoListFormItem: 清單類型表單項，可動態添加
 * NestedFormItem: 嵌套表單項，可包含子表單
 */

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

// 表單部分
class FormSection {
  constructor(title, items) {
    this.title = title;
    this.items = items;
  }
}

//! =============== 3. 字段定義層 ===============
/**
 * 機台相關字段
 * 包含機台區域和機台編號
 * 支持級聯選擇
 */
const machineFields = [
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
      getDependentOptions: (machineArea) =>
        !machineArea
          ? []
          : machineConfig.areas
              .find((area) => area.value === machineArea)
              ?.machines?.map((machine) => ({
                value: machine.value,
                label: `${machine.label}_$${machine.rate}`,
              })) || [],
    },
    { required: "請選擇機台編號" },
    [],
    6
  ),
];
/**
 * 成型相關字段
 * 包含工時、不良率等生產參數
 */
const moldingFields = [
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
    { required: "淺包工時為必填" }
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
];

/**
 * 運輸相關字段
 * 分為基本信息和費用兩部分
 */
const transportFields = {
  basic: [
    createField(
      "transportType",
      "運送方式",
      "input",
      { placeholder: "請輸入運送方式" },
      { required: "運送方式為必填" }
    ),
    createField(
      "freightCost",
      "運費",
      "number",
      { InputProps: { endAdornment: "元" }, placeholder: "請輸入運費" },
      { required: "運費為必填" }
    ),
    createField(
      "distance",
      "送貨距離",
      "number",
      { InputProps: { endAdornment: "公里" }, placeholder: "請輸入公里數" },
      { required: "送貨距離為必填" }
    ),
    createField(
      "time",
      "司機工時",
      "number",
      { InputProps: { endAdornment: "小時" }, placeholder: "請輸入工時" },
      { required: "工時為必填" }
    ),
    createField(
      "oilPrice",
      "油錢單價",
      "number",
      {
        InputProps: { endAdornment: "元/公里" },
        placeholder: "請輸入油錢單價",
      },
      { required: "油錢單價為必填" }
    ),
    createField(
      "shipmentQuantity",
      "預估出貨數量",
      "number",
      { placeholder: "請輸入預估出貨數量" },
      { required: "預估出貨數量為必填" }
    ),
  ].map((field) => ({ ...field, span: 3 })),
  fees: [
    // 添加一個是辨別是貨運還是關稅的下拉選單
    createField(
      "feeType",
      "費用類型",
      "select",
      { placeholder: "請選擇費用類型" },
      { required: "費用類型為必填" },
      [
        { value: "貨運", label: "貨運" },
        { value: "  關稅", label: "關稅" },
      ]
    ),
    createField(
      "freightCost",
      "運費",
      "number",
      { InputProps: { endAdornment: "元" }, placeholder: "請輸入運費" },
      { required: "運費為必填" }
    ),
    createField(
      "estimatedShipment",
      "預估出貨數量",
      "number",
      { placeholder: "請輸入預估出貨數量" },
      { required: "預估出貨數量為必填" }
    ),
  ].map((field) => ({ ...field, span: 2 })),
};
//! =============== 4. 配置整合層 ===============
/**
 * 表單配置
 * 按製程類型組織不同的表單結構
 * 每個製程類型包含：
 * 1. 原物料費用
 * 2. 包裝材料費
 * 3. 特定製程相關費用
 */

export const FORM_CONFIGURATIONS = {
  [PROCESS_TYPES.FACTORY_INTERNAL_SHAPING.key]: new FormSection(
    "工廠內成型製程",
    [
      new NestedFormItem("原物料費用", [
        new GeneralFormItem("工廠內成型製程材料成本", [
          commonSections.qualityInspectionMetrics.fields,
        ]),
        new TodoListFormItem(
          "原物料成本",
          commonSections.rawMaterialCostMetrics.fields
        ),
      ]),
      new TodoListFormItem(
        "包裝材料費",
        commonSections.packagingMaterialCost.fields
      ),
      new GeneralFormItem("成型加工費", [...machineFields, ...moldingFields]),
    ]
  ),

  [PROCESS_TYPES.FACTORY_INTERNAL_FINISHING.key]: new FormSection(
    "工廠內後製程",
    [
      new NestedFormItem("原物料費用", [
        new GeneralFormItem("工廠內後製程材料成本", [
          commonSections.qualityInspectionMetrics.fields,
        ]),
        new TodoListFormItem(
          "原物料成本",
          commonSections.rawMaterialCostMetrics.fields
        ),
      ]),
      new TodoListFormItem(
        "包裝材料費",
        commonSections.packagingMaterialCost.fields
      ),
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

  [PROCESS_TYPES.OUTSOURCED_SHAPING.key]: new FormSection("委外成型", [
    new NestedFormItem("原物料費用", [
      new GeneralFormItem("委外成型不良率", [
        commonSections.qualityInspectionMetrics.fields,
      ]),
      new TodoListFormItem(
        "原物料成本",
        commonSections.rawMaterialCostMetrics.fields
      ),
    ]),
    new TodoListFormItem(
      "包裝材料費",
      commonSections.packagingMaterialCost.fields
    ),
    new GeneralFormItem("委外檢查費", [commonFields.unitPrice]),
  ]),

  [PROCESS_TYPES.OUTSOURCED_FINISHING.key]: new FormSection("外觀檢查", [
    new NestedFormItem("材料成本", [
      new GeneralFormItem("材料成本", [
        commonSections.qualityInspectionMetrics.fields,
      ]),
      new TodoListFormItem(
        "原物料成本",
        commonSections.rawMaterialCostMetrics.fields
      ),
    ]),
    new TodoListFormItem(
      "包裝材料費",
      commonSections.packagingMaterialCost.fields
    ),
    new GeneralFormItem("委外檢查費", [commonFields.unitPrice]),
  ]),

  [PROCESS_TYPES.TRANSPORTATION.key]: new FormSection("運輸", [
    new TodoListFormItem("運輸費用", transportFields.basic),
    new TodoListFormItem("貨運與關稅", transportFields.fees),
  ]),

  [PROCESS_TYPES.FACTORY_INTERNAL_SHIPPING_INSPECTION.key]: new FormSection(
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

/**
 * 製程選擇表單
 * 用於選擇製程類型和子類型
 * 支持級聯選擇
 */
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
        PROCESS_TYPE_OPTIONS,
        6
      ),
      createField(
        "processSubtype",
        "製程子類型",
        "select",
        { placeholder: "請選擇製程子類型" },
        { required: "請選擇製程子類型" },
        [],
        6
      ),
    ],
  },
];
