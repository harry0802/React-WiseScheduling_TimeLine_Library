// components/StatusForms/StatusController.jsx
import { memo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidationSchema } from "../../configs/validationSchema";
import { STATUS_FORM_CONFIG } from "../../configs/formConfig";
import { MACHINE_STATUS } from "../../configs/constants";
import OrderCreated from "./OrderCreated";
import Idle from "./Idle";
import Setup from "./Setup";
import Testing from "./Testing";
import Stopped from "./Stopped";
// 💡 取得對應的表單組件

const StatusController = ({ status, item, disabled, onSubmit, groups }) => {
  // 🧠 表單配置和驗證
  const formConfig = STATUS_FORM_CONFIG[status];
  console.log("🚀 ~ StatusController ~ formConfig:", STATUS_FORM_CONFIG);

  const methods = useForm({
    defaultValues: {
      ...formConfig.defaultValues,
      ...item,
    },
    resolver: zodResolver(getValidationSchema(status)),
  });
  const FormComponent = {
    [MACHINE_STATUS.ORDER_CREATED]: OrderCreated,
    [MACHINE_STATUS.IDLE]: Idle,
    [MACHINE_STATUS.SETUP]: Setup,
    [MACHINE_STATUS.TESTING]: Testing,
    [MACHINE_STATUS.STOPPED]: Stopped,
  }[status];
  if (!FormComponent) return null;

  return (
    <FormProvider {...methods}>
      <form id="status-form" onSubmit={methods.handleSubmit(onSubmit)}>
        <FormComponent disabled={disabled} item={item} groups={groups} />
      </form>
    </FormProvider>
  );
};

export default memo(StatusController);
