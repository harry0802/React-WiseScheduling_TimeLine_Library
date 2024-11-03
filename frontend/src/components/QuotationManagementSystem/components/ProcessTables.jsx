// src/components/Global/table/ProcessTables.js
import React from "react";
import { Typography, Box } from "@mui/material";
import QmsCasTable from "../../Global/table/QmsCasTable";
import {
  PROCESS_TYPES,
  PROCESS_TYPE_OPTIONS,
} from "../../QuotationManagementSystem/config/processTypes";
// TODO 需要組裡表單金額邏輯
// * ProcessTableRenderer 組件
//* 用戶手填寫的 input 欄位
const renderDefaultProcessType = (formData, processType) => (
  <Box>
    <Typography>預檢不良率: {formData.preInspectionRate || 0}%</Typography>
    <Typography>
      預檢原料報廢百分比: {formData.preInspectionLossRate || 0}%
    </Typography>
    <Typography>檢驗費用: {formData.inspectionFee || 0}元</Typography>
    <Typography>加工費用: {formData.processingFee || 0}元</Typography>
  </Box>
);

// 不同製程的表格渲染配置
const renderProcessTable = ({ processType, formData }) => {
  console.log("🔥🔥🔥🔥 ~ renderProcessTable ~  processType:", processType);

  switch (processType) {
    case PROCESS_TYPES.FACTORY_INTERNAL_SHAPING.key: {
      const headers = [
        [{ title: "工廠內成型製程費用", colSpan: 7 }],
        [
          "機台區域",
          "機台編號",
          "工時比例",
          "不良率",
          "淺包工時",
          "成型週期",
          "穴數",
        ],
      ];
      const data = [
        {
          cells: [
            { value: formData.machineArea },
            { value: formData.machineId },
            { value: `${formData.workHourRatio}%`, align: "right" },
            { value: `${formData.defectRate}%`, align: "right" },
            { value: `${formData.shallowPackageTime}秒`, align: "right" },
            { value: `${formData.moldingCycle}秒`, align: "right" },
            { value: formData.holeCount, align: "right" },
          ],
        },
      ];
      return <QmsCasTable headers={headers} data={data} />;
    }

    case PROCESS_TYPES.FACTORY_INTERNAL_FINISHING.key: {
      const headers = [
        [{ title: "工廠內後製程費用", colSpan: 3 }],
        ["工時", "單價", "金額"],
      ];
      const data = [
        {
          cells: [
            { value: `${formData.workHours}秒`, align: "right" },
            { value: `${formData.unitPrice}元`, align: "right" },
            {
              value: `${formData.workHours * formData.unitPrice}元`,
              align: "right",
            },
          ],
        },
      ];
      return <QmsCasTable headers={headers} data={data} />;
    }

    case PROCESS_TYPES.OUT_SHAPING.key: {
      const headers = [
        [{ title: "委外成型費用", colSpan: 2 }],
        ["單價", "金額"],
      ];
      const data = [
        {
          cells: [
            { value: `${formData.unitPrice}元`, align: "right" },
            { value: `${formData.unitPrice}元`, align: "right" },
          ],
        },
      ];
      return <QmsCasTable headers={headers} data={data} />;
    }

    case PROCESS_TYPES.TRANSPORTATION.key: {
      // 運輸費用表格配置
      const transportHeaders = [
        [{ title: "運輸費用", colSpan: 6 }],
        [
          "運送",
          "送貨里程(公里)",
          "司機工時",
          "回程里程(公里)",
          "預估出貨數",
          "金額",
        ],
      ];
      const transportData = [
        {
          cells: [
            { value: formData.transportType },
            { value: formData.distance, align: "right" },
            { value: formData.time + " 小時", align: "right" },
            { value: formData.returnDistance, align: "right" },
            { value: formData.quantity + " pcs.", align: "right" },
            { value: "計算金額", align: "right" },
          ],
        },
        {
          isTotal: true,
          cells: [
            { value: "運輸費用與成本小計", colSpan: 5 },
            { value: "總金額 元", align: "right" },
          ],
        },
      ];

      const freightHeaders = [
        [{ title: "貨運與關稅", colSpan: 3 }],
        ["項目", "預估出貨數", "金額"],
      ];
      const freightData = [
        {
          cells: [
            { value: "貨運" },
            { value: formData.customsQuantity + " pcs.", align: "right" },
            { value: formData.freightCost + " 元", align: "right" },
          ],
        },
        {
          isTotal: true,
          cells: [
            { value: "貨運費用小計", colSpan: 2 },
            { value: formData.freightCost + " 元", align: "right" },
          ],
        },
      ];

      const totalFooter = [
        [
          { value: "運輸與貨運總成本統計", colSpan: 5 },
          {
            value:
              (
                parseFloat(formData.freightCost) +
                parseFloat(formData.distance) * 10
              ).toFixed(2) + " 元",
            align: "right",
          },
        ],
      ];

      return (
        <>
          <QmsCasTable headers={transportHeaders} data={transportData} />
          <QmsCasTable
            headers={freightHeaders}
            data={freightData}
            footers={totalFooter}
          />
        </>
      );
    }

    case PROCESS_TYPES.APPEARANCE_INSPECTION.key: {
      const headers = [
        [{ title: "原物料費用成本", colSpan: 7 }],
        ["原物料種類", "物料編號", "物料名稱", "重量", "單位", "單價", "金額"],
      ];
      const data = formData?.materials?.map((material) => ({
        cells: [
          { value: material.type },
          { value: material.code },
          { value: material.name },
          { value: material.weight, align: "right" },
          { value: material.unit },
          { value: material.unitPrice, align: "right" },
          { value: material.amount, align: "right" },
        ],
      }));
      return (
        <>
          <Typography variant="subtitle1">製程3 廠內外觀整修</Typography>
          <Typography>預不良率: {formData.preInspectionRate}%</Typography>
          <Typography>
            預檢原料報廢百分比: {formData.preInspectionLossRate}%
          </Typography>
          <Typography>檢費用: {formData.inspectionFee}元</Typography>
          <Typography>工費用: {formData.processingFee}元</Typography>
          <QmsCasTable headers={headers} data={data} />
        </>
      );
    }

    case PROCESS_TYPES.INTERNAL_SHIPPING_INSPECTION.key: {
      const headers = [
        [{ title: "廠內出貨檢驗費用", colSpan: 3 }],
        ["工時", "單價", "金額"],
      ];
      const data = [
        {
          cells: [
            { value: `${formData.workHours}秒`, align: "right" },
            { value: `${formData.unitPrice}元`, align: "right" },
            {
              value: `${formData.workHours * formData.unitPrice}元`,
              align: "right",
            },
          ],
        },
      ];
      return <QmsCasTable headers={headers} data={data} />;
    }

    default:
      return renderDefaultProcessType(formData, processType);
  }
};

export default renderProcessTable;
