import { PROCESS_CATEGORY_OPTION } from "../../../config/config";
import { createField, commonSections } from "./commonConfigs_v1";

import { createMachineScope } from "../../../services/QuotationManagement/machineService";

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
  constructor(title, items, name, canDelete = false, canAdd = false) {
    super("todolist", title, name);
    this.items = items;
    this.canDelete = canDelete;
    this.canAdd = canAdd;
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
const machineScope = createMachineScope();
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
        createField("machineId", "機台ID", "hidden", {
          dependsOn: "OptionsId",
          getDependentOptions: (productionArea, methods) => {
            console.log("🚀 ~ productionArea:", productionArea);

            if (!productionArea) return "";
            return productionArea;
          },
        }),
        createField(
          "productionArea",
          "機台區域",
          "select",
          {
            placeholder: "請選擇生產區域",
          },
          { required: "請選擇生產區域" },
          null,
          6,
          machineScope.getMachinesByArea
        ),
        createField(
          "machineSN",
          "機台編號",
          "select",
          {
            placeholder: "請選擇機台編號",
            dependsOn: "productionArea",
            getDependentOptions: (machineId, methods) => {
              if (!machineId) {
                methods.setValue("OptionsId", "");
                return [];
              }
              const machines = machineScope.getMachinesByMachineSN(machineId);
              console.log(methods.watch("machineSN"));

              // 當選擇機台時，設置對應的 id
              methods.watch("machineSN", (value) => {
                const selectedMachine = machines.find((m) => m.value === value);
                if (selectedMachine) {
                  methods.setValue("OptionsId", selectedMachine.id);
                }
              });

              return machines;
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
        // 給我一個隱藏的紀錄 id 字段
        createField(
          "OptionsId",
          "id",
          "hidden",
          {
            dependsOn: "machineSN",
            getDependentOptions: async (machineSN, methods) => {
              if (!machineSN) return "";
              const machine = await machineScope.getMachineById(machineSN);
              if (!machine) return "";
              // 直接返回值，不需要調用 setValue
              return machine?.id || "";
            },
          },
          {},
          [],
          6
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
  [PROCESS_CATEGORY_OPTION[2].category]: new FormSection("廠���後製程", [
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
