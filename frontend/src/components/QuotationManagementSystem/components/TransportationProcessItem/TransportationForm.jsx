import { useForm } from "react-hook-form";
import { Tab, Tabs } from "@mui/material";
import DynamicForm from "../../../Global/form/DynamicForm";
import CustomTodoList from "../CustomTodoList";
import { FORM_CONFIGURATIONS, PROCESS_TYPES } from "../../config/processTypes";
import { useEffect } from "react";

function TransportationForm({ initialData, onSubmit, setFormMethods }) {
  const methods = useForm({
    defaultValues: {
      processType: PROCESS_TYPES.TRANSPORTATION.key,
      activeTab: 0,
      ...initialData,
    },
  });

  useEffect(() => {
    setFormMethods(methods);
  }, [methods, setFormMethods]);

  const { watch, setValue } = methods;
  const activeTab = watch("activeTab") || 0;
  const formConfig = FORM_CONFIGURATIONS[PROCESS_TYPES.TRANSPORTATION.key];
  const sections = formConfig.items || [];

  const handleTabChange = (_, newValue) => {
    setValue("activeTab", newValue);
  };

  return (
    <DynamicForm externalMethods={methods} onFinish={onSubmit}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {sections.map((section) => (
          <Tab key={section.title} label={section.title} />
        ))}
      </Tabs>

      {sections.map(
        (section, index) =>
          activeTab === index && (
            <CustomTodoList
              key={section.title}
              name={`todoItems_${section.title}`}
              fields={section.items}
              renderField={(fieldProps) => (
                <DynamicForm.Field {...fieldProps} />
              )}
            />
          )
      )}
    </DynamicForm>
  );
}

export default TransportationForm;
