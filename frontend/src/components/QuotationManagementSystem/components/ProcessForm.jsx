import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Tabs, Tab, Divider } from "@mui/material";
import DynamicForm from "../../Global/form/DynamicForm";
import CustomTodoList from "./CustomTodoList";
import {
  PROCESS_SELECTION_FORM,
  FORM_CONFIGURATIONS,
  PROCESS_TYPES,
  PROCESS_SUBTYPES,
} from "../config/processTypes";

const tabStyles = {
  marginBottom: 3,
  width: "100%",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    width: "99%",
    bottom: "1px",
    right: 0,
    borderBottom: "1px solid #8f8f8f",
  },

  "& .MuiTab-root": {
    margin: "0 4px",
    padding: "12px 16px",
    minHeight: "48px",
    transition: "all 0.2s ease",
    color: "#757575",
    fontSize: "18px",
    fontWeight: 400,
    "&:hover": {
      // 可選的 hover 狀態樣式
    },
    "&:active": {
      // 可選的 active 狀態樣式
    },
  },

  "& .Mui-selected": {
    fontSize: "19px",
    color: "#8bc1e3 !important",
    fontWeight: 500,
  },

  "& .MuiTabs-indicator": {
    height: "3px",
    backgroundColor: "#8bc1e3",
    transition: "all 0.3s ease",
  },
};

function ProcessForm({ initialData, onSubmit }) {
  // ? 初始化時，當 processType 與 initialData.processType 相同才使用預設值
  const initialProcessType = initialData?.processType;
  const methods = useForm({
    defaultValues:
      initialProcessType === initialData?.processType
        ? initialData
        : { processType: initialProcessType }, // 僅保留 processType
  });

  /* TODO 如果當下的 processType 跟 initialData 的 processType 一樣 才會進行設定預設值
{
    id: '2',
    processType: 'TRANSPORTATION',
    processSubtype: '海運',
    transportType: '船運',
    distance: 500,
    time: 48,
    returnDistance: 0,
    quantity: 1000,
    customsQuantity: 1000,
    freightCost: 12000,
    processCategory: 'Out-IJ(委外成型)',
    'todoItems_運輸費用': [],
    activeTab: 2,
    preInspectionRate: '5%',
    preInspectionLossRate: '3%',
    inspectionFee: '1500',
    processingFee: '800',
    'todoItems_材料成本': [
      {
        materialType: '包材',
        materialCode: 'MT003',
        materialName: '塑膠膜',
        weight: '300',
        unit: 'kg',
        unitPrice: '50',
        amount: '15000'
      }
    ],
    'todoItems_包裝材料成本': [
      {
        materialType: '包材',
        materialCode: 'MT004',
        materialName: '氣泡墊',
        weight: '100',
        unit: 'pcs',
        unitPrice: '5',
        amount: '500'
      }
    ]
  }

*/

  const { watch, setValue, reset } = methods;
  const processType = watch("processType");
  const activeTab = watch("activeTab") || 0;

  // * 取得表單配置
  const formConfig = FORM_CONFIGURATIONS[processType] || {};
  const sections = formConfig.items || [];

  // * 切換 Tab
  const handleTabChange = useCallback(
    (_, newValue) => {
      setValue("activeTab", newValue);
    },
    [setValue]
  );

  const processSubtypeOptions = useMemo(
    () => PROCESS_SUBTYPES[processType] || [],
    [processType]
  );

  // * 選擇欄位
  const selectionFields = useMemo(
    () =>
      PROCESS_SELECTION_FORM[0].fields.map((field) => ({
        ...field,
        options:
          field.name === "processType"
            ? Object.values(PROCESS_TYPES).map(({ key, value }) => ({
                value: key,
                label: value,
              }))
            : field.name === "processSubtype"
            ? processSubtypeOptions
            : field.options,
      })),
    [processSubtypeOptions]
  );

  // * 選擇 processType 時，清空其他欄位
  const handleProcessTypeChange = useCallback(
    (value) => {
      setValue("processType", value);
      setValue("processSubtype", "");
      setValue("activeTab", 0);

      // 當用戶選擇不同的 processType 時，清空所有其他字段
      reset({
        processType: value, // 只保留 processType，清空其他值
      });
    },
    [setValue, reset]
  );

  // * 當 processType 改變時，切換到第一個 Tab
  useEffect(() => {
    setValue("activeTab", 0);
  }, [processType, setValue]);

  //* 當 processType 改變時觸發重置邏輯
  useEffect(() => {
    if (processType && initialData?.processType !== processType) {
      reset({
        processType, // 保留當前選擇的 processType，重置其他字段
      });
    }
  }, [processType, initialData, reset]);

  // * 渲染表單項目
  const renderFormItems = useCallback((items) => {
    if (!Array.isArray(items)) {
      console.warn("items is not an array:", items);
      return null;
    }

    return items.map((item, sectionIndex) => {
      switch (item.type) {
        case "general":
          return Array.isArray(item.fields[0])
            ? item.fields[0].map((field, fieldIndex) => (
                <DynamicForm.Field
                  key={`${sectionIndex}-${field.name}-${fieldIndex}`}
                  field={field}
                />
              ))
            : item.fields.map((field, fieldIndex) => (
                <DynamicForm.Field
                  key={`${sectionIndex}-${field.name}-${fieldIndex}`}
                  field={field}
                />
              ));
        case "todolist":
          return (
            <CustomTodoList
              key={`${sectionIndex}-${item.title}`}
              name={`todoItems_${item.title}`}
              fields={item.items}
              renderField={(fieldProps) => (
                <DynamicForm.Field {...fieldProps} />
              )}
            />
          );
        case "nested":
          return (
            <React.Fragment key={`${sectionIndex}-${item.title}`}>
              <Divider sx={{ my: 1 }} />
              {renderFormItems(item.items)}
            </React.Fragment>
          );

        default:
          console.warn(`Unknown item type: ${item.type}`);
          return null;
      }
    });
  }, []);

  return (
    <DynamicForm
      externalMethods={methods}
      onFinish={onSubmit}
      submitButton={true}
    >
      {selectionFields.map((field) => (
        <DynamicForm.Field
          key={field.name}
          field={{
            ...field,
            onChange:
              field.name === "processType"
                ? handleProcessTypeChange
                : undefined,
          }}
        />
      ))}

      {processType && (
        <>
          {sections.length > 0 && (
            <Tabs sx={tabStyles} value={activeTab} onChange={handleTabChange}>
              {sections.map((section, index) => (
                <Tab key={index} label={section.title} />
              ))}
            </Tabs>
          )}
          {sections[activeTab] && renderFormItems([sections[activeTab]])}
        </>
      )}
    </DynamicForm>
  );
}

export default ProcessForm;
