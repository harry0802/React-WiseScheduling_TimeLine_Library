/*
 * description : 生產報表配置
 * data: 2025-7-15
 */

// 🧠 表格列寬配置
const columnsWithOption = {
  small: 100,
  normal: 120,
  large: 150,
  xLarge: 200,
  gain: 250,
  xGain: 300,
};

// 💡 通用格式化函數
const formatters = {
  dateTime: (params) =>
    params.value ? new Date(params.value).toLocaleString() : "",

  decimal: (params) => params.value?.toFixed(2),

  percentage: (params) => (params.value ? `${params.value.toFixed(2)}%` : ""),
};

// ✨ 完整欄位配置
export const ProductionTableColumns = [
  // ID與基本資訊
  {
    field: "id",
    headerName: "ID",
    width: columnsWithOption.small,
    type: "number",
  },
  {
    field: "productionScheduleId",
    headerName: "生產計劃ID",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "productionReportId",
    headerName: "生產報表ID",
    width: columnsWithOption.normal,
    type: "number",
  },
  { field: "type", headerName: "類型", width: columnsWithOption.normal },

  // 機台與工單資訊
  { field: "machineSN", headerName: "機台", width: columnsWithOption.normal },
  {
    field: "workOrderSN",
    headerName: "工單號",
    width: columnsWithOption.large,
  },
  {
    field: "workOrderQuantity",
    headerName: "工單數量",
    width: columnsWithOption.normal,
    type: "number",
  },
  { field: "status", headerName: "狀態", width: columnsWithOption.normal },

  // 計劃時間
  {
    field: "planOnMachineDate",
    headerName: "計劃上機時間",
    width: columnsWithOption.xLarge,
    valueFormatter: formatters.dateTime,
  },
  {
    field: "planFinishDate",
    headerName: "計劃完成時間",
    width: columnsWithOption.xLarge,
    valueFormatter: formatters.dateTime,
  },
  {
    field: "actualOnMachineDate",
    headerName: "實際上機時間",
    width: columnsWithOption.xLarge,
    valueFormatter: formatters.dateTime,
  },

  // 產品資訊
  {
    field: "productSN",
    headerName: "產品編號",
    width: columnsWithOption.xLarge,
  },
  {
    field: "productName",
    headerName: "產品名稱",
    width: columnsWithOption.xGain,
  },
  { field: "material", headerName: "材料", width: columnsWithOption.normal },

  // 製程資訊
  {
    field: "processName",
    headerName: "製程名稱",
    width: columnsWithOption.large,
  },
  { field: "processId", headerName: "製程ID", width: columnsWithOption.normal },
  {
    field: "processOptionId",
    headerName: "製程選項ID",
    width: columnsWithOption.normal,
    type: "number",
  },
  { field: "moldNos", headerName: "模具編號", width: columnsWithOption.normal },

  // 生產資訊
  {
    field: "serialNumber",
    headerName: "序號",
    width: columnsWithOption.normal,
    type: "number",
  },
  { field: "lotName", headerName: "批次號", width: columnsWithOption.xLarge },
  {
    field: "productionQuantity",
    headerName: "生產數量",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "totalProductionQuantity",
    headerName: "總生產數量",
    width: columnsWithOption.normal,
    type: "number",
  },

  // 良率與不良品
  {
    field: "defectiveQuantity",
    headerName: "不良品數量",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "productionDefectiveRate",
    headerName: "不良率(%)",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },
  {
    field: "unfinishedQuantity",
    headerName: "未完成數量",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "productionYield",
    headerName: "生產良率(%)",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },
  {
    field: "actualDefectRate",
    headerName: "實際不良率",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },

  // 不良原因統計
  {
    field: "colorDifference",
    headerName: "色差",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "deformation",
    headerName: "變形",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "shrinkage",
    headerName: "縮水",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "shortage",
    headerName: "缺料",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "hole",
    headerName: "孔洞",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "bubble",
    headerName: "氣泡",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "impurity",
    headerName: "雜質",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "pressure",
    headerName: "壓克",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "overflow",
    headerName: "溢料",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "flowMark",
    headerName: "流痕",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "oilStain",
    headerName: "油污",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "burr",
    headerName: "毛邊",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "blackSpot",
    headerName: "黑點",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "scratch",
    headerName: "刮傷",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "encapsulation",
    headerName: "包封",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "other",
    headerName: "其他",
    width: columnsWithOption.normal,
    type: "number",
  },

  // 生產參數
  {
    field: "moldCavity",
    headerName: "模具穴數",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "moldingSecond",
    headerName: "成型秒數",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "moldModulePerHour",
    headerName: "每小時模次",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "workingHours",
    headerName: "工時",
    width: columnsWithOption.normal,
    type: "number",
  },

  // 機台相關
  {
    field: "machineMode",
    headerName: "機台模式",
    width: columnsWithOption.normal,
  },
  {
    field: "machineProductionModule",
    headerName: "機台生產模組",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "machineProductionQuantity",
    headerName: "機台生產數量",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "machineDefectiveRate",
    headerName: "機台不良率",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },

  // 生產計劃與差異
  {
    field: "planProductionQuantity",
    headerName: "計劃生產數量",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "productionQuantityDifference",
    headerName: "生產數量差異",
    width: columnsWithOption.normal,
    type: "number",
  },

  // 效率指標
  {
    field: "utilizationRate",
    headerName: "稼動率",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },
  {
    field: "productionEfficiency",
    headerName: "生產效率",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },
  {
    field: "OEE",
    headerName: "OEE",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },

  // 人員相關
  { field: "leader", headerName: "組長", width: columnsWithOption.normal },
  {
    field: "operator1",
    headerName: "作業員1",
    width: columnsWithOption.normal,
  },
  {
    field: "operator2",
    headerName: "作業員2",
    width: columnsWithOption.normal,
  },

  // 時間相關
  {
    field: "startTime",
    headerName: "開始時間",
    width: columnsWithOption.xLarge,
    valueFormatter: formatters.dateTime,
  },
  {
    field: "endTime",
    headerName: "結束時間",
    width: columnsWithOption.xLarge,
    valueFormatter: formatters.dateTime,
  },
  {
    field: "logTime",
    headerName: "記錄時間",
    width: columnsWithOption.xLarge,
    valueFormatter: formatters.dateTime,
  },

  // 成本與收益相關
  {
    field: "unitProductRevenue",
    headerName: "單位產品收入",
    width: columnsWithOption.normal,
    type: "number",
    valueFormatter: formatters.decimal,
  },
  {
    field: "fixedUnitProductCost",
    headerName: "單位固定成本",
    width: columnsWithOption.normal,
    type: "number",
    valueFormatter: formatters.decimal,
  },
  {
    field: "variableUnitProductDefectRate",
    headerName: "單位變動不良率",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },
  {
    field: "variableUnitProductCost",
    headerName: "單位變動成本",
    width: columnsWithOption.normal,
    type: "number",
    valueFormatter: formatters.decimal,
  },
  {
    field: "totalUnitProductCost",
    headerName: "單位總成本",
    width: columnsWithOption.normal,
    type: "number",
    valueFormatter: formatters.decimal,
  },
  {
    field: "totalProductionCost",
    headerName: "總生產成本",
    width: columnsWithOption.normal,
    type: "number",
    valueFormatter: formatters.decimal,
  },

  // 損益相關
  {
    field: "totalRevenue",
    headerName: "總收入",
    width: columnsWithOption.normal,
    type: "number",
    valueFormatter: formatters.decimal,
  },
  {
    field: "targetTotalCost",
    headerName: "目標總成本",
    width: columnsWithOption.normal,
    type: "number",
    valueFormatter: formatters.decimal,
  },
  {
    field: "targetOperatingProfit",
    headerName: "目標營業利潤",
    width: columnsWithOption.normal,
    type: "number",
    valueFormatter: formatters.decimal,
  },
  {
    field: "targetOperatingProfitMargin",
    headerName: "目標營業利潤率",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },
  {
    field: "operatingProfit",
    headerName: "營業利潤",
    width: columnsWithOption.normal,
    type: "number",
    valueFormatter: formatters.decimal,
  },
  {
    field: "operatingProfitMargin",
    headerName: "營業利潤率",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },

  // 分析相關
  {
    field: "maximumDefectQuantity",
    headerName: "最大不良數量",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "breakevenTotalQuantity",
    headerName: "損益平衡總量",
    width: columnsWithOption.normal,
    type: "number",
  },
  {
    field: "breakevenDefectRate",
    headerName: "損益平衡不良率",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },
  {
    field: "riskControlAlertDefectRate",
    headerName: "風險控制警示不良率",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },
  {
    field: "yieldRateDifferenceAnalysis",
    headerName: "良率差異分析",
    width: columnsWithOption.large,
    type: "number",
  },
  {
    field: "operatingProfitDifferenceAnalysis",
    headerName: "營業利潤差異分析",
    width: columnsWithOption.large,
    type: "number",
  },
  {
    field: "operatingProfitVariationRate",
    headerName: "營業利潤變動率",
    width: columnsWithOption.normal,
    valueFormatter: formatters.decimal,
  },
];

// 本地化文字配置
export const localeText = {
  noRowsLabel: "無資料",
  loadingLabel: "載入中...",

  columnMenuSortAsc: "由小到大排序",
  columnMenuSortDesc: "由大到小排序",
  columnMenuUnsort: "取消排序",

  columnMenuLabel: "欄位選項",
  columnMenuShowColumns: "選擇欄位",
  columnMenuHideColumn: "隱藏此欄位",
  columnMenuManageColumns: "欄位管理",

  columnMenuFilter: "篩選",
  filterOperatorContains: "包含",
  filterOperatorEquals: "等於",
  filterOperatorStartsWith: "開頭是",
  filterOperatorEndsWith: "結尾是",
  filterPanelAddFilter: "新增篩選",
  filterPanelDeleteIconLabel: "移除",
  filterPanelOperator: "運算子",

  toolbarDensity: "表格密度",
  toolbarDensityLabel: "密度",
  toolbarDensityCompact: "緊密",
  toolbarDensityStandard: "標準",
  toolbarDensityComfortable: "舒適",

  toolbarDensityTooltipDense: "切換為緊密檢視",
  toolbarDensityTooltipStandard: "切換為標準檢視",
  toolbarDensityTooltipComfortable: "切換為舒適檢視",

  MuiTablePagination: {
    labelRowsPerPage: "每頁筆數:",
    labelDisplayedRows: ({ from, to, count }) =>
      `${from} - ${to} / 總共 ${count} 筆`,
  },
};
