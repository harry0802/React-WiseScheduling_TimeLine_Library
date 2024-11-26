export const optionsService = {
  getCommonUnits: async () => {
    const response = await fetch(
      "http://localhost:5000/api/option/materialUnit"
    );
    console.log("🚀 ~ getCommonUnits: ~ response:", response);
    const data = await response.json();
    return data.data.map((item) => ({
      id: item.id,
      value: item.name,
      label: `${item.name} (${item.schema})`,
    }));
  },

  getPackagingTypes: async () => {
    const response = await fetch(
      "http://localhost:5000/api/option/packagingUnit"
    );
    const data = await response.json();
    return data.data.map((item) => ({
      id: item.id,
      value: item.name,
      label: `${item.name} (${item.schema})`,
    }));
  },

  getFreightTypes: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/machine/list");
      const { data } = await response.json();

      const areaMap = new Map();

      // 使用 Map 保存唯一區域
      data.forEach((machine) => {
        if (!areaMap.has(machine.productionArea)) {
          areaMap.set(machine.productionArea, {
            id: machine.id,
            value: machine.id,
            label: machine.productionArea,
          });
        }
      });

      return Array.from(areaMap.values());
    } catch (error) {
      console.error("獲取產線區域失敗:", error);
      throw error;
    }
  },

  // 新增機台相關的選項服務
  getMachineAreas: async (areaFilter) => {
    try {
      // 同時發送兩個請求
      const [detailResponse, listResponse] = await Promise.all([
        fetch(`http://localhost:5000/api/machine/?id=${areaFilter}`),
        fetch("http://localhost:5000/api/machine/list"),
      ]);

      const [detailResult, listResult] = await Promise.all([
        detailResponse.json(),
        listResponse.json(),
      ]);

      if (!detailResult.status || !detailResult.data?.[0]) {
        throw new Error(detailResult.message || "獲取機台資訊失敗");
      }

      if (!listResult.status) {
        throw new Error(listResult.message || "獲取機台列表失敗");
      }

      const targetArea = detailResult.data[0].productionArea;

      return listResult.data
        .filter((machine) => machine.productionArea === targetArea)
        .map(({ id, machineSN, productionArea }) => ({
          id,
          value: machineSN,
          label: machineSN,
          productionArea,
        }));
    } catch (error) {
      console.error("取得機台資料失敗:", error);
      throw error;
    }
  },
};

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
 * @function createField - 優化版本
 */
// 1. 修改 createField (最小改動)
export const createField = (
  name,
  label,
  type,
  props = {},
  rules = {},
  options = null,
  span,
  getOptions
) => ({
  name,
  label,
  type,
  ...props,
  rules: {
    ...rules,
    ...(type === "number" && {
      setValueAs: (value) => {
        if (value === "" || value === null) return null;
        return Number(value);
      },
    }),
  },
  ...(span && { span }),
  // 改為直接傳入 getOptions 函數，而不是呼叫它
  ...(getOptions ? { getOptions } : {}),
  ...(options ? { options } : {}),
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
    "抽料費用",
    "number",
    createInputProps("元", "抽料費用"),
    createRequiredRule("抽料費用")
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
    null,
    3,
    optionsService.getCommonUnits
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
};

// =============== 包裝成本字段 ===============
const packagingCostFields = {
  packagingType: createField(
    "packagingType",
    "包材類型",
    "select",
    { placeholder: "請選擇包材類型" },
    createRequiredRule("包材類型"),
    null,
    3,
    optionsService.getPackagingTypes
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
    null,
    3,
    optionsService.getCommonUnits
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
    "量",
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
    null,
    3,
    optionsService.getFreightTypes
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
      span: 12,
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
      span: 3,
    })),
  },
  internalProcessingCosts: {
    title: "廠內加工成本",
    fields: Object.values(internalProcessingFields).map((field) => ({
      ...field,
      span: 2,
    })),
  },
};
