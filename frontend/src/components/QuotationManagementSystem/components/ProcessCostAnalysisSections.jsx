// src/components/Global/sections/ProcessCostAnalysisSections.jsx
import React, { useState } from "react";

import BaseAccordion from "../../Global/accordion/BaseAccordion.jsx";
import { IconButton } from "@mui/material";
import ProductContextCard from "../../ProductionRecord/utility/ProductContextCard.jsx";
import useNotification from "../../ProductionRecord/hook/useNotification.js";
import {
  PROCESS_TYPES,
  PROCESS_SUBTYPES,
} from "../../QuotationManagementSystem/config/processTypes.js";
import BaseDrawer from "../../Global/Drawer/BaseDrawer.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { mockProcessCostAnalysisData } from "../data/processCostAnalysisData";
import { useProcessForm } from "../hook/useProcessForm.jsx";
import ProcessForm from "./ProcessForm";
import RenderProcessTable from "./ProcessTables";
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
        <RenderProcessTable
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
