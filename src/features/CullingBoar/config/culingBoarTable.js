import {
  generateMockCullingBoar,
  generateMockCullingBoars,
} from "../mouckData";
import { getColumnDefinitions } from "./getCloumn";

const formFields = [
  {
    name: "building",
    label: "棟舍",
    type: "input",
    span: 8,
    rules: [{ required: true, message: "請輸入棟舍" }],
  },
  { name: "pen", label: "欄位", type: "input", span: 8 },
  { name: "breed", label: "品種", type: "input", span: 8 },
  {
    name: "ear_tag",
    label: "耳號",
    type: "input",
    span: 8,
    rules: [{ required: true, message: "請輸入耳號" }],
  },
  { name: "birth_date", label: "生日", type: "date", span: 8 },
  { name: "boar_used", label: "配種公豬", type: "input", span: 8 },
  { name: "mating_date", label: "配種日期", type: "date", span: 8 },
  { name: "farrowing_date", label: "分娩日期", type: "date", span: 8 },
  {
    name: "reason",
    label: "原因",
    type: "input",
    span: 8,
    rules: [{ required: true, message: "請輸入淘汰原因" }],
  },
  {
    name: "departure_date",
    label: "離場日期",
    type: "date",
    span: 8,
    rules: [{ required: true, message: "請選擇離場日期" }],
  },
];

export const cullingBoarConfig = {
  title: "公豬淘汰",

  getColumns: getColumnDefinitions,

  formFields: formFields,

  fetchItems: async () => {
    return generateMockCullingBoars(100);
  },

  addItem: async (item) => {
    const newItem = generateMockCullingBoar(Date.now());
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
