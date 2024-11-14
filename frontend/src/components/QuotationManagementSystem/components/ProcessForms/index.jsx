// components/ProcessForm/ProcessForm.js
import React from "react";
import ProcessTypeSelection from "./components/ProcessTypeSelection";
import ProcessSections from "./components/ProcessSections";
import { useProcessForm } from "./hook/useProcessForm";
import DynamicForm from "../../../Global/form/DynamicForm";

const ProcessForm = React.memo(({ initialData, onSubmit, methods }) => {
  const {
    processType,
    activeTab,
    formConfig,
    selectionFields,
    handleTabChange,
    handleProcessTypeChange,
  } = useProcessForm({
    initialData,
    externalMethods: methods,
  });

  const sections = formConfig.items || [];

  return (
    <DynamicForm externalMethods={methods} onFinish={onSubmit}>
      <ProcessTypeSelection
        fields={selectionFields}
        onChange={handleProcessTypeChange}
      />
      {processType && (
        <ProcessSections
          sections={sections}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </DynamicForm>
  );
});

export default ProcessForm;
