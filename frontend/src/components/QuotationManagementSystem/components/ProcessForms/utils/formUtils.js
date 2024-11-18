import React from "react";
import DynamicForm from "../../../../Global/form/DynamicForm";
import CustomTodoList from "../../CustomTodoList";
import { Divider } from "@mui/material";
import FormItems from "../components/FormItems";
import { PROCESS_TYPES } from "../../../config/processTypes_v1";

export const renderGeneralFields = (item, sectionIndex) => {
  if (Array.isArray(item.fields[0])) {
    return item.fields[0].map((field, fieldIndex) => (
      <DynamicForm.Field
        key={`${sectionIndex}-${field.name}-${fieldIndex}`}
        field={field}
      />
    ));
  }

  return item.fields.map((field, fieldIndex) => (
    <DynamicForm.Field
      key={`${sectionIndex}-${field.name}-${fieldIndex}`}
      field={field}
    />
  ));
};

export const renderTodoList = (item, sectionIndex) => (
  <CustomTodoList
    key={`${sectionIndex}-${item.title}`}
    name={`todoItems_${item.title}`}
    fields={item.items}
    renderField={(fieldProps) => <DynamicForm.Field {...fieldProps} />}
  />
);

export const renderNestedItems = (item, sectionIndex) => (
  <React.Fragment key={`${sectionIndex}-${item.title}`}>
    <Divider sx={{ my: 1 }} />
    <FormItems items={item.items} />
  </React.Fragment>
);

export const getFieldOptions = (field, processSubtypeOptions) => {
  if (field.name === "processType") {
    return Object.values(PROCESS_TYPES).map(({ key, value }) => ({
      value: key,
      label: value,
    }));
  }

  if (field.name === "processSubtype") {
    return processSubtypeOptions;
  }

  return field.options;
};
