//! =============== 1. 設定與常量 ===============
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FORM_CONFIG, VALIDATION_RULES } from "../configs/formConfig";
import { formUtils } from "../utils/formUtils";
import { useEffect } from "react";

// 🧠 主對話框組件
const ItemDialog = ({
  isOpen,
  onClose,
  item,
  mode = "view",
  onSave,
  onDelete,
  groups,
}) => {
  const defaultGroup = groups?.get()?.[0]?.id || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      ...FORM_CONFIG.defaultValues,
      group: item ? item?.group : defaultGroup, // ✨ 使用第一個選項作為默認值
    },
  });

  // 監聽項目變化重置表單
  useEffect(() => {
    if (item) {
      const formData = formUtils.initializeFormData(item);
      reset(formData);
    }
  }, [item, reset]);

  // 處理表單提交
  const onSubmit = (data) => {
    const updatedItem = formUtils.createUpdatedItem(data, item);
    console.log("🚀 ~ onSubmit ~ updatedItem:", updatedItem);

    onSave(updatedItem);
    onClose();
  };

  // 監聽開始時間變化
  const startTime = watch("start");
  useEffect(() => {
    if (startTime) {
      setValue("end", formUtils.calculateEndTime(startTime));
    }
  }, [startTime, setValue]);

  if (!item) return null;
  console.log("🚀 ~ item:", item);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {/* 訂單內容 */}
            <TextField
              {...register("content", VALIDATION_RULES.content)}
              label="訂單內容"
              error={!!errors.content}
              helperText={errors.content?.message}
            />

            {/* 開始時間 */}
            <TextField
              {...register("start", VALIDATION_RULES.start)}
              {...FORM_CONFIG.timePickerProps}
              label="開始時間"
              error={!!errors.start}
              helperText={errors.start?.message}
            />

            {/* 結束時間 */}
            <TextField
              {...register("end", VALIDATION_RULES.end)}
              {...FORM_CONFIG.timePickerProps}
              label="結束時間"
              error={!!errors.end}
              helperText={errors.end?.message}
              disabled={mode === "view"}
            />

            {/* ⚠️ 修改機台選擇組件 */}
            <TextField
              {...register("group", VALIDATION_RULES.group)}
              select
              label="機台編號"
              error={!!errors.group}
              helperText={errors.group?.message}
              disabled={mode === "view"}
              // defaultValue={item ? item?.group : defaultGroup}
              value={watch("group") || ""} // 添加這行
            >
              {groups?.get()?.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.content || group.id} {/* 添加後備顯示內容 */}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          {mode === "edit" && (
            <Button onClick={onDelete} color="error" sx={{ mr: "auto" }}>
              刪除
            </Button>
          )}
          <Button onClick={onClose}>取消</Button>
          <Button type="submit" variant="contained">
            保存
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ItemDialog;
