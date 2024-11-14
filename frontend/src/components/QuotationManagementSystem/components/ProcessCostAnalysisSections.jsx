import React, { useEffect, useMemo, useState } from "react";

import BaseAccordion from "../../Global/accordion/BaseAccordion.jsx";
import { IconButton } from "@mui/material";
import ProductContextCard from "../../ProductionRecord/utility/ProductContextCard.jsx";
import useNotification from "../../ProductionRecord/hook/useNotification.js";
import { PROCESS_TYPES } from "../../QuotationManagementSystem/config/processTypes.js";
import BaseDrawer from "../../Global/Drawer/BaseDrawer.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { mockProcessCostAnalysisData } from "../data/processCostAnalysisData";
import { useProcessForm } from "../hook/useProcessForm.jsx";
import ProcessForm from "./ProcessForm";
import RenderProcessTable from "./ProcessTables";
import { calculateTotalCost } from "../hook/useProcessComputations.jsx";

// * 刪除製程的按鈕
//  !只有業務報價可以刪除製程fBaseProcessCostAnalysis
function DeleteButton({ processId, onClose }) {
  const { notifySuccess, notifyError } = useNotification();

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      notifySuccess("製程已成功刪除");
    } catch (error) {
      console.error("Error deleting process:", error);
      notifyError("刪製程時發生錯誤");
    } finally {
      onClose();
    }
  };

  return (
    <IconButton onClick={handleDelete} size="small">
      <DeleteIcon />
    </IconButton>
  );
}

// * 共用的 slidebar 抽屜
function ProcessDrawer({ visible, onClose, process, isNew = false, index }) {
  const { methods, handleSubmit } = useProcessForm(process);

  return (
    <BaseDrawer visible={visible} onClose={onClose}>
      <BaseDrawer.Header>
        {isNew
          ? "添加新製程"
          : `製程${index + 1} ${PROCESS_TYPES[process.processType].value}`}
        {!isNew && <DeleteButton processId={process.id} onClose={onClose} />}
      </BaseDrawer.Header>
      <BaseDrawer.Body>
        <ProcessForm
          initialData={process}
          externalMethods={methods}
          onSubmit={handleSubmit}
        />
      </BaseDrawer.Body>
      <BaseDrawer.Footer onSubmit={handleSubmit} />
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
function ProcessItem({ index, process, costResult }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  // 透過 id 找到 costResult 中的 costDetails
  const costDetail = costResult.costDetails.find(
    (detail) => detail.id === process.id
  );

  return (
    <>
      <BaseAccordion
        title={`製程${index + 1} ${
          PROCESS_TYPES[process.processType].value
        } - ${process.processSubtype ?? ""}`}
        OnClick={openDrawer}
      >
        <RenderProcessTable
          processType={process.processType}
          formData={process}
          costDetail={costDetail}
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

// 基礎的 ProcessCostAnalysis 組件
//  TODO 之後 API 完成後，改成從 API 拿資料  替換 mockProcessCostAnalysisData
function BaseProcessCostAnalysis({
  title = "各製程物料與加工成本分析",
  icon,
  quotationSlice,
}) {
  const {
    data: processData,
    setData,
    costAndQuotation,
    setCostAndQuotation,
  } = quotationSlice || {};

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

  // 計算所有製程的成本
  const costResult = useMemo(() => {
    return calculateTotalCost(
      processCostAnalysisData.map((process) => ({
        processCategory: process.processType,
        data: process,
      }))
    );
  }, [processCostAnalysisData]);

  // 設定數據
  useEffect(() => {
    setData(processCostAnalysisData);
  }, [processCostAnalysisData, setData]);

  //  設定 不含營銷的成本小計
  useEffect(() => {
    if (!costResult || !setCostAndQuotation) return;
    setCostAndQuotation({
      base: costResult.totalCostSubtotal,
    });
  }, [costResult, setCostAndQuotation]);

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
            costResult={costResult}
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

export default BaseProcessCostAnalysis;
