// 基礎類型定義
interface Option {
  value: string;
  label: string;
}

type FieldType = "input" | "select" | "number";

interface InputProps {
  endAdornment: string;
}

interface Field {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  InputProps?: InputProps;
  rules?: {
    required?: string;
  };
  options?: Option[];
  span?: number;
}

// 通用常量
const COMMON_UNITS: Option[] = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "pcs", label: "pcs" },
  { value: "set", label: "set" },
];

const MATERIAL_TYPES: Option[] = [
  { value: "鋼鐵", label: "鋼鐵" },
  { value: "包材", label: "包材" },
  { value: "色母", label: "色母" },
];

// 通用輔助函數
const createInputProps = (
  unit: string,
  label?: string
): {
  InputProps: InputProps;
  placeholder: string;
} => ({
  InputProps: { endAdornment: unit },
  placeholder: `請輸入${label || (unit === "元" ? "金額" : unit)}`,
});

const createRequiredRule = (label: string): { required: string } => ({
  required: `${label}為必填`,
});

// 通用字段創建函數
export const createField = (
  name: string,
  label: string,
  type: FieldType,
  props: Partial<Field> = {},
  rules: { required?: string } = {},
  options: Option[] | null = null,
  span?: number
): Field => ({
  name,
  label,
  type,
  ...props,
  rules,
  ...(span && { span }),
  ...(options && { options }),
});

// 檢驗相關字段
const inspectionFields: Record<string, Field> = {
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

// 基礎物料字段
const materialFields: Record<string, Field> = {
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

// 包材特有字段
const packagingFields: Record<string, Field> = {
  quantity: createField(
    "quantity",
    "數量",
    "number",
    { placeholder: "請輸入數量" },
    createRequiredRule("數量")
  ),
  capacity: createField(
    "capacity",
    "容量 (公斤/袋子)",
    "number",
    createInputProps("公斤/袋子", "容量")
  ),
};

// 字段順序定義
const PACKAGING_FIELD_ORDER: string[] = [
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

// 導出
export const commonFields: Record<string, Field> = {
  ...inspectionFields,
  ...materialFields,
};

export const commonSections: Record<
  string,
  { title: string; fields: Field[] }
> = {
  rawMaterialCost: {
    title: "原物料費用",
    fields: Object.values(inspectionFields),
  },
  packagingMaterialCost: {
    title: "包裝材料費",
    fields: Object.values(materialFields).map((field) => ({
      ...field,
      span: 3,
    })),
  },
  packagingMaterialFields: {
    title: "包裝材料費",
    fields: PACKAGING_FIELD_ORDER.map(
      (fieldName) => materialFields[fieldName] || packagingFields[fieldName]
    ).filter((field): field is Field => Boolean(field)),
  },
};
