// components/ProcessForm/ProcessForm.js
import React from "react";
import ProcessTypeSelection from "./components/ProcessTypeSelection";
import ProcessSections from "./components/ProcessSections";
import { useProcessForm } from "./hook/useProcessForm";
import DynamicForm from "../../../Global/form/DynamicForm";

const ProcessForm = React.memo(({ initialData, onSubmit, methods }) => {
  const {
    processCategory,
    activeTab,
    formConfig,
    selectionFields,
    handleTabChange,
  } = useProcessForm({
    initialData,
    externalMethods: methods,
  });

  const cleanedSelectionFields = React.useMemo(() => {
    return selectionFields.map((field) => {
      const { getDependentOptions, dependsOn, ...rest } = field;
      return rest;
    });
  }, [selectionFields]);

  const sections = formConfig.items || [];

  return (
    <DynamicForm externalMethods={methods} onFinish={onSubmit}>
      <ProcessTypeSelection fields={cleanedSelectionFields} />
      {processCategory && (
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
