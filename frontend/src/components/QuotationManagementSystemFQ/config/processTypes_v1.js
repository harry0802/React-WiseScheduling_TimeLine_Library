import { PROCESS_CATEGORY_OPTION } from "../../../config/config";
import { createField, commonSections } from "./commonConfigs_v1";
import { optionsService } from "./commonConfigs_v1";

/**
 * 系統架構說明：
 * 1. 常量定義層：定義所有靜態配置和枚舉值
 * 2. 類型定義層：定義表單項的基礎類型和衍生類型
 * 3. 字段定義層：按功能模塊定義各類字段
 * 4. 配置整合層：將所有配置組裝成最終的表單結構
 */

//! =============== 2. 類型定義層 ===============
class FormItem {
  constructor(type, title, name) {
    this.type = type;
    this.title = title;
    this.name = name;
  }
}

class GeneralFormItem extends FormItem {
  constructor(title, fields, name) {
    super("general", title, name);
    this.fields = fields;
  }
}

class TodoListFormItem extends FormItem {
  constructor(title, items, name) {
    super("todolist", title, name);
    this.items = items;
  }
}

class NestedFormItem extends FormItem {
  constructor(title, items, name) {
    super("nested", title, name);
    this.items = items;
  }
}

class FormSection {
  constructor(title, items, name) {
    this.title = title;
    this.items = items;
  }
}

//! =============== 3. 表單配置整合層 ===============
/**
 * 各製程類型的表單配置
 */

export const FORM_CONFIGURATIONS = {
  // 廠內成型製程
  [PROCESS_CATEGORY_OPTION[0].category]: new FormSection("廠內成型製程", [
    new NestedFormItem("材料相關費用", [
      new GeneralFormItem(
        "材料成本設置",
        commonSections.materialCostSetting.fields,
        "FQMaterialCostSetting"
      ),
      new TodoListFormItem(
        "材料成本",
        commonSections.materialCosts.fields,
        "FQMaterialCosts"
      ),
    ]),
    new TodoListFormItem(
      "包裝材料費",
      commonSections.packagingCosts.fields,
      "FQPackagingCosts"
    ),
    new GeneralFormItem(
      "成型加工費",
      [
        createField(
          "machineId",
          "機台區域",
          "select",
          { placeholder: "請選擇機台區域" },
          { required: "請選擇機台區域" },
          null,
          6,
          optionsService.getFreightTypes
        ),
        createField(
          "machineSN",
          "機台編號",
          "select",
          {
            placeholder: "請選擇機台編號",
            dependsOn: "machineId",
            getDependentOptions: (machineId) => {
              return !machineId
                ? []
                : optionsService.getMachineAreas(machineId);
            },
          },
          { required: "請選擇機台編號" },
          [],
          6
        ),
        createField(
          "workHoursRatio",
          "工時比例",
          "number",
          { placeholder: "請輸入工時比例", InputProps: { endAdornment: "%" } },
          { required: "工時比例為必填" }
        ),
        createField(
          "defectiveRate",
          "不良率",
          "number",
          { placeholder: "請輸入不良率", InputProps: { endAdornment: "%" } },
          { required: "不良率為必填" }
        ),
        createField(
          "packageTime",
          "包裝工時",
          "number",
          { placeholder: "請輸入包裝工時", InputProps: { endAdornment: "秒" } },
          { required: "包裝工時必填" }
        ),
        createField(
          "cycleTime",
          "成型週期",
          "number",
          { placeholder: "請輸入成型週期", InputProps: { endAdornment: "秒" } },
          { required: "成型週期為必填" }
        ),
        createField(
          "moldCavity",
          "穴數",
          "number",
          { placeholder: "請輸入穴數" },
          { required: "穴數為必填" }
        ),
      ],
      "FQInjectionMoldingCosts"
    ),
  ]),
  // 委外成型製程
  [PROCESS_CATEGORY_OPTION[1].category]: new FormSection("委外成型製程", [
    new NestedFormItem("材料相關費用", [
      new GeneralFormItem(
        "材料成本設置",
        commonSections.materialCostSetting.fields,
        "FQMaterialCostSetting"
      ),
      new TodoListFormItem(
        "材料成本",
        commonSections.materialCosts.fields,
        "FQMaterialCosts"
      ),
    ]),
    new TodoListFormItem(
      "包裝材料費",
      commonSections.packagingCosts.fields,
      "FQPackagingCosts"
    ),
    new TodoListFormItem(
      "委外加工費",
      commonSections.outsourcedProcessingCosts.fields.filter(
        (field) => field.name !== "amount"
      ),
      "FQOutPostProcessingCosts"
    ),
  ]),

  // 廠內後製程
  [PROCESS_CATEGORY_OPTION[2].category]: new FormSection("廠內後製程", [
    new NestedFormItem("材料相關費用", [
      new GeneralFormItem(
        "材料成本設置",
        commonSections.materialCostSetting.fields,
        "FQMaterialCostSetting"
      ),
      new TodoListFormItem(
        "材料成本",
        commonSections.materialCosts.fields,
        "FQMaterialCosts"
      ),
    ]),
    new TodoListFormItem(
      "包裝材料費",
      commonSections.packagingCosts.fields,
      "FQPackagingCosts"
    ),
    new TodoListFormItem(
      "廠內加工費",
      commonSections.internalProcessingCosts.fields.filter(
        (field) => field.name !== "amount"
      ),
      "FQInPostProcessingCosts"
    ),
  ]),
  // 委外後製程
  [PROCESS_CATEGORY_OPTION[3].category]: new FormSection("委外後製程", [
    new NestedFormItem("材料相關費用", [
      new GeneralFormItem(
        "材料成本設置",
        commonSections.materialCostSetting.fields,
        "FQMaterialCostSetting"
      ),
      new TodoListFormItem(
        "材料成本",
        commonSections.materialCosts.fields,
        "FQMaterialCosts"
      ),
    ]),
    new TodoListFormItem(
      "包裝材料費",
      commonSections.packagingCosts.fields,
      "FQPackagingCosts"
    ),
    new TodoListFormItem(
      "委外加工費",
      commonSections.outsourcedProcessingCosts.fields.filter(
        (field) => field.name !== "amount"
      ),
      "FQOutPostProcessingCosts"
    ),
  ]),

  // 廠內出貨檢驗
  [PROCESS_CATEGORY_OPTION[4].category]: new FormSection("廠內出貨檢驗", [
    new TodoListFormItem(
      "檢驗費用",
      commonSections.internalProcessingCosts.fields.filter(
        (field) => field.name !== "amount"
      ),
      "FQInPostProcessingCosts"
    ),
  ]),

  // 運輸費用與貨運關稅
  TRANSPORTATION: new FormSection("運輸費用與貨運關稅", [
    new TodoListFormItem(
      "運輸費用",
      commonSections.freightCosts.fields,
      "FQFreightCosts"
    ),
    new TodoListFormItem(
      "貨運關稅",
      commonSections.customsDutyCosts.fields,
      "FQCustomsDutyCosts"
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
        {
          placeholder: "請選擇製程類型",
        },
        { required: "製程類型為必填" },
        [], // options 將由組件提供
        6
      ),
      createField(
        "processSN",
        "製程名稱",
        "select",
        {
          placeholder: "請選擇製程名稱",
        },
        { required: "製程名稱為必填" }, // 空規則，不做驗證
        [],
        6
      ),
    ],
  },
];
