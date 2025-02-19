import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StatusCard,
  StatusHeader,
  SliderContainer,
  ReasonGrid,
} from "../styles";
import StatusSlider from "./StatusSlider";
import ReasonSelector from "./ReasonSelector";
import { statusSchema } from "../schemas/status.schema";

const MachineStatusManager = forwardRef(({ initialData, onSubmit }, ref) => {
  const form = useForm({
    resolver: zodResolver(statusSchema),
    defaultValues: initialData,
  });

  useImperativeHandle(ref, () => ({
    getFormValues: () => form.getValues(),
    validateForm: async () => {
      const result = await form.trigger();
      if (!result) return false;

      // 自定義驗證
      const data = form.getValues();
      if (data.timeLineStatus === "機台停機" && !data.status.reason) {
        form.setError("status.reason", {
          type: "manual",
          message: "停機狀態必須選擇原因",
        });
        return false;
      }

      return true;
    },
    setFormValue: (name, value) => form.setValue(name, value),
    getFormErrors: () => form.formState.errors,
  }));

  return (
    <FormProvider {...form}>
      <StatusCard status={form.watch("timeLineStatus")}>
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

        {form.watch("timeLineStatus") === "機台停機" && (
          <ReasonGrid>
            <ReasonSelector />
          </ReasonGrid>
        )}
      </StatusCard>
    </FormProvider>
  );
});

MachineStatusManager.displayName = "MachineStatusManager";

export default MachineStatusManager;
