// 所有的計算小計邏輯 calculation 都移除

/*
ASCII Structure for ProcessTableConfig (with brief explanations)

PROCESS_TABLE_CONFIG
|
├── FACTORY_INTERNAL_SHAPING          // Configuration for internal shaping process
│   ├── title                         // The title of the process cost analysis
│   ├── summaryFields                 // Summary fields to be displayed at the top
│   │   ├── { label, key, unit }      // Each summary field object contains a label, key, and unit
│   │   └── ...                       // Additional summary fields
│   ├── sections                      // Different sections containing detailed breakdowns
│   │   ├── Section: "原物料費用成本"  // Section for raw material cost details
│   │   │   ├── headers               // Headers for each column in this section
│   │   │   ├── dataKey               // Key to access corresponding data values
│   │   │   ├── showSubtotal          // Boolean to show or hide subtotal for this section
│   │   │   ├── subtotalLabel         // Label for the subtotal displayed
│   │   │   └── calculation (optional) // Optional calculation logic for the subtotal
│   │   ├── Section: "包裝材料費用"    // Section for packaging material cost details
│   │   └── Section: "加工成本與電費計算" // Section for processing cost and electricity
│   ├── finalSubtotalLabel            // Label for the final subtotal of the process
│   └── showFinalSubtotal             // Boolean to show or hide the final subtotal
*/

import { PROCESS_DATA_KEYS } from "./ProcessDataKeys";

export const PROCESS_TABLE_CONFIG = {
  // *工廠內成型製程配置
  FACTORY_INTERNAL_SHAPING: {
    title: "工廠內成型製程費用",

    // 總和欄位
    summaryFields: [
      { label: "預檢不良率", key: "preInspectionRate", unit: "%" },
      { label: "預檢原料報廢百分比", key: "preInspectionLossRate", unit: "%" },
      { label: "檢驗費用", key: "inspectionFee", unit: "元" },
      { label: "加工費用", key: "processingFee", unit: "元" },
    ],

    // 表格欄位
    sections: [
      {
        // 表格標題
        sectionTitle: "原物料費用成本",
        // 表格欄位
        headers: [
          { label: "原物料種類", key: "materialType" },
          { label: "物料編號", key: "materialCode" },
          { label: "物料名稱", key: "materialName" },
          { label: "重量 (g)", key: "weight", unit: "g" },
          { label: "單位", key: "unit" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        // 表格對應的資料鍵
        dataKey: PROCESS_DATA_KEYS.RAW_MATERIAL,
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "製程物料小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0),
        costKey: "materialCost",
      },
      {
        // 表格標題
        sectionTitle: "包裝材料費用",
        // 表格欄位
        headers: [
          { label: "原物料種類", key: "materialType" },
          { label: "物料編號", key: "materialCode" },
          { label: "物料名稱", key: "materialName" },
          { label: "重量 (g)", key: "weight", unit: "g" },
          { label: "數量", key: "quantity" },
          { label: "單位", key: "unit" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        // 表格對應的資料鍵
        dataKey: PROCESS_DATA_KEYS.PACKAGING_MATERIAL,
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "製程包材小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0),
        costKey: "packagingCost",
      },
      {
        // 表格標題
        sectionTitle: "加工成本與電費計算",
        // 表格欄位
        headers: [
          { label: "潛包工時 (秒)", key: "shallowPackageTime", unit: "秒" },
          { label: "成型週期 (秒)", key: "moldingCycle", unit: "秒" },
          { label: "穴數", key: "holeCount" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "cost", unit: "元", calculated: true },
          { label: "加工工時 (小時)", key: "processingHours", unit: "小時" },
          { label: "電費 (元)", key: "electricityCost", unit: "元" },
        ],
        // 表格對應的資料鍵
        dataKey: null, // 指向 `processData` 中對應的嵌套資料（假設存在）
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "製程1加工費用小計",
        costKey: "moldingCost",
      },
    ],
    // 最終小計標籤
    finalSubtotalLabel: "製程1總成本統計",
    // 顯示最終小計
    showFinalSubtotal: true,
  },
  // *委外成型製程配置
  OUTSOURCED_SHAPING: {
    title: "委外成型製程費用",

    // 總和欄位
    summaryFields: [
      { label: "預檢不良率", key: "preInspectionRate", unit: "%" },
      { label: "預檢原料報廢百分比", key: "preInspectionLossRate", unit: "%" },
      { label: "檢驗費用", key: "inspectionFee", unit: "元" },
      { label: "加工費用", key: "processingFee", unit: "元" },
    ],

    // 表格欄位
    sections: [
      {
        // 表格標題
        sectionTitle: "原物料費用成本",
        // 表格欄位
        headers: [
          { label: "原物料種類", key: "materialType" },
          { label: "物料編號", key: "materialCode" },
          { label: "物料名稱", key: "materialName" },
          { label: "重量 (kg)", key: "weight", unit: "kg" },
          { label: "單位", key: "unit" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        // 表格對應的資料鍵
        dataKey: PROCESS_DATA_KEYS.RAW_MATERIAL, // 指向 `processData` 中對應的嵌套資料
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "製程2物料小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0),
        costKey: "materialCost",
      },
      {
        // 表格標題
        sectionTitle: "包裝材料費用",
        // 表格欄位
        headers: [
          { label: "原物料種類", key: "materialType" },
          { label: "物料編號", key: "materialCode" },
          { label: "物料名稱", key: "materialName" },
          { label: "重量 (kg)", key: "weight", unit: "kg" },
          { label: "數量", key: "quantity" },
          { label: "容量 (公斤/袋子)", key: "capacity", unit: "公斤/袋子" },
          { label: "單位", key: "unit" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        // 表格對應的資料鍵
        dataKey: PROCESS_DATA_KEYS.PACKAGING_MATERIAL, // 指向 `processData` 中對應的嵌套資料
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "製程2包材小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0),
        costKey: "packagingCost",
      },
      {
        // 表格標題
        sectionTitle: "委外後製程與檢查費用",
        // 表格欄位
        headers: [
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        // 表格對應的資料鍵
        dataKey: null, // 指向 `processData` 中對應的嵌套資料（假設存在）
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "製程2後製檢修小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.totalCost || 0), 0),
        costKey: "moldingCost",
      },
    ],
    // 最終小計標籤
    finalSubtotalLabel: "總成本統計",
    // 顯示最終小計
    showFinalSubtotal: true,
  },
  // *工廠內後製製程配置
  FACTORY_INTERNAL_FINISHING: {
    title: "工廠內後製製程費用",

    // 總和欄位
    summaryFields: [
      { label: "預檢不良率", key: "preInspectionRate", unit: "%" },
      { label: "預檢原料報廢百分比", key: "preInspectionLossRate", unit: "%" },
      { label: "檢驗費用", key: "inspectionFee", unit: "元" },
      { label: "加工費用", key: "processingFee", unit: "元" },
    ],

    // 表格欄位
    sections: [
      {
        // 表格標題
        sectionTitle: "原物料費用成本",
        // 表格欄位
        headers: [
          { label: "原物料種類", key: "materialType" },
          { label: "物料編號", key: "materialCode" },
          { label: "物料名稱", key: "materialName" },
          { label: "重量 (kg)", key: "weight", unit: "kg" },
          { label: "單位", key: "unit" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        // 表格對應的資料鍵
        dataKey: PROCESS_DATA_KEYS.RAW_MATERIAL, // 指向 `processData` 中對應的嵌套資料
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "物料小計",
        // 計算小計邏輯
        calculation: (data) =>
          data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0),
        costKey: "materialCost",
      },
      {
        // 表格標題
        sectionTitle: "包裝材料費用",
        // 表格欄位
        headers: [
          { label: "原物料種類", key: "materialType" },
          { label: "物料編號", key: "materialCode" },
          { label: "物料名稱", key: "materialName" },
          { label: "重量 (kg)", key: "weight", unit: "kg" },
          { label: "數量", key: "quantity" },
          { label: "容量 (公斤/袋子)", key: "capacity", unit: "公斤/袋子" },
          { label: "單位", key: "unit" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        // 表格對應的資料鍵
        dataKey: PROCESS_DATA_KEYS.PACKAGING_MATERIAL, // 指向 `processData` 中對應的嵌套資料
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "製程3包材小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0),
        costKey: "packagingCost",
      },
      {
        // 表格標題
        sectionTitle: "廠內後製程與檢查費用",
        // 表格欄位
        headers: [
          { label: "工時 (秒)", key: "workHours", unit: "秒" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          {
            label: "金額 (元)",
            key: "amount",
            unit: "元",
            calculated: true,
          },
        ],
        // 表格對應的資料鍵
        dataKey: null, // 指向 `processData` 中對應的嵌套資料（假設存在）
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "製程3後製檢修小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.totalCost || 0), 0),
        costKey: "moldingCost",
      },
    ],
    // 最終小計標籤
    finalSubtotalLabel: "總成本統計",
    // 顯示最終小計
    showFinalSubtotal: true,
  },
  // *委外後製製程配置
  OUTSOURCED_FINISHING: {
    title: "委外後製製程費用",

    // 總和欄位
    summaryFields: [
      { label: "預檢不良率", key: "preInspectionRate", unit: "%" },
      { label: "預檢原料報廢百分比", key: "preInspectionLossRate", unit: "%" },
      { label: "檢驗費用", key: "inspectionFee", unit: "元" },
      { label: "加工費用", key: "processingFee", unit: "元" },
    ],

    // 表格欄位
    sections: [
      {
        // 表格標題
        sectionTitle: "原物料費用成本",
        // 表格欄位
        headers: [
          { label: "原物料種類", key: "materialType" },
          { label: "物料編號", key: "materialCode" },
          { label: "物料名稱", key: "materialName" },
          { label: "重量 (kg)", key: "weight", unit: "kg" },
          { label: "單位", key: "unit" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        // 表格對應的資料鍵
        dataKey: PROCESS_DATA_KEYS.RAW_MATERIAL, // 指向 `processData` 中對應的嵌套資料
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "製程4物料小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0),
        costKey: "materialCost",
      },
      {
        // 表格標題
        sectionTitle: "包裝材料費用",
        // 表格欄位
        headers: [
          { label: "原物料種類", key: "materialType" },
          { label: "物料編號", key: "materialCode" },
          { label: "物料名稱", key: "materialName" },
          { label: "重量 (kg)", key: "weight", unit: "kg" },
          { label: "數量", key: "quantity" },
          { label: "容量 (公斤/袋子)", key: "capacity", unit: "公斤/袋子" },
          { label: "單位", key: "unit" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        // 表格對應的資料鍵
        dataKey: PROCESS_DATA_KEYS.PACKAGING_MATERIAL, // 指向 `processData` 中對應的嵌套資料
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "包材小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0),
        costKey: "packagingCost",
      },
      {
        // 表格標題
        sectionTitle: "委外印刷費用",
        // 表格欄位
        headers: [
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          {
            label: "金額 (元)",
            key: "amount",
            unit: "元",
            calculated: true,
          },
        ],
        // 表格對應的資料鍵
        dataKey: null, // 指向 `processData` 中對應的嵌套資料（假設存在）
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "製程4委外印刷小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.totalCost || 0), 0),
        costKey: "moldingCost",
      },
    ],
    // 最終小計標籤
    finalSubtotalLabel: "總成本統計",
    // 顯示最終小計
    showFinalSubtotal: true,
  },
  // *廠內出貨檢驗配置
  FACTORY_INTERNAL_SHIPPING_INSPECTION: {
    title: "廠內出貨檢驗費用",

    // 總和欄位
    summaryFields: [],

    // 表格欄位
    sections: [
      {
        // 表格標題
        sectionTitle: "廠內後製程與檢查費用",
        // 表格欄位
        headers: [
          { label: "工時 (秒)", key: "workHours", unit: "秒" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          {
            label: "金額 (元)",
            key: "amount",
            unit: "元",
            calculated: true,
          },
        ],
        // 表格對應的資料鍵
        dataKey: null, // 指向 `processData` 中對應的嵌套資料（假設存在）
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "後製檢修小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.totalCost || 0), 0),
        costKey: "moldingCost",
      },
    ],
    // 最終小計標籤
    finalSubtotalLabel: "製程5總成本統計",
    // 顯示最終小計
    showFinalSubtotal: true,
  },

  // *運輸製程配置
  TRANSPORTATION: {
    title: "運輸費用與貨運運關稅成本",

    // 總和欄位
    summaryFields: [],

    // 表格欄位
    sections: [
      {
        // 表格標題
        sectionTitle: "運輸費用",
        // 表格欄位
        headers: [
          { label: "運送", key: "transportType" },
          { label: "送貨距離 (公里)", key: "distance", unit: "公里" },
          { label: "司機工時", key: "time", unit: "小時" },
          { label: "油錢單價 (每公里)", key: "oilPrice", unit: "公里" },
          { label: "預估出貨數", key: "shipmentQuantity", unit: "pcs" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        // 表格對應的資料鍵
        dataKey: PROCESS_DATA_KEYS.TRANSPORTATION, // 指向 `processData` 中對應的嵌套資料
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "運輸費用與運輸成本小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0),
        costKey: "transportCost",
      },
      {
        // 表格標題
        sectionTitle: "貨運與關稅",
        // 表格欄位
        headers: [
          { label: "費用類型", key: "feeType" },
          { label: "貨運", key: "freightCost", unit: "元" },
          { label: "預估出貨數", key: "estimatedShipment", unit: "pcs" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        // 表格對應的資料鍵
        dataKey: PROCESS_DATA_KEYS.FREIGHT_AND_DUTY, // 指向 `processData` 中對應的嵌套資料
        // 顯示小計
        showSubtotal: true,
        // 小計標籤
        subtotalLabel: "貨運費用小計",
        // 計算小計邏輯
        // calculation: (data) =>
        //   data.reduce((sum, item) => sum + parseFloat(item.totalCost || 0), 0),
        costKey: "freightCost",
      },
    ],
    // 最終小計標籤
    finalSubtotalLabel: "運輸與貨運總成本統計",
    // 顯示最終小計
    showFinalSubtotal: true,
  },
};

// ! 使用範例
// import { PROCESS_TABLE_CONFIG } from "./ProcessTableConfig";
// import RenderProcessTable from "../components/RenderProcessTable";
// import QmsCasTable from "../components/QmsCasTable";

// const ExampleUsageComponent = ({ processType, processData }) => {
//   const processConfig = PROCESS_TABLE_CONFIG[processType];
//   return (
//     <div>
//       <h2>{processConfig.title}</h2>
//     *  {/* 渲染 summaryFields */}
//       {processConfig.summaryFields.map((field) => (
//         <p key={field.key}>
//           {field.label}: {processData[field.key]}
//           {field.unit}
//         </p>
//       ))}
//     *  {/* 渲染 sections 表格 */}
//       {processConfig.sections.map((section, index) => (
//         <div key={index}>
//           <h3>{section.sectionTitle}</h3>
//           <QmsCasTable
//             headers={section.headers}
//             data={processData[section.dataKey]}
//           />
//           {section.showSubtotal && (
//             <p>
//               {section.subtotalLabel}: {" "}
//               {section.calculation(processData[section.dataKey])} 元
//             </p>
//           )}
//         </div>
//       ))}
//     *  {/* 最終小計顯示 */}
//       {processConfig.showFinalSubtotal && (
//         <div>
//           <h3>{processConfig.finalSubtotalLabel}</h3>
//           <p>總金額: {/* 計算所有 sections 的小計並顯示 */}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExampleUsageComponent;
