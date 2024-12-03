// components/ProcessForm/ProcessForm.js
import React from "react";
import ProcessTypeSelection from "./components/ProcessTypeSelection";
import ProcessSections from "./components/ProcessSections";
import { useProcessForm } from "./hook/useProcessForm";
import DynamicForm from "../../../Global/form/DynamicForm";

const ProcessForm = React.memo(
  ({ initialData, onSubmit, methods, visible, isNew }) => {
    const {
      processCategory,
      activeTab,
      formConfig,
      selectionFields,
      handleTabChange,
    } = useProcessForm({
      initialData,
      externalMethods: methods,
      visible,
    });

    // 清理選擇字段以移除不必要的屬性，以防止不必要的重新渲染
    const cleanedSelectionFields = React.useMemo(() => {
      return selectionFields.map((field) => {
        const { getDependentOptions, dependsOn, ...rest } = field;
        return rest;
      });
    }, [selectionFields]);
    const sections = formConfig.items || [];

    return (
      <DynamicForm externalMethods={methods} onFinish={onSubmit}>
        <ProcessTypeSelection fields={cleanedSelectionFields} isNew={isNew} />
        {processCategory && (
          <ProcessSections
            sections={sections}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}
      </DynamicForm>
    );
  }
);
export default ProcessForm;
