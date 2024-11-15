/**
 * 通用單位常量
 */
const COMMON_UNITS = [
  { value: "公克", label: "公克" },
  { value: "件", label: "件" },
];

/**
 * 包材類型常量
 */
const PACKAGING_TYPES = [{ value: "包材", label: "包材" }];

/**
 * 運輸費用類型常量
 */
const FREIGHT_TYPES = [
  { value: "空運", label: "空運" },
  { value: "海運", label: "海運" },
  { value: "陸運", label: "陸運" },
];

/**
 * 創建輸入屬性
 */
const createInputProps = (unit, label) => ({
  InputProps: { endAdornment: unit },
  placeholder: `請輸入${label || (unit === "元" ? "金額" : unit)}`,
});

/**
 * 創建必填驗證規則
 */
const createRequiredRule = (label) => ({ required: `${label}為必填` });

/**
 * 通用字段創建函數
 */
export const createField = (
  name,
  label,
  type,
  props = {},
  rules = {},
  options = null,
  span
) => ({
  name,
  label,
  type,
  ...props,
  rules,
  ...(span && { span }),
  ...(options && { options }),
});

// =============== 基礎成本設置字段 ===============
const materialCostSettingFields = {
  estimatedDefectRate: createField(
    "estimatedDefectRate",
    "預估不良率",
    "number",
    createInputProps("%", "預估不良率"),
    createRequiredRule("預估不良率")
  ),
  estimatedMaterialFluctuation: createField(
    "estimatedMaterialFluctuation",
    "預估材料浮動",
    "number",
    createInputProps("%", "預估材料浮動"),
    createRequiredRule("預估材料浮動")
  ),
  extractionCost: createField(
    "extractionCost",
    "取出費用",
    "number",
    createInputProps("元", "取出費用"),
    createRequiredRule("取出費用")
  ),
  processingCost: createField(
    "processingCost",
    "加工費用",
    "number",
    createInputProps("元", "加工費用"),
    createRequiredRule("加工費用")
  ),
};

// =============== 材料成本字段 ===============
const materialCostFields = {
  materialSN: createField(
    "materialSN",
    "物料編號",
    "input",
    { placeholder: "請輸入物料編號" },
    createRequiredRule("物料編號")
  ),
  materialName: createField(
    "materialName",
    "物料名稱",
    "input",
    { placeholder: "請輸入物料名稱" },
    createRequiredRule("物料名稱")
  ),
  unit: createField(
    "unit",
    "單位",
    "select",
    { placeholder: "請選擇單位" },
    createRequiredRule("單位"),
    COMMON_UNITS
  ),
  weight: createField(
    "weight",
    "重量",
    "number",
    createInputProps("公克", "重量"),
    createRequiredRule("重量")
  ),
  unitPrice: createField(
    "unitPrice",
    "單價",
    "number",
    createInputProps("元", "單價"),
    createRequiredRule("單價")
  ),
  amount: createField(
    "amount",
    "金額",
    "number",
    createInputProps("元", "金額"),
    createRequiredRule("金額")
  ),
};

// =============== 包裝成本字段 ===============
const packagingCostFields = {
  packagingType: createField(
    "packagingType",
    "包材類型",
    "select",
    { placeholder: "請選擇包材類型" },
    createRequiredRule("包材類型"),
    PACKAGING_TYPES
  ),
  materialSN: createField(
    "materialSN",
    "物料編號",
    "input",
    { placeholder: "請輸入物料編號" },
    createRequiredRule("物料編號")
  ),
  materialName: createField(
    "materialName",
    "物料名稱",
    "input",
    { placeholder: "請輸入物料名稱" },
    createRequiredRule("物料名稱")
  ),
  unit: createField(
    "unit",
    "單位",
    "select",
    { placeholder: "請選擇單位" },
    createRequiredRule("單位"),
    COMMON_UNITS
  ),
  quantity: createField(
    "quantity",
    "數量",
    "number",
    { placeholder: "請輸入數量" },
    createRequiredRule("數量")
  ),
  capacity: createField(
    "capacity",
    "容量",
    "number",
    createInputProps("件/箱", "容量"),
    createRequiredRule("容量")
  ),
  bagsPerKg: createField(
    "bagsPerKg",
    "每公斤袋數",
    "number",
    createInputProps("袋/公斤", "每公斤袋數")
  ),
  unitPrice: createField(
    "unitPrice",
    "單價",
    "number",
    createInputProps("元", "單價"),
    createRequiredRule("單價")
  ),
  amount: createField(
    "amount",
    "金額",
    "number",
    createInputProps("元", "金額"),
    createRequiredRule("金額")
  ),
};

// =============== 注塑成型成本字段 ===============
const injectionMoldingCostFields = {
  workHoursRatio: createField(
    "workHoursRatio",
    "工時比例",
    "number",
    createInputProps("%", "工時比例"),
    createRequiredRule("工時比例")
  ),
  defectiveRate: createField(
    "defectiveRate",
    "不良率",
    "number",
    createInputProps("%", "不良率"),
    createRequiredRule("不良率")
  ),
  cycleTime: createField(
    "cycleTime",
    "週期時間",
    "number",
    createInputProps("秒", "週期時間"),
    createRequiredRule("週期時間")
  ),
  packageTime: createField(
    "packageTime",
    "包裝時間",
    "number",
    createInputProps("秒", "包裝時間"),
    createRequiredRule("包裝時間")
  ),
  moldCavity: createField(
    "moldCavity",
    "模具穴數",
    "number",
    { placeholder: "請輸入模具穴數" },
    createRequiredRule("模具穴數")
  ),
  unitPrice: createField(
    "unitPrice",
    "單價",
    "number",
    createInputProps("元", "單價"),
    createRequiredRule("單價")
  ),
  amount: createField(
    "amount",
    "金額",
    "number",
    createInputProps("元", "金額"),
    createRequiredRule("金額")
  ),
  subtotal: createField(
    "subtotal",
    "小計",
    "number",
    createInputProps("元", "小計"),
    createRequiredRule("小計")
  ),
  electricityCost: createField(
    "electricityCost",
    "電費",
    "number",
    createInputProps("元", "電費"),
    createRequiredRule("電費")
  ),
};

// =============== 運輸成本字段 ===============
const freightFields = {
  deliveryDistance: createField(
    "deliveryDistance",
    "運送距離",
    "number",
    createInputProps("公里", "運送距離"),
    createRequiredRule("運送距離")
  ),
  driverWorkHours: createField(
    "driverWorkHours",
    "司機工時",
    "number",
    createInputProps("小時", "司機工時"),
    createRequiredRule("司機工時")
  ),
  fuelCostPerKM: createField(
    "fuelCostPerKM",
    "每公里油費",
    "number",
    createInputProps("元/公里", "每公里油費"),
    createRequiredRule("每公里油費")
  ),
  estimatedShipment: createField(
    "estimatedShipment",
    "預估出貨量",
    "number",
    { placeholder: "請輸入預估出貨量" },
    createRequiredRule("預估出貨量")
  ),
  amount: createField(
    "amount",
    "金額",
    "number",
    createInputProps("元", "金額"),
    createRequiredRule("金額")
  ),
};

// =============== 關稅成本字段 ===============
const customsDutyFields = {
  feeType: createField(
    "feeType",
    "費用類型",
    "select",
    { placeholder: "請選擇費用類型" },
    createRequiredRule("費用類型"),
    FREIGHT_TYPES
  ),
  freight: createField(
    "freight",
    "運費",
    "number",
    createInputProps("元", "運費"),
    createRequiredRule("運費")
  ),
  estimatedShipment: createField(
    "estimatedShipment",
    "預估出貨量",
    "number",
    { placeholder: "請輸入預估出貨量" },
    createRequiredRule("預估出貨量")
  ),
  amount: createField(
    "amount",
    "金額",
    "number",
    createInputProps("元", "金額"),
    createRequiredRule("金額")
  ),
};

// =============== 委外加工成本字段 ===============
const outsourcedProcessingFields = {
  unitPrice: createField(
    "unitPrice",
    "單價",
    "number",
    createInputProps("元", "單價"),
    createRequiredRule("單價")
  ),
  amount: createField(
    "amount",
    "金額",
    "number",
    createInputProps("元", "金額"),
    createRequiredRule("金額")
  ),
};

// =============== 廠內加工成本字段 ===============
const internalProcessingFields = {
  workSecond: createField(
    "workSecond",
    "工時",
    "number",
    createInputProps("秒", "工時"),
    createRequiredRule("工時")
  ),
  unitPrice: createField(
    "unitPrice",
    "單價",
    "number",
    createInputProps("元", "單價"),
    createRequiredRule("單價")
  ),
  amount: createField(
    "amount",
    "金額",
    "number",
    createInputProps("元", "金額"),
    createRequiredRule("金額")
  ),
};

// 導出所有通用字段
export const commonFields = {
  ...materialCostSettingFields,
  ...materialCostFields,
  ...packagingCostFields,
  ...injectionMoldingCostFields,
  ...freightFields,
  ...customsDutyFields,
  ...outsourcedProcessingFields,
  ...internalProcessingFields,
};

// 導出通用區段配置
export const commonSections = {
  materialCostSetting: {
    title: "材料成本設置",
    fields: Object.values(materialCostSettingFields).map((field) => ({
      ...field,
      span: 3,
    })),
  },
  materialCosts: {
    title: "材料成本",
    fields: Object.values(materialCostFields).map((field) => ({
      ...field,
      span: 3,
    })),
  },
  packagingCosts: {
    title: "包裝成本",
    fields: Object.values(packagingCostFields).map((field) => ({
      ...field,
      span: 3,
    })),
  },
  injectionMoldingCosts: {
    title: "注塑成型成本",
    fields: Object.values(injectionMoldingCostFields).map((field) => ({
      ...field,
      span: 3,
    })),
  },
  freightCosts: {
    title: "運輸成本",
    fields: Object.values(freightFields).map((field) => ({
      ...field,
      span: 3,
    })),
  },
  customsDutyCosts: {
    title: "關稅成本",
    fields: Object.values(customsDutyFields).map((field) => ({
      ...field,
      span: 3,
    })),
  },
  outsourcedProcessingCosts: {
    title: "委外加工成本",
    fields: Object.values(outsourcedProcessingFields).map((field) => ({
      ...field,
      span: 6,
    })),
  },
  internalProcessingCosts: {
    title: "廠內加工成本",
    fields: Object.values(internalProcessingFields).map((field) => ({
      ...field,
      span: 4,
    })),
  },
};
