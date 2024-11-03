export const mockProcessCostAnalysisData = [
  // 工廠內成型製程
  {
    id: "1",
    processType: "FACTORY_INTERNAL_SHAPING",
    processSubtype: "模具成型",
    preInspectionRate: "3",
    preInspectionLossRate: "2",
    inspectionFee: "1200",
    processingFee: "800",
    todoItems_原物料成本: [
      {
        materialType: "鋼鐵",
        materialCode: "MT001",
        materialName: "鋁塊",
        weight: "500",
        unit: "kg",
        unitPrice: "80",
        amount: "40000",
      },
      {
        materialType: "鋼鐵",
        materialCode: "MT001",
        materialName: "鋁塊",
        weight: "500",
        unit: "kg",
        unitPrice: "80",
        amount: "40000",
      },
    ],
    todoItems_包裝材料費: [
      {
        materialType: "包材",
        materialCode: "MT002",
        materialName: "保護膜",
        weight: "50",
        unit: "pcs",
        unitPrice: "10",
        amount: "500",
      },
    ],
    machineArea: "A",
    machineId: "A1",
    workHourRatio: "85",
    defectRate: "2.5",
    shallowPackageTime: "30",
    moldingCycle: "45",
    holeCount: "4",
  },

  // 委外成型
  {
    id: "2",
    processType: "OUT_SHAPING",
    processSubtype: "擠出成型",
    preInspectionRate: "2.5",
    preInspectionLossRate: "1.5",
    inspectionFee: "1000",
    processingFee: "600",
    todoItems_原物料成本: [
      {
        materialType: "鋼鐵",
        materialCode: "MT003",
        materialName: "鐵件",
        weight: "300",
        unit: "kg",
        unitPrice: "60",
        amount: "18000",
      },
    ],
    todoItems_包裝材料費: [
      {
        materialType: "包材",
        materialCode: "MT004",
        materialName: "塑膠膜",
        weight: "100",
        unit: "pcs",
        unitPrice: "5",
        amount: "500",
      },
    ],
    unitPrice: "1200",
  },

  // 工廠內後製製程
  {
    id: "3",
    processType: "FACTORY_INTERNAL_FINISHING",
    processSubtype: "塗裝",
    preInspectionRate: "2",
    preInspectionLossRate: "1",
    inspectionFee: "800",
    processingFee: "500",
    todoItems_原物料成本: [
      {
        materialType: "色母",
        materialCode: "MT005",
        materialName: "塗料",
        weight: "200",
        unit: "kg",
        unitPrice: "150",
        amount: "30000",
      },
    ],
    todoItems_包裝材料費: [
      {
        materialType: "包材",
        materialCode: "MT006",
        materialName: "氣泡墊",
        weight: "100",
        unit: "pcs",
        unitPrice: "5",
        amount: "500",
      },
    ],
    workHours: "3600",
    unitPrice: "1000",
  },

  // 廠內出貨檢驗
  {
    id: "4",
    processType: "INTERNAL_SHIPPING_INSPECTION",
    processSubtype: "嚴格檢驗",
    workHours: "3600",
    unitPrice: "1000",
    todoItems_包裝材料費: [
      {
        materialType: "包材",
        materialCode: "MT007",
        materialName: "封箱膠帶",
        weight: "30",
        unit: "pcs",
        unitPrice: "5",
        amount: "150",
      },
    ],
  },

  // 廠內外觀整修
  {
    id: "5",
    processType: "APPEARANCE_INSPECTION",
    processSubtype: "目視檢查",
    preInspectionRate: "1.5",
    preInspectionLossRate: "1",
    inspectionFee: "600",
    processingFee: "400",
    todoItems_原物料成本: [
      {
        materialType: "鋼鐵",
        materialCode: "MT008",
        materialName: "拋光布",
        weight: "20",
        unit: "pcs",
        unitPrice: "30",
        amount: "600",
      },
    ],
    todoItems_包裝材料費: [
      {
        materialType: "包材",
        materialCode: "MT009",
        materialName: "防塵袋",
        weight: "50",
        unit: "pcs",
        unitPrice: "3",
        amount: "150",
      },
    ],
    unitPrice: "800",
  },

  // 運輸製程
  {
    id: "6",
    processType: "TRANSPORTATION",
    processSubtype: "海運",
    todoItems_運輸費用: [
      {
        transportType: "船運",
        distance: "1000",
        time: "72",
      },
    ],
    todoItems_貨運與關稅: [
      {
        freightCost: "25000",
        customsFee: "3500",
      },
    ],
  },
];
