// 通用字段創建函數
export const createField = (
  name,
  label,
  type,
  props = {},
  rules = {},
  options = null,
  span
) => {
  const field = {
    name,
    label,
    type,
    ...props,
    rules,
    span,
  };

  if (options) {
    field.options = options;
  }

  return field;
};

// !通用字段定義
export const commonFields = {
  preInspectionRate: createField(
    "preInspectionRate",
    "預檢不良率",
    "number",
    { InputProps: { endAdornment: "%" }, placeholder: "請輸入預檢不良率" },
    { required: "預檢不良率為必填" }
  ),
  preInspectionLossRate: createField(
    "preInspectionLossRate",
    "預檢原料報廢百分比",
    "number",
    {
      InputProps: { endAdornment: "%" },
      placeholder: "請輸入預檢原料報廢百分比",
    },
    { required: "預檢原料報廢百分比為必填" }
  ),
  inspectionFee: createField(
    "inspectionFee",
    "檢驗費用",
    "number",
    { InputProps: { endAdornment: "元" }, placeholder: "請輸入檢驗費用" },
    { required: "檢驗費用為必填" }
  ),
  processingFee: createField(
    "processingFee",
    "加工費用",
    "number",
    { InputProps: { endAdornment: "元" }, placeholder: "請輸入加工費用" },
    { required: "加工費用為必填" }
  ),
  // 添加一個通用的單價
  unitPrice: createField(
    "unitPrice",
    "單價",
    "number",
    { InputProps: { endAdornment: "元" }, placeholder: "請輸入單價" },
    { required: "單價為必填" }
  ),
};

// 通用部分定義
export const commonSections = {
  rawMaterialCost: {
    title: "原物料費用",
    fields: [
      commonFields.preInspectionRate,
      commonFields.preInspectionLossRate,
      commonFields.inspectionFee,
      commonFields.processingFee,
    ],
  },
  // ! 包材與其他單位選項 未來將會串接API
  packagingMaterialCost: {
    title: "包裝材料費",
    fields: [
      createField(
        "materialType",
        "原物料種類",
        "select",
        { placeholder: "請選擇原物料種類" },
        { required: "原物料種類為必填" },
        [
          { value: "鋼鐵", label: "鋼鐵" },
          { value: "包材", label: "包材" },
          { value: "色母", label: "色母" },
        ],
        3
      ),
      createField(
        "materialCode",
        "物料編號",
        "input",
        { placeholder: "請輸入物料編號" },
        { required: "物料編號為必填" },
        false,
        3
      ),
      createField(
        "materialName",
        "物料名稱",
        "input",
        { placeholder: "請輸入物料名稱" },
        { required: "物料名稱為必填" },
        false,
        3
      ),
      createField(
        "weight",
        "重量",
        "number",
        { InputProps: { endAdornment: "kg" }, placeholder: "請輸入重量" },
        { required: "重量為必填" },
        false,
        3
      ),
      createField(
        "unit",
        "單位",
        "select",
        { placeholder: "請選擇單位" },
        { required: "單位為必填" },
        [
          { value: "kg", label: "kg" },
          { value: "g", label: "g" },
          { value: "pcs", label: "pcs" },
          { value: "set", label: "set" },
        ],
        3
      ),
      createField(
        "unitPrice",
        "單價",
        "number",
        { InputProps: { endAdornment: "元" }, placeholder: "請輸入單價" },
        { required: "單價為必填" },
        false,
        3
      ),
      createField(
        "amount",
        "金額",
        "number",
        { InputProps: { endAdornment: "元" }, placeholder: "請輸入金額" },
        { required: "金額為必填" },
        false,
        3
      ),
    ],
  },
};
