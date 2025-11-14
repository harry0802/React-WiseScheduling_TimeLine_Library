import {
  generateMockBoarGenotype,
  generateMockBoarGenotypes,
} from "../mockBoargenotype";
import { getColumnDefinitions } from "./getCloumn";

export const boarGenotypeConfig = {
  title: "公豬基因型",

  getColumns: getColumnDefinitions,

  formFields: [
    {
      name: "building",
      label: "棟舍",
      type: "input",
      span: 8,
      rules: [{ required: true, message: "請輸入棟舍" }],
    },
    { name: "column", label: "欄位", type: "input", span: 8 },
    { name: "breed", label: "品種", type: "input", span: 8 },
    {
      name: "earTag",
      label: "耳號",
      type: "input",
      span: 8,
      rules: [{ required: true, message: "請輸入耳號" }],
    },
    { name: "birthDate", label: "出生日期", type: "date", span: 8 },
    {
      name: "genotype",
      label: "基因型",
      type: "input",
      span: 8,
      rules: [{ required: true, message: "請輸入基因型" }],
    },
    { name: "notes", label: "備註", type: "input", span: 8 },
    { name: "sire", label: "父畜", type: "input", span: 8 },
    { name: "dam", label: "母畜", type: "input", span: 8 },
    { name: "selection", label: "留種", type: "input", span: 8 },
    { name: "coatColorGene", label: "毛色基因", type: "input", span: 8 },
    { name: "swineFever", label: "豬瘟", type: "input", span: 8 },
    { name: "swineErysipelas", label: "豬丹毒", type: "input", span: 8 },
    { name: "pseudoRabies", label: "假性狂犬病", type: "input", span: 8 },
    { name: "prrs", label: "藍耳病", type: "input", span: 8 },
  ],

  fetchItems: async () => {
    return generateMockBoarGenotypes(100);
  },

  addItem: async (item) => {
    const newItem = generateMockBoarGenotype(Date.now());
    console.log("Adding item:", { ...item, ...newItem });
    return { ...newItem, ...item };
  },

  updateItem: async (id, updates) => {
    console.log("Updating item:", id, updates);
    return { id, ...updates };
  },

  deleteItem: async (id) => {
    console.log("Deleting item:", id);
  },
};
