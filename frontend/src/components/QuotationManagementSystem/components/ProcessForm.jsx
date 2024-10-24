import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, Tab, Button, Box, TextField } from "@mui/material";
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

// function ProcessForm({ initialData, onSubmit }) {
//   const methods = useForm({
//     defaultValues: initialData || {},
//     // resolver: zodResolver(schema),
//   });

//   const { watch, setValue } = methods;
//   const processType = watch("processType");
//   const activeTab = watch("activeTab") || 0;

//   //  處理 sections 的邏輯
//   const sections = useMemo(
//     () => FORM_CONFIGURATIONS[processType] || [],
//     [processType]
//   );

//   //  根據processType 來決定 processSubtype 的選項
//   const processSubtypeOptions = useMemo(
//     () => PROCESS_SUBTYPES[processType] || [],
//     [processType]
//   );

//   function handleTabChange(_, newValue) {
//     setValue("activeTab", newValue);
//   }

//   //  處理 selectionFields 的邏輯
//   const selectionFields = useMemo(() => {
//     return PROCESS_SELECTION_FORM[0].fields.map((field) => ({
//       ...field,
//       options:
//         field.name === "processType"
//           ? processTypeOptions()
//           : field.name === "processSubtype"
//           ? processSubtypeOptions
//           : field.options,
//     }));
//   }, [processTypeOptions, processSubtypeOptions]);

//   //  處理 tabFields 的邏輯
//   const tabFields = useMemo(() => {
//     return processType ? sections[activeTab]?.fields || [] : [];
//   }, [processType, sections, activeTab]);

//   //  todo 我需要處理手動添加表單的功能 按下按鈕就添加表單的 todo list 功能

//   //  處理 processType 的邏輯
//   const handleProcessTypeChange = useCallback(
//     (value) => {
//       setValue("processType", value);
//       setValue("processSubtype", "");
//       setValue("activeTab", 0);
//     },
//     [setValue]
//   );

//   //  當processType 改變時我的  activeTab 將會設定初始值
//   useEffect(() => {
//     setValue("activeTab", 0);
//   }, [processType, setValue]);

//   return (
//     <>
//       <DynamicForm
//         externalMethods={methods}
//         onFinish={onSubmit}
//         submitButton={true}
//       >
//         {/* 選擇製程類型和製程子類型 */}
//         {selectionFields.map((field) => (
//           <DynamicForm.Field
//             key={field.name}
//             field={{
//               ...field,
//               onChange:
//                 field.name === "processType"
//                   ? handleProcessTypeChange
//                   : undefined,
//             }}
//           />
//         ))}
//         {/* 動態顯示 tab 和 fields */}
//         {processType && (
//           <>
//             {sections.length > 0 && (
//               <Tabs value={activeTab} onChange={handleTabChange}>
//                 {sections.map((section, index) => (
//                   <Tab key={index} label={section.title} />
//                 ))}
//               </Tabs>
//             )}
//             {/* 顯示 tab 的 fields */}
//             {tabFields.map((field) => (
//               <DynamicForm.Field key={field.name} field={field} />
//             ))}
//             {/* 手動添加表 */}
//           </>
//         )}
//       </DynamicForm>
//     </>
//   );
// }
function ProcessForm({ initialData, onSubmit }) {
  const methods = useForm({
    defaultValues: initialData || {},
  });

  const { watch, setValue } = methods;
  const processType = watch("processType");
  const activeTab = watch("activeTab") || 0;

  // Get the form configuration and formType
  const formConfig = FORM_CONFIGURATIONS[processType] || {};
  const { formType, sections } = formConfig;

  const [todoItems, setTodoItems] = useState(initialData?.items || []);

  const handleAddItem = () => {
    setTodoItems([...todoItems, { id: Date.now(), task: "", quantity: 0 }]);
  };

  const handleRemoveItem = (id) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setTodoItems(
      todoItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleTabChange = (_, newValue) => {
    setValue("activeTab", newValue);
  };

  const processSubtypeOptions = useMemo(
    () => PROCESS_SUBTYPES[processType] || [],
    [processType]
  );

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

  const tabFields = useMemo(() => {
    return processType ? sections[activeTab]?.fields || [] : [];
  }, [processType, sections, activeTab]);

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

  return (
    <DynamicForm
      externalMethods={methods}
      onFinish={onSubmit}
      submitButton={true}
    >
      {/* Render process type and subtype selection */}
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
            <Tabs value={activeTab} onChange={handleTabChange}>
              {sections.map((section, index) => (
                <Tab key={index} label={section.title} />
              ))}
            </Tabs>
          )}
          {formType === "general" && (
            <>
              {tabFields.map((field) => (
                <DynamicForm.Field key={field.name} field={field} />
              ))}
            </>
          )}
          {formType === "todolist" && (
            <>
              <Button onClick={handleAddItem}>Add Task</Button>
              {todoItems.map((item) => (
                <Box key={item.id}>
                  <TextField
                    label="Task"
                    value={item.task}
                    onChange={(e) =>
                      handleItemChange(item.id, "task", e.target.value)
                    }
                  />
                  <TextField
                    label="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(item.id, "quantity", e.target.value)
                    }
                  />
                  <Button onClick={() => handleRemoveItem(item.id)}>
                    Remove
                  </Button>
                </Box>
              ))}
            </>
          )}
        </>
      )}
    </DynamicForm>
  );
}

export default React.memo(ProcessForm);
