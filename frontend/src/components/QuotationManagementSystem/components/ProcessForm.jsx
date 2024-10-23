import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, Tab } from "@mui/material";
import DynamicForm from "../../Global/form/DynamicForm";
import {
  PROCESS_SELECTION_FORM,
  FORM_CONFIGURATIONS,
  PROCESS_TYPES,
  PROCESS_SUBTYPES,
} from "../config/processTypes";

// zod schema handle validation
const schema = z.object({
  processType: z.string().min(1, "請選擇製程類型"),
  processSubtype: z.string().min(1, "請選擇製程子類型"),
});

const processTypeOptions = () =>
  Object.values(PROCESS_TYPES).map(({ key, value }) => ({
    value: key,
    label: value,
  }));

function ProcessForm({ initialData, onSubmit }) {
  const methods = useForm({
    defaultValues: initialData || {},
    // resolver: zodResolver(schema),
  });

  const { watch, setValue } = methods;
  const processType = watch("processType");
  const activeTab = watch("activeTab") || 0;

  //  處理 sections 的邏輯
  const sections = useMemo(
    () => FORM_CONFIGURATIONS[processType] || [],
    [processType]
  );

  //  根據processType 來決定 processSubtype 的選項
  const processSubtypeOptions = useMemo(
    () => PROCESS_SUBTYPES[processType] || [],
    [processType]
  );

  function handleTabChange(_, newValue) {
    setValue("activeTab", newValue);
  }

  //  處理 selectionFields 的邏輯
  const selectionFields = useMemo(() => {
    return PROCESS_SELECTION_FORM[0].fields.map((field) => ({
      ...field,
      options:
        field.name === "processType"
          ? processTypeOptions()
          : field.name === "processSubtype"
          ? processSubtypeOptions
          : field.options,
    }));
  }, [processTypeOptions, processSubtypeOptions]);

  //  處理 tabFields 的邏輯
  const tabFields = useMemo(() => {
    return processType ? sections[activeTab]?.fields || [] : [];
  }, [processType, sections, activeTab]);

  console.log(tabFields);

  //  處理 processType 的邏輯
  const handleProcessTypeChange = useCallback(
    (value) => {
      setValue("processType", value);
      setValue("processSubtype", "");
      setValue("activeTab", 0);
    },
    [setValue]
  );

  //  當processType 改變時我的  activeTab 將會設定初始值
  useEffect(() => {
    setValue("activeTab", 0);
  }, [processType, setValue]);

  return (
    <>
      <DynamicForm
        externalMethods={methods}
        onFinish={onSubmit}
        submitButton={true}
      >
        {/* 選擇製程類型和製程子類型 */}
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
        {/* 動態顯示 tab 和 fields */}
        {processType && (
          <>
            {sections.length > 0 && (
              <Tabs value={activeTab} onChange={handleTabChange}>
                {sections.map((section, index) => (
                  <Tab key={index} label={section.title} />
                ))}
              </Tabs>
            )}

            {tabFields.map((field) => (
              <DynamicForm.Field key={field.name} field={field} />
            ))}
          </>
        )}
      </DynamicForm>
    </>
  );
}

export default React.memo(ProcessForm);
