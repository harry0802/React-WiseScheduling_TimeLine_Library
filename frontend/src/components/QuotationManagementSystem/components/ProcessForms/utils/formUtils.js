import React from "react";
import DynamicForm from "../../../../Global/form/DynamicForm";
import CustomTodoList from "../../CustomTodoList";
import { Divider } from "@mui/material";
import FormItems from "../components/FormItems";
import { PROCESS_TYPES } from "../../../config/processTypes_v1";
import { useFieldArray, useFormContext } from "react-hook-form";

function InjectionMoldingForm({ fields }) {
  const { control } = useFormContext();
  const { fields: formFields } = useFieldArray({
    name: "SQInjectionMoldingCosts",
    control,
  });

  const fieldsToRender = formFields.length > 0 ? formFields : [{ id: "empty" }];

  return fieldsToRender.map((field, index) => (
    <div
      style={{ width: "100%", display: "flex", flexFlow: "row wrap" }}
      key={`injection-form-${field.id}-${index}`}
    >
      {fields.map((formField, fieldIndex) => (
        <DynamicForm.Field
          key={`injection-field-${field.id}-${formField.name}-${fieldIndex}`}
          field={{
            ...formField,
            name: `SQInjectionMoldingCosts.${index}.${formField.name}`,
            dependsOn: formField.dependsOn
              ? `SQInjectionMoldingCosts.${index}.${formField.dependsOn}`
              : undefined,
            getDependentOptions: formField.getDependentOptions,
          }}
        />
      ))}
    </div>
  ));
}

export const renderGeneralFields = (item, sectionIndex) => {
  console.log("🔥🔥🔥🔥 ~ renderGeneralFields ~ item:", item);
  if (item.name === "SQInjectionMoldingCosts") {
    return (
      <InjectionMoldingForm
        key={`injection-section-${sectionIndex}`}
        fields={item.fields}
      />
    );
  }

  return item.fields.map((field, fieldIndex) => (
    <DynamicForm.Field
      key={`general-field-${sectionIndex}-${field.name}-${fieldIndex}`}
      field={{
        ...field,
        name:
          item.name === "SQMaterialCostSetting"
            ? `${item.name}.${field.name}`
            : field.name,
      }}
    />
  ));
};

export const renderTodoList = (item, sectionIndex) => {
  return (
    <CustomTodoList
      key={`${sectionIndex}-${item.title}`}
      name={item.name}
      fields={item.items}
      renderField={(fieldProps) => <DynamicForm.Field {...fieldProps} />}
    />
  );
};

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
