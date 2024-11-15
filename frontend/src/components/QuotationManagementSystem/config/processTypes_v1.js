import { createField, commonFields, commonSections } from "./commonConfigs";

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
export const PROCESS_TYPES = {
  IN_INJECTION: {
    key: "IN_INJECTION",
    value: "In-IJ(廠內成型)",
  },
  OUT_INJECTION: {
    key: "OUT_INJECTION",
    value: "Out-IJ(委外成型)",
  },
  IN_BACKEND: {
    key: "IN_BACKEND",
    value: "In-BE(廠內後製程)",
  },
  OUT_BACKEND: {
    key: "OUT_BACKEND",
    value: "Out-BE(委外後製程)",
  },
  IN_TEST: {
    key: "IN_TEST",
    value: "In-TS(廠內出貨檢驗)",
  },
};

export const PROCESS_TYPE_OPTIONS = Object.values(PROCESS_TYPES).map(
  ({ key, value }) => ({
    value: key,
    label: value,
  })
);

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
  [PROCESS_TYPES.IN_INJECTION.key]: SUBTYPE_CONFIGS.INJECTION,
  [PROCESS_TYPES.OUT_INJECTION.key]: SUBTYPE_CONFIGS.INJECTION,
  [PROCESS_TYPES.IN_BACKEND.key]: SUBTYPE_CONFIGS.BACKEND,
  [PROCESS_TYPES.OUT_BACKEND.key]: SUBTYPE_CONFIGS.BACKEND,
  [PROCESS_TYPES.IN_TEST.key]: SUBTYPE_CONFIGS.TEST,
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
  [PROCESS_TYPES.IN_INJECTION.key]: new FormSection("廠內成型製程", [
    new NestedFormItem("材料相關費用", [
      new GeneralFormItem("材料成本設置", [
        commonSections.materialCostSetting.fields,
      ]),
      new TodoListFormItem("材料成本", commonSections.materialCosts.fields),
    ]),
    new TodoListFormItem("包裝材料費", commonSections.packagingCosts.fields),
    new TodoListFormItem(
      "成型加工費",
      commonSections.injectionMoldingCosts.fields
    ),
  ]),

  [PROCESS_TYPES.OUT_INJECTION.key]: new FormSection("委外成型製程", [
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

  [PROCESS_TYPES.IN_BACKEND.key]: new FormSection("廠內後製程", [
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

  [PROCESS_TYPES.OUT_BACKEND.key]: new FormSection("委外後製程", [
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

  [PROCESS_TYPES.IN_TEST.key]: new FormSection("廠內出貨檢驗", [
    new TodoListFormItem(
      "檢驗費用",
      commonSections.internalProcessingCosts.fields
    ),
  ]),
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
        { placeholder: "請選擇製程類型" },
        { required: "製程類型為必填" },
        PROCESS_TYPE_OPTIONS,
        6
      ),
      createField(
        "processSN",
        "製程代號",
        "select",
        {
          placeholder: "請選擇製程代號",
          dependsOn: "processCategory",
          getDependentOptions: (processCategory) =>
            !processCategory ? [] : PROCESS_SUBTYPES[processCategory] || [],
        },
        { required: "製程代號為必填" },
        [],
        6
      ),
    ],
  },
];
