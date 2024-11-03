// src/config/ProcessTableConfig.js

export const PROCESS_TABLE_CONFIG = {
  // 工廠內成型製程配置
  FACTORY_INTERNAL_SHAPING: {
    title: "工廠內成型製程費用",
    sections: [
      {
        sectionTitle: "原物料費用成本",
        headers: [
          { label: "原物料種類", key: "materialType" },
          { label: "物料編號", key: "materialCode" },
          { label: "物料名稱", key: "materialName" },
          { label: "重量 (g)", key: "weight", unit: "g" },
          { label: "單位", key: "unit" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        dataKeys: [
          "materialType",
          "materialCode",
          "materialName",
          "weight",
          "unit",
          "unitPrice",
          "amount",
        ],
        showSubtotal: true,
        subtotalLabel: "製程1物料小計",
      },
      {
        sectionTitle: "包裝材料費用",
        headers: [
          { label: "原物料種類", key: "materialType" },
          { label: "物料編號", key: "materialCode" },
          { label: "物料名稱", key: "materialName" },
          { label: "重量 (g)", key: "weight", unit: "g" },
          { label: "數量", key: "quantity" },
          { label: "容量 (公斤/袋子)", key: "capacity", unit: "公斤/袋子" },
          { label: "單位", key: "unit" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "amount", unit: "元" },
        ],
        dataKeys: [
          "materialType",
          "materialCode",
          "materialName",
          "weight",
          "quantity",
          "capacity",
          "unit",
          "unitPrice",
          "amount",
        ],
        showSubtotal: true,
        subtotalLabel: "製程1包材小計",
      },
      {
        sectionTitle: "加工成本與電費計算",
        headers: [
          { label: "潛包工時 (秒)", key: "shallowPackageTime", unit: "秒" },
          { label: "成型週期 (秒)", key: "moldingCycle", unit: "秒" },
          { label: "穴數", key: "holeCount" },
          { label: "單價 (元)", key: "unitPrice", unit: "元" },
          { label: "金額 (元)", key: "cost", unit: "元", calculated: true },
          { label: "加工工時 (小時)", key: "processingHours", unit: "小時" },
          { label: "電費 (元)", key: "electricityCost", unit: "元" },
        ],
        dataKeys: [
          "shallowPackageTime",
          "moldingCycle",
          "holeCount",
          "unitPrice",
          "cost",
          "processingHours",
          "electricityCost",
        ],
        showSubtotal: true,
        subtotalLabel: "製程1加工費用小計",
      },
    ],
    finalSubtotalLabel: "製程1總成本統計",
    showFinalSubtotal: true,
  },
  // ...其他製程配置
};
