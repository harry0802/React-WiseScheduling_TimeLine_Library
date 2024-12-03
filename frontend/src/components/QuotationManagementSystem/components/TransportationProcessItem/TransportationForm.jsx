import { useForm } from "react-hook-form";
import { Tab, Tabs } from "@mui/material";
import DynamicForm from "../../../Global/form/DynamicForm";
import CustomTodoList from "../CustomTodoList";
import { FORM_CONFIGURATIONS } from "../../config/processTypes_v1";
import { useEffect, useState } from "react";
import { validateTransportationForm } from "../../utility/formValidationUtils";
import ConfirmationDialog from "../../../Global/dialog/BaseDialog";

function TransportationForm({ initialData, onSubmit, setFormMethods }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const methods = useForm({
    defaultValues: {
      processType: "TRANSPORTATION",
      activeTab: 0,
      SQFreights: initialData?.SQFreights || [],
      SQCustomsDuties: initialData?.SQCustomsDuties || [],
    },
    resolver: validateTransportationForm,
  });
  useEffect(() => {
    setFormMethods(methods);
  }, [methods, setFormMethods]);

  const { watch, setValue } = methods;
  const activeTab = watch("activeTab") || 0;
  const formConfig = FORM_CONFIGURATIONS.TRANSPORTATION;
  const sections = formConfig.items || [];

  const handleTabChange = (_, newValue) => {
    setValue("activeTab", newValue);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setConfirmOpen(true);
    return false; // 阻止表單默認提交
  };

  const handleConfirm = () => {
    if (formData) {
      console.log("Confirmed form data:", formData);
      onSubmit(formData);
    }
    setConfirmOpen(false);
  };

  return (
    <>
      <DynamicForm externalMethods={methods} onFinish={handleFormSubmit}>
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
                name={
                  section.title === "運輸費用"
                    ? "SQFreights"
                    : "SQCustomsDuties"
                }
                fields={section.items}
                renderField={(fieldProps) => (
                  <DynamicForm.Field {...fieldProps} />
                )}
              />
            )
        )}
      </DynamicForm>
      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="確認操作"
        message="你確定要提交這些更改嗎？"
      />
    </>
  );
}

export default TransportationForm;
