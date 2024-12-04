/**
 * 通用單位常量
 * 用於表單字段中的單位選項
 * @constant {Array<Object>}
 */
const COMMON_UNITS = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "pcs", label: "pcs" },
  { value: "set", label: "set" },
];

/**
 * 物料類型常量
 * 用於表單字段中的物料種類選項
 * @constant {Array<Object>}
 */
const MATERIAL_TYPES = [
  { value: "鋼鐵", label: "鋼鐵" },
  { value: "包材", label: "包材" },
  { value: "色母", label: "色母" },
];

/**
 * 創建輸入屬性
 * 用於創建輸入字段的屬性，包括單位和占位符
 * @param {string} unit - 單位 (例如: "kg", "元")
 * @param {string} label - 字段標籤
 * @returns {Object} 包含 InputProps 和占位符的對象
 */
const createInputProps = (unit, label) => ({
  InputProps: { endAdornment: unit },
  placeholder: `請輸入${label || (unit === "元" ? "金額" : unit)}`,
});

/**
 * 創建必填驗證規則
 * 用於生成必填驗證規則的函數
 * @param {string} label - 字段標籤
 * @returns {Object} 必填規則對象
 */
const createRequiredRule = (label) => ({ required: `${label}為必填` });

/**
 * 通用字段創建函數
 * 用於生成表單字段的基本屬性
 * @param {string} name - 字段名稱
 * @param {string} label - 字段標籤
 * @param {string} type - 字段類型 (例如: "input", "select", "number")
 * @param {Object} [props={}] - 額外的屬性
 * @param {Object} [rules={}] - 驗證規則
 * @param {Array<Object>} [options=null] - 選項列表 (僅適用於 select 類型)
 * @param {number} [span] - 網格佔位大小
 * @returns {Object} 定義好的字段對象
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

/**
 * 檢驗相關字段
 * 包含與檢驗有關的特定字段設定
 * @type {Object}
 */
const inspectionFields = {
  preInspectionRate: createField(
    "preInspectionRate",
    "預檢不良率",
    "number",
    createInputProps("%", "預檢不良率"),
    createRequiredRule("預檢不良率")
  ),
  preInspectionLossRate: createField(
    "preInspectionLossRate",
    "預檢原料報廢百分比",
    "number",
    createInputProps("%", "預檢原料報廢百分比"),
    createRequiredRule("預檢原料報廢百分比")
  ),
  inspectionFee: createField(
    "inspectionFee",
    "檢驗費用",
    "number",
    createInputProps("元", "檢驗費用"),
    createRequiredRule("檢驗費用")
  ),
  processingFee: createField(
    "processingFee",
    "加工費用",
    "number",
    createInputProps("元", "加工費用"),
    createRequiredRule("加工費用")
  ),
};

/**
 * 基礎物料字段
 * 包含基礎物料相關的字段設定
 * @type {Object}
 */
const materialFields = {
  materialType: createField(
    "materialType",
    "原物料種類",
    "select",
    { placeholder: "請選擇原物料種類" },
    createRequiredRule("原物料種類"),
    MATERIAL_TYPES
  ),
  materialCode: createField(
    "materialCode",
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
  weight: createField(
    "weight",
    "重量",
    "number",
    createInputProps("kg", "重量"),
    createRequiredRule("重量")
  ),
  unit: createField(
    "unit",
    "單位",
    "select",
    { placeholder: "請選擇單位" },
    createRequiredRule("單位"),
    COMMON_UNITS
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

/**
 * 包材特有字段
 * 包含僅適用於包材的字段，如數量和容量
 * @type {Object}
 */
const packagingFields = {
  quantity: createField(
    "quantity",
    "數量",
    "number",
    { placeholder: "請輸入數量" },
    createRequiredRule("數量")
  ),
  capacity: createField(
    "capacity",
    "容量 ",
    "number",
    createInputProps("公斤/袋子", "容量")
  ),
};

/**
 * 包材字段順序定義
 * 定義包裝材料字段的顯示順序
 * @constant {Array<string>}
 */
const PACKAGING_FIELD_ORDER = [
  "materialType",
  "materialCode",
  "materialName",
  "weight",
  "quantity",
  "capacity",
  "unit",
  "unitPrice",
  "amount",
];

/**
 * 常用字段集合
 * 包含檢驗和基礎物料的字段，用於其他表單區域重用
 * @type {Object}
 */
export const commonFields = {
  ...inspectionFields,
  ...materialFields,
};

/**
 * 表單區域設定
 * 包含不同費用區域的配置，例如原物料費用、包材費用
 * @type {Object}
 */
export const commonSections = {
  qualityInspectionMetrics: {
    title: "生產檢驗與質量指標",
    fields: Object.values(inspectionFields),
  },
  rawMaterialCostMetrics: {
    title: "原物料成本",
    fields: Object.values(materialFields).map((field) => ({
      ...field,
      span: 3, // 假設需要更大的佔位
    })),
  },
  packagingMaterialCost: {
    title: "包裝材料費",
    fields: PACKAGING_FIELD_ORDER.map((fieldName) => {
      const field = materialFields[fieldName] || packagingFields[fieldName];
      return field ? { ...field, span: 4 } : null; // 將 span 設為固定的 3
    }).filter(Boolean),
  },
};
