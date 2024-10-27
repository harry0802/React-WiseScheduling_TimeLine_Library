import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Tabs, Tab, Typography, Box, Divider } from "@mui/material";
import DynamicForm from "../../Global/form/DynamicForm";
import CustomTodoList from "./CustomTodoList";
import {
  PROCESS_SELECTION_FORM,
  FORM_CONFIGURATIONS,
  PROCESS_TYPES,
  PROCESS_SUBTYPES,
} from "../config/processTypes";

function ProcessForm({ initialData, onSubmit }) {
  const methods = useForm({
    defaultValues: initialData || {},
  });

  const { watch, setValue } = methods;
  const processType = watch("processType");
  const activeTab = watch("activeTab") || 0;

  const formConfig = FORM_CONFIGURATIONS[processType] || {};
  const sections = formConfig.items || [];
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
  /*
GeneralFormItem {
    type: 'general',
    title: '廠內出貨檢',
    fields: [
      {
        name: 'workHours',
        label: '工時(秒)',
        type: 'number',
        props: { InputProps: { endAdornment: '秒' }, placeholder: '請輸入工時' },
        rules: { required: '工時為必填' }
      },
      {
        name: 'price',
        label: '單價',
        type: 'number',
        props: { InputProps: { endAdornment: '元' }, placeholder: '請輸入單價' },
        rules: { required: '單價為必填' }
      }
    ]
  }
*/

  const handleProcessTypeChange = useCallback(
    (value) => {
      setValue("processType", value);
      setValue("processSubtype", "");
      setValue("activeTab", 0);
    },
    [setValue]
  );

  useEffect(() => {
    setValue("activeTab", 0);
  }, [processType, setValue]);

  const renderFormItems = useCallback((items) => {
    console.log("🔥🔥🔥🔥 ~ renderFormItems ~ items:", items);
    if (!Array.isArray(items)) {
      console.warn("items is not an array:", items);
      return null;
    }

    return items.map((item, index) => {
      switch (item.type) {
        case "general":
          return Array.isArray(item.fields[0])
            ? item.fields[0].map((field) => (
                <DynamicForm.Field key={field.name} field={field} />
              ))
            : item.fields.map((field) => (
                <DynamicForm.Field key={field.name} field={field} />
              ));
        case "todolist":
          return (
            <CustomTodoList
              name={`todoItems_${item.title}`}
              fields={item.items}
              renderField={(fieldProps) => (
                <DynamicForm.Field {...fieldProps} />
              )}
            />
          );
        case "nested":
          return (
            <>
              <Typography variant="h6">{item.title}</Typography>
              <Divider sx={{ my: 1 }} />

              {console.log(
                "🔥🔥🔥🔥 ~ renderFormItems ~ item.items:",
                item.items
              )}
              {renderFormItems(item.items)}
            </>
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
            <Tabs
              style={{ width: "100%" }}
              value={activeTab}
              onChange={handleTabChange}
            >
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
