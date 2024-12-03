import React from "react";
import DynamicForm from "../../../../Global/form/DynamicForm";
function ProcessTypeSelection({ fields, isNew = false }) {
  return (
    <>
      {fields.map((field) => (
        <DynamicForm.Field
          key={field.name}
          field={{
            ...field,
            disabled: !isNew && field.name === "processCategory",
          }}
        />
      ))}
    </>
  );
}

export default React.memo(ProcessTypeSelection);
