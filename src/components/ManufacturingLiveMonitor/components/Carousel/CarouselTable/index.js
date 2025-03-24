// src/components/ProductionTable/index.js
import CarouselTable from "./CarouselTable";
export {
  createStatusRules,
  createColorCondition,
  createDateCondition,
} from "./utils";

export default CarouselTable;
/*
src/
├── components/
│   └── CarouselTable/
│       ├── index.js                  # 主要入口點
│       ├── CarouselTable.jsx         # 主元件
│       ├── config.js                 # 配置與常量
│       ├── transformers.js           # 數據轉換函數
│       ├── utils.js                  # 工具函數
│       └── hooks.js                  # 自定義 hooks
└── examples/
    └── CarouselTableExample.jsx    # 使用示例
*/

// const test = () => {
//   // 測試數據轉換函數

//   // 模擬 API 數據
//   const mockApiData = [
//     {
//       modelCode: "AENG-2477-GF2",
//       modelName: "INJ-01",
//       productCode: "BC-240723",
//       productName: "24CF-上框熱鐵-CL327",
//       quantity: 7308,
//       station: "A2",
//       expiryDate: "2025-04-15",
//     },
//     {
//       modelCode: "AENG-2457-GF1",
//       modelName: "INJ-01",
//       productCode: "EF-24-0617",
//       productName: "橘黃中圓B-TOP2374",
//       quantity: 21473,
//       station: "B3",
//       expiryDate: "2025-03-25",
//     },
//     {
//       modelCode: "ENAC-2027-GF2",
//       modelName: "ING-02",
//       productCode: "AD-230871",
//       productName: "WEAD24-BLACKPP07",
//       quantity: 2438,
//       station: "A2",
//       expiryDate: "2025-03-10",
//     },
//   ];

//   // 設置狀態規則
//   const statusRules = createStatusRules({
//     expired: {
//       condition: createDateCondition("expiryDate", 0, "after"),
//       color: "#F2285F",
//       columns: [1, 2, 4],
//     },
//     warning: {
//       condition: createDateCondition("expiryDate", 7, "before"),
//       color: "#FFAA00",
//       columns: [1, 2, 4, 6],
//     },
//     lowStock: {
//       condition: createColorCondition("quantity", 0, 3000),
//       color: "#FF6B6B",
//       columns: [5],
//     },
//   });

//   // 設置轉換選項
//   const transformOptions = {
//     header: [
//       "NO.",
//       "型號編號",
//       "型號名稱",
//       "產品編號",
//       "產品名稱",
//       "生產數量",
//       "機台",
//     ],
//     fieldMapping: {
//       modelCode: 1,
//       modelName: 2,
//       productCode: 3,
//       productName: 4,
//       quantity: 5,
//       station: 6,
//     },
//     formatters: {
//       quantity: (val) => val.toLocaleString(),
//     },
//     statusRules,
//     defaultStatus: "normal",
//   };

//   // 執行轉換
//   const transformedData = transformApiData(mockApiData, transformOptions);

//   // 輸出轉換結果
//   console.log(JSON.stringify(transformedData, null, 2));
// };
