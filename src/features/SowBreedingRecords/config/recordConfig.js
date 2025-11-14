import { generateMockSowBreedingRecords } from "../sowBreedingMockData";
import { getColumnDefinitions } from "./getCloumn";

// 欄位配置
const fieldsConfig = [
  { key: "blood_sample", label: "PR採血" },
  { key: "batch", label: "批次", required: true },
  { key: "parity", label: "產次", type: "number" },
  { key: "building", label: "棟舍", required: true },
  { key: "column", label: "欄位" },
  { key: "variety", label: "品種" },
  { key: "ear_tag", label: "耳號", required: true },
  { key: "birthday", label: "生日", type: "date" },
  { key: "sire", label: "配種公豬", required: true },
  { key: "breeding_date", label: "配種日期", type: "date", required: true },
  { key: "due_date", label: "預產期", type: "date" },
  { key: "weaning_date", label: "離乳日期", type: "date" },
  { key: "to_delivery_shed_date", label: "至分娩舍日期", type: "date" },
  { key: "breeding_three_week_date", label: "配種三週日期", type: "date" },
  { key: "pregnancy_test_date_1", label: "測孕日期(1)", type: "date" },
  { key: "pregnancy_result_1", label: "測孕結果(1)" },
  { key: "pregnancy_test_date_2", label: "測孕日期(2)", type: "date" },
  { key: "pregnancy_result_2", label: "測孕結果(2)" },
  { key: "dual_infection", label: "雙毒（小病毒/丹毒" },
  { key: "AR", label: "AR" },
  { key: "PR", label: "PR" },
  { key: "E_coli", label: "E.coli" },
  { key: "PRRS", label: "PRRS" },
  { key: "harmful_removal", label: "害獲滅" },
  { key: "genotype", label: "基因型" },
  { key: "coat_color_gene", label: "毛色基因" },
  { key: "sire_info", label: "父畜" },
  { key: "dam_info", label: "母畜" },
  { key: "notes", label: "備註" },
];

// 動態生成表單字段
const generateFields = (config) => {
  return config.map(({ key, label, type = "input", required = false }) => {
    const field = {
      name: key,
      label,
      type,
      span: 8,
    };

    if (required) {
      field.rules = [{ required: true, message: `請輸入${label}` }];
    }

    if (type === "number") {
      field.rules = field.rules || [];
      field.rules.push({ type: "number", min: 0, message: "必須大於等於 0" });
    }

    return field;
  });
};

// 母豬配種庫存配置
export const breedingInventoryConfig = {
  title: "母豬配種",
  getColumns: getColumnDefinitions,
  formFields: generateFields(fieldsConfig),

  fetchItems: async () => {
    return generateMockSowBreedingRecords(100);
  },

  addItem: async (item) => {
    // const newItem = generateMockSowBreedingRecords(Date.now());
    console.log("Adding item:", { ...item });
    return { ...item };
  },

  updateItem: async (id, updates) => {
    console.log("Updating item:", id, updates);
    return { id, ...updates };
  },

  deleteItem: async (id) => {
    console.log("Deleting item:", id);
  },
};
