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
import { Button, CircularProgress, DialogActions } from "@mui/material";

const StatusController = ({
  status,
  item,
  disabled,
  onSubmit,
  mode,
  isSubmitting,
  onClose,
  groups,
}) => {
  const formConfig = STATUS_FORM_CONFIG[status];
  const { handleSubmit, ...methods } = useForm({
    defaultValues: {
      ...formConfig.defaultValues,
      ...item?.status,
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
  // 🧠 添加 debug 來查看表單狀態
  const handleFormSubmit = (data) => {
    console.log("Form submitted:", data);
    onSubmit(data);
  };
  if (!FormComponent) return null;

  return (
    <FormProvider {...methods}>
      <form id="status-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <FormComponent disabled={disabled} item={item} groups={groups} />
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            取消
          </Button>
          {mode !== "view" && (
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              確認
            </Button>
          )}
        </DialogActions>
      </form>
    </FormProvider>
  );
};

export default memo(StatusController);
