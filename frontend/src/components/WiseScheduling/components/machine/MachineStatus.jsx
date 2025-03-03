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
  ProductInputContainer,
} from "../../assets/machine.styles";
import ProductInput from "./ProductInput";
import dayjs from "dayjs";

const MachineStatusManager = forwardRef(({ initialData, onSubmit }, ref) => {
  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(statusSchema),
    defaultValues: initialData,
  });

  const status = form.watch("status");

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
        {/* 機台資訊 */}
        <StatusHeader>
          <div>
            <h3>
              {initialData.productionArea} - {initialData.machineSN}
            </h3>
            <p>
              {initialData.actualStartDate ??
                initialData.planStartDate ??
                dayjs().format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
        </StatusHeader>
        {/*  機台狀態 */}

        <SliderContainer>
          <StatusSlider />
        </SliderContainer>

        {/* 機台停機或異常 */}
        {status === "OFFLINE" && (
          <ReasonGrid>
            <ReasonSelector />
          </ReasonGrid>
        )}
        {status === "TESTING" && (
          <ProductInputContainer>
            <ProductInput />
          </ProductInputContainer>
        )}
      </div>
    </FormProvider>
  );
});

MachineStatusManager.displayName = "MachineStatusManager";

export default MachineStatusManager;
