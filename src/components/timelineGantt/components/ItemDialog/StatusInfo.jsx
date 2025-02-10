// components/StatusChangeDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Stack,
} from "@mui/material";
import { STATUS_CONFIG, MACHINE_STATUS } from "../../configs/constants";

const StatusChangeDialog = ({
  open,
  onClose,
  currentStatus,
  onStatusChange,
  mode,
}) => {
  // 🧠 判斷可用的狀態選項
  const getAvailableStatuses = () => {
    // 新增模式時可以切換到所有狀態（除了製立單和當前狀態）
    if (mode === "add") {
      console.log("🚀 ~ getAvailableStatuses ~ mode:", mode);
      return Object.values(MACHINE_STATUS).filter(
        (status) =>
          status !== MACHINE_STATUS.ORDER_CREATED && status !== currentStatus
      );
    }

    // 待機狀態可以
    if (mode !== "add" && currentStatus === MACHINE_STATUS.IDLE) {
      // 待機狀態可以切換到其他所有狀態
      return Object.values(MACHINE_STATUS).filter(
        (status) =>
          status !== MACHINE_STATUS.IDLE &&
          status !== MACHINE_STATUS.ORDER_CREATED
      );
    } else {
      // 其他狀態只能切換到待機
      return [MACHINE_STATUS.IDLE];
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>切換狀態</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {getAvailableStatuses().map((status) => {
            const config = STATUS_CONFIG[status];
            return (
              <Button
                key={status}
                variant="outlined"
                onClick={() => {
                  onStatusChange(status);
                  onClose();
                }}
                sx={{
                  borderColor: config.color,
                  color: config.color,
                  "&:hover": {
                    borderColor: config.color,
                    backgroundColor: `${config.color}10`,
                  },
                }}
              >
                切換至{config.name}
              </Button>
            );
          })}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StatusChangeDialog;
