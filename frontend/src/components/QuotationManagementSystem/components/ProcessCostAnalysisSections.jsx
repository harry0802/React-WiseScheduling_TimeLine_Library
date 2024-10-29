// src/components/Global/sections/ProcessCostAnalysisSections.jsx
import React, { useState } from "react";

import BaseAccordion from "../../Global/accordion/BaseAccordion.jsx";
import { Box, IconButton, Typography } from "@mui/material";
import ProductContextCard from "../../ProductionRecord/utility/ProductContextCard.jsx";
import useNotification from "../../ProductionRecord/hook/useNotification.js";
import QmsCasTable from "../../Global/table/QmsCasTable.jsx";
import {
  PROCESS_TYPE_OPTIONS,
  PROCESS_TYPES,
  PROCESS_SUBTYPES,
} from "../../QuotationManagementSystem/config/processTypes.js";
import BaseDrawer from "../../Global/Drawer/BaseDrawer.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { mockProcessCostAnalysisData } from "../data/processCostAnalysisData";
import { useProcessForm } from "../hook/useProcessForm.jsx";
import ProcessForm from "./ProcessForm";

// * 共用的 slidebar 抽屜
function ProcessDrawer({ visible, onClose, process, isNew = false, index }) {
  const { handleSubmit } = useProcessForm(process);

  return (
    <BaseDrawer visible={visible} onClose={onClose}>
      <BaseDrawer.Header>
        {isNew
          ? "添加新製程"
          : `製程${index + 1} ${PROCESS_TYPES[process.processType].value}`}
        {!isNew && <DeleteButton processId={process.id} />}
      </BaseDrawer.Header>
      <BaseDrawer.Body>
        <ProcessForm initialData={process} onSubmit={handleSubmit} />
      </BaseDrawer.Body>
      <BaseDrawer.Footer />
    </BaseDrawer>
  );
}

// * 新增製程 slidebar
function NewProcessDrawer({ isActive, onClose }) {
  const newProcess = { id: "new", processType: "", processSubtype: "" };

  return (
    <ProcessDrawer
      visible={isActive}
      onClose={onClose}
      process={newProcess}
      isNew
    />
  );
}
// * 編輯製程的 accordion 項目 裡面也有 slidebar
function ProcessItem({ index, process }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <BaseAccordion
        title={`製程${index + 1} ${
          PROCESS_TYPES[process.processType].value
        } - ${
          PROCESS_SUBTYPES[process.processType].find(
            (subtype) => subtype.key === process.processSubtype
          )?.label || ""
        }`}
        OnClick={openDrawer}
      >
        <ProcessTableRenderer
          processType={process.processType}
          formData={process}
        />
      </BaseAccordion>
      <ProcessDrawer
        index={index}
        visible={isDrawerOpen}
        onClose={closeDrawer}
        process={process}
      />
    </>
  );
}

// TODO 需要組裡表單金額邏輯
// * ProcessTableRenderer 組件
function ProcessTableRenderer({ processType, formData }) {
  if (!formData) {
    return <Typography variant="body1">尚未填寫資料</Typography>;
  }
  // 檢查formData是否為空對象
  if (Object.keys(formData).length === 0) {
    return <Typography variant="body1">尚未填寫資料</Typography>;
  }

  const renderDefaultProcessType = () => {
    return (
      <Box>
        <Typography variant="subtitle1">
          {PROCESS_TYPE_OPTIONS.find((option) => option.value === processType)
            ?.label || "未知製程"}
        </Typography>
        <Typography>預檢不良率: {formData.preInspectionRate || 0}%</Typography>
        <Typography>
          預檢原料報廢百分比: {formData.preInspectionLossRate || 0}%
        </Typography>
        <Typography>檢驗費用: {formData.inspectionFee || 0}元</Typography>
        <Typography>加工費用: {formData.processingFee || 0}元</Typography>
        {/* 如果有其他通用字段，可以在這裡添加 */}
      </Box>
    );
  };

  switch (processType) {
    case PROCESS_TYPES.TRANSPORTATION.key:
      // 運輸費用與貨運關稅成本的表格渲染邏輯保持不變
      const transportHeaders = [
        [{ title: "運輸費用", colSpan: 6 }],
        [
          { title: "運送" },
          { title: "送貨里程(公里)" },
          { title: "司機工時" },
          { title: "回程里程(公里)" },
          { title: "預估出貨數" },
          { title: "金額" },
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
            { value: "計算金額", align: "right" }, // 這裡需要根據實際邏輯計算
          ],
        },
        {
          isTotal: true,
          cells: [
            { value: "運輸費用與成本小計", colSpan: 5 },
            { value: "總金額 元", align: "right" }, // 這裡需要根據實際邏輯算
          ],
        },
      ];

      const freightHeaders = [
        [{ title: "貨運與關稅", colSpan: 3 }],
        [{ title: "項目" }, { title: "預估出貨數" }, { title: "金額" }],
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

    case PROCESS_TYPES.APPEARANCE_INSPECTION.key:
      // 廠內出貨檢驗的表格渲染邏輯保持不變
      return (
        <>
          <Typography variant="subtitle1">製程3 廠內外觀整修</Typography>
          <Typography>預不良率: {formData.preInspectionRate}%</Typography>
          <Typography>
            預檢原料報廢百分比: {formData.preInspectionLossRate}%
          </Typography>
          <Typography>檢費用: {formData.inspectionFee}元</Typography>
          <Typography>工費用: {formData.processingFee}元</Typography>
          {/* 測染原物料費用成本表格 */}
          <QmsCasTable
            headers={[
              [{ title: "原物料費用成本", colSpan: 7 }],
              [
                "原物料種類",
                "物料編號",
                "物料名稱",
                "重量",
                "單位",
                "單價",
                "金額",
              ],
            ]}
            data={formData?.materials?.map((material) => ({
              cells: [
                { value: material.type },
                { value: material.code },
                { value: material.name },
                { value: material.weight, align: "right" },
                { value: material.unit },
                { value: material.unitPrice, align: "right" },
                { value: material.amount, align: "right" },
              ],
            }))}
          />
          {/* 測染包裝材料費表格 */}
          {/* 測染加工成本與費用計算表格 */}
        </>
      );

    default:
      return renderDefaultProcessType();
  }
}

// * 刪除製程的按鈕
function DeleteButton({ processId }) {
  const { notifySuccess, notifyError } = useNotification();

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      notifySuccess("製程已成功刪除");
    } catch (error) {
      console.error("Error deleting process:", error);
      notifyError("刪製程時發生錯誤");
    }
  };

  return (
    <IconButton onClick={handleDelete} size="small">
      <DeleteIcon />
    </IconButton>
  );
}

// 主的 ProcessCostAnalysisContent 組件
//  TODO 之後 API 完成後，改成從 API 拿資料  替換 mockProcessCostAnalysisData

function ProcessCostAnalysisContent({ title, icon }) {
  const [processCostAnalysisData, setProcessCostAnalysisData] = useState(
    mockProcessCostAnalysisData
  );
  const [isNewDrawerOpen, setIsNewDrawerOpen] = useState(false);
  const openNewProcessDrawer = () => setIsNewDrawerOpen(true);
  const closeNewProcessDrawer = () => setIsNewDrawerOpen(false);

  // ! 處理 onUpdate 的邏輯 (暫時) 之後有 API 後，改成從 API 設定更新的資料
  const handleUpdate = (updatedProcess) => {
    setProcessCostAnalysisData((prev) => [...prev, updatedProcess]);
  };

  return (
    <ProductContextCard
      title={title}
      icon={icon}
      OnClick={openNewProcessDrawer}
    >
      {processCostAnalysisData &&
        processCostAnalysisData.map((process, index) => (
          <ProcessItem
            key={process.id}
            index={index}
            process={process}
            onUpdate={handleUpdate}
          />
        ))}
      {isNewDrawerOpen && (
        <NewProcessDrawer
          isActive={isNewDrawerOpen}
          onClose={closeNewProcessDrawer}
          onUpdate={handleUpdate}
        />
      )}
    </ProductContextCard>
  );
}

// 包裝了 Provider 的主組件
export function ProcessCostAnalysisSections(props) {
  return <ProcessCostAnalysisContent {...props} />;
}
