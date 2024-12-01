import React, { useCallback, useEffect, useMemo, useRef } from "react";
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

//  TODO 需要改善當下拉選單改變時  表單數據不會跟著改變的問題
// ! 目前問題是就算我改變我也無法提供他 初始值 因為我並不知道他原本的表單設定有哪些
function ProcessForm({ initialData, onSubmit, externalMethods }) {
  const initialProcessType = initialData?.processType;
  const methods =
    externalMethods ||
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useForm({
      defaultValues:
        initialProcessType === initialData?.processType
          ? initialData
          : { processType: initialProcessType },
    });

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

  // * 當 processType 改變時觸發更新邏輯
  useEffect(() => {
    if (!processType) return;

    if (processType === initialData?.processType) {
      // 如果選擇的類型與初始值相同，重置回初始值
      reset(initialData);
    } else {
      // 如果選擇的類型與初始值不同，重置所有欄位
      console.log("processType", processType);
      reset({
        processType,
        activeTab: 0,
        processSubtype: "",
      });
    }
  }, [processType, initialData, reset, setValue]);

  // * 關閉表單時重置所有數據
  useEffect(() => {
    return () => {
      reset(initialData || {}); // 重置回初始數據
    };
  }, [reset, initialData]);

  // * 渲染表單項目
  const renderFormItems = useCallback((items) => {
    if (!Array.isArray(items)) {
      console.warn("items is not an array:", items);
      return null;
    }
    // ! 渲染表單項目
    // * 1. case "general":  一般欄位
    // * 2. case "todolist": 待辦事項
    // * 3. case "nested": 巢狀欄位  遞迴渲染 : 如果巢狀欄位中還有巢狀欄位  則會繼續遞迴渲染
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
        // * 預設情況 不會進入
        default:
          console.warn(`Unknown item type: ${item.type}`);
          return null;
      }
    });
  }, []);

  const formRef = useRef(null);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      {selectionFields.map((field) => (
        <DynamicForm.Field
          key={field.name}
          field={{
            ...field,
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
    </form>
  );
}

export default ProcessForm;
