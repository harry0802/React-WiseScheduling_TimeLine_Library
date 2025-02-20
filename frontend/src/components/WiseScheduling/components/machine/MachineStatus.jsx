import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import StatusSlider from "./StatusSlider";
import ReasonSelector from "./ReasonSelector";
import { statusSchema } from "../../configs/status.schema";
import {
  StatusHeader,
  SliderContainer,
  ReasonGrid,
} from "../../assets/machine.styles";

const MachineStatusManager = forwardRef(({ initialData, onSubmit }, ref) => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(statusSchema),
    defaultValues: initialData,
  });

  useImperativeHandle(ref, () => ({
    getFormValues: () => form.getValues(),
    validateForm: async () => {
      try {
        const isValid = await form.trigger();
        return isValid
          ? { isValid: true, data: form.getValues(), step: "complete" }
          : { isValid: false, errors: form.formState.errors, step: "schema" };
      } catch (error) {
        return { isValid: false, error, step: "error" };
      }
    },
    setFormValue: (name, value) => form.setValue(name, value),
    getFormErrors: () => form.formState.errors,
  }));

  return (
    <FormProvider {...form}>
      <div>
        <StatusHeader>
          <div>
            <h3>
              {initialData.group} - {initialData.area}
            </h3>
            <p>製令單號: {initialData.id}</p>
          </div>
        </StatusHeader>

        <SliderContainer>
          <StatusSlider />
        </SliderContainer>

        {form.watch("timeLineStatus") === "機台停機" ||
          (form.watch("timeLineStatus") === "異常" && (
            <ReasonGrid>
              <ReasonSelector />
            </ReasonGrid>
          ))}
      </div>
    </FormProvider>
  );
});

MachineStatusManager.displayName = "MachineStatusManager";

export default MachineStatusManager;
