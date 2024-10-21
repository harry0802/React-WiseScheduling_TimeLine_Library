// src/components/Global/sections/ProcessCostAnalysisSections.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";

import BaseAccordion from "../../Global/accordion/BaseAccordion.jsx";
import { Tabs, Tab, Box, IconButton, Typography } from "@mui/material";
import ProductContextCard from "../../ProductionRecord/utility/ProductContextCard.jsx";
import useNotification from "../../ProductionRecord/hook/useNotification.js";
import DynamicForm from "../../Global/form/DynamicForm.jsx";
import QmsCasTable from "../../Global/table/QmsCasTable.jsx";
import {
  FORM_CONFIGURATIONS,
  PROCESS_TYPE_OPTIONS,
  PROCESS_TYPES,
  PROCESS_SELECTION_FORM,
  PROCESS_SUBTYPES,
} from "../../QuotationManagementSystem/config/processTypes.js";
import {
  ProcessCostAnalysisProvider,
  useProcessCostAnalysis,
} from "../context/ProcessCostAnalysisContext.jsx";
import BaseDrawer from "../../Global/Drawer/BaseDrawer.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { useWatch } from "react-hook-form";
import { mockProcessCostAnalysisData } from "../data/processCostAnalysisData";

// ProcessTypeSelect 組件
function ProcessTypeSelect() {
  const { processType, methods, formData } = useProcessCostAnalysis();

  const renderFields = useCallback(
    ({ FormItem }) => (
      <>
        {PROCESS_SELECTION_FORM[0].fields.map((field, index) => (
          <FormItem key={index}>
            <DynamicForm.Field
              field={field}
              customProps={{
                getDependentOptions:
                  field.name === "processSubtype"
                    ? (processType) => PROCESS_SUBTYPES[processType] || []
                    : undefined,
              }}
            />
          </FormItem>
        ))}
      </>
    ),
    []
  );

  const memoizedForm = useMemo(
    () => (
      <DynamicForm
        externalMethods={methods}
        submitButton={false}
        initialValues={{
          processType: formData.processType || "",
          processSubtype: formData[formData.processType]?.processSubtype || "",
        }}
      >
        {renderFields}
      </DynamicForm>
    ),
    [methods, renderFields, formData, processType]
  );

  return memoizedForm;
}

// ProcessFormSections 組件
function ProcessFormSections() {
  const { methods } = useProcessCostAnalysis();
  const watchProcessType = useWatch({
    control: methods.control,
    name: "processType",
  });
  const [activeTab, setActiveTab] = useState(0);

  console.log(watchProcessType);

  const sections = FORM_CONFIGURATIONS[watchProcessType] || [];
  console.log(sections);
  const handleTabChange = useCallback((_, newValue) => {
    setActiveTab(newValue);
  }, []);

  const handleFormChange = useCallback((data) => {
    console.log(data);
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [processType]: {
    //     ...prevData[processType],
    //     ...data,
    //   },
    // }));
  }, []);

  const renderFields = useCallback(
    ({ FormItem }) => (
      <>
        {sections[activeTab]?.fields.map((field, fieldIndex) => (
          <FormItem key={fieldIndex}>
            <DynamicForm.Field field={field} />
          </FormItem>
        ))}
      </>
    ),
    [sections, activeTab]
  );

  const memoizedForm = useMemo(
    () => (
      <DynamicForm
        externalMethods={methods}
        submitButton={false}
        onChange={handleFormChange}
      >
        {renderFields}
      </DynamicForm>
    ),
    [methods, renderFields, handleFormChange]
  );

  // 当 processType 改变时,重置 activeTab
  // useEffect(() => {
  //   setActiveTab(0);
  // }, [processType]);
  if (!watchProcessType) {
    return null;
  }

  return (
    <>
      <Tabs value={activeTab} onChange={handleTabChange}>
        {FORM_CONFIGURATIONS[watchProcessType]?.map((section, index) => (
          <Tab key={index} label={section.title} />
        ))}
      </Tabs>
      <Box sx={{ p: 3 }}>{memoizedForm}</Box>
    </>
  );
}

// TODO: 需要組裡表單金額邏輯
//  ProcessTableRenderer 組件
function ProcessTableRenderer({ processType, formData }) {
  if (!formData) {
    return <Typography variant="body1">尚未填寫資料</Typography>;
  }

  console.log(formData);
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
            { value: "總金額 元", align: "right" }, // 這裡需要根據實際邏輯計算
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
          <Typography>預檢不良率: {formData.preInspectionRate}%</Typography>
          <Typography>
            預檢原料報廢百分比: {formData.preInspectionLossRate}%
          </Typography>
          <Typography>檢驗費用: {formData.inspectionFee}元</Typography>
          <Typography>加工費用: {formData.processingFee}元</Typography>
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

// 主要的 ProcessCostAnalysisContent 組件
function ProcessCostAnalysisContent({ onUpdate, title, icon }) {
  const {
    processType,
    setProcessType,
    methods,
    handleFormSubmit,
    infoDrawer,
    openDrawer,
    closeDrawer,
    formData,
    typeTitle, // 新增這行來獲取 typeTitle
    currentData, // 新增這行來獲取 currentData
  } = useProcessCostAnalysis();
  const { notifySuccess } = useNotification();
  const handleConfirm = async () => {
    const currentFormData = methods.getValues();
    const allData = {
      ...formData,
      [processType]: {
        ...formData[processType],
        ...currentFormData,
      },
    };

    try {
      await handleFormSubmit(allData);
      if (typeof onUpdate === "function") {
        await onUpdate(allData);
      }
      closeDrawer();
      setTimeout(() => notifySuccess("資料已成功保存"), 100);
      console.log("Saved data:", allData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <ProductContextCard title={title} icon={icon} OnClick={() => openDrawer()}>
      {mockProcessCostAnalysisData.map((process) => (
        <BaseAccordion
          key={process.id}
          title={`${PROCESS_TYPES[process.processType].value} - ${
            PROCESS_SUBTYPES[process.processType].find(
              (subtype) => subtype.key === process.processSubtype
            )?.label || ""
          }`}
          OnClick={() => openDrawer(process.id)}
        >
          <ProcessTableRenderer
            processType={process.processType}
            formData={process}
          />
        </BaseAccordion>
      ))}
      <BaseDrawer visible={infoDrawer} onClose={closeDrawer}>
        <BaseDrawer.Header>
          {typeTitle || "添加新製程"} {/* 使用 typeTitle */}
          {currentData.id && ( // 只在編輯現有流程時顯示刪除按鈕
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                console.log("Delete process:", currentData.id);
                // 實現刪除邏輯
              }}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </BaseDrawer.Header>
        <BaseDrawer.Body>
          {processType ? (
            <>
              <ProcessTypeSelect />
              <ProcessFormSections />
            </>
          ) : (
            <ProcessTypeSelect />
          )}
        </BaseDrawer.Body>
        <BaseDrawer.Footer onSubmit={methods.handleSubmit(handleConfirm)} />
      </BaseDrawer>
    </ProductContextCard>
  );
}

// 包裝了 Provider 的主組件
export function ProcessCostAnalysisSections(props) {
  return (
    <ProcessCostAnalysisProvider>
      <ProcessCostAnalysisContent {...props} />
    </ProcessCostAnalysisProvider>
  );
}
