import { getColumnDefinitions } from "./getColumnDefinitions";
import {
  generateMockInventories,
  generateMockInventory,
} from "../mockDataGenerators";

const pigCategories = [
  { key: "breeding", label: "種豬" },
  { key: "testing", label: "檢定豬" },
  { key: "meat", label: "肉豬" },
  { key: "farrowing3", label: "分娩(3)" },
  { key: "farrowing8", label: "分娩(8)" },
  { key: "nursery", label: "保育豬" },
];

const commonFields = [
  { key: "Original", label: "原總數" },
  { key: "In", label: "移入" },
  { key: "Out", label: "移出" },
  { key: "Death", label: "死亡頭數" },
  { key: "Sold", label: "出售" },
  { key: "Remaining", label: "剩餘總數" },
];

const specialFields = {
  farrowing3: [
    { key: "SowOriginal", label: "母豬原總數" },
    { key: "SowIn", label: "母豬移入" },
    { key: "SowOut", label: "母豬移出" },
    { key: "SowDeath", label: "母豬死亡" },
    { key: "SowSold", label: "母豬出售" },
    { key: "SowRemaining", label: "剩餘母豬" },
    { key: "PigletOriginal", label: "仔豬原總數" },
    { key: "PigletIn", label: "仔豬移入" },
    { key: "PigletOut", label: "仔豬移出" },
    { key: "PigletDeath", label: "仔豬死亡" },
    { key: "PigletSold", label: "仔豬出售" },
    { key: "PigletRemaining", label: "剩餘仔豬總數" },
    { key: "PigletBorn", label: "仔豬出生" },
    { key: "PigletWeakBorn", label: "出生弱仔" },
    { key: "PigletWeakDeath", label: "弱仔死亡" },
  ],
  farrowing8: [
    { key: "SowOriginal", label: "母豬原總數" },
    { key: "SowIn", label: "母豬移入" },
    { key: "SowOut", label: "母豬移出" },
    { key: "SowDeath", label: "母豬死亡" },
    { key: "SowSold", label: "母豬出售" },
    { key: "SowRemaining", label: "剩餘母豬" },
    { key: "PigletOriginal", label: "仔豬原總數" },
    { key: "PigletIn", label: "仔豬移入" },
    { key: "PigletOut", label: "仔豬移出" },
    { key: "PigletDeath", label: "仔豬死亡" },
    { key: "PigletSold", label: "仔豬出售" },
    { key: "PigletRemaining", label: "剩餘仔豬總數" },
    { key: "PigletBorn", label: "仔豬出生" },
    { key: "PigletWeakBorn", label: "出生弱仔" },
    { key: "PigletWeakDeath", label: "弱仔死亡" },
    { key: "NurseryPigOriginal", label: "保育豬原總數" },
    { key: "NurseryPigIn", label: "保育豬移入" },
    { key: "NurseryPigOut", label: "保育豬移出" },
    { key: "NurseryPigDeath", label: "保育豬死亡" },
    { key: "NurseryPigSold", label: "保育豬出售" },
    { key: "NurseryPigRemaining", label: "剩餘保育豬總數" },
  ],
};

const generateFields = (category) => {
  // 優先搜尋 specialFields key 若不存在使用 commonFields
  const fields = specialFields[category.key] || commonFields;
  return fields.map((field) => ({
    name: `${category.key}${field.key}`,
    label: `${category.label}${field.label}`,
    type: "number",
    span: 8,
    rules: [{ type: "number", min: 0, message: "必須大於等於 0" }],
  }));
};

export const pigHouseInventoryConfig = {
  title: "豬舍庫存",

  getColumns: getColumnDefinitions,

  formFields: [
    {
      name: "date",
      label: "日期",
      type: "date",
      span: 8,
      rules: [{ required: true, message: "請選擇日期" }],
    },
    {
      name: "totalPigs",
      label: "總隻數",
      type: "number",
      span: 8,
      rules: [{ type: "number", min: 0, message: "必須大於等於 0" }],
    },
    {
      name: "totalDeaths",
      label: "總死亡數",
      type: "number",
      span: 8,
      rules: [{ type: "number", min: 0, message: "必須大於等於 0" }],
    },
    {
      name: "totalSold",
      label: "總出售",
      type: "number",
      span: 8,
      rules: [{ type: "number", min: 0, message: "必須大於等於 0" }],
    },
    ...pigCategories.flatMap(generateFields),
  ],

  fetchItems: async () => {
    return generateMockInventories(100);
  },

  addItem: async (item) => {
    const newItem = generateMockInventory(Date.now());
    console.log(newItem);

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
