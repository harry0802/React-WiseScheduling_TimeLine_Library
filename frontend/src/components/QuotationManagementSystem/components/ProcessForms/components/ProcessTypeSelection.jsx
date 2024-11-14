import React from "react";
import DynamicForm from "../../../../Global/form/DynamicForm";

const ProcessTypeSelection = React.memo(({ fields, onChange }) => (
  <>
    {fields.map((field) => (
      <DynamicForm.Field
        key={field.name}
        field={field}
        onChange={(value) => field.name === "processType" && onChange(value)}
      />
    ))}
  </>
));

export default ProcessTypeSelection;
